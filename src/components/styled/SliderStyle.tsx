import styled from "styled-components";

export const Slider = styled.input`
	-webkit-appearance: none;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
	}
	&::-webkit-slider-runnable-track {
		box-sizing: border-box;
		border: none;
		width: 12.5em;
		height: 0.25em;
		background: #e0dcdc;
	}
	&::-moz-range-track {
		box-sizing: border-box;
		border: none;
		width: 12.5em;
		height: 0.25em;
		background: #e0dcdc;
	}
	&::-ms-track {
		box-sizing: border-box;
		border: none;
		width: 12.5em;
		height: 0.25em;
		background: #2c2c2c;
	}
	&::-webkit-slider-thumb {
		margin-top: -0.4em;
		box-sizing: border-box;
		border: none;
		width: 1em;
		height: 1em;
		border-radius: 0%;
		background: #111111;
	}
	&::-moz-range-thumb {
		box-sizing: border-box;
		border: none;
		width: 1.5em;
		height: 1.5em;
		border-radius: 0%;
		background: #111111;
	}
	&::-ms-thumb {
		margin-top: 0;
		box-sizing: border-box;
		border: none;
		width: 1em;
		height: 1em;
		border-radius: 0%;
		background: #111111;
	}
`;
