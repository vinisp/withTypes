import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";
import { TextareaAutosize, Button } from "@mui/material";
import { useState } from "react";
import { Footer } from "../../Components/widgets/Footer";

export const MakePost = () => {
  const [post, setPost] = useState<string>("");
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div
        style={{
          paddingTop: "120px",
          backgroundColor: "#FFF",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Crie uma nova Postagem</h1>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={30}
          style={{ width: 'min(850px, 80vw)', marginTop: '2rem', marginBottom: '2rem' }}
          onChange={(e) => setPost(e.target.value)}
          
        />
        <Button variant="contained" color="success" onClick={() => console.log(user?.id, post)}>
          Enviar Postagem
        </Button>
        
      </div>
      <Footer />
    </>
  );
};
