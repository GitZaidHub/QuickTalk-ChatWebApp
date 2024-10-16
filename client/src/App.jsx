import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="flex relative items-center justify-center h-screen">
        <Outlet />
        <Toaster  />
      </div>
    </>
  );
}

export default App;
