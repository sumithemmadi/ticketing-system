import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./user/Login";
import Registration from "./user/Registration";
import Dashboard from "./user/Dashboard";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminConversations from "./admin/AdminConversations";
import Conversations from "./user/Conversations";
import AddTicketPage from "./user/AddTicketPage";
import NotFound from "./components/NotFound";
import NotAllowed from "./components/NotAllowed";
import Home from "./Home";
import ForgotPassword from "./user/ForgotPassword";

const defaultTheme = createTheme();

function App() {
  const context = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/add-ticket",
      element: <AddTicketPage />,
    },
    {
      path: "/conversations",
      element: <Conversations />,
    },

    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/conversations",
      element: <AdminConversations />,
    },

    {
      path: "/not-allowed",
      element: <NotAllowed />,
    },

    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {context?.isReady ? (
        <RouterProvider router={router} />
      ) : (
        <>
          {/* Loader */}
          <div>Loading</div>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
