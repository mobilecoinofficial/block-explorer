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
    watcherInfo: WatcherInfo;
};

export type NetworkStatus = {
    networkBlockHeight: number;
    numTxos: number;
};

export type SearchResult = {
    results: any;
};

export type NetworkStatusResponse = {
    network_status: {
        local_block_height: number;
        local_num_txos: number;
    };
};

export type Block = ProtoBlock & BlockContents & WatcherInfo;
