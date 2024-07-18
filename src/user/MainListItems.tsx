import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AddBox, Forum } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";

export const MainListItems = ({ selectedItem }: { selectedItem: string }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton
        selected={selectedItem === "Dashboard"}
        onClick={() => navigate("/dashboard")}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        selected={selectedItem === "Add Ticket"}
        onClick={() => navigate("/add-ticket")}
      >
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <ListItemText primary="Add Ticket" />
      </ListItemButton>
      <ListItemButton
        selected={selectedItem === "Conversations"}
        onClick={() => navigate("/conversations")}
      >
        <ListItemIcon>
          <Badge badgeContent={1} color="secondary">
            <Forum />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Conversations" />
      </ListItemButton>
    </React.Fragment>
  );
};
