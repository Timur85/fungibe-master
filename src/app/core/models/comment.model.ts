export interface Comment {
  id?: string;
  userId?: string;
  userName: string;
  reply?: string;
  comment: string;
  createdAt: number;
  isReply?: boolean;
}
