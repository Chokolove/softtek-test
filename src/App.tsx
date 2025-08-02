import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Plans from "./pages/Plans";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/plans" element={<Plans />} />
      </Route>
    </Routes>
  );
}
