import { useState, useCallback, useEffect } from 'react';
import { Budget, CreateBudgetDTO, UpdateBudgetDTO } from '../types/budget';
import { budgetService } from '../services/budgetService';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await budgetService.getAll();
      setBudgets(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch budgets';
      setError(errorMsg);
      console.debug('Budget fetch error (using local fallback):', errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const createBudget = useCallback(async (data: CreateBudgetDTO) => {
    setError(null);
    try {
      const budget = await budgetService.create(data);
      setBudgets(prev => [...prev, budget]);
      return budget;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create budget';
      setError(message);
      throw err;
    }
  }, []);

  const updateBudget = useCallback(async (id: string, data: UpdateBudgetDTO) => {
    setError(null);
    try {
      const budget = await budgetService.update(id, data);
      setBudgets(prev =>
        prev.map(b => (b.id === id ? budget : b))
      );
      return budget;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update budget';
      setError(message);
      throw err;
    }
  }, []);

  const deleteBudget = useCallback(async (id: string) => {
    setError(null);
    try {
      await budgetService.delete(id);
      setBudgets(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete budget';
      setError(message);
      throw err;
    }
  }, []);

  return {
    budgets,
    loading,
    error,
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
  };
};
