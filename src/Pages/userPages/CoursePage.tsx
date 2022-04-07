import { useState, useEffect, Fragment } from "react";
//import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Footer } from "../../Components/widgets/Footer";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookSharpIcon from "@mui/icons-material/MenuBookSharp";

import axios from "axios";

import "../styles/CreateCourse.css";

type Anchor = "top" | "left" | "bottom" | "right";

const APIURL = "https://deppback.herokuapp.com/";

const mainColor = "#97C930";

const sideBarItemStyle = {
  display: "flex",
  justifyContent: "flex-start",
  padding: "5px 10px",
  gap: "24px",
  width: "100%",
  color: "white",
  fontSize: "8px",
  fontWeight: 600,
  borderBottom: "solid 1px green",
  border: "solid 1px transparent",
  transition: "all 500ms ease",
  "&:hover": {
    color: `${mainColor}`,
    borderLeft: `solid 1px ${mainColor}`,
  },
};

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
  },
});

const MainBox = styled("div")(({ theme }) => ({
  paddingTop: "80px",
  backgroundColor: "#030303",
  display: "flex",

  color: "white",
  gap: "45px",
  overflowX: "hidden",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const Controls = styled("div")(({ theme }) => ({
  backgroundColor: "#0e0e0e0e",
  flex: "0 0 5%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifySelf: "flex-end",
  gap: "20px",
  color: "white",
  borderBottom: "solid 1px silver",
  borderLeft: "solid 1px silver",
  borderRadius: "0 4px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ReadBox = styled("ul")(({ theme }) => ({
  background: "#f2f2f2",
  color: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  flex: "0 0 95%",
  width: "100%",
  gap: "5px",
  overflowY: "hidden",

  [theme.breakpoints.down("sm")]: {
    padding: "35px 40px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "35px 45px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "35px 50px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "35px 105px",
  },
}));

export function CoursePage() {
  const { idCourse } = useParams<any>();
  // const [openControls, setOpenControls] = useState<boolean>(true);
  const [modules, setModules] = useState<any[]>([]);

  const [elementsInOrder, setElementsInOrder] = useState<any[]>([]);

  //const contentCourseSize = openControls ? "70%" : "85%";

  /* const ClassForAnimation = openControls
    ? "changeSizeSideBarReverse"
    : "changeSizeSideBar"; */

  const SideBarContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "15px 0px 0 0",
    alignItems: "flex-start",
    background: "#0e0e0e",
    borderRight: "solid 3px rgba(111,111,116, 0.5)",
    borderBottom: "solid 4px rgba(111,111,116, 0.4)",
    borderRadius: "0 0 12px",
    position: "fixed",

    transition: "all 500ms ease",

    color: "white",

    [theme.breakpoints.down("sm")]: {
      height: "70px",
      width: `10%`,
    },
    [theme.breakpoints.up("sm")]: {
      height: "70px",
      width: `10%`,
    },
    [theme.breakpoints.up("md")]: {
      height: "70px",
      width: `5%`,
    },
    [theme.breakpoints.up("lg")]: {
      height: "70px",
      width: `5%`,
    },
  }));

  const CourseContent = styled("div")(({ theme }) => ({
    backgroundColor: "#030303",
    display: "flex",
    flexDirection: "column",

    minHeight: "650px",
    paddingBottom: "60px",
    marginBottom: "35px",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: `100%`,
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "80px",
      width: `90%`,
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "90px",
      width: `100%`,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "100px",
      width: `90%`,
    },
  }));

  /*  const VideoWrapper = styled("div")(({ theme }) => ({
    backgroundColor: "transparent",
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      width: `360px`,
    },
    [theme.breakpoints.up("sm")]: {
      width: `420px`,
    },
    [theme.breakpoints.up("md")]: {
      width: `600px`,
    },
    [theme.breakpoints.up("lg")]: {
      width: `600px`,
    },
  })); */

  //vamos ver se vai

  function GetCourse() {
    useEffect(() => {
      axios
        .get(`${APIURL}course/${idCourse}`)
        .then((response) => console.log(response.data));
    }, []);
  }

  GetCourse();

  function GetModules() {
    useEffect(() => {
      axios
        .get(`${APIURL}${idCourse}/champters`)
        .then((response) => setModules(response.data));
    }, []);
  }

  GetModules();

  function TemporaryDrawer(element: any) {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

    const list = (anchor: Anchor) => (
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
          <ListItem>
            <ListItemIcon>Escolha o Capítulo </ListItemIcon>
            <ListItemText />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              {element.map((e: any) => (
                <Button
                  onClick={() => {
                    axios
                      .get(`${APIURL}elements/${idCourse}/${e.champter_id}/get`)
                      .then((response) => {
                        const dataFromDB = response.data;
                        const formatToFrontEnd = dataFromDB.sort(
                          (a: any, b: any) => a.order - b.order
                        );
                        return setElementsInOrder(formatToFrontEnd);
                      });
                  }}
                >
                  {e.name}
                </Button>
              ))}
            </ListItemIcon>
            <ListItemText />
          </ListItem>
        </List>
      </Box>
    );

    return (
      <div>
        <Fragment key={"anchor"}>
          <Button onClick={toggleDrawer("left", true)} sx={sideBarItemStyle}>
            <MenuBookSharpIcon />
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </Fragment>
      </div>
    );
  }

  /* function ListenContent(champterId: any) {
    useEffect(() => {
      elementsInOrder.length > 0 ? console.log("sim") : console.log("não");
      setElementsInOrder(elementsInOrder.filter((e) => e));
    }, []);
    return console.log(elementsInOrder.length);
  } */

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainBox>
          <SideBarContent>{TemporaryDrawer(modules)}</SideBarContent>
          <CourseContent>
            <ReadBox>
              {elementsInOrder.map((e: any) => (
                <>
                  <div key={e.order}>
                    {e.element_type === "title" ? (
                      <>
                        <Typography variant="h1">{e.content}</Typography>
                      </>
                    ) : (
                      false
                    )}
                    {e.element_type === "paragraph" ? (
                      <>
                        <Typography variant="body1">{e.content}</Typography>
                      </>
                    ) : (
                      false
                    )}
                    {e.element_type === "subTitle" ? (
                      <>
                        <Typography variant="h3">{e.content}</Typography>
                      </>
                    ) : (
                      false
                    )}
                    {e.element_type === "video" ? (
                      <>
                        {/* <ReactPlayer
                        width="100%"
                        controls
                        url={`https://vimeo.com/${e.content}`}
                    /> */}
                        <h1>{e.content}</h1>
                      </>
                    ) : (
                      false
                    )}

                    {e.element_type === "image" ? (
                      <>
                        <img
                          style={{ width: "350px" }}
                          src={e.content}
                          alt="imagem"
                        />
                      </>
                    ) : (
                      false
                    )}
                  </div>
                </>
              ))}
            </ReadBox>
            <Controls>
              <Button color="success">
                <ArrowBackIcon />
              </Button>
              <Button color="success">
                <ArrowForwardIcon />
              </Button>
            </Controls>
          </CourseContent>
        </MainBox>
        <Footer />
      </ThemeProvider>
    </>
  );
}
