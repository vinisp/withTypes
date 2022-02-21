import { useState } from "react";
import { auth } from "../services/firebase";
import Container from "@mui/material/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
      <Container component="main" maxWidth="xs">
        <h3>Cadastrar</h3>

        <input
          type="e-mail"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}>Confirmar cadastro</button>
      </Container>
    </>
  );
}

export default Login;
