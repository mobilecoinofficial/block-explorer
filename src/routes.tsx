import { createBrowserRouter, Navigate } from "react-router-dom";
import getRecentBlocks from "api/getRecentBlocks";
import getBlock from "api/getBlock";
import LatestBlocks from "pages/LatestBlocks";
import CurrentBlock from "pages/CurrentBlock";
import ErrorPage from "pages/ErrorPage";
import getMintInfo from "api/getMintInfo";
import getBurns from "api/getBurns";
import getNetworkStatus from "api/getNetworkStatus";
import Layout from "pages/Layout";
import getCounters from "api/getCounters";

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        shouldRevalidate: ({ nextUrl }) => {
            // don't re-fetch header/blocks data if we are navigating between blocks
            return nextUrl.pathname === "/blocks";
        },
        loader: async () => {
            const networkStatus = await getNetworkStatus();
            const preLoadedBlocks = await getRecentBlocks();
            const counters = await getCounters();
            return {
                networkStatus,
                preLoadedBlocks,
                counters
            };
        },
        children: [
            {
                path: "/",
                element: <Navigate to="/blocks" />
            },
            {
                path: "blocks",
                // receives blocks data from outlet context
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
