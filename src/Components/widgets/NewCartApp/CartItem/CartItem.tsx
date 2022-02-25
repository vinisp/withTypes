import React from "react";
import IconButton from "@mui/material/IconButton";

import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { CartItemType } from "../NewCartApp";
import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;

  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, removeFromCart }) => (
  <Wrapper>
    <div className="content">
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <IconButton onClick={() => removeFromCart(item.id)}>
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
    </div>
    <div className="image">
      <img src={item.image} alt={item.title} />
    </div>
  </Wrapper>
);

export default CartItem;
