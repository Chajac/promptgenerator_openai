function matchAndWeight(string: string) {
  if (string === null) {
    return [];
  }
  const reg = /([a-z A-Z À-ÿ0-9'])+/g;
  let match = string.match(reg);
  let addWeight;
  if (match !== null) {
    match?.map((i) => {
      return (addWeight = [i, 0]);
    });
  } else {
    return [];
  }

  return addWeight;
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
      let addWeight: any = matchAndWeight(string);
      let displayString;
      console.log(addWeight);
      // console.log(
      //   matchString?.map((i) => {
      //     return [i, 0];
      //   })
      // );

      /*       if (matchString !== null) {
        for (let i = 0; i < matchString!.length; i++) {
          let subString = matchString![i][0];
          return (displayString = subString);
        }
      } else {
        return [];
      } */
      //Maybe 2D array + weights for showing?
      // console.table(matchweightArr);
      return addWeight;
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
