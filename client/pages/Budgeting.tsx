import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BarChart3, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import { useNotifications } from '@/hooks/useNotifications';
import { BudgetsList } from '@/components/BudgetsList';
import { AddBudgetDialog } from '@/components/AddBudgetDialog';
import { Link } from 'react-router-dom';
import { format, subMonths, addMonths, parse } from 'date-fns';

export default function Budgeting() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { budgets, loading: budgetsLoading, createBudget, deleteBudget } = useBudgets();
  const { transactions } = useTransactions();
  const { unreadCount } = useNotifications();
  
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return format(today, 'yyyy-MM');
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handlePreviousMonth = () => {
    const date = parse(currentMonth, 'yyyy-MM', new Date());
    const previous = subMonths(date, 1);
    setCurrentMonth(format(previous, 'yyyy-MM'));
  };

  const handleNextMonth = () => {
    const date = parse(currentMonth, 'yyyy-MM', new Date());
    const next = addMonths(date, 1);
    setCurrentMonth(format(next, 'yyyy-MM'));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (budgetsLoading) {
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
              <h1 className="text-2xl font-bold text-gray-900">Budgeting</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
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
                <span className="text-sm text-gray-700">{user?.fullName || user?.email}</span>
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
        {/* Month Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white p-6 rounded-lg border border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {format(parse(currentMonth, 'yyyy-MM', new Date()), 'MMMM yyyy')}
              </h2>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mb-8">
          <AddBudgetDialog month={currentMonth} onAdd={createBudget} />
        </div>

        {/* Budgets List */}
        <BudgetsList
          budgets={budgets}
          transactions={transactions}
          month={currentMonth}
          onDelete={deleteBudget}
        />
      </main>
    </div>
  );
}
