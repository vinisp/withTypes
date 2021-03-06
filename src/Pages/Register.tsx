import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Redirect } from "react-router-dom";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Footer } from "../Components/widgets/Footer";

import { useAuth } from "../hooks/useAuth";

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

const MainBoxRegister = styled("div")(({ theme }) => ({
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

function Register() {
  const { user } = useAuth();

  console.log();

  const [registerEmail, setRegisterEmail] = useState("");

  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <Redirect to="/memberhome" />;
  }

  return (
    <>
      <ContainerLogin>
        <MainBoxRegister>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography textAlign={"center"} color={"#0c0c0c"} variant={"h4"}>
            Cadastrar
          </Typography>
          <FieldGroup>
            <TextField
              type="e-mail"
              placeholder="Email..."
              label="E-mail"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <TextField
              type="password"
              placeholder="Senha"
              label="Senha"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <Button onClick={register} variant="outlined" color={"success"}>
              Confirmar cadastro
            </Button>
            <Button>
              <Link to="/login">J?? ?? cadastrado ?</Link>
            </Button>
          </FieldGroup>
          {auth.currentUser?.email}
        </MainBoxRegister>
      </ContainerLogin>
      <Footer />
    </>
  );
}

export default Register;
