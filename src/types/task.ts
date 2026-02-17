export type TaskFilter = "all" | "todo" | "done";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskPayload {
  title: string;
  description: string;
}
