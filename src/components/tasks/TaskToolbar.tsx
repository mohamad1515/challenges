import React from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { TaskFilter } from "../../types/task";

interface TaskToolbarProps {
  total: number;
  completed: number;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onClearCompleted: () => void;
}

const TaskToolbar: React.FC<TaskToolbarProps> = ({
  total,
  completed,
  filter,
  onFilterChange,
  searchTerm,
  onSearchTermChange,
  onClearCompleted,
}) => {
  return (
    <Box className="toolbar-shell" mb={3}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={2}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="جستجو در عنوان یا توضیحات..."
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
          />

          <ToggleButtonGroup
            sx={{
              direction: "ltr",
              "& .MuiToggleButton-root": {
                minWidth: 90,
              },
            }}
            exclusive
            size="small"
            color="primary"
            value={filter}
            onChange={(_, value: TaskFilter | null) =>
              value && onFilterChange(value)
            }
          >
            <ToggleButton value="all">همه</ToggleButton>
            <ToggleButton value="todo">در حال انجام</ToggleButton>
            <ToggleButton value="done">انجام شده</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={1.5}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <FilterAltRoundedIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              وضعیت کلی:
            </Typography>
            <Chip label={`کل: ${total}`} size="small" />
            <Chip
              label={`انجام شده: ${completed}`}
              size="small"
              color="success"
            />
            <Chip
              label={`باقی‌مانده: ${Math.max(total - completed, 0)}`}
              size="small"
              color="warning"
            />
          </Stack>

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteSweepRoundedIcon sx={{ ml: 1 }} />}
            disabled={completed === 0}
            onClick={onClearCompleted}
          >
            حذف انجام‌شده‌ها
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TaskToolbar;
