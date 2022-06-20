import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";
import { TextareaAutosize, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Footer } from "../../Components/widgets/Footer";

const APIURL = "https://deppback.herokuapp.com/";

export const MakePost = () => {
  const [post, setPost] = useState<string>("");
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }

  function AlertAndClear() {
    setPost("");
    window.alert("Postagem realizada com sucesso");
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
          style={{
            width: "min(850px, 80vw)",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            axios
              .post(`${APIURL}post/create`, {
                user_id: user.id,
                post_content: post,
                post_id: uuid() 
              })
              .then((response) =>
                response.status === 200 ? AlertAndClear() : false
              )
              .catch((error) => console.error(error));
            setPost(""); 
          }}
        >
          Enviar Postagem
        </Button>
        <Footer />
      </div>
    </>
  );
};
