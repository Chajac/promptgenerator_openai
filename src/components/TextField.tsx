import { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/styled/ButtonStyle";

const Input = styled.textarea`
	width: 700px;
	height: 150px;
	border: 0;
	/* border-bottom: 4px solid blue; */
	outline: 0;
	color: #222222;
	padding: 15px;
	background: #d8d4c7;
	transition: border-color 0.2s;
	text-align: center;
	resize: none;
	position: relative;
	font-size: 2.7rem;
	font-weight: bold;
	overflow: hidden;
	//carat width
	::placeholder {
		color: #333;
	}
	&::before {
		content: "";
		position: absolute;
		left: 15px;
		right: 15px;
		bottom: 0;
		border-bottom: 2px solid #333;
	}
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
