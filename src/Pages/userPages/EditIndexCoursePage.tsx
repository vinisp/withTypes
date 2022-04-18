import { useEffect, useState } from "react";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import { Footer } from "../../Components/widgets/Footer";

import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import axios from "axios";

const APIURL = "https://deppback.herokuapp.com/";

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

const FieldBoxHalf = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  label: {
    color: "darkgreen",
    fontWeight: "600",
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "30%",
  },
}));

const FieldBoxHalfWrapper = styled("div")(({ theme }) => ({
  display: "flex",

  gap: "4px",

  width: "100%",

  label: {
    color: "darkgreen",
    fontWeight: "600",
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "column",
  },

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.up("lg")]: {
    gap: "16px",
    flexDirection: "row",
  },
}));

export function IndexCoursePage() {
  const [courseName, setCourseName] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [category, setCourseCategory] = useState<string>("");
  const [courseImg, setCourseImg] = useState<string>("");

  const [mainInfosFirst, setMainInfosFirst] = useState<string>("");
  const [resume1, setResume1] = useState<string>("");
  const [resume2, setResume2] = useState<string>("");
  const [resume3, setResume3] = useState<string>("");
  const [maisDetalhes, setMaisDetalhes] = useState<string>("");
  const [planoDeEnsino, setPlanoDeEnsino] = useState<string>("");

  let { course_id } = useParams<any>();

  function GetCourseInfo() {
    useEffect(() => {
      axios.get(`${APIURL}course/${course_id}`).then((response) => {
        const courseData = response.data;
        setCourseName(courseData[0].name);
        setCoursePrice(courseData[0].price);
        setCourseCategory(courseData[0].category);
        setCourseLevel(courseData[0].level);
      });
    }, []);
  }

  GetCourseInfo();

  return (
    <>
      <FormWrapper>
        <h1>Edição do Curso (Informações gerais e dados promocionais) </h1>
        <FieldBox>
          <label>Nome do curso</label>
          <TextField
            id="outlined-name"
            value={courseName}
            onChange={(event) => {
              setCourseName(event.target.value);
            }}
            required
          />
        </FieldBox>

        <FieldBox>
          <label>Preço</label>
          <TextField
            id="outlined-name"
            value={coursePrice}
            onChange={(event) => {
              setCoursePrice(event.target.value);
            }}
            required
          />
        </FieldBox>

        <FieldBox>
          <label>Categoria</label>
          <TextField
            id="outlined-name"
            value={category}
            onChange={(event) => {
              setCourseCategory(event.target.value);
            }}
            required
          />
        </FieldBox>

        <FieldBox>
          <label>Dificuldade</label>
          <TextField
            id="outlined-name"
            value={courseLevel}
            onChange={(event) => {
              setCourseLevel(event.target.value);
            }}
            required
          />
        </FieldBox>

        <FieldBox>
          <label>Url da Imagem de capa</label>
          <TextField
            id="outlined-name"
            value={courseImg}
            onChange={(event) => {
              setCourseImg(event.target.value);
            }}
            required
          />
        </FieldBox>

        <FieldBox>
          <label>Resumo do Curso</label>
          <TextareaAutosize
            id="outlined-name"
            minRows={10}
            value={mainInfosFirst}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              padding: "20px",
            }}
            onChange={(event) => {
              mainInfosFirst.length <= 255
                ? setMainInfosFirst(event.target.value)
                : mainInfosFirst.length > 255
                ? mainInfosFirst.split("", 255 - mainInfosFirst.length)
                : console.log(false);
              setMainInfosFirst(event.target.value);
            }}
          />
          <p
            style={{
              color: `${mainInfosFirst.length > 255 ? "red" : "black"}`,
              textAlign: "right",
            }}
          >
            Número de caracteres: {mainInfosFirst.length}
            {mainInfosFirst.length > 255
              ? " (número maxímo de caracteres 255)"
              : false}
          </p>
        </FieldBox>
        <FieldBoxHalfWrapper>
          <FieldBoxHalf>
            <label>Informação Promocional 1</label>
            <TextareaAutosize
              id="outlined-name"
              minRows={10}
              value={resume1}
              style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: "100%",
                padding: "20px",
              }}
              onChange={(event) => {
                resume1.length <= 255
                  ? setResume1(event.target.value)
                  : resume1.length > 255
                  ? resume1.split("", 255 - resume1.length)
                  : console.log(false);
                setResume1(event.target.value);
              }}
            />
            <p
              style={{
                color: `${resume1.length > 255 ? "red" : "black"}`,
                textAlign: "right",
              }}
            >
              Número de caracteres: {resume1.length}
              {resume1.length > 255
                ? " (número maxímo de caracteres 255)"
                : false}
            </p>
          </FieldBoxHalf>

          <FieldBoxHalf>
            <label>Informação Promocional 2</label>
            <TextareaAutosize
              id="outlined-name"
              minRows={10}
              value={resume2}
              style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: "100%",
                padding: "20px",
              }}
              onChange={(event) => {
                resume2.length <= 255
                  ? setResume2(event.target.value)
                  : resume2.length > 255
                  ? resume2.split("", 255 - resume2.length)
                  : console.log(false);
                setResume2(event.target.value);
              }}
            />
            <p
              style={{
                color: `${resume2.length > 255 ? "red" : "black"}`,
                textAlign: "right",
              }}
            >
              Número de caracteres: {resume2.length}
              {resume2.length > 255
                ? " (número maxímo de caracteres 255)"
                : false}
            </p>
          </FieldBoxHalf>

          <FieldBoxHalf>
            <label>Informação Promocional 3</label>
            <TextareaAutosize
              id="outlined-name"
              minRows={10}
              value={resume3}
              style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: "100%",
                padding: "20px",
              }}
              onChange={(event) => {
                resume3.length <= 255
                  ? setResume3(event.target.value)
                  : resume3.length > 255
                  ? resume3.split("", 255 - resume3.length)
                  : console.log(false);
                setResume3(event.target.value);
              }}
            />
            <p
              style={{
                color: `${resume3.length > 255 ? "red" : "black"}`,
                textAlign: "right",
              }}
            >
              Número de caracteres: {resume3.length}
              {resume3.length > 255
                ? " (número maxímo de caracteres 255)"
                : false}
            </p>
          </FieldBoxHalf>
        </FieldBoxHalfWrapper>

        <FieldBox>
          <label>Mais Detalhes</label>
          <TextareaAutosize
            id="outlined-name"
            minRows={10}
            value={maisDetalhes}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              padding: "20px",
            }}
            onChange={(event) => {
              maisDetalhes.length <= 255
                ? setMaisDetalhes(event.target.value)
                : maisDetalhes.length > 255
                ? maisDetalhes.split("", 255 - maisDetalhes.length)
                : console.log(false);
              setMaisDetalhes(event.target.value);
            }}
          />
          <p
            style={{
              color: `${maisDetalhes.length > 255 ? "red" : "black"}`,
              textAlign: "right",
            }}
          >
            Número de caracteres: {maisDetalhes.length}
            {maisDetalhes.length > 255
              ? " (número maxímo de caracteres 255)"
              : false}
          </p>
        </FieldBox>

        <FieldBox>
          <label>Plano de Ensino</label>
          <TextareaAutosize
            id="outlined-name"
            minRows={10}
            value={planoDeEnsino}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              padding: "20px",
            }}
            onChange={(event) => {
              planoDeEnsino.length <= 255
                ? setPlanoDeEnsino(event.target.value)
                : planoDeEnsino.length > 255
                ? planoDeEnsino.split("", 255 - planoDeEnsino.length)
                : console.log(false);
              setPlanoDeEnsino(event.target.value);
            }}
          />
          <p
            style={{
              color: `${planoDeEnsino.length > 255 ? "red" : "black"}`,
              textAlign: "right",
            }}
          >
            Número de caracteres: {planoDeEnsino.length}
            {planoDeEnsino.length > 255
              ? " (número maxímo de caracteres 255)"
              : false}
          </p>
        </FieldBox>

        <Button variant="contained" color="success" onClick={() => {}}>
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
