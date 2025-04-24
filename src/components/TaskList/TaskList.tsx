import React from "react";
import { Box, Typography, List } from "@mui/material";
import useTaskStore from "../../store/taskStore";
import TaskItem from "./shared-components/TaskItem";

const TaskList: React.FC = () => {
  const { tasks } = useTaskStore();

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
      {tasks.length === 0 ? (
        <Typography variant="body1" align="center">
          وظیفه‌ای وجود ندارد.
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default TaskList;
