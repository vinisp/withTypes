import { useParams } from "react-router-dom";
import data from "../backendFake/allcourses.json";
import { styled } from "@mui/material/styles";

const TitleSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  background: "#f2f2f2",
  padding: "40px 0",
  borderBottom: "solid 2px silver",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    img: {
      width: "450px",
    },
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
              <h1> {e.title} </h1>
              <h3>{e.courseAbout}</h3>
            </div>
            <div>
              <img src={e.image} alt="texto sobre a imagem" />
            </div>
          </TitleSection>
          <div>
            {e.modules?.map((module) => (
              <>
                <ModulesSection>
                  <h4> {module.moduleTitle} </h4>
                  <p>{module.moduleResume} </p>
                </ModulesSection>
              </>
            ))}
          </div>
        </>
      ))}
    </>
  );
}
