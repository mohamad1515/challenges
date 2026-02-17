import React, { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import useTaskStore from "./store/taskStore";
import AppHeader from "./components/layout/AppHeader";
import TaskToolbar from "./components/tasks/TaskToolbar";
import TaskList from "./components/tasks/TaskList";
import TaskFormModal from "./components/tasks/TaskFormModal";
import { Task } from "./types/task";

const App: React.FC = () => {
  const {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    clearCompleted,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
  } = useTaskStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const theme = createTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: "#5b5fef",
      },
      secondary: {
        main: "#00a896",
      },
      background: {
        default: "#f4f6fb",
      },
    },
    typography: {
      fontFamily: "Vazir, Arial, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      if (filter === "done") {
        return matchesSearch && task.completed;
      }

      if (filter === "todo") {
        return matchesSearch && !task.completed;
      }

      return matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleCreateTask = (payload: {
    title: string;
    description: string;
  }) => {
    createTask(payload);
    setSnackbarMessage("وظیفه جدید با موفقیت ایجاد شد.");
  };

  const handleUpdateTask = (payload: {
    title: string;
    description: string;
  }) => {
    if (!editingTask) {
      return;
    }

    updateTask(editingTask.id, payload);
    setSnackbarMessage("وظیفه با موفقیت ویرایش شد.");
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
    setSnackbarMessage("وظیفه حذف شد.");
  };

  const handleToggleTask = (taskId: number) => {
    toggleTaskCompletion(taskId);
  };

  const handleClearCompleted = () => {
    clearCompleted();
    setSnackbarMessage("وظایف انجام‌شده پاک شدند.");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container dir="rtl" maxWidth="md" sx={{ py: 4, minHeight: "100vh" }}>
        <Box className="app-shell">
          <AppHeader onCreateClick={handleOpenCreateModal} />

          <TaskToolbar
            total={tasks.length}
            completed={tasks.filter((task) => task.completed).length}
            filter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onClearCompleted={handleClearCompleted}
          />

          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        </Box>

        <TaskFormModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />

        <Snackbar
          open={Boolean(snackbarMessage)}
          autoHideDuration={2500}
          onClose={() => setSnackbarMessage("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarMessage("")}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default App;
