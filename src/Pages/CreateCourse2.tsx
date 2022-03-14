import { useState } from "react";
import { styled } from "@mui/material/styles";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import "./styles/CreateCourse.css";

const ContainerRegisterNewModule = styled("div")(({ theme }) => ({
  paddingTop: "120px",
  minHeight: 350,
  background: "#CCC ",
}));

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle,
});

export function CreateCourse() {
  const [todo, setTodo] = useState([{ id: "0", title: "", paragraph: "" }]);

  const [module, setModules] = useState("");

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
      { id: todo.length.toString(), title: module, paragraph: "" },
    ]);
    setModules("");
    console.log(todo);
  };

  const addParagraph = () => {
    setTodo((todo) => [
      ...todo,
      { id: todo.length.toString(), title: "", paragraph: module },
    ]);
    setModules("");
    console.log(todo);
  };

  return (
    <>
      <h1>Drag and Drop</h1>

      <ContainerRegisterNewModule>
        <input
          type="text"
          onChange={(event) => setModules(event.target.value)}
        />
        <button onClick={addTitle}>Salvar Título</button>
        <input
          type="text"
          onChange={(event) => setModules(event.target.value)}
        />
        <button onClick={addParagraph}>Salvar Paragrafo</button>

        <button onClick={() => console.log(todo)}>
          Ver elementos do Curso
        </button>
      </ContainerRegisterNewModule>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todo.length > 1
                ? todo.map(({ id, title, paragraph }, index) => {
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
                            {paragraph.length > 0 ? <p>{paragraph} </p> : false}
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                : "não temos itens"}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
