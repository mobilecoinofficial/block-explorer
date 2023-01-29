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
    networkBlockHeight: number;
    numTxos: number;
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
    network_status: {
        local_block_height: number;
        local_num_txos: number;
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
    mintConfigTxId: number;
    mintLimit: number;
    protobuf: number[];
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

export type MintConfigTxWithConfigs = {
    mintConfigTx: MintConfigTx;
    mintConfigs: MintConfig[];
};

export type MintWithConfig = {
    mintTx: MintTx;
    mintConfig: MintConfig;
};

export type MintInfoResponse = {
    mintTxs: MintWithConfig[];
    mintConfigTxs: MintConfigTxWithConfigs[];
};

export type MintConfigResponse = {
    mintConfig: MintConfig;
};
