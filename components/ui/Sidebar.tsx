import { InboxOutlined, MailOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />
      </Box>
    </Drawer>
  );
};
