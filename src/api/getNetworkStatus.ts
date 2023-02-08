import makeRequest from "api/makeFSRequest";
import { NetworkStatus, NetworkStatusResponse } from "api/types";

export default async function getNetowrkStatus(): Promise<NetworkStatus> {
    const { result, error } = await makeRequest<NetworkStatusResponse>({
        method: "get_network_status",
        params: null
    });

    if (result) {
        return {
            networkBlockHeight: result.networkStatus.networkBlockHeight,
            localBlockHeight: result.networkStatus.localBlockHeight,
            numTxos: result.networkStatus.localNumTxos
        };
    } else {
        throw new Error(error);
    }
}
