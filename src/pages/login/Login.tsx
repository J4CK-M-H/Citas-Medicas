import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/auth/authSlice";
import { authService } from "../../services/auth/loginService";
import type { AppDispatch } from "../../store";
import "./login.css";

const Login = () => {
  console.log("Login component rendered");
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [messageAlert, setMessageAlert] = useState({
    active: false,
    message: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await authService.login(loginData);
      dispatch(loginSuccess(user)); // <- actualiza el estado global
      // navigate("/pacientes"); // <- redirige al usuario a la página principal
      console.log("Login successful:", user);
    } catch (error) {
      setMessageAlert({
        active: true,
        message: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: { xs: "80%", sm: "400px" },
          boxShadow: "0 0 4px #ccc",
          px: 2,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "#fff",
        }}
        component="form"
        method="POST"
        onSubmit={handleLogin}
      >
        {messageAlert.active && (
          <Alert
            severity="error"
            onClose={() => setMessageAlert({ active: false, message: "" })}
          >
            {messageAlert.message}
          </Alert>
        )}
        <Box>
          <label>Email:</label>
          <input
            className="field-login"
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />
        </Box>
        <Box>
          <label>Password:</label>
          <input
            className="field-login"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />
        </Box>
        <Button type="submit" variant="contained" sx={{ py: 1 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
