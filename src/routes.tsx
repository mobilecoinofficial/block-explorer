import { createBrowserRouter, Navigate } from "react-router-dom";
import LatestBlocks from "pages/LatestBlocks";
import CurrentBlock from "pages/CurrentBlock";
import LatestBlock from "pages/LatestBlock";
import ErrorPage from "pages/ErrorPage";
import Layout from "pages/Layout";
import {
    layoutLoader,
    latestBlockLoader,
    recentBlocksLoader,
    currentBlockLoader
} from "api/loaders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: layoutLoader,
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
                loader: recentBlocksLoader,
                element: <LatestBlocks />
            },
            {
                path: "blocks/latest",
                loader: latestBlockLoader,
                element: <LatestBlock />
            },
            {
                path: "blocks/:blockIndex",
                shouldRevalidate: ({ nextParams, currentParams }) => {
                    // don't re-fetch data if we are just changing query params
                    return nextParams.blockIndex !== currentParams.blockIndex;
                },
                loader: currentBlockLoader,
                element: <CurrentBlock />
            }
        ]
    }
]);

export default router;
