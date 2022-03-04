import { Typography, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardSizes = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "450px",
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "450px",
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    height: "450px",
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "450px",
    width: "18%",
  },
}));

const Card = styled("div")(({ theme }) => ({
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
  },
}));

const PlansList = styled("ul")(({ theme }) => ({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 9,

  width: "100%",

  li: {
    width: "60%",
    listStyle: "none",
    padding: "15px 0",

    borderBottom: "solid 2px silver",
    display: "flex",
    justifyContent: "center",
    "&:nth-child(1)": {
      borderTop: "solid 2px silver",
    },
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

interface Content {
  courseName: string;
  price?: string;
  featurePri?: string;
  featureSec?: string;
  featureTh?: string;
}

function Plan(content: Content) {
  return (
    <>
      <CardSizes>
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            border: "solid 2px silver",
            borderRadius: "8px",
          }}
        >
          <Card>
            <Typography
              sx={{ fontSize: "2rem", color: "#001d35" }}
              textAlign={"center"}
            >
              {content.courseName}
            </Typography>

            <Typography
              sx={{ fontSize: "2rem", color: "#001d35" }}
              textAlign={"center"}
            >
              {content.price}
            </Typography>

            <PlansList>
              <li>{content.featurePri}</li>
              <li>{content.featureSec}</li>
              <li>{content.featureTh}</li>
            </PlansList>

            <Button variant="outlined" sx={{ width: "200px" }} color="success">
              Saiba mais
            </Button>
          </Card>
        </Paper>
      </CardSizes>
    </>
  );
}

export default Plan;
