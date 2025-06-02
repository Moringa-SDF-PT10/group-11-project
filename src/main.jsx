import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import  UserProvider  from "./context/UserContext";
import './index.css'
import App from './App.jsx'
import ShipmentUI from "./components/shipmentUI";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <ShipmentUI />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);

