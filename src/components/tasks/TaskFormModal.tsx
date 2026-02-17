import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Task, TaskPayload } from "../../types/task";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: TaskPayload) => void;
  task: Task | null;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  task,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      return;
    }

    setTitle("");
    setDescription("");
  }, [task, open]);

  const titleError = useMemo(() => {
    if (!submitted) {
      return "";
    }

    if (!title.trim()) {
      return "عنوان وظیفه الزامی است.";
    }

    if (title.trim().length < 3) {
      return "عنوان باید حداقل ۳ کاراکتر باشد.";
    }

    return "";
  }, [submitted, title]);

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = () => {
    setSubmitted(true);

    if (!title.trim() || title.trim().length < 3) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? "ویرایش وظیفه" : "ایجاد وظیفه جدید"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            autoFocus
            label="عنوان"
            value={title}
            error={Boolean(titleError)}
            helperText={titleError || " "}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label="توضیحات"
            value={description}
            multiline
            minRows={3}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="text" color="inherit" onClick={handleClose}>
          انصراف
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {task ? "ذخیره تغییرات" : "ایجاد"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
