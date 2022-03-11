import { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

import { Drawer, Badge, Button, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import { Wrapper, StyledButton } from "./NewCart.styles";
import { styled } from "@mui/material/styles";
import { Footer } from "../Footer";

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
  padding: "30px 0 0 0",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CategoriesMainWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  background: "#0e0e0e",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",

  gap: "15px",

  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "100%",
    height: "400px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    height: "420px",
  },
}));

const CategoriesWrapper = styled("div")(({ theme }) => ({
  marginTop: "45px",
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
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    flex: "0 0 65%",
  },
}));

const CoursesGrid = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "25px",
  padding: "45px 0",

  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    width: "100%",
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
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 25%",
  },

  [theme.breakpoints.up("md")]: {
    flex: "0 0 25%",
  },
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 25%",
  },
}));

const Categories = new Set<string>(data.map((e) => e.category));
const ListCategorys = Array.from(Categories);

export const CartNav = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const myCartItems: any = useContext(CartContext);

  function getTotalItems(items: CartItemType[]): number {
    return items.reduce((acc, item) => acc + item.amount, 0);
  }

  function checkActualCart() {
    cartItems.length === 0
      ? checkPreviewCart()
      : console.log({ HookUSe: cartItems, HookContext: myCartItems[0] });
  }

  checkActualCart();

  function checkPreviewCart() {
    myCartItems.length > 0
      ? myCartItems[0].length > 0
        ? setCartItems((cartItems) => [...cartItems, ...myCartItems[0]])
        : console.log("não é a primeira seção e não temos item no carrinho")
      : console.log("não temos items no carrinho primeira seção");
  }

  // useEffect(() => {
  //   myCartItems.splice(0, myCartItems.length);
  //   myCartItems.push(cartItems);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cartItems.length]);

  useEffect(() => {
    cartItems.splice(0, cartItems.length);
    checkPreviewCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCartItems[0]?.length]);

  // function handleRemoveFromCart(id: number) {
  //   setCartItems((prev) =>
  //     prev.reduce((acc, item) => {
  //       if (item.id === id) {
  //         if (item.amount === 1) return acc;
  //         return [...acc, { ...item, amount: item.amount - 1 }];
  //       } else {
  //         return [...acc, item];
  //       }
  //     }, [] as CartItemType[])
  //   );
  //   return myCartItems.length > 0
  //     ? myCartItems[0].findIndex((e: any) => e.id === id)
  //       ? console.log("achamos o elemento")
  //       : myCartItems.splice(0, myCartItems.length)
  //     : console.log("não precisa de update");
  // }

  const updateRender = () => {
    cartItems.splice(0, cartItems.length);
    setCartItems((cartItems) => [...cartItems, ...myCartItems[0]]);
  };

  const handleRemoveFromCart = (id: any) => {
    const IndexElement = myCartItems[0].findIndex((e: any) => e.id === id);
    myCartItems[0].splice(IndexElement, 1);
    console.log(myCartItems[0]);
    updateRender();
  };

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

  const myCartItems = useContext(CartContext);

  // function checkActualCart(item: any) {
  //   cartItems.length === 0
  //     ? checkPreviewCart()
  //     : console.log({
  //         result: cartItems.find((e) => e.id === item.id)
  //           ? "achamos"
  //           : setCartItems((cartItems) => [...cartItems, ...myCartItems[0]]),
  //       });
  // }

  // const handleAddToCart = (clickedItem: CartItemType) => {
  //   console.log(myCartItems);
  //   const evitarDuplos = cartItems.find((e) => e.id === clickedItem.id);
  //   console.log(evitarDuplos, cartItems);
  //   const doubleCheck = evitarDuplos
  //     ? false
  //     : setCartItems((prev) => {
  //         const isItemInCart = prev.find((item) => item.id === clickedItem.id);
  //         const verificar = !isItemInCart
  //           ? [...prev, { ...clickedItem, amount: 1 }]
  //           : "curso já adicionado";

  //         return [...prev, { ...clickedItem, amount: 1 }];
  //       });
  //   checkActualCart(clickedItem);
  // };

  const handleAddToCart = (clickedItem: CartItemType) => {
    console.log(setCartItems);
    console.log(myCartItems[0]);
    myCartItems[0].find((e: any) => e.id === clickedItem.id)
      ? console.log("achamos")
      : myCartItems[0].push(clickedItem);
  };

  // function checkPreviewCart() {
  //   myCartItems.length > 0
  //     ? myCartItems[0].length > 0
  //       ? setCartItems((cartItems) => [...cartItems, ...myCartItems[0]])
  //       : console.log("não é a primeira seção e não temos item no carrinho")
  //     : console.log("não temos items no carrinho primeira seção");
  // }

  useEffect(() => {
    myCartItems.splice(0, myCartItems.length);
    myCartItems.push(cartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length]);

  function FilterByTipe(type: any) {
    const coursesByType = data.filter((e) => e.category === type);
    return setListCourses(coursesByType);
  }

  function ShowAllCourses() {
    const coursesByType = data.map((e) => e);
    return setListCourses(coursesByType);
  }

  return (
    <CourseWrapperMain>
      <CategoriesMainWrapper>
        <div>
          <Typography variant="h3" color={"#97C930"}>
            TAGLINE PARA DESCREVER A LOJA
          </Typography>

          <Typography variant="h4" textAlign={"center"} color={"#97C930"}>
            Categorias
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign={"center"}
            color={"#97C930"}
          >
            Explicação sobre as categorias
          </Typography>
          <CategoriesWrapper>
            <Button
              onClick={() => ShowAllCourses()}
              color="success"
              sx={{ width: "120px" }}
              variant="outlined"
            >
              Todos os Cursos
            </Button>

            {ListCategorys.map((e) => (
              <>
                <Button
                  key={e}
                  onClick={() => FilterByTipe(e)}
                  color="success"
                  sx={{ width: "120px" }}
                  variant="outlined"
                >
                  {e}
                </Button>
              </>
            ))}
          </CategoriesWrapper>
        </div>
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
      <Footer />
    </CourseWrapperMain>
  );
};
