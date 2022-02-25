import React from "react";
import { Button } from "@mui/material";
import { CartItemType } from "../NewCartApp";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h4>${item.price}</h4>
      </div>
      <Button
        color="primary"
        variant="contained"
        disableElevation
        onClick={() => handleAddToCart(item)}
      >
        Add to cart
      </Button>
    </div>
  </Wrapper>
);

export default Item;
