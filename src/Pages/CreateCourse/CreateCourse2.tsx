import { useState } from "react";
import { styled } from "@mui/material/styles";
import ReactPlayer from "react-player";

import {
  TextField,
  Button,
  TextareaAutosize,
  Box,
  Modal,
} from "@mui/material/";
import { Footer } from "../../Components/widgets/Footer";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import "../styles/CreateCourse.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MainContainer = styled("div")(({ theme }) => ({
  padding: "60px 0",
  background: "rgba(0,0,0, 1)",
  display: "flex",
  flexWrap: "wrap",
}));

const ContainerRegisterNewModule = styled("div")(({ theme }) => ({
  padding: "60px 0px 0 30px",
  height: "640px",
  background: "rgba(0,0,0, 0.3)",
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 15,
  color: "white",
  transition: "height 350ms",

  flex: "0 0 30%",
}));

const ShowAndOrganizeModules = styled("div")(({ theme }) => ({
  padding: "30px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 35,
  minHeight: 350,
  color: "white",
  background: "rgba(211,211,211, 0.3)",
  flex: "0 0 70%",
  width: "100%",
  borderLeft: "solid 2px green",
}));

const LayoutArea = styled("div")(({ theme }) => ({
  padding: "30px",
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

const ImgResized = styled("img")(({ theme }) => ({
  width: "200px",
}));

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  width: "auto",
  background: isDragging ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,1)",
  color: isDragging ? "white" : "black",
  borderBottom: isDragging
    ? "2px solid yellow"
    : "2px solid rgba(34,119,34,0.4)",
  borderRadius: `4px`,

  padding: "5px 7px",

  ...draggableStyle,
});

interface ModuleElement {
  id: string;
  title?: string;
  subTitle?: string;
  paragraph?: string;
  image?: string;
  video?: string;
}

export function CreateCourse() {
  const [todo, setTodo] = useState<ModuleElement[]>([]);

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

  function Update() {
    setTodo(todo);
  }

  function genereteId() {
    const allIds = todo.map((e) => +e.id);
    const newID = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
    return newID.toString();
  }

  function handleRemoveItem(id: string) {
    setTodo(todo.filter((e) => e.id !== id));
  }

  function handleEditItem(id: string, element: any, newValue: string) {
    todo.filter((e) => e.id === id).map((e: any) => (e[element] = newValue));
    Update();
  }

  const addTitle = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        title: module,
      },
    ]);
    setModules("");
  };

  const addImage = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        image: module,
      },
    ]);
    setModules("");
  };

  const addSubtitle = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        subTitle: module,
      },
    ]);
    setModules("");
  };

  const addParagraph = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        paragraph: module,
      },
    ]);
    setModules(" ");
  };

  const addVideo = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        video: module,
      },
    ]);
    setModules(" ");
  };

  const addTitleAndSubTitle = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        title: module,
        subTitle: secModule,
      },
    ]);
    setModules("");
  };

  const addSubtitleAndParagraph = () => {
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
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
        id: genereteId(),
        title: module,
        subTitle: secModule,
        paragraph: thirdModule,
      },
    ]);
    setModules("");
  };

  //Single Elements

  function ShowEditModal(id: string, element: string) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave(newValue: string) {
      handleEditItem(id, element, newValue);
      handleClose();
    }

    const nomeDoCampo: string = `new ${element}`;

    return (
      <>
        <Button onClick={handleOpen}>Editar</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="filled-basic"
              label={nomeDoCampo}
              variant="filled"
              sx={{ background: "white", width: "70%" }}
              onChange={(event) => setModules(event.target.value)}
            />
            <Button
              variant="contained"
              sx={{ width: "70%" }}
              color="success"
              onClick={() => CloseAndSave(module)}
            >
              Salvar Alteração
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  function ShowItems() {
    return (
      <>
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
                  {todo.length > 0 ? (
                    todo.map(
                      (
                        { id, title, subTitle, paragraph, image, video },
                        index
                      ) => {
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
                                {title ? (
                                  <>
                                    <TitleElement>{title} </TitleElement>
                                    <button
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      X
                                    </button>

                                    {ShowEditModal(id, "title")}
                                  </>
                                ) : (
                                  false
                                )}
                                {subTitle ? (
                                  <>
                                    <SubTitleElement>
                                      {subTitle}
                                    </SubTitleElement>
                                    <button
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      X
                                    </button>
                                    {ShowEditModal(id, "subTitle")}
                                  </>
                                ) : (
                                  false
                                )}
                                {paragraph ? (
                                  <>
                                    <ParagraphElement>
                                      {paragraph}
                                    </ParagraphElement>
                                    <button
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      X
                                    </button>
                                  </>
                                ) : (
                                  false
                                )}
                                {image ? (
                                  <>
                                    <ImgResized src={image} alt="" />
                                    <button
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      X
                                    </button>
                                  </>
                                ) : (
                                  false
                                )}
                                {video ? (
                                  <>
                                    <ReactPlayer
                                      controls
                                      url={`https://vimeo.com/${video}`}
                                    />
                                    <button
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      X
                                    </button>
                                  </>
                                ) : (
                                  false
                                )}
                              </div>
                            )}
                          </Draggable>
                        );
                      }
                    )
                  ) : (
                    <NoItemsCard> "Sem items adicionados" </NoItemsCard>
                  )}
                </LayoutArea>
              </div>
            )}
          </Droppable>
        </ShowAndOrganizeModules>
      </>
    );
  }

  function RenderTitleCreate() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="Título"
          variant="filled"
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
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
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
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
          style={{ padding: "15px", minHeight: "30px", width: "70%" }}
          placeholder="seu texto..."
        />
        <Button
          variant="outlined"
          sx={{ width: "70%" }}
          color="success"
          onClick={addParagraph}
        >
          Salvar Parágrafo
        </Button>
      </>
    );
  }

  function RenderImageCreate() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="Url da imagem"
          variant="filled"
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
          color="success"
          onClick={addImage}
        >
          Salvar Imagem
        </Button>
      </>
    );
  }

  function RenderVideoCreate() {
    return (
      <>
        <TextField
          id="filled-basic"
          label="url do vídeo"
          variant="filled"
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
          color="success"
          onClick={addVideo}
        >
          Salvar Vídeo
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
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="SubTítulo"
          variant="filled"
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setSecModule(event.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
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
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <TextareaAutosize
          id="filled-basic"
          minRows={10}
          onChange={(event) => setSecModule(event.target.value)}
          style={{ padding: "15px", minHeight: "30px", width: "70%" }}
          placeholder="seu texto..."
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
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
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setModules(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="SubTítulo"
          variant="filled"
          sx={{ background: "white", width: "70%" }}
          onChange={(event) => setSecModule(event.target.value)}
        />
        <TextareaAutosize
          id="filled-basic"
          minRows={10}
          onChange={(event) => setThirdModule(event.target.value)}
          style={{ padding: "15px", minHeight: "30px", width: "70%" }}
          placeholder="seu texto..."
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
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
      <MainContainer>
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
          <div className="custom-select">
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
              <option value="image">Imagem</option>
              <option value="video">Vídeo</option>
            </select>
            <span className="custom-arrow"></span>
          </div>
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
          {valueState === "image" ? RenderImageCreate() : false}
          {valueState === "video" ? RenderVideoCreate() : false}
          <Button
            color="warning"
            sx={{ width: "70%" }}
            variant="contained"
            onClick={() =>
              alert(
                JSON.stringify(
                  { moduleName: moduleName, content: todo },
                  null,
                  2
                )
              )
            }
          >
            Salvar Módulo
          </Button>
        </ContainerRegisterNewModule>

        <DragDropContext onDragEnd={onDragEnd}>{ShowItems()}</DragDropContext>
      </MainContainer>
      <Footer />
    </>
  );
}