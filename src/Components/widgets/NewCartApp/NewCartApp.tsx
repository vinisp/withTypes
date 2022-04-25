import { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

import { Drawer, Button, Typography } from "@mui/material";
import { Pagination } from "../../../Pages/paginas_testes/testar_componentes";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import Item from "./Item/Item";
//import Cart from "./Cart/Cart";
import { Wrapper, StyledButton } from "./NewCart.styles";
import { styled } from "@mui/material/styles";
import { Footer } from "../Footer";

import { useHistory } from "react-router-dom";

import axios from "axios";

// import data from "../../../backendFake/allcourses.json";

const APIURL = "https://deppback.herokuapp.com/";

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
const PagenationWrapper = styled("div")(({ theme }) => ({
  display: "flex",

  justifyContent: "center",
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
  [theme.breakpoints.down("sm")]: {
    width: "100%",

    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",

    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",

    marginTop: "15px",
  },

  [theme.breakpoints.up("md")]: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "0",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",

    display: "flex",
    flexWrap: "wrap",
    paddingTop: "80px",
    justifyContent: "center",
    gap: "32px",
  },
}));

const ImgBox = styled("div")(({ theme }) => ({
  flex: "0 0 30%",
  [theme.breakpoints.down("xs")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const TitleBox = styled("div")(({ theme }) => ({
  width: "100%",
  flex: "0 0 15%",
  borderBottom: "solid 0.7px green",
  display: "flex",
  alignItems: "center",
  padding: "0 5px",

  [theme.breakpoints.down("xs")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ButtonBox = styled("div")(({ theme }) => ({
  width: "100%",
  flex: "0 0 5%",

  display: "flex",
  gap: "15px",
  paddingBottom: "15px",
  [theme.breakpoints.down("xs")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CardDoItem = styled("div")(({ theme }) => ({
  border: "solid 1px green",
  padding: "0",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "550px",
  maxHeigth: "550px",
  color: "white",
  img: {
    width: 300,
    flex: "0 0 20%",
  },

  h1: {
    borderRadius: "7px 7px 0 0",
    textAling: "center",
    color: "white",
    padding: "0px",
  },
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 80%",
    marginTop: "20px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "350px",
    marginTop: "20px",
  },

  [theme.breakpoints.up("md")]: {
    flex: "0 0 35%",
    marginTop: "20px",
  },
  [theme.breakpoints.up("lg")]: {
    flex: "0 0 20%",
  },
}));

const CardDoCarrinho = styled("div")(({ theme }) => ({
  border: "solid 1px green",
  padding: "0",
  borderRadius: "0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  color: "black",
  img: {
    width: 100,
  },

  h1: {
    borderRadius: "7px 7px 0 0",
    textAling: "center",
    color: "black",
    fontSize: "14px",
    padding: "15px",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    width: "100px",
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
  // const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const [cartItems, setCarItems] = useState<any[]>([]);

  //const myCartItems: any = useContext(CartContext);

  function CheckCartItems() {
    const myCartItems: any = useContext(CartContext);

    useEffect(() => {
      setCarItems(myCartItems);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myCartItems.length]);
  }

  CheckCartItems();

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <div>
          {cartItems.length > 0
            ? cartItems.map((e: any, index: any) => (
                <>
                  <CardDoCarrinho key={e.course_id}>
                    {e.thumb_url ? (
                      <img src={e.thumb_url} alt={e.name} />
                    ) : (
                      false
                    )}
                    <h1> {e.name} </h1>

                    <h2>R$ {e.price}</h2>
                    <Button
                      color="error"
                      onClick={() => {
                        cartItems.splice(index, 1);
                        setCarItems(cartItems.filter((e) => e));
                      }}
                    >
                      Excluir
                    </Button>
                  </CardDoCarrinho>
                </>
              ))
            : "não temos items no carrinho"}
        </div>
        <div>
          Total: {cartItems.reduce((e: any, i: any) => e + +i.price, 0)}
        </div>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}></StyledButton>
    </Wrapper>
  );
};

export const MyStore = () => {
  // const [listCourses, setListCourses] = useState([] as CartItemType[]);
  const [allCourses, setAllCourses] = useState<any>([]);
  //const [carrinhoDeCurso, setCarrinho] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  let history = useHistory<any>();

  const LIMIT = 6;

  function GetAllCourses() {
    useEffect(() => {
      axios.get(`${APIURL}courses`).then((response) => {
        setAllCourses(response.data);
        allCourses.map((e: any) => (e.amount = 0));
        return allCourses;
      });
    }, []);
  }

  GetAllCourses();

  // const myCartItems = useContext(CartContext);

  /* function AddToCart(item: any) {
    const filterItems =
      carrinhoDeCurso.length > 0
        ? carrinhoDeCurso
            .map((e) => (e.course_id === item.course_id ? true : false))
            .filter((e) => e === true).length > 0
          ? false
          : setCarrinho((element: any) => [...element, item])
        : setCarrinho((element: any) => [...element, item]);

    const filterToContext =
      myCartItems.length > 0
        ? myCartItems
            .map((e: any) => (e.course_id === item.course_id ? true : false))
            .filter((e: any) => e === true).length > 0
          ? false
          : myCartItems.push(item)
        : myCartItems.push(item);

    return [filterItems, filterToContext];
  } */

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
        {allCourses.length > 0 ? (
          allCourses.map((item: any, index: any) =>
            index < offset + LIMIT && index >= offset ? (
              <>
                <CardDoItem key={item.id}>
                  <TitleBox>
                    <h1 style={{ textAlign: "center", width: "100%" }}>
                      {item.name}
                    </h1>
                  </TitleBox>
                  <ImgBox>
                    {item.thumb_url ? (
                      <img src={item.thumb_url} alt={item.name} />
                    ) : (
                      <Typography>Sem Imagem</Typography>
                    )}
                  </ImgBox>

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
                  <ButtonBox>
                    <Button
                      sx={{
                        borderRadius: 0,
                      }}
                      color="success"
                      variant="outlined"
                      fullWidth
                      onClick={() => history.push(`/course/${item.course_id}`)}
                    >
                      VER DETALHES
                    </Button>
                    <Button
                      sx={{
                        borderRadius: 0,
                      }}
                      color="success"
                      variant="contained"
                      fullWidth
                      onClick={
                        /*() => AddToCart(item) */ () =>
                          history.push(`/buycourse/${item.course_id}`)
                      }
                    >
                      Comprar
                    </Button>
                  </ButtonBox>
                </CardDoItem>
              </>
            ) : (
              false
            )
          )
        ) : (
          <Typography sx={{ color: "white" }}> Carregando... </Typography>
        )}
      </CoursesGrid>
      <PagenationWrapper>
        <Pagination
          limit={LIMIT}
          total={allCourses.length}
          offset={offset}
          setOffset={setOffset}
        />
      </PagenationWrapper>
      <Footer />
    </CourseWrapperMain>
  );
};
