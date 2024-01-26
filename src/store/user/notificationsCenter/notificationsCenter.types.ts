export interface INotificationItem {
  acknowledgedSessionId: string;
  alertCategoryId: string;
  alertCategoryName: string;
  alertHistoryId: string;
  alertId: string;
  alertName: string;
  channel: string;
  channelId: string;
  dateAcknowledged: string;
  dateRead: string;
  dateSent: string;
  plainMessage: string;
  status: string;
  subject: string;
  htmlMessage?: string;
}
