import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <>
        <Outlet />
        <Toaster />
      </>
    </>
  );
}

export default App;
