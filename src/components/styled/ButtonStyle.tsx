import styled from "styled-components";

interface Props {
	width?: string;
}

export const Button = styled.button<Props>`
	//width: 10%;
	width: ${(width: any) => width || "10%"};
	background: #f0e8dd;
	border: none;
	color: #000000;
	cursor: pointer;
	//margin-top: -10px;
	padding: 10px 0px 10px 0px;
`;
