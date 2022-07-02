import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Footer } from "../../Components/widgets/Footer";
import { styled, useTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";

import Divider from "@mui/material/Divider";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { TextField, Modal } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

// import { Redirect } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

import { Button, Box, Typography } from "@mui/material/";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import MoreVertIcon from "@mui/icons-material/MoreVert";

// import { TextField, Button, Box, Modal, Typography } from "@mui/material/";

const APIURL = "https://deppback.herokuapp.com/";

const drawerWidth = 240;

const boxShadowConfig =
  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)";

const mainColor = "#97C930";

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

const PhotoUser = styled("div")(({ theme }) => ({
  border: "solid 1px silver",

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

const SelectInfo = styled("select")(({ theme }) => ({
  width: "100%",
}));

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
  minHeight: "100vh",
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
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    marginTop: "25px",
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
    flex: "0 0 90%",
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

export function Subscribe() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [level, setCourseLevel] = useState("");
  const [category, setCategory] = useState("");
  const [sub_monthly, setSub_mothly] = useState(false);
  const [priceSubMonthly, setPriceSubMonthly] = useState(0);
  const [sub_quarterly, setSub_quarterly] = useState(false);
  const [priceSubQuarterly, setPriceSubQuarterly] = useState(0);
  const [sub_semi_annual, setSub_semi_annual] = useState(false);
  const [priceSubSemi_annual, setPriceSubSemi_annual] = useState(0);
  const [plansData, setPlansData] = useState<any[]>();

  let history = useHistory();

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  const generateCourseId = uuidv4();
  const sameId = generateCourseId;

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

  const user_id = user?.id;

  function SendDataTeste() {
    const { user } = useAuth();
    useEffect(() => {
      user
        ? axios.post(`${APIURL}users`, {
            idfirebase: user.id,
            email: user.email,
          })
        : console.log("não temos dados do usuário");
    }, [user]);
  }

  SendDataTeste();

  // function CheckSub() {
  //   const { user } = useAuth();
  //   useEffect(() => {
  //     user
  //       ? axios
  //           .get(`http://localhost:3001/sub/check/${user.id}`)
  //           .then((response) => console.log(response.data))
  //           .catch((err) => console.error(err))
  //       : console.log("Não temos usuário");
  //   }, [user]);
  // }

  // CheckSub();

  function CheckActiveSub() {
    const { user } = useAuth();
    useEffect(() => {
      user
        ? axios
            .get(`http://localhost:3001/sub/list/${user.email}`)
            .then((response) => console.log(response.data.subList))
            .catch((err) => console.error(err))
        : console.log("Não temos usuário");
    }, [user]);
  }

  CheckActiveSub();

  function CheckProductId() {
    const { user } = useAuth();
    useEffect(() => {
      user
        ? axios
            .get(`http://localhost:3001/sub/prod/${user.id}`)
            .then((response) =>
              setPlansData(
                response.data.product.data.map((e: any) => ({
                  prod_id: e.id,
                  planName: e.name,
                }))
              )
            )
            .catch((err) => console.error(err))
        : console.log("Não temos usuário");
    }, [user]);
  }
  CheckProductId();

  function GetUserData() {
    const { user } = useAuth();
    useEffect(() => {
      user
        ? axios
            .get(`${APIURL}findUser/${user.id}`)
            .then((response) => {
              setSub_mothly(response.data[0].sub_monthly);
              setSub_quarterly(response.data[0].sub_quarterly);
              setSub_semi_annual(response.data[0].sub_semi_annual);
            })
            .catch((err) => console.error(err))
        : console.log("não temos dados do usuário");
    }, [user]);
  }

  GetUserData();

  function GetSubId() {
    const { user } = useAuth();
    useEffect(() => {
      user
        ? axios
            .get(`http://localhost:3001/sub/actives/${user.email}`)
            .then((response) => console.log(response.data))
        : console.log("Não temos usuário");
    }, [user]);
  }

  GetSubId();

  const RenderCard = (planName: string, planAbr: string, active: boolean) => {
    return (
      <>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {planAbr}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={planName}
            subheader={`Status: ${active ? "Ativo" : "Desativado"}`}
          />

          <CardContent>
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
                if (planName === "Mensal") {
                  setPriceSubMonthly(+event.target.value);
                }
                if (planName === "Trimestral") {
                  setPriceSubQuarterly(+event.target.value);
                }
                if (planName === "Semestral") {
                  setPriceSubSemi_annual(+event.target.value);
                }
              }}
            />
            <Button
              fullWidth
              sx={{ marginBottom: "1rem", borderBottom: "1px solid" }}
              onClick={() => {
                if (planName === "Mensal") {
                  axios
                    .post(`http://localhost:3001/sub/price`, {
                      user_id: user.id,
                      interval: "month",
                      interval_count: 1,
                      price: priceSubMonthly,
                      planName: planName,
                    })
                    .then((response) => console.log(response.data));
                }
                if (planName === "Trimestral") {
                  console.log(priceSubQuarterly);
                  axios.post(`http://localhost:3001/sub/price`, {
                    user_id: user.id,
                    interval: "month",
                    interval_count: 3,
                    price: priceSubQuarterly,
                    planName: planName,
                  });
                }
                if (planName === "Semestral") {
                  console.log(priceSubSemi_annual);
                  axios.post(`http://localhost:3001/sub/price`, {
                    user_id: user.id,
                    interval: "month",
                    interval_count: 6,
                    price: priceSubSemi_annual,
                    planName: planName,
                  });
                }
              }}
            >
              Ativar Preço
            </Button>

            <Typography variant="body2" color="text.secondary">
              Resumo com números de postagens e eventos analisados, histórico de
              acerto e etc...
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              sx={{ color: `${active ? "red" : "silver"}` }}
              aria-label="add to favorites"
              onClick={() => {
                if (planName === "Mensal") {
                  axios
                    .post(`${APIURL}sub/month`, {
                      user_id: user.id,
                      name: planName,
                    })
                    .then((response) => console.log(response.data))
                    .catch((err) => console.error(err));
                }
                if (planName === "Trimestral") {
                  axios
                    .post(`${APIURL}sub/quart`, {
                      user_id: user.id,
                      name: planName,
                    })
                    .then((response) => console.log(response.data))
                    .catch((err) => console.error(err));
                }
                if (planName === "Semestral") {
                  axios
                    .post(`${APIURL}sub/semiannual`, {
                      user_id: user.id,
                      name: planName,
                    })
                    .then((response) => console.log(response.data))
                    .catch((err) => console.error(err));
                }
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Button
              onClick={() => {
                const prodId = plansData?.filter(
                  (e) => e.planName === planName
                )[0].prod_id;
                axios
                  .get(`http://localhost:3001/sub/${prodId}`)
                  .then((response) => console.log(response.data.result[0].id));
              }}
            >
              Check Price ID
            </Button>
          </CardActions>
        </Card>
      </>
    );
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            padding: "80px 0px 0 0",
            backgroundColor: "green",
          }}
        >
          <Toolbar sx={{ minHeight: "40px" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
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

          <List>
            <ListItem button sx={{ padding: 0 }}>
              <ListItemIcon>
                <Button
                  sx={sideBarItemStyle}
                  variant="text"
                  color="success"
                  onClick={() => {
                    history.push(`/profile/edit/${user?.id}`);
                  }}
                >
                  <PersonIcon sx={{ color: `${mainColor}` }} />
                  <Typography className="hideOnMobile" fontSize={"10px"}>
                    Editar Perfil
                  </Typography>
                </Button>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
            <ListItem button sx={{ padding: 0 }}>
              <ListItemIcon>
                <Button
                  sx={sideBarItemStyle}
                  variant="text"
                  color="success"
                  onClick={() => {
                    history.push("");
                  }}
                >
                  <LibraryBooksIcon sx={{ color: `red` }} />
                  <Typography className="hideOnMobile" fontSize={"10px"}>
                    Gerenciar Assinaturas
                  </Typography>
                </Button>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
            <ListItem button sx={{ padding: 0 }}>
              <ListItemIcon>
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
              </ListItemIcon>
              <ListItemText />
            </ListItem>
            <ListItem button sx={{ padding: 0 }}>
              <ListItemIcon>
                <Button
                  sx={sideBarItemStyle}
                  variant="text"
                  color="success"
                  onClick={() => {
                    history.push("/newpost");
                  }}
                >
                  <PostAddIcon sx={{ color: `${mainColor}` }} />
                  <Typography className="hideOnMobile" fontSize={"10px"}>
                    Nova Postagem Pública
                  </Typography>
                </Button>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
            <ListItem button sx={{ padding: 0 }}>
              <ListItemIcon>
                <Button
                  sx={sideBarItemStyle}
                  variant="text"
                  color="success"
                  onClick={() => {
                    history.push("/privatepost");
                  }}
                >
                  <PostAddIcon sx={{ color: `${mainColor}` }} />
                  <Typography className="hideOnMobile" fontSize={"10px"}>
                    Nova Postagem Privada
                  </Typography>
                </Button>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
          </List>

          <Divider />
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
                    Minhas Assinaturas
                  </Typography>
                  <div
                    style={{
                      marginTop: "2rem",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "2rem",
                    }}
                  >
                    {RenderCard("Mensal", "M", sub_monthly)}
                    {RenderCard("Trimestral", "T", sub_quarterly)}
                    {RenderCard("Semestral", "A", sub_semi_annual)}
                  </div>
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
                    <Typography variant="h6">Minhas Assinaturas</Typography>
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
              </MainInfoBox>
            </MainBox>
          </ThemeProvider>
        </Main>
      </Box>
      <Footer />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            margin: "120px auto",
            width: [320, 650, 650, 650],
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
