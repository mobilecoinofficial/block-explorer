import makeFSRequest from "api/makeFSRequest";
import { NetworkStatus, NetworkStatusResponse } from "api/types";

export default async function getNetowrkStatus(): Promise<NetworkStatus> {
    const { result, error } = await makeFSRequest<NetworkStatusResponse>({
        method: "get_network_status",
        params: null
    });

    if (result) {
        return {
            networkBlockHeight: result.network_status.local_block_height,
            numTxos: result.network_status.local_num_txos
        };
    } else {
        throw new Error(error);
    }
}
