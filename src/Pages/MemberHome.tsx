import axios from "axios";

import { Typography, Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import data from "../backendFake/dogListFoda.json";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./memberHome.css";

const ResponsiveCards = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 10,
  marginBottom: 15,
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    width: "100%",

    padding: 0,
  },
}));

const CardResponsive = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "320px",
    width: "100%",
    display: "block",
    padding: 0,
  },
}));

const CardResponsiveRaces = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    width: "75%",
    display: "block",
    padding: 0,
  },
}));

const races = data.map((e) => [
  {
    trackName: e.trackName,
    raceTitle: e.raceTitle,
    raceDate: e.raceDate,
    distance: e.distance,
    raceId: e.raceId,
  },
]);

const NextRaces = () =>
  races.map((e) =>
    e.map((e) => (
      <h2 key={e.raceId}>
        {e.trackName} - {e.raceTitle} - {e.distance} - {e.raceDate}
        <Button>
          <Link to={"/race/" + e.raceId}>Ver Detalhes</Link>
        </Button>
      </h2>
    ))
  );

function MemberAreaHome() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/login" />;
  }

  function registerUserInDatabse(firebaseID: any, email: any) {
    return axios.post("http://localhost:3001/users/", {
      idfirebase: firebaseID,
      email: email,
    });
  }

  async function findUserByID() {
    try {
      const userID = await user;
      const response = await axios.get(
        `http://localhost:3001/findUser/${userID?.id}`
      );
      return response.data.status;
    } catch (error) {
      console.error(error);
    }
  }

  async function sendUserData() {
    try {
      const userID = await user;
      const result = await findUserByID();
      result === true
        ? console.log("achamos o usuário")
        : registerUserInDatabse(userID?.id, userID?.email);
    } catch (error) {
      console.error(error);
    }
  }

  sendUserData();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <>
          <Typography variant="h5" textAlign={"center"} sx={{ color: "white" }}>
            Bem-Vindo
          </Typography>
          <ResponsiveCards>
            <CardResponsive>
              <Card sx={{ height: "100%", width: "100%" }} variant="outlined">
                {/* {cardContent("Australia", "/Australia")} */}
              </Card>
            </CardResponsive>
            <CardResponsive>
              <Card sx={{ height: "100%", width: "100%" }}>
                {/* {cardContent("EUA", "/EUA")} */}
              </Card>
            </CardResponsive>
            <CardResponsive>
              <Card sx={{ height: "100%", width: "100%" }}>
                {/* {cardContent("UK", "/UK")} */}
              </Card>
            </CardResponsive>
          </ResponsiveCards>
          <Box sx={{ flexGrow: 1 }}>
            <ResponsiveCards>
              <CardResponsiveRaces>
                <Card
                  sx={{ height: "100%", width: "100%" }}
                  variant="elevation"
                >
                  <Typography
                    sx={{ background: "green", color: "white", padding: 1 }}
                    variant={"h4"}
                  >
                    Próximas Corridas
                  </Typography>
                  {NextRaces()}
                </Card>
              </CardResponsiveRaces>
            </ResponsiveCards>
          </Box>
        </>
      </Box>
    </>
  );
}

export default MemberAreaHome;
