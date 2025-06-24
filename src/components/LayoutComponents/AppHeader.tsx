import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { logout } from "../../store/auth/authSlice";

const AppHeader = ({ handleOpenDrawer }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "", height: "80px" }}>
        <Toolbar
          sx={{
            display: "flex",
            height: "100%",
            backgroundColor: "#075B5E",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
