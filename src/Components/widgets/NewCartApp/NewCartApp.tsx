import { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

import { Drawer, Grid, Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import { Wrapper, StyledButton } from "./NewCart.styles";

import data from "../../../backendFake/allcourses.json";

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  amount: number;
};

export const CartNav = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  let myCartItems = useContext(CartContext);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  function checkActualCart() {
    cartItems.length === 0
      ? checkPreviewCart()
      : console.log("adicionamos items ao carrinho");
  }

  checkActualCart();

  function checkPreviewCart() {
    myCartItems.length > 0
      ? myCartItems[0].length > 0
        ? setCartItems((cartItems) => [...cartItems, ...myCartItems[0]])
        : console.log("não é a primeira seção e não temos item no carrinho")
      : console.log("não temos items no carrinho primeira seção");
  }

  useEffect(() => {
    myCartItems.splice(0, myCartItems.length);
    myCartItems.push(cartItems);
  }, [cartItems.length]);

  function handleRemoveFromCart(id: number) {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
    return myCartItems.length > 0
      ? myCartItems[0].findIndex((e: any) => e.id === id)
        ? console.log("achamos o elemento")
        : myCartItems.splice(0, myCartItems.length)
      : console.log("não precisa de update");
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="secondary">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
    </Wrapper>
  );
};

export const MyStore = () => {
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  let myCartItems = useContext(CartContext);

  const handleAddToCart = (clickedItem: CartItemType) => {
    const evitarDuplos = cartItems.find((e) => e.id === clickedItem.id);
    const doubleCheck = evitarDuplos
      ? false
      : setCartItems((prev) => {
          const isItemInCart = prev.find((item) => item.id === clickedItem.id);
          const verificar = !isItemInCart
            ? [...prev, { ...clickedItem, amount: 1 }]
            : "curso já adicionado";

          console.log(verificar);

          return [...prev, { ...clickedItem, amount: 1 }];
        });
    console.log(doubleCheck);
  };

  function checkActualCart() {
    cartItems.length === 0
      ? checkPreviewCart()
      : console.log("adicionamos items ao carrinho");
  }

  checkActualCart();

  function checkPreviewCart() {
    myCartItems.length > 0
      ? myCartItems[0].length > 0
        ? setCartItems((cartItems) => [...cartItems, ...myCartItems[0]])
        : console.log("não é a primeira seção e não temos item no carrinho")
      : console.log("não temos items no carrinho primeira seção");
  }

  useEffect(() => {
    myCartItems.splice(0, myCartItems.length);
    myCartItems.push(cartItems);
  }, [cartItems.length]);

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}></Item>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};
