import styled from "styled-components";

interface iDiv extends React.CSSProperties {
  backgroundColor?: string;
  background?: string;
  flex?: string;
  margin?: string;
  height?: string;
  padding?: string;
}

export const Flex = styled.div<iDiv>`
  background-color: ${(props) => props.backgroundColor};
  background: ${(props) => props.background};
  flex: ${(props) => props.flex || "100%"};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height || "45rem"};
  padding: ${(props) => props.padding};
`;
