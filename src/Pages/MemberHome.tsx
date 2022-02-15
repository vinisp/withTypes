import { Typography, Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

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

    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    display: "none",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "8%",
    display: "none",
  },
  [theme.breakpoints.up("lg")]: {
    height: "320px",
    width: "25%",
    display: "block",
    padding: 0,
  },
}));

const CardResponsiveRaces = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",

  [theme.breakpoints.down("sm")]: {
    width: "100%",

    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    display: "none",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "8%",
    display: "none",
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
    tracks: [
      {
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
        country: "Australia",
        trackName: "Melbourn",
        date: "15-02-22",
        hour: "5PM",
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
    tracks: [
      {
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
  {},
];

function cardContent(country: string, link: string) {
  return (
    <>
      <h1>{country}</h1>
      <h2>{link}</h2>
    </>
  );
}

const NextRaces = () =>
  races.map((e) =>
    e.tracks?.map((e) => (
      <h2>
        {e.trackName} - {e.hour} - {e.date} - {e.country}
      </h2>
    ))
  );

function MemberAreaHome() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" textAlign={"center"} sx={{ color: "white" }}>
          Member Area Home
        </Typography>
        <ResponsiveCards>
          <CardResponsive>
            <Card sx={{ height: "100%" }} variant="outlined">
              {cardContent("Autralia", "/Australia")}
            </Card>
          </CardResponsive>
          <CardResponsive>
            <Card sx={{ height: "100%" }}>{cardContent("EUA", "/EUA")}</Card>
          </CardResponsive>
          <CardResponsive>
            <Card sx={{ height: "100%" }}>{cardContent("UK", "/UK")}</Card>
          </CardResponsive>
        </ResponsiveCards>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveCards>
          <CardResponsiveRaces>
            <Card sx={{ height: "100%" }} variant="elevation">
              <Typography
                sx={{ background: "green", color: "white", padding: 1 }}
                variant={"h5"}
              >
                Próximas Corridas
              </Typography>
              {NextRaces()}
            </Card>
          </CardResponsiveRaces>
        </ResponsiveCards>
      </Box>
    </>
  );
}

export default MemberAreaHome;
