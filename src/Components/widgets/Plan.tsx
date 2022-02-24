import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardSizes = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),

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
    height: "650px",
    width: "20%",
  },
}));

interface Content {
  number: string;
  name: string;
  stats: string;
}

function Plan(content: Content) {
  return (
    <>
      <CardSizes>
        <Card
          sx={{
            backgroundColor: "#c7def1",
            height: "100%",
            borderRadius: "8px",
          }}
        >
          <CardContent sx={{ background: "#001d35", height: "10%" }}>
            <Typography sx={{ fontSize: "2rem", color: "white" }}>
              {content.number}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{content.name}</Typography>
            <Typography>{content.stats}</Typography>
            <Button size="small">Saiba mais</Button>
          </CardActions>
        </Card>
      </CardSizes>
    </>
  );
}

export default Plan;
