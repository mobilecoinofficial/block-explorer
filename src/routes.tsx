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
// import getCounters from "api/getCounters";

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
        // shouldRevalidate: ({ currentUrl, nextUrl }) => {
        //     // don't re-fetch header/blocks data if we are navigating between blocks
        //     console.log("here", nextUrl.pathname !== currentUrl.pathname);
        //     return nextUrl.pathname !== currentUrl.pathname;
        // },
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/blocks" />
            },
            {
                path: "blocks",
                shouldRevalidate: ({ currentUrl, nextUrl }) => {
                    // don't re-fetch header/blocks data if we are navigating between blocks
                    return nextUrl.pathname !== currentUrl.pathname;
                },
                loader: async () => {
                    // const networkStatus = getNetworkStatus();
                    const preLoadedBlocks = getRecentBlocks();
                    return defer({
                        // networkStatus,
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
                    // const networkStatus = getNetworkStatus();
                    // return defer({
                    //     blockContents,
                    //     mintInfo,
                    //     burns
                    //     // networkStatus
                    // });
                    return {
                        blockContents,
                        mintInfo,
                        burns
                        // networkStatus
                    };
                },
                element: <CurrentBlock />
            }
        ]
    }
]);

export default router;
