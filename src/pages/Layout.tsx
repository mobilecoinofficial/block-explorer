import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";

import { SyncData } from "components/SyncStatus";
import Header from "components/Header";

export default function Layout() {
    const syncData = useLoaderData() as SyncData;
    return (
        <>
            <Header syncData={syncData} />
            <Outlet context={syncData} />
        </>
    );
}

export function useSyncData() {
    return useOutletContext<SyncData>();
}
