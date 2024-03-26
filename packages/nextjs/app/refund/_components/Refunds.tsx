"use client";

import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { ReceiptRefundIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useFetchLocations } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

export function Refunds() {
  const { targetNetwork } = useTargetNetwork();
  const { address } = useAccount();

  const { locations } = useFetchLocations(address);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "refund",
    args: [undefined, undefined],
  });

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-center px-4 md:px-0">
        <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
          <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
            <thead>
              <tr className="rounded-xl text-sm text-base-content">
                <th className="bg-primary">Lat/Lng</th>
                <th className="bg-primary">Time Created</th>
                <th className="bg-primary">Time Next Disbursement</th>
                <th className="bg-primary ">Balance ({targetNetwork.nativeCurrency.symbol})</th>
                <th className="bg-primary ">Click to refund</th>
              </tr>
            </thead>
            <tbody>
              {locations?.map(location => {
                const lat = location.lat;
                const lng = location.lng;
                const latlng = location.lat + "/" + location.lng;
                console.log(latlng);
                const timeCreated = new Date(Number(location.firstDepositTimestamp) * 1000).toLocaleString();
                const timeNextDisbursement = new Date(Number(location.nextDisbursement) * 1000).toLocaleString();
                const balance = location.balance;
                const refundEnabled = balance !== BigInt(0);

                return (
                  <tr key={latlng} className="hover text-sm">
                    <td className="w-1/12 md:py-4">{latlng.toString()}</td>
                    <td className="w-1/12 md:py-4">{timeCreated}</td>
                    <td className="w-1/12 md:py-4">{timeNextDisbursement}</td>
                    <td className="w-1/12 md:py-4">
                      {formatEther(balance)} {targetNetwork.nativeCurrency.symbol}
                    </td>
                    <td className="w-1/12 md:py-4">
                      {refundEnabled ? (
                        <ReceiptRefundIcon
                          className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                          aria-hidden="true"
                          title="Click to request a refund"
                          onClick={() => writeAsync({ args: [lat, lng] })}
                        />
                      ) : (
                        <XMarkIcon
                          className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                          aria-hidden="true"
                          title="Can't request a refund"
                        />
                      )}
                    </td>{" "}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
