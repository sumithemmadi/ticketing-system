import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Forum } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const AdminListItems = ({ selectedItem }: { selectedItem: string }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton
        selected={selectedItem === "Dashboard"}
        onClick={() => navigate("/admin/dashboard")}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        selected={selectedItem === "Conversations"}
        onClick={() => navigate("/admin/conversations")}
      >
        <ListItemIcon>
          <Forum />
        </ListItemIcon>
        <ListItemText primary="Conversations" />
      </ListItemButton>
    </React.Fragment>
  );
};
