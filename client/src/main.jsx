import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import router from "./route.jsx"
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
import axios from 'axios'

// Set the base URL for axios requests
// In development, this might be empty to use the proxy
// In production, VITE_SERVER_URL should be set to the backend URL
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || "";
axios.defaults.withCredentials = true; // Ensure cookies are sent if needed


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
