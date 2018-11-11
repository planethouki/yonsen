const nem2Sdk = require("nem2-sdk");
const crypto = require("crypto");
const jssha3 = require('js-sha3');
const sha3_512 = jssha3.sha3_512
const rx = require('rxjs');
const op = require('rxjs/operators');
const request = require('request');
const fs = require('fs');

const Address = nem2Sdk.Address,
    Deadline = nem2Sdk.Deadline,
    Account = nem2Sdk.Account,
    UInt64 = nem2Sdk.UInt64,
    NetworkType = nem2Sdk.NetworkType,
    PlainMessage = nem2Sdk.PlainMessage,
    TransferTransaction = nem2Sdk.TransferTransaction,
    Mosaic = nem2Sdk.Mosaic,
    MosaicId = nem2Sdk.MosaicId,
    TransactionHttp = nem2Sdk.TransactionHttp,
    AccountHttp = nem2Sdk.AccountHttp,
    MosaicHttp = nem2Sdk.MosaicHttp,
    NamespaceHttp = nem2Sdk.NamespaceHttp,
    MosaicService = nem2Sdk.MosaicService,
    XEM = nem2Sdk.XEM,
    AggregateTransaction = nem2Sdk.AggregateTransaction,
    PublicAccount = nem2Sdk.PublicAccount,
    LockFundsTransaction = nem2Sdk.LockFundsTransaction,
    Listener = nem2Sdk.Listener,
    CosignatureTransaction = nem2Sdk.CosignatureTransaction,
    SecretLockTransaction = nem2Sdk.SecretLockTransaction,
    SecretProofTransaction = nem2Sdk.SecretProofTransaction,
    HashType = nem2Sdk.HashType,
    ModifyMultisigAccountTransaction = nem2Sdk.ModifyMultisigAccountTransaction,
    MultisigCosignatoryModificationType = nem2Sdk.MultisigCosignatoryModificationType,
    MultisigCosignatoryModification = nem2Sdk.MultisigCosignatoryModification,
    TransactionType = nem2Sdk.TransactionType,
    BlockchainHttp = nem2Sdk.BlockchainHttp;



const blockchainHttp = new BlockchainHttp('http://localhost:3000');

rx.interval(1000).pipe(
    op.take(50),
    op.flatMap(x => blockchainHttp.getBlockByHeight(x+1))
).subscribe((blockInfo) => {
    const data = {
        "height": blockInfo.height.compact(),
        "timestamp": new Date(blockInfo.timestamp.compact() + 1459468800000),
        "harvester": blockInfo.signer.address.pretty(),
        "txes": blockInfo.numTransactions,
        "fees": blockInfo.totalFee.compact(),
    };
    console.log(JSON.stringify(data));
});
