import { useEffect, useState } from "react";
import styled from "styled-components";

function randomColorRGBA(a: number) {
	// Random Hex {Math.floor(Math.random() * 16777215).toString(16)

	// Random rgba
	const r: any = Math.floor(Math.random() * 256);
	const g: any = Math.floor(Math.random() * 256);
	const b: any = Math.floor(Math.random() * 256);
	const combined: string = `rgba(${r},${g},${b},${a})`;
	//return `rgba(${r},${g},${b},${a})`;
}
// need anonymous function to call for every value otherwise it will only set and render one value

// const PromptP = styled.p`
//   display: inline-block;
//   text-align: center;
//   line-height: 1.5em;
//   font-size: 1em;
//   font-weight: bold;
//   margin: 0.25em;
//   padding: 0.25em 0.75em 0.25em 0.75em;
//   &:hover {
//     background-color: ${() => randomColorRGBA(1)};
//   }
// `;
const PromptP = styled.p`
	display: inline-block;
	text-align: center;
	line-height: 1.5em;
	font-size: 1em;
	font-weight: bold;
	margin: 0.25em;
	padding: 0.25em 0.75em 0.25em 0.75em;
	&:hover {
		background-color: ${(props: { color: string }) => props.color};
		filter: saturate(500%);
	}
`;

// const PromptP = () => {
// 	const [colour, setColour] = useState("");

// 	const randomColorRGBA = (a: number) => {
// 		// Random Hex {Math.floor(Math.random() * 16777215).toString(16)

// 		// Random rgba
// 		const r: any = Math.floor(Math.random() * 256);
// 		const g: any = Math.floor(Math.random() * 256);
// 		const b: any = Math.floor(Math.random() * 256);
// 		const combined: string = `rgba(${r},${g},${b},${a})`;
// 		setColour(combined);
// 		//return `rgba(${r},${g},${b},${a})`;
// 	};

// 	useEffect(() => {
// 		randomColorRGBA(1);
// 	}, []);

// 	return <StyledDiv color={colour} />;
// };

export default PromptP;
