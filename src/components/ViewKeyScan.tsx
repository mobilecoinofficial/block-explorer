import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from "@mui/material";

import { Block } from "api/types";

export default function ViewkeyScan({ block }: { block: Block }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [privateViewKey, setPrivateViewKey] = useState(
        "0a207960bd872aae551ee03d6e5ab48baa228acd7ca5d2c6aaf7c8c4e77ad3e91307"
    );
    const [publicSpendKey, setPublicSpendKey] = useState(
        "0a203cc214f31f7e270e1b047bb30aa1cff3efba218169e5213835a00ab8c120e811"
    );
    // TODO figure out this type
    // eslint-disable-next-line
    const [wasm, setWasm] = useState<any>(null);
    const [resultText, setResultText] = useState("");

    const getWasm = async () => {
        const imported = await import("../view-key-scan");
        setWasm(await imported.default);
    };

    useEffect(() => {
        getWasm();
    }, []);

    const closeModal = () => {
        setModalOpen(false);
        setResultText("");
    };

    const setViewKey = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrivateViewKey(event.target.value);
    };

    const setSpendKey = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublicSpendKey(event.target.value);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    async function scan() {
        setResultText("");
        const values = [];
        for (const output of block.outputs) {
            if (!output.maskedAmount) {
                return;
            }
            try {
                const value = wasm.meh(
                    privateViewKey,
                    publicSpendKey,
                    output.publicKey,
                    output.maskedAmount.commitment,
                    output.maskedAmount.maskedValue,
                    output.maskedAmount.maskedTokenId
                );
                values.push(value);
            } catch (e) {
                console.log(e);
            }
        }
        if (!values.length) {
            setResultText("No txos found in this block for the provided keys");
        } else {
            // TODO account for eUSD
            setResultText(
                `${values.length} txos found worth a total of ${
                    values.reduce((partialSum, a) => partialSum + a, 0) / 1000000000000
                } MOB`
            );
        }
    }

    return (
        <>
            <Button onClick={openModal}>Check TXOs</Button>
            <Dialog open={modalOpen} onClose={closeModal}>
                <DialogTitle>Check for Transactions</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ marginBottom: 16 }}>
                        You can check for your transactions in this block. Your keys never leave
                        your browser and are not sent to any server.
                    </DialogContentText>
                    <TextField
                        value={privateViewKey}
                        onChange={setViewKey}
                        label="Privte View Key"
                        fullWidth
                        variant="standard"
                        margin="normal"
                    />
                    <TextField
                        value={publicSpendKey}
                        onChange={setSpendKey}
                        label="Public Spend Key"
                        fullWidth
                        variant="standard"
                        margin="normal"
                    />
                    <div style={{ fontSize: 16, marginTop: 32, height: 19 }}>{resultText}</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={scan} variant="contained">
                        Check TXOs
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
