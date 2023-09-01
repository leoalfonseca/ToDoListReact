import React from "react";
import { ITask } from "../interfaces";
import { Card, Actions, Checkbox, DeleteButton, TaskText } from "./styles";

interface TaskProps {
  task: ITask;
  completed: boolean;
  deleteTask: (taskId: number) => void;
  toggleComplete: () => void;
}

function TodoTask({ task, completed, deleteTask, toggleComplete }: TaskProps) {
  return (
    <Card completed={completed}>
      <div>
        <TaskText>{task.nameTask}</TaskText>
      </div>

      <Actions>
        <Checkbox
          type="checkbox"
          checked={completed}
          onChange={toggleComplete}
        />
        {!completed && (
          <DeleteButton
            as="button"
            onClick={() => deleteTask(task.id)}
            disabled={completed}
          >
            X
          </DeleteButton>
        )}
      </Actions>
    </Card>
  );
}

export default TodoTask;
