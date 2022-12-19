import { useEffect, useState } from "react";
import { DragMultiSelect } from "./MultiSelect";
import { artistList } from "./ArtistList";

export const selectOptions: any[] = [];

(function () {
	for (const categories in artistList) {
		for (let names in artistList[categories]) {
			selectOptions.push({
				value: artistList[categories][names].toLowerCase(),
				label: artistList[categories][names],
			});
		}
	}
	return;
})();

function stringData(data: any) {
	//multiple artist concat.
	let artistsString: string[] = [
		// Additional "By" per artist
		data.map((i: any) => i.label),
		// "By " + data.map((i: any) => i.label).join(",By "),

		// Concat that adds "and" before the final artist -- Disco Diffusion preferred
		// " By " +
		//   data
		//     .map((i: any) => i.label)
		//     .splice(0, data.length - 1)
		//     .join(", ") +
		//   " and " +
		//   data.slice(-1).map((i: any) => i.label),
	];
	//set if no artists
	if (data.length === 0) {
		return (artistsString = []);
		//If only one artist
	} else if (data.length === 1) {
		return [" By " + data.map((i: any) => i.label)];
	}
	return artistsString;
}

function ArtistSelect({ getArtists }: any) {
	const [selectData, setSelectData] = useState<Array<string>>([]);
	useEffect(() => {
		getArtists(stringData(selectData));
	}, [selectData, setSelectData, getArtists]);
	//console.log("select data " + selectData);

	return (
		<div>
			{/* 			<p>{stringData(selectData)}</p> */}
			<DragMultiSelect
				options={selectOptions}
				getList={setSelectData}
				placeholder={"Artists"}
			/>
		</div>
	);
}

export default ArtistSelect;
