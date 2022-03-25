import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { TextField, Button, Box, Modal, Typography } from "@mui/material/";
import SaveIcon from "@mui/icons-material/Save";

const MainBox = styled("div")(({ theme }) => ({
  paddingTop: "120px",
  background: "#f2f2f2",
  display: "flex",
  flexWrap: "wrap",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "500px",
  },
}));

const TitleBox = styled("div")(({ theme }) => ({
  background: "#f2f2f2",
  flex: "0 0 100%",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const SideBar = styled("div")(({ theme }) => ({
  background: "#f2f2f2",
  flex: "0 0 30%",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const SelectInfo = styled("select")(({ theme }) => ({
  width: "100%",
}));

const StyledMainCourseInformation = styled("ul")(({ theme }) => ({
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 15px",
  gap: "8px",
  width: "100%",
  justifyContent: "center",
  color: "white",
  li: {
    p: { fontSize: "14px" },
  },
}));
export function IndexCourse() {
  const [course, setCourse] = useState<any[]>([]);
  let history = useHistory();

  function LoadCourse(
    courseID: string,
    name: string,
    price: string,
    category: string,
    level: string,
    createdBy: string,
    content?: any,
    thumb?: string
  ) {
    /* 
        interface Course {
        id: string;
        thumb?: string;
        courseName: string;
        category: string;
        level: string;
        content?: [Module];
        }
        */

    const CourseData = {
      courseID: courseID,
      name: name,
      price: price,
      category: category,
      level: level,
      createBy: createdBy,
    };
    setCourse(course.splice(0, course.length));
    setCourse(course.filter((e) => e));
    return setCourse((course) => [...course, CourseData]);
  }

  function MainCourseInformations() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [level, setCourseLevel] = useState("");
    const [category, setCategory] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const generateCourseId = uuidv4();
    const sameId = generateCourseId;

    const { user } = useAuth();
    if (!user) {
      return <Redirect to="/login" />;
    }

    /* 
    const user_email = user?.email; */

    const user_id = user?.id;

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0 15px",
            width: "100%",
            gap: "8px",
          }}
        >
          {course.length > 0 ? (
            <Button
              variant="text"
              color="warning"
              onClick={async () => {
                setCourse((course) => [
                  ...course,
                  {
                    id: sameId,
                    name: name,
                    price: price.toFixed(2).toString(),
                    level: level,
                    category: category,
                  },
                ]);
                // setCourse(course.map((e) => (e.content = allModules)));
                setCourse(course.filter((e) => e));
                console.log(JSON.stringify({ ...course[0] }, null, 2));

                axios
                  .post("http://localhost:3001/course/save", { ...course[0] })
                  .then((response) => response.data);
              }}
            >
              <SaveIcon /> Salvar Curso
            </Button>
          ) : (
            <Typography variant="h6" textAlign={"center"} color="white">
              Clique no botão abaixo para inserir as informações básicas do
              curso
            </Typography>
          )}
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleOpen}
          >
            Criar Novo Curso
          </Button>
        </Box>
        <StyledMainCourseInformation>
          {course.length > 0 ? (
            <>
              <li>
                <Typography> Nome do curso : {name} </Typography>
              </li>
              <li>
                <Typography>
                  Preço:
                  {isNaN(price) ? false : price.toFixed(2)}
                </Typography>
              </li>
              <li>
                <Typography> Dificuldade : {level} </Typography>
              </li>
              <li>
                <Typography> Categoria : {category} </Typography>
              </li>
            </>
          ) : (
            false
          )}
        </StyledMainCourseInformation>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              margin: "120px auto",
              width: 650,
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              background: "#f2f2f2",
              borderBottom: "15px solid green",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h4" textAlign={"center"} color={"black"}>
              Principais Informações do Curso
            </Typography>

            <Typography color={"white"}>
              {course.length > 0
                ? course.map((e) => e.name)
                : "DADOS PARA INICIAR O CURSO"}
            </Typography>

            <>
              <TextField
                required
                id="filled-basic"
                label={"Nome do curso"}
                variant="filled"
                sx={{ background: "white", width: "100%" }}
                onChange={(event) => setName(event.target.value)}
              />

              <TextField
                required
                type="text"
                inputProps={{
                  inputMode: "numeric",
                  // eslint-disable-next-line react/jsx-no-bind
                  pattern: "[0-9]*",
                }}
                id="filled-basic"
                label={"Preço do Curso"}
                variant="filled"
                sx={{ background: "white", width: "100%" }}
                onChange={(event) => {
                  setPrice(+event.target.value);
                }}
              />

              <SelectInfo
                onChange={(event) => setCourseLevel(event.target.value)}
              >
                <option value="">Escolha sua opção</option>
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </SelectInfo>
              <SelectInfo onChange={(event) => setCategory(event.target.value)}>
                <option value="">Escolha sua opção</option>
                <option value="categoria 1">Categoria 1</option>
                <option value="categoria 2">Categoria 2</option>
                <option value="categoria 3">Categoria 3</option>
              </SelectInfo>
            </>

            <Button
              variant="contained"
              color="warning"
              onClick={async () => {
                if (isNaN(price)) {
                  alert("Valor inválido");
                }
                LoadCourse(
                  sameId,
                  name,
                  price.toFixed(2).toString(),
                  category,
                  level,
                  user_id
                );
                setCourse((course) => [
                  ...course,
                  {
                    id: sameId,
                    name: name,
                    price: price.toFixed(2).toString(),
                    level: level,
                    category: category,
                  },
                ]);
                // setCourse(course.map((e) => (e.content = allModules)));
                setCourse(course.filter((e) => e));
                console.log(JSON.stringify({ ...course[0] }, null, 2));

                axios
                  .post("http://localhost:3001/course/save", { ...course[0] })
                  .then((response) => response.data);

                history.push(`/editcourse/${sameId}`);
              }}
            >
              Salvar
            </Button>
            <Button variant="contained" onClick={() => handleClose()}>
              Fechar
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <>
      <MainBox>
        <TitleBox>
          <h1>The Index Page Course</h1>
        </TitleBox>
        <SideBar>
          <h2>Menu Lateral </h2>
          <ul>{MainCourseInformations()}</ul>
        </SideBar>
        <div>Data RENDEREZIADA DE ACORDO COM A OPÇÃO</div>
      </MainBox>
    </>
  );
}
