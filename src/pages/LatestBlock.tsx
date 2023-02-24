import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { Container, LinearProgress } from "@mui/material";

import CurrentBlock from "components/current-block/CurrentBlock";
import { BlockInfo } from "pages/CurrentBlock";

export default function LatestBlock() {
    const { getLatestBlock } = useLoaderData() as {
        getLatestBlock: Promise<BlockInfo>;
    };

    return (
        <Suspense
            fallback={
                <Container>
                    <LinearProgress />
                </Container>
            }
        >
            <Await resolve={getLatestBlock}>
                {(blockInfo) => {
                    return <CurrentBlock {...blockInfo} />;
                }}
            </Await>
        </Suspense>
    );
}
