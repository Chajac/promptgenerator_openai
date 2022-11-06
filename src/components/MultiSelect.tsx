import React, { MouseEventHandler, useEffect, useCallback } from "react";
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
import {} from "./ArtistData";

const customStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: "0px",
    borderRadius: "0px",
    borderBottom: "4px dashed white",
    backgroundColor: state.selectProps.backgroundColor,
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    color: state.selectProps.menuColor,
    backgroundColor: state.selectProps.backgroundColor,
    borderRadius: "0px;",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "blue",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    color: "white",
    backgroundColor: state.selectProps.backgroundColor,
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.selectProps.backgroundColor,
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

export function DragMultiSelect({ options, getList }: any) {
  const [selected, setSelected] = React.useState<readonly selectInterface[]>(
    []
  );
  useEffect(() => {
    getList(selected);
  }, [selected, setSelected, getList]);

  const onChange = (selectedOptions: OnChangeValue<selectInterface, true>) => {
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
      menuColor="red"
      backgroundColor="transparent"
      onSortEnd={onSortEnd}
      useDragHandle
      axis="xy"
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      //select
      isMulti
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

export function DragSingleSelect({ options, getList }: any) {
  const [selected, setSelected] = React.useState<readonly selectInterface[]>(
    []
  );
  useEffect(() => {
    getList(selected);
  }, [selected, setSelected, getList]);

  const onChange = (selectedOptions: OnChangeValue<selectInterface, true>) => {
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
      onSortEnd={onSortEnd}
      useDragHandle
      axis="xy"
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      //select

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
