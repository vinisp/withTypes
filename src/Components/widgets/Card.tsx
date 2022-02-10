import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardSizes = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
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
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "200px",
    width: "20%",
  },
}));

interface Content {
    number: string
    name: string
    stats: string
}

function CardCustom(content: Content) {
  return (
    <>
      <CardSizes>
        <Card sx={{ backgroundColor: "#dcdcdc" }}>
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

export default CardCustom;
