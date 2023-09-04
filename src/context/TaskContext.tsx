import React, { ReactNode, createContext, useContext, useState } from "react";
import { ITask } from "../interfaces";
import { toast } from "react-toastify";

// Definindo a interface para o contexto
interface TaskContextType {
  todoList: ITask[];
  completedTasks: { [key: number]: boolean };
  selectedFilter: "all" | "active" | "completed";
  addTask: (taskName: string) => void;
  deleteTask: (taskId: number) => void;
  toggleComplete: (taskId: number) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
}

// Criando o contexto
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider personalizado para o contexto
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<{ [key: number]: boolean }>({});
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = (taskName: string) => {
    // Lógica para adicionar uma nova tarefa
    const idRandom = Math.floor(Math.random() * 1000);
    const newTask: ITask = { id: idRandom, nameTask: taskName, completed: "false" };
    setTodoList([...todoList, newTask]);
    setCompletedTasks((prevCompletedTasks) => ({
      ...prevCompletedTasks,
      [newTask.id]: false,
    }));
  };

  const deleteTask = (taskId: number) => {
    // Lógica para deletar uma tarefa
    setTodoList(todoList.filter((task) => task.id !== taskId));
    setCompletedTasks((prevCompletedTasks) => {
      const updatedCompletedTasks = { ...prevCompletedTasks };
      delete updatedCompletedTasks[taskId];
      return updatedCompletedTasks;
    });
    toast.error("Tarefa excluída!");

  };

  const toggleComplete = (taskId: number) => {
    // Lógica para marcar/desmarcar como completa
    setCompletedTasks((prevCompletedTasks) => ({
      ...prevCompletedTasks,
      [taskId]: !prevCompletedTasks[taskId],
    }));
  };

  const setFilter = (filter: "all" | "active" | "completed") => {
    // Lógica para definir o filtro
    setSelectedFilter(filter);
  };

  return (
    <TaskContext.Provider
      value={{
        todoList,
        completedTasks,
        selectedFilter,
        addTask,
        deleteTask,
        toggleComplete,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
