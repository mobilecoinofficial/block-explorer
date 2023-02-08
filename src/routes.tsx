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
                element: <LatestBlocks />
            },
            {
                path: "blocks/:blockIndex",
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
