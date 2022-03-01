import React from "react";
import { Button, Paper } from "@mui/material";
import { CartItemType } from "../NewCartApp";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Paper elevation={3} sx={{ width: "100%", padding: "10px" }}>
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
        PROMOVER ESSE PRODUTO
      </Button>
    </div>
  </Paper>
);

export default Item;
