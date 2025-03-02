import useDevice from "../hooks/useDevice.ts";
import {useSelector} from "react-redux";
import {RootState} from "../utils/store.ts";
import {useAccount} from "../hooks/useAccount.ts";
import NotSupported from "./components/NotSupported.tsx";
import {DeviceSize} from "../slices/deviceSlice.ts";
import ErrorMessage from "./components/ErrorMessage.tsx";
import Message from "./components/Message.tsx";
import Loading from "./components/Loading.tsx";
import { ReactNode } from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Page from "./pages/Page.tsx";
import PageVm from "./pages/PageVm.tsx";

export interface RoutePageInterface {
    path: string;
    element: ReactNode;
    title: string;
}

export const routePages: RoutePageInterface[] = [
    {path: '/view_vm_json.ps1', element: <Page element={<PageVm/>}/>, title: "view_vm_json.ps1"},
];

const router = createBrowserRouter([
    {path: "*", element: <Navigate to="/view_vm_json.ps1"/>},
    ...routePages.map(page => ({
        path: page.path,
        element: page.element
    }))
]);


function App() {
    useDevice();
    useAccount();

    const deviceSize = useSelector((state: RootState) => state.device.size);

    if (deviceSize === DeviceSize.Small) {
        return <NotSupported/>;
    }

    return (
        <>
            <RouterProvider router={router}/>

            <ErrorMessage/>
            <Message/>

            <Loading/>
        </>
    )
}

export default App
