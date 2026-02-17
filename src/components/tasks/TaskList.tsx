import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import { Task } from "../../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (!tasks.length) {
    return (
      <Box className="empty-state">
        <AssignmentTurnedInRoundedIcon color="disabled" sx={{ fontSize: 40 }} />
        <Typography variant="h6">آیتمی برای نمایش وجود ندارد</Typography>
        <Typography variant="body2" color="text.secondary">
          یک وظیفه جدید اضافه کنید یا فیلتر جستجو را تغییر دهید.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.5}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
};

export default TaskList;
