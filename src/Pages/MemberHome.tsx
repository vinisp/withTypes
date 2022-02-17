import { Typography, Box, Card, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useState } from "react";

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
    height: "320px",
    width: "75%",
    display: "block",
    padding: 0,
  },
}));

//MOCK RACES DATA

const races = [
  {
    trackID: "1",
    tracks: [
      {
        raceID: "1",
        country: "Australia",
        trackName: "Sidney",
        date: "15-02-22",
        hour: "3PM",
        dogs: [
          {
            dogName: "Jack Black",
            dogInfos: "...",
          },
          {
            dogName: "Jack Black",
            dogInfos: "...",
          },
        ],
      },
      {
        raceID: "2",
        country: "Australia",
        trackName: "Melbourne",
        date: "15-02-22",
        hour: "3PM",
        dogs: [
          {
            dogName: "Jack Black",
            dogInfos: "...",
          },
          {
            dogName: "Jack Black",
            dogInfos: "...",
          },
        ],
      },
    ],
  },
  {
    trackID: "2",
    tracks: [
      {
        raceID: "3",
        country: "EUA",
        trackName: "California",
        date: "15-02-22",
        hour: "4PM",
        dogs: [
          {
            dogName: "Jack Black",
            dogInfos: "...",
          },
          {
            dogName: "Jack Black",
            dogInfos: "...",
          },
        ],
      },
    ],
  },
];

const filtersByCountry = (raceCon: string) => {
  const filterRaces = races.map((e) =>
    e.tracks?.filter((e) => e.country === raceCon)
  );
  return filterRaces.filter((e) => e.length > 0);
};

const NextRaces = () =>
  races.map((e) =>
    e.tracks?.map((e) => (
      <h2>
        {e.trackName} - {e.hour} - {e.date} - {e.country} -
      </h2>
    ))
  );

function MemberAreaHome() {
  const [racesBy, setRacesby] = useState([
    {
      raceID: "",
      country: "",
      trackName: "",
    },
  ]);

  function cardContent(country: string, link: string) {
    const myCountry = filtersByCountry(country);
    const countryFlat = myCountry.flat();

    return (
      <>
        <Button
          onClick={() => {
            racesBy.splice(1, racesBy.length);
            countryFlat.map((e) =>
              setRacesby((racesBy) => [
                ...racesBy,
                {
                  raceID: e.raceID,
                  country: e.country,
                  trackName: e.trackName,
                },
              ])
            );
          }}
        >
          {country}
        </Button>
      </>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{ color: "white" }}
        ></Typography>
        <ResponsiveCards>
          <CardResponsive>
            <Card sx={{ height: "100%", width: "100%" }} variant="outlined">
              {cardContent("Australia", "/Australia")}
            </Card>
          </CardResponsive>
          <CardResponsive>
            <Card sx={{ height: "100%", width: "100%" }}>
              {cardContent("EUA", "/EUA")}
            </Card>
          </CardResponsive>
          <CardResponsive>
            <Card sx={{ height: "100%", width: "100%" }}>
              {cardContent("UK", "/UK")}
            </Card>
          </CardResponsive>
        </ResponsiveCards>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {racesBy.length > 1 ? (
          <ResponsiveCards>
            <CardResponsiveRaces>
              <Card sx={{ height: "100%", width: "100%" }} variant="elevation">
                <Typography
                  sx={{ background: "green", color: "white", padding: 1 }}
                  variant={"h4"}
                >
                  Próximas Corridas
                </Typography>
                <div className="rulesTab">
                  {racesBy.map((e) => (
                    <Button>
                      <Typography
                        sx={{
                          borderBottom: "solid 1px silver",
                          width: "100%",
                          textAlign: "left",
                        }}
                      >
                        {e.country} - {e.trackName}{" "}
                      </Typography>
                    </Button>
                  ))}
                </div>
              </Card>
            </CardResponsiveRaces>
          </ResponsiveCards>
        ) : (
          <ResponsiveCards>
            <CardResponsiveRaces>
              <Card sx={{ height: "100%", width: "100%" }} variant="elevation">
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
        )}
      </Box>
    </>
  );
}

export default MemberAreaHome;
