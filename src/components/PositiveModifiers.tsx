import React, { useEffect, useState } from "react";
import { DragMultiSelect } from "./MultiSelect";

let selectOptions: any[] = [];

const negModifiers: any[] = [
  "4k",
  "8k",
  "Trending on Deviant Art",
  "Trending on CGSociety",
  "Trending on Artstation",
  "Anime",
  "Manga",
  "Comic book panel",
  "Poster",
  "Wallpaper",
  "Octane",
  "Render",
  "Realisitic",
  "Wide angle",
  "Vertical Wallpaper",
  "Inked",
  "Concept art",
  "Ultrafine",
  "Hyperdetail",
  "Global illumination",
  "Precise",
  "Heavy Metal comics",
  "Scifi",
  "Bold lines",
  "Pencil",
  "Intricate detail",
  "Detailed line art",
  "Cinematic",
  "Cinematic atmosphere",
  "Top view",
  "Cyberpunk",
  "Retrofuture",
  "Retropunk",
];

negModifiers.forEach((items: any) => {
  selectOptions.push({
    value: items.toLowerCase(),
    label: items,
  });
});

function stringData(data: any) {
  let sta: Array<string>[] = [];
  if (data.length > 2) {
    return [data.map((i: any) => i.value).join(", ")];
  } else if (data.length > 0) {
    return [data.map((i: any) => i.value)];
  }
  return sta;
}

function PositiveModifers({ getPosMod }: any) {
  const [selectData, setSelectData] = useState<Array<any>>([]);

  useEffect(() => {
    getPosMod(stringData(selectData));
  }, [selectData, setSelectData, getPosMod]);

  return (
    <div>
      <p>{stringData(selectData)}</p>
      <DragMultiSelect options={selectOptions} getList={setSelectData} />
    </div>
  );
}

export default PositiveModifers;
