import { styled } from "@mui/material/styles";

import { Footer } from "../Components/widgets/Footer";

const MainContainerProfile = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
  paddingTop: "120px",
  paddingBottom: "80px",
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",

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
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "20px",
  overflowX: "hidden",
  backgroundColor: "silver",
  borderRadius: "8px",
  height: "auto",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "80%",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "35px 15px",

    width: "80%",
  },
}));

const SectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  backgroundColor: "rgba(255,255,255,0.3)",
  borderRadius: "8px",
  height: "auto",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "5px",
  backgroundColor: "rgba(0,0,0,0.4)",
  border: "solid 1px silver",
  height: "450px",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "20%",
  },
}));

const CardImg = styled("div")(({ theme }) => ({
  backgroundColor: "lightcoral",
  border: "solid 1px green",
  borderRadius: "8px",
  flex: "0 0 40%",
  color: "black",
  fontSize: "42px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const CardText = styled("div")(({ theme }) => ({
  backgroundColor: "lightgreen",
  border: "solid 2px green",
  borderRadius: "8px",
  flex: "0 0 35%",
  color: "black",
  fontSize: "42px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const CardReview = styled("div")(({ theme }) => ({
  backgroundColor: "lightgreen",
  border: "solid 2px green",
  borderRadius: "8px",
  flex: "0 0 20%",
  color: "black",
  fontSize: "42px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const HeaderCourseDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CardWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  width: "100%",
  gap: "15px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

export function Profile() {
  return (
    <>
      <MainContainerProfile>
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

          <SectionWrapper>
            <h3>Mais vendidos</h3>
            <CardWrapper>
              <Card>
                <CardImg>Imagem</CardImg>
                <CardText>Resumo </CardText>
                <CardReview>Avaliação</CardReview>
              </Card>
              <Card>
                <CardImg>Imagem</CardImg>
                <CardText>Resumo </CardText>
                <CardReview>Avaliação</CardReview>
              </Card>
              <Card>
                <CardImg>Imagem</CardImg>
                <CardText>Resumo </CardText>
                <CardReview>Avaliação</CardReview>
              </Card>
              <Card>
                <CardImg>Imagem</CardImg>
                <CardText>Resumo </CardText>
                <CardReview>Avaliação</CardReview>
              </Card>
              <Card>
                <CardImg>Imagem</CardImg>
                <CardText>Resumo </CardText>
                <CardReview>Avaliação</CardReview>
              </Card>
              <Card>
                <CardImg>Imagem</CardImg>
                <CardText>Resumo </CardText>
                <CardReview>Avaliação</CardReview>
              </Card>
            </CardWrapper>
          </SectionWrapper>

          <SectionWrapper>
            <h3> Recentes </h3>
            <div>Course Card</div>
          </SectionWrapper>
          <SectionWrapper>
            <h3>Reviews</h3>
            <div>Course Card</div>
          </SectionWrapper>
        </AllCoursesDiv>
      </MainContainerProfile>
      <Footer />
    </>
  );
}
