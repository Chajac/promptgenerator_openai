import React from "react";
import styled from "styled-components";
import { Slider } from "./styled/SliderStyle";

interface iProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange: (val: number) => void;
  placeholder?: string;
}

const RangeSlider = ({ value, onChange, min, max, step }: iProps) => {
  return (
    <Slider
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(e.target.valueAsNumber)}
    />
  );
};

/* function RangeSlider({ value, onChange, min, max, step }: iProps) {
  return (
    <input
      className="slider"
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(e.target.valueAsNumber)}
    />
  );
} */

export default RangeSlider;
