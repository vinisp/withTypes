import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardSizes = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    height: "200px",
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "200px",
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    height: "200px",
    width: "90%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "350px",
    width: "80%",
  },
}));

interface Content {
    number: string
    name: string
    stats: string
}

function CardAbout(content: Content) {
  return (
    <>
      <CardSizes>
        <Card sx={{ backgroundColor: "#dcdcdc", height: "100%",}}>
          <CardContent>
            <Typography>{content.number}</Typography>
            <Typography>{content.name}</Typography>
            <Typography>{content.stats}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Saiba mais</Button>
          </CardActions>
        </Card>
      </CardSizes>
    </>
  );
}

export default CardAbout;
