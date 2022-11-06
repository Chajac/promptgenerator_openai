import React, { useEffect, useState } from "react";
import { DragSingleSelect } from "./MultiSelect";

let selectOptions: any[] = [];

const styleModifiers: string[] = [
  "Comic art",
  "Illustration",
  "Drawing",
  "Painting",
  "Matte painting",
  "Master painting",
  "Watercolor",
  "Oil Painting",
  "Renaissance era painting",
  "Mixed Media",
  "Chiaroscuro",
  "Ukiyo-e",
  "Render",
  "Graffiti",
  "2D",
  "3D",
  "Japanese woodblock print",
  "Screenprint",
  "Editiorial Illustration",
  "Cel-shading",
  "Inking",
  "Lineart",
  "Photography",
  "Stained Glass",
  "Lithograph",
  "Etching",
  "Othographic",
];

styleModifiers.forEach((items: any) => {
  selectOptions.push({
    value: items.toLowerCase(),
    label: items,
  });
});

console.log(selectOptions);

function stringData(data: any) {
  // For multiselect
  /*   if (data.length > 0) {
    let string = data.map((i: any) => i.label).join(", ") + " of ";
    return string;
  } else {
    return "";
  } */
  if (Object.keys(data).length > 0) {
    let string = [data.label + " of "];
    //let string = data.map((i: any) => i.label).join(", ") + " of ";
    return string;
  } else {
    return [];
  }
}

function StyleModifiers({ getStyle }: any) {
  const [selectData, setSelectData] = useState<Array<any>>([]);

  useEffect(() => {
    getStyle(stringData(selectData));
  }, [selectData, setSelectData, getStyle]);

  return (
    <div>
      <DragSingleSelect options={selectOptions} getList={setSelectData} />
    </div>
  );
}

export default StyleModifiers;
