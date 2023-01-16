import React, { useEffect, useState } from "react";
import { DragSingleSelect } from "./MultiSelect";
import styled from "styled-components";
import styleList from "./StyleList";

const Div = styled.div`
	position: relative;
	left: 0;
	top: 0;
`;

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
		<Div>
			<DragSingleSelect
				options={selectOptions}
				getList={setSelectData}
				placeholder="Style"
				width={"300px"}
			/>
		</Div>
	);
}

export default StyleModifiers;
