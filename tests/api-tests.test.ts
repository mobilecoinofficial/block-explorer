// These tests are to make sure the the hosted APIs responses are matching the types that the app expects.
// They are designed to catch potential errors caused by developers using different local versions of the backend services.

import { expectType } from "ts-expect";

import getBlock from "../src/api/getBlock";
import { BlockSignatureData, TxOut } from "../src/api/types";

describe("get block", () => {
    test("It returns the correct data format", async () => {
        const blockData = await getBlock("1");

        expectType<string>(blockData.id);
        expectType<string>(blockData.version);
        expectType<string>(blockData.parentId);
        expectType<string>(blockData.index);
        expectType<string>(blockData.cumulativeTxoTount);
        expectType<{
            range: {
                to: number;
                from: number;
            };
            hash: string;
        }>(blockData.rootElement);
        expectType<string>(blockData.timestamp);
        expectType<string>(blockData.timestampResultCode);
        expectType<BlockSignatureData[]>(blockData.signatures);
        expectType<string[]>(blockData.keyImages);
        expectType<TxOut[]>(blockData.outputs);
    });
});
