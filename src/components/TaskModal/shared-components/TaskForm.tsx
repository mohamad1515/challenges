import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Box,
  Typography,
  Stack,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

const TaskForm: React.FC<{
  addTask: (title: string) => void;
  onCancel: () => void;
}> = ({ addTask, onCancel }) => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: { title: "" },
      validationSchema: Yup.object({
        title: Yup.string()
          .matches(/^[\u0600-\u06FF\s]+$/, "فقط از حروف فارسی استفاده کنید.")
          .required("عنوان الزامی است."),
      }),
      onSubmit: (values, { resetForm }) => {
        addTask(values.title);
        resetForm();
      },
    });

  return (
    <Box
      dir="rtl"
      sx={{
        maxWidth: 500,
        m: "0 auto",
        p: 4,
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        اضافه کردن وظیفه
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth sx={{ my: 2 }}>
          <FormHelperText sx={{ textAlign: "right" }}>عنوان</FormHelperText>
          <OutlinedInput
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{ textAlign: "right", direction: "rtl" }}
          />
          <FormHelperText sx={{ textAlign: "right", color: "red" }}>
            {touched.title && errors.title}
          </FormHelperText>
        </FormControl>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ ml: 1 }}
          >
            افزودن
          </Button>
          <Button variant="outlined" color="error" onClick={onCancel}>
            انصراف
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskForm;
