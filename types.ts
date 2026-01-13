
export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  username: string;
  ign: string; // In-game name
  role: Role;
  joinedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
  votedBy: Record<string, 'up' | 'down'>;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  ign: string;
  text: string;
  timestamp: string;
}

export type View = 'monitoring' | 'announcements' | 'chat' | 'admin';
