import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

import "./styles/CreateCourse.css";

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
  marginBottom: "15px",
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
    display: "flex",
    gap: "30px",
    color: "white",
    border: "solid 1px white",
    padding: "60px",
  },
}));

const ContainerItensForDrop = styled("div")(({ theme }) => ({
  marginBottom: "15px",
  display: "flex",
  flexWrap: "wrap",
  color: "white",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const MyParagraphs = styled("div")(({ theme }) => ({
  width: "300px",
  minHeight: "250px",
  border: "solid 1px white",
}));
const CardParagraph = styled("div")(({ theme }) => ({}));

export function CreateCourse() {
  const { user } = useAuth();
  const [modulesTitle, setModulesTitle] = useState("");
  const [listModulesTitle, setListModulesTitle] = useState([""]);
  const [textModule, setTextModule] = useState("");
  const [listTextModule, setListTextModule] = useState([""]);
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([""]);

  const paragraphs = document.querySelectorAll(".paragraphs");
  const dropZones = document.querySelectorAll(".dropZone");

  paragraphs.forEach((paragraph) => {
    paragraph.addEventListener("dragstart", dragStart);
    paragraph.addEventListener("drag", drag);
    paragraph.addEventListener("dragend", dragEnd);
  });

  function dragStart(this: any) {
    // console.log("você usou dragStart");

    dropZones.forEach((dropZone) => dropZone.classList.add("highlight"));
    this.classList.add("is-dragging");
  }

  function drag() {
    // console.log("você está arrastando");
  }

  function dragEnd(this: any) {
    // console.log("Você parou de arrastar");

    dropZones.forEach((dropZone) => dropZone.classList.remove("highlight"));
    this.classList.remove("is-dragging");
  }

  dropZones.forEach((dropZone) => {
    dropZone.addEventListener("dragenter", dragenter);
    dropZone.addEventListener("dragover", dragover);
    dropZone.addEventListener("dragleave", dragleave);
    dropZone.addEventListener("drop", drop);
  });

  function dragenter() {
    // console.log("entrou na zona");
  }

  function dragover(this: any, e: any) {
    e.preventDefault();
    const afterElement = getDragAfterElement(this, e.clientY);
    const elementBeignDragged = document.querySelector(".is-dragging");
    console.log(afterElement);
    if (afterElement == null) {
      this.appendChild(elementBeignDragged);
    } else {
      this.insertBefore(elementBeignDragged, afterElement);
    }
    this.classList.add("over");

    elementBeignDragged?.classList.add("dragElement");
  }

  function getDragAfterElement(container: any, y: any) {
    const draggableElements = [
      ...container.querySelectorAll(".is-dragging:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closeset, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        console.log(offset);

        if (offset < 0 && offset > closeset.offset) {
          return { offset: offset, element: child };
        } else {
          return closeset;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  function dragleave(this: any) {
    this.classList.remove("over");
  }

  function drop(this: any) {
    this.classList.remove("over");
  }

  function selectDropZoneElements() {
    const dragElements = document.querySelectorAll(".dragElement");
    const myElements = Array.from(dragElements);
    const CourseItems = myElements.map((e) => e.innerHTML);
    return console.log(CourseItems);
  }

  const dragElements = document.querySelectorAll(".dragElement");
  dragElements.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  const addItem = () => {
    setItemList([item].concat(itemList));
    setItem("");
  };

  const addParagraph = () => {
    setListTextModule([textModule].concat(listTextModule));
    setTextModule("");
  };

  const addTitle = () => {
    setListModulesTitle([modulesTitle].concat(listModulesTitle));
    setModulesTitle("");
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
          <h1>Criando o seu curso</h1>
          <p>
            Nessa página você consegue criar seu curso, com textos, imagens,
            vídeos e questionários
          </p>
          <h2>{modulesTitle}</h2>

          <div>
            <h3>Adicione os Subtitulos para o seu módulo </h3>
            <input
              type="text"
              onChange={(event) => setModulesTitle(event.target.value)}
            />
            <button onClick={addTitle}>Salvar Texto</button>
          </div>
          <div>
            <h3>Insira o paragráfo</h3>
            <textarea onChange={(event) => setTextModule(event.target.value)} />
            <button onClick={addParagraph}>Salvar Texto</button>
          </div>
          <div>
            <h3>Adicione URLS de vídeos</h3>
            <input
              type="text"
              placeholder="Item"
              value={item}
              name="item"
              onChange={(e) => setItem(e.target.value)}
            />

            <button onClick={addItem}>Adicionar Item</button>
          </div>
          <button onClick={() => ChangeValue()}>Save</button>
        </Container>
        <ContainerItensForDrop>
          <MyParagraphs>
            <h3>Meus Títulos</h3>
            {listModulesTitle.map((e) => (
              <CardParagraph draggable="true" className="paragraphs">
                <h1 className="yellow"> {e} </h1>
              </CardParagraph>
            ))}
          </MyParagraphs>

          <MyParagraphs>
            <h3>Meus Parágrafos</h3>
            {listTextModule.map((e) => (
              <CardParagraph draggable="true" className="paragraphs">
                <p> {e} </p>
              </CardParagraph>
            ))}
          </MyParagraphs>

          <MyParagraphs>
            <h3>Meus Vídeos</h3>
            {listTextModule.map((e) => (
              <CardParagraph draggable="true" className="paragraphs">
                {e}
              </CardParagraph>
            ))}
          </MyParagraphs>

          <MyParagraphs>
            <h3>Minhas Imagens</h3>
            {listTextModule.map((e) => (
              <CardParagraph draggable="true" className="paragraphs">
                {e}
              </CardParagraph>
            ))}
          </MyParagraphs>
        </ContainerItensForDrop>

        <Container className="dropZone">
          <h1>Layout do Curso</h1>
          <button onClick={selectDropZoneElements}>Ver elementos</button>
        </Container>
      </ThemeProvider>
    </>
  );
}
