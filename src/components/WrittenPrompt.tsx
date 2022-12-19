import React, { useEffect, useState } from "react";
import TextField from "./TextField";
import styled from "styled-components";
import { Button } from "./styled/ButtonStyle";
import ToggleButton from "./ToggleButton";

const Div = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

function WrittenPrompt({ getGenPrompt }: any) {
	const [prompt, setPrompt] = useState("");
	const [genprompt, setgenPrompt] = useState<Array<string>>([]);
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = () => {
		console.log(isChecked);
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		getGenPrompt(genprompt);
	}, [genprompt, setgenPrompt, getGenPrompt]);

	return (
		<>
			<Div>
				<TextField
					value={prompt}
					onChange={setPrompt}
					placeholder={
						!isChecked
							? "Describe your prompt"
							: "Set the scene for GPT description"
					}
				/>
				<ToggleButton checked={isChecked} setChecked={handleChange} />
				<Button onClick={() => setgenPrompt([prompt])}>
					<p>Submit</p>
				</Button>
			</Div>
		</>
	);
}

export default WrittenPrompt;
