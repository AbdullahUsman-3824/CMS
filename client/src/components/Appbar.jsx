import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon, Restaurant as RestaurantIcon } from '@mui/icons-material';

const stylingOpen = {
    width: "calc(100% - 240px)",
    marginLeft: "240px",
}

const Appbar = ({ open, setOpen }) => (
    <AppBar position="fixed"
        sx={{
            backgroundColor: "var(--secondary-dark)",
            transition: "all 0.3s ease-in-out ",
            zIndex: 1204,
            height: "72px",
            ...(open && stylingOpen)
        }}>
        <Toolbar>
            <IconButton
                color="inherit"
                onClick={() => setOpen(!open)}
                edge="start"
                sx={{ display: `${open && "none"}` }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" noWrap sx={{
                display: "flex", alignItems: "center", gap: "1rem", marginLeft: "1rem", fontSize: "1.8rem"
            }}>
                <RestaurantIcon sx={{ color: "var(--primary-light)", fontSize: "2.5rem" }} />
                Cafe Management System
            </Typography>
        </Toolbar>
    </AppBar >
);

export default Appbar;
