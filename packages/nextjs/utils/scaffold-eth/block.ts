import { Block, Transaction, TransactionReceipt } from "viem";

export type TransactionWithFunction = Transaction & {
  functionName?: string;
  functionArgs?: any[];
  functionArgNames?: string[];
  functionArgTypes?: string[];
};

type TransactionReceipts = {
  [key: string]: TransactionReceipt;
};

export type TransactionsTableProps = {
  blocks: Block[];
  transactionReceipts: TransactionReceipts;
};

type Location = {
  lng: string;
  lat: string;
  firstDepositTimestamp: number;
  nextDisbursement: number;
  balance: bigint;
};

export type LocationsTableProps = {
  locations: Location[];
};
