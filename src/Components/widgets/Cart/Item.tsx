import Button from "@mui/material/Button";
// Types
import { CartItemType } from "./CartApp";
// Styles

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <>
    <div>
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
      <p>{item.description}</p>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </>
);

export default Item;
