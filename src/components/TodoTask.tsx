import React from 'react';
import { ITask } from '../interfaces';
import { Card, Actions, Checkbox, DeleteButton, TaskText } from './styles'; // Certifique-se de que o caminho esteja correto

interface TaskProps {
  task: ITask;
  completed: boolean; // Adicionando a propriedade completed
  deleteTask(DeleteTaskById: number): void;
  toggleComplete(): void; // Função para alternar o estado de conclusão
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
        <DeleteButton onClick={() => deleteTask(task.id)}>X</DeleteButton>
      </Actions>
    </Card>
  );
}

export default TodoTask;
