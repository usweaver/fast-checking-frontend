export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: string;
  checked: boolean;
  regularization: boolean;
  accountId: string;
  categoryId: string;
}

export interface TransactionDate {
  day: string;
  month: string;
  year: string;
}
