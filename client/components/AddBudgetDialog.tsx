import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { expenseCategories } from '@/constants/categories';
import { CreateBudgetDTO } from '@/types/budget';
import { toast } from 'sonner';

interface AddBudgetDialogProps {
  month: string;
  onAdd: (data: CreateBudgetDTO) => Promise<void>;
}

export const AddBudgetDialog = ({ month, onAdd }: AddBudgetDialogProps) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  const categories = [...expenseCategories, ...customCategories];

  const handleAddCustomCategory = () => {
    const trimmedCategory = customCategory.trim();
    if (!trimmedCategory) {
      toast.error('Please enter a category name');
      return;
    }
    if (categories.includes(trimmedCategory)) {
      toast.error('This category already exists');
      return;
    }
    setCustomCategories([...customCategories, trimmedCategory]);
    setCategory(trimmedCategory);
    setCustomCategory('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await onAdd({
        category,
        amount: parseFloat(amount),
        month,
      });
      setCategory('');
      setAmount('');
      setCustomCategory('');
      setCustomCategories([]);
      setOpen(false);
      toast.success('Budget added successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add budget');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Set a budget limit for {month}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2 mt-3">
              <Input
                placeholder="Add custom category..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomCategory();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCustomCategory}
                className="px-3"
              >
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Budget Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? 'Adding...' : 'Add Budget'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
