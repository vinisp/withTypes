import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Footer } from "../../Components/widgets/Footer";

import { styled } from "@mui/material/styles";

const FormWrapper = styled("div")(({ theme }) => ({
  padding: "160px 40px",
  background: "rgba(255,255,255, 1)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowX: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

export function EditProfilePage() {
  const [userName, setUserName] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [facebookLink, setFacebookLink] = useState<string>("");
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [twitterLink, setTwitterLink] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");

  return (
    <>
      <FormWrapper>
        <h1>Minha página de edição do perfil</h1>
        <TextField
          id="outlined-name"
          label="Nome do usuário"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Resumo"
          value={resume}
          onChange={(event) => {
            setResume(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Link do Facebook"
          value={facebookLink}
          onChange={(event) => {
            setFacebookLink(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Link do Instagram"
          value={instagramLink}
          onChange={(event) => {
            setInstagramLink(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Link do Twitter"
          value={twitterLink}
          onChange={(event) => {
            setTwitterLink(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Telegram"
          value={telegram}
          onChange={(event) => {
            setTelegram(event.target.value);
          }}
        />
        <TextField
          id="outlined-name"
          label="Whatsapp"
          value={whatsapp}
          onChange={(event) => {
            setWhatsapp(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            console.log({
              user_name: userName,
              resume: resume,
              facebook_link: facebookLink,
              twitter_link: twitterLink,
              telegram: telegram,
              whatsapp: whatsapp,
            });
          }}
        >
          Salvar Dados
        </Button>
      </FormWrapper>
      <Footer />
    </>
  );
}
