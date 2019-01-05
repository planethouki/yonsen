# yonsen

A transaction making tool for NEM2 catapult to confirm 4,000 tx/s in private network.

## Articles

プライベートチェーンのカタパルトで秒間4000トランザクションを目指してみる
https://qiita.com/planethouki/items/9733aa83096a988ee57a

カタパルトで秒間4000内部トランザクションを目指してみる
https://qiita.com/planethouki/items/eb19ed496aa8b6d5533a

Myth or Fact? 4,000 transactions per second on the private Catapult blockchain
https://nemjapan.jp/4000-transactions-per-second-on-the-private-catapult-blockchain/

## Environment

- ubuntu 18.04 LTS
- git 2.17.1
- docker 18.06.1
- docker-compose 1.22.0
- nodejs v10.11

## How to Use

### start tech-bureau/catapult-service-bootstrap

```
git clone https://github.com/tech-bureau/catapult-service-bootstrap
cd catapult-service-bootstrap
git checkout 77e6cf38a7845194aa2ce72f4ed4d87e5ab791e3
docker-compose -f docker-compose-with-explorer.yml up -d
```

### clone this repository

```
git clone https://github.com/planethouki/yonsen.git
cd yonsen
npm install
```

### create `nemesiskeys.json` from `addresses.yaml`.


```
cat ../build/generated-addresses/addresses.yaml
vi nemesiskeys.json
```

extract some of `nemesis_addresses.private` and put json array.

This is example of `nemesiskeys.json`.

```
[
    "1947340C6102E18927B98D49FB4A7947AB0C5AFCDB31F34F7EA85209A2252CF2",
    "1627E64F23841C748DB9B1650ADFEC8868003158D7803A0652FE76FBD2D617B0",
    "2D280ADE3C870B2AD6B962DE191743C763823EC07E897846E5398546E9D69EC7",
    "354AF480EE43126FDC3DD11FD0F6537647F8413B7676536DFFFC671F850DF8A4",
    "<and more>"
]
```

### send instant transaction

1 transfer transaction

```
npm run send1
```

500 transfer transaction

```
npm run send500
```

### prepare and send huge amount of transactions

8 * 320,000 transfer transactions

```
npm run create32
npm run send32
```

3,000 aggregate complete transactions within 1,000 inner transactions

```
npm run createag
npm run sendag
```

### count number of transactions

```
npm run view
```
