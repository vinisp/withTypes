import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardSizes = styled("div")(({ theme }) => ({
  color: "white",
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
  number: string;
  name: string;
  stats: string;
}

function CardCustom(content: Content) {
  return (
    <>
      <CardSizes>
        <Card
          sx={{ backgroundColor: "transparent", border: "solid 1px green" }}
        >
          <CardContent sx={{ color: "white", textAlign: "center" }}>
            <Typography>{content.number}</Typography>
            <Typography>{content.name}</Typography>
            <Typography>{content.stats}</Typography>
          </CardContent>
        </Card>
      </CardSizes>
    </>
  );
}

export default CardCustom;
