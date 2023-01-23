import { createBrowserRouter, Navigate } from "react-router-dom";
import getRecentBlocks from "api/getRecentBlocks";
import getBlock from "api/getBlock";
import LatestBlocks from "pages/LatestBlocks";
import CurrentBlock from "pages/CurrentBlock";
import NoBlockFound from "pages/NoBlockFound";

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
        loader: async ({ params }) => getBlock(params.blockIndex),
        element: <CurrentBlock />,
        errorElement: <NoBlockFound />
    }
]);

export default router;
