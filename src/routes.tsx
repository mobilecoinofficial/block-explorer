import { createBrowserRouter, Navigate } from "react-router-dom";
import getRecentBlocks from "api/getRecentBlocks";
import getBlock from "api/getBlock";
import LatestBlocks from "pages/LatestBlocks";
import CurrentBlock from "pages/CurrentBlock";
import NoBlockFound from "pages/NoBlockFound";
import getMintInfo from "api/getMintInfo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/blocks" />
    },
    {
        path: "/blocks",
        loader: getRecentBlocks,
        element: <LatestBlocks />
    },
    {
        path: "/blocks/:blockIndex",
        loader: async ({ params }) => {
            const blockContents = await getBlock(params.blockIndex);
            const mintInfo = await getMintInfo(params.blockIndex);
            return {
                blockContents,
                mintInfo
            };
        },
        element: <CurrentBlock />,
        errorElement: <NoBlockFound />
    }
]);

export default router;
