import createPrompt from "./StringCreation";
import PromptP from "./styled/PromptP";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

function ShowPrompt({
  // getStyle,
  // genprompt,
  // getArtists,
  // getPosMod,
  // getNegMod,
  prompt,
}: any) {
  // What is this component dependent on? Prompt. useCallback() on displayPrompt with dep on prompt?

  const [statePrompt, setStatePrompt] = useState(prompt);

  const adjustWeightT = useCallback(
    (tdArray: Array<any>, index: number, increment: number) => {
      tdArray.forEach((val, ind) => {
        if (ind === index) {
          console.log(
            "val: " + val + " ind: " + ind + "Check? " + tdArray[ind][1]
          );
          return setStatePrompt((tdArray[ind][1] += increment));
        }
      });
    },
    []
  );

  const displayPrompt = useCallback(
    (arr: Array<any>) => {
      return arr?.map((i: string, ind: number) => {
        console.log(`Ind:${ind} & ele:${i}`);
        return (
          <PromptP key={ind}>
            {ind}
            <br />
            {i[0]}
            <br />
            {i[1]}
            <button onClick={() => adjustWeightT(prompt, ind, 1)}>
              Weight Up
            </button>
          </PromptP>
        );
      });
    },
    [prompt, adjustWeightT]
  );

  function adjustWeight(tdArray: Array<any>, index: number, increment: number) {
    // tdArray.find((el, ind) => {
    //   if (ind === index) {
    //     console.log(
    //       "matched index:" + index + " with " + el[0] + " weight of:" + el[1]
    //     );
    //     return (el[1] += increment);
    //   }
    //   return el;
    // });
    tdArray.forEach((val, ind) => {
      if (ind === index) {
        console.log(
          "val: " + val + " ind: " + ind + "Check? " + tdArray[ind][1]
        );
        return (tdArray[ind][1] += increment);
      }
    });
  }

  //useEffect(() => {}, [displayPrompt]);

  return <Fragment>{displayPrompt(prompt)}</Fragment>;

  // return prompt?.map((i: string, ind: number) => {
  //   console.log(`Ind:${ind} & ele:${i}`);

  //   return (
  //     <>
  //       <PromptP>
  //         {ind}
  //         <br />
  //         {i[0]}
  //         <br />
  //         {i[1]}
  //         <button
  //           onClick={() => {
  //             adjustWeight(prompt, ind, 1);
  //           }}
  //         >
  //           Weight Up
  //         </button>
  //       </PromptP>
  //     </>
  //   );
  // });
}

export default ShowPrompt;
