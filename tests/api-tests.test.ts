// These tests are to make sure the the hosted APIs responses are matching the types that the app expects.
// They are designed to catch potential errors caused by developers using different local versions of the backend services.
import { get } from "lodash";

import getBlock from "../src/api/getBlock";
import getBlocks from "../src/api/getBlocks";
import getRecentBlocks from "../src/api/getRecentBlocks";
import searchBlock from "../src/api/searchBlock";
import getNetworkStatus from "../src/api/getNetworkStatus";
import getBurns from "../src/api/getBurns";
import getCounters from "../src/api/getCounters";
import getMintInfo from "../src/api/getMintInfo";
import {
    expectedBlock,
    expectedSearchResult,
    expectedNetworkStatus,
    expectedBurns,
    expectedCounters,
    expectedMintTxInfo,
    expectedMintConfigTxInfo
} from "./example-payloads";

describe("get block", () => {
    test("It returns the correct data format", async () => {
        const blockData = await getBlock("1");
        const paths = objectPaths(blockData);
        for (const path of paths) {
            try {
                expect(typeof get(blockData, path)).toEqual(typeof get(expectedBlock, path));
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(blockData, path)}, Expected: ${get(
                        expectedBlock,
                        path
                    )}`
                );
            }
        }
    });
});

describe("get blocks", () => {
    test("It returns the correct data format", async () => {
        const blocksData = await getBlocks(1, 1);
        expect(blocksData.length).toEqual(1);
        const block = blocksData[0];
        const paths = objectPaths(block);

        for (const path of paths) {
            try {
                expect(typeof get(block, path)).toEqual(typeof get(expectedBlock, path));
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(block, path)}, Expected: ${get(
                        expectedBlock,
                        path
                    )}`
                );
            }
        }
    });
});

// with other tests, we can test a specific block. For this test, the block from the api
// call will always be different, so we might run into different numbers of key images or something,
// which would cause the test to fail. So we are not testing the contents of array.
describe("get Recent blocks", () => {
    test("It returns the correct data format", async () => {
        const blocksData = await getRecentBlocks(1);
        expect(blocksData.length).toEqual(1);
        const block = blocksData[0];
        const paths = objectPaths(block);
        const indexingIntoArrayRegex = /\.[0-9]/;
        for (const path of paths) {
            if (!path.match(indexingIntoArrayRegex)) {
                try {
                    expect(typeof get(block, path)).toEqual(typeof get(expectedBlock, path));
                } catch (e) {
                    throw new Error(
                        `No match in path: '${path}'. Actual: ${get(block, path)}, Expected: ${get(
                            expectedBlock,
                            path
                        )}`
                    );
                }
            }
        }
    });
});

describe("search blocks", () => {
    const txoPubKeyShouldExist = "0abc6e419d52ffcf75fe1d4cace99082b28e5916cca41f164f0b2be7b55b8e25";
    test("It returns the correct data format", async () => {
        const foundBlock = await searchBlock(txoPubKeyShouldExist);
        const paths = objectPaths(foundBlock);
        for (const path of paths) {
            try {
                expect(typeof get(foundBlock, path)).toEqual(
                    typeof get(expectedSearchResult, path)
                );
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(foundBlock, path)}, Expected: ${get(
                        expectedSearchResult,
                        path
                    )}`
                );
            }
        }
    });
});

describe("get network status", () => {
    test("It returns the correct data format", async () => {
        const status = await getNetworkStatus();
        const paths = objectPaths(status);
        for (const path of paths) {
            try {
                expect(typeof get(status, path)).toEqual(typeof get(expectedNetworkStatus, path));
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(status, path)}, Expected: ${get(
                        expectedNetworkStatus,
                        path
                    )}`
                );
            }
        }
    });
});

describe("get burns", () => {
    test("It returns the correct data format", async () => {
        const blockWithBurn = "883080";
        const burns = await getBurns(blockWithBurn);
        const paths = objectPaths(burns);
        for (const path of paths) {
            try {
                expect(typeof get(burns, path)).toEqual(typeof get(expectedBurns, path));
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(burns, path)}, Expected: ${get(
                        expectedBurns,
                        path
                    )}`
                );
            }
        }
    });
});

describe("get counters", () => {
    test("It returns the correct data format", async () => {
        const counters = await getCounters();
        const paths = objectPaths(counters);
        for (const path of paths) {
            try {
                expect(typeof get(counters, path)).toEqual(typeof get(expectedCounters, path));
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(counters, path)}, Expected: ${get(
                        expectedCounters,
                        path
                    )}`
                );
            }
        }
    });
});

describe("get mint info", () => {
    test("It returns the correct data format for a block with mint tx", async () => {
        const blockWithMintTx = "882233";
        const mintInfo = await getMintInfo(blockWithMintTx);
        const paths = objectPaths(mintInfo);
        for (const path of paths) {
            try {
                expect(typeof get(mintInfo, path)).toEqual(typeof get(expectedMintTxInfo, path));
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(mintInfo, path)}, Expected: ${get(
                        expectedMintTxInfo,
                        path
                    )}`
                );
            }
        }
    });

    test("It returns the correct data format for a block with mint config tx", async () => {
        const blockWithMintConfigTx = "880535";
        const mintInfo = await getMintInfo(blockWithMintConfigTx);
        const paths = objectPaths(mintInfo);
        for (const path of paths) {
            try {
                expect(typeof get(mintInfo, path)).toEqual(
                    typeof get(expectedMintConfigTxInfo, path)
                );
            } catch (e) {
                throw new Error(
                    `No match in path: '${path}'. Actual: ${get(mintInfo, path)}, Expected: ${get(
                        expectedMintConfigTxInfo,
                        path
                    )}`
                );
            }
        }
    });
});

function rKeys(o, path = "") {
    if (!o || typeof o !== "object") return path;
    return Object.keys(o).map((key) => rKeys(o[key], path ? [path, key].join(".") : key));
}

const objectPaths = (o) => {
    return rKeys(o).toString().split(",");
};
