import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Hostels from "./pages/Hostels";
import Rooms from "./pages/Rooms";
import Beds from "./pages/Beds";
import Residents from "./pages/Residents";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Hostel Management */}
        <Route
          path="/hostels"
          element={
            <ProtectedRoute>
              <Hostels />
            </ProtectedRoute>
          }
        />

        {/* Room Management */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />

        {/* Bed Management */}
        <Route
          path="/beds"
          element={
            <ProtectedRoute>
              <Beds />
            </ProtectedRoute>
          }
        />

        {/* Resident Management */}
        <Route
          path="/residents"
          element={
            <ProtectedRoute>
              <Residents />
            </ProtectedRoute>
          }
        />

        {/* Payment Management */}
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;