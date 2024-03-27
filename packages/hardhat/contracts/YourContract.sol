//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Adapted from Open Zeppelin's RefundVault

/**
 * @title Vault
 * @dev This contract is used for storing funds.
 */
contract YourContract {
	struct TreeDeposit {
		address treeOwner; //who is contributing to the farmer
		uint256 firstDepositTimestamp;
		uint256 nextDisbursement;
		uint256 balance;
		uint256 lat;
		uint256 lng;
	}

	struct LatLng {
		uint256 lat;
		uint256 lng;
	}

	// Wallet from the project team
	address payable public trustedWallet;

	mapping(bytes32 => TreeDeposit) public deposits;
	mapping(address => LatLng[]) private locations;

	uint256 public constant ONE_YEAR = 365 days;
	uint256 public constant DONATION_VALUE = 1000; // 1000 wei for tests. correct value is 1 Ether

	event LogVaultCreated(address indexed wallet);
	event LogDeposited(
		address indexed contributor,
		LatLng treeId,
		uint256 amount,
		uint256 firstDepositTimestamp
	);
	event LogRefunded(
		address indexed contributor,
		bytes32 treeId,
		uint256 amount
	);
	event LogFundsSentToWallet(
		bytes32 indexed treeId,
		address trustedWallet,
		uint256 amount
	);
	event LogAllFundsSentToWallet(
		bytes32 indexed treeId,
		address trustedWallet,
		uint256 amount
	);

	constructor() {
		trustedWallet = payable(0x1fE926205440d6A61119d231FA28e1519514E2E5);
	}

	// Donator deposits a value. Donator can refund remain amount at any time
	function depositValue(uint256 lat, uint256 lng) external payable {
		//check if tree is available
		bytes32 _treeId = getTreeId(lat, lng);
		TreeDeposit memory deposit = deposits[_treeId];

		require(deposit.treeOwner == address(0), "Tree must not have an owner");
		require(deposit.balance == 0, "Tree balance must be zero.");

		require(
			msg.value == DONATION_VALUE,
			"Each tree must cost DONATION_VALUE"
		);

		uint256 amount = msg.value;
		uint256 fee_10percent = amount / 10;
		uint256 remain = amount - fee_10percent;

		trustedWallet.transfer(fee_10percent); //first, transfer 10% to trusted wallet

		deposits[_treeId] = TreeDeposit({
			treeOwner: msg.sender,
			firstDepositTimestamp: block.timestamp,
			nextDisbursement: (block.timestamp + ONE_YEAR),
			balance: remain,
			lat: lat,
			lng: lng
		});

		locations[msg.sender].push(LatLng({ lat: lat, lng: lng }));

		emit LogDeposited(
			msg.sender,
			LatLng({ lat: lat, lng: lng }),
			msg.value,
			block.timestamp
		);
	}

	function getTreeId(
		uint256 lat,
		uint256 lng
	) public pure returns (bytes32 treeId) {
		return keccak256(abi.encodePacked(lat, lng));
	}

	/// @dev Refunds ether to the contributors if in the contributors wants funds back.
	function refund(uint256 lat, uint256 lng) external {
		bytes32 _treeId = getTreeId(lat, lng);
		TreeDeposit storage deposit = deposits[_treeId];

		require(
			deposit.balance > 0,
			"Refund not allowed if deposit balance is 0."
		);
		require(
			deposit.treeOwner == msg.sender,
			"Only owner of the deposit can request a refund."
		);
		uint256 refundAmount = deposit.balance; //will refund what is lefted

		deposit.balance = 0;

		(bool success, ) = msg.sender.call{ value: refundAmount }("");
		require(success, "Transfer failed.");

		emit LogRefunded(deposit.treeOwner, _treeId, refundAmount);
	}

	/// @dev Sends the disbursement amount to the wallet after the disbursement period has passed. Can be called by anyone.
	function sendFundsToWallet(uint256 lat, uint256 lng) external {
		bytes32 _treeId = getTreeId(lat, lng);
		TreeDeposit storage deposit = deposits[_treeId];

		require(
			deposit.nextDisbursement <= block.timestamp,
			"Next disbursement period timestamp has not yet passed, too early to withdraw."
		);
		require(deposit.balance > 0, "TreeDeposit balance is 0.");

		if (
			block.timestamp > deposit.nextDisbursement &&
			block.timestamp < deposit.firstDepositTimestamp + 10 * (ONE_YEAR)
		) {
			uint256 initialDeposited = DONATION_VALUE;
			uint256 fee_10percent = initialDeposited / 10;
			uint256 remain = deposit.balance - fee_10percent;
			deposit.balance = remain;
			deposit.nextDisbursement = deposit.nextDisbursement + ONE_YEAR;
			trustedWallet.transfer(fee_10percent);
			emit LogFundsSentToWallet(_treeId, trustedWallet, fee_10percent);
		}
		//if more than 10 years has passed, all funds can be collected
		else if (
			block.timestamp >= deposit.firstDepositTimestamp + 10 * (ONE_YEAR)
		) {
			uint256 allFunds = deposit.balance;
			deposit.balance = 0;
			trustedWallet.transfer(allFunds);
			emit LogAllFundsSentToWallet(_treeId, trustedWallet, allFunds);
		}
	}

	function getTreeDeposit(
		uint256 lat,
		uint256 lng
	) external view returns (TreeDeposit memory treeDeposit) {
		return deposits[getTreeId(lat, lng)];
	}

	function getLocationList(
		address _address
	) public view returns (TreeDeposit[] memory treeDeposits) {
		LatLng[] memory latlngs = locations[_address];
		uint256 size = latlngs.length;
		treeDeposits = new TreeDeposit[](size);
		for (uint256 i = 0; i < size; i++) {
			uint256 lat = locations[_address][i].lat;
			uint256 lng = locations[_address][i].lng;
			bytes32 key = getTreeId(lat, lng);
			TreeDeposit memory treeDeposit = deposits[key];
			treeDeposits[i] = treeDeposit;
		}
	}

	function getONE_YEAR() public pure returns (uint256) {
		return ONE_YEAR;
	}

	function setLocation(address userAddress, LatLng calldata location) public {
		locations[userAddress].push(location);
	}

	function setLocationForTests() external {
		locations[msg.sender].push(LatLng({ lat: 167490351, lng: 438709075 }));
		locations[msg.sender].push(LatLng({ lat: 167490371, lng: 438709095 }));
		locations[msg.sender].push(LatLng({ lat: 167490391, lng: 438709105 }));
		locations[msg.sender].push(LatLng({ lat: 167490401, lng: 438709165 }));
	}
}
