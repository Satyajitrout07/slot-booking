import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//
// USER PAGES
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

//
// SLOT PAGES
//
import Slot30 from "./pages/slots/Slot30";
import Slot45 from "./pages/slots/Slot45";
import Slot60 from "./pages/slots/Slot60";

//
// ADMIN PAGES
//
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  //
  // TOKEN
  //
  const token =
    localStorage.getItem(
      "token"
    );

  //
  // ROLE
  //
  const role =
    localStorage.getItem(
      "role"
    );

  return (
    <BrowserRouter>
      <Routes>
        {/* USER */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            token &&
            role ===
              "CANDIDATE" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 30 MIN */}
        <Route
          path="/slots/30"
          element={
            token &&
            role ===
              "CANDIDATE" ? (
              <Slot30 />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 45 MIN */}
        <Route
          path="/slots/45"
          element={
            token &&
            role ===
              "CANDIDATE" ? (
              <Slot45 />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 60 MIN */}
        <Route
          path="/slots/60"
          element={
            token &&
            role ===
              "CANDIDATE" ? (
              <Slot60 />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/login"
          element={
            <AdminLogin />
          }
        />

        <Route
          path="/admin/register"
          element={
            <AdminRegister />
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            token &&
            role ===
              "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />

        {/* DEFAULT */}
        <Route
          path="*"
          element={
            <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}