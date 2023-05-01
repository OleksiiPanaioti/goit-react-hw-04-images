import styled from 'styled-components';

export const SearchBar = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  padding-right: 32x;
  padding-left: 32px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #8b90af;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
`;
export const Input = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;

  ::placeholder {
    font: inherit;
    font-size: 20px;
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60px;
  height: 48px;
  border: 0;
  cursor: pointer;
  outline: none;
  :hover {
    background-color: aliceblue;
    color: red;
  }
`;

export const SerchFormBtnLabel = styled.span`
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 12px;
`;
