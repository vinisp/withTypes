import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const APIURL = "https://deppback.herokuapp.com/";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
  display: "flex",
  alignItems: "flex-start",

  overflowX: "hidden",
  height: "auto",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 200px",
  },
}));

const Banner = styled("div")(({ theme }) => ({
  backgroundColor: "red",
  display: "flex",

  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",
  flex: "0 0 100%",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "120px",
    paddingBottom: "80px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "",
    heigth: "480px",
  },
}));

const Formulario = styled("div")(({ theme }) => ({
  backgroundColor: "green",
  paddingTop: "120px",
  paddingBottom: "80px",
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",
  flex: "0 0 70%",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "120px",
    paddingBottom: "80px",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const Detalhes = styled("div")(({ theme }) => ({
  backgroundColor: "yellow",

  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",
  flex: "0 0 30%",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "120px",
    paddingBottom: "80px",
  },
  [theme.breakpoints.up("lg")]: {},
}));

export function PayOneCourse() {
  const [course, setCourse] = useState<any[]>([]);
  let { idCourse } = useParams<any>();

  function GetCourseData() {
    useEffect(() => {
      axios
        .get(`${APIURL}course/${idCourse}`)
        .then((response) => setCourse(response.data));
    }, []);
  }

  GetCourseData();

  return (
    <>
      <Box
        sx={{
          paddingTop: 20,
          backgroundColor: "#FFF",
        }}
      >
        <h1>Pay One Course Page</h1>
        <h2>Comprar o Curso {idCourse} </h2>
        {course.length > 0 ? (
          [course[0].name, course[0].price, course[0].thumb_url]
        ) : (
          <Typography>Carregando </Typography>
        )}
      </Box>

      <Container>
        <Banner>Banner</Banner>
        <Formulario>
          <div className="Container do formulário">
            <div className="MiniAndPrice">
              <div>Miniatura</div>
              <div>
                <div>Nome do curso</div>
                <div>Preço</div>
              </div>
            </div>
            <div>
              <div>
                <label>Nome Completo</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div>Rodapé</div>
        </Formulario>
        <Detalhes>25%</Detalhes>
      </Container>
    </>
  );
}
