const nem2Sdk = require("nem2-sdk");
const crypto = require("crypto")
const jssha3 = require('js-sha3')
const sha3_512 = jssha3.sha3_512
const rx = require('rxjs')
const op = require('rxjs/operators')
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
    TransactionType = nem2Sdk.TransactionType;

const privateKeys = require('./nemesiskeys.json');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createAggregate() {
    const privateKey = privateKeys[getRandomInt(privateKeys.length)];
    const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    
    let innerTxs = [];
    const num = process.argv[3] || 1000;
        
    for (let i = 0; i < num; i++) {
        if (i % 500 == 0) {
            console.log(`${i}th inner tx created`);
        }
        const recipient = Account.generateNewAccount(NetworkType.MIJIN_TEST).address;
        const amount = getRandomInt(10);
        const transferTransaction = TransferTransaction.create(
            Deadline.create(),
            recipient,
            [XEM.createRelative(amount)],
            PlainMessage.create(amount),
            NetworkType.MIJIN_TEST,
        );
        innerTxs.push(transferTransaction.toAggregate(account.publicAccount));
    }
    
    const aggregateTransaction = AggregateTransaction.createComplete(
        Deadline.create(23),
        innerTxs,
        NetworkType.MIJIN_TEST,
        []
    );
    return signedTransaction = account.sign(aggregateTransaction);
}

const file = process.argv[2] || "aggregate/payload0001.txt";

if (!fs.existsSync('aggregate')) {
    fs.mkdirSync('aggregate');
};

for (let i = 0; i < 4*15*50; i++) {
    console.log(`${i}th aggregate tx`)
    const tx = createAggregate();
    fs.appendFile(file, tx.payload + '\n', (err) => {
        if (err) throw err;
    });
}