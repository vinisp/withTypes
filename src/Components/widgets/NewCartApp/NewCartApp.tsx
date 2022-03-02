import { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

import { Drawer, Badge, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import { Wrapper, StyledButton } from "./NewCart.styles";
import { styled } from "@mui/material/styles";

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
const CourseWrapperMain = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#f2f2f2",
  padding: "40px 0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CategoriesMainWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  alignItems: "center",
  borderBottom: "solid 3px silver",
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "80%",
    height: "300px",
  },
}));

const CategoriesWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",

  gap: "20px",
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    flex: "0 0 65%",
  },
}));

const CategoryCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  border: "solid 1px silver",

  [theme.breakpoints.down("xs")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 15%",
  },
}));

const CoursesGrid = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "25px",

  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "60%",
  },
}));

const CourseBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 35%",
  },
}));

const Categories = new Set<string>(data.map((e) => e.category));
const ListCategorys = Array.from(Categories);

export const CartNav = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  let myCartItems = useContext(CartContext);

  function getTotalItems(items: CartItemType[]): number {
    return items.reduce((acc, item) => acc + item.amount, 0);
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [listCourses, setListCourses] = useState([] as CartItemType[]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length]);

  function FilterByTipe(type: any) {
    const coursesByType = data.filter((e) => e.category === type);
    return setListCourses(coursesByType);
  }

  return (
    <CourseWrapperMain>
      <div>
        <h2>TAGLINE PARA DESCREVER A LOJA</h2>
      </div>
      <CategoriesMainWrapper>
        <div>
          <h3>Categorias</h3>
          <p>Explicação sobre as categorias</p>
        </div>
        <CategoriesWrapper>
          {ListCategorys.map((e) => (
            <>
              <CategoryCard>
                {e}
                <Button onClick={() => FilterByTipe(e)}>Clica Aqui </Button>
              </CategoryCard>
            </>
          ))}
        </CategoriesWrapper>
      </CategoriesMainWrapper>
      <CoursesGrid>
        {listCourses.length > 0
          ? listCourses.map((item) => (
              <CourseBox key={item.id}>
                <Item item={item} handleAddToCart={handleAddToCart}></Item>
              </CourseBox>
            ))
          : data?.map((item) => (
              <CourseBox key={item.id}>
                <Item item={item} handleAddToCart={handleAddToCart}></Item>
              </CourseBox>
            ))}
      </CoursesGrid>
    </CourseWrapperMain>
  );
};
