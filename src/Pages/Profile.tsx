/* eslint-disable react/jsx-no-target-blank */
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
import { Pagination } from "./paginas_testes/testar_componentes";

import AliceCarousel from "react-alice-carousel";

import { Footer } from "../Components/widgets/Footer";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import "react-alice-carousel/lib/alice-carousel.css";
import "./styles/Slider.css";
import { useEffect, useState } from "react";

const APIURL = "https://deppback.herokuapp.com/";

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

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "120px",
    paddingBottom: "80px",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const ASideProfile = styled("div")(({ theme }) => ({
  backgroundColor: "#0c0c0c",
  color: "#FFF",
  display: "flex",

  borderRadius: "0 8px 8px 0",
  alignItems: "center",

  overflowX: "hidden",

  paddingTop: "25px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "470px",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "0",
    margin: "8px 16px",
    borderRadius: "8px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    height: "380px",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "0",
    margin: "8px 16px",
    borderRadius: "8px",
  },

  [theme.breakpoints.up("md")]: {
    width: "100%",
    height: "370px",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "0",
    margin: "8px 16px",
    borderRadius: "8px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "15%",
    height: "auto",
    flexDirection: "column",
    paddingBottom: "25px",
    gap: "20px",
  },
}));

const PhotoAndName = styled("div")(({ theme }) => ({
  paddingBottom: "8px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    flex: "0 0 30%",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    alignItems: "center",
    borderBottom: "solid 1px green",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    flex: "0 0 30%",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    alignItems: "center",
    borderBottom: "solid 1px green",
  },

  [theme.breakpoints.up("md")]: {
    width: "100%",
    flex: "0 0 30%",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    alignItems: "center",
    borderBottom: "solid 1px green",
  },
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const BottomSectionsAside = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: "solid 1px green",
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottom: "solid 1px green",
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottom: "solid 1px green",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    borderBottom: "0",
  },
}));

const SectionAside = styled("div")(({ theme }) => ({
  paddingBottom: "8px",
  [theme.breakpoints.down("sm")]: {
    heigth: "100%",
    borderBottom: "solid 1px green",
    flex: "0 0 30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "&:nth-child(3)": {
      borderBottom: "0",
    },
  },
  [theme.breakpoints.up("sm")]: {
    heigth: "100%",
    borderRight: "solid 1px green",
    flex: "0 0 30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "&:nth-child(3)": {
      borderRight: "0",
    },
  },

  [theme.breakpoints.up("md")]: {
    heigth: "100%",
    borderRight: "solid 1px green",
    flex: "0 0 30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "&:nth-child(3)": {
      borderRight: "0",
    },
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderBottom: "solid 1px green",
    alignItems: "center",
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

const CardTitle = styled("div")(({ theme }) => ({
  borderBottom: "solid 1px rgba(177,177,15,0.4)",
  marginBottom: "4px",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const AllCoursesDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  overflowX: "hidden",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    h4: {
      fontSize: "20px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "100%",
    margin: "0 10px",

    padding: 0,
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0px 15px",
    width: "80%",
    height: "auto",
  },
}));

const SectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",

  backgroundColor: "#0c0c0c",
  borderRadius: "8px",

  padding: "16px 32px",

  [theme.breakpoints.down("sm")]: {
    width: "94%",
    margin: "0 15px",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    gap: "20px",
  },
  [theme.breakpoints.up("lg")]: {
    minHeight: "620px",
    gap: "20px",
  },
}));

const CardWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    gap: "15px",
  },
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 80%",
  },
}));

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

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

  [theme.breakpoints.down("sm")]: {
    width: "70%",
    height: "450px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "40%",
  },

  [theme.breakpoints.up("md")]: {
    width: "200px",
    paddingBottom: "25px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "250px",
    height: "500px",
    paddingBottom: "25px",
  },
}));

const CardSlider = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "5px 5px",
  backgroundColor: "transparent",
  border: "solid 2px rgba(199,234,70,0.3)",
  height: "400px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 350ms ease",

  "&:hover": {
    border: "solid 2px rgba(199,234,70,0.8)",
    svg: {
      color: "rgb(193,234,70)",
    },
  },

  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
    width: "100%",
    height: "420px",
  },
  [theme.breakpoints.up("sm")]: {
    margin: "0 auto",
    width: "60%",
    height: "650px",
  },

  [theme.breakpoints.up("md")]: {
    width: "35%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const CardImg = styled("div")(({ theme }) => ({
  img: {
    width: "90%",
    heigth: "150px",
    borderRadius: "8px",
  },

  [theme.breakpoints.down("sm")]: {
    flex: "0 0 10%",
    img: {
      width: "100%",
      borderRadius: "8px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 20%",
    img: {
      width: "90%",
      heigth: "150px",
      borderRadius: "8px",
    },
  },

  [theme.breakpoints.up("md")]: {
    flex: "0 0 36%",
    marginBottom: "5px",
    img: {
      width: "100%",
      heigth: "150px",
      borderRadius: "8px",
    },
  },
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 30%",

    img: {
      width: "100%",
      borderRadius: "8px",
    },
  },
}));

const CardText = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",

  color: "black",
  fontSize: "16px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 35%",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    marginTop: "0",
    width: "100%",
    flex: "0 0 25%",
    display: "flex",
  },
}));

const CardReview = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
  border: "solid 1px rgba(193,234,70,0.6)",
  borderRadius: "8px",

  color: "rgba(193,234,70,0.4)",
  fontSize: "42px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    flex: "0 0 10%",
    svg: {
      fontSize: "18px",
    },
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 5%",
    margin: "5px 0",
    width: "100%",
  },
}));

const MiniCardReview = styled("div")(({ theme }) => ({
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

  [theme.breakpoints.down("sm")]: {
    flex: "0 0 5%",
    svg: {
      fontSize: "12px",
    },
  },
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

  [theme.breakpoints.down("sm")]: {
    width: "30%",
    height: "200px",
  },
  [theme.breakpoints.up("sm")]: {
    svg: {
      fontSize: "18px",
    },
    width: "20%",
    height: "250px",
  },

  [theme.breakpoints.up("md")]: {
    svg: {
      fontSize: "18px",
    },
    width: "15%",
    height: "250px",
  },
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

const UserCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "5px 10px",
  border: "solid 1px rgba(199,234,70,0.3)",
  height: "320px",

  borderRadius: "8px",
  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {
    width: "60%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "70%",
  },

  [theme.breakpoints.up("md")]: {
    width: "80%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "80%",
  },
}));

const PersonalInfoReview = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
  padding: "5px 5px",
  backgroundColor: "transparent",
  height: "75px",

  borderRadius: "8px",
  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "60%",
  },
}));

const Stars = styled("div")(({ theme }) => ({
  display: "flex",
  borderBottom: "solid 1px rgba(199,234,70,0.3)",
  gap: "10px",
  padding: "5px 5px",

  transition: "all 350ms ease",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    gap: "5px",
    justifyContent: "flex-start",
    svg: {
      fontSize: "13.33px",
    },
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    gap: "5px",
    justifyContent: "flex-start",
  },

  [theme.breakpoints.up("md")]: {
    width: "180px",
    gap: "10px",
    justifyContent: "center",
  },
  [theme.breakpoints.up("lg")]: {
    width: "180px",
    gap: "10px",
    justifyContent: "center",
  },
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

const SliderWrapper = styled("div")(({ theme }) => ({
  paddingTop: "8px",
  width: "20%",

  svg: {
    "&:hover": {
      color: "rgb(177,255,55)",
      cursor: "pointer",
    },
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    width: "90%",
  },

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

const LIMIT = 12;

export function Profile() {
  let { user_id } = useParams<any>();

  const [userName, setUserName] = useState("");
  const [resume, setResume] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [coursesByUser, setCoursesByUser] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  let history = useHistory();

  const handleDragStart = (e: any) => e.preventDefault();

  function GetUserData() {
    useEffect(() => {
      axios.get(`${APIURL}findUser/${user_id}`).then((response) => {
        const data = response.data[0];
        setUserName(data.user_name);
        setResume(data.resume);
        setFacebook(data.facebook_link);
        setInstagram(data.instagram_link);
        setTwitter(data.twitter_link);
        setTelegram(data.telegram);
        setWhatsapp(data.whatsapp);
      });
    }, []);
  }

  GetUserData();

  function GetCoursesByUser() {
    useEffect(() => {
      axios.get(`${APIURL}search/${user_id}`).then((response) => {
        return setCoursesByUser(response.data);
      });
    }, []);
  }

  GetCoursesByUser();

  const items = coursesByUser.map((e) => (
    <CardSlider onDragStart={handleDragStart}>
      <Typography sx={{ color: "white" }}> {e.name} </Typography>
      <CardImg>
        <img src={e.thumb_url} alt="" />
      </CardImg>
      <CardReview>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarHalfIcon />
        <StarBorderIcon />
      </CardReview>
      <Button variant="outlined" color="success">
        Saiba Mais
      </Button>
      <Button variant="contained" color="success">
        Compre
      </Button>
    </CardSlider>
  ));

  const Gallery = () => {
    return (
      <SliderWrapper>
        <AliceCarousel
          autoPlay
          mouseTracking
          infinite
          autoPlayInterval={1500}
          items={items}
        />
      </SliderWrapper>
    );
  };

  return (
    <>
      <MainContainerProfile>
        <ASideProfile>
          <PhotoAndName>
            <PhotoWrapper>
              <PersonIcon sx={{ fontSize: "72px" }} />
            </PhotoWrapper>

            <Typography fontWeight={600} sx={{ color: "silver" }}>
              {userName}
            </Typography>
          </PhotoAndName>
          <BottomSectionsAside>
            <SectionAside>
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
            </SectionAside>

            <SectionAside>
              <Typography textAlign={"center"} sx={{ padding: "0 20px " }}>
                {resume}
              </Typography>
            </SectionAside>

            <SectionAside>
              <Typography
                variant="h6"
                textAlign={"center"}
                fontWeight={900}
                sx={{ borderBottom: "solid 1px rgba(199,234,70,0.5)" }}
              >
                Redes Sociais
              </Typography>
              <IconsWrapper>
                <a href={`https://${facebook}`} target="_blank">
                  <FacebookIcon />
                </a>
                <a href={`https://${instagram}`} target="_blank">
                  <InstagramIcon />
                </a>
                <a href={`https://${twitter}`} target="_blank">
                  <TwitterIcon />
                </a>
                <a href={`https:/telegram/${telegram}`} target="_blank">
                  <TelegramIcon />
                </a>

                <a href={`https://wa.me/${whatsapp}`} target="_blank">
                  <WhatsAppIcon />
                </a>
              </IconsWrapper>
            </SectionAside>
          </BottomSectionsAside>
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
              {coursesByUser.length > 0 ? (
                coursesByUser.map((e) => (
                  <Card key={e.id}>
                    <CardTitle>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "24px",

                          color: "white",
                        }}
                        textAlign="center"
                      >
                        {e.name}
                      </Typography>
                    </CardTitle>
                    <CardImg>
                      <img src={e.thumb_url} alt="" />
                    </CardImg>
                    <CardText>{e.main_resume}</CardText>
                    <CardReview>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarHalfIcon />
                      <StarBorderIcon />
                    </CardReview>
                    <Button
                      variant="outlined"
                      sx={{ margin: "5px 0" }}
                      onClick={() => history.push(`/course/${e.course_id}`)}
                    >
                      Saiba Mais
                    </Button>
                    <Button variant="contained" color="success">
                      Compre
                    </Button>
                  </Card>
                ))
              ) : (
                <Typography sx={{ color: "white" }}> "Loading..." </Typography>
              )}
            </CardWrapper>
            <Pagination
              limit={LIMIT}
              total={coursesByUser.length}
              offset={offset}
              setOffset={setOffset}
            />

            {Gallery()}
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
              {coursesByUser.length > 0 ? (
                coursesByUser.map((e) => (
                  <Card key={e.id}>
                    <CardTitle>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "24px",

                          color: "white",
                        }}
                        textAlign="center"
                      >
                        {e.name}
                      </Typography>
                    </CardTitle>
                    <CardImg>
                      <img src={e.thumb_url} alt="" />
                    </CardImg>
                    <CardText>{e.main_resume}</CardText>
                    <CardReview>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarHalfIcon />
                      <StarBorderIcon />
                    </CardReview>
                    <Button
                      variant="outlined"
                      sx={{ margin: "5px 0" }}
                      onClick={() => history.push(`/course/${e.course_id}`)}
                    >
                      Saiba Mais
                    </Button>
                    <Button variant="contained" color="success">
                      Compre
                    </Button>
                  </Card>
                ))
              ) : (
                <Typography sx={{ color: "white" }}> "Loading..." </Typography>
              )}
            </CardWrapper>
            {Gallery()}
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
                <MiniCardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </MiniCardReview>
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
                <MiniCardReview>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfIcon />
                  <StarBorderIcon />
                </MiniCardReview>
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
