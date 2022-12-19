import React, { useEffect, useState } from "react";
import { DragMultiSelect } from "./MultiSelect";
import { posModifiers } from "./PostiveModList";

let selectOptions: any[] = [];

posModifiers.forEach((items: any) => {
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
			<DragMultiSelect
				options={selectOptions}
				getList={setSelectData}
				placeholder={"Positive Modifiers"}
			/>
		</div>
	);
}

export default PositiveModifers;
