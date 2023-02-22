import { useState, useEffect } from "react";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { Tooltip } from "@mui/material";

import { Block, CountersResponse, NetworkStatus } from "api/types";

export type SyncData = {
    networkStatus: NetworkStatus;
    counters: CountersResponse;
    recentBlocks: Block[];
};

export default function SyncStatus({ syncData }: { syncData: SyncData }) {
    const { networkStatus, counters, recentBlocks } = syncData;
    const [syncAlert, setSyncAlert] = useState("");

    useEffect(() => {
        function testSync() {
            let syncAlertMessage = "";
            const blockHeightDiff =
                Number(networkStatus.networkBlockHeight) - Number(networkStatus.localBlockHeight);
            const AuditorHeightDiff =
                Number(networkStatus.networkBlockHeight) - counters.numBlocksSynced;
            if (blockHeightDiff > 0) {
                syncAlertMessage += ` ${blockHeightDiff} blocks have not synced.`;
            }
            if (AuditorHeightDiff > 0) {
                syncAlertMessage += ` ${AuditorHeightDiff} blocks have not been evaluated for mints and burns.`;
            }

            if (recentBlocks.find((block) => block.timestampResultCode !== "TimestampFound")) {
                syncAlertMessage += ` Timestamps and signatures are not available for some blocks.`;
            }
            if (syncAlertMessage.length) {
                setSyncAlert("Block Explorer is out of sync:" + syncAlertMessage);
            } else {
                setSyncAlert("");
            }
        }

        testSync();
    }, [networkStatus, counters, recentBlocks]);

    if (syncAlert.length) {
        return (
            <Tooltip title={syncAlert}>
                <SyncProblemIcon fontSize="large" sx={{ marginLeft: 1 }} color="warning" />
            </Tooltip>
        );
    }

    return null;
}
