import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { TextField, Button, Box, Modal, Typography } from "@mui/material/";

const CourseCard = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  border: "solid 1px silver",
  display: "flex",
  flexDirection: "column",
  gap: "5px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CourseCardBox = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  padding: "15px",
  border: "solid 1px green",
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

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
    height: "auto",
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

export function IndexCourse() {
  const [myCourses, setMyCourses] = useState<any[]>([]);
  let history = useHistory();

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
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleOpen}
          >
            Criar Novo Curso
          </Button>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={async () => {
              try {
                const getCourses = await axios
                  .get(`https://deppback.herokuapp.com/search/${user_id}`)
                  .then((response) => {
                    setMyCourses(response.data);
                  });
                return getCourses;
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Meus Cursos Desenvolvidos
          </Button>
          <Button sx={{ width: "100%" }} variant="contained">
            Meus Cursos Comprados
          </Button>
          <Button sx={{ width: "100%" }} variant="contained">
            Meus Cursos Promovidos
          </Button>
        </Box>

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

                axios
                  .post("https://deppback.herokuapp.com/course/save", {
                    course_id: sameId,
                    name: name,
                    price: price.toFixed(2).toString(),
                    category: category,
                    level: level,
                    created_by: user_id,
                  })
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
          <ul>{MainCourseInformations()}</ul>
        </SideBar>
        <div>
          {myCourses.length > 0 ? (
            <CourseCardBox>
              {myCourses.map((e) => (
                <>
                  <CourseCard>
                    <div>Nome do Curso: {e.name} </div>
                    <div>Preço: {e.price} </div>
                    <div>Dificuldade: {e.level}</div>
                    <div>Categoria: {e.category} </div>
                    <div>
                      <Button variant="outlined">Editar Curso</Button>
                      <Button variant="outlined" color="error">
                        Deletar Curso
                      </Button>
                    </div>
                  </CourseCard>
                </>
              ))}
            </CourseCardBox>
          ) : (
            false
          )}
        </div>
      </MainBox>
    </>
  );
}
