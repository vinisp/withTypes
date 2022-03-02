import React from "react";
import { Button, Paper } from "@mui/material";
import { CartItemType } from "../NewCartApp";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const ContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    img: {},
  },
}));

const ContentArea = styled("div")(({ theme }) => ({
  border: "solid 2px transparent",
  borderRadius: "4px",
  transition: "all 350ms ease",
  "&:hover": {
    border: "solid 2px silver",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    img: {
      height: "200px",
      width: "280px",
      padding: "5px",
    },
    height: "460px",
  },
}));

const ButtonsWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <ContentArea>
    <Paper elevation={3} sx={{ width: "100%", height: "100%", padding: "0" }}>
      <ContentWrapper>
        <img src={item.image} alt="Minha Figura" />

        <div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h4>${item.price}</h4>
          </div>
          <ButtonsWrapper>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => handleAddToCart(item)}
            >
              PROMOVER ESSE PRODUTO
            </Button>
            <Button variant="outlined">
              <Link to={`/course/` + item.id}>Ver Detalhes</Link>{" "}
            </Button>
          </ButtonsWrapper>
        </div>
      </ContentWrapper>
    </Paper>
  </ContentArea>
);

export default Item;
