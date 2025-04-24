import React from "react";
import { Modal, Box } from "@mui/material";
import { TaskModalProps } from "./models/taskModal";
import TaskForm from "./shared-components/TaskForm";

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, addTask }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <TaskForm addTask={addTask} onCancel={onClose} />
      </Box>
    </Modal>
  );
};

export default TaskModal;
