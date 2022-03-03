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
  margin: "0 165px",
}));

const MenuDesktop = styled("nav")(({ theme }) => ({
  background: "rgba(242, 242, 242, 0.123)",
  color: "white",
  position: "fixed",
  width: "100%",
  padding: "15px",
  ul: {
    margin: "0 35px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "25px",
  },
  li: {
    color: "white",
    listStyle: "none",
    textTransform: "uppercase",
    transition: "350ms all ease",
    paddingBottom: "2px",
    borderBottom: "solid 2px transparent",

    "&:hover": {
      color: "lightBlue",
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
                <Button
                  variant="outlined"
                  {...bindTrigger(popupState)}
                  sx={{
                    height: "45px",
                    display: "flex",
                    alignItems: "center",

                    border: 0,
                  }}
                >
                  <Icon sx={{ height: "100%" }}>
                    <MenuIcon />
                  </Icon>
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Profile</MenuItem>
                  <MenuItem onClick={popupState.close}>My account</MenuItem>
                  <MenuItem onClick={popupState.close}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </ThemeProvider>
      </MenuMobile>
      <MenuDesktop>
        <LogoBox>Logo</LogoBox>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/store">Loja</Link>
              </li>
              <li>
                <Link to="/memberhome">Corridas</Link>
              </li>
              <li>
                <CartNav />
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li>
                <Button onClick={LogOut}>Logout</Button>
              </li>
            </>
          ) : (
            <>
              <Button>
                <Link to="/">Home</Link>
              </Button>
              <Button>
                <Link to="/store">Loja</Link>
              </Button>
              <Button>
                <CartNav />
              </Button>
              <Button>
                <Link to="login">Login</Link>
              </Button>
              <Button>
                <Link to="/register">Cadastrar</Link>
              </Button>
            </>
          )}
        </ul>
      </MenuDesktop>
    </>
  );
}

export default Nav;
