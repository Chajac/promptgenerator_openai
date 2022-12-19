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
		/* 	filter: saturate(500%); */
		font-weight: bolder;

		//Marker style highlight -- doesn't work with random colors right now.
		/* 		background: linear-gradient(
				104deg,
				rgba(130, 255, 173, 0) 0.9%,
				rgba(130, 255, 173, 1.25) 2.4%,
				rgba(130, 255, 173, 0.5) 5.8%,
				rgba(130, 255, 173, 0.1) 93%,
				rgba(130, 255, 173, 0.7) 96%,
				rgba(130, 255, 1732, 0) 98%
			),
			linear-gradient(
				183deg,
				rgba(130, 255, 173, 0) 0%,
				rgba(130, 255, 173, 0.3) 7.9%,
				rgba(130, 255, 173, 0) 15%
			);
		padding: 0.6em 13.7px;
		-webkit-box-decoration-break: clone;
		margin: 0;
		border-radius: 7.5px;
		text-shadow: -12px 12px 9.8px rgba(130, 255, 173, 0.7),
			21px -18.1px 7.3px rgba(255, 255, 255, 1),
			-18.1px -27.3px 30px rgba(255, 255, 255, 1); */
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
