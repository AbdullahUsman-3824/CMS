// React imports 
import { NavLink } from "react-router-dom";
import React from 'react';

// Material UI imports
import { Drawer, List, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// Material Icons imports
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Pending';
import ProductIcon from '@mui/icons-material/Inventory2Outlined';
import PosIcon from '@mui/icons-material/PointOfSaleOutlined';
import OrderIcon from '@mui/icons-material/Description';
import TableIcon from '@mui/icons-material/TableRestaurant';
import ReportIcon from '@mui/icons-material/Assessment';
import SettingsIcon from "@mui/icons-material/Settings";

import "../styles/sidebar.css";

const menuItems = [
    { path: "/", name: "Dashboard", icon: <HomeIcon className="icon" /> },
    { path: "/categories", name: "Categories", icon: <CategoryIcon className="icon" /> },
    { path: "/products", name: "Products", icon: <ProductIcon className="icon" /> },
    { path: "/pos", name: "POS", icon: <PosIcon className="icon" /> },
    { path: "/orders", name: "Orders", icon: <OrderIcon className="icon" /> },
    { path: "/tables", name: "Tables", icon: <TableIcon className="icon" /> },
    { path: "/report", name: "Report", icon: <ReportIcon className="icon" /> }
];

export default function SideBar({ open, setOpen }) {

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <Drawer
            variant="permanent"
            PaperProps={{
                sx: {
                    transition: "width 0.3s ease-in-out",
                    width: open ? "240px" : "70px",
                    overflowX: "hidden",
                    backgroundColor: "var(--primary-dark)",
                    border: "none"
                },
            }}
            className="sidebar"
        >
            {/* Sidebar Toggle Button */}
            <div className="sidebar-toggle">
                <IconButton onClick={toggleDrawer} sx={{ color: "var(--secondary-light)" }}>
                    {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>

            {/* Navigation Menu */}
            <List className="menu-list">
                {menuItems.map(({ path, name, icon }, index) => (
                    <ListItem disablePadding key={index}>
                        <NavLink
                            to={path}
                            className={({ isActive }) =>
                                `item ${isActive ? "active-link" : "inactive-link"} ${open ? "open" : "close"}`
                            }
                            style={open ? { marginLeft: "30px" } : { margin: "auto" }}
                        >
                            <ListItemButton sx={{ borderRadius: "50px 0 0 50px", padding: "12px", gap: "10px" }}>
                                <ListItemIcon sx={{ minWidth: "32px" }}>{icon}</ListItemIcon>
                                <ListItemText primary={name} className="item-text" />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
            </List>

            <ListItem disablePadding className="settings">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `item settings ${isActive ? "active-link" : "inactive-link"} ${open ? "open" : "close"}`
                    }
                >
                    <ListItemButton sx={{ borderRadius: "50px", padding: "12px" }}>
                        <ListItemIcon sx={{ minWidth: "32px" }}>
                            <SettingsIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText primary="Settings" className="item-text" />
                    </ListItemButton>
                </NavLink>
            </ListItem>

        </Drawer>
    );
}
