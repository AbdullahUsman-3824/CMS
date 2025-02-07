import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import PendingIcon from '@mui/icons-material/Pending';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AssessmentIcon from '@mui/icons-material/Assessment';
import "../styles/sidebar.css"

export default function SideBar(){
    return (
        <div className='menu'>
            <div className="logo">
                <RestaurantIcon/>
                <h2>SYSTEM</h2>
            </div>
            <br />
            <br />
            <div className="menu-list"> 
                <a href="#" className="item">
                    <HomeIcon className='icon'/>
                    Dashboard
                </a>
                <a href="#" className="item">
                    <PendingIcon className='icon'/>
                    Categories
                </a>
                <a href="#" className="item">
                    <Inventory2OutlinedIcon className='icon'/>
                    Products
                </a>
                <a href="#" className="item">
                    <PointOfSaleOutlinedIcon className='icon'/>
                    POS
                </a>
                <a href="#" className="item">
                    <DescriptionIcon className='icon'/>
                    Orders
                </a>
                <a href="#" className="item">
                    <TableRestaurantIcon className='icon'/>
                    Tables
                </a>
                <a href="#" className="item">
                    <AssessmentIcon className='icon'/>
                    Report
                </a>
            </div>
        </div>
    );
}