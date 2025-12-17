export interface Budget {
  id: string;
  userId: string;
  category: string;
  amount: number;
  month: string; // YYYY-MM format
  createdAt: string;
  updatedAt: string;
}

export interface CreateBudgetDTO {
  category: string;
  amount: number;
  month: string;
}

export interface UpdateBudgetDTO {
  category?: string;
  amount?: number;
  month?: string;
}
