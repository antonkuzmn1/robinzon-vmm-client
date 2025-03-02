import React, {useCallback, useEffect, useReducer, useState} from "react";
import {AppDispatch} from "../../utils/store.ts";
import {useDispatch} from "react-redux";
import {setAppError} from "../../slices/appSlice.ts";
import {api} from "../../utils/api.ts";
import Table from "../components/Table.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

interface Item {
    Cores: number;
    Name: string;
    PSComputerName: string;
    PSShowComputerName: boolean;
    "RAM (GB)": number;
    RunspaceId: string;
    Status: string;
    Uptime: string;
}

interface State {
    items: Item[];
}

type Action =
    | { type: 'SET_ITEMS', payload: Item[] }

const initialState: State = {
    items: [],
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload,
            }
        default:
            return state;
    }
}

type TypeField = 'String' | 'Integer' | 'Boolean' | 'Date';

interface TableHeaders {
    text: string,
    field: keyof Item,
    width: string,
    type: TypeField,
}

const tableHeaders: TableHeaders[] = [
    {text: 'Cores', field: 'Cores', width: '100px', type: 'Integer'},
    {text: 'Name', field: 'Name', width: '200px', type: 'String'},
    {text: 'PSComputerName', field: 'PSComputerName', width: '200px', type: 'String'},
    {text: 'RAM (GB)', field: 'RAM (GB)', width: '100px', type: 'Integer'},
    {text: 'Status', field: 'Status', width: '150px', type: 'String'},
    {text: 'Uptime', field: 'Uptime', width: '150px', type: 'String'},
]

const PageVm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [state, localDispatch] = useReducer(reducer, initialState);
    const [initDone, setInitDone] = useState<boolean>(false);

    const init = useCallback(async () => {
        setInitDone(false);
        try {
            const response = await api.get("/view_vm_json.ps1");
            console.log(response);
            localDispatch({type: "SET_ITEMS", payload: response.data.output});
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch(setAppError(error.message));
            } else {
                dispatch(setAppError("An unknown error occurred"));
            }
        } finally {
            setInitDone(true);
        }
    }, []);

    useEffect(() => {
        init().then();
    }, [init]);

    if (!initDone) return <LoadingSpinner/>;

    return (
        <>
            <Table
                tableHeaders={tableHeaders}
                rows={state.items}
            />
        </>
    )
}

export default PageVm;
