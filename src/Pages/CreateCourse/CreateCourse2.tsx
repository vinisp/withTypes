import { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, TextareaAutosize } from "@mui/material/";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import "../styles/CreateCourse.css";

const ContainerRegisterNewModule = styled("div")(({ theme }) => ({
  paddingTop: "60px",
  minHeight: 350,
  background: "rgba(0,211,211, 0.2)",
  border: "solid 1px white",
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  color: "white",
  alignItems: "center",
}));

const ShowAndOrganizeModules = styled("div")(({ theme }) => ({
  paddingTop: "160px",
  minHeight: 350,
  background: "rgba(211,211,211, 0.3)",
  border: "solid 1px white",
  marginBottom: "15px",
}));

const LayoutArea = styled("div")(({ theme }) => ({
  padding: "160px",
  minHeight: 600,
  background: "rgba(11,11,211, 0.3)",
  border: "solid 1px red",
}));

const ParagraphElement = styled("div")(({ theme }) => ({
  border: "solid 1px red",
  padding: "25px",
}));

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  width: "auto",
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  borderRadius: `4px`,

  ...draggableStyle,
});

export function CreateCourse() {
  const [todo, setTodo] = useState([
    { id: "0", title: "", subTitle: "", paragraph: "" },
  ]);

  const [module, setModules] = useState("");
  const [secModule, setSecModule] = useState("");
  const [thirdModule, setThirdModule] = useState("");

  const [valueState, setValueState] = useState("");

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodo(items);
  };

  const addTitle = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: todo.length.toString(),
        title: module,
        subTitle: "",
        paragraph: "",
      },
    ]);
    setModules("");
  };

  const addSubtitle = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: todo.length.toString(),
        title: "",
        subTitle: module,
        paragraph: "",
      },
    ]);
    setModules("");
  };

  const addParagraph = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: todo.length.toString(),
        title: "",
        subTitle: "",
        paragraph: module,
      },
    ]);
    setModules(" ");
  };

  const addTitleAndSubTitle = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: todo.length.toString(),
        title: module,
        subTitle: secModule,
        paragraph: "",
      },
    ]);
    setModules("");
  };

  const addSubtitleAndParagraph = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: todo.length.toString(),
        title: "",
        subTitle: module,
        paragraph: secModule,
      },
    ]);
    setModules("");
  };

  const addTitleSubtitleAndParagraph = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: todo.length.toString(),
        title: module,
        subTitle: secModule,
        paragraph: thirdModule,
      },
    ]);
    setModules("");
  };

  //Single Elements

  function RenderTitleCreate() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="Título"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <Button onClick={addTitle}>Salvar Título</Button>
      </>
    );
  }

  function RenderSubtitleCreate() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="Subtítulo"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <Button onClick={addSubtitle}>Salvar Subtítulo</Button>
      </>
    );
  }

  function RenderParagraphCreate() {
    return (
      <>
        <TextareaAutosize
          id="filled-basic"
          minRows={10}
          onChange={(event) => setModules(event.target.value)}
          style={{ padding: 50 }}
          placeholder="seu texto..."
        />
        <Button onClick={addParagraph}>Salvar Parágrafo</Button>
      </>
    );
  }

  //Double Elements

  function RenderTitleAndSubCreate() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="Título"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="SubTítulo"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setSecModule(event.target.value)}
        />
        <Button onClick={addTitleAndSubTitle}>Salvar Título e Subtítulo</Button>
      </>
    );
  }

  function RenderSubtitleAndParagraph() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="SubTítulo"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <TextareaAutosize
          id="filled-basic"
          minRows={10}
          onChange={(event) => setSecModule(event.target.value)}
          style={{ padding: 50 }}
          placeholder="seu texto..."
        />
        <Button onClick={addSubtitleAndParagraph}>
          Salvar Subtítulo e Parágrafo
        </Button>
      </>
    );
  }

  //Trinca

  function RenderTitleSubtitleAndParagraph() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="Título"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="SubTítulo"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setSecModule(event.target.value)}
        />
        <TextareaAutosize
          id="filled-basic"
          minRows={10}
          onChange={(event) => setThirdModule(event.target.value)}
          style={{ padding: 50 }}
          placeholder="seu texto..."
        />
        <Button onClick={addTitleSubtitleAndParagraph}>
          Salvar Título, Subtítulo e Parágrafo
        </Button>
      </>
    );
  }

  return (
    <>
      <ContainerRegisterNewModule>
        <h1>Crie um novo elemento</h1>
        <select onChange={(e) => setValueState(e.target.value)}>
          <option>Escolha um Elemento </option>
          <option value="title">Título</option>
          <option value="titleAndSub">Título + Subtítulo</option>
          <option value="titleAndSubAndParagraph">
            Título + Subtítulo + Parágrafo
          </option>
          <option value="subtitle">Subtítulo</option>
          <option value="paragraph">Parágrafo</option>
          <option value="paragraphAndSub">Parágrafo + Subtítulo</option>
        </select>
        {valueState === "title" ? RenderTitleCreate() : false}
        {valueState === "titleAndSub" ? RenderTitleAndSubCreate() : false}
        {valueState === "paragraph" ? RenderParagraphCreate() : false}
        {valueState === "subtitle" ? RenderSubtitleCreate() : false}
        {valueState === "paragraphAndSub"
          ? RenderSubtitleAndParagraph()
          : false}
        {valueState === "titleAndSubAndParagraph"
          ? RenderTitleSubtitleAndParagraph()
          : false}
      </ContainerRegisterNewModule>

      <DragDropContext onDragEnd={onDragEnd}>
        <ShowAndOrganizeModules>
          <h1>Abaixo você pode ver e organizar os elementos do seu módulo</h1>
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="todo"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <LayoutArea>
                  {todo.length > 1
                    ? todo.map(({ id, title, paragraph, subTitle }, index) => {
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                className="moduleElements"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                {title.length > 0 ? <h1>{title} </h1> : false}
                                {subTitle.length > 0 ? (
                                  <h2>{subTitle} </h2>
                                ) : (
                                  false
                                )}
                                {paragraph.length > 0 ? (
                                  <ParagraphElement>
                                    {paragraph}
                                  </ParagraphElement>
                                ) : (
                                  false
                                )}
                              </div>
                            )}
                          </Draggable>
                        );
                      })
                    : "não temos itens"}
                </LayoutArea>
              </div>
            )}
          </Droppable>
        </ShowAndOrganizeModules>
      </DragDropContext>
    </>
  );
}
