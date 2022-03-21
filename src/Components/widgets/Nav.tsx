import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

import { CartNav } from "./NewCartApp/NewCartApp";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "@mui/material/Icon";

import Logo from "../../Components/sections/assets/logo.png";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    subtitle1: {
      "@media (max-width:600px)": {
        padding: "0 2px",
        fontSize: 14,
      },
      "@media (min-width:600px)": {
        padding: "0 5px",
        fontSize: 16,
      },
      "@media (min-width:900px)": {
        padding: "0 10px",
        fontSize: 16,
      },
      "@media (min-width:1200px)": {
        padding: "0 35px",
        fontSize: 18,
      },
      "@media (min-width:1536px)": {
        padding: "0 105px",
        fontSize: 18,
      },
    },

    h1: {
      fontWeight: 600,

      "@media (max-width:600px)": {
        fontSize: 32,
      },
      "@media (min-width:600px)": {
        fontSize: 36,
      },
      "@media (min-width:900px)": {
        fontSize: 32,
      },
      "@media (min-width:1200px)": {
        fontSize: 48,
      },
      "@media (min-width:1536px)": {
        fontSize: 64,
      },
      a: {
        color: "red !important",
      },
    },
  },
});

const MenuMobile = styled("div")(({ theme }) => ({
  background: "#0e0e0e",
  boxShadow: "0 2px 10px 2px rgba(0, 0, 0, 0.2)",
  color: "white",
  position: "fixed",
  width: "100%",
  zIndex: "9999",
  display: "flex",
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

const LogoBox = styled("div")(({ theme }) => ({
  color: "#97C930",
  fontWeight: "600",
  fontFamily: "Verdana, sans-serif",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 30%",
}));

const StyledButton = styled("button")(({ theme }) => ({
  border: "0",
  background: "0",
  color: "#97C930",
  fontWeight: "600",
  fontSize: "14px",
  textTransform: "uppercase",
  cursor: "pointer",
}));

const BoxLogoMobile = styled("button")(({ theme }) => ({
  border: "0",
  background: 0,
  flex: "0 0 50%",
  display: "flex",
}));

const BoxDrawer = styled("button")(({ theme }) => ({
  border: "0",
  background: 0,
  flex: "0 0 50%",
  display: "flex",
}));

const MenuDesktop = styled("nav")(({ theme }) => ({
  background: "#0e0e0e",
  boxShadow: "0 2px 10px 2px rgba(0, 0, 0, 0.2)",
  color: "white",
  position: "fixed",
  width: "100%",
  padding: "5px 0",
  zIndex: "9999",
  display: "flex",
  ul: {
    margin: "0 35px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "25px",
    flex: "0 0 60%",
  },
  li: {
    color: "#97C930",
    fontWeight: "600",
    fontSize: "14px",
    listStyle: "none",
    textTransform: "uppercase",
    transition: "350ms all ease",
    paddingBottom: "2px",
    borderBottom: "solid 2px transparent",

    "&:hover": {
      color: "#f2f2f2",
      borderBottom: "solid 2px black",
    },
  },
  [theme.breakpoints.down("sm")]: {
    display: "None",
  },
  [theme.breakpoints.up("sm")]: {
    display: "None",
  },

  [theme.breakpoints.up("md")]: {
    display: "Flex",
    justifyContent: "flex-end",
  },
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function Nav() {
  const { user } = useAuth();

  const LogOut = () =>
    signOut(auth)
      .then(() => {
        console.log("deslogado");
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <>
      <MenuMobile>
        <ThemeProvider theme={theme}>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <BoxDrawer>
                  <Button
                    {...bindTrigger(popupState)}
                    sx={{
                      height: "65px",
                    }}
                    color="success"
                  >
                    <MenuIcon sx={{ fontSize: "32px" }} />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                </BoxDrawer>

                <BoxLogoMobile>
                  <img src={Logo} alt="logo" />
                </BoxLogoMobile>
              </>
            )}
          </PopupState>
        </ThemeProvider>
      </MenuMobile>
      <MenuDesktop>
        <LogoBox>
          <img src={Logo} alt="imagem da logo" />
        </LogoBox>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/memberhome">Corridas</Link>
              </li>
              <li>
                <Link to="/store">Loja</Link>
              </li>
              <li>
                <CartNav />
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li>
                <StyledButton onClick={LogOut}>Logout</StyledButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/store">Loja</Link>
              </li>
              <li>
                <CartNav />
              </li>
              <li>
                <Link to="login">Login</Link>
              </li>
              <li>
                <Link to="/register">Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </MenuDesktop>
    </>
  );
}

export default Nav;
