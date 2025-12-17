import { useState, useCallback, useEffect } from 'react';
import { Transaction, CreateTransactionDTO, UpdateTransactionDTO } from '../types/transaction';
import { transactionService } from '../services/transactionService';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch transactions';
      setError(errorMsg);
      console.debug('Transaction fetch error (using local fallback):', errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(async (data: CreateTransactionDTO) => {
    setError(null);
    try {
      const transaction = await transactionService.create(data);
      setTransactions(prev => [...prev, transaction]);
      return transaction;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create transaction';
      setError(message);
      throw err;
    }
  }, []);

  const updateTransaction = useCallback(async (id: string, data: UpdateTransactionDTO) => {
    setError(null);
    try {
      const transaction = await transactionService.update(id, data);
      setTransactions(prev =>
        prev.map(t => (t.id === id ? transaction : t))
      );
      return transaction;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update transaction';
      setError(message);
      throw err;
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    setError(null);
    try {
      await transactionService.delete(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete transaction';
      setError(message);
      throw err;
    }
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
