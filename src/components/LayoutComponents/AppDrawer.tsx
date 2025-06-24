import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import GroupsIcon from "@mui/icons-material/Groups";
import DescriptionIcon from "@mui/icons-material/Description";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { Link } from "react-router-dom";

// interface IAppDrawer {
//   openDrawer: boolean;
//   handleOpenDrawer: (open: boolean) => () => void;
// }

const DrawerLinks = [
  { key: 1, text: "Pacientes", icon: <GroupsIcon /> },
  {
    key: 2,
    text: "Doctores",
    icon: <HealthAndSafetyIcon />,
    route: "/doctores",
  },
  { key: 3, text: "Citas", icon: <DescriptionIcon />, route: "/citas" },
];

const AppDrawer = () => {
  return (
    <Box
      sx={{
        // minWidth: 250,
        width: { xs: "0px", lg: "250px" },
        overflow: "hidden",
        // maxWidth: 300,
        height: "100%",
        bgcolor: "white",
        borderRight: "1px solid #ccc",
        transition: ".5s all",
        // transform: { xl: "translate(-100px,0)" },
        // position: "absolute",
      }}
      // onClick={handleOpenDrawer(false)}
    >
      {/* <Drawer open={openDrawer} onClose={handleOpenDrawer(false)}> */}
      <List>
        {DrawerLinks.map((link) => (
          <Link
            to={link?.route ? link?.route : "/pacientes"}
            key={link.key}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={link.key} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {link.icon ? link.icon : <InboxIcon />}
                </ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      {/* </Drawer> */}
    </Box>
  );
};

export default AppDrawer;
