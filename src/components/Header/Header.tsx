import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { HeaderProps } from "./models/header";

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px  auto 15px",
        maxWidth: 800,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"}>
        لیست وظایف
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onOpenModal}
        startIcon={<AddIcon sx={{ ml: 1 }} />}
      >
        ایجاد وظیفه
      </Button>
    </Box>
  );
};

export default Header;
