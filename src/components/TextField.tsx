import { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/styled/ButtonStyle";

const Input = styled.textarea`
  width: 500px;
  height: 50px;
  border: 0;
  border-bottom: 4px solid blue;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  padding: 15px;
  background: black;
  transition: border-color 0.2s;
  text-align: center;
  resize: none;
  position: relative;
`;

interface iProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClick?: (e: Event) => void;
}
const TextField = ({ value, onChange, placeholder, onClick }: iProps) => {
  return (
    <>
      <Input
        id="prompt-input"
        wrap="hard"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        placeholder={placeholder}
      />
      {/*       <Button onClick={() => onClick}>Generate</Button> */}
    </>
  );
};

export default TextField;
