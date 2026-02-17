import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";

interface AppHeaderProps {
  onCreateClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onCreateClick }) => {
  return (
    <Box className="app-header" mb={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            مدیریت وظایف
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            یک داشبورد ساده، تمیز و سریع برای مدیریت کارهای روزانه
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddTaskRoundedIcon sx={{ ml: 2 }} />}
          onClick={onCreateClick}
        >
          وظیفه جدید
        </Button>
      </Stack>
    </Box>
  );
};

export default AppHeader;
