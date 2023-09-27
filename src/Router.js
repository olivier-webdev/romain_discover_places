import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { userLoader } from "./loaders/userLoader";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Toplaces from "./pages/Toplaces";
import Allguides from "./pages/Allguides";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CountryDetail from "./pages/CountryDetail";
import LieuDetail from "./pages/LieuDetail";
import Admin from "./pages/Admin";
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin";
import TestProp from "./components/Testprop";
import ManageUser from "./pages/ManageUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profil",
        element: (
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        ),
      },
      {
        path: "/testprop",
        element: <TestProp />
      },
      {
        path: "/admin",
        element: (
          <ProtectedRouteAdmin>
            <Admin />
          </ProtectedRouteAdmin>
        ),
      },
      {
        path: "/manageuser",
        element: (
          <ProtectedRouteAdmin>
            <ManageUser />
          </ProtectedRouteAdmin>
        ),
      },
      {
        path: "/topplaces",
        element: <Toplaces />,
      },
      {
        path: "/allguides",
        element: <Allguides />,
      },
      {
        path: "/country/:id",
        element: <CountryDetail />,
      },
      {
        path: "/lieu/:id",
        element: <LieuDetail />,
      },
    ],
  },
]);
