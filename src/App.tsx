import TodoTask from "./components/TodoTask";
import { ITask } from "./interfaces";
import { useState } from "react";
import { AppContainer, Button, Container, FilterButton, FilterButtons, Header, Input, Line, Title } from "./styles/styles";
import GlobalStyles from './styles/global';

function App() {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<{ [key: number]: boolean }>({});
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTasks = todoList.filter((task) => {
    if (filter === "active") {
      return !completedTasks[task.id];
    } else if (filter === "completed") {
      return completedTasks[task.id];
    }
    return true;
  });

  function addTask(): void {
    const idRandom = (num: number) => Math.floor(Math.random() * num);
    const newTask = { id: idRandom(1000), nameTask: task };

    setTodoList([...todoList, newTask]);

    setCompletedTasks((prevCompletedTasks) => {
      return { ...prevCompletedTasks, [newTask.id]: false };
    });

    setTask("");
  }

  function deleteTask(DeleteTaskById: number): void {
    setTodoList(todoList.filter((task) => task.id !== DeleteTaskById));
    setCompletedTasks((prevCompletedTasks) => {
      const updatedCompletedTasks = { ...prevCompletedTasks };
      delete updatedCompletedTasks[DeleteTaskById];
      return updatedCompletedTasks;
    });
  }

  return (
  <>
  <GlobalStyles/>
    <AppContainer>
      <Header>
        <Title>To Do List</Title>
        <Container>
          <Input
            type="text"
            autoComplete="off"
            placeholder="Adicionar a task"
            name="task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
          <Button onClick={addTask}>Adicionar Task</Button>
        </Container>
      </Header>

      <Line />

      <FilterButtons>
        <FilterButton onClick={() => setFilter("all")}>Mostrar Todos</FilterButton>
        <FilterButton onClick={() => setFilter("active")}>Mostrar Pendentes</FilterButton>
        <FilterButton onClick={() => setFilter("completed")}>Mostrar Concluídos</FilterButton>
      </FilterButtons>

      {filteredTasks.map((task) => (
        <TodoTask
          key={task.id}
          task={task}
          completed={completedTasks[task.id] || false}
          deleteTask={deleteTask}
          toggleComplete={() =>
            setCompletedTasks((prevCompletedTasks) => ({
              ...prevCompletedTasks,
              [task.id]: !prevCompletedTasks[task.id],
            }))
          }
        />
      ))}
    </AppContainer>
  </>
  );
}

export default App;
