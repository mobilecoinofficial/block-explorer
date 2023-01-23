import { useParams } from "react-router-dom";

import Page from "components/Page";

export default function NoBlockFound() {
    const { blockIndex } = useParams();
    return <Page>No block with index {blockIndex} found.</Page>;
}
