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
    BlockchainHttp = nem2Sdk.BlockchainHttp,
    QueryParams = nem2Sdk.QueryParams;



const blockchainHttp = new BlockchainHttp('http://localhost:3000');
const transactionHttp = new TransactionHttp('http://localhost:3000');

rx.interval(1000).pipe(
    op.take(2),
    op.flatMap(x => blockchainHttp.getBlockTransactions(x+1+7, new QueryParams(100))),
    op.mergeMap(x => transactionHttp.getTransactions(
        x.filter(y => y.type === 16705).map(z => z.transactionInfo.hash)
    ))
).subscribe((x) => {
    const count = x.map(y => y.innerTransactions.length).reduce((a, b) => a + b);
    console.log(count)
});
