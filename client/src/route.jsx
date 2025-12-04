import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Userprofile from "./pages/Userprofile";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import Construction from "./pages/Construction";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
      { path: "/signup", element: <Signup /> },
      { path: "/construction", element: <Construction /> },
      { path: "/landingPage", element: <LandingPage /> },
      { path: "/:id", element: <Userprofile /> },
    ],
  },
]);

export default router;
