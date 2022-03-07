import { useParams } from "react-router-dom";
import data from "../backendFake/allcourses.json";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
        fontSize: 36,
      },
      "@media (min-width:900px)": {
        fontSize: 32,
      },
      "@media (min-width:1200px)": {
        fontSize: 48,
      },
      "@media (min-width:1536px)": {
        fontSize: 64,
      },
    },
    h5: {
      fontSize: 18,
      marginBottom: 12,
    },
  },
});

const Container = styled("div")(({ theme }) => ({
  height: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridAutoRows: "80px",
  columnGap: "50px",
  background: "#f2f2f2",
  padding: "0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const TitleSection = styled("div")(({ theme }) => ({
  gridColumn: "1/-1",
  gridRow: "1/8",
  display: "flex",
  alignItems: "center",

  background:
    "linear-gradient(90deg, rgba(14,14,14,0.8855917366946778) 34%, rgba(62,92,0,1) 94%)",
  color: "#97C930",
  padding: "0px 0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    height: "500px",
    div: {
      marginLeft: "20%",
    },
  },
}));

const HintBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "15px 0px",
  background: "#f2f2f2",
  borderRadius: "8px",
  boxShadow: "0 0 12px 1px rgba(0,0,0, 0.2)",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    gridColumn: "3/8",
    gridRow: "6/8",
    height: "400px",
    width: "100%",
  },
}));

const Hint = styled("div")(({ theme }) => ({
  flex: "0 0 30%",
  "&:nth-child(2)": {
    borderLeft: "solid 1px rgba(117,117,117, 0.2)",
    borderRight: "solid 1px rgba(117,117,117, 0.2)",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const HintContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
  gap: "10px",
  alignItems: "center",
  height: "80%",

  flex: "0 0 30%",
  "&:nth-child(2)": {
    borderLeft: "solid 1px rgba(117,117,117, 0.2)",
    borderRight: "solid 1px rgba(117,117,117, 0.2)",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ModulesBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  borderRadius: "8px",
  alignItems: "center",
  background: "#f2f2f2",
  boxShadow: "0 0 12px 1px rgba(0,0,0, 0.2)",
  padding: "40px 0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    gridColumn: "3/8",
    gridRow: "12/16",
    height: "auto",
    width: "100%",
  },
}));

const TechDetailsBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "15px 0px",
  background: "#f2f2f2",
  borderRadius: "8px",
  boxShadow: "0 0 12px 1px rgba(0,0,0, 0.2)",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    gridColumn: "8/11",
    gridRow: "3/ 20",

    width: "100%",
  },
}));

const FlexContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 35,
  alignItems: "center",
  padding: "15px 0px",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    gridColumn: "3/8",
    gridRow: "6/ 30",

    width: "100%",
  },
}));

export function CourseDetail() {
  const { idCourse } = useParams<any>();
  const selectCourse = data.filter((e) => e.id === +idCourse);
  console.log(selectCourse);

  return (
    <>
      {selectCourse.map((e) => (
        <>
          <ThemeProvider theme={theme}>
            <Container>
              <TitleSection>
                <div key={e.id}>
                  <Typography variant="h2"> {e.title} </Typography>
                  <Typography variant="subtitle1" color={"white"}>
                    {e.courseAbout}
                  </Typography>
                </div>
              </TitleSection>
              <FlexContainer>
                <HintBox>
                  <Hint>
                    <HintContent>
                      <div>Icone</div>
                      <Typography>SubTititulo</Typography>
                      <Typography>Explicação</Typography>
                    </HintContent>
                  </Hint>
                  <Hint>
                    <HintContent>
                      <div>Icone</div>
                      <Typography>SubTititulo</Typography>
                      <Typography>Explicação</Typography>
                    </HintContent>
                  </Hint>
                  <Hint>
                    <HintContent>
                      <div>Icone</div>
                      <Typography>SubTititulo</Typography>
                      <Typography>Explicação</Typography>
                    </HintContent>
                  </Hint>
                </HintBox>
                <ModulesBox>
                  <Typography variant="h5" textAlign={"right"}>
                    Competências e domínios
                  </Typography>
                  {e.modules?.map((module) => (
                    <Accordion sx={{ width: "90%" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        {module.moduleTitle}{" "}
                      </AccordionSummary>
                      <AccordionDetails>
                        {module.moduleResume}{" "}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </ModulesBox>
                <ModulesBox>
                  <Typography variant="h5">Mais detalhes</Typography>
                  <Typography variant="body2" sx={{ padding: "15px 25px" }}>
                    texto explicando mais detalhes sobre o curso texto
                    explicando mais detalhes sobre o curso texto explicando mais
                    detalhes sobre o curso texto explicando mais detalhes sobre
                    o curso texto explicando mais detalhes sobre o cursotexto
                    explicando mais detalhes sobre o curso
                  </Typography>
                </ModulesBox>

                <ModulesBox>
                  <Typography>Plano de ensino</Typography>
                  {e.modules?.map((module) => (
                    <div>{module.moduleTitle} </div>
                  ))}
                </ModulesBox>

                <ModulesBox>
                  <Typography>Comentários</Typography>
                </ModulesBox>
              </FlexContainer>
              <TechDetailsBox>
                <div>Details Tech</div>
                <div>Details Tech</div>
                <div>Details Tech</div>
                <div>Details Tech</div>
                <div>Details Tech</div>
              </TechDetailsBox>
            </Container>
          </ThemeProvider>
        </>
      ))}
    </>
  );
}
