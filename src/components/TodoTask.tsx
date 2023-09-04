import React from "react";
import { ITask } from "../interfaces";
import { Card, Actions, Checkbox, DeleteButton, TaskText } from "./styles";
import { useTaskContext } from "../context/TaskContext";

interface TaskProps {
  task: ITask;
}

function TodoTask({ task }: TaskProps) {
  const {
    deleteTask,
    toggleComplete,
    completedTasks,
  } = useTaskContext();

  const isCompleted = completedTasks[task.id] || false;

  return (
    <Card completed={isCompleted}>
      <div>
        <TaskText>{task.nameTask}</TaskText>
      </div>

      <Actions>
        <Checkbox
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleComplete(task.id)}
        />
        {!isCompleted && (
          <DeleteButton
            as="button"
            onClick={() => deleteTask(task.id)}
            disabled={isCompleted}
          >
            X
          </DeleteButton>
        )}
      </Actions>
    </Card>
  );
}

export default TodoTask;
