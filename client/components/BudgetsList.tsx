import { Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Budget } from '@/types/budget';
import { Transaction } from '@/types/transaction';

interface BudgetsListProps {
  budgets: Budget[];
  transactions: Transaction[];
  month: string;
  onDelete: (id: string) => Promise<void>;
}

export const BudgetsList = ({ budgets, transactions, month, onDelete }: BudgetsListProps) => {
  const budgetsForMonth = budgets.filter(b => b.month === month);

  const getSpentAmount = (category: string) => {
    return transactions
      .filter(
        t =>
          t.type === 'expense' &&
          t.category === category &&
          t.date.startsWith(month)
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getPercentage = (spent: number, limit: number) => {
    return limit > 0 ? (spent / limit) * 100 : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budgets</CardTitle>
      </CardHeader>
      <CardContent>
        {budgetsForMonth.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No budgets for this month</p>
        ) : (
          <div className="space-y-4">
            {budgetsForMonth.map((budget) => {
              const spent = getSpentAmount(budget.category);
              const percentage = getPercentage(spent, budget.amount);
              const isWarning = percentage >= 80;
              const isExceeded = spent > budget.amount;

              return (
                <div key={budget.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{budget.category}</p>
                      <p className="text-sm text-gray-500">
                        ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(budget.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isExceeded ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  {isExceeded && (
                    <p className="text-xs text-red-600 mt-2">
                      Over budget by ${(spent - budget.amount).toFixed(2)}
                    </p>
                  )}
                  {isWarning && !isExceeded && (
                    <p className="text-xs text-yellow-600 mt-2">
                      Warning: {percentage.toFixed(0)}% of budget used
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
