import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardSizes = styled("div")(({ theme }) => ({
  color: "white",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "200px",
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    height: "350px",
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    minheight: "320px",
    flex: "0 0 30%",
  },
}));

interface Content {
  number: string;
  name?: string;
  stats: string;
}

function CardCustom(content: Content) {
  return (
    <>
      <CardSizes>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "solid 1px green",
            height: "100%",
          }}
        >
          <CardContent sx={{ color: "white", textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{
                borderBottom: "solid 1px green",
                paddingBottom: "9 px",
                marginBottom: "15px",
              }}
            >
              {content.number}
            </Typography>
            <Typography>{content.name}</Typography>
            <Typography>{content.stats}</Typography>
          </CardContent>
        </Card>
      </CardSizes>
    </>
  );
}

export default CardCustom;
