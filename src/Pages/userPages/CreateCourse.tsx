import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, useParams, useHistory } from "react-router-dom";

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

const APIURL = "https://deppback.herokuapp.com/";

const style = {
  margin: "120px auto",
  width: 350,
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
  width: "250px",
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
  content?: any;
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
  let history = useHistory();

  const openWidthControls = openControls ? "20%" : "5%";
  const openWidthContent = openControls ? "75%" : "85%";
  const changeSideDesktop = openControls ? "75%" : "0";
  const changeSideLargeTablet = openControls ? "65%" : "0";
  const changeSideTablet = openControls ? "55%" : "0";
  const changeSideSmartphone = openControls ? "60%" : "0";

  const [allModules, setAllModules] = useState<Module[]>([]);
  const [todo, setTodo] = useState<ModuleElement[]>([]);

  //const [myCourse, setMyCourse] = useState<any>([]);

  //Course Main Object

  // const [course, setCourse] = useState<any[]>([]);

  //Module states
  const [moduleName, setModuleName] = useState("");
  const [module, setModules] = useState("");
  //const [secModule, setSecModule] = useState("");
  //const [thirdModule, setThirdModule] = useState("");

  const [valueState, setValueState] = useState("");
  const [valueIDSelectModule, setValueIDSelectModule] = useState("0");

  const openStyle = !openControls && allModules.length > 0 ? "flex" : "none";
  const openStyle3 = allModules.length > 0 ? "flex" : "none";
  const openStyle4 = openControls && allModules.length > 0 ? "flex" : "none";

  function GetModules() {
    const [modulesFromDB, setModulesFromDB] = useState<any>([]);
    useEffect(() => {
      axios
        .get(`${APIURL}${idCourse}/champters`)
        .then(function (response) {
          const champtersFromDB = response.data;
          const formatToFrontEnd = champtersFromDB.map((e: any) => ({
            moduleName: e.name,
            moduleId: e.champter_id,
            content: [],
          }));
          setAllModules(formatToFrontEnd);
          setModulesFromDB(formatToFrontEnd);
          return modulesFromDB;
        })
        .catch(function (error) {
          console.error(error);
        });
    }, [modulesFromDB]);
  }

  GetModules();

  function GetElementsFromModule(champterID: any) {
    axios
      .get(`${APIURL}elements/${idCourse}/${champterID}/get`)
      .then(function (response) {
        const ElementsFromDB = response.data;
        const formatToFrontEnd = ElementsFromDB.map((e: any) => ({
          id: e.element_id,
          [e.element_type]: e.content,
          order: e.order,
        }));
        console.log(formatToFrontEnd);
        const formatOrder = formatToFrontEnd.sort(
          (a: any, b: any) => a.order - b.order
        );

        return setTodo(formatOrder);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const justifyStyle = openControls ? "flex-start" : "center";
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }

  /* axios
    .get(`http://localhost:3001/${idCourse}/champters`)
    .then(function (response) {
      const champtersFromDB = response.data;
      return setModulesFromDB(champtersFromDB);
    })
    .catch(function (error) {
      console.error(error);
    }); */

  /* 
  const user_email = user?.email; */

  // const user_id = user?.id;

  // console.log(user_id);

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

  /* function LoadCourse() {
    useEffect(() => {});
  } */

  /*function LoadCourse(
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
  } */

  function genereteId() {
    const newID = uuidv4();
    return newID;
  }

  function genereteId2() {
    const newID = uuidv4();
    return newID.toString();
  }

  /* function DeleteAndUpdate() {
    todo.splice(0, todo.length);
    setTodo(todo.filter((e) => e));
  } */

  function handleRemoveItem(id: string) {
    axios
      .delete(`${APIURL}course/champter/element/delete/${id}`)
      .then((response) => console.log("deletado", response))
      .catch((err) => console.error(err));
    setTodo(todo.filter((e) => e.id !== id));
  }

  function handleRemoveModule(id: string) {
    axios
      .delete(`${APIURL}elements/${id}/delete`)
      .then((response) => console.log("deletado", response))
      .catch((err) => console.error(err));
    axios
      .delete(`${APIURL}champters/${id}/delete`)
      .then((response) => console.log("deletado", response))
      .catch((err) => console.error(err));
    setAllModules(allModules.filter((e) => e.moduleId !== id));
  }

  function handleEditItem(id: string, element: any, newValue: string) {
    if (newValue.length === 0) {
      return alert("Não é possível atualizar! Insira o texto");
    }
    console.log(
      todo.filter((e) => e.id === id).map((e: any) => (e[element] = newValue)),
      todo
    );
    setTodo(todo.filter((e) => e));
  }

  function handleEditModuleName(id: string, newValue: string) {
    allModules
      .filter((e) => e.moduleId === id)
      .map((e: any) => (e.moduleName = newValue));
    setAllModules(allModules.filter((e) => e));
  }

  const addTitle = () => {
    const titleID = genereteId();
    const order = todo.length;
    setTodo((todo) => [
      ...todo,
      {
        id: titleID,
        title: module,
      },
    ]);
    setModules("");
    axios.post(`${APIURL}course/champter/element`, {
      course_id: idCourse,
      content: module,
      element_type: "title",
      element_id: titleID,
      champter_id: valueIDSelectModule,
      order: order,
    });
  };

  const addImage = () => {
    const imageID = genereteId();
    const order = todo.length;
    setTodo((todo) => [
      ...todo,
      {
        id: imageID,
        image: module,
      },
    ]);
    setModules("");
    axios.post(`${APIURL}course/champter/element`, {
      course_id: idCourse,
      content: module,
      element_type: "image",
      element_id: imageID,
      champter_id: valueIDSelectModule,
      order: order,
    });
  };

  const addSubtitle = () => {
    const subTitleID = genereteId();
    const order = todo.length;
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        subTitle: module,
      },
    ]);
    setModules("");
    axios.post(`${APIURL}course/champter/element`, {
      course_id: idCourse,
      content: module,
      element_type: "subTitle",
      element_id: subTitleID,
      champter_id: valueIDSelectModule,
      order: order,
    });
  };

  const addParagraph = () => {
    const paragraphID = genereteId();
    const order = todo.length;

    setTodo((todo) => [
      ...todo,
      {
        id: paragraphID,
        paragraph: module,
      },
    ]);
    setModules(" ");
    axios.post(`${APIURL}course/champter/element`, {
      course_id: idCourse,
      content: module,
      element_type: "paragraph",
      element_id: paragraphID,
      champter_id: valueIDSelectModule,
      order: order,
    });
  };

  const addVideo = () => {
    const videoID = genereteId();
    const order = todo.length;
    setTodo((todo) => [
      ...todo,
      {
        id: genereteId(),
        video: module,
      },
    ]);
    setModules(" ");
    axios.post(`${APIURL}course/champter/element`, {
      course_id: idCourse,
      content: module,
      element_type: "video",
      element_id: videoID,
      champter_id: valueIDSelectModule,
      order: order,
    });
  };

  /*  const addTitleAndSubTitle = () => {
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
  } */

  //Single Elements

  function ShowEditModal(id: string, element: string, index: number) {
    const [open, setOpen] = useState(false);
    const [editValue, setEditValue] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave(newValue: string) {
      handleEditItem(id, element, newValue);
      axios
        .post(`${APIURL}course/champter/element/update`, {
          element_id: id,
          order: index,
          content: newValue,
        })
        .then((response) => response.data);
      console.log(id, element, newValue, index);
      handleClose();
    }

    /* function CloseAndSave(newValue: any) {
      console.log(newValue);
    } */

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
      axios.post(`${APIURL}champters/rename`, {
        champter_id: id,
        name: newValue,
      });
      handleClose();
    }

    return (
      <>
        <Button variant="outlined" onClick={handleOpen}>
          <span> Renomear </span>
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

  function ShowEditParagraph(id: string, element: string, index: number) {
    const [open, setOpen] = useState(false);
    const [editValue, setEditValue] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave(newValue: string) {
      handleEditItem(id, element, newValue);
      axios
        .post(`${APIURL}course/champter/element/update`, {
          element_id: id,
          order: index,
          content: newValue,
        })
        .then((response) => response.data);
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
              Salvar Parágrafos
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

                                    {ShowEditModal(id, "title", index)}
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
                                    {ShowEditModal(id, "subTitle", index)}
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
                                    {ShowEditParagraph(id, "paragraph", index)}
                                  </div>
                                ) : (
                                  false
                                )}
                                {image ? (
                                  <>
                                    <ImgResized src={image} alt="imagem" />
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
                    <NoItemsCard>Sem items adicionados!!!</NoItemsCard>
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

  /* function RenderTitleAndSubCreate() {
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
  } */

  //DUAS FUNÇÕES = UMA PARA SALVAR OS DADOS DO MÓDULO E OUTRA PARA SALVAR OS ELEMENTOS DO MÓDULO

  async function SaveModule(id: any) {
    allModules.map((e) => e.moduleId).toString();

    const elementToUpdateInDatabase = todo.map((e: any, index) => ({
      course_id: idCourse,
      champter_id: id,
      element_type: Object.keys(e)
        .filter((e) => e !== "id" && e !== "order")
        .toString(),
      order: index,
      element_id: e.id,
      content:
        e[
          Object.keys(e)
            .filter((e) => e !== "id" && e !== "order")
            .toString()
        ],
    }));

    console.log(elementToUpdateInDatabase);

    axios.post(`http://localhost:3001/elements/updateorder`, {
      ...elementToUpdateInDatabase,
    });
  }

  function NewModule() {
    const [open, setOpen] = useState(false);
    const [newModuleName, setNewModuleName] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function CloseAndSave() {
      const myID = genereteId2();

      setModuleName(newModuleName);
      setAllModules((allModules) => [
        ...allModules,
        {
          moduleId: myID,
          moduleName: newModuleName,
          moduleContent: [],
        },
      ]);

      axios.post(`${APIURL}champter`, {
        course_id: idCourse,
        champter_id: myID,
        name: newModuleName,
      });

      setValueIDSelectModule(myID);
      console.log(valueIDSelectModule);
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

                <option value="title">Título</option>
                <option value="subtitle">Subtítulo</option>
                <option value="paragraph">Parágrafo</option>
                <option value="image">Imagem</option>
                <option value="video">Vídeo</option>
              </select>
              {valueState === "title" ? RenderTitleCreate() : false}
              {valueState === "paragraph" ? RenderParagraphCreate() : false}
              {valueState === "subtitle" ? RenderSubtitleCreate() : false}
              {valueState === "image" ? RenderImageCreate() : false}
              {valueState === "video" ? RenderVideoCreate() : false}
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

                                          console.log("Chegamos aqui");

                                          setModuleName(
                                            selectModule[0].moduleName
                                          );

                                          /* selectModule.flatMap((e) =>
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
                                          ); */
                                          console.log(selectModule);
                                          GetElementsFromModule(moduleId);
                                        }}
                                      >
                                        Loadsss
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
                                          const selectModule =
                                            allModules.filter(
                                              (e) => e.moduleId === moduleId
                                            );

                                          console.log(
                                            selectModule
                                              .flatMap((e) => e.moduleId)
                                              .toString() === moduleId
                                          );

                                          console.log(selectModule);

                                          setModuleName(
                                            selectModule[0].moduleName
                                          );

                                          setValueIDSelectModule(
                                            selectModule[0].moduleId
                                          );

                                          /* selectModule.flatMap((e) =>
                                            e.moduleContent.flat()
                                          ).length > 0
                                            ? setTodo(
                                                selectModule.flatMap((e) =>
                                                  e.moduleContent.flat()
                                                )
                                              )
                                            : console.log("errrr");
                                          setModuleName(
                                            selectModule[0].moduleName
                                          ); */

                                          GetElementsFromModule(moduleId);
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

              <option value="title">Título</option>
              <option value="subtitle">Subtítulo</option>
              <option value="paragraph">Parágrafo</option>
              <option value="image">Imagem</option>
              <option value="video">Vídeo</option>
            </select>
            {valueState === "title" ? RenderTitleCreate() : false}

            {valueState === "paragraph" ? RenderParagraphCreate() : false}
            {valueState === "subtitle" ? RenderSubtitleCreate() : false}

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
            <Button onClick={() => history.push(`/viewcourse/${idCourse}`)}>
              Ver Curso
            </Button>
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
