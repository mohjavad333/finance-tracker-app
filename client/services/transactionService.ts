// import { api } from './api';
// import { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from '../types/transaction';

// const STORAGE_KEY = 'transactions';

// export const transactionService = {
//   async getAll(): Promise<Transaction[]> {
//     try {
//       return await api.get<Transaction[]>('/transactions');
//     } catch {
//       return this.getAllLocal();
//     }
//   },

//   async create(data: CreateTransactionDTO): Promise<Transaction> {
//     try {
//       return await api.post<Transaction>('/transactions', data);
//     } catch {
//       return this.createLocal(data);
//     }
//   },

//   async update(id: string, data: UpdateTransactionDTO): Promise<Transaction> {
//     try {
//       return await api.put<Transaction>(`/transactions/${id}`, data);
//     } catch {
//       return this.updateLocal(id, data);
//     }
//   },

//   async delete(id: string): Promise<void> {
//     try {
//       await api.delete(`/transactions/${id}`);
//     } catch {
//       this.deleteLocal(id);
//     }
//   },

//   // Local storage fallbacks
//   getAllLocal(): Transaction[] {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   },

//   createLocal(data: CreateTransactionDTO): Transaction {
//     const transactions = this.getAllLocal();
//     const transaction: Transaction = {
//       id: Math.random().toString(36).substr(2, 9),
//       userId: 'local',
//       ...data,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     transactions.push(transaction);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
//     return transaction;
//   },

//   updateLocal(id: string, data: UpdateTransactionDTO): Transaction {
//     const transactions = this.getAllLocal();
//     const index = transactions.findIndex(t => t.id === id);
//     if (index === -1) throw new Error('Transaction not found');
    
//     transactions[index] = {
//       ...transactions[index],
//       ...data,
//       updatedAt: new Date().toISOString(),
//     };
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
//     return transactions[index];
//   },

//   deleteLocal(id: string): void {
//     const transactions = this.getAllLocal();
//     const filtered = transactions.filter(t => t.id !== id);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
//   },
// };

import { api } from "./api";
import {
  Transaction,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "../types/transaction";

export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    return api.get<Transaction[]>("/transactions");
  },

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    return api.post<Transaction>("/transactions", data);
  },

  async update(
    id: string,
    data: UpdateTransactionDTO
  ): Promise<Transaction> {
    return api.put<Transaction>(`/transactions/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },
};
