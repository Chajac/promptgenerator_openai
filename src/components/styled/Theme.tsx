import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {

        background-color: #ffffff;
        color: #0e0e0e;
}
h1{
        &.blackletter{
                font-family: 'UnifrakturMaguntia', cursive;
                font-size:7rem;
        }
}
div{
        font-family: 'Martian Mono', monospace;
 .t1{
         font-size:24px;
         margin: 0 10px;
 }
 .titleSeparator {
  position: relative;
  height: 1px;
  background-color: black;
  margin: 0 auto;
  width: 50%;

 }
 .separatorText{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  background-color: white;
  padding: 0 2em;
}
       
}
p {
        font-size:24px;

        &.submit{
                font-weight:bold;
        }
}
`;

export default GlobalStyle;
