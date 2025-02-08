import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Components/Sidebar";
import Navbar from "./Components/navbar";
import Dashboard from "./Components/Pages/Dashboard";
import Categories from "./Components/Pages/Categories";
import Products from "./Components/Pages/Products";
import POS from "./Components/Pages/POS";
import Orders from "./Components/Pages/Orders";
import Tables from "./Components/Pages/Tables";
import Report from "./Components/Pages/Report";
import Settings from "./Components/Pages/Settings";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="dashboard">
        <SideBar />
        <div className="dashboard-content">
          <Navbar />
          <div className="page-content">
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
        </div>
      </div>
    </Router>
  );
}

export default App;
