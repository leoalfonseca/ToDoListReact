import styled from 'styled-components';

export const AppContainer = styled.div`
  padding: 20px 0;
  width: 85%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

export const Header = styled.header`
  background-color: #ffff;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  
`;

export const Title = styled.h2`
  font-weight: 600;
  color: #343a40;
  font-size: 30px;
  margin: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Input = styled.input`
  margin-bottom: 25px;
  width: 50%;
  height: 45px;
  padding-left: 20px;
  border-radius: 5px;
  
  border: 1px solid #343a40;
  &::placeholder {
    font-size: 12px;
    font-weight: 500;
    color: #343a40;
  }
`;

export const Button = styled.button`
  width: 50%;
  height: 45px;
  background-color: #80cb27;
  font-size: 16px;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Line = styled.div`
  border: 1px solid #ccc;
  margin: 25px 0;
`;

export const FilterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;


`;

export const FilterButton = styled.button`
  background-color: #343a40;
  color: #ffff;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 40px;
  width: 100%;
  margin-left: 2px;
  cursor: pointer;
`;