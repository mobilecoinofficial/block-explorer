export type ProtoBlock = {
    id: string;
    version: string;
    parentId: string;
    index: string;
    cumulativeTxoTount: string;
    rootElement: {
        range: {
            from: number;
            to: number;
        };
        hash: string;
    };
    contentsHash: string;
};

export type MaskedAmount = {
    commitment: string;
    maskedValue: string;
    maskedTokenId: string;
    version?: string;
};

export type TxOut = {
    maskedAmount?: MaskedAmount;
    targetKey: string;
    publicKey: string;
    eFogHint: string;
    eMemo: string;
};

export type BlockContents = {
    keyImages: string[];
    outputs: TxOut[];
};

export type BlockSignatureData = {
    srcUrl: string;
    archiveFilename: string;
    blockSignature: {
        signature: string;
        signer: string;
        signedAt: string;
    };
};

export type WatcherInfo = {
    // seconds after epoch
    timestamp: string;
    timestampResultCode: string;
    signatures: BlockSignatureData[];
};

export type BlocksResponse = {
    blocks: ProtoBlock[];
    blockContents: BlockContents[];
    watcherInfos: WatcherInfo[];
};

export type BlockResponse = {
    block: ProtoBlock;
    blockContents: BlockContents;
    watcherInfo?: WatcherInfo;
};

export type NetworkStatus = {
    networkBlockHeight: string;
    localBlockHeight: string;
    numTxos: string;
};

export type LedgerTxOutSearchResult = {
    blockContentsTxOutIndex: string;
    globalTxOutIndex: string;
};

export type LedgerKeyImageSearchResult = {
    blockContentsKeyImageIndex: string;
};

export type LedgerSearchResult = {
    resultType: string;
    block: ProtoBlock;
    blockContents: BlockContents;
    txOut?: LedgerTxOutSearchResult;
    keyImage?: LedgerKeyImageSearchResult;
    watcherInfo?: WatcherInfo;
};

export type NetworkStatusResponse = {
    networkStatus: {
        localBlockHeight: string;
        networkBlockHeight: string;
        localNumTxos: string;
    };
};

export type Block = ProtoBlock &
    BlockContents & {
        // watcher info is optional in case watcher isn't running
        timestamp?: string;
        timestampResultCode?: string;
        signatures?: BlockSignatureData[];
    };

export type MintConfigTx = {
    id: number;
    blockIndex: number;
    tokenId: number;
    nonceHex: string;
    totalMintLimit: number;
    tombstoneBlock: number;
    protobuf: number[];
};

export type MintConfig = {
    id: number;
    tokenId: number;
    signerSet: {
        signers: number[][];
    };
    mintLimit: number;
};

export type MintTx = {
    id: number;
    blockIndex: number;
    tokenId: number;
    amount: number;
    nonceHex: string;
    recipientB58Addr: string;
    tombstoneBlock: number;
    protobuf: number[];
    mintConfigId: number;
};

export type MintWithConfig = {
    mintTx: MintTx;
    mintConfig: MintConfig;
    mintConfigTx: MintConfigTx;
    mintTxSigners: number[][];
};

export type MintConfigTxWithConfigs = {
    mintConfigTx: MintConfigTx;
    mintConfigs: MintConfig[];
};

export type MintInfoResponse = {
    mintTxs: MintWithConfig[];
    mintConfigTxs: MintConfigTxWithConfigs[];
};

export type MintConfigResponse = {
    mintConfig: MintConfig;
};

export type BurnTx = {
    burn: {
        id: number;
        blockIndex: number;
        tokenId: number;
        amount: number;
        publicKeyHex: string;
        protobuf: number[];
    };
    decodedBurnMemoBytes: number[];
};

export type BurnsResponse = BurnTx[];

export type CountersResponse = {
    // Number of blocks synced so far by auditor
    numBlocksSynced: number;
    // there are more fields returned by the api but we don't care about them
};
