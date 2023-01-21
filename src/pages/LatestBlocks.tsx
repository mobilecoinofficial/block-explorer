import { useLoaderData } from "react-router-dom";
import Page from "components/Page";

export default function LatestBlocks() {
    const blocks = useLoaderData();
    console.log(blocks);
    return <Page>heyyyyy</Page>;
}
