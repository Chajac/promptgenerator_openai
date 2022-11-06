import React from "react";
import Select from "react-select";
import styled from "styled-components";

export const StyledSelect = styled(Select)`
  & .Select__indicator Select__dropdown-indicator {
    background: black;
  }
`;
