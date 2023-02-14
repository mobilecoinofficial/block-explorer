export const expectedBlock = {
    id: "92cafe9cafdf5b842c57baf111f259b264be9aeb0c3d920d3b603ceca33a630c",
    version: "0",
    index: "1",
    parentId: "c502dcac6985ade2766af6a4bd1973f4af71aa4136c6f6bf61001b21e5ddf9ae",
    cumulativeTxoCount: "19",
    rootElement: {
        range: { from: "0", to: "15" },
        hash: "5a999e364b4a5c40ed87b5251b0bd80a202b41551fb0fc0b2ba791ac14026f7f"
    },
    contentsHash: "0cb9a2ad1c291ceb6cc202b30d6a5aa7bb897ac98f997393224cb4f3ac4d2a0f",
    outputs: [
        {
            maskedAmount: {
                commitment: "daf8e5c2fb495cf9f94b7fede950a06092b71eab980c40a63c499edf2618c15f",
                version: 1,
                maskedValue: "5935413925582298474",
                maskedTokenId: ""
            },
            targetKey: "d24b68fbcefeab86ea4de187111e9d92864b83f87f5bea5c09493357f14f5261",
            publicKey: "042a5c9d8637c076f70013bc21185832aaac17b78bb52ebe621230faed32277c",
            eFogHint:
                "eb0cb162e3c93217e7f4daa43eadc4aa15f0748eb018ede1fb75435e8f7bff2023f0243cf8b4d27dfb518642ecc1cf80c48b0f93638ac1cace9ff672bd370a4b145a9f16cf9ba3c0548ac54053a02427276b0100",
            eMemo: ""
        },
        {
            maskedAmount: {
                commitment: "323e5537cdaefedbb54b6c4d7cd067bb7f93adef6867cee53562aaca68378b07",
                version: 1,
                maskedValue: "2098117174772416768",
                maskedTokenId: ""
            },
            targetKey: "64b19d8b128e2e1c98f06bd8a4756209c4d19d47dccade3a8b2c30efc05bfc5d",
            publicKey: "76b78385544d886cc7030be7b505bc99494edf7f92267b170b8777981d01354f",
            eFogHint:
                "66b692121c9fbb1fba92dab0fa9d44cf2c81d635164b20bb7422c4af68f8a95d13eebe56e5b10606b8badcc18e2e5991aec230f68e558338d628f297522775a5d7566594284378021b8d5b6cb7acedc0167b0100",
            eMemo: ""
        },
        {
            maskedAmount: {
                commitment: "0008583aa324d929877eafb7d3ed86837cfde10759dc3af8530d401adc7d4c64",
                version: 1,
                maskedValue: "8540938747735154290",
                maskedTokenId: ""
            },
            targetKey: "c08ab3ef6259fb8cfb6c74bfcea5f01aaef363879fda1d3f1fc6b2a17d9a3912",
            publicKey: "ee547d8ef69eb2e42d2ec459abf69942d92d68fb736268635da716e8c3618503",
            eFogHint:
                "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            eMemo: ""
        }
    ],
    keyImages: ["0a201a9c2a10fd4261feffcdfd53639bab21c47d77275786d9b8f7d3f942fe0cb479"],
    timestamp: "1606253595",
    signatures: [
        {
            srcUrl: "https://ledger.mobilecoinww.com/node1.prod.mobilecoinww.com/",
            archiveFilename: "00/00/00/00/00/00/00/0000000000000001.pb",
            blockSignature: {
                signature:
                    "a9d8d07cfe06008b081fd3ddb73f8d171cb29cf245dc5426746ebaf61f1dff9116f32a31c143bb143fcb6cb693446877002aff471aeeab23bc62bb4b6c00a503",
                signer: "ed65fe168f73cfea709a07562cdc8534ae003d62fff385743fd68977a082a85c",
                signedAt: "1606253595"
            }
        },
        {
            srcUrl: "https://ledger.mobilecoinww.com/node2.prod.mobilecoinww.com/",
            archiveFilename: "00/00/00/00/00/00/00/0000000000000001.pb",
            blockSignature: {
                signature:
                    "b2cc15da78b5a767ea4f9ac013234cd68db7ea1db23273f78855fc5f93e50ea8cd7f5484b22533b9756f28c652d03a3c78f81dc7e6dd596b39b40c7a4bae200d",
                signer: "08facaaa0701fe10c6e9e686b2d875394341579601fb28e50d4ca3821293a6bc",
                signedAt: "1606253595"
            }
        }
    ],
    timestampResultCode: "TimestampFound"
};
