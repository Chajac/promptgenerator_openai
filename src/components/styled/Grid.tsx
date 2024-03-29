import styled from "styled-components";

interface Props {
	width?: string;
}

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);

	.Title {
		display: grid;
		justify-items: center;
	}
`;

export const PromptInput = styled.h1`
	display: grid;
	justify-items: center;
	padding: 16px;
`;
export const TwoColGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	left: 25%;
	width: 50%;
	//needed for vert separator
	position: relative;
	justify-items: center;
`;

export const VerticalSeparator = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 50%;
	border-left: 1px solid black;
`;

export const GridItem = styled.div`
	display: grid;
	grid-template-rows: 2fr, 2fr;
	padding: 20px;
	justify-items: center;

	&.posMods {
		.posContainer {
			display: grid;
			grid-template-rows: 2fr, 2fr;
			justify-items: center;
			max-width: 40%;

			.posModT {
			}
		}
	}
	.finalPrompt {
		max-width: 50%;
	}
	&.showPromptOptions {
		grid-template-columns: auto(3, 1fr);
	}
`;

export const GridPromptOptionsContainer = styled.div<Props>`
	//position: relative;
	width: ${(width: any) => width || "50%"};
`;

export const GridPromptOptions = styled.div<Props>`
	position: relative;
	left: 25%;
	justify-content: center;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	width: 50%;
`;

//for ShowPrompt
export const ShowPromptDivContainer = styled.div`
	/* 	display: flex;
	flex-direction: row; */

	display: grid;
	//grid-auto-flow: column;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: auto(3, 1fr);
	width: 50%;
	justify-self: center;
`;
