export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  assignees: string[];
  tags: string[];
}
