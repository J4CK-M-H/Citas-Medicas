import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/LayoutComponents/AppHeader";
import AppDrawer from "../components/LayoutComponents/AppDrawer";
import { useState } from "react";

const AppLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = (open: boolean) => () => {
    setOpenDrawer(open);
  };

  return (
    <Box>
      <AppHeader handleOpenDrawer={handleOpenDrawer} />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 80px)",
          margin: 0,
          position: "relative",
          padding: 0,
        }}
      >
        <AppDrawer
        // openDrawer={openDrawer}
        // handleOpenDrawer={handleOpenDrawer}
        />
        <Box
          sx={{
            flex: 1,
            // flexGrow: 1,
            padding: 2,
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
            // EFEEEA
          }}
        >
          <Typography
            component="h1"
            sx={{ fontSize: 30, mb: 2, textDecoration: "underline" }}
          >
            Sistema de citas
          </Typography>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
