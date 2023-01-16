import PromptP from "../styled/PromptP";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "../styled/ButtonStyle";
import styled from "styled-components";
import ModalWindow from "../ModalWindow";
import { ModalDiv } from "../styled/ModalStyle";
import {
	GridItem,
	GridPromptOptions,
	ShowPromptDivContainer,
} from "../styled/Grid";
import {
	DragDropContext,
	DropResult,
	Draggable,
	Droppable,
	DroppableProvided,
	DroppableProps,
} from "react-beautiful-dnd";
import { FishYatesShuffle, getColors } from "./SPHelperFunctions";
import {
	TwoDeeArray,
	modalHistory,
	ExtendedDroppableProps,
} from "./SPInterfaces";
import { formatOptions, colorArray } from "./SPOptionsAndColors";
import { copyToClipboard } from "../CopyToClipboardFunc";
import React from "react";

const ShowPrompt = ({ prompt }: any) => {
	const [statePrompt, setStatePrompt] = useState<
		Array<Array<string | number>>
	>([]);
	const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [modalHistory, setModalHistory] = useState<Array<modalHistory>>([]);

	const closeModal = () => setShowModal(false);

	const handleCopyToClipboard = () => {
		const formatString = buildFormatString(statePrompt);
		const addToHistory = [...modalHistory, { positive: formatString }];
		copyToClipboard(formatString);
		setModalHistory(addToHistory);
	};

	const handleFormatChange = (event: any) => {
		//todo: add format change stuff here...

		const newSelectFormat = event.target.value;
		setSelectedFormat(newSelectFormat);

		formatOptions.forEach((option: any) => {
			if (option.value === newSelectFormat) {
				option.enabled = true;
			} else {
				option.enabled = false;
			}
		});
	};

	const buildFormatString = (array: Array<Array<string | number>>) => {
		return (
			array
				.reduce((fStr: string, innerArray: any) => {
					const [el, weight] = innerArray;
					//tiny bit convoluted, check for the format selected and return the correct formatting
					formatOptions.map((option) => {
						if (option.enabled) {
							switch (option.value) {
								case "bracket":
									switch (true) {
										case weight !== 0:
											fStr += `[${el}]:${weight},`;
											break;
										case weight === 0:
											fStr += `${el},`;
											break;
									}
									break;
								case "parenthesis":
									switch (true) {
										case weight !== 0:
											fStr += `(${el}):${weight},`;
											break;
										case weight === 0:
											fStr += `${el},`;
											break;
									}
									break;
								case "standard":
									switch (true) {
										case weight !== 0:
											fStr += `${el}:${weight},`;
											break;
										case weight === 0:
											fStr += `${el},`;
											break;
									}
							}
						}
					});
					return fStr;
				}, "")
				.slice(0, 0 - 1) + "."
		);
	};

	const colors = getColors(colorArray, statePrompt.length);

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

	return (
		//react-dnd-beautiful
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable" direction="horizontal">
					{(provided: DroppableProvided, snapshot) => (
						<ShowPromptDivContainer ref={provided.innerRef}>
							{statePrompt.map((i, ind) => (
								<Draggable
									key={i[0]}
									draggableId={String(i[0])}
									index={ind}
								>
									{(provided, snapshot) => (
										<PromptP
											key={ind}
											saturation={
												Number(i[1]) > 0
													? Number(i[1]) + 50 * 1.5
													: Number(i[1]) + 50 * 0.98
											}
											color={colors[ind]}
											id="PromptP"
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
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ShowPromptDivContainer>
					)}
				</Droppable>
			</DragDropContext>
			<div className="titleSeparator"></div>
			<GridPromptOptions>
				<Button onClick={handleShuffle} width={"100%"}>
					Fuck my shit up
				</Button>
				<form>
					{formatOptions.map((option) => (
						<label key={option.value}>
							<input
								type="radio"
								value={option.value}
								checked={selectedFormat === option.value}
								onChange={handleFormatChange}
							/>
							{option.label}
						</label>
					))}
				</form>
				<Button onClick={() => handleCopyToClipboard()} width={"100%"}>
					Copy to Clipboard
				</Button>
			</GridPromptOptions>
			<div className="titleSeparator"></div>

			<GridItem></GridItem>
			<div className="titleSeparator"></div>
			<ModalDiv>
				<button onClick={() => setShowModal(true)}>History</button>
				{showModal && (
					<ModalWindow
						content={modalHistory}
						closeModal={closeModal}
					/>
				)}
			</ModalDiv>
		</>
	);
};

export default React.memo(ShowPrompt);
