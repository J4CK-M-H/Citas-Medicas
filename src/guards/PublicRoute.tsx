import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log("PublicRoute isAuthenticated:", isAuthenticated);
  // Si el usuario está autenticado, redirige a la página de pacientes
  return isAuthenticated ? <Navigate to="/pacientes" /> : <Outlet />;
};

export default PublicRoute;
