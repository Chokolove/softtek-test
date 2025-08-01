import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Plans from "./pages/Plans";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/plans" element={<Plans />} />
    </Routes>
  );
}
