import { createBrowserRouter, Navigate } from "react-router-dom";
import getRecentBlocks from "api/getRecentBlocks";
import getBlock from "api/getBlock";
import LatestBlocks from "pages/LatestBlocks";
import CurrentBlock from "pages/CurrentBlock";
import ErrorPage from "pages/ErrorPage";
import getMintInfo from "api/getMintInfo";
import getBurns from "api/getBurns";
import getNetworkStatus from "api/getNetworkStatus";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Navigate to="/blocks" />
            },
            {
                path: "blocks",
                loader: async () => {
                    const networkStatus = await getNetworkStatus();
                    const preLoadedBlocks = await getRecentBlocks();
                    return {
                        networkStatus,
                        preLoadedBlocks
                    };
                },
                element: <LatestBlocks />
            },
            {
                path: "blocks/:blockIndex",
                loader: async ({ params }) => {
                    const networkStatus = await getNetworkStatus();
                    const blockContents = await getBlock(params.blockIndex);
                    const mintInfo = await getMintInfo(params.blockIndex);
                    const burns = await getBurns(params.blockIndex);
                    return {
                        blockContents,
                        mintInfo,
                        burns,
                        networkStatus
                    };
                },
                element: <CurrentBlock />
            }
        ]
    }
]);

export default router;
