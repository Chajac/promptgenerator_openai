import PromptP from "./styled/PromptP";
import { Fragment, useEffect, useState } from "react";
import { Button } from "./styled/ButtonStyle";
import styled from "styled-components";
import {
	DragDropContext,
	DropResult,
	Draggable,
	Droppable,
	DroppableProvided,
	DroppableProps,
} from "react-beautiful-dnd";
import React from "react";
import chroma from "chroma-js";

const DivContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

interface ExtendedDroppableProps extends DroppableProps {
	axis: "x" | "y";
}

type TwoDeeArray = Array<Array<string | number>>;

const FishYatesShuffle = (arr: any[]) => {
	const length = arr.length;
	for (let i = length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

const ShowPrompt = ({ prompt }: any) => {
	const [statePrompt, setStatePrompt] = useState<
		Array<Array<string | number>>
	>([]);
	//const [color, setColor] = useState<Array<string>>([]);

	const colorArray = ["#757575", "#3f3f3f", "#1e1e20"];
	const colors = getColors(colorArray, statePrompt.length);

	function getColors(colorArray: Array<string>, length: number) {
		return Array(length)
			.fill(null)
			.map((_, index) => colorArray[index % colorArray.length]);
	}

	//handles rendering the prompt without constantly resetting on prompt updating.
	useEffect(() => {
		//new Array to not overwrite statePrompt when prompt is updated
		const updatedArr: TwoDeeArray = [];
		//Handles initial mount with undefined prompt prop.
		if (prompt === undefined) {
			return;
		} else {
			//loop through prompt and check if the passed elements exist within statePrompt
			for (const passedElement of prompt) {
				const existingElement = statePrompt.find(
					(existingElement) => existingElement[0] === passedElement[0]
				);
				//If element is found use the weight from statePrompt
				if (existingElement) {
					updatedArr.push([passedElement[0], existingElement[1]]);
				} else {
					//If it doesn't exist in statePrompt but does in the passed prompt use the element from passed prompt
					updatedArr.push([passedElement[0], passedElement[1]]);
				}
			}
			setStatePrompt(updatedArr);
		}
	}, [prompt]);

	const handleShuffle = () => {
		const shuffledArray = [...statePrompt];
		FishYatesShuffle(shuffledArray);

		setStatePrompt(shuffledArray);
	};

	function handleClick(
		weightUpDown: string,
		ind: number,
		statePrompt: (string | number)[][]
	) {
		switch (weightUpDown) {
			case "U":
				adjustWeight(statePrompt, ind, 1);
				break;
			case "D":
				adjustWeight(statePrompt, ind, -1);
				break;
		}
	}

	const adjustWeight = (
		oldArray: Array<any>,
		index: number,
		increment: number
	) => {
		//shallow copy array to update array element
		const newArray = [...oldArray];
		newArray[index][1] += increment;
		setStatePrompt(newArray);
	};

	//react-sortable-hoc

	//mouse hover reshuffle handles - reactDnD-Beautiful
	const onDragEnd = (dropResult: DropResult) => {
		if (!dropResult.destination) {
			return;
		}

		const updatedStatePrompt = [...statePrompt];
		const [removed] = updatedStatePrompt.splice(dropResult.source.index, 1);
		updatedStatePrompt.splice(dropResult.destination.index, 0, removed);

		setStatePrompt(updatedStatePrompt);
	};

	function dropAnimationTweak(style: any, snapshot: any) {
		if (!snapshot.isDraggable) {
			return style;
		}

		console.log("yes");
		const { moveTo, curve, duration } = snapshot.dropAnimation;

		const translate = `translate(${moveTo.x}px, 15px)`;

		return {
			...style,
			transform: `${translate}`,
			transitionDuration: `1s`,
		};
	}

	//colour form
	function randomColorRGBA(a: number) {
		// Random Hex {Math.floor(Math.random() * 16777215).toString(16)

		// Random rgba
		const r: any = Math.floor(Math.random() * 256);
		const g: any = Math.floor(Math.random() * 256);
		const b: any = Math.floor(Math.random() * 256);
		const combined: string = `rgba(${r},${g},${b},${a})`;
		return `rgba(${r},${g},${b},${a})`;
	}

	return (
		//react-dnd-beautiful
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable" direction="horizontal">
					{(provided: DroppableProvided, snapshot) => (
						<DivContainer ref={provided.innerRef}>
							{statePrompt.map((i, ind) => (
								<Draggable
									key={i[0]}
									draggableId={String(i[0])}
									index={ind}
								>
									{(provided, snapshot) => (
										<DivContainer>
											<PromptP
												key={ind}
												color={colors[ind]}
												id="PromptP"
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={dropAnimationTweak(
													provided.draggableProps
														.style,
													snapshot
												)}
											>
												<button
													onClick={() =>
														handleClick(
															"U",
															ind,
															statePrompt
														)
													}
												>
													<i className="lni lni-chevron-up"></i>
												</button>
												<div>
													{ind}
													<br />
													{i[0]}
													<br />
													{i[1]}
												</div>
												<button
													onClick={() =>
														handleClick(
															"D",
															ind,
															statePrompt
														)
													}
												>
													<i className="lni lni-chevron-down"></i>
												</button>
											</PromptP>
										</DivContainer>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</DivContainer>
					)}
				</Droppable>
			</DragDropContext>
			<div>
				<button onClick={handleShuffle}>Fuck my shit up</button>
			</div>
		</>
	);

	// 	<>
	// 		{statePrompt.map((i, ind) => (
	// 			<PromptP id="existingPrompt" key={ind}>
	// 				{ind}
	// 				<br />
	// 				{i[0]}
	// 				<br />
	// 				{i[1]}
	// 				<button onClick={() => adjustWeight(statePrompt, ind, 1)}>
	// 					Weight Up
	// 				</button>
	// 			</PromptP>
	// 		))}
	// 		<div>
	// 			<button onClick={handleShuffle}> Fuck my shit up</button>
	// 		</div>
	// 	</>
	// );
};

export default React.memo(ShowPrompt);
