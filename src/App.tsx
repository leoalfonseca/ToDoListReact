import React, { useState } from "react";
import TodoTask from "./components/TodoTask";
import { useTaskContext } from "./context/TaskContext";
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

  // Use o useTaskContext para acessar o contexto
  const {
    todoList,
    completedTasks,
    selectedFilter,
    addTask,
    setFilter,
  } = useTaskContext();

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

  const handleAddTask = () => {
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

    addTask(task); // Chama a função addTask do contexto

    setTask("");

    // Exibir um toast de sucesso
    toast.success("Tarefa adicionada com sucesso!");
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <AppCard>
          <ToastContainer autoClose={2000} />
          <Header>
            <Title>
              <Strong>ToDo</Strong>List
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
              <Button onClick={handleAddTask}>Adicionar tarefa</Button>
            </Container>
          </Header>

          <Line />

          <FilterButtons>
            <FilterButton
              className={selectedFilter === "all" ? "selected" : ""}
              onClick={() => setFilter("all")} // Chama a função setFilter do contexto
            >
              Todos ({countAllTasks})
            </FilterButton>
            <FilterButton
              className={selectedFilter === "active" ? "selected" : ""}
              onClick={() => setFilter("active")} // Chama a função setFilter do contexto
            >
              Pendentes ({countPendingTasks})
            </FilterButton>
            <FilterButton
              className={selectedFilter === "completed" ? "selected" : ""}
              onClick={() => setFilter("completed")} // Chama a função setFilter do contexto
            >
              Concluídos ({countCompletedTasks})
            </FilterButton>
          </FilterButtons>
          <ScrollableList>
            {filteredTasks.map((task) => (
              <TodoTask
                key={task.id}
                task={task}
              />
            ))}
          </ScrollableList>
        </AppCard>
      </AppContainer>
    </>
  );
}

export default App;
