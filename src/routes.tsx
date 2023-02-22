import { createBrowserRouter, Navigate, defer } from "react-router-dom";
import getRecentBlocks from "api/getRecentBlocks";
import getBlock from "api/getBlock";
import LatestBlocks from "pages/LatestBlocks";
import CurrentBlock from "pages/CurrentBlock";
import ErrorPage from "pages/ErrorPage";
import getMintInfo from "api/getMintInfo";
import getBurns from "api/getBurns";
import getNetworkStatus from "api/getNetworkStatus";
import Layout from "pages/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: async () => {
            const networkStatus = getNetworkStatus();
            return defer({
                networkStatus
            });
        },
        shouldRevalidate: ({ nextUrl }) => {
            return nextUrl.pathname === "/blocks";
        },
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/blocks" />
            },
            {
                path: "blocks",
                loader: async () => {
                    const preLoadedBlocks = getRecentBlocks();
                    return defer({
                        preLoadedBlocks
                    });
                },
                element: <LatestBlocks />
            },
            {
                path: "blocks/:blockIndex",
                shouldRevalidate: ({ nextParams, currentParams }) => {
                    // don't re-fetch data if we are just changing query params
                    return nextParams.blockIndex !== currentParams.blockIndex;
                },
                loader: async ({ params }) => {
                    const blockContents = await getBlock(params.blockIndex);
                    const mintInfo = await getMintInfo(params.blockIndex);
                    const burns = await getBurns(params.blockIndex);
                    return {
                        blockContents,
                        mintInfo,
                        burns
                    };
                },
                element: <CurrentBlock />
            }
        ]
    }
]);

export default router;
