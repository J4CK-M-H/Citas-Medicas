import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Pacientes from "../pages/Pacientes";
import Doctores from "../pages/doctores/Doctores";
import Login from "../pages/login/Login";
import PublicRoute from "../guards/PublicRoute";
import PrivateRoute from "../guards/PrivateRoute";
import Citas from "../pages/Citas";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pacientes" />} />

      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/doctores" element={<Doctores />} />
          <Route path="/citas" element={<Citas />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
