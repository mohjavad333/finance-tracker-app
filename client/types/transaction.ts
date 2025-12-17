export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDTO {
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date: string;
}

export interface UpdateTransactionDTO {
  amount?: number;
  type?: TransactionType;
  category?: string;
  description?: string;
  date?: string;
}
