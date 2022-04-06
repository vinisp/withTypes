import { useState, useEffect, Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Button, Box, Modal, Typography } from "@mui/material/";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ChatIcon from "@mui/icons-material/Chat";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CircleIcon from "@mui/icons-material/Circle";
import FormatAlignCenterSharpIcon from "@mui/icons-material/FormatAlignCenterSharp";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { Footer } from "../../Components/widgets/Footer";

const APIURL = "https://deppback.herokuapp.com/";

/* const NomeDoElemento = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
})); */

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    subtitle1: {
      /* border: "solid 2px white", */

      "@media (max-width:600px)": {
        padding: "0 2px",
        fontSize: 14,
      },
      "@media (min-width:600px)": {
        padding: "0 5px",
        fontSize: 16,
      },
      "@media (min-width:900px)": {
        padding: "0 10px",
        fontSize: 16,
      },
      "@media (min-width:1200px)": {
        padding: "0 35px",
        fontSize: 18,
      },
      "@media (min-width:1536px)": {
        padding: "0 105px",
        fontSize: 18,
      },
    },
    h1: {
      fontWeight: 600,

      "@media (max-width:600px)": {
        fontSize: 32,
      },
      "@media (min-width:600px)": {
        fontSize: 32,
      },
      "@media (min-width:900px)": {
        fontSize: 32,
      },
      "@media (min-width:1200px)": {
        fontSize: 32,
      },
      "@media (min-width:1536px)": {
        fontSize: 32,
      },
    },

    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 18,
    },

    h5: {
      fontSize: 18,
      marginBottom: 12,
    },
    h6: {
      color: "white",
      fontSize: 16,
      "@media (max-width:600px)": {
        fontSize: 12,
      },
      "@media (min-width:600px)": {
        fontSize: 16,
      },
    },
  },
});

const boxShadowConfig =
  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)";

const mainColor = "#97C930";

const sideBarItemStyle = {
  display: "flex",
  justifyContent: "flex-start",
  padding: "5px 10px",
  gap: "25px",
  width: "100%",
  color: "black",
  fontWeight: 600,
  border: "solid 3px transparent",
  transition: "all 500ms ease",
  "&:hover": {
    borderLeft: "solid 3px green",
  },
};

const favButtonStyle = {
  width: "100%",
  padding: "5px 10px",
  color: "black",
  borderLeft: "solid 3px transparent",
  transition: "all 500ms ease",
  display: "flex",
  justifyContent: "flex-start",
  gap: "15px",
  svg: {
    color: `${mainColor}`,
    fontSize: "13px",
  },

  "&:hover": {
    borderLeft: "solid 3px lime",
    svg: {
      color: "red",
    },
  },
};

const MainBox = styled("div")(({ theme }) => ({
  paddingTop: "80px",
  backgroundColor: "#030303",
  display: "flex",
  overflowX: "hidden",

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
  display: "flex",
  flexWrap: "wrap",
  order: "2",
  gap: "15px",

  width: "100%",

  marginBottom: "15px",

  [theme.breakpoints.down("sm")]: {
    marginTop: "25px",
    marginLeft: "-45px",
    padding: "15px 0px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "15px 0px",
  },

  [theme.breakpoints.up("md")]: {
    padding: "15px 0px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "15px 0",
    justifyContent: "center",
  },
}));

const BoxAllInfo = styled("div")(({ theme }) => ({
  // boxShadow: boxShadowConfig,
  backgroundColor: "#212423",
  borderRadius: "8px",
  flex: "0 0 60%",
  minHeight: "350px",
  paddingBottom: "35px",
  paddingTop: "15px",

  [theme.breakpoints.down("sm")]: {
    flex: "0 0 90%",
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 90%",
  },

  [theme.breakpoints.up("md")]: {
    flex: "0 0 95%",
  },
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 60%",
  },
}));

const BalanceInfo = styled("div")(({ theme }) => ({
  border: "0",
  boxShadow: boxShadowConfig,
  borderRadius: "8px",
  padding: "25px 30px",
  flex: "0 0 25%",
  color: "white",
  backgroundColor: "#212423",
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 90%",
    order: "-1",
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 50%",
    order: "-1",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "0 0 50%",
    order: "-1",
  },
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 25%",
    order: "0",
  },
}));

const BottomSections = styled("div")(({ theme }) => ({
  border: "0",
  boxShadow: boxShadowConfig,
  borderRadius: "8px",
  flex: "0 0 86%",
  padding: "25px 0",
  height: "auto",
  backgroundColor: "#212423",
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 20%",
    width: "90%",
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 80%",
  },

  [theme.breakpoints.up("md")]: {
    flex: "0 0 95%",
  },
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 86%",
  },
}));

const LineDetailsBoxHead = styled("div")(({ theme }) => ({
  borderBottom: "solid 4px rgba(255,255,255,0.3)",
  display: "flex",
  justifyContent: "space-around",
  h6: {
    color: "white",
    flex: "0 0 30%",
    fontWeight: "500",
    textAlign: "center",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const LineWrapper = styled("div")(({ theme }) => ({
  marginBottom: "25px",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const LineDetailsBoxBody = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  p: {
    color: "white",
    flex: "0 0 30%",
    padding: "2px 0",
    fontWeight: "500",
    width: "160px",
    textAlign: "center",
    borderBottom: "solid 1px rgba(255,255,255,0.4)",
  },
  [theme.breakpoints.down("sm")]: {
    p: {
      fontSize: "14px",
    },
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const PhotoUser = styled("div")(({ theme }) => ({
  border: "solid 1px white",

  height: "120px",
  width: "120px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const PhotoAndNameWrapper = styled("div")(({ theme }) => ({
  flex: "0 0 25%",
  padding: "5px 15px",
  gap: "15px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const SideBarDesktop = styled("div")(({ theme }) => ({
  background: "blue",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const SelectInfo = styled("select")(({ theme }) => ({
  width: "100%",
}));

type Anchor = "top" | "left" | "bottom" | "right";

// DaTA GRID

export function IndexCourse() {
  const [myCourses, setMyCourses] = useState<any[]>([]);

  let history = useHistory();

  console.log(SideBarDesktop);

  /* const SideBar = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "15px 0px 0 0",
    alignItems: "flex-start",
    background: "#0e0e0e",
    borderRight: "solid 3px rgba(111,111,116, 0.5)",
    borderBottom: "solid 4px rgba(111,111,116, 0.4)",
    borderRadius: "0 0 12px",

    transition: "all 500ms ease",

    height: "750px",

    color: "white",

    [theme.breakpoints.down("sm")]: {
      width: "10%",
      ".hideOnMobile": {
        display: "none",
      },
    },
    [theme.breakpoints.up("sm")]: {},

    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
  })); */

  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "courseName",
      headerName: "Nome do curso",
      width: 160,
      editable: false,
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 100,
      editable: false,
    },
    {
      field: "price",
      headerName: "Preço",
      width: 70,
      editable: false,
    },
    {
      field: "totalSell",
      headerName: "Total de vendas",
      width: 120,
      editable: false,
    },
    {
      field: "owner",
      headerName: "Dono",
      width: 70,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography>{params.row.owner === user_id ? "Sim" : "Não"}</Typography>
      ),
    },
    {
      field: "edit",
      headerName: "Editar",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Button
          variant="text"
          color="success"
          size="small"
          onClick={() => {
            history.push(`/editcourse/${params.row.id}`);
          }}
        >
          Editar
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Deletar",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Button
          variant="text"
          color="warning"
          onClick={async () => {
            try {
              axios
                .delete(`${APIURL}course/delete/${params.row.id}`)
                .then((response) => console.log("deletado", response))
                .catch((err) => console.error(err));
            } catch (err) {
              console.error(err);
            }
            try {
              axios
                .delete(`${APIURL}champters/delete/${params.row.id}`)
                .then((response) => console.log("deletado", response))
                .catch((err) => console.error(err));
            } catch (err) {
              console.error(err);
            }
            try {
              axios
                .delete(`${APIURL}elements/delete/${params.row.id}`)
                .then((response) => console.log("deletado", response))
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
          Deletar
        </Button>
      ),
    },
  ];

  const user_id = user?.id;

  function RenderCourseInTable() {
    useEffect(() => {
      axios.get(`${APIURL}search/${user_id}`).then((response) => {
        setMyCourses(response.data);
      });
    }, []);
  }

  RenderCourseInTable();

  const rows = myCourses.map((e) => ({
    id: e.course_id,
    owner: e.created_by,
    courseName: e.name,
    category: e.category,
    level: e.level,
    totalSell: 85,
    price: e.price,
  }));

  function SwipeableTemporaryDrawer() {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [level, setCourseLevel] = useState("");
    const [category, setCategory] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const generateCourseId = uuidv4();
    const sameId = generateCourseId;

    const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

    const list = (anchor: Anchor) => (
      <>
        <Box
          sx={{
            width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            marginTop: "80px",
          }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <PhotoAndNameWrapper>
                  <PhotoUser className="hideOnMobile">Foto</PhotoUser>
                  <Typography
                    className="hideOnMobile"
                    variant="caption"
                    sx={{ fontWeight: 600 }}
                  >
                    {user?.email}
                  </Typography>
                </PhotoAndNameWrapper>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box sx={{ padding: 0, margin: 0 }}>
          <Button
            sx={sideBarItemStyle}
            variant="text"
            color="success"
            onClick={() => {
              handleOpen();
            }}
          >
            <CreateNewFolderIcon sx={{ color: `${mainColor}` }} />
            <Typography className="hideOnMobile" fontSize={"10px"}>
              Criar Novo Curso
            </Typography>
          </Button>
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
                <SelectInfo
                  onChange={(event) => setCategory(event.target.value)}
                >
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
        </Box>

        <Box
          sx={{
            width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            marginTop: "-10px",
          }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            <Button sx={sideBarItemStyle} variant="text" color="success">
              <PersonIcon sx={{ color: `${mainColor}` }} />
              <Typography className="hideOnMobile" fontSize={"10px"}>
                Editar Perfil
              </Typography>
            </Button>
            <Button sx={sideBarItemStyle} variant="text" color="success">
              <FactCheckIcon sx={{ color: `${mainColor}` }} />
              <Typography className="hideOnMobile" fontSize={"10px"}>
                Lista de interresses
              </Typography>
            </Button>
            <Button sx={sideBarItemStyle} variant="text" color="success">
              <ChatIcon sx={{ color: `${mainColor}` }} />{" "}
              <Typography className="hideOnMobile" fontSize={"10px"}>
                Mensagens
              </Typography>
            </Button>
            <Button sx={sideBarItemStyle} variant="text">
              <AssessmentIcon sx={{ color: `${mainColor}` }} />
              <Typography className="hideOnMobile" fontSize={"10px"}>
                Estatísticas
              </Typography>
            </Button>
            <Divider />
            <Typography
              sx={{
                marginTop: "15px",
                marginLeft: "5px",
                fontWeight: 600,
                color: "silver",
              }}
            >
              Favoritos
            </Typography>

            <Button sx={favButtonStyle}>
              <CircleIcon />
              Item I
            </Button>
            <Button sx={favButtonStyle}>
              <CircleIcon />
              Item II
            </Button>
            <Button sx={favButtonStyle}>
              <CircleIcon />
              Item III
            </Button>
            <Button sx={favButtonStyle}>
              <CircleIcon />
              Item IV
            </Button>
            <Button sx={favButtonStyle}>
              <CircleIcon />
              Item V
            </Button>
            <Button sx={favButtonStyle}>
              <CircleIcon />
              Item VI
            </Button>

            <ListItemText />
          </List>
        </Box>
      </>
    );

    return (
      <div>
        {(["left"] as const).map((anchor) => (
          <Fragment key={"left"}>
            <Button onClick={toggleDrawer("left", true)}>
              <FormatAlignCenterSharpIcon sx={{ color: "green" }} />
            </Button>
            <SwipeableDrawer
              BackdropProps={{ invisible: true }}
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              onOpen={toggleDrawer("left", true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainBox>
          <MainInfoBox>
            <BoxAllInfo>
              <Typography
                sx={{
                  flex: "0 0 5%",
                  textAlign: "center",
                  backgroundColor: "#212423",
                  color: "#FFF",
                  borderBottom: "solid 1px white",
                }}
                variant="h5"
              >
                Lista de Cursos
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                sx={{
                  backgroundColor: "#212423",
                  border: 0,
                  color: "white",
                  p: {
                    color: "white",
                  },
                }}
              />
            </BoxAllInfo>
            <BalanceInfo>
              <Typography variant="h5" color="white">
                Depósitos
              </Typography>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "36px",
                  color: `${mainColor}`,
                }}
              >
                R$ 560,95
              </Typography>
              <Typography color="rgb(115,115,116)">
                Atualizado em 31/03/2022
              </Typography>
              <Typography sx={{}}>Ver detalhes</Typography>
            </BalanceInfo>

            <BottomSections>
              <LineWrapper>
                <LineDetailsBoxHead>
                  <Typography variant="h6">
                    Meus Cursos Desenvolvidos
                  </Typography>
                  <Typography variant="h6">% de vendas</Typography>
                  <Typography variant="h6">Valor em $$$</Typography>
                </LineDetailsBoxHead>
                <LineDetailsBoxBody>
                  <Typography variant="body1">25</Typography>
                  <Typography>
                    47<span style={{ fontSize: "14px" }}>%</span>
                  </Typography>
                  <Typography>
                    R$ 7500,<span style={{ fontSize: "14px" }}>00</span>
                  </Typography>
                </LineDetailsBoxBody>
              </LineWrapper>
              <LineDetailsBoxHead>
                <Typography variant="h6">Meus Cursos Promovidos</Typography>
                <Typography variant="h6">% de vendas</Typography>
                <Typography variant="h6">Valor em $$$</Typography>
              </LineDetailsBoxHead>
              <LineDetailsBoxBody>
                <Typography>65</Typography>
                <Typography>
                  53<span style={{ fontSize: "14px" }}>%</span>
                </Typography>
                <Typography>
                  R$ 2000,<span style={{ fontSize: "14px" }}>00</span>
                </Typography>
              </LineDetailsBoxBody>
            </BottomSections>
            <BottomSections>
              <LineDetailsBoxHead>
                <Typography variant="h6">Meus Cursos Comprados</Typography>
                <Typography variant="h6">Categoria</Typography>
                <Typography variant="h6">Acessar</Typography>
              </LineDetailsBoxHead>
              <LineDetailsBoxBody>
                <Typography>Curso 1</Typography>
                <Typography>Categoria 3 </Typography>
                <Typography>
                  <button
                    style={{
                      border: "0",
                      width: "100%",

                      fontSize: "16px",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      color: "white",
                    }}
                  >
                    clique aqui
                  </button>
                </Typography>
              </LineDetailsBoxBody>
              <LineDetailsBoxBody>
                <Typography>Curso 1</Typography>
                <Typography>Categoria 3 </Typography>
                <Typography>
                  <button
                    style={{
                      border: "0",
                      width: "100%",

                      fontSize: "16px",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      color: "white",
                    }}
                  >
                    clique aqui
                  </button>
                </Typography>
              </LineDetailsBoxBody>
              <LineDetailsBoxBody>
                <Typography>Curso 1</Typography>
                <Typography>Categoria 3 </Typography>
                <Typography>
                  <button
                    style={{
                      border: "0",
                      width: "100%",

                      fontSize: "16px",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      color: "white",
                    }}
                  >
                    clique aqui
                  </button>
                </Typography>
              </LineDetailsBoxBody>
              <LineDetailsBoxBody>
                <Typography>Curso 1</Typography>
                <Typography>Categoria 3 </Typography>
                <Typography>
                  <button
                    style={{
                      border: "0",
                      width: "100%",

                      fontSize: "16px",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      color: "white",
                    }}
                  >
                    clique aqui
                  </button>
                </Typography>
              </LineDetailsBoxBody>
            </BottomSections>
          </MainInfoBox>

          {/* MainCourseInformations() */}
          {SwipeableTemporaryDrawer()}
        </MainBox>
      </ThemeProvider>

      <Footer />
    </>
  );
}
