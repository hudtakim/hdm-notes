import { Dispatch, SetStateAction } from "react";

export type noteDataType = {
    id: number;
    title: string;
    category: string;
    text: string;
    date: Date;
} 

export interface noteListInterface{
    data: noteDataType[];
    category_q: string;
    sortby_q: string;
}

export interface noteListEditInterface{
    noteData: noteDataType[];
}

export interface noteListType {
    data: noteDataType;
    selectedId: number;
    setSelectedId: Dispatch<SetStateAction<number>>
}

export type dropdownType = {
    id: number;
    text: string;
}

export interface dropdownInterface {
    data: dropdownType[];
    placeholder: string;
    setValue: Dispatch<SetStateAction<dropdownType>>;
    value: dropdownType;
}

export interface deletePopUpInterface {
    setPopUpDisplay: Dispatch<SetStateAction<boolean>>
}