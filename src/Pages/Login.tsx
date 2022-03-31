import { useState } from "react";
import { auth } from "../services/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Footer } from "../Components/widgets/Footer";

const MainBoxLogin = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#f2f2f2",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "500px",
    width: "25%",
  },
}));

const ContainerLogin = styled("div")(({ theme }) => ({
  padding: "120px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "100%",
    width: "100%",
  },
}));

const FieldGroup = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  background: "#f2f2f2",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    width: "90%",
    gap: 4,
  },
}));

function Login() {
  const { user } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (user) {
        return <Redirect to="/course" />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <Redirect to="/course" />;
  }

  return (
    <>
      <ContainerLogin>
        <MainBoxLogin>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography textAlign={"center"} variant={"h3"} color={"#020202"}>
            Login
          </Typography>
          <FieldGroup>
            <TextField
              type="e-mail"
              placeholder="Email..."
              label="Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <TextField
              type="password"
              placeholder="Senha"
              label="Senha"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <Button variant={"outlined"} color={"success"} onClick={login}>
              Entrar
            </Button>

            <Button>
              <Link to="/register">Ainda não tem cadastro ?</Link>
            </Button>
          </FieldGroup>
        </MainBoxLogin>
      </ContainerLogin>
      <Footer />
    </>
  );
}

export default Login;
