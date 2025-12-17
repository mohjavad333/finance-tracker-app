import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  totalIncome: number;
  totalExpenses: number;
}

export const StatsCards = ({ totalIncome, totalExpenses }: StatsCardsProps) => {
  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Total Income</p>
              <p className="text-3xl font-bold text-emerald-700 mt-2">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-emerald-200 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Expenses</p>
              <p className="text-3xl font-bold text-red-700 mt-2">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-50 to-blue-100 border-blue-200' : 'from-orange-50 to-orange-100 border-orange-200'}`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                Balance
              </p>
              <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                ${balance.toFixed(2)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${balance >= 0 ? 'bg-blue-200' : 'bg-orange-200'}`}>
              <Wallet className={`w-6 h-6 ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
