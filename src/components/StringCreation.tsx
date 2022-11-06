function regexFind(string: string) {
  if (string === null) {
    return;
  }
  const reg = /([a-z A-Z À-ÿ0-9'])+/g;
  const match = string.match(reg);
  return match;
}
function arrayWeight(arr: Array<any>) {
  if (arr !== null) {
    arr.forEach((i) => {
      return [i, 0];
    });
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      for (let o = 0; o < arr[i].length; o++) {
        console.log(arr[i][o]);
      }
    }
    return;
  }
}

function createPrompt(
  style: string | null,
  aiPrompt: string | null,
  artists: string | null,
  posmod: string | null,
  negmod: string | null
  // promptWeight?: number | string,
  // posmodWeight?: number | string,
  // negmodWeight?: number | string
) {
  let finalArray: Array<string | null> = [
    style,
    aiPrompt,
    artists,
    posmod,
    negmod,
  ];

  // let finalString: string | undefined | null;
  //bit of a messy string concat for Disco-Diffusion prompt weighting. / works for Stable-diffusion too.
  // to do: take away prompts, add regex then do weights from that.
  switch (aiPrompt) {
    case null:
      return;
    default:
      // console.table(finalArray);
      let string = finalArray.filter((item) => item!.length !== 0).join(",");
      let matchString = regexFind(string);
      // if (testArray !== null || undefined) {
      //   for (let i = 0; i < testArray.length; i++) {
      //     console.log(testArray[i]);
      //     for (let o = 0; o < testArray[i].length; o++) {
      //       console.log(testArray[i][o]);
      //     }
      //   }
      // }
      let displayString;
      if (matchString !== null) {
        displayString = matchString?.join(",");
      }
      //Maybe 2D array + weights for showing?
      // console.table(matchweightArr);
      return displayString;
    // return finalArray.filter((item) => item!.length !== 0).join(",");
  }
}
/*   //Artists & positive modifiers dont exist
      if ((finalArray[3]?.length && finalArray[4]?.length) === 0 || undefined) {
        //finalString = finalArray.slice(0, finalArray.length - 2).join("");
        finalString = finalArray[0] + "," + finalArray[1];
      }
      // Artists exist but positive modifiers dont
      if (finalArray[3]!.length > 0 && finalArray[4]?.length === 0) {
        finalString =
          finalArray.slice(0, finalArray.length - 2).join("") + finalArray[3];
      }
      // Artists dont exist but positive modifiers do
      if (finalArray[3]?.length === 0 && finalArray[4]!.length > 0) {
        finalString =
          finalArray.slice(0, finalArray.length - 2).join("") + finalArray[4];
      }
      // Aritsts exist and so do positive modifers
      if (finalArray[3]!.length > 1 && finalArray[4]!.length > 0) {
        finalString =
          finalArray.slice(0, finalArray.length - 2).join("") +
          finalArray[3] +
          finalArray[4];
      } 
/*   return finalString;
} */

//this one adds weighting
/*   switch (aiPrompt) {
    case "No prompt":
      return (finalString = "");
    default:
      if ((finalArray[3]?.length && finalArray[4]?.length) === 0 || undefined) {
        finalString =
          '"' +
          finalArray.slice(0, finalArray.length - 2).join("") +
          `:${promptWeight}"`;
      }
      if (finalArray[3]!.length > 0 && finalArray[4]?.length === 0) {
        finalString =
          '"' +
          finalArray.slice(0, finalArray.length - 2).join("") +
          `:${promptWeight}", "` +
          finalArray[3] +
          `:${posmodWeight}"`;
      }
      if (finalArray[3]?.length === 0 && finalArray[4]!.length > 0) {
        finalString =
          '"' +
          finalArray.slice(0, finalArray.length - 2).join("") +
          `:${promptWeight}", "` +
          finalArray[4] +
          `:${negmodWeight}"`;
      }
      if (finalArray[3]!.length > 1 && finalArray[4]!.length > 0) {
        finalString =
          '"' +
          finalArray.slice(0, finalArray.length - 2).join("") +
          `:${promptWeight}", "` +
          finalArray[3] +
          `:${posmodWeight}", "` +
          finalArray[4] +
          `:${negmodWeight}".`;
      }
      return finalString;
  }
}
 */
export default createPrompt;
