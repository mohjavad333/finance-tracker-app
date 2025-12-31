import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BarChart3, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTransactions } from '@/hooks/useTransactions';
import { useBudgets } from '@/hooks/useBudgets';
import { useNotifications } from '@/hooks/useNotifications';
import { StatsCards } from '@/components/StatsCards';
import { CategoryCharts } from '@/components/CategoryCharts';
import { TransactionsList } from '@/components/TransactionsList';
import { AddTransactionDialog } from '@/components/AddTransactionDialog';
import { CreateTransactionDTO } from '@/types/transaction';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const {
    transactions,
    loading,
    createTransaction,
    deleteTransaction,
  } = useTransactions();
  const { budgets } = useBudgets();
  const { addNotification, unreadCount } = useNotifications();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Check budget alerts when transactions or budgets change
  useEffect(() => {
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

    budgets.forEach((budget) => {
      if (budget.month === currentMonth) {
        const spent = transactions
          .filter(
            (t) =>
              t.type === 'expense' &&
              t.category === budget.category &&
              t.date.startsWith(currentMonth)
          )
          .reduce((sum, t) => sum + t.amount, 0);

        const percentage = (spent / budget.amount) * 100;

        // Only show if there are expenses
        if (spent > 0) {
          if (spent > budget.amount && percentage > 100) {
            addNotification(
              'budget_exceeded',
              `Budget Exceeded: ${budget.category}`,
              `You have exceeded your ${budget.category} budget. Spent $${spent.toFixed(2)} of $${budget.amount.toFixed(2)}`,
              {
                category: budget.category,
                spent,
                limit: budget.amount,
                month: currentMonth,
                budgetId: budget.id,
              }
            );
          } else if (percentage >= 80 && percentage <= 100) {
            addNotification(
              'budget_warning',
              `Budget Warning: ${budget.category}`,
              `You have spent ${percentage.toFixed(0)}% of your ${budget.category} budget. $${spent.toFixed(2)} of $${budget.amount.toFixed(2)}`,
              {
                category: budget.category,
                spent,
                limit: budget.amount,
                month: currentMonth,
                budgetId: budget.id,
              }
            );
          }
        }
      }
    });
  }, [transactions, budgets, addNotification]);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleAddTransaction = async (data: CreateTransactionDTO): Promise<void> => {
    try {
      const transaction = await createTransaction(data);

      // Create notification for new transaction
      addNotification(
        'transaction_added',
        `${data.type === 'income' ? 'Income' : 'Expense'} Added`,
        `${data.type === 'income' ? 'Received' : 'Spent'} $${data.amount.toFixed(2)} in ${data.category}${data.description ? ': ' + data.description : ''}`,
        {
          category: data.category,
          spent: data.amount,
          transactionId: transaction.id,
        }
      );
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/budgeting">
                <Button variant="outline">Budgeting</Button>
              </Link>
              <Link to="/notifications">
                <Button variant="outline" className="relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Button>
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-700">{user?.name || user?.email}</span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <StatsCards totalIncome={totalIncome} totalExpenses={totalExpenses} />

        {/* Action Bar */}
        <div className="mt-8 mb-8">
          <AddTransactionDialog onAdd={handleAddTransaction} />
        </div>

        {/* Charts */}
        {transactions.length > 0 && (
          <div className="mb-8">
            <CategoryCharts transactions={transactions} />
          </div>
        )}

        {/* Transactions List */}
        <TransactionsList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </main>
    </div>
  );
}
