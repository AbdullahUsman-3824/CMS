// import React from "react"
import SideBar from "./Components/sidebar"
// import Content from "./Components/content"
// import Profile from "./Components/profile"
import Navbar from "./Components/navbar";
import "./App.css"
function App() {


  return (
    <div className="dashboard">
  <SideBar/>
  <div className="dashboard-content">
    {/* <Content />
    <Profile /> */}
    <Navbar />
  </div>
    </div>
  );
}

export default App
