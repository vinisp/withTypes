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
  padding: "60px 0",
  minHeight: 350,
  background: "rgba(0,0,0, 0.3)",
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  color: "white",
  alignItems: "center",
  transition: "height 350ms",
  borderBottom: "solid 2px green",
}));

const ShowAndOrganizeModules = styled("div")(({ theme }) => ({
  marginBottom: "15px",
  padding: "20px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 35,
  minHeight: 350,
  color: "white",
  background: "rgba(211,211,211, 0.3)",
}));

const LayoutArea = styled("div")(({ theme }) => ({
  padding: "80px",
  width: "100%",
  minHeight: 500,
  background: "rgba(211,211,211, 0.3)",
  borderRadius: "4px",
  border: "solid 1px silver",
}));

const NoItemsCard = styled("div")(({ theme }) => ({
  padding: "80px 0",
  width: "100%",
  background: "rgba(211,211,211)",
  borderRadius: "4px",
  border: "solid 1px silver",
  color: "black",
  fontSize: "32px",
  textAlign: "center",
}));

const ParagraphElement = styled("p")(({ theme }) => ({
  marginTop: "1rem",
  textAlign: "center",
}));

const TitleElement = styled("h1")(({ theme }) => ({
  textAlign: "center",
}));

const SubTitleElement = styled("h3")(({ theme }) => ({
  textAlign: "center",
}));

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  width: "auto",
  background: isDragging ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,1)",
  color: isDragging ? "white" : "black",
  border: isDragging ? "2px solid yellow" : "1px solid rgba(0,0,255,0.2)",
  borderRadius: `4px`,

  padding: "5px 7px",

  ...draggableStyle,
});

export function CreateCourse() {
  const [todo, setTodo] = useState([
    { id: "0", title: "", subTitle: "", paragraph: "" },
  ]);

  const [moduleName, setModuleName] = useState("");

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
        <Button
          variant="contained"
          sx={{ minWidth: "300px" }}
          color="success"
          onClick={addTitle}
        >
          Salvar Título
        </Button>
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
        <Button
          variant="contained"
          sx={{ minWidth: "300px" }}
          color="success"
          onClick={addSubtitle}
        >
          Salvar Subtítulo
        </Button>
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
          style={{ padding: "15px", minHeight: "30px", minWidth: "650px" }}
          placeholder="seu texto..."
        />
        <Button
          variant="outlined"
          sx={{ minWidth: "300px" }}
          color="success"
          onClick={addParagraph}
        >
          Salvar Parágrafo
        </Button>
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
        <Button
          variant="contained"
          sx={{ minWidth: "300px" }}
          color="success"
          onClick={addTitleAndSubTitle}
        >
          Salvar Título e Subtítulo
        </Button>
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
          style={{ padding: "15px", minHeight: "30px", minWidth: "650px" }}
          placeholder="seu texto..."
        />
        <Button
          variant="contained"
          sx={{ minWidth: "300px" }}
          color="success"
          onClick={addSubtitleAndParagraph}
        >
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
          style={{ padding: "15px", minHeight: "30px", minWidth: "650px" }}
          placeholder="seu texto..."
        />
        <Button
          variant="contained"
          sx={{ minWidth: "300px" }}
          color="success"
          onClick={addTitleSubtitleAndParagraph}
        >
          Salvar Título, Subtítulo e Parágrafo
        </Button>
      </>
    );
  }

  return (
    <>
      <ContainerRegisterNewModule>
        <h2>Escolha o nome do módulo: </h2>
        <TextField
          id="filled-basic"
          label="Nome do módulo"
          variant="filled"
          sx={{ background: "white", minWidth: "360px" }}
          onChange={(event) => setModuleName(event.target.value)}
        />

        <h1>Crie um novo capítulo</h1>

        <select onChange={(e) => setValueState(e.target.value)}>
          <option>Escolha um Elemento </option>
          <option value="title">Título</option>
          <option value="titleAndSub">Título + Subtítulo</option>
          <option value="titleAndSubAndParagraph">
            Título + Subtítulo + Parágrafo
          </option>
          <option value="subtitle">Subtítulo</option>
          <option value="paragraphAndSub">Subtítulo + Parágrafo</option>
          <option value="paragraph">Parágrafo</option>
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
        <Button
          color="warning"
          variant="contained"
          onClick={() => console.log({ moduleName: moduleName, content: todo })}
        >
          Salvar Módulo
        </Button>
      </ContainerRegisterNewModule>

      <DragDropContext onDragEnd={onDragEnd}>
        <ShowAndOrganizeModules>
          <div>
            <h1>Abaixo você pode ver e organizar os elementos do seu módulo</h1>
          </div>
          <div>O título do módulo é: {moduleName}</div>
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="todo"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <LayoutArea>
                  {todo.length > 1 ? (
                    todo.map(({ id, title, paragraph, subTitle }, index) => {
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
                              {title.length > 0 ? (
                                <TitleElement>{title} </TitleElement>
                              ) : (
                                false
                              )}
                              {subTitle.length > 0 ? (
                                <SubTitleElement>{subTitle} </SubTitleElement>
                              ) : (
                                false
                              )}
                              {paragraph.length > 0 ? (
                                <ParagraphElement>{paragraph}</ParagraphElement>
                              ) : (
                                false
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <NoItemsCard> "Sem items adicionados" </NoItemsCard>
                  )}
                </LayoutArea>
              </div>
            )}
          </Droppable>
        </ShowAndOrganizeModules>
      </DragDropContext>
    </>
  );
}
