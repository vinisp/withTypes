import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { TextField, Button, Box, Modal, Typography } from "@mui/material/";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Footer } from "../../Components/widgets/Footer";

const APIURL = "https://deppback.herokuapp.com/";

/* const NomeDoElemento = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
})); */

const boxShadowConfig =
  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)";

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

const MainInfoBox = styled("div")(({ theme }) => ({
  background: "#f2f2f2",
  flex: "0 0 80%",
  display: "flex",
  flexWrap: "wrap",
  order: "2",
  gap: "15px",
  padding: "15px",
  justifyContent: "center",
  marginBottom: "15px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const SideBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  alignItems: "flex-start",
  background: "#f2f2f2",
  flex: "0 0 15%",
  height: "600px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const BoxAllInfo = styled("div")(({ theme }) => ({
  border: "0",
  boxShadow: boxShadowConfig,
  borderRadius: "8px",
  flex: "0 0 55%",
  minHeight: "200px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const BalanceInfo = styled("div")(({ theme }) => ({
  border: "0",
  boxShadow: boxShadowConfig,
  borderRadius: "8px",
  flex: "0 0 25%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const BottomSections = styled("div")(({ theme }) => ({
  border: "0",
  boxShadow: boxShadowConfig,
  borderRadius: "8px",
  flex: "0 0 80%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const LineDetailsBox = styled("div")(({ theme }) => ({
  borderBottom: "solid 1px silver",
  display: "flex",
  justifyContent: "space-around",

  span: {
    fontSize: "20px",
    fontWeight: "500",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const SelectInfo = styled("select")(({ theme }) => ({
  width: "100%",
}));

// DaTA GRID

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "courseName",
    headerName: "Nome do curso",
    width: 150,
    editable: true,
  },
  {
    field: "category",
    headerName: "Categoria",
    width: 150,
    editable: true,
  },
  {
    field: "price",
    headerName: "Preço",
    width: 110,
    editable: true,
  },
  {
    field: "totalSell",
    headerName: "Total de vendas",
    width: 120,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    category: "Categoria 1",
    courseName: "Curso 1",
    price: 35.59,
    totalSell: 45,
  },
  {
    id: 2,
    category: "Lannister",
    courseName: "Cersei",
    price: 42,
    totalSell: 45,
  },
  {
    id: 3,
    category: "Lannister",
    courseName: "Jaime",
    price: 45,
    totalSell: 45,
  },
  { id: 4, category: "Stark", courseName: "Arya", price: 16, totalSell: 45 },
  {
    id: 5,
    category: "Targaryen",
    courseName: "Daenerys",
    price: 78,
    totalSell: 45,
  },
  {
    id: 6,
    category: "Melisandre",
    courseName: "Odds",
    price: 150,
    totalSell: 45,
  },
  {
    id: 7,
    category: "Clifford",
    courseName: "Ferrara",
    price: 44,
    totalSell: 45,
  },
  {
    id: 8,
    category: "Frances",
    courseName: "Rossini",
    price: 36,
    totalSell: 45,
  },
  { id: 9, category: "Roxie", courseName: "Harvey", price: 65, totalSell: 45 },
];

export function IndexCourse() {
  const [myCourses, setMyCourses] = useState<any[]>([]);
  let history = useHistory();

  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }

  const user_id = user?.id;

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

    /* 
    const user_email = user?.email; */

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0 0",
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
                  .get(`${APIURL}search/${user_id}`)
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
                  .post(`${APIURL}course/save`, {
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
        <MainInfoBox>
          <BoxAllInfo>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
          </BoxAllInfo>
          <BalanceInfo>Depositos recentes</BalanceInfo>
          <BottomSections>
            <LineDetailsBox>
              <span>Meus Cursos Desenvolvidos</span>
              <span>% de vendas</span>
              <span>Valor em $$$</span>
            </LineDetailsBox>
            <LineDetailsBox>
              <span>Meus Cursos Promovidos</span>
              <span>% de vendas</span>
              <span>Valor em $$$</span>
            </LineDetailsBox>
          </BottomSections>
          <BottomSections>
            <LineDetailsBox>
              <span>Meus Cursos Comprados</span>
              <span>Categoria</span>
              <span>Acessar</span>
            </LineDetailsBox>
          </BottomSections>
        </MainInfoBox>
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
                      <Button
                        variant="outlined"
                        onClick={() =>
                          history.push(`/editcourse/${e.course_id}`)
                        }
                      >
                        Editar Curso
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={async () => {
                          try {
                            axios
                              .delete(`${APIURL}course/delete/${e.course_id}`)
                              .then((response) =>
                                console.log("deletado", response)
                              )
                              .catch((err) => console.error(err));
                          } catch (err) {
                            console.error(err);
                          }
                          try {
                            axios
                              .delete(
                                `${APIURL}champters/delete/${e.course_id}`
                              )
                              .then((response) =>
                                console.log("deletado", response)
                              )
                              .catch((err) => console.error(err));
                          } catch (err) {
                            console.error(err);
                          }
                          try {
                            axios
                              .delete(`${APIURL}elements/delete/${e.course_id}`)
                              .then((response) =>
                                console.log("deletado", response)
                              )
                              .catch((err) => console.error(err));
                          } catch (err) {
                            console.error(err);
                          }

                          try {
                            const getCourses = await axios
                              .get(`${APIURL}search/${user_id}`)
                              .then((response) => {
                                setMyCourses(response.data);
                              });
                            return getCourses;
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
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
      <Footer />
    </>
  );
}
