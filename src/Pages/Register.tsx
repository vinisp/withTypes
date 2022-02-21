import Container from "@mui/material/Container";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Register() {
  const { user } = useAuth();

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
      <Container component="main" maxWidth="xs">
        <h3>Cadastrar</h3>
        <input
          type="e-mail"
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <button onClick={register}>Confirmar cadastro</button>
        {auth.currentUser?.email}
      </Container>
    </>
  );
}

export default Register;
