import { create } from "zustand";
import { Task, TaskFilter, TaskPayload } from "../types/task";

const STORAGE_KEY = "tasks";

const parseTasks = (): Task[] => {
  const rawTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Array<
    Partial<Task> & { id?: number; title?: string; completed?: boolean }
  >;

  return rawTasks
    .filter((item) => typeof item.id === "number" && typeof item.title === "string")
    .map((item) => ({
      id: item.id as number,
      title: item.title as string,
      description: item.description ?? "",
      completed: Boolean(item.completed),
      createdAt: item.createdAt ?? new Date().toISOString(),
    }));
};

const persistTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  searchTerm: string;

  createTask: (payload: TaskPayload) => void;
  updateTask: (id: number, payload: TaskPayload) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
  clearCompleted: () => void;
  setFilter: (filter: TaskFilter) => void;
  setSearchTerm: (term: string) => void;

  // Backward compatibility with previous structure
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
  loadTasks: () => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: parseTasks(),
  filter: "all",
  searchTerm: "",

  createTask: (payload) =>
    set((state) => {
      const updatedTasks: Task[] = [
        {
          id: Date.now(),
          title: payload.title.trim(),
          description: payload.description.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
        ...state.tasks,
      ];
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),

  updateTask: (id, payload) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: payload.title.trim(),
              description: payload.description.trim(),
            }
          : task
      );
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),

  toggleTaskCompletion: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),

  clearCompleted: () =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => !task.completed);
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),

  setFilter: (filter) => set({ filter }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  addTask: (title) =>
    set((state) => {
      const updatedTasks: Task[] = [
        {
          id: Date.now(),
          title: title.trim(),
          description: "",
          completed: false,
          createdAt: new Date().toISOString(),
        },
        ...state.tasks,
      ];
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),
  removeTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),
  toggleCompletion: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      persistTasks(updatedTasks);
      return { tasks: updatedTasks };
    }),
  loadTasks: () =>
    set(() => ({
      tasks: parseTasks(),
    })),
}));

export default useTaskStore;
