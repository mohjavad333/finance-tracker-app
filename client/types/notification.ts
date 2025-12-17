export type NotificationType = 'budget_warning' | 'budget_exceeded' | 'transaction_added' | 'budget_created' | 'general';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: {
    category?: string;
    spent?: number;
    limit?: number;
    month?: string;
    transactionId?: string;
    budgetId?: string;
  };
  read: boolean;
  createdAt: string;
}
