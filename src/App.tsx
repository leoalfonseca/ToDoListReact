import TodoTask from "./components/TodoTask";
import { ITask } from "./interfaces";
import { useState } from "react";
import {
  AppContainer,
  AppCard,
  ScrollableList,
  Button,
  Container,
  FilterButton,
  FilterButtons,
  Header,
  Input,
  Line,
  Title,
  Strong,
} from "./styles/styles";
import GlobalStyles from "./styles/global";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "active" | "completed"
  >("all");
  const countCompletedTasks = todoList.filter(
    (task) => completedTasks[task.id]
  ).length;
  const countAllTasks = todoList.length;
  const countPendingTasks = countAllTasks - countCompletedTasks;

  const filteredTasks = todoList.filter((task) => {
    if (selectedFilter === "active") {
      return !completedTasks[task.id];
    } else if (selectedFilter === "completed") {
      return completedTasks[task.id];
    }
    return true;
  });

  function addTask(): void {
    if (task.trim() === "") {
      // Exibir um toast de erro
      toast.error("Por favor, insira uma tarefa válida.");
      return;
    }

    if (task.length > 20) {
      // Exibir um toast de erro se a tarefa exceder o limite de 20 caracteres
      toast.error("A tarefa deve ter no máximo 20 caracteres.");
      return;
    }

    const idRandom = (num: number) => Math.floor(Math.random() * num);
    const newTask = { id: idRandom(1000), nameTask: task };

    setTodoList([...todoList, newTask]);

    setCompletedTasks((prevCompletedTasks) => {
      return { ...prevCompletedTasks, [newTask.id]: false };
    });

    setTask("");

    // Exibir um toast de sucesso
    toast.success("Tarefa adicionada com sucesso!");
  }

  function deleteTask(DeleteTaskById: number): void {
    setTodoList(todoList.filter((task) => task.id !== DeleteTaskById));
    setCompletedTasks((prevCompletedTasks) => {
      const updatedCompletedTasks = { ...prevCompletedTasks };
      delete updatedCompletedTasks[DeleteTaskById];
      return updatedCompletedTasks;
    });

    // Exibir um toast de erro
    toast.error("Tarefa excluída!");
  }

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <AppCard>
          <ToastContainer autoClose={2000} />
          <Header>
            <Title>
              <Strong>ToDo</Strong> List
            </Title>
            <Container>
              <Input
                type="text"
                autoComplete="off"
                placeholder="Adicionar tarefa"
                name="task"
                value={task}
                onChange={(event) => setTask(event.target.value)}
              />
              <Button onClick={addTask}>Adicionar tarefa</Button>
            </Container>
          </Header>

          <Line />

          <FilterButtons>
            <FilterButton
              className={selectedFilter === "all" ? "selected" : ""}
              onClick={() => setSelectedFilter("all")}
            >
              Todos ({countAllTasks})
            </FilterButton>
            <FilterButton
              className={selectedFilter === "active" ? "selected" : ""}
              onClick={() => setSelectedFilter("active")}
            >
              Pendentes ({countPendingTasks})
            </FilterButton>
            <FilterButton
              className={selectedFilter === "completed" ? "selected" : ""}
              onClick={() => setSelectedFilter("completed")}
            >
              Concluídos ({countCompletedTasks})
            </FilterButton>
          </FilterButtons>
          <ScrollableList>
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
          </ScrollableList>
        </AppCard>
      </AppContainer>
    </>
  );
}

export default App;
