import React, { useState, useEffect } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Header from "./components/Header/Header";
import useTaskStore from "./store/taskStore";
import TaskModal from "./components/TaskModal/TaskModal";
import TaskList from "./components/TaskList/TaskList";

const App: React.FC = () => {
  const { addTask, loadTasks } = useTaskStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "Vazir, Arial, sans-serif",
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container dir="rtl" maxWidth="md" sx={{ padding: "20px" }}>
        <Header onOpenModal={handleOpen} />
        <TaskList />
        <TaskModal open={open} onClose={handleClose} addTask={addTask} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
