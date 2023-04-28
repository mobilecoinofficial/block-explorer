import { extractSigners } from "components/current-block/MintConfig";
import { SignerSet } from "api/types";

const signer1 = [1, 2, 3];
const signer2 = [2, 3, 4];
const signer3 = [4, 5, 6];
const signer4 = [7, 8, 9];
const signer5 = [10, 11, 12];
const signer6 = [13, 14, 15];

describe("extractSigners", () => {
    test("It handles a set with only individual signers", () => {
        const signerSet: SignerSet = {
            individualSigners: [signer1, signer2],
            threshold: 2,
            multiSigners: []
        };
        const extracted = extractSigners(signerSet);
        expect(extracted.length).toBe(2);
        expect(extracted).toContain(signer1);
        expect(extracted).toContain(signer2);
    });

    test("It handles a set with individual signers and one level of nested multisingers", () => {
        const signerSet: SignerSet = {
            individualSigners: [signer1, signer2],
            threshold: 2,
            multiSigners: [
                {
                    individualSigners: [signer3],
                    threshold: 2,
                    multiSigners: []
                },
                {
                    individualSigners: [signer4],
                    threshold: 2,
                    multiSigners: []
                }
            ]
        };
        const extracted = extractSigners(signerSet);
        expect(extracted.length).toBe(4);
        expect(extracted).toContain(signer1);
        expect(extracted).toContain(signer2);
        expect(extracted).toContain(signer3);
        expect(extracted).toContain(signer4);
    });

    test("It handles a set with individual signers and two levels of nested multisingers", () => {
        const signerSet: SignerSet = {
            individualSigners: [signer1, signer2],
            threshold: 2,
            multiSigners: [
                {
                    individualSigners: [signer3],
                    threshold: 2,
                    multiSigners: [
                        {
                            individualSigners: [signer4],
                            threshold: 2,
                            multiSigners: []
                        }
                    ]
                },
                {
                    individualSigners: [signer5],
                    threshold: 2,
                    multiSigners: [
                        {
                            individualSigners: [signer6],
                            threshold: 2,
                            multiSigners: []
                        }
                    ]
                }
            ]
        };
        const extracted = extractSigners(signerSet);
        expect(extracted.length).toBe(6);
        expect(extracted).toContain(signer1);
        expect(extracted).toContain(signer2);
        expect(extracted).toContain(signer3);
        expect(extracted).toContain(signer4);
        expect(extracted).toContain(signer5);
        expect(extracted).toContain(signer6);
    });
});
