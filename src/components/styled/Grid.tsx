import styled from "styled-components";

export const GridContainer = styled.div`
	/*   display: flex;
  flex-direction: column; */
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	justify-items: center;
`;
export const InnerGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 2fr);
	position: relative;
	max-width: 45%;
`;

export const PromptTitle = styled.h1`
	grid-column: span 1;

	padding: 16px;
`;

export const VerticalGridSeparator = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 50%;
	border-left: 1px solid black;
`;

export const GridItem = styled.div`
	grid-column: span 1;
	justify-content: center;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&.posMods {
		width: 50%;
	}
`;
