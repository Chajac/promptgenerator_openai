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
    background: #ccc;
  }
  &::-moz-range-track {
    box-sizing: border-box;
    border: none;
    width: 12.5em;
    height: 0.25em;
    background: #ccc;
  }
  &::-ms-track {
    box-sizing: border-box;
    border: none;
    width: 12.5em;
    height: 0.25em;
    background: #ccc;
  }
  &::-webkit-slider-thumb {
    margin-top: -0.625em;
    box-sizing: border-box;
    border: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: #f90;
  }
  &::-moz-range-thumb {
    box-sizing: border-box;
    border: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: #f90;
  }
  &::-ms-thumb {
    margin-top: 0;
    box-sizing: border-box;
    border: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: #f90;
  }
`;
