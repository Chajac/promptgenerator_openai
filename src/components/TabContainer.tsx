import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Div = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 500px;
    height: 300px;
    background: #f1f1f1;
    margin: 100px auto 0;
    word-break: break-all;
    border: 1px solid rgba(0, 0, 0, 0.274);
  }
  .TabContainer {
    display: flex;
  }
  .tab {
    padding: 15px;
    text-align: center;
    width: 50%;
    background: rgba(128, 128, 128, 0.075);
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 0, 0, 0.274);
    box-sizing: content-box;
    position: relative;
    outline: none;
  }
  .tab:not(:last-child) {
    border-right: 1px solid rgba(211, 13, 13, 0.274);
  }
  .active-tab {
    background: #5700c9;
    border-bottom: 1px solid transparent;
  }
  .active-tab::before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    background: rgb(88, 147, 241);
  }
  .content-tabs {
    flex-grow: 1;
  }
  .content {
    background: #000000;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }
  .active-content {
    display: block;
  }
`;

function TabContainer(props: any) {
  const [active, setActive] = useState(1);

  const handleChange = (e: number) => {
    setActive(e);
  };

  return (
    <Div className="container">
      <Div className="TabContainer">
        <Div
          className={active === 1 ? "tab active-tab" : "tab"}
          onClick={() => handleChange(1)}
        >
          <h1>{props.tabTitle1}</h1>
        </Div>
        <Div
          className={active === 2 ? "tab active-tab" : "tab"}
          onClick={() => handleChange(2)}
        >
          <h1>{props.tabTitle2}</h1>
        </Div>
        <Div
          className={active === 3 ? "tab active-tab" : "tab"}
          onClick={() => handleChange(3)}
        >
          <h1>{props.tabTitle3}</h1>
        </Div>
      </Div>

      <Div className="content-tabs">
        <Div
          className={active === 1 ? "content active-content" : "content"}
          onClick={() => handleChange(1)}
        >
          {props.textGen}
        </Div>
        <Div
          className={active === 2 ? "content active-content" : "content"}
          onClick={() => handleChange(2)}
        >
          {props.aiGen}
        </Div>
        <Div
          className={active === 3 ? "content active-content" : "content"}
          onClick={() => handleChange(3)}
        >
          {props.aiSettings}
        </Div>
      </Div>
    </Div>
  );
}

export default TabContainer;
