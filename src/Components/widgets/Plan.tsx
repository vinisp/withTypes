import { Typography, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const featureStyle = {
  fontSize: ["1rem", "1rem", "1rem", "1rem"],
  padding: ["2px 0", "4px 0", "6px 0", "15px 0"],
};

const CardSizes = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "350px",
    width: "60%",
    marginBottom: "25px",
  },
  [theme.breakpoints.up("sm")]: {
    height: "450px",
    width: "50%",
    marginBottom: "25px",
  },

  [theme.breakpoints.up("md")]: {
    height: "450px",
    width: "27%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "450px",
    width: "20%",
  },
}));

const Card = styled("div")(({ theme }) => ({
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
    heigth: "100%",
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
    heigth: "100%",
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
  },
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

  width: "100%",

  li: {
    width: "60%",
    listStyle: "none",

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
            display: "flex",
          }}
        >
          <Card>
            <Typography
              sx={{
                fontSize: ["2rem", "2.5rem", "2rem", "2rem"],
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#001d35",
              }}
              textAlign={"center"}
            >
              {content.courseName}
            </Typography>

            <Typography
              sx={{
                fontSize: ["1.2rem", "1.2rem", "2rem", "2rem"],
                color: "#001d35",
              }}
              textAlign={"center"}
            >
              {content.price}
            </Typography>

            <PlansList>
              <li>
                <Typography sx={featureStyle}>{content.featurePri}</Typography>
              </li>
              <li>
                <Typography sx={featureStyle}>{content.featureSec}</Typography>
              </li>
              <li>
                <Typography sx={featureStyle}> {content.featureTh} </Typography>
              </li>
            </PlansList>

            <Button variant="outlined" sx={{ width: "200px" }} color="success">
              Comprar
            </Button>
          </Card>
        </Paper>
      </CardSizes>
    </>
  );
}

export default Plan;
