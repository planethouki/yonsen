const nem2Sdk = require("nem2-sdk");
const crypto = require("crypto")
const jssha3 = require('js-sha3')
const sha3_512 = jssha3.sha3_512
const rx = require('rxjs')
const op = require('rxjs/operators')
const request = require('request');

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

function createAndSendTx(account, recipient, amount) {
    
    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipient,
        [XEM.createRelative(amount)],
        PlainMessage.create(amount),
        NetworkType.MIJIN_TEST,
    );
    const signedTransaction = account.sign(transferTransaction);
    //console.log(signedTransaction.hash);
    return signedTransaction.payload;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const num = process.argv[2] || 1;
let txPayloads = [];
console.log(`start timestamp ${Date.now()}`);

for (let i = 0; i < num; i++) {
    if (i % 100 == 0) {
        console.log(`${i+1}th transaction sent`);
    }
    const privateKey1 = privateKeys[getRandomInt(privateKeys.length)];
    const sender = Account.createFromPrivateKey(privateKey1,NetworkType.MIJIN_TEST);
    const privateKey2 = privateKeys[getRandomInt(privateKeys.length)];
    const recipient = Account.createFromPrivateKey(privateKey2,NetworkType.MIJIN_TEST);
    const payload = createAndSendTx(sender, recipient.address, getRandomInt(10));
    txPayloads.push(payload);
}

for (let i = 0; i < num; i++) {
    request({
        method: 'PUT',
        uri: 'http://localhost:3000/transaction',
        json: {
            payload: txPayloads[i]
        }
    }, function(error, response, body) {
        //console.log(body);
    });
}

console.log(`end timestamp ${Date.now()}`);
