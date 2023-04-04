import styled from "styled-components";

export const ModalDiv = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1;
`;

export const ModalOverlay = styled.div`
	position: fixed;
	bottom: 20px;
	width: 20%;
	right: 20px;
	z-index: 1;
	background-color: white;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const ListDiv = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

export const ModalP = styled.p`
	font-size: 0.8rem;
`;

export const ModalList = styled.li`
	font-size: 0.8rem;
`;
