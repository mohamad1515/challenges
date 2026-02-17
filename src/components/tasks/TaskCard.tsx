import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <Card className="task-card" variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Stack direction="row" gap={1.5} alignItems="flex-start" flex={1}>
            <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />

            <Stack spacing={0.5} flex={1}>
              <Typography
                variant="h6"
                fontSize="1rem"
                sx={{ textDecoration: task.completed ? "line-through" : "none" }}
              >
                {task.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {task.description || "بدون توضیحات"}
              </Typography>

              <Stack direction="row" gap={1} mt={1}>
                <Chip
                  size="small"
                  color={task.completed ? "success" : "warning"}
                  label={task.completed ? "انجام‌شده" : "در حال انجام"}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  label={new Date(task.createdAt).toLocaleDateString("fa-IR")}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" gap={1}>
            <Tooltip title="ویرایش">
              <IconButton color="primary" onClick={() => onEdit(task)}>
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="حذف">
              <IconButton color="error" onClick={() => onDelete(task.id)}>
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
