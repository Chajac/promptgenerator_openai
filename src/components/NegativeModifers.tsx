import React, { useEffect, useState } from "react";
import { DragMultiSelect } from "./MultiSelect";

let selectOptions: any[] = [];

const negModifiers: any[] = [
  "jpeg artifacts",
  "blur",
  "bokeh",
  "dof",
  "pixelation",
  "watermark",
  "bokeh noise",
  "noise",
  "low quality",
  "signature",
  "jitter",
];

negModifiers.forEach((items: any) => {
  selectOptions.push({
    value: items.toLowerCase(),
    label: items,
  });
});

function stringData(data: any) {
  let sta: Array<any>[] = [];
  //let string:Array<any> = [data.map((i: any) => i.value).join(", ")];
  if (data.length > 2) {
    return [data.map((i: any) => i.value).join(", ")];
  } else if (data.length > 0) {
    return [data.map((i: any) => i.value)];
  }
  return sta;
}

function NegativeModifers({ getNegMod }: any) {
  const [selectData, setSelectData] = useState<Array<any>>([]);

  useEffect(() => {
    getNegMod(stringData(selectData));
  }, [selectData, setSelectData, getNegMod]);

  return (
    <div>
      <p>{stringData(selectData)}</p>
      <DragMultiSelect options={selectOptions} getList={setSelectData} />
    </div>
  );
}

export default NegativeModifers;
