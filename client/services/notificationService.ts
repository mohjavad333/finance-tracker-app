import { Notification, NotificationType } from '../types/notification';

const STORAGE_KEY = 'notifications';

export const notificationService = {
  getAll(): Notification[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  create(
    type: NotificationType,
    title: string,
    message: string,
    data?: Notification['data']
  ): Notification {
    const notifications = this.getAll();
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'local',
      type,
      title,
      message,
      data,
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifications.push(notification);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    return notification;
  },

  markAsRead(id: string): void {
    const notifications = this.getAll();
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications[index].read = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    }
  },

  markAllAsRead(): void {
    const notifications = this.getAll();
    notifications.forEach(n => (n.read = true));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  },

  delete(id: string): void {
    const notifications = this.getAll();
    const filtered = notifications.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  deleteAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getUnreadCount(): number {
    return this.getAll().filter(n => !n.read).length;
  },
};
