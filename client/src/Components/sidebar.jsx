import { NavLink } from "react-router-dom";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import PendingIcon from '@mui/icons-material/Pending';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import "../styles/sidebar.css";

export default function SideBar() {
    return (
        <div className='menu'>
            <div className="logo">
                <RestaurantIcon />
                <h2>SYSTEM</h2>
            </div>
            <br />
            <br />
            <div className="menu-list">
                <NavLink to="/" className={({ isActive }) => `item ${isActive ? "active" : ""}`}>
                    <HomeIcon className='icon' />
                    Dashboard
                </NavLink>
                <NavLink to="/categories" className={({ isActive }) => `item ${isActive ? "active" : ""}`}>
                    <PendingIcon className='icon' />
                    Categories
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => `item ${isActive ? "active" : ""}`}>
                    <Inventory2OutlinedIcon className='icon' />
                    Products
                </NavLink>
                <NavLink to="/pos" className={({ isActive }) => `item ${isActive ? "active" : ""}`}>
                    <PointOfSaleOutlinedIcon className='icon' />
                    POS
                </NavLink>
                <NavLink to="/orders" className={({ isActive }) => `item ${isActive ? "active" : ""}`}>
                    <DescriptionIcon className='icon' />
                    Orders
                </NavLink>
                <NavLink to="/tables" className={({ isActive }) => `item ${isActive ? "active" : ""}`}>
                    <TableRestaurantIcon className='icon' />
                    Tables
                </NavLink>
                <NavLink to="/report" className={({ isActive }) => `item ${isActive ? "active" : ""}`}>
                    <AssessmentIcon className='icon' />
                    Report
                </NavLink>
                <br />
                <NavLink to="/settings" className={({ isActive }) => `set ${isActive ? "active" : ""}`}>
                    <SettingsIcon className="setting" />
                    Settings
                </NavLink>
            </div>
        </div>
    );
}
