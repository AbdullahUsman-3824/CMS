import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Categories, Products, POS, Orders, Tables, Report, Settings } from '../views';

const MainContent = ({ open }) => {
    return (
        <div className="pageContent" style={{
            marginTop: "72px",
            marginLeft: open ? "240px" : "70px"
        }}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/pos" element={<POS />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/report" element={<Report />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    )
}

export default MainContent
