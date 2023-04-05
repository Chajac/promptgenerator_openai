import styled from "styled-components";

interface Props {
	width?: string;
	background?: string;
	color?: string;
	padding?: string;
}

export const Button = styled.button<Props>`
	//width: 10%;
	width: ${(width: any) => width || "10%"};
	background: ${(props) => props.background || "#f0e8dd"};
	border: none;
	color: ${(props) => props.color || "#000000"};
	cursor: pointer;
	//margin-top: -10px;
	padding: ${(props) => props.padding || "10px 0px 10px 0px"};
`;

export const ButtonModal = styled.button`
	position: fixed;
	top: 0.25rem;
	right: 0.4rem;
	padding: 18.5px 20px;
	background-color: #5c5252;
	color: white;
	border: none;
	border-radius: 2px;
	font-size: 24px;
	cursor: pointer;
`;

export const ButtonModalSettings = styled.button`
	position: fixed;
	top: 0rem;
	right: 4rem;
	padding: 18.5px 13px;
	background-color: #353434;
	color: white;
	border: none;
	border-radius: 2px;
	font-size: 24px;
	cursor: pointer;
`;
