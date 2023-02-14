// These tests are to make sure the the hosted APIs responses are matching the types that the app expects.
// They are designed to catch potential errors caused by developers using different local versions of the backend services.

import getBlock from "../src/api/getBlock";
import getBlocks from "../src/api/getBlocks";
import getRecentBlocks from "../src/api/getRecentBlocks";
import { expectedBlock } from "./example-payloads";

describe("get block", () => {
    test("It returns the correct data format", async () => {
        const blockData = await getBlock("1");
        for (const key in blockData) {
            expect(typeof blockData[key]).toEqual(typeof expectedBlock[key]);
        }
    });
});

describe("get blocks", () => {
    test("It returns the correct data format", async () => {
        const blocksData = await getBlocks(1, 1);
        expect(blocksData.length).toEqual(1);
        for (const key in blocksData[0]) {
            expect(typeof blocksData[0][key]).toEqual(typeof expectedBlock[key]);
        }
    });
});

describe("get Recent blocks", () => {
    test("It returns the correct data format", async () => {
        const blocksData = await getRecentBlocks(1);
        expect(blocksData.length).toEqual(1);
        for (const key in blocksData[0]) {
            expect(typeof blocksData[0][key]).toEqual(typeof expectedBlock[key]);
        }
    });
});
