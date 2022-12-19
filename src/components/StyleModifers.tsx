import React, { useEffect, useState } from "react";
import { DragSingleSelect } from "./MultiSelect";
import styleList from "./StyleList";

let selectOptions: any[] = [];

styleList.forEach((items: any) => {
	selectOptions.push({
		value: items.toLowerCase(),
		label: items,
	});
});

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
			<DragSingleSelect
				options={selectOptions}
				getList={setSelectData}
				placeholder="Style"
			/>
		</div>
	);
}

export default StyleModifiers;
