import styled from 'styled-components';

export const Card = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  height: 50px;
  padding: 7px 20px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  border-left: 10px solid ${({ completed }) => (completed ? '#80CB27' : '#f1d502')};
  border-radius: 10px;
  margin-top: 20px;

  & + & {
    margin-top: 0; /* Remover a margem superior do segundo e subsequentes */
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Checkbox = styled.input`
  /* Seus estilos do checkbox, se necessário */
`;

export const DeleteButton = styled.span`
  cursor: pointer;
  text-align: center;
  color: #b6b6b7;
  font-size: 14px;
`;

export const TaskText = styled.p`
  font-size: 16px;
  color: #9f9fa8;
  font-weight: 600;
`;

export const Line = styled.div`
  border: 1px solid #ededf2;
  margin: 25px 0 0 0;
`;
