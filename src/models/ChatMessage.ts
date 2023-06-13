export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
  recipient?: string;
  attachments?: string[];
}
