export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  priority: string;
  tags: string[];
  members: string[];
  tasks: string[];
}
