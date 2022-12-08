import PromptP from "./styled/PromptP";
import { Fragment, useEffect, useState } from "react";
import { Button } from "./styled/ButtonStyle";
import {
	DragDropContext,
	DropResult,
	Draggable,
	Droppable,
	DroppableProvided,
	DroppableProps,
} from "react-beautiful-dnd";

import React from "react";

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
	// What is this component dependent on? Prompt. useCallback() on displayPrompt with dep on prompt?

	const [statePrompt, setStatePrompt] = useState<
		Array<Array<string | number>>
	>([]);

	//Only run on initial render?

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
	const onDrop = (dropResult: DropResult) => {
		if (!dropResult.destination) {
			return;
		}

		const updatedStatePrompt = [...statePrompt];
		const [removed] = updatedStatePrompt.splice(dropResult.source.index, 1);
		updatedStatePrompt.splice(dropResult.destination.index, 0, removed);

		setStatePrompt(updatedStatePrompt);
	};

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
		<DragDropContext onDragEnd={onDrop}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided: DroppableProvided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{statePrompt.map((i, ind) => (
							<Draggable
								key={i[0]}
								draggableId={String(i[0])}
								index={ind}
							>
								{(provided) => (
									<Fragment>
										<PromptP
											key={ind}
											color={randomColorRGBA(1)}
											id="existingPrompt"
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
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
												Weight Up
											</button>
											{ind}
											<br />
											{i[0]}
											<br />
											{i[1]}
											<button
												onClick={() =>
													handleClick(
														"D",
														ind,
														statePrompt
													)
												}
											>
												Weight Down
											</button>
										</PromptP>
									</Fragment>
								)}
							</Draggable>
						))}
						{provided.placeholder}
						<div>
							<button onClick={handleShuffle}>
								Fuck my shit up
							</button>
						</div>
					</div>
				)}
			</Droppable>
		</DragDropContext>
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
