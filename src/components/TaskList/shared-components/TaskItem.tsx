import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import useTaskStore from "../../../store/taskStore";
import {
  ListItem,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "../models/taskItem";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { removeTask, toggleCompletion } = useTaskStore();
  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleOpenDialog = (taskId: number) => {
    setTaskToDelete(taskId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setTaskToDelete(null);
    setOpen(false);
  };

  const handleDelete = () => {
    if (taskToDelete !== null) {
      removeTask(taskToDelete);
      toast.success("آیتم حذف شد!");
    }
    setTaskToDelete(null);
    setOpen(false);
  };

  return (
    <>
      <ListItem
        key={task.id}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          padding: 2,
          backgroundColor: task.completed ? "#e8f5e9" : "#fff3e0",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="body1"
          onClick={() => toggleCompletion(task.id)}
          sx={{
            cursor: "pointer",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Typography>
        <Box>
          <IconButton
            onClick={() => toggleCompletion(task.id)}
            color={task.completed ? "success" : "default"}
          >
            {task.completed ? <CheckCircleIcon /> : <CancelIcon />}
          </IconButton>
          <IconButton onClick={() => handleOpenDialog(task.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>آیا از حذف این آیتم مطمئن هستید؟</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            انصراف
          </Button>
          <Button onClick={handleDelete} color="error">
            تأیید
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default TaskItem;
