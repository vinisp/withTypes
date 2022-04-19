import { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

import { Drawer, Badge, Button, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import { Wrapper, StyledButton } from "./NewCart.styles";
import { styled } from "@mui/material/styles";
import { Footer } from "../Footer";

import axios from "axios";

// import data from "../../../backendFake/allcourses.json";

export type CartItemType = {
  id: number;
  title?: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  amount: number;
};
const CourseWrapperMain = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CategoriesMainWrapper = styled("div")(({ theme }) => ({
  paddingTop: "160px",
  paddingBottom: "60px",
  display: "flex",
  justifyContent: "center",
  borderBottom: "solid 1px green",
  [theme.breakpoints.down("xs")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
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
    height: "1200px",
    display: "flex",
    paddingTop: "80px",
    justifyContent: "center",
    gap: "32px",
  },
}));

const CardDoItem = styled("div")(({ theme }) => ({
  border: "solid 1px green",
  padding: "0",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  color: "white",
  img: {
    width: 300,
  },

  h1: {
    borderRadius: "7px 7px 0 0",
    textAling: "center",
    color: "white",
    backgroundColor: "darkgreen",
    padding: "15px",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    minHeigth: "750px",
    width: "301px",
  },
}));

const TextContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
  paddingTop: "10px",

  ".price": {
    borderBottom: "solid 1px green",
    width: "100%",
    fontSize: "36px",
  },

  ".priceSymbol": {
    color: "green",

    fontSize: "24px",
    fontWeigth: "800",
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

// const Categories = new Set<string>(data.map((e) => e.category));
// const ListCategorys = Array.from(Categories);

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

  useEffect(() => {
    cartItems.splice(0, cartItems.length);
    checkPreviewCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCartItems[0]?.length]);

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
  // const [listCourses, setListCourses] = useState([] as CartItemType[]);
  const [allCourses, setAllCourses] = useState<any>([]);
  const [carrinhoDeCurso, setCarrinho] = useState<any[]>([]);

  const myCartItems = useContext(CartContext);

  /* const handleAddToCart = (clickedItem: CartItemType) => {
    myCartItems[0].find((e: any) => e.id === clickedItem.id)
      ? console.log("achamos")
      : myCartItems[0].push(clickedItem);
  }; */

  const handleUpdate = () => {
    myCartItems.splice(0, myCartItems.length);
    myCartItems.push(cartItems);
  };

  const youNeedUpdate = () => {
    myCartItems[0]
      ? setCartItems((cartItems) => [...cartItems, ...myCartItems[0]])
      : handleUpdate();
  };

  useEffect(() => {
    youNeedUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length]);

  /* function FilterByTipe(type: any) {
    const coursesByType = data.filter((e) => e.category === type);
    return setListCourses(coursesByType);
  }

  function ShowAllCourses() {
    const coursesByType = data.map((e) => e);
    return setListCourses(coursesByType);
  } */

  function GetAllCourses() {
    useEffect(() => {
      axios.get(`http://localhost:3001/courses`).then((response) => {
        setAllCourses(response.data);
        allCourses.map((e: any) => (e.amount = 0));
        return allCourses;
      });
    }, []);
  }

  GetAllCourses();

  function addToCart(item: any) {
    const filterItems =
      carrinhoDeCurso.length > 0
        ? carrinhoDeCurso
            .map((e) => (e.course_id === item.course_id ? true : false))
            .filter((e) => e === true).length > 0
          ? false
          : setCarrinho((element: any) => [...element, item])
        : setCarrinho((element: any) => [...element, item]);
    console.log(filterItems);
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
              onClick={
                /*() => ShowAllCourses()*/ () => console.log("todos os cursos")
              }
              color="success"
              sx={{ width: "120px" }}
              variant="outlined"
            >
              Todos os Cursos
            </Button>

            {/* ListCategorys.map((e) => (
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
            )) */}
          </CategoriesWrapper>
        </div>
      </CategoriesMainWrapper>
      <CoursesGrid>
        {/* listCourses.length > 0
          ? listCourses.map((item) => (
              <CourseBox key={item.id}>
                <Item item={item} handleAddToCart={handleAddToCart}></Item>
              </CourseBox>
            ))
          : data?.map((item) => (
              <CourseBox key={item.id}>
                <Item item={item} handleAddToCart={handleAddToCart}></Item>
              </CourseBox>
            )) */}

        {allCourses.length > 0
          ? allCourses.map((item: any) => (
              <div>
                <CardDoItem key={item.id}>
                  <h1 style={{ textAlign: "center" }}>{item.name} </h1>
                  <img src={item.thumb_url} alt={item.name}></img>
                  <TextContent>
                    <Typography
                      className="price"
                      fontWeight={600}
                      textAlign="center"
                    >
                      <span className="priceSymbol"> R$ </span> {item.price}
                    </Typography>
                    <p> {item.main_resume}</p>
                    <p>Categoria: {item.category}</p>
                    <p>Dificuldade: {item.level}</p>
                  </TextContent>
                  <Button
                    sx={{ marginTop: "25px", padding: "15px 0" }}
                    color="success"
                    variant="contained"
                    fullWidth
                    onClick={() => addToCart(item)}
                  >
                    Comprar
                  </Button>
                </CardDoItem>
              </div>
            ))
          : "loading..."}
        <Button onClick={() => console.log(carrinhoDeCurso)}>Aleatório</Button>
      </CoursesGrid>
      <Footer />
    </CourseWrapperMain>
  );
};
