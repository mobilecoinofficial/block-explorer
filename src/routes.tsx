import { createBrowserRouter, Navigate } from "react-router-dom";
import getRecentBlocks from "api/getRecentBlocks";
import LatestBlocks from "pages/LatestBlocks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/blocks" />
    },
    {
        path: "/blocks",
        loader: getRecentBlocks,
        element: <LatestBlocks />
    }
]);

export default router;
