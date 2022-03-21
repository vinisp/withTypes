import { useState } from "react";
import { styled } from "@mui/material/styles";
import ReactPlayer from "react-player";

import {
  TextField,
  Button,
  TextareaAutosize,
  Tooltip,
  Box,
  Modal,
  CssBaseline,
  Typography,
} from "@mui/material/";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Footer } from "../../Components/widgets/Footer";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

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
  padding: "80px 0",
  background: "rgba(43,45,45, 1)",
  display: "flex",
  flexWrap: "wrap",
}));

const ControlsContainer = styled("div")(({ theme }) => ({
  background: "rgba(116,116,116,0.4)",
  display: "flex",
  flexDirection: "column",
  padding: "30px",
  borderRadius: "4px",
  gap: "25px",
  alignItems: "center",
  button: {
    width: "100%",
  },
  select: {
    width: "100%",
  },

  width: "90%",
}));

const MainDetails = styled("ul")(({ theme }) => ({
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "100%",
}));

const ButtonsWrapperIconsTools = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "rgba(255,255,255,0.1)",
  width: "100%",
  padding: "5px",
  gap: "5px",
}));

const ContainerRegisterNewModule = styled("div")(({ theme }) => ({
  padding: "60px 0",
  height: "auto",
  background: "0",
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 15,
  color: "white",
  transition: "height 350ms",

  flex: "0 0 20%",
}));

const ShowAndOrganizeModules = styled("div")(({ theme }) => ({
  padding: "30px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 35,
  minHeight: 300,
  color: "white",
  background: "rgba(211,211,211, 0.1)",
  flex: "0 0 80%",
  width: "100%",
  borderLeft: "solid 2px green",
}));

const LayoutArea = styled("div")(({ theme }) => ({
  padding: "20px 10px",
  width: "100%",
  minHeight: 600,
  background: "rgba(211,211,211, 0.3)",
  borderRadius: "4px",
  border: "solid 1px silver",
}));

const ManageCard = styled("div")(({ theme }) => ({
  border: "solid 1px green",
  borderBottom: 0,
  background: "rgba(0,0,0, 1)",
  borderRadius: "4px",
  fontSize: "18px",
  color: "white",
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "80px",
  span: {
    flex: "0 0 50%",
    display: "flex",
    justifyContent: "flex-start",
    padding: "",
  },

  ".ButtonsWrapperEditModule": {
    flex: "0 0 20%",
    display: "",

    button: {
      height: "35px",
    },
  },
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
    : "3px solid rgba(34,119,34,0.7)",
  borderRadius: `4px`,

  padding: "5px 7px",

  ...draggableStyle,
});

interface Module {
  moduleName: string;
  moduleId: string;
  moduleContent?: any;
}

interface ModuleElement {
  id: string;
  title?: string;
  subTitle?: string;
  paragraph?: string;
  image?: string;
  video?: string;
}

export function CreateCourse() {
  const [openControls, setOpenControls] = useState<boolean>(true);
  const openStyle = openControls ? "flex" : "none";
  const openWidthControls = openControls ? "20%" : "5%";
  const openWidthContent = openControls ? "75%" : "85%";
  const changeSideDesktop = openControls ? "75%" : "0";
  const changeSideLargeTablet = openControls ? "65%" : "0";
  const changeSideTablet = openControls ? "55%" : "0";
  const changeSideSmartphone = openControls ? "60%" : "0";

  const [allModules, setAllModules] = useState<Module[]>([]);
  const [todo, setTodo] = useState<ModuleElement[]>([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  /* const [sumary, setSumary] = useState(""); */

  //Module states
  const [moduleName, setModuleName] = useState("");
  const [module, setModules] = useState("");
  const [secModule, setSecModule] = useState("");
  const [thirdModule, setThirdModule] = useState("");

  const [valueState, setValueState] = useState("");
  const [valueIDSelectModule, setValueIDSelectModule] = useState("0");

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodo(items);
  };

  const onDragEndModules = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(allModules);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setAllModules(items);
  };

  function genereteId() {
    const allIds = todo.map((e) => +e.id);
    const newID = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
    return newID.toString();
  }

  function genereteId2() {
    const allIds = allModules.map((e) => +e.moduleId);
    const newID = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
    return newID.toString();
  }

  function DeleteAndUpdate() {
    todo.splice(0, todo.length);
    setTodo(todo.filter((e) => e));
  }

  function handleRemoveItem(id: string) {
    setTodo(todo.filter((e) => e.id !== id));
  }

  function handleRemoveModule(id: string) {
    setAllModules(allModules.filter((e) => e.moduleId !== id));
  }

  function handleEditItem(id: string, element: any, newValue: string) {
    todo.filter((e) => e.id === id).map((e: any) => (e[element] = newValue));
    setTodo(todo.filter((e) => e));
  }

  function handleEditModuleName(id: string, newValue: string) {
    allModules
      .filter((e) => e.moduleId === id)
      .map((e: any) => (e.moduleName = newValue));
    setAllModules(allModules.filter((e) => e));
  }

  const editCourseName = () => {
    setCourseName(courseName);
  };

  const editDescription = () => {
    setCourseDescription(courseDescription);
  };

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
    setSecModule("");
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
    setSecModule("");
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
    setSecModule("");
    setThirdModule("");
  };

  //Single Elements

  function ShowEditModal(id: string, element: string) {
    const [open, setOpen] = useState(false);
    const [editValue, setEditValue] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave(newValue: string) {
      handleEditItem(id, element, newValue);
      handleClose();
    }

    const nomeDoCampo: string = `new ${element}`;

    return (
      <>
        <button className="editButton" onClick={handleOpen}>
          <span> Editar </span> <EditIcon />
        </button>
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
              onChange={(event) => setEditValue(event.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => CloseAndSave(editValue)}
              fullWidth
            >
              Salvar Alteração
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  function ShowEditModalModuleName(id: string) {
    const [open, setOpen] = useState(false);
    const [editValue, setEditValue] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave(newValue: string) {
      handleEditModuleName(id, newValue);
      handleClose();
    }

    return (
      <>
        <Button variant="outlined" onClick={handleOpen}>
          <span> Editar </span> <EditIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="filled-basic"
              label="Novo nome para o módulo"
              variant="filled"
              sx={{ background: "white", width: "70%" }}
              onChange={(event) => setEditValue(event.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => CloseAndSave(editValue)}
              fullWidth
            >
              Salvar Alteração
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  function ShowEditParagraph(id: string, element: string) {
    const [open, setOpen] = useState(false);
    const [editValue, setEditValue] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave(newValue: string) {
      handleEditItem(id, element, newValue);
      handleClose();
    }

    return (
      <>
        <button className="editButton" onClick={handleOpen}>
          <span> Editar </span> <EditIcon />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextareaAutosize
              id="filled-basic"
              minRows={10}
              onChange={(event) => setEditValue(event.target.value)}
              style={{ padding: "15px", minHeight: "30px", width: "70%" }}
              placeholder="seu texto..."
            />
            <Button
              variant="outlined"
              sx={{ width: "70%" }}
              color="success"
              onClick={() => CloseAndSave(editValue)}
            >
              Salvar Parágrafo
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  //Components

  function CourseInformations() {
    return (
      <>
        <MainDetails>
          <li>
            <div>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ width: "100%" }}
                >
                  <span> Nome do curso: {courseName} </span>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    id="filled-basic"
                    label="Título"
                    variant="filled"
                    sx={{ background: "white", width: "100%" }}
                    onChange={(event) => setCourseName(event.target.value)}
                    value={courseName}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    color="success"
                    onClick={() => {
                      editCourseName();
                    }}
                  >
                    Salvar
                  </Button>
                </AccordionDetails>
              </Accordion>
            </div>
          </li>
          <li>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <span> Descrição </span>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    id="filled-basic"
                    label="Descrição"
                    variant="filled"
                    sx={{ background: "white", width: "100%" }}
                    onChange={(event) =>
                      setCourseDescription(event.target.value)
                    }
                    value={courseDescription}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    color="success"
                    onClick={() => {
                      editDescription();
                    }}
                  >
                    Salvar
                  </Button>
                </AccordionDetails>
              </Accordion>
            </div>
          </li>
        </MainDetails>
      </>
    );
  }

  console.log(CourseInformations());

  function ShowItems() {
    return (
      <>
        <ShowAndOrganizeModules>
          <div>
            <h1>Abaixo você pode ver e organizar os elementos do seu módulo</h1>
          </div>

          <div>
            {allModules.length > 0 ? (
              <span>Você está editando o módulo {moduleName}</span>
            ) : (
              "Nenhum módulo neste curso"
            )}
          </div>
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
                                  <div className="elementSoloStyle">
                                    <TitleElement>{title} </TitleElement>

                                    <button
                                      className="deleteElementButton"
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      EXCLUIR <DeleteOutlineIcon />
                                    </button>

                                    {ShowEditModal(id, "title")}
                                  </div>
                                ) : (
                                  false
                                )}
                                {subTitle ? (
                                  <div className="elementSoloStyle">
                                    <SubTitleElement>
                                      {subTitle}
                                    </SubTitleElement>
                                    <button
                                      className="deleteElementButton red"
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      EXCLUIR <DeleteOutlineIcon />
                                    </button>
                                    {ShowEditModal(id, "subTitle")}
                                  </div>
                                ) : (
                                  false
                                )}
                                {paragraph ? (
                                  <div className="elementSoloStyle">
                                    <ParagraphElement>
                                      {paragraph}
                                    </ParagraphElement>
                                    <button
                                      className="deleteElementButton red"
                                      onClick={() => handleRemoveItem(id)}
                                    >
                                      EXCLUIR <DeleteOutlineIcon />
                                    </button>
                                    {ShowEditParagraph(id, "paragraph")}
                                  </div>
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
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setModules(event.target.value)}
          value={module}
        />
        <Button
          variant="contained"
          sx={{ width: "70%" }}
          color="success"
          onClick={() => {
            addTitle();
          }}
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
          sx={{
            background: "white",
            width: "100%",
          }}
          onChange={(event) => setModules(event.target.value)}
          value={module}
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
          style={{ padding: "15px", minHeight: "30px", width: "100%" }}
          placeholder="seu texto..."
          value={module}
        />
        <Button
          variant="contained"
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
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setModules(event.target.value)}
          value={module}
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
          label="id do vídeo"
          variant="filled"
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setModules(event.target.value)}
          value={module}
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
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setModules(event.target.value)}
          value={module}
        />
        <TextField
          id="filled-basic"
          label="SubTítulo"
          variant="filled"
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setSecModule(event.target.value)}
          value={secModule}
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
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setModules(event.target.value)}
          value={module}
        />
        <TextareaAutosize
          id="filled-basic"
          minRows={10}
          onChange={(event) => setSecModule(event.target.value)}
          style={{ padding: "15px", minHeight: "30px", width: "100%" }}
          placeholder="seu texto..."
          value={secModule}
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
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setModules(event.target.value)}
          value={module}
        />
        <TextField
          id="filled-basic"
          label="SubTítulo"
          variant="filled"
          sx={{ background: "white", width: "100%" }}
          onChange={(event) => setSecModule(event.target.value)}
          value={secModule}
        />
        <TextareaAutosize
          id="filled-basic"
          minRows={10}
          onChange={(event) => setThirdModule(event.target.value)}
          style={{ padding: "15px", minHeight: "30px", width: "100%" }}
          placeholder="seu texto..."
          value={thirdModule}
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

  function SaveModule(id: any) {
    const selectItem = allModules.filter((e) => e.moduleId === id);
    selectItem[0].moduleContent.splice(0, selectItem[0].moduleContent.length);
    selectItem[0].moduleContent.push(...todo);
  }

  function NewModule() {
    const [open, setOpen] = useState(false);
    const [newModuleName, setNewModuleName] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave() {
      setModuleName(newModuleName);
      setAllModules((allModules) => [
        ...allModules,
        {
          moduleId: genereteId2(),
          moduleName: newModuleName,
          moduleContent: todo,
        },
      ]);

      const lastID =
        allModules.length === 0
          ? "1"
          : Math.max(...allModules.map((e: any) => +e.moduleId)) + 1;
      setValueIDSelectModule(lastID.toString());
      todo.splice(0, todo.length);
      setTodo(todo.filter((e) => e));
      handleClose();
    }

    return (
      <>
        <Button
          color="success"
          sx={{ width: "70%" }}
          variant={"contained"}
          onClick={handleOpen}
        >
          <span> Criar novo Módulo </span> <EditIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="filled-basic"
              style={{ padding: "15px", minHeight: "30px", width: "70%" }}
              placeholder="seu texto..."
              onChange={(e: any) => setNewModuleName(e.target.value)}
            />
            <Button variant="outlined" onClick={() => CloseAndSave()}>
              Criar novo módulo
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  function SelectModule() {
    return (
      <>
        <div>
          <Typography
            variant="h6"
            textAlign={"center"}
            sx={{ marginBottom: "5px" }}
          >
            Qual módulo deseja editar ?
          </Typography>
          <select onChange={(e) => setValueIDSelectModule(e.target.value)}>
            {allModules.length > 0
              ? allModules.map((e) => (
                  <option value={e.moduleId}> {e.moduleName}</option>
                ))
              : false}
          </select>
          <Button
            variant="contained"
            onClick={() => {
              const selectModule = allModules
                .filter((e) => e.moduleId === valueIDSelectModule)
                .flat();

              selectModule.flatMap((e) => e.moduleContent.flat()).length > 0
                ? setTodo(selectModule.flatMap((e) => e.moduleContent.flat()))
                : DeleteAndUpdate();
              setModuleName(selectModule[0].moduleName);
              console.log(selectModule[0].moduleName);
            }}
          >
            VER ITENS DO MÓDULO
          </Button>
        </div>
      </>
    );
  }

  function ManageModules() {
    return (
      <>
        <Accordion sx={{ width: "100%", padding: "0" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ width: "100%" }}
          >
            <Typography> Gerenciar módulos </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ minHeight: "300px", padding: "0 5px" }}>
            <DragDropContext onDragEnd={onDragEndModules}>
              <Droppable droppableId="allModules">
                {(provided) => (
                  <div
                    className="allModules"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {allModules.map(({ moduleId, moduleName }, index) => {
                      return (
                        <Draggable
                          key={moduleId}
                          draggableId={moduleId}
                          index={index}
                        >
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
                              <ManageCard>
                                <span> {moduleName} </span>
                                <div className="ButtonsWrapperEditModule">
                                  <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={() => handleRemoveModule(moduleId)}
                                  >
                                    Deletar
                                  </Button>
                                  {ShowEditModalModuleName(moduleId)}
                                </div>
                              </ManageCard>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </AccordionDetails>
        </Accordion>
      </>
    );
  }

  function CreateItemInModule() {
    return (
      <>
        <ControlsContainer>
          <Typography variant="h6">Crie um novo elemento</Typography>

          <select onChange={(e) => setValueState(e.target.value)}>
            <option>Escolha um Elemento </option>
            <optgroup label="Elemento Sozinho">
              <option value="title">Título</option>
              <option value="subtitle">Subtítulo</option>
              <option value="paragraph">Parágrafo</option>
              <option value="image">Imagem</option>
              <option value="video">Vídeo</option>
            </optgroup>
            <optgroup label="Elementos Agrupados">
              <option value="titleAndSub">Título + Subtítulo</option>
              <option value="titleAndSubAndParagraph">
                Título + Subtítulo + Parágrafo
              </option>

              <option value="paragraphAndSub">Subtítulo + Parágrafo</option>
            </optgroup>
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
          {valueState === "image" ? RenderImageCreate() : false}
          {valueState === "video" ? RenderVideoCreate() : false}

          <Button
            color="warning"
            variant="contained"
            onClick={() => SaveModule(valueIDSelectModule)}
          >
            Salvar Módulo
          </Button>
        </ControlsContainer>
      </>
    );
  }

  return (
    <>
      <CssBaseline>
        <MainContainer>
          <Box
            sx={{
              flex: `0 0 ${openWidthControls}`,
              transition: "all 250ms ease",
              minHeight: 650,
              background: "rgba(38,48,24)",
            }}
          >
            <ContainerRegisterNewModule>
              <Box
                sx={{
                  background: "rgba(0,0,0,0.4)",
                  width: "100%",
                  heigth: "180px",
                  display: "flex",
                  transition: "all 550ms ease",
                  padding: [
                    `2px 0 2px ${changeSideSmartphone}`,
                    `2px 0 2px ${changeSideTablet}`,
                    `2px 0 2px ${changeSideLargeTablet}`,
                    `2px 0 2px ${changeSideDesktop}`,
                  ],
                }}
              >
                <Button
                  color="success"
                  variant="outlined"
                  onClick={() => {
                    openControls === true
                      ? setOpenControls(false)
                      : setOpenControls(true);
                  }}
                >
                  {openControls ? (
                    <KeyboardDoubleArrowLeftIcon />
                  ) : (
                    <KeyboardDoubleArrowRightIcon />
                  )}
                </Button>
              </Box>

              {/* CourseInformations() */}
              <Box
                sx={{
                  display: openStyle,
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  alignItems: "center",
                  transition: "all 350ms ease",
                }}
              >
                <ControlsContainer>
                  {allModules.length > 0 ? SelectModule() : false}
                  {allModules.length > 0 ? ManageModules() : false}
                  {NewModule()}
                </ControlsContainer>
                {allModules.length > 0 ? CreateItemInModule() : false}
              </Box>

              <Box sx={{ width: "100%" }}>
                {openControls ? (
                  false
                ) : (
                  <ButtonsWrapperIconsTools>
                    <Tooltip title="Novo Módulo">
                      <Button
                        fullWidth
                        sx={{
                          borderBottom: "solid 2px white",
                          height: "60px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        variant="contained"
                        color="success"
                      >
                        <CreateNewFolderIcon />
                      </Button>
                    </Tooltip>
                    <Button
                      fullWidth
                      sx={{ borderBottom: "solid 2px white", height: "60px" }}
                      variant="contained"
                      color="success"
                    >
                      1
                    </Button>
                    <Button
                      fullWidth
                      sx={{ borderBottom: "solid 2px white", height: "60px" }}
                      variant="contained"
                      color="success"
                    >
                      1
                    </Button>
                    <Button
                      fullWidth
                      sx={{ borderBottom: "solid 2px white", height: "60px" }}
                      variant="contained"
                      color="success"
                    >
                      1
                    </Button>
                  </ButtonsWrapperIconsTools>
                )}
              </Box>
            </ContainerRegisterNewModule>
          </Box>
          <Box
            sx={{
              flex: `0 0 ${openWidthContent}`,
              transition: "all 450ms ease",
            }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              {ShowItems()}
            </DragDropContext>
          </Box>
        </MainContainer>
      </CssBaseline>
      <Footer />
    </>
  );
}
