import "./styles/App.css";
import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Sidebar, MainContent, Appbar } from "./components"
import { BrowserRouter } from "react-router-dom";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar open={open} setOpen={setOpen} />
        <Sidebar open={open} setOpen={setOpen} />
        <MainContent open={open} />
      </Box>
    </BrowserRouter>
  );
}

export default App;
