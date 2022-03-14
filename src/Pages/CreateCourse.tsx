import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    subtitle1: {
      /* border: "solid 2px white", */

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
        fontSize: 128,
      },
    },
    h4: {
      fontSize: 42,
    },

    h5: {
      fontSize: 18,
      marginBottom: 12,
    },
  },
});

const Container = styled("div")(({ theme }) => ({
  marginTop: "",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "0px",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "0px",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    display: "flex",
    background: "#f2f2f2",
    padding: "60px",
  },
}));

export function CreateCourse() {
  const { user } = useAuth();
  const [modulesTitle, setModulesTitle] = useState("");
  const [textModule, setTextModule] = useState("");
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([""]);

  const addItem = () => {
    setItemList([item].concat(itemList));
    setItem("");
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  function ChangeValue() {
    return console.log({
      title: modulesTitle,
      text: textModule,
      Urls: itemList,
    });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <h1>{modulesTitle}</h1>

          <p> {textModule} </p>
          <input
            type="text"
            onChange={(event) => setModulesTitle(event.target.value)}
          />
          <textarea onChange={(event) => setTextModule(event.target.value)} />
          <input
            type="text"
            placeholder="Item"
            value={item}
            name="item"
            onChange={(e) => setItem(e.target.value)}
          />

          <button onClick={addItem}>Adicionar Item</button>

          <button onClick={() => ChangeValue()}>Save</button>
          <ul>
            {itemList.map((e) => (
              <li> {e} </li>
            ))}
          </ul>
        </Container>
      </ThemeProvider>
    </>
  );
}
