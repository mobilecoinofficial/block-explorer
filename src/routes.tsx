import { createBrowserRouter, Navigate } from "react-router-dom";
import getBlocks from "api/getBlocks";
import LatestBlocks from "pages/LatestBlocks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/blocks" />
    },
    {
        path: "/blocks",
        loader: getBlocks,
        element: <LatestBlocks />
    }
]);

export default router;
