import React, { MouseEventHandler, useEffect } from "react";
import styled from "styled-components";
import Select, {
	MultiValueProps,
	components,
	MultiValueGenericProps,
	Props,
	OnChangeValue,
} from "react-select";
import {
	SortableContainer,
	SortableContainerProps,
	SortableElement,
	SortableHandle,
	SortEndHandler,
} from "react-sortable-hoc";
import { StyledSelect } from "./styled/MultiSelectStyle";
import {} from "./ArtistSelect";

const customStyle = {
	container: (provided: any, state: any) => ({
		...provided,
	}),
	menuList: (provided: any, state: any) => ({
		...provided,
		overflow: "auto",
		backgroundColor: "white",
	}),
	control: (provided: any, state: any) => ({
		...provided,
		border: "0px",
		borderRadius: "0px",
		borderBottom: "2px dashed black",
		backgroundColor: state.selectProps.backgroundColor,
	}),
	valueContainer: (provided: any, state: any) => ({
		...provided,
		color: state.selectProps.menuColor,
		border: "transparent",
		//backgroundColor: state.selectProps.backgroundColor,
		backgroundColor: "white",
		borderRadius: "0px",
	}),
	indicatorSeparator: (provided: any, state: any) => ({
		...provided,
		backgroundColor: "transparent",
	}),
	indicatorContainer: (provided: any, state: any) => ({
		...provided,
	}),

	singleValue: (provided: any, state: any) => {
		const opacity = state.isDisabled ? 1 : 0.5;
		const transition = "opacity 300ms";

		return { ...provided, opacity, transition };
	},
	dropdownIndicator: (provided: any, state: any) => ({
		...provided,
		color: "black",
	}),
	menu: (provided: any, state: any) => ({
		...provided,
		color: "black",
		backgroundColor: state.selectProps.backgroundColor,
	}),
	indicatorsContainer: (provided: any, state: any) => ({
		...provided,
		backgroundColor: "#252525cc",
		border: "none",
	}),
};

interface selectInterface {
	readonly value?: string;
	readonly label?: string;
}

//Rearranging the order
function arrayMove<T>(array: readonly T[], from: number, to: number) {
	const slice = array.slice();
	slice.splice(to < 0 ? array.length + to : to, 0, slice.splice(from, 1)[0]);
	return slice;
}

const SortableMultivalue = SortableElement(
	(props: MultiValueProps<selectInterface>) => {
		//stops menu opening when dragging.
		const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};
		const innerProps = { ...props.innerProps, onMouseDown };
		return <components.MultiValue {...props} innerProps={innerProps} />;
	}
);

const SortableMultiValueLabel = SortableHandle(
	(props: MultiValueGenericProps) => <components.MultiValueLabel {...props} />
);

export const SortableSelect = SortableContainer(Select) as React.ComponentClass<
	Props<selectInterface, true> & SortableContainerProps
>;

// MULTIPLE SELECT //
export function DragMultiSelect({ options, getList, placeholder, width }: any) {
	const [selected, setSelected] = React.useState<readonly selectInterface[]>(
		[]
	);
	useEffect(() => {
		getList(selected);
	}, [selected, setSelected, getList]);

	const onChange = (
		selectedOptions: OnChangeValue<selectInterface, true>
	) => {
		setSelected(selectedOptions);
	};

	const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
		const newValue = arrayMove(selected, oldIndex, newIndex);
		setSelected(newValue);
		// arrangedSelection = selected.map((i) => i.value);
	};

	return (
		<SortableSelect
			//sortable
			classNamePrefix="react-select"
			styles={customStyle}
			// menuColor="red"
			// backgroundColor="#0f0d09"
			onSortEnd={onSortEnd}
			useDragHandle
			axis="xy"
			getHelperDimensions={({ node }) => node.getBoundingClientRect()}
			//select
			isMulti
			placeholder={placeholder}
			options={options}
			value={selected}
			onChange={onChange}
			components={{
				//@ts-ignore
				MultiValue: SortableMultivalue,
				//@ts-ignore
				MultiValueLabel: SortableMultiValueLabel,
			}}
			closeMenuOnSelect={false}
		/>
	);
}

// SINGLE SELECTION //
export function DragSingleSelect({ options, getList, placeholder }: any) {
	const [selected, setSelected] = React.useState<readonly selectInterface[]>(
		[]
	);
	useEffect(() => {
		getList(selected);
	}, [selected, setSelected, getList]);

	const onChange = (
		selectedOptions: OnChangeValue<selectInterface, true>
	) => {
		setSelected(selectedOptions);
	};

	const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
		const newValue = arrayMove(selected, oldIndex, newIndex);
		setSelected(newValue);
		// arrangedSelection = selected.map((i) => i.value);
	};

	return (
		<SortableSelect
			//sortable
			theme={(theme) => ({
				...theme,
				colors: {
					...theme.colors,
					primary25: "violet",
					primary: "orange",
				},
			})}
			onSortEnd={onSortEnd}
			useDragHandle
			axis="xy"
			getHelperDimensions={({ node }) => node.getBoundingClientRect()}
			styles={customStyle}
			// menuColor="red"
			// backgroundColor="#0f0d09"
			//select
			placeholder={placeholder}
			options={options}
			value={selected}
			onChange={onChange}
			components={{
				//@ts-ignore
				MultiValue: SortableMultivalue,
				//@ts-ignore
				MultiValueLabel: SortableMultiValueLabel,
			}}
			closeMenuOnSelect={false}
		/>
	);
}
