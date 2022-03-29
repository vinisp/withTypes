import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import ReactPlayer from "react-player";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//Criar um novo Curso ou editar um curso existente ?
//Criar
//LER
//Atualizar
//Deletar

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
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import "../styles/CreateCourse.css";

const style = {
  margin: "120px auto",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SelectInfo = styled("select")(({ theme }) => ({
  width: "100%",
}));

const MainContainer = styled("div")(({ theme }) => ({
  padding: "80px 0",
  background: "rgba(43,45,45, 1)",
  display: "flex",
  flexWrap: "wrap",
}));

const StyledMainCourseInformation = styled("ul")(({ theme }) => ({
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0 15px",
  gap: "8px",
  width: "100%",
  justifyContent: "center",
  color: "white",
  li: {
    p: { fontSize: "14px" },
  },
}));

const ControlsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "5px",
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

const ContainerRegisterNewModule = styled("div")(({ theme }) => ({
  padding: "30px 0 0 0",
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
  background: "rgba(0,0,0, 0.8)",
  borderRadius: "4px",
  fontSize: "18px",
  color: "white",
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100px",
  span: {
    flex: "0 0 50%",
    display: "flex",
    justifyContent: "flex-start",
    padding: "",
  },

  ".ButtonsWrapperEditModule": {
    flex: "0 0 20%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",

    button: {
      height: "20px",
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
  const { idCourse } = useParams<any>();

  const openWidthControls = openControls ? "20%" : "5%";
  const openWidthContent = openControls ? "75%" : "85%";
  const changeSideDesktop = openControls ? "75%" : "0";
  const changeSideLargeTablet = openControls ? "65%" : "0";
  const changeSideTablet = openControls ? "55%" : "0";
  const changeSideSmartphone = openControls ? "60%" : "0";

  const [allModules, setAllModules] = useState<Module[]>([]);
  const [todo, setTodo] = useState<ModuleElement[]>([]);

  const [myCourse, setMyCourse] = useState<any>([]);

  //Course Main Object

  const [course, setCourse] = useState<any[]>([]);

  //Module states
  const [moduleName, setModuleName] = useState("");
  const [module, setModules] = useState("");
  const [secModule, setSecModule] = useState("");
  const [thirdModule, setThirdModule] = useState("");

  const [valueState, setValueState] = useState("");
  const [valueIDSelectModule, setValueIDSelectModule] = useState("0");

  const openStyle = !openControls && allModules.length > 0 ? "flex" : "none";
  const openStyle3 = allModules.length > 0 ? "flex" : "none";
  const openStyle4 = openControls && allModules.length > 0 ? "flex" : "none";

  useEffect(() => {
    axiosTestGet();
  });

  const justifyStyle = openControls ? "flex-start" : "center";
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }

  function axiosTestGet() {
    axios
      .get(`https://deppback.herokuapp.com/course/${idCourse}`)
      .then(function (response) {
        const myData = response.data;
        return setMyCourse(myData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* 
  const user_email = user?.email; */

  const user_id = user?.id;

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

  function LoadCourse(
    courseID: string,
    name: string,
    price: string,
    category: string,
    level: string,
    createdBy: string,
    content?: any,
    thumb?: string
  ) {
    /* 
    interface Course {
    id: string;
    thumb?: string;
    courseName: string;
    category: string;
    level: string;
    content?: [Module];
    }
    */

    const CourseData = {
      courseID: courseID,
      name: name,
      price: price,
      category: category,
      level: level,
      createBy: createdBy,
    };
    setCourse(course.splice(0, course.length));
    setCourse(course.filter((e) => e));
    return setCourse((course) => [...course, CourseData]);
  }

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
    if (newValue.length === 0) {
      return alert("Não é possível atualizar! Insira o texto");
    }
    todo.filter((e) => e.id === id).map((e: any) => (e[element] = newValue));
    setTodo(todo.filter((e) => e));
  }

  function handleEditModuleName(id: string, newValue: string) {
    allModules
      .filter((e) => e.moduleId === id)
      .map((e: any) => (e.moduleName = newValue));
    setAllModules(allModules.filter((e) => e));
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

  function MainCourseInformations() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [level, setCourseLevel] = useState("");
    const [category, setCategory] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0 15px",
            width: "100%",
            gap: "8px",
          }}
        >
          {course.length > 0 ? (
            <Button
              variant="text"
              color="warning"
              onClick={async () => {
                setCourse((course) => [
                  ...course,
                  {
                    name: name,
                    price: price.toFixed(2).toString(),
                    level: level,
                    category: category,
                  },
                ]);
                // setCourse(course.map((e) => (e.content = allModules)));
                setCourse(course.filter((e) => e));
                console.log(JSON.stringify({ ...course[0] }, null, 2));
              }}
            >
              <SaveIcon /> Salvar Curso
            </Button>
          ) : (
            <Typography variant="h6" textAlign={"center"} color="white">
              Clique no botão abaixo para inserir as informações básicas do
              curso
            </Typography>
          )}
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={handleOpen}
          >
            Criar Novo Curso
          </Button>
        </Box>
        <StyledMainCourseInformation>
          {course.length > 0 ? (
            <>
              <li>
                <Typography> Nome do curso : {name} </Typography>
              </li>
              <li>
                <Typography>
                  Preço:
                  {isNaN(price) ? false : price.toFixed(2)}
                </Typography>
              </li>
              <li>
                <Typography> Dificuldade : {level} </Typography>
              </li>
              <li>
                <Typography> Categoria : {category} </Typography>
              </li>
            </>
          ) : (
            false
          )}
        </StyledMainCourseInformation>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              margin: "120px auto",
              width: 650,
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              background: "#f2f2f2",
              borderBottom: "15px solid green",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h4" textAlign={"center"} color={"black"}>
              Principais Informações do Curso
            </Typography>

            <Typography color={"white"}>
              {course.length > 0
                ? course.map((e) => e.name)
                : "DADOS PARA INICIAR O CURSO"}
            </Typography>

            <>
              <TextField
                required
                id="filled-basic"
                label={"Nome do curso"}
                variant="filled"
                sx={{ background: "white", width: "100%" }}
                onChange={(event) => setName(event.target.value)}
              />

              <TextField
                required
                type="text"
                inputProps={{
                  inputMode: "numeric",
                  // eslint-disable-next-line react/jsx-no-bind
                  pattern: "[0-9]*",
                }}
                id="filled-basic"
                label={"Preço do Curso"}
                variant="filled"
                sx={{ background: "white", width: "100%" }}
                onChange={(event) => {
                  setPrice(+event.target.value);
                }}
              />

              <SelectInfo
                onChange={(event) => setCourseLevel(event.target.value)}
              >
                <option value="">Escolha sua opção</option>
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </SelectInfo>
              <SelectInfo onChange={(event) => setCategory(event.target.value)}>
                <option value="">Escolha sua opção</option>
                <option value="categoria 1">Categoria 1</option>
                <option value="categoria 2">Categoria 2</option>
                <option value="categoria 3">Categoria 3</option>
              </SelectInfo>
            </>

            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                if (isNaN(price)) {
                  alert("Valor inválido");
                }
                LoadCourse(
                  uuidv4(),
                  name,
                  price.toFixed(2).toString(),
                  category,
                  level,
                  user_id
                );
                handleClose();
              }}
            >
              Salvar
            </Button>
            <Button variant="contained" onClick={() => handleClose()}>
              Fechar
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

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
          <span> Editar </span>
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
            <Button onClick={handleClose}>Cancelar</Button>
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

  function ShowItems() {
    return (
      <>
        <ShowAndOrganizeModules>
          <div>
            <h1>Abaixo você pode ver e organizar os elementos do seu módulo</h1>
            <h2> {myCourse.map((e: any) => e.name)} </h2>
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

  //DUAS FUNÇÕES = UMA PARA SALVAR OS DADOS DO MÓDULO E OUTRA PARA SALVAR OS ELEMENTOS DO MÓDULO

  async function SaveModule(id: any) {
    const selectItem = allModules.filter((e) => e.moduleId === id);
    selectItem[0].moduleContent.splice(0, selectItem[0].moduleContent.length);
    selectItem[0].moduleContent.push(...todo);

    const select = { ...selectItem };

    const elementsToSave = select[0].moduleContent.map((e: any) => ({
      element_type: Object.keys(e).filter((e) => e !== "id"),
      element_id: e.id,
      content: Object.keys(e)
        .filter((e) => e !== "id")
        .map((el) => e[el]),
    }));

    const RenderToDatabase = elementsToSave.map((e: any, indexRoot: any) =>
      e.element_type.map((el: any, index: any) => ({
        course_id: idCourse,
        champter_id: id,
        element_type: el,
        element_id: e.element_id,
        content: e.content[index],
        order: indexRoot,
      }))
    );

    const SendElements = RenderToDatabase.flat();

    try {
      await SendElements.map((e: any) =>
        axios
          .post("https://deppback.herokuapp.com/course/champter/element", {
            course_id: e.course_id,
            champter_id: e.champter_id,
            element_id: e.element_id,
            element_type: e.element_type,
            content: e.content,
            order: e.order,
          })
          .then((response) => response.data)
      );
    } catch (err) {
      console.error(err);
    }

    try {
      await axios
        .post("https://deppback.herokuapp.com/champter", {
          course_id: idCourse,
          champter_id: id,
          name: selectItem[0].moduleName,
        })
        .then((response) => response.data);
    } catch (err) {
      console.error(err);
    }
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
        {openControls ? (
          <Button
            color="success"
            sx={{
              width: "100%",
              display: "flex",
              gap: "15px",
              transition: "all 550ms ease ",
              justifyContent: "flex-start",
              borderRadius: "0",
              "&:hover": {
                borderBottom: "solid 1px white",
              },
            }}
            variant={"text"}
            onClick={handleOpen}
          >
            <CreateNewFolderIcon
              sx={{
                fontSize: "36px",
                color: "green",
                animation: "changeColorToWhite 500ms ease both",
              }}
            />
            <Typography
              sx={{
                animation: "fade 1500ms ease both",
                opacity: "0",
                color: "white",
              }}
              variant="body2"
            >
              Criar novo Módulo
            </Typography>
          </Button>
        ) : (
          <Tooltip title="Novo Módulo">
            <Button
              fullWidth
              sx={{
                height: "60px",
                display: "flex",
                flexDirection: "column",
              }}
              color="success"
              onClick={handleOpen}
            >
              <CreateNewFolderIcon sx={{ color: "white", fontSize: "36px" }} />
            </Button>
          </Tooltip>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              margin: "120px auto",
              width: "550px",
              height: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              justifyContent: "center",
              background: "#f2f2f2",
              borderBottom: "15px solid green",
              boxShadow: 24,
              p: 4,
            }}
          >
            <TextField
              id="filled-basic"
              style={{
                padding: "15px",
                minHeight: "30px",
                width: "350px",
                marginBottom: "3px",
              }}
              placeholder="Nome do módulo"
              onChange={(e: any) => setNewModuleName(e.target.value)}
            />
            <Button
              sx={{ width: "320px", marginBottom: "8px" }}
              variant="outlined"
              onClick={() => CloseAndSave()}
              color="success"
            >
              Criar novo módulo
            </Button>
            <Button
              sx={{ width: "320px" }}
              variant="outlined"
              onClick={() => handleClose()}
              color="success"
            >
              Fechar
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  function CreateNewElementMobile() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Tooltip title="Novo Elemento">
          <Button
            onClick={handleOpen}
            fullWidth
            sx={{
              height: "60px",
              display: `${openStyle}`,
              flexDirection: "column",
            }}
            color="success"
          >
            <CreateIcon sx={{ color: "white", fontSize: "36px" }} />
          </Button>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <>
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
              </select>{" "}
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
              {valueState === "video" ? RenderVideoCreate() : false}{" "}
            </>
            <Button onClick={handleClose}>Fechar</Button>
          </Box>
        </Modal>
      </>
    );
  }

  function ManageModulesMobile() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Tooltip title="Gerenciar módulos">
          <Button
            onClick={handleOpen}
            fullWidth
            sx={{
              height: "60px",
              display: `${openStyle}`,
              flexDirection: "column",
            }}
            color="success"
          >
            <AutoAwesomeMotionIcon sx={{ color: "white", fontSize: "36px" }} />
          </Button>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
                                        onClick={() => {
                                          const selectModule = allModules
                                            .filter(
                                              (e) => e.moduleId === moduleId
                                            )
                                            .flat();

                                          selectModule.flatMap((e) =>
                                            e.moduleContent.flat()
                                          ).length > 0
                                            ? setTodo(
                                                selectModule.flatMap((e) =>
                                                  e.moduleContent.flat()
                                                )
                                              )
                                            : DeleteAndUpdate();
                                          setModuleName(
                                            selectModule[0].moduleName
                                          );
                                          console.log(selectModule);
                                        }}
                                      >
                                        Load
                                      </Button>
                                      {ShowEditModalModuleName(moduleId)}
                                      <Button
                                        variant="outlined"
                                        color="warning"
                                        onClick={() =>
                                          handleRemoveModule(moduleId)
                                        }
                                      >
                                        Deletar
                                      </Button>
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
            <Button onClick={handleClose}>Fechar</Button>
          </Box>
        </Modal>
      </>
    );
  }

  function ManageModules() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Tooltip title="Gerenciar módulos">
          <Button
            onClick={handleOpen}
            fullWidth
            sx={{
              height: "60px",
              // display: `${openStyle}`,
              display: `${openStyle4}`,
              gap: "15px",
              justifyContent: "flex-start",
              transition: "all 550ms ease ",
              borderRadius: "0",
              "&:hover": {
                borderBottom: "solid 1px white",
              },
            }}
            color="success"
          >
            <AutoAwesomeMotionIcon
              sx={{
                animation: "changeColorToWhite 500ms ease both",
                color: "green",
                fontSize: "36px",
              }}
            />
            {!openControls && allModules.length > 0 ? (
              false
            ) : (
              <Typography
                variant="body2"
                sx={{
                  animation: "fade 1500ms ease both",
                  opacity: "0",
                  color: "white",
                }}
              >
                Gerenciar Módulos
              </Typography>
            )}
          </Button>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflow: "scroll" }}
        >
          <Box
            sx={{
              margin: "120px auto",
              width: 650,
              minHeight: "150px",

              background: "#f2f2f2",
              borderBottom: "15px solid green",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Accordion sx={{ width: "100%", padding: "0" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ width: "100%" }}
              >
                <Typography> Gerenciar módulos </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  minWidth: "450px",
                  minHeight: "500px",
                  padding: "0 5px",
                }}
              >
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
                                        onClick={() => {
                                          const selectModule = allModules
                                            .filter(
                                              (e) => e.moduleId === moduleId
                                            )
                                            .flat();

                                          selectModule.flatMap((e) =>
                                            e.moduleContent.flat()
                                          ).length > 0
                                            ? setTodo(
                                                selectModule.flatMap((e) =>
                                                  e.moduleContent.flat()
                                                )
                                              )
                                            : DeleteAndUpdate();
                                          setModuleName(
                                            selectModule[0].moduleName
                                          );
                                          console.log(selectModule);
                                        }}
                                      >
                                        Load
                                      </Button>
                                      {ShowEditModalModuleName(moduleId)}
                                      <Button
                                        variant="outlined"
                                        color="warning"
                                        onClick={() =>
                                          handleRemoveModule(moduleId)
                                        }
                                      >
                                        Deletar
                                      </Button>
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
            <Button
              variant="outlined"
              sx={{ width: "585px", marginTop: "15px" }}
              onClick={handleClose}
            >
              Fechar
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  function CreateItemInModule() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Tooltip title="Novo Elemento">
          <Button
            onClick={handleOpen}
            fullWidth
            sx={{
              height: "60px",
              // display: `${openStyle}`,
              display: `${openStyle4}`,
              gap: "15px",
              justifyContent: "flex-start",
              transition: "all 550ms ease ",
              borderRadius: "0",
              "&:hover": {
                borderBottom: "solid 1px white",
              },
            }}
            color="success"
          >
            <CreateIcon sx={{ color: "white", fontSize: "36px" }} />{" "}
            <Typography
              variant="body2"
              sx={{
                animation: "fade 1500ms ease both",
                opacity: "0",
                color: "white",
              }}
            >
              Novo Elemento
            </Typography>
          </Button>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflow: "scroll" }}
        >
          <Box
            sx={{
              margin: "120px auto",
              width: 550,
              background: "#f2f2f2",
              borderBottom: "15px solid green",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
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
              color="success"
              sx={{ width: "340px", marginTop: "25px" }}
              variant="outlined"
              onClick={() => handleClose()}
            >
              Fechar
            </Button>
          </Box>
        </Modal>
        <Tooltip title="Salvar Módulo">
          <Button
            color="warning"
            variant="text"
            sx={{
              height: "60px",
              // display: `${openStyle}`,
              display: `${openStyle3}`,
              gap: "15px",
              transition: "all 550ms ease ",
              borderRadius: "0",
              justifyContent: `${justifyStyle}`,
              "&:hover": {
                borderBottom: "solid 1px white",
              },
            }}
            onClick={() => SaveModule(valueIDSelectModule)}
          >
            <SaveIcon color="warning" sx={{ fontSize: "36px" }} />
            {openControls ? (
              <Typography
                variant="body2"
                sx={{ animation: "fade 1500ms ease both" }}
              >
                Salvar Módulo
              </Typography>
            ) : (
              false
            )}
          </Button>
        </Tooltip>
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
              {MainCourseInformations()}
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
                  //    display: openStyle,
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  alignItems: "center",
                  transition: "all 350ms ease",
                }}
              >
                <ControlsContainer>
                  {NewModule()}
                  {ManageModules()}
                  {ManageModulesMobile()}
                  {CreateNewElementMobile()}
                  {CreateItemInModule()}
                </ControlsContainer>
              </Box>

              <Box sx={{ width: "100%" }}>{openControls ? false : false}</Box>
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
