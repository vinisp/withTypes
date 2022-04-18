import { useState, useEffect } from "react";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import { Footer } from "../../Components/widgets/Footer";
import { useAuth } from "../../hooks/useAuth";

import { styled } from "@mui/material/styles";

import axios from "axios";

import { Link, useHistory } from "react-router-dom";

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

const FieldBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  label: {
    color: "darkgreen",
    fontWeight: "600",
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

export function EditProfilePage() {
  const [userName, setUserName] = useState<any>("");
  const [userEmail, setUserEmail] = useState<any>("");
  const [userID, setUserID] = useState<any>("");
  const [resume, setResume] = useState<any>("");
  const [facebookLink, setFacebookLink] = useState<any>("");
  const [instagramLink, setInstagramLink] = useState<any>("");
  const [twitterLink, setTwitterLink] = useState<any>("");
  const [telegram, setTelegram] = useState<any>("");
  const [whatsapp, setWhatsapp] = useState<any>("");

  let history = useHistory();

  function GetUserData() {
    const { user } = useAuth();
    useEffect(() => {
      if (user) {
        console.log(user);
        axios
          .get(`http://localhost:3001/findUser/${user?.id}`)
          .then((response) => {
            console.log(response.data[0].resume);
            const data = response.data[0];
            setUserName(data.user_name);
            setResume(data.resume === null ? "" : data.resume);
            setFacebookLink(data.facebook_link);
            setInstagramLink(data.instagram_link);
            setTwitterLink(data.twitter_link);
            setTelegram(data.telegram);
            setWhatsapp(data.whatsapp);
            console.log(data);
          })
          .catch((err) => console.error(err));
      } else {
        return console.log("sem dados");
      }
    }, [user]);
  }

  GetUserData();

  function GetUserEmail() {
    const { user } = useAuth();
    useEffect(() => {
      setUserEmail(user?.email);
      setUserID(user?.id);
    }, [user]);
  }

  GetUserEmail();

  return (
    <>
      <FormWrapper>
        <h1>
          Olá{" "}
          {userName
            ? userName
            : userEmail +
              " " +
              "ainda não temos seu nome de usuário cadastrado"}
        </h1>
        <FieldBox>
          <label>Nome do usuário</label>
          <TextField
            id="outlined-name"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            required
          />
        </FieldBox>

        <FieldBox>
          <label>Resumo</label>
          <TextareaAutosize
            id="outlined-name"
            minRows={10}
            value={resume}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              padding: "20px",
            }}
            onChange={(event) => {
              resume?.length <= 255
                ? setResume(event.target.value)
                : resume.length > 255
                ? resume.split("", 255 - resume?.length)
                : console.log(false);
              setResume(event.target.value);
            }}
          />
          <p
            style={{
              color: `${resume?.length > 255 ? "red" : "black"}`,
              textAlign: "right",
            }}
          >
            Número de caracteres: {resume.length}
            {resume.length > 255 ? " (número maxímo de caracteres 255)" : false}
          </p>
        </FieldBox>

        <FieldBox>
          <label>Link do Facebook</label>
          <TextField
            id="outlined-name"
            value={facebookLink}
            onChange={(event) => {
              setFacebookLink(event.target.value);
            }}
          />
        </FieldBox>

        <FieldBox>
          <label>Link do Instagram</label>
          <TextField
            id="outlined-name"
            value={instagramLink}
            onChange={(event) => {
              setInstagramLink(event.target.value);
            }}
          />
        </FieldBox>

        <FieldBox>
          <label>Link do Twitter</label>
          <TextField
            id="outlined-name"
            value={twitterLink}
            onChange={(event) => {
              setTwitterLink(event.target.value);
            }}
          />
        </FieldBox>

        <FieldBox>
          <label>Número do Telegram</label>
          <TextField
            id="outlined-name"
            value={telegram}
            onChange={(event) => {
              setTelegram(event.target.value);
            }}
          />
        </FieldBox>

        <FieldBox>
          <label>Número do Whatsapp</label>
          <TextField
            id="outlined-name"
            value={whatsapp}
            onChange={(event) => {
              setWhatsapp(event.target.value);
            }}
          />
        </FieldBox>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            axios.post("http://localhost:3001/user/update", {
              idfirebase: userID,
              user_name: userName,
              resume: resume,
              facebook_link: facebookLink,
              instagram_link: instagramLink,
              twitter_link: twitterLink,
              telegram: telegram,
              whatsapp: whatsapp,
            });
            history.push("/course");
          }}
        >
          Salvar Dados
        </Button>
        <Link to={"/"}>
          <Button color="warning" variant="contained" fullWidth>
            Cancelar
          </Button>
        </Link>
      </FormWrapper>
      <Footer />
    </>
  );
}
