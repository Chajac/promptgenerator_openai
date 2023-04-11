import React, { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.label`
	display: inline-block;
	position: relative;
	width: 100px;
	height: 150px;
	padding: 15px;
`;

const ToggleInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

const ToggleLabel = styled.span<{ checked: boolean }>`
	position: absolute;
	cursor: pointer;
	inset: 0px;
	background-color: ${() => "#333"};
	transition: background-color 0.4s;

	&:before {
		position: absolute;
		content: "";
		height: 100%;
		width: 50%;
		background-color: white;
		transition: background-color 0.4s, transform 0.4s;
		transform: translateX(${({ checked }) => (checked ? "100%" : "0")});
	}
`;
const ToggleText = styled.span<{ checked: boolean }>`
	position: absolute;
	top: 45%;
	transform: translateY(-50%);
	font-size: 18px;
	color: ${({ checked }) => (checked ? "#c0c0c068" : "black")};
	transition: color 0.4s;
	width: 50%;
	text-align: center;
`;

function ToggleButton({ checked, setChecked }: any) {
	const handleChange = (event: any) => {
		if (event.target.checked === checked) {
			return;
		}
		setChecked(event.target.checked);
	};
	return (
		<ToggleContainer>
			<ToggleInput
				type="checkbox"
				checked={checked}
				onChange={handleChange}
			/>
			<ToggleLabel checked={checked}>
				<ToggleText
					checked={checked}
					style={{ left: "25%", transform: "translateX(-50%)" }}
				>
					Reg
				</ToggleText>
				<ToggleText
					checked={!checked}
					style={{ right: "25%", transform: "translateX(50%)" }}
				>
					AI
				</ToggleText>
			</ToggleLabel>
		</ToggleContainer>
	);
}

export default ToggleButton;
