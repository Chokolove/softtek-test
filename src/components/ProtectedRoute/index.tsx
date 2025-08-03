import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const user = useSelector((state: RootState) => state.user.data);
  const isLoggedIn = !!user?.docNumber;

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
