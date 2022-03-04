import { useParams } from "react-router-dom";
import data from "../backendFake/allcourses.json";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const TitleSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  background: "#0e0e0e0e",
  color: "#97C930",
  padding: "40px 0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    height: "500px",
    img: {
      width: "450px",
      height: "300px",
    },
  },
}));

const HintBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "15px 0px",
  background: "#f2f2f2",
  borderRadius: "8px",
  boxShadow: "0 0 15px 4px rgba(0,0,0, 0.2)",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    position: "absolute",
    left: "15%",
    top: "520px",
    height: "400px",
    width: "45%",
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
  padding: "40px 0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    position: "absolute",
    left: "15%",
    top: "1000px",
    height: "auto",
    width: "45%",
  },
}));

const ModulesSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#f2f2f2",
  padding: "40px 0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

export function CourseDetail() {
  const { idCourse } = useParams<any>();
  const selectCourse = data.filter((e) => e.id === +idCourse);
  console.log(selectCourse);

  return (
    <>
      {selectCourse.map((e) => (
        <>
          <TitleSection>
            <div key={e.id}>
              <Typography variant="h2"> {e.title} </Typography>
              <Typography variant="subtitle1" color={"white"}>
                {e.courseAbout}
              </Typography>
            </div>
            <div>
              <img src={e.image} alt="texto sobre a imagem" />
            </div>
          </TitleSection>
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
            {e.modules?.map((module) => (
              <>
                <ModulesSection>
                  <h4> {module.moduleTitle} </h4>
                  <p>{module.moduleResume} </p>
                </ModulesSection>
              </>
            ))}
          </ModulesBox>
        </>
      ))}
    </>
  );
}
