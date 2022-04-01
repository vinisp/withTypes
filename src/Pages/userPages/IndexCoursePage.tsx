import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { TextField, Button, Box, Modal, Typography } from "@mui/material/";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ChatIcon from "@mui/icons-material/Chat";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CircleIcon from "@mui/icons-material/Circle";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

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

const mainColor = "#97C930";

const sideBarItemStyle = {
  display: "flex",
  justifyContent: "flex-start",
  padding: "5px 10px",
  gap: "25px",
  width: "100%",
  color: "white",
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
  color: "white",
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
  flex: "0 0 80%",
  display: "flex",
  flexWrap: "wrap",
  order: "2",
  gap: "15px",
  padding: "15px 0",
  justifyContent: "center",
  marginBottom: "15px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const BoxAllInfo = styled("div")(({ theme }) => ({
  // boxShadow: boxShadowConfig,
  backgroundColor: "#212423",
  borderRadius: "8px",
  flex: "0 0 60%",
  minHeight: "350px",
  paddingBottom: "35px",
  paddingTop: "15px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const BalanceInfo = styled("div")(({ theme }) => ({
  border: "0",
  boxShadow: boxShadowConfig,
  borderRadius: "8px",
  padding: "25px 30px",
  flex: "0 0 25%",
  color: "white",
  backgroundColor: "#212423",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const BottomSections = styled("div")(({ theme }) => ({
  border: "0",
  boxShadow: boxShadowConfig,
  borderRadius: "8px",
  flex: "0 0 86%",
  padding: "25px 0",
  height: "auto",
  backgroundColor: "#212423",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const LineDetailsBoxHead = styled("div")(({ theme }) => ({
  borderBottom: "solid 4px rgba(255,255,255,0.3)",
  display: "flex",
  justifyContent: "space-around",
  span: {
    color: "white",
    flex: "0 0 30%",
    fontSize: "18px",
    fontWeight: "500",
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
  span: {
    color: "white",
    flex: "0 0 30%",
    padding: "5px 0",
    fontSize: "16px",
    fontWeight: "500",
    width: "160px",
    textAlign: "center",
    borderBottom: "solid 1px rgba(255,255,255,0.4)",
  },
  [theme.breakpoints.down("sm")]: {},
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

// DaTA GRID

export function IndexCourse() {
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [openControls, setOpenControls] = useState<boolean>(true);
  let history = useHistory();
  //const sideBarSize = openControls === true ? "5%" : "100%";

  /* const SideBarDesktop = styled("div")(({ theme }) => ({
    background: "yellow",
    width: `50%`,
    padding: `0 0 0 0`,
    transition: "all 350ms ease",

    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},

    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  })); */

  console.log(SideBarDesktop, setOpenControls);

  const SideBar = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "15px 0px 0 0",
    alignItems: "flex-start",
    background: "#0e0e0e",
    borderRight: "solid 3px rgba(111,111,116, 0.5)",
    borderBottom: "solid 4px rgba(111,111,116, 0.4)",
    borderRadius: "0 0 12px",

    flex: `0 0 15%`,
    transition: "all 500ms ease",

    height: "750px",

    color: "white",

    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},

    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  }));

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
        <SideBar className="sidebar">
          {/* <Button
            onClick={() => {
              openControls === true
                ? setOpenControls(false)
                : setOpenControls(true);
              console.log(openControls);
            }}
          >
            {openControls === true ? "aberto" : "fechado"}
          </Button> */}
          <PhotoAndNameWrapper>
            <PhotoUser>Foto</PhotoUser>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {user?.email}
            </Typography>
          </PhotoAndNameWrapper>

          <Typography
            sx={{
              fontWeight: 600,
              marginLeft: "5px",
              color: "silver",
            }}
          >
            Menu
          </Typography>

          <Button
            sx={sideBarItemStyle}
            variant="text"
            color="success"
            onClick={handleOpen}
          >
            <CreateNewFolderIcon sx={{ color: `${mainColor}` }} />
            {openControls === true ? "Criar Novo Curso" : false}
          </Button>
          <Button sx={sideBarItemStyle} variant="text" color="success">
            <PersonIcon sx={{ color: `${mainColor}` }} />
            {openControls === true ? "Editar Perfil" : false}
          </Button>
          <Button sx={sideBarItemStyle} variant="text" color="success">
            <FactCheckIcon sx={{ color: `${mainColor}` }} />
            {openControls === true ? "Lista de interresses" : false}
          </Button>

          <Button sx={sideBarItemStyle} variant="text" color="success">
            <ChatIcon sx={{ color: `${mainColor}` }} />{" "}
            {openControls === true ? "Mensagens" : false}
          </Button>
          <Button sx={sideBarItemStyle} variant="text">
            <AssessmentIcon sx={{ color: `${mainColor}` }} />{" "}
            {openControls === true ? "Estatísticas" : false}
          </Button>

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
        </SideBar>
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
            <Typography
              sx={{
                flex: "0 0 5%",
                textAlign: "center",
                backgroundColor: "#212423",
                color: "#FFF",
                borderBottom: "solid 1px white",
              }}
              variant="h6"
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
              variant="h6"
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
                <span>Meus Cursos Desenvolvidos</span>
                <span>% de vendas</span>
                <span>Valor em $$$</span>
              </LineDetailsBoxHead>
              <LineDetailsBoxBody>
                <span>25</span>
                <span>
                  47<span style={{ fontSize: "14px" }}>%</span>
                </span>
                <span>
                  R$ 7500,<span style={{ fontSize: "14px" }}>00</span>
                </span>
              </LineDetailsBoxBody>
            </LineWrapper>
            <LineDetailsBoxHead>
              <span>Meus Cursos Promovidos</span>
              <span>% de vendas</span>
              <span>Valor em $$$</span>
            </LineDetailsBoxHead>
            <LineDetailsBoxBody>
              <span>65</span>
              <span>
                53<span style={{ fontSize: "14px" }}>%</span>
              </span>
              <span>
                R$ 2000,<span style={{ fontSize: "14px" }}>00</span>
              </span>
            </LineDetailsBoxBody>
          </BottomSections>
          <BottomSections>
            <LineDetailsBoxHead>
              <span>Meus Cursos Comprados</span>
              <span>Categoria</span>
              <span>Acessar</span>
            </LineDetailsBoxHead>
            <LineDetailsBoxBody>
              <span>Curso 1</span>
              <span>Categoria 3 </span>
              <span>
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
              </span>
            </LineDetailsBoxBody>
            <LineDetailsBoxBody>
              <span>Curso 1</span>
              <span>Categoria 3 </span>
              <span>
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
              </span>
            </LineDetailsBoxBody>
            <LineDetailsBoxBody>
              <span>Curso 1</span>
              <span>Categoria 3 </span>
              <span>
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
              </span>
            </LineDetailsBoxBody>
            <LineDetailsBoxBody>
              <span>Curso 1</span>
              <span>Categoria 3 </span>
              <span>
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
              </span>
            </LineDetailsBoxBody>
          </BottomSections>
        </MainInfoBox>

        {MainCourseInformations()}
      </MainBox>

      <Footer />
    </>
  );
}
