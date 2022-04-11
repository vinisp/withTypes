// import { Redirect } from "react-router-dom";

// import { useAuth } from "../hooks/useAuth";

import { styled } from "@mui/material/styles";

import { Footer } from "../Components/widgets/Footer";

const MainContainerProfile = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
  paddingTop: "120px",
  paddingBottom: "80px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  overflowX: "hidden",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ASideProfile = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
  display: "flex",
  flexDirection: "column",
  border: "solid 2px red",
  alignItems: "center",
  gap: "20px",
  overflowX: "hidden",

  paddingTop: "25px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    heigth: "150px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    heigth: "150px",
  },

  [theme.breakpoints.up("md")]: {
    width: "15%",
    height: "600px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "15%",
    height: "600px",
  },
}));

const PhotoWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 2px red",
  borderRadius: "50%",
  height: "120px",
  width: "120px",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const AllCoursesDiv = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
  display: "flex",
  flexDirection: "column",
  border: "solid 2px red",
  alignItems: "center",
  gap: "20px",
  overflowX: "hidden",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    minHeight: "600px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    minHeight: "600px",
  },

  [theme.breakpoints.up("md")]: {
    minHeight: "600px",
    width: "80%",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "35px 15px",
    minHeight: "600px",
    width: "80%",
  },
}));

const HeaderCourseDiv = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
  display: "flex",
  flexDirection: "column",
  border: "solid 2px red",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

export function Profile() {
  /* const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  } */
  return (
    <>
      <MainContainerProfile>
        {/* <div>
          <h1>Resumo</h1>
          <div>Profile Page </div>
          <div>
            Menu Lateral com as informações - Avatar - Nome - Principais
            interesses - Cursos Criados - Cursos Comprados - Cursos Promovidos{" "}
          </div>

          <div>
            Pensar em uma área de trabalho, está pode conter informações sobre
            os tipster, eventos em andamento e próximos eventos
          </div>
        </div> */}
        <ASideProfile>
          <PhotoWrapper>User Photo</PhotoWrapper>
          <div>Email</div>
          <div>Números de cursos de vendidos</div>
          <div>Resume</div>
          <div>Redes Sociais</div>
        </ASideProfile>
        <AllCoursesDiv>
          <HeaderCourseDiv>
            Container para exibir todos os cursos criados
          </HeaderCourseDiv>
          <div>
            <h3>Mais vendidos</h3>
            <div>CourseCard</div>
          </div>
          <div>
            <h3> Recentes </h3>
            <div>Course Card</div>
          </div>
          <div>
            <h3>Reviews</h3>
            <div>Course Card</div>
          </div>
        </AllCoursesDiv>
      </MainContainerProfile>
      <Footer />
    </>
  );
}
