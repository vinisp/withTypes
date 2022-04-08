import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Footer } from "../../Components/widgets/Footer";
import { styled, useTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Button, Box, Typography } from "@mui/material/";

// import { TextField, Button, Box, Modal, Typography } from "@mui/material/";

const APIURL = "https://deppback.herokuapp.com/";

const drawerWidth = 240;

const boxShadowConfig =
  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)";

const mainColor = "#97C930";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export function IndexCourse() {
  const theme = useTheme();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ padding: "80px 0px 0 0", backgroundColor: "green" }}
        >
          <Toolbar sx={{}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Users
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              padding: "80px 0",
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <ThemeProvider theme={theme}>
            <DrawerHeader />
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
              {/* SwipeableTemporaryDrawer() */}
            </MainBox>
          </ThemeProvider>
        </Main>
      </Box>
      <Footer />
    </>
  );
}
