import { styled } from "@mui/material/styles";

import { Typography, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PersonIcon from "@mui/icons-material/Person";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

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
  backgroundColor: "#0c0c0c",
  color: "#FFF",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0 8px 8px 0",
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
    height: "650px",
  },
}));

const PhotoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 2px white",
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
    padding: "0px 15px",

    width: "80%",
  },
}));

const SectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  backgroundColor: "#0c0c0c",
  borderRadius: "8px",
  height: "auto",
  padding: "16px 32px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "5px 5px",
  backgroundColor: "transparent",
  border: "solid 2px rgba(199,234,70,0.3)",
  height: "500px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 350ms ease",

  "&:hover": {
    border: "solid 2px rgba(199,234,70,0.8)",
    svg: {
      color: "rgb(193,234,70)",
    },
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "20%",
  },
}));

const CardImg = styled("div")(({ theme }) => ({
  borderRadius: "8px",
  flex: "0 0 36%",
  color: "black",
  fontSize: "42px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",

  img: {
    width: "100%",
    heigth: "150px",
    borderRadius: "8px",
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const CardText = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",
  flex: "0 0 40%",
  color: "black",
  fontSize: "16px",
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
  backgroundColor: "transparent",
  border: "solid 1px rgba(193,234,70,0.6)",
  borderRadius: "8px",
  flex: "0 0 10%",
  color: "rgba(193,234,70,0.4)",
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

const MiniCardWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "5px 5px",
  backgroundColor: "transparent",
  border: "solid 2px rgba(199,234,70,0.3)",

  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 350ms ease",

  "&:hover": {
    border: "solid 2px rgba(199,234,70,0.8)",
    svg: {
      color: "rgb(193,234,70)",
    },
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "10%",
    height: "250px",
  },
}));

const ReviewWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  marginBottom: "20px",

  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  justifyContent: "center",

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

const UserCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "5px 10px",
  border: "solid 1px rgba(199,234,70,0.3)",
  height: "320px",
  width: "80%",
  borderRadius: "8px",
  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const PersonalInfoReview = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
  padding: "5px 5px",
  backgroundColor: "transparent",
  height: "75px",
  width: "60%",
  borderRadius: "8px",
  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const Stars = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  borderBottom: "solid 1px rgba(199,234,70,0.3)",
  gap: "10px",
  padding: "5px 5px",
  width: "180px",
  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ReviewField = styled("div")(({ theme }) => ({
  padding: "5px 5px",
  borderTop: "solid 1px rgba(199,234,70,0.3)",
  color: "white",
  height: "120px",
  width: "100%",

  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CommentBox = styled("div")(({ theme }) => ({
  padding: "15px 5px",
  color: "white",
  height: "120px",
  width: "100%",
  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const LikeWrapper = styled("div")(({ theme }) => ({
  marginTop: "30px",
  display: "flex",
  gap: "8px",
  color: "white",
  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const UserAvatar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  backgroundColor: "transparent",
  border: "solid 2px #FFF",
  height: "60px",
  width: "60px",
  borderRadius: "50%",
  transition: "all 350ms ease",
  color: "white",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const Divisor = styled("div")(({ theme }) => ({
  borderBottom: "solid 1px rgba(177,255,70,0.4)",
  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const IconsWrapper = styled("div")(({ theme }) => ({
  paddingTop: "8px",
  width: "100%",
  display: "flex",
  gap: "8px",
  justifyContent: "center",

  svg: {
    "&:hover": {
      color: "rgb(177,255,55)",
      cursor: "pointer",
    },
  },
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
          <PhotoWrapper>
            <PersonIcon sx={{ fontSize: "72px" }} />
          </PhotoWrapper>
          <div>
            <Typography fontWeight={600} sx={{ color: "silver" }}>
              {" "}
              Nome do Usuário{" "}
            </Typography>
          </div>
          <Divisor />

          <div>
            <Typography
              variant="body2"
              textAlign={"center"}
              fontWeight={900}
              sx={{ fontSize: "38px", color: "rgb(199,234,70)" }}
            >
              937
            </Typography>
            <Typography fontWeight={600} sx={{ color: "silver" }}>
              Cursos Vendidos
            </Typography>
          </div>
          <Divisor />
          <div>
            <Typography textAlign={"center"} sx={{ padding: "0 20px " }}>
              Texto com resumo sobre o Tipster, Sessão para apresentação, pode
              contar sobre exp e etc... Limite 255
            </Typography>
          </div>
          <Divisor />
          <div>
            <Typography
              variant="h6"
              textAlign={"center"}
              fontWeight={900}
              sx={{ borderBottom: "solid 1px rgba(199,234,70,0.5)" }}
            >
              Redes Sociais
            </Typography>
            <IconsWrapper>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
              <TelegramIcon />
              <WhatsAppIcon />
            </IconsWrapper>
          </div>
        </ASideProfile>
        <AllCoursesDiv>
          <SectionWrapper>
            <Typography
              variant="h4"
              sx={{
                borderBottom: "solid 1px rgba(199,234,70,0.5)",
                fontWeight: 600,
                fontSize: 36,
                color: "white",
              }}
            >
              MAIS VENDIDOS
            </Typography>
            <CardWrapper>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
            </CardWrapper>
          </SectionWrapper>

          <SectionWrapper>
            <Typography
              variant="h4"
              sx={{
                borderBottom: "solid 1px rgba(199,234,70,0.5)",
                fontWeight: 600,
                fontSize: 36,
                color: "white",
              }}
            >
              LANÇAMENTOS
            </Typography>
            <CardWrapper>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
              <Card>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
                <Button variant="contained" color="success">
                  Compre
                </Button>
              </Card>
            </CardWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <Typography
              variant="h4"
              sx={{
                borderBottom: "solid 1px rgba(199,234,70,0.5)",
                fontWeight: 600,
                fontSize: 36,
                color: "white",
              }}
            >
              AVALIAÇÕES
            </Typography>
            <ReviewWrapper>
              <MiniCardWrapper>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
              </MiniCardWrapper>
              <UserCard>
                <PersonalInfoReview>
                  <UserAvatar>
                    <PersonIcon sx={{ fontSize: "36px" }} />
                  </UserAvatar>
                  <Typography sx={{ color: "white" }}>User Name</Typography>
                </PersonalInfoReview>
                <ReviewField>
                  <Stars>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarHalfIcon />
                    <StarBorderIcon />
                  </Stars>
                  <CommentBox>Texto com os comentários </CommentBox>
                  <LikeWrapper>
                    <ThumbUpOutlinedIcon
                      sx={{ color: "green", cursor: "pointer" }}
                    />
                    <Typography>15 Likes</Typography>
                  </LikeWrapper>
                </ReviewField>
              </UserCard>
            </ReviewWrapper>

            <ReviewWrapper>
              <MiniCardWrapper>
                <CardImg>
                  <img
                    src="https://soccerpracticebooks.com/wp-content/uploads/2016/05/AdobeStock_46062639.jpeg"
                    alt=""
                  />
                </CardImg>
                <CardText>Resumo </CardText>
                <CardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </CardReview>
              </MiniCardWrapper>
              <UserCard>
                <PersonalInfoReview>
                  <UserAvatar>
                    <PersonIcon sx={{ fontSize: "36px" }} />
                  </UserAvatar>
                  <Typography sx={{ color: "white" }}>User Name</Typography>
                </PersonalInfoReview>
                <ReviewField>
                  <Stars>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarHalfIcon />
                    <StarBorderIcon />
                  </Stars>
                  <CommentBox>Texto com os comentários </CommentBox>
                  <LikeWrapper>
                    <ThumbUpOutlinedIcon
                      sx={{ color: "green", cursor: "pointer" }}
                    />
                    <Typography>15 Likes</Typography>
                  </LikeWrapper>
                </ReviewField>
              </UserCard>
            </ReviewWrapper>
          </SectionWrapper>
        </AllCoursesDiv>
      </MainContainerProfile>
      <Footer />
    </>
  );
}
