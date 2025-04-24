import { create } from "zustand";
import { Task } from "../components/TaskList/models/taskItem";

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
  loadTasks: () => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  addTask: (title) =>
    set((state) => {
      const updatedTasks = [
        ...state.tasks,
        { id: Date.now(), title, completed: false },
      ];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  removeTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  toggleCompletion: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  loadTasks: () =>
    set(() => ({
      tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    })),
}));

export default useTaskStore;
