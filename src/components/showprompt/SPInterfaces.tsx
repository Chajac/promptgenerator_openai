import { DroppableProps } from "react-beautiful-dnd";

export interface ExtendedDroppableProps extends DroppableProps {
	axis: "x" | "y";
}
export type TwoDeeArray = Array<Array<string | number>>;

export interface formatTypes {
	label: string;
	value: string;
	enabled: boolean;
}
export interface modalHistory {
	positive: string;
	negative?: string;
}
