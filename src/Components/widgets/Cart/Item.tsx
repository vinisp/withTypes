// Types
import { CartItemType } from "./CartApp";
// Styles

import { styled } from "@mui/material/styles";

const StyledCardItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  background: "#f2f2f2",
  border: "solid 2px silver",
  borderRadius: "8px",
  transition: "all 450ms ease-in-out ",
  "&:hover": {
    border: "solid 2px blue ",
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "250px",
  },
}));

const StyledButton = styled("button")(({ theme }) => ({
  width: "100%",
  height: "80px",
  cursor: "pointer",
  background: "#f2f2f2",
  border: 0,
  borderTop: "solid 2px silver",
  borderRadius: "8px",
  transition: "all 450ms ease-in-out ",
  fontSize: 16,
  "&:hover": {
    background: "gray",
    borderTop: "solid 2px lightblue",
    color: "white",
  },
}));

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <>
    <StyledCardItem>
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
      <p>{item.description}</p>

      <StyledButton onClick={() => handleAddToCart(item)}>
        Add to cart
      </StyledButton>
    </StyledCardItem>
  </>
);

export default Item;
