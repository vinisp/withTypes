import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Footer } from "../../Components/widgets/Footer";

import axios from "axios";

import "../styles/CreateCourse.css";

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
    border: `solid 1px ${mainColor}`,
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

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const Controls = styled("div")(({ theme }) => ({
  backgroundColor: "#0e0e0e0e",
  flex: "0 0 10%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifySelf: "flex-end",
  gap: "20px",
  color: "white",

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
  padding: "35px 105px",
  flex: "0 0 90%",
  width: "100%",
  gap: "5px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
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

    width: `15%`,
    transition: "all 500ms ease",

    height: "600px",

    color: "white",

    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  }));

  const CourseContent = styled("div")(({ theme }) => ({
    backgroundColor: "#030303",
    display: "flex",
    flexDirection: "column",
    color: "white",
    width: `70%`,
    marginLeft: "320px",
    minHeight: "650px",
    paddingBottom: "60px",
    marginBottom: "35px",
    border: "solid 1px white",

    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  }));

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
          <SideBarContent>
            <Typography>Selecione o capítulo</Typography>
            <ul>
              {modules.map((e) => (
                <li key={e.champter_id}>
                  <Button
                    sx={sideBarItemStyle}
                    variant="text"
                    color="success"
                    onClick={() => {
                      axios
                        .get(
                          `${APIURL}elements/${idCourse}/${e.champter_id}/get`
                        )
                        .then((response) => {
                          const dataFromDB = response.data;
                          const formatToFrontEnd = dataFromDB.sort(
                            (a: any, b: any) => a.order - b.order
                          );
                          return setElementsInOrder(formatToFrontEnd);
                        });
                    }}
                  >
                    <h2>{e.name}</h2>
                  </Button>
                </li>
              ))}
            </ul>
          </SideBarContent>
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
                        <ReactPlayer
                          controls
                          url={`https://vimeo.com/${e.content}`}
                        />
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
