/******************************************************************************
 * Copyright © 2016 The Waves Developers.                                     *
 *                                                                            *
 * See the LICENSE files at                                                   *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Waves software, including this file, may be copied, modified, propagated,  *
 * or distributed except according to the terms contained in the LICENSE      *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

/**
 * @requires {decimal.js}
 */

var Currency = (function () {
    var currencyCache = {};

    function Currency(data) {
        data = data || {};

        this.id = data.id; // base58 encoded asset id of the currency
        this.displayName = data.displayName;
        this.shortName = data.shortName || data.displayName;
        this.precision = data.precision; // number of decimal places after a decimal point
        this.verified = data.verified || false;

        if (data.roundingMode !== undefined) {
            this.roundingMode = data.roundingMode;
        } else {
            this.roundingMode = Decimal.ROUND_HALF_UP;
        }

        return this;
    }

    Currency.prototype.toString = function () {
        if (this.shortName)
            return this.shortName;

        return this.displayName;
    };

    var MIR = new Currency({
        id: '',
        displayName: 'МИР',
        shortName: 'MIR',
        precision: 8,
        verified: true
    });

    var BTC = new Currency({
        id: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
        displayName: 'Bitcoin',
        shortName: 'BTC',
        precision: 8,
        verified: true
    });

    var BCH = new Currency({
        id: 'zMFqXuoyrn5w17PFurTqxB7GsS71fp9dfk6XFwxbPCy',
        displayName: 'Bitcoin Cash',
        shortName: 'BCH',
        precision: 8,
        verified: true
    });

    var ETH = new Currency({
        id: '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu',
        displayName: 'Ethereum',
        shortName: 'ETH',
        precision: 8,
        verified: true
    });

    var LTC = new Currency({
        id: 'HZk1mbfuJpmxU1Fs4AX5MWLVYtctsNcg6e2C6VKqK8zk',
        displayName: 'Litecoin',
        shortName: 'LTC',
        precision: 8,
        verified: true
    });

    var ZEC = new Currency({
        id: 'BrjUWjndUanm5VsJkbUip8VRYy6LWJePtxya3FNv4TQa',
        displayName: 'ZCash',
        shortName: 'ZEC',
        precision: 8,
        verified: true
    });

    var USD = new Currency({
        id: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
        displayName: 'US Dollar',
        shortName: 'USD',
        precision: 2,
        verified: true
    });

    var EUR = new Currency({
        id: 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
        displayName: 'Euro',
        shortName: 'EUR',
        precision: 2,
        verified: true
    });

    var CNY = new Currency({
        id: 'DEJbZipbKQjwEiRjx2AqQFucrj5CZ3rAc4ZvFM8nAsoA',
        displayName: 'Chinese Yuan',
        shortName: 'CNY',
        precision: 2,
        verified: true
    });

    var WCT = new Currency({
        id: 'DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J',
        displayName: 'Waves Community',
        shortName: 'WCT',
        precision: 2,
        verified: true
    });

    var MRT = new Currency({
        id: '4uK8i4ThRGbehENwa6MxyLtxAjAo1Rj9fduborGExarC',
        displayName: 'Miner Reward',
        shortName: 'MRT',
        precision: 2,
        verified: true
    });

    var WGO = new Currency({
        id: '4eT6R8R2XuTcBuTHiXVQsh2dN2mg3c2Qnp95EWBNHygg',
        displayName: 'WavesGo',
        shortName: 'WGO',
        precision: 8,
        verified: true
    });

    var INCNT = new Currency({
        id: 'FLbGXzrpqkvucZqsHDcNxePTkh2ChmEi4GdBfDRRJVof',
        displayName: 'Incent',
        shortName: 'INCNT',
        precision: 8,
        verified: true
    });

    var RBX = new Currency({
        id: 'AnERqFRffNVrCbviXbDEdzrU6ipXCP5Y1PKpFdRnyQAy',
        displayName: 'Ripto Bux',
        shortName: 'RBX',
        precision: 8,
        verified: true
    });

    var MER = new Currency({
        id: 'HzfaJp8YQWLvQG4FkUxq2Q7iYWMYQ2k8UF89vVJAjWPj',
        displayName: 'Mercury',
        shortName: 'MER',
        precision: 8,
        verified: true
    });

    var BAt = new Currency({
        id: 'APz41KyoKuBBh8t3oZjqvhbbsg6f63tpZM5Ck5LYx6h',
        displayName: 'B@nkcoin',
        shortName: 'B@',
        precision: 8,
        verified: true
    });

    var UPC = new Currency({
        id: '4764Pr9DpKQAHAjAVA2uqnrYidLMnM7vpDDLCDWujFTt',
        displayName: 'Upcoin',
        shortName: 'UPC',
        precision: 2,
        verified: true
    });

    var PROTON = new Currency({
        id: 'GPmyCANZDXLyBVE5z9y6fLADhmrhCnb49RcNRcNvD9v8',
        displayName: 'ПРОТОН',
        shortName: 'PROTON',
        precision: 8,
        verified: true
    });

    var TKS = new Currency({
        id: 'BDMRyZsmDZpgKhdM7fUTknKcUbVVkDpMcqEj31PUzjMy',
        displayName: 'Tokes',
        shortName: 'TKS',
        precision: 8,
        verified: true
    });

    var WPN = new Currency({
        id: 'BkFyeRdrLquxds5FenxyonyfTwMVJJ6o6L7VTaPr5fs3',
        displayName: 'WavesPool.NET',
        shortName: 'WPN',
        precision: 8,
        verified: true
    });

    var EFYT = new Currency({
        id: '725Yv9oceWsB4GsYwyy4A52kEwyVrL5avubkeChSnL46',
        displayName: 'Ergo First Year Token',
        shortName: 'EFYT',
        precision: 8,
        verified: true
    });

    var MGO = new Currency({
        id: '2Y8eFFXDTkxgCvXbMT5K4J38cpDYYbQdciJEZb48vTDj',
        displayName: 'Mobile Go Token',
        shortName: 'MGO',
        precision: 8,
        verified: true
    });

    var ETT = new Currency({
        id: '8ofu3VpEaVCFjRqLLqzTMNs5URKUUQMrPp3k6oFmiCc6',
        displayName: 'EncryptoTel',
        shortName: 'ETT',
        precision: 8,
        verified: true
    });

    var ZRC = new Currency({
        id: '5ZPuAVxAwYvptbCgSVKdTzeud9dhbZ7vvxHVnZUoxf4h',
        displayName: 'ZrCoin',
        shortName: 'ZRC',
        precision: 8,
        verified: true
    });

    var PBKX = new Currency({
        id: '39wcSXj4MdRNRJXA88rVxF7EXWjYixaA3J3EteoN6DMM',
        displayName: 'privateBANKX',
        shortName: 'PBKX',
        precision: 0,
        verified: true
    });

    var PING = new Currency({
        id: 'Bi4w2UuGRt2jAJFfRb8b3SwDUV5x8krCzX2zZHcRfPNc',
        displayName: 'CryptoPing',
        shortName: 'PING',
        precision: 8,
        verified: true
    });

    var STAR = new Currency({
        id: 'BTfuGGoeA934Ta1fgcehQ5UhbHuWKj4don64ZNBuMT38',
        displayName: 'Starrie',
        shortName: 'STAR',
        precision: 8,
        verified: true
    });

    var BEAR = new Currency({
        id: '9gnc5UCY6RxtSi9FEJkcD57r5NBgdr45DVYtunyDLrgC',
        displayName: 'BearWaves',
        shortName: 'BEAR',
        precision: 2,
        verified: true
    });

    var DAR = new Currency({
        id: 'K5JcgN8UdwNdh5sbdAuPMm5XEd5aFvoXaC3iHsHVz1d',
        displayName: 'Darcrus',
        shortName: 'DAR',
        precision: 6,
        verified: true
    });

    var GLIPP = new Currency({
        id: '9g5JiYThxFTxknSMA3TT5xoXG7GYjRrTJxxLeeoQ36kJ',
        displayName: 'GLIPP',
        shortName: 'GLIPP',
        precision: 8,
        verified: true
    });

    var mTNT = new Currency({
        id: '8HYDtqEuHj3RDcwR8yxEvPq1qQSB9FazC8wMHtRb2TFe',
        displayName: 'MyTrackNet',
        shortName: 'mTNT',
        precision: 6,
        verified: true
    });

    var BKT = new Currency({
        id: '9c7U7bXdP23oHpmGKwGfSsjFrpxdRcp3tp28qbfhEc3d',
        displayName: '$bkt',
        shortName: 'BKT',
        precision: 0,
        verified: true
    });

    var WGR = new Currency({
        id: '8t8DMJFQu5GEhvAetiA8aHa3yPjxLj54sBnZsjnJ5dsw',
        displayName: 'Wagerr',
        shortName: 'WGR',
        precision: 8,
        verified: true
    });

    var PBT = new Currency({
        id: 'EdDvbhk4wJ1kL6pMCq1V36GbQE2nGE7Metb87zbaY2JL',
        displayName: 'Primalbase Token',
        shortName: 'PBT',
        precision: 4,
        verified: true
    });

    var PPIO = new Currency({
        id: '8UHSg6jCDTUvKT3LmeDjoaPxKmnJhdLEgBHU3vUrojSm',
        displayName: 'pospool_io',
        shortName: 'PPIO',
        precision: 2,
        verified: true
    });

    var STA = new Currency({
        id: '3SdrmU1GGZRiZz12MrMcfUz4JksTzvcU25cLFXpZy1qz',
        displayName: 'Starta',
        shortName: 'STA',
        precision: 2,
        verified: true
    });

    var CORE = new Currency({
        id: '3MyMJ9pXLTDnMQhNgoDUBtcfmaGVgnaZNARZwcZzMFk7',
        displayName: 'CORE',
        shortName: 'CORE',
        precision: 8,
        verified: true
    });

    var KSS = new Currency({
        id: 'Dq6ku3HyiMfKvorz2PLRAPwa9ykF78V1uiBhXtMbL2f2',
        displayName: 'Krosscoin',
        shortName: 'KSS',
        precision: 3,
        verified: true
    });

    var WFN = new Currency({
        id: '7yXJqP2zpXTiXuS2o25seUHYxdDnfSPZJ3SEm5DrQ7cx',
        displayName: 'WavesFullNode',
        shortName: 'WFN',
        precision: 8,
        verified: true
    });

    var GRPH = new Currency({
        id: '13QuhSAkAueic5ncc8YRwyNxGQ6tRwVSS44a7uFgWsnk',
        displayName: 'Graph',
        shortName: 'GRPH',
        precision: 8,
        verified: true
    });

    var ESC = new Currency({
        id: 'FoKiAEqHSit88f4iu1neKkzsanYHQqLRyR4DXucRGKbW',
        displayName: 'EstateCoin',
        shortName: 'ESC',
        precision: 2,
        verified: true
    });

    var AGRO = new Currency({
        id: 'J8mgyjKQb4M7DjEKvewBSvKZULMZMDpUtua9VtByLbVD',
        displayName: 'Agro token',
        shortName: 'AGRO',
        precision: 8,
        verified: true
    });

    var KING = new Currency({
        id: 'CHUTTYkDd9qFmQthCL7eHTDHwYudfthqwYCYsdvpCZbf',
        displayName: 'King93',
        shortName: 'KING',
        precision: 8,
        verified: true
    });

    var ARNA = new Currency({
        id: 'BsDmB74Y1PvtVrE741i5CJThChQHHF96hDL5nXwv7JdS',
        displayName: 'Arena',
        shortName: 'ARNA',
        precision: 8,
        verified: true
    });

    var WNET = new Currency({
        id: 'AxAmJaro7BJ4KasYiZhw7HkjwgYtt2nekPuF2CN9LMym',
        displayName: 'Wavesnode.NET',
        shortName: 'WNET',
        precision: 8,
        verified: true
    });

    var PBK = new Currency({
        id: '3eBcKvyMavxACq54yvXk1rCAP4E475NCwGKV6AmQQNaw',
        displayName: 'PeerBanks',
        shortName: 'PBK',
        precision: 8,
        verified: true
    });

    var TOM = new Currency({
        id: '3e7aYkysNohFDonLVaUFGgZ46mV3Y3r7Rqzi95GYGxeK',
        displayName: 'Tomahawkcoin',
        shortName: 'TOM',
        precision: 0,
        verified: true
    });

    var ViC = new Currency({
        id: 'Gh8Ed6n1y9wscFHT6s4EH6uhKajvNQ88oPkkFkYkgXyX',
        displayName: 'WaVialcoin',
        shortName: 'ViC',
        precision: 8,
        verified: true
    });

    var EQ = new Currency({
        id: 'DoL6wC5a72Fuxg7FtfUMWbJB9kjRuvQ3BQKrgjym3gh6',
        displayName: 'EQUI Token',
        shortName: 'EQ',
        precision: 8,
        verified: true
    });

    var SHDW = new Currency({
        id: 'ETLzrCpBqTrpyuMGdiVLBPZnUoKwte88oVdJjoFi5R2h',
        displayName: 'ShadowToken',
        shortName: 'SHDW',
        precision: 8,
        verified: true
    });

    var GIN = new Currency({
        id: '9x9ATvB61fE5TU1zRdZvyvA5Q8ZYEs2yRmzTBAs69R9N',
        displayName: 'GingerDrink.EU',
        shortName: 'GIN',
        precision: 2,
        verified: true
    });

    var NEWS = new Currency({
        id: '2EAUTcAsFMsndSgiGacKRvygFR1e6gdSd8bEpiemsTPE',
        displayName: 'NEWSTOKEN',
        shortName: 'NEWS',
        precision: 8,
        verified: true
    });

    var COXST = new Currency({
        id: '7tZxVdAWc8QvsMrXBoicMgU2bSJsaEpFJnPYn1H31B8B',
        displayName: 'CoExistCoin',
        shortName: 'COXST',
        precision: 8,
        verified: true
    });

    var SMR = new Currency({
        id: 'EbY2Uf9ukD4ndg5J7MA7CjhB7xbAsiViTmVSemb186V8',
        displayName: 'Summer',
        shortName: 'SMR',
        precision: 8,
        verified: true
    });

    var RDT = new Currency({
        id: 'Fw2Sg8x4VZyxU5ManJTo69JCKg9Rox7xDNKxdQdxXDWk',
        displayName: 'Ryder Token',
        shortName: 'RDT',
        precision: 2,
        verified: true
    });

    var IRA = new Currency({
        id: '3eBcKvyMavxACq54yvXk1rCAP4E475NCwGKV6AmQQNaw',
        displayName: 'PeerBanks',
        shortName: 'IRA',
        precision: 8,
        verified: true
    });

    var _2B4T = new Currency({
        id: '2LU8GwJFvVebrCvgDhMTLDzm3dHxuN1x7ks8dQRiSj9N',
        displayName: '2B4T',
        shortName: '2B4T',
        precision: 2,
        verified: true
    });

    var MBX = new Currency({
        id: '2CX6EFHYmXYyop4hD7dUywST5K51Hvi2m5brFo35C6EZ',
        displayName: 'MyBitX',
        shortName: 'MBX',
        precision: 2,
        verified: true
    });

    var KNOWS = new Currency({
        id: 'CqSHx4WhszTZhabfWD8UuX8efg5hbZTPRNtnwW1ojJxe',
        displayName: 'KNOWS',
        shortName: 'KNOWS',
        precision: 8,
        verified: true
    });

    var MBI = new Currency({
        id: 'CJpRwfpBcFyA6p3g1fb7xuiArSQ7xLkNH8SD9AB4HeD9',
        displayName: 'MonsterByte',
        shortName: 'MBI',
        precision: 2,
        verified: true
    });

    var COF = new Currency({
        id: 'AcrRM9STdBu5PNiFveTCbRFTS8tADhKcsbC2KBp8A4tx',
        displayName: 'CoffeeCoin',
        shortName: 'COF',
        precision: 3,
        verified: true
    });

    var CHILL = new Currency({
        id: 'DsxRbfYXzwf4PFwUD6kyEJhj2Wd5E9NsHr5WynVKTzie',
        displayName: 'Chill',
        shortName: 'CHILL',
        precision: 8,
        verified: true
    });

    var KUN = new Currency({
        id: 'F6EK5bcdEShWPA9pGdgqGYmPPUZ9FaHnyVwPZfXCTxV7',
        displayName: 'KUNA',
        shortName: 'KUN',
        precision: 0,
        verified: true
    });

    var CEIT = new Currency({
        id: '83Y1Ub3Kp9uitTTgKGPnaZE6EC793XuC3muoJC8zsFir',
        displayName: 'CorpEdu',
        shortName: 'CEIT',
        precision: 4,
        verified: true
    });

    var SGIT = new Currency({
        id: 'BYkKnXLUS3qRyNvbSTvNWJ3pTsW7uZGHhV4HQ3pdf6DW',
        displayName: 'SmartGames',
        shortName: 'SGIT',
        precision: 4,
        verified: true
    });

    var AHT = new Currency({
        id: 'HfFHZaPzGMSdHvaaZ7S8mrZrPWEyGzfA6VDuSRzb8uY6',
        displayName: 'Bowhead',
        shortName: 'AHT',
        precision: 8,
        verified: true
    });

    var HALAL = new Currency({
        id: 'BjAZxDeFpYaQ1gwmg65vYArhve31k8j9mscQDecNZ2bX',
        displayName: 'HALAL',
        shortName: 'HALAL',
        precision: 7,
        verified: true
    });

    var DIMO = new Currency({
        id: 'BEth3AJY65jWWF7KCDSFgMS6g5AvDvoAWrn8UYEsoA17',
        displayName: 'DIMO',
        shortName: 'DIMO',
        precision: 8,
        verified: true
    });

    var WIN = new Currency({
        id: '7Ry7rUTSS1iCJBFa7trCbwzAwnvvAUrX3gcz2iTL8aAF',
        displayName: 'WinToken',
        shortName: 'WIN',
        precision: 2,
        verified: true
    });

    var YTB = new Currency({
        id: 'HhzJGgbbogGQubKkHUyEaHKs7fBRebjoJkgiDQ8jrYee',
        displayName: 'YouTubeCoin',
        shortName: 'YTB',
        precision: 0,
        verified: true
    });

    var GFL = new Currency({
        id: 'D6hYNYUSxsLtvkUJ4Mxp6s7mT4WACbwJSsVGCQKxkSfH',
        displayName: 'GoldenFleece',
        shortName: 'GFL',
        precision: 8,
        verified: true
    });

    var DAT = new Currency({
        id: 'DBLes8Bxb1P4qL1XaRRPL4d4xTVZSWHKP4oKGyFZjwBe',
        displayName: 'DATALIFE',
        shortName: 'DAT',
        precision: 6,
        verified: true
    });

    var VK = new Currency({
        id: '5WLqNPkA3oDp1hTFCeUukTL1qvFnk9Ew7DXTtCzvoCxi',
        displayName: 'VKCoin',
        shortName: 'VK',
        precision: 0,
        verified: true
    });

    var UWT = new Currency({
        id: 'AdEVVde2XTDa1qDPWfChUGH2XP67duQ4NnpQWXs7wETF',
        displayName: 'Useless Token',
        shortName: 'UWT',
        precision: 0,
        verified: true
    });

    var AP_0 = new Currency({
        id: 'BYMmfwocym3d3cuFc9XytbAWGCdAM9875n5fTFokGTMm',
        displayName: 'AP-glasscoin#0',
        shortName: 'AP#0',
        precision: 0,
        verified: true
    });

    var AP_1 = new Currency({
        id: 'FgPzwZqGngVG45d6WtP5273diR8cHRjs95aT6g1tuFUv',
        displayName: 'AP-glasscoin#1',
        shortName: 'AP#1',
        precision: 0,
        verified: true
    });

    var AP_2 = new Currency({
        id: '6qLNnEV34cE8CZi5hk3nTNiUeHZcKz35R7AafPSukSAt',
        displayName: 'AP-glasscoin#2',
        shortName: 'AP#2',
        precision: 0,
        verified: true
    });

    var OCL = new Currency({
        id: 'ABFYQjwDHSct6rNk59k3snoZfAqNHVZdHz4VGJe2oCV5',
        displayName: '$OCL Oceanlab',
        shortName: 'OCL',
        precision: 8,
        verified: true
    });

    var OCC = new Currency({
        id: 'CL9PN5rpMm3ed2x6g9SWDQJfHciZFwXee2hhehmitzRj',
        displayName: 'OurCoin Classic',
        shortName: 'OCC',
        precision: 2,
        verified: true
    });

    var SMART = new Currency({
        id: '4xDfFdPorzNmB5w8p28Fs5z6fPMf4QKJGcxY3DWT9ugG',
        displayName: 'SMART',
        shortName: 'SMART',
        precision: 8,
        verified: true
    });

    var DCN = new Currency({
        id: 'DnAGJqeraWszYBfRjjbxtZDb1vggjUDZjWo49i15hGo1',
        displayName: 'Duocoin',
        shortName: 'DCN',
        precision: 2,
        verified: true
    });

    var RSC = new Currency({
        id: 'EMdiF8uaySswfCdMxc114rSfzUsAKCtK9d8eSx6ruKP4',
        displayName: 'RusCoin',
        shortName: 'RSC',
        precision: 5,
        verified: true
    });

    var LIKE = new Currency({
        id: '71tUQ7miLb2vNViGYCarYvdNj2BnDyxuFMCQivViqZq6',
        displayName: 'like',
        shortName: 'LIKE',
        precision: 8,
        verified: true
    });

    var FUPOOF = new Currency({
        id: 'EAmQHCqBVeNunvYRC5bFQh6mtvF34bL9qAwug5PGvjjE',
        displayName: 'Fupoof Coin',
        shortName: 'FUPOOF',
        precision: 3,
        verified: true
    });

    var ANY = new Currency({
        id: '2L9piWsMG4dZ84WgybXa9SPYFhyBEiP5fcv1BmJ9Gy7X',
        displayName: 'anyco',
        shortName: 'ANY',
        precision: 8,
        verified: true
    });

    var BRW = new Currency({
        id: '3EAHaZPwV5gCoWkoLhjj7rSz9ix7Q4SE6mFczoxA3f9D',
        displayName: 'BrWaves',
        shortName: 'BRW',
        precision: 3,
        verified: true
    });

    var CNX = new Currency({
        id: 'CSX1Ynv6AXmJmfnG1hBczrL9tN5HWrjVx5Ur3WJeuErv',
        displayName: 'Cryptonetix',
        shortName: 'CNX',
        precision: 8,
        verified: true
    });

    var DARF = new Currency({
        id: '96NFBPoikAeacesZggFa6wBXAyczgZFyupbX5rJwFfdQ',
        displayName: 'DARF',
        shortName: 'DARF',
        precision: 8,
        verified: true
    });

    var WNT = new Currency({
        id: 'EqdXBgKgKqdpD3kGT4tS9VgLifZXS3ASihwM3hnprNdU',
        displayName: 'WavesNotify',
        shortName: 'WNT',
        precision: 0,
        verified: true
    });

    var CWV = new Currency({
        id: 'HxxSmVuX4HbHDiDSGg96nx7wgCBhB9UPHh6pxgnKXjv4',
        displayName: 'Cryptowave',
        shortName: 'CWV',
        precision: 3,
        verified: true
    });

    var WCASH = new Currency({
        id: '2sikuhpBdZV2x5gHoA7adCStxuTSJ8m6r4hSRDLKz2zN',
        displayName: 'WCASH',
        shortName: 'WCASH',
        precision: 8,
        verified: true
    });

    var LIFE = new Currency({
        id: '5qtfgMsSAQsYMC947aYZcej1qMVQvMfRgLc3mexMXWE1',
        displayName: 'LIFE',
        shortName: 'LIFE',
        precision: 8,
        verified: true
    });

    var RDCR = new Currency({
        id: 'EXKrrWnMYnZrPYbrygnwzKKx5jjaEqALEgQhtoCcBdKG',
        displayName: 'RDCR',
        shortName: 'RDCR',
        precision: 8,
        verified: true
    });

    var THNX = new Currency({
        id: '2XQGE8LY9hUruumZ9ewK82akHMnS8a2nSXKdKXfBnuLH',
        displayName: 'ThankYou',
        shortName: 'THNX',
        precision: 4,
        verified: true
    });

    var IKV = new Currency({
        id: '8SNKiX53Yi2yjG1ZbRM4dEQJaJDpns7aN1FWBg5AZDBn',
        displayName: 'Ikeva',
        shortName: 'IKV',
        precision: 5,
        verified: true
    });

    var WDESK = new Currency({
        id: 'CqdGdzvXVp2Gxn7wCZgCboMQu2cWYf6HKAsZFyg3Sq7Q',
        displayName: 'WavesDesk',
        shortName: 'WDESK',
        precision: 8,
        verified: true
    });

    var SUR = new Currency({
        id: '5EAm2T6rKnaDHBT8ptWnuEqvKszp8SW9XPFYD1yAAW2x',
        displayName: 'Suretly',
        shortName: 'SUR',
        precision: 8,
        verified: true
    });

    var SIBERIA = new Currency({
        id: '9QrUSk9mkkdRPKDzNnEVDBoMDb6iBny4XpxsYtpwJdH9',
        displayName: 'SIBERIA',
        shortName: 'SIBERIA',
        precision: 2,
        verified: true
    });

    var MODO = new Currency({
        id: '9kEcosT68xX1Azx2ZkUkgWmwQ5SxzN9rssFieiaxT1PN',
        displayName: 'MODO',
        shortName: 'MODO',
        precision: 8,
        verified: true
    });

    var GIVE = new Currency({
        id: 'AvcbtGUgZwXrfn7rJwBLzoHCrJhtUusnco5amqF7foWU',
        displayName: 'Give Coin',
        shortName: 'GIVE',
        precision: 2,
        verified: true
    });

    var SOL = new Currency({
        id: '6sosMnsaCM5iowMjdPHXDJNrByrw8L8SQCDeD2xoNeK4',
        displayName: 'SolarLab',
        shortName: 'SOL',
        precision: 8,
        verified: true
    });

    var EOT = new Currency({
        id: 'GdnNbe6E3txF63gv3rxhpfxytTJtG7ZYyHAvWWrrEbK5',
        displayName: 'EOT Token',
        shortName: 'EOT',
        precision: 8,
        verified: true
    });

    var FIX = new Currency({
        id: 'GS5RfWDS8ytVnxqr7M2pnqeFuu7BpSwGnADTcw23FvbZ',
        displayName: 'Finamatrix',
        shortName: 'FIX',
        precision: 8,
        verified: true
    });

    var KKO = new Currency({
        id: '6gZUKe6EhDnA8vMFdwLMjLm3QLhRe1v66LvST7ZWJcZW',
        displayName: 'Cacao Shares',
        shortName: 'KKO',
        precision: 8,
        verified: true
    });

    var JNT = new Currency({
        id: '8FHrsE6ixLyEnbcJqxXaGRcEU2aziuEBvQ6Tebgqrv5c',
        displayName: 'jNetCoin',
        shortName: 'JNT',
        precision: 5,
        verified: true
    });

    var CGT = new Currency({
        id: 'CVxqNTyfD39WrNsXSfpAUTzsA76astJpzQVEiZn8a1Ai',
        displayName: 'Cryptogene Token',
        shortName: 'CGT',
        precision: 0,
        verified: true
    });

    var AFFT = new Currency({
        id: '9UFoSQSZZU5j8au1cLYgJGNNtuXAc2s1C4Xd8sPimqL8',
        displayName: 'AFFT',
        shortName: 'AFFT',
        precision: 8,
        verified: true
    });

    var MFL = new Currency({
        id: '7EHVUjcgEV9Du8qp95tS1eBV8DFtenmX64H3QawdCkC4',
        displayName: 'McFly',
        shortName: 'MFL',
        precision: 2,
        verified: true
    });

    var TURTL = new Currency({
        id: '7VDRFwm2HbaJCk3U4HQDhLGdSCxZwPe3cHefVXy7ejYe',
        displayName: 'WorldTurtleCoin',
        shortName: 'TURTL',
        precision: 8,
        verified: true
    });

    var PropX = new Currency({
        id: '7QVcLyMCQ53KSCLhZN7m3FLbfjuoHxxk5xBiToE1gmAE',
        displayName: 'PropX',
        shortName: 'PropX',
        precision: 8,
        verified: true
    });

    var ECT = new Currency({
        id: 'ErZseGoQ81jWTnKbGim7djVgyAqrsYLQr5SwrEjnF7wM',
        displayName: 'eCoin Token',
        shortName: 'ECT',
        precision: 0,
        verified: true
    });

    var STT = new Currency({
        id: 'CNhUwUpGoMmPxDsqrUsVDa6WDzwZVdh4N8gVA85tBB28',
        displayName: 'SmartTracker',
        shortName: 'STT',
        precision: 0,
        verified: true
    });

    var SCLRI = new Currency({
        id: '4GZ5tgKxPeu5kCYpcAE871grUPXWW3My5uccRVHRJ2k2',
        displayName: 'Clean/Smart City',
        shortName: 'SCLRI',
        precision: 2,
        verified: true
    });

    var Knish = new Currency({
        id: 'CvutHGapUdjVHXZ1KwGUD1Z3R2rwDwwbLJrTXSGUYfuK',
        displayName: 'Knish',
        shortName: 'Knish',
        precision: 8,
        verified: true
    });

    var WPC = new Currency({
        id: 'ANTz8NnpfbEcDFXo4gwd7UL5ugc9bdTcPGbEPktRPZw2',
        displayName: 'whoppercoin',
        shortName: 'WPC',
        precision: 1,
        verified: true
    });

    var cryptoSterling = new Currency({
        id: '61LRXnv6iB2QDwBVi34r6eEyx8h7VZdyBApB4aP9eKqA',
        displayName: 'cryptoSterling',
        shortName: 'cryptoSterling',
        precision: 0,
        verified: true
    });

    var NGN = new Currency({
        id: '6CjhSBXPF2gga6s6F9UkGKAtnYawCqySH1wUJA2cU5pW',
        displayName: 'â‚¦ | NGN',
        shortName: 'NGN',
        precision: 2,
        verified: true
    });

    var ALTOCAR = new Currency({
        id: '5ZVP6vp8Rt7GneEozNATcs7LPjQfwTun9WwnN1ispAH4',
        displayName: 'ALTOCAR',
        shortName: 'ALTOCAR',
        precision: 8,
        verified: true
    });

    var ANAT = new Currency({
        id: '7YUrQFP6Fgn8EwbQb3rBtJjBattsvX5B4tsCsJrn14Py',
        displayName: 'ANAT',
        shortName: 'ANAT',
        precision: 8,
        verified: true
    });

    var ATKN = new Currency({
        id: '7U5YKTvz7bt85FyWRB9bvSbqtKcdK3YVJDGfuJ1XjxBh',
        displayName: 'A-TOKEN',
        shortName: 'ATKN',
        precision: 8,
        verified: true
    });

    var ATOM = new Currency({
        id: '83M2vz5tTwovXyW6ytrT7771DsEpttaGyCn66toQmT5N',
        displayName: 'AtomCoinAnn',
        shortName: 'ATOM',
        precision: 2,
        verified: true
    });

    var BAR = new Currency({
        id: 'HU5B3q3neZRpq5R9uzoRjopJUpELtnFmz1KW2TAUbp9m',
        displayName: 'BARCOIN',
        shortName: 'BAR',
        precision: 0,
        verified: true
    });

    var BCF = new Currency({
        id: '6ShaywJbyebptogQ5gMUvtbEyCdXqV4gGPfAPEdq2Dre',
        displayName: 'BCF SHARES',
        shortName: 'BCF',
        precision: 6,
        verified: true
    });

    var BET = new Currency({
        id: 'FkgGR1mYeEdPLrvCRTfQcZeyCadWEVGuryDEhuPuZoUf',
        displayName: 'BET\'s',
        shortName: 'BET',
        precision: 1,
        verified: true
    });

    var BIRTAL = new Currency({
        id: 'J1tggntaeLccEr8t9s8cc9VpqGj3QkHMSrfyEkdGzoXF',
        displayName: 'BirTal',
        shortName: 'BIRTAL',
        precision: 8,
        verified: true
    });

    var BITCHEKE = new Currency({
        id: '9CPQU2EdbYxHsiytpZV4L8cypZHL17B4a81xedpspNT8',
        displayName: 'BitCheke',
        shortName: 'BITCHEKE',
        precision: 3,
        verified: true
    });

    var BITD = new Currency({
        id: 'B5f8oYUingX3XyKjRAcimPapELPfFMhRz6oVzUk5GDW5',
        displayName: 'BITDOLLARS',
        shortName: 'BITD',
        precision: 8,
        verified: true
    });

    var BKC = new Currency({
        id: '2a2AorHdSaWiiTiYR11vEKjLBzsqtQ5i1KzPNfW97xBb',
        displayName: 'Blokcloud',
        shortName: 'BKC',
        precision: 8,
        verified: true
    });

    var CROW = new Currency({
        id: '5XWiXK6RbwXsTnY2dSHQWnKVjvLsMAEeE1rFqQz3Ton2',
        displayName: 'CrowdWave',
        shortName: 'CROW',
        precision: 3,
        verified: true
    });

    var CBT = new Currency({
        id: 'HfTchexAmETtGoPCU1V72t6WNgPPoEsLjBTpeeBzC46L',
        displayName: 'CryptoBazar',
        shortName: 'CBT',
        precision: 4,
        verified: true
    });

    var EDEN = new Currency({
        id: 'HQMz6yc8hxzA3MUvvGSNByxWLMcmt6uoz5ZE3ebkS75n',
        displayName: 'EdenChain',
        shortName: 'EDEN',
        precision: 8,
        verified: true
    });

    var EQUA = new Currency({
        id: 'ECcmoyW2wQcQMvXp3QbwnMFBpiRthHj54MpYq7scQBeZ',
        displayName: 'EquaCoin',
        shortName: 'EQUA',
        precision: 4,
        verified: true
    });

    var EQUILD = new Currency({
        id: 'FrErWYxQojiTVMamqLLvkmeKKX9UTXz8EL9NF3AeYWPi',
        displayName: 'equild',
        shortName: 'EQUILD',
        precision: 8,
        verified: true
    });

    var ETERP = new Currency({
        id: 'BiSYeqfANiJjUjR3GwCaeCPZQaT4Ly1vQb12PcambKbz',
        displayName: 'EterPay',
        shortName: 'ETERP',
        precision: 8,
        verified: true
    });

    var FENIX = new Currency({
        id: '3pEoYCzUb7hWvqoMQGPYffTsxxPDkSzwSskypmYFBLFP',
        displayName: 'FENIX&WAVES',
        shortName: 'FENIX',
        precision: 8,
        verified: true
    });

    var FTB = new Currency({
        id: 'E8jdQECM6i9j28bpH81zZWyAwtaZwJMtzPWz4jCCmot3',
        displayName: 'Fincoin',
        shortName: 'FTB',
        precision: 6,
        verified: true
    });

    var FLEX = new Currency({
        id: 't1ocHkKuQLKYhtH7nm1rYuj1iZ8d75bqAjgRTwiGhQF',
        displayName: 'Flex',
        shortName: 'FLEX',
        precision: 0,
        verified: true
    });

    var FNX = new Currency({
        id: 'RiVZJ25d5vMYcVo4XRK5n2whjh4WwYGshmmwXgF9MK4',
        displayName: 'FNX&WVS',
        shortName: 'FNX',
        precision: 8,
        verified: true
    });

    var GBC = new Currency({
        id: 'byHDS3JprxWhPbuYBy4y4SvYbbvZiAQV9MNiDSsRPz6',
        displayName: 'Goldbar coin',
        shortName: 'GBC',
        precision: 3,
        verified: true
    });

    var Grant = new Currency({
        id: 'C9p15S1PJN4tMeodygkBEEr2GQUX5dtbtuadTcuaj7t5',
        displayName: 'Grant',
        shortName: 'Grant',
        precision: 8,
        verified: true
    });

    var GrantsBounty = new Currency({
        id: '47iX3APMeD4ZGmhQr73qg5boyoJZXGWpfX5sbcAD6jsn',
        displayName: 'GrantsBounty',
        shortName: 'GrantsBounty',
        precision: 8,
        verified: true
    });

    var HEART = new Currency({
        id: '5xFEsfHdtHLZ2yexduffCBqryWxV4Py8FHtA9tLWqtrJ',
        displayName: 'HEART',
        shortName: 'HEART',
        precision: 1,
        verified: true
    });

    var HOME = new Currency({
        id: '9fkbSVSceusGtsL9KxQHCaqpt2ddds6ukMEKrabgdbac',
        displayName: 'HomeToken',
        shortName: 'HOME',
        precision: 8,
        verified: true
    });

    var HTC = new Currency({
        id: '7GCmsbyYBJ9DAJayC3hKuZV4REZXdGdXRjWgsY9oB3wZ',
        displayName: 'HotelCoin',
        shortName: 'HTC',
        precision: 8,
        verified: true
    });

    var IMMO = new Currency({
        id: '8yzwMFmNFAv8VALWfmEPHk26tMv9MBS7eHoTm7i1FXyT',
        displayName: 'Immodestea',
        shortName: 'IMMO',
        precision: 8,
        verified: true
    });

    var JNET = new Currency({
        id: '8FHrsE6ixLyEnbcJqxXaGRcEU2aziuEBvQ6Tebgqrv5c',
        displayName: 'jNetCoin',
        shortName: 'JNET',
        precision: 5,
        verified: true
    });

    var KRIP = new Currency({
        id: 'Hm9DM6i5DsnHoPhxWWo5j2bFYYVCUaoC9n66EtzmwgAM',
        displayName: 'KripCoin',
        shortName: 'KRIP',
        precision: 5,
        verified: true
    });

    var LLA = new Currency({
        id: 'CvD7GedwdeHCxtiiQgbEAV6JHxXv9DQ8bkmrFAauiNyy',
        displayName: 'Lalena (LLA)',
        shortName: 'LLA',
        precision: 8,
        verified: true
    });

    var limburg = new Currency({
        id: 'FYCGQ1iKBqbYnQgeLQFEazw4oF2PyRYhdsUPWBEWk7F6',
        displayName: 'LimburgCoin',
        shortName: 'limburg',
        precision: 8,
        verified: true
    });

    var LIVEBIT = new Currency({
        id: '7W2CHBfQFXfkZVrPWrj34W6pveKHVky9dvoFq1MXNY24',
        displayName: 'LiveBit',
        shortName: 'LIVEBIT',
        precision: 8,
        verified: true
    });

    var MED = new Currency({
        id: 'CnkUwcYpVpzk3mMM2XfofymwXBnmrSecFbBdMx6WYDCa',
        displayName: 'Medicine Man',
        shortName: 'MED',
        precision: 8,
        verified: true
    });

    var MNG = new Currency({
        id: '6672vWQDHDV6WRU4GsRjBYo6444bh2fEWmXW1KnSSrw4',
        displayName: 'Mining',
        shortName: 'MNG',
        precision: 8,
        verified: true
    });

    var MMBT = new Currency({
        id: '82in5zvV8XdnFzCwYWCNaNbRWSvEa4CfCYfJSAaStafH',
        displayName: 'MMBT',
        shortName: 'MMBT',
        precision: 4,
        verified: true
    });

    var MPST = new Currency({
        id: '44n9LfHecPgovJAZtgdqLg9bT4kzRSF2LgGGSnsyojRn',
        displayName: 'MPST',
        shortName: 'MPST',
        precision: 8,
        verified: true
    });

    var MFS = new Currency({
        id: 'A29o9EnYC9rjPnCw4ujrgTze7E3hLstiLeiSeoUbanfv',
        displayName: 'My Fair Share',
        shortName: 'MFS',
        precision: 8,
        verified: true
    });

    var MCS = new Currency({
        id: '4RndW3NAfxHV1xdCn67t4P6prU9B8SyxNTpYFAocmttM',
        displayName: 'MyCryptoSpot',
        shortName: 'MCS',
        precision: 8,
        verified: true
    });

    var NICNAC = new Currency({
        id: 'ENpaU88woC6Q1pbheURcA5TMX7ykhC5zFPqzdVfhP1BC',
        displayName: 'NicNacToken',
        shortName: 'NICNAC',
        precision: 3,
        verified: true
    });

    var NUTS = new Currency({
        id: '67dY6uMTpg9Ks7Abn2muwTyY24qjrhjviKxMfgURQhos',
        displayName: 'Nutshells',
        shortName: 'NUTS',
        precision: 6,
        verified: true
    });

    var OCTANOX = new Currency({
        id: 'DxE8xbjHT7rXyRd2DMz5TnNNNC91Kz1SZ9k4dpH6X4JP',
        displayName: 'Octanox',
        shortName: 'OTX',
        precision: 8,
        verified: true
    });

    var P2P = new Currency({
        id: '6Z2EYvNU447o96Zevei4Zb5rNntENs2br2B5kQ5HXkiq',
        displayName: 'P2P Coin',
        shortName: 'P2P',
        precision: 8,
        verified: true
    });

    var preNEX = new Currency({
        id: 'FBKxJx6Ho6z1bABvGJo1J1sbCrr4Cs3iUTGsxy3suG4F',
        displayName: 'preNEX',
        shortName: 'preNEX',
        precision: 0,
        verified: true
    });

    var preVITO = new Currency({
        id: '6LcUbnDY585ndN8XbHmnbwF8P8BZsoPqzvEyWbjdsrqQ',
        displayName: 'preVITO',
        shortName: 'preVITO',
        precision: 3,
        verified: true
    });

    var PRIMO = new Currency({
        id: '4EmxnV7DhizwpKh5J13Waxovth95uSjknokNFxNAzAaS',
        displayName: 'Primo Coin',
        shortName: 'PRIMO',
        precision: 8,
        verified: true
    });

    var PYTI = new Currency({
        id: 'F6ppo1zRQnMW6VcYRj2LiEqjL6ahvdYU4zNQXWxstLbg',
        displayName: 'Priveleged YTI',
        shortName: 'PYTI',
        precision: 2,
        verified: true
    });

    var PUMP = new Currency({
        id: '5fMUzjhtVkwxyUyDPzSZuCz2HtpesaaTNMTRsFzZvkP',
        displayName: 'Pumpcoin',
        shortName: 'PUMP',
        precision: 8,
        verified: true
    });

    var QUASA = new Currency({
        id: '33GpTrJ72YiDA21nEtssN8jKYf5jwbv8GFH22y37AVjD',
        displayName: 'QuasaCoin',
        shortName: 'QUASA',
        precision: 8,
        verified: true
    });

    var REDFISH = new Currency({
        id: '5sU8dF7DyN7dKN4NiFTtVC5shqthSgTEuvKUu2iusyS2',
        displayName: 'Redfishcoin',
        shortName: 'REDFISH',
        precision: 8,
        verified: true
    });

    var RMOB = new Currency({
        id: 'BmcArNN9VnKAp3HbvpKaoE3utwEXqvP1UjunS9DVKdGS',
        displayName: 'RewardMob',
        shortName: 'RMOB',
        precision: 8,
        verified: true
    });

    var RXSC = new Currency({
        id: 'SGBHnkG1Z8VbEtaCF5gpNihg1SRFky6CzrwmyL8GJnj',
        displayName: 'RxSmartCoffee',
        shortName: 'RXSC',
        precision: 8,
        verified: true
    });

    var SEBEUM = new Currency({
        id: '73XxLgHdzDfus6nRuwpo3dceCRMNiU5VwkiUK1AAfaQk',
        displayName: 'Sebeum',
        shortName: 'SEBEUM',
        precision: 5,
        verified: true
    });

    var SGCN = new Currency({
        id: 'AYMwsNAa4pdg1raJnGvibdLkAhqXQTrXo2SQfecAzfg1',
        displayName: 'SGelderCoin',
        shortName: 'SGCN',
        precision: 8,
        verified: true
    });

    var SHEEP = new Currency({
        id: 'mjkFnVZBdS1VB5MdWjgEFYHyTaoVGuepypLpTEGQdEp',
        displayName: 'Sheepbit',
        shortName: 'SHEEP',
        precision: 8,
        verified: true
    });

    var SGT = new Currency({
        id: 'BPSBJtgWQvx6QqNz9WHEZVhJAmTvGPArQ1Y5nFVkTPAR',
        displayName: 'Snuggoo (SGT)',
        shortName: 'SGT',
        precision: 2,
        verified: true
    });

    var SQUASH = new Currency({
        id: '4Cxj1FfwKWMwfZZ34QxyZtRfUq4jHSmX9pwXafzBzmdC',
        displayName: 'SquashCoin',
        shortName: 'SQUASH',
        precision: 2,
        verified: true
    });

    var SRE = new Currency({
        id: 'BotFPyCivCDaoQHSD3myBw7GAxsZdiRS76G1WdFVuSXC',
        displayName: 'SRE_Token',
        shortName: 'SRE',
        precision: 8,
        verified: true
    });

    var STYLO = new Currency({
        id: '5VRTinDkxBi4oYBSWjkijyZtacH3QVa8Q8qPodhvczv6',
        displayName: 'stylocoin',
        shortName: 'STYLO',
        precision: 4,
        verified: true
    });

    var SXAS = new Currency({
        id: 'EjR1ThR2MBgukq4Z5zhdXzcct2Vzvq1QgnkMjcFRhXio',
        displayName: 'SXAS',
        shortName: 'SXAS',
        precision: 6,
        verified: true
    });

    var TENEBRIS = new Currency({
        id: 'EJs2V3hd6FXGDYH7HKFDhVcgtCmDa31zRygV1KwF5PHS',
        displayName: 'Tenebris',
        shortName: 'TENEBRIS',
        precision: 8,
        verified: true
    });

    var TEXCOIN = new Currency({
        id: '68XWWEmAUoLHXGFy6n8nb6M5c2WrSrekiWSPx8VT7e1e',
        displayName: 'TEXCOIN',
        shortName: 'TEXCOIN',
        precision: 3,
        verified: true
    });

    var Tidals = new Currency({
        id: 'AAUgxEx61UK5Y9MiEYMsdnCqVhGxBcTJEGTMHJeybuBC',
        displayName: 'Tidal Waves',
        shortName: 'Tidals',
        precision: 8,
        verified: true
    });

    var TFT = new Currency({
        id: 'B1u2TBpTYHWCuMuKLnbQfLvdLJ3zjgPiy3iMS2TSYugZ',
        displayName: 'TIMESFARMTOKEN',
        shortName: 'TFT',
        precision: 6,
        verified: true
    });

    var LOYAL = new Currency({
        id: '3YBdrSJjkAfQiFVefJ6vSRLrRtsWfSgjFd2W53oCWpZM',
        displayName: 'tokenloyalty.io',
        shortName: 'LOYAL',
        precision: 8,
        verified: true
    });

    var TOPS = new Currency({
        id: '865pJ6TrYL39oMHoKtxBCNjdYsyMtaymz3doFfbEv5hh',
        displayName: 'TOPS',
        shortName: 'TOPS',
        precision: 5,
        verified: true
    });

    var TRGL = new Currency({
        id: '5i65cqtC1s34YmyUUxFM4ps5DLQHtLvZwCfaPb6QhXdh',
        displayName: 'TRGL',
        shortName: 'TRGL',
        precision: 0,
        verified: true
    });

    var TRUZTAR = new Currency({
        id: '7EHF5yybMR9kkB5Ntz3pqYTQY3zK6a5rHy4gjDYVbWpS',
        displayName: 'Truztar',
        shortName: 'TRUZTAR',
        precision: 8,
        verified: true
    });

    var TWENTYONE = new Currency({
        id: 'Dbd7nKCm9RRq6Vjh9VLumXeEKPZfM4dgox19q7jjHx5L',
        displayName: 'Twenty-One',
        shortName: 'TWENTYONE',
        precision: 8,
        verified: true
    });

    var UOOMAG = new Currency({
        id: 'DgwLgKXfC3G7SKbSoz82ZQVGQNLHqqfEovtdv7sjHGKu',
        displayName: 'UOOMAG',
        shortName: 'UOOMAG',
        precision: 8,
        verified: true
    });

    var VTN = new Currency({
        id: '32gwVYerx37pxuNG6eaiFRdya5ETpH8imNsf31VT5WqH',
        displayName: 'VOLTROON',
        shortName: 'VTN',
        precision: 8,
        verified: true
    });

    var WTC = new Currency({
        id: '7VDRFwm2HbaJCk3U4HQDhLGdSCxZwPe3cHefVXy7ejYe',
        displayName: 'WorldTurtleCoin',
        shortName: 'WTC',
        precision: 8,
        verified: true
    });

    var XVCA = new Currency({
        id: '78op8zPXC1Uf5541a7Pm1SmqrutAC9tsNxbrMTLscoHy',
        displayName: 'XVCA',
        shortName: 'XVCA',
        precision: 3,
        verified: true
    });

    var ANRYZE = new Currency({
        id: 'HXdFUiw5yLLWhkorsRy1E5GttG2QZfzEYAVgEgjBNh8t',
        displayName: 'ANRYZE',
        shortName: 'ANRYZE',
        precision: 8,
        verified: true
    });

    var KLX = new Currency({
        id: '7gMmyXjd4uZwaAFcfrfXQR4fAhDi8waXANb8zjqhRSfq',
        displayName: 'Kylix',
        shortName: 'KLX',
        precision: 2,
        verified: true
    });

    var POST = new Currency({
        id: 'DQUrzGsXp84Z4aPXLEkhgApf8TpCQqtoY87gdwUTurL7',
        displayName: 'NEWS',
        shortName: 'POST',
        precision: 8,
        verified: true
    });

    var TRY = new Currency({
        id: '2mX5DzVKWrAJw8iwdJnV2qtoeVG9h5nTDpTqC1wb1WEN',
        displayName: 'TRY',
        shortName: 'TRY',
        precision: 2,
        verified: true
    });

    var JDC = new Currency({
        id: 'Chs34HQrj37VbWHr8NDZiRZEkyEGBiPowSF4RjrRBCHn',
        displayName: 'JustDatingCoin',
        shortName: 'JDC',
        precision: 8,
        verified: true
    });

    var Blue = new Currency({
        id: 'HkhKVMzWNE7DJ5fZJpwBMs4FMxFwZFFh9UT5GXAVdZvE',
        displayName: 'BlueToken',
        shortName: 'Blue',
        precision: 0,
        verified: true
    });

    var AKCHE = new Currency({
        id: '3ihiQ1TJhe7fBrMc8o9EY8tQNU6phkmp8ZEyvVe4Jfhk',
        displayName: 'AKCHE',
        shortName: 'AKCHE',
        precision: 4,
        verified: true
    });

    var TDX = new Currency({
        id: '3QvxP6YFBKpWJSMAfYtL8Niv8KmmKsnpb9uQwQpg8QN2',
        displayName: 'Tidex',
        shortName: 'TDX',
        precision: 2,
        verified: true
    });

    var InPay = new Currency({
        id: '9pPVf3gcLH3NQA2aYVRcTV2N2i32qBzA5cEMWYqBYfMi',
        displayName: 'InPay',
        shortName: 'InPay',
        precision: 8,
        verified: true
    });

    var LIQUID = new Currency({
        id: '7FzrHF1pueRFrPEupz6oiVGTUZqe8epvC7ggWUx8n1bd',
        displayName: 'Liquid',
        shortName: 'LIQUID',
        precision: 8,
        verified: true
    });

    var TN = new Currency({
        id: 'HxQSdHu1X4ZVXmJs232M6KfZi78FseeWaEXJczY6UxJ3',
        displayName: 'TurtleNode',
        shortName: 'TN',
        precision: 2,
        verified: true
    });

    var ENAN = new Currency({
        id: '53sxSVvj3PJkZhZKz6gLc5coXxAyC7zbgo5RtXfqRsym',
        displayName: 'eco-NAN',
        shortName: 'ENAN',
        precision: 8,
        verified: true
    });

    var ContestCoin = new Currency({
        id: '2ULyqYTJfrDknc2m5iPPkrvpHtRiB57nHag4RCSwZWQS',
        displayName: 'ContestCoin',
        shortName: 'ContestCoin',
        precision: 0,
        verified: true
    });

    var SMQ = new Currency({
        id: 'CBik4JEmsoPZKKATnShULYj2ebUao5aada9N1XGznEET',
        displayName: 'Simdaq Token',
        shortName: 'SMQ',
        precision: 8,
        verified: true
    });

    var DASH = new Currency({
        id: 'B3uGHFRpSUuGEDWjqB9LWWxafQj8VTvpMucEyoxzws5H',
        displayName: 'Dash token',
        shortName: 'DASH',
        precision: 8,
        verified: true
    });

    function isCached(assetId) {
        return currencyCache.hasOwnProperty(assetId);
    }

    function invalidateCache() {
        currencyCache = {};

        currencyCache[MIR.id] = MIR;
        currencyCache[BTC.id] = BTC;
        currencyCache[BCH.id] = BCH;
        currencyCache[ETH.id] = ETH;
        currencyCache[LTC.id] = LTC;
        currencyCache[ZEC.id] = ZEC;
        currencyCache[USD.id] = USD;
        currencyCache[EUR.id] = EUR;
        currencyCache[CNY.id] = CNY;
        currencyCache[WCT.id] = WCT;
        currencyCache[MRT.id] = MRT;
        currencyCache[WGO.id] = WGO;
        currencyCache[INCNT.id] = INCNT;
        currencyCache[RBX.id] = RBX;
        currencyCache[MER.id] = MER;
        currencyCache[BAt.id] = BAt;
        currencyCache[UPC.id] = UPC;
        currencyCache[PROTON.id] = PROTON;
        currencyCache[TKS.id] = TKS;
        currencyCache[WPN.id] = WPN;
        currencyCache[EFYT.id] = EFYT;
        currencyCache[MGO.id] = MGO;
        currencyCache[ETT.id] = ETT;
        currencyCache[ZRC.id] = ZRC;
        currencyCache[PBKX.id] = PBKX;
        currencyCache[PING.id] = PING;
        currencyCache[STAR.id] = STAR;
        currencyCache[BEAR.id] = BEAR;
        currencyCache[DAR.id] = DAR;
        currencyCache[GLIPP.id] = GLIPP;
        currencyCache[mTNT.id] = mTNT;
        currencyCache[BKT.id] = BKT;
        currencyCache[WGR.id] = WGR;
        currencyCache[PBT.id] = PBT;
        currencyCache[PPIO.id] = PPIO;
        currencyCache[STA.id] = STA;
        currencyCache[CORE.id] = CORE;
        currencyCache[KSS.id] = KSS;
        currencyCache[WFN.id] = WFN;
        currencyCache[GRPH.id] = GRPH;
        currencyCache[ESC.id] = ESC;
        currencyCache[AGRO.id] = AGRO;
        currencyCache[KING.id] = KING;
        currencyCache[ARNA.id] = ARNA;
        currencyCache[WNET.id] = WNET;
        currencyCache[PBK.id] = PBK;
        currencyCache[TOM.id] = TOM;
        currencyCache[ViC.id] = ViC;
        currencyCache[EQ.id] = EQ;
        currencyCache[SHDW.id] = SHDW;
        currencyCache[GIN.id] = GIN;
        currencyCache[NEWS.id] = NEWS;
        currencyCache[COXST.id] = COXST;
        currencyCache[SMR.id] = SMR;
        currencyCache[RDT.id] = RDT;
        currencyCache[IRA.id] = IRA;
        currencyCache[_2B4T.id] = _2B4T;
        currencyCache[MBX.id] = MBX;
        currencyCache[KNOWS.id] = KNOWS;
        currencyCache[MBI.id] = MBI;
        currencyCache[COF.id] = COF;
        currencyCache[CHILL.id] = CHILL;
        currencyCache[KUN.id] = KUN;
        currencyCache[CEIT.id] = CEIT;
        currencyCache[SGIT.id] = SGIT;
        currencyCache[AHT.id] = AHT;
        currencyCache[HALAL.id] = HALAL;
        currencyCache[DIMO.id] = DIMO;
        currencyCache[WIN.id] = WIN;
        currencyCache[YTB.id] = YTB;
        currencyCache[GFL.id] = GFL;
        currencyCache[DAT.id] = DAT;
        currencyCache[VK.id] = VK;
        currencyCache[UWT.id] = UWT;
        currencyCache[AP_0.id] = AP_0;
        currencyCache[AP_1.id] = AP_1;
        currencyCache[AP_2.id] = AP_2;
        currencyCache[OCL.id] = OCL;
        currencyCache[OCC.id] = OCC;
        currencyCache[SMART.id] = SMART;
        currencyCache[DCN.id] = DCN;
        currencyCache[RSC.id] = RSC;
        currencyCache[LIKE.id] = LIKE;
        currencyCache[FUPOOF.id] = FUPOOF;
        currencyCache[ANY.id] = ANY;
        currencyCache[BRW.id] = BRW;
        currencyCache[CNX.id] = CNX;
        currencyCache[DARF.id] = DARF;
        currencyCache[WNT.id] = WNT;
        currencyCache[CWV.id] = CWV;
        currencyCache[WCASH.id] = WCASH;
        currencyCache[LIFE.id] = LIFE;
        currencyCache[RDCR.id] = RDCR;
        currencyCache[THNX.id] = THNX;
        currencyCache[IKV.id] = IKV;
        currencyCache[WDESK.id] = WDESK;
        currencyCache[SUR.id] = SUR;
        currencyCache[SIBERIA.id] = SIBERIA;
        currencyCache[MODO.id] = MODO;
        currencyCache[GIVE.id] = GIVE;
        currencyCache[SOL.id] = SOL;
        currencyCache[EOT.id] = EOT;
        currencyCache[FIX.id] = FIX;
        currencyCache[KKO.id] = KKO;
        currencyCache[JNT.id] = JNT;
        currencyCache[CGT.id] = CGT;
        currencyCache[AFFT.id] = AFFT;
        currencyCache[MFL.id] = MFL;
        currencyCache[TURTL.id] = TURTL;
        currencyCache[PropX.id] = PropX;
        currencyCache[ECT.id] = ECT;
        currencyCache[STT.id] = STT;
        currencyCache[SCLRI.id] = SCLRI;
        currencyCache[Knish.id] = Knish;
        currencyCache[WPC.id] = WPC;
        currencyCache[cryptoSterling.id] = cryptoSterling;
        currencyCache[NGN.id] = NGN;
        currencyCache[ALTOCAR.id] = ALTOCAR;
        currencyCache[ANAT.id] = ANAT;
        currencyCache[ATKN.id] = ATKN;
        currencyCache[ATOM.id] = ATOM;
        currencyCache[BAR.id] = BAR;
        currencyCache[BCF.id] = BCF;
        currencyCache[BET.id] = BET;
        currencyCache[BIRTAL.id] = BIRTAL;
        currencyCache[BITCHEKE.id] = BITCHEKE;
        currencyCache[BITD.id] = BITD;
        currencyCache[BKC.id] = BKC;
        currencyCache[CROW.id] = CROW;
        currencyCache[CBT.id] = CBT;
        currencyCache[EDEN.id] = EDEN;
        currencyCache[EQUA.id] = EQUA;
        currencyCache[EQUILD.id] = EQUILD;
        currencyCache[ETERP.id] = ETERP;
        currencyCache[FENIX.id] = FENIX;
        currencyCache[FTB.id] = FTB;
        currencyCache[FLEX.id] = FLEX;
        currencyCache[FNX.id] = FNX;
        currencyCache[GBC.id] = GBC;
        currencyCache[Grant.id] = Grant;
        currencyCache[GrantsBounty.id] = GrantsBounty;
        currencyCache[HEART.id] = HEART;
        currencyCache[HOME.id] = HOME;
        currencyCache[HTC.id] = HTC;
        currencyCache[IMMO.id] = IMMO;
        currencyCache[JNET.id] = JNET;
        currencyCache[KRIP.id] = KRIP;
        currencyCache[LLA.id] = LLA;
        currencyCache[limburg.id] = limburg;
        currencyCache[LIVEBIT.id] = LIVEBIT;
        currencyCache[MED.id] = MED;
        currencyCache[MNG.id] = MNG;
        currencyCache[MMBT.id] = MMBT;
        currencyCache[MPST.id] = MPST;
        currencyCache[MFS.id] = MFS;
        currencyCache[MCS.id] = MCS;
        currencyCache[NICNAC.id] = NICNAC;
        currencyCache[NUTS.id] = NUTS;
        currencyCache[OCTANOX.id] = OCTANOX;
        currencyCache[P2P.id] = P2P;
        currencyCache[preNEX.id] = preNEX;
        currencyCache[preVITO.id] = preVITO;
        currencyCache[PRIMO.id] = PRIMO;
        currencyCache[PYTI.id] = PYTI;
        currencyCache[PUMP.id] = PUMP;
        currencyCache[QUASA.id] = QUASA;
        currencyCache[REDFISH.id] = REDFISH;
        currencyCache[RMOB.id] = RMOB;
        currencyCache[RXSC.id] = RXSC;
        currencyCache[SEBEUM.id] = SEBEUM;
        currencyCache[SGCN.id] = SGCN;
        currencyCache[SHEEP.id] = SHEEP;
        currencyCache[SGT.id] = SGT;
        currencyCache[SQUASH.id] = SQUASH;
        currencyCache[SRE.id] = SRE;
        currencyCache[STYLO.id] = STYLO;
        currencyCache[SXAS.id] = SXAS;
        currencyCache[TENEBRIS.id] = TENEBRIS;
        currencyCache[TEXCOIN.id] = TEXCOIN;
        currencyCache[Tidals.id] = Tidals;
        currencyCache[TFT.id] = TFT;
        currencyCache[LOYAL.id] = LOYAL;
        currencyCache[TOPS.id] = TOPS;
        currencyCache[TRGL.id] = TRGL;
        currencyCache[TRUZTAR.id] = TRUZTAR;
        currencyCache[TWENTYONE.id] = TWENTYONE;
        currencyCache[UOOMAG.id] = UOOMAG;
        currencyCache[VTN.id] = VTN;
        currencyCache[WTC.id] = WTC;
        currencyCache[XVCA.id] = XVCA;
        currencyCache[ANRYZE.id] = ANRYZE;
        currencyCache[KLX.id] = KLX;
        currencyCache[POST.id] = POST;
        currencyCache[TRY.id] = TRY;
        currencyCache[JDC.id] = JDC;
        currencyCache[Blue.id] = Blue;
        currencyCache[AKCHE.id] = AKCHE;
        currencyCache[TDX.id] = TDX;
        currencyCache[InPay.id] = InPay;
        currencyCache[LIQUID.id] = LIQUID;
        currencyCache[TN.id] = TN;
        currencyCache[ENAN.id] = ENAN;
        currencyCache[ContestCoin.id] = ContestCoin;
        currencyCache[SMQ.id] = SMQ;
    }

    invalidateCache();

    return {
        create: function (data) {
            // if currency data.id is not set - it's a temporary instance
            if (!_.has(data, 'id')) {
                return new Currency(data);
            }

            if (!currencyCache[data.id]) {
                currencyCache[data.id] = new Currency(data);
            }

            return currencyCache[data.id];
        },
        invalidateCache: invalidateCache,
        isCached: isCached,
        MIR: MIR,
        BTC: BTC,
        BCH: BCH,
        ETH: ETH,
        LTC: LTC,
        ZEC: ZEC,
        USD: USD,
        EUR: EUR,
        CNY: CNY,
        WCT: WCT,
        MRT: MRT,
        WGO: WGO,
        INCNT: INCNT,
        RBX: RBX,
        MER: MER,
        BAt: BAt,
        UPC: UPC,
        PROTON: PROTON,
        TKS: TKS,
        WPN: WPN,
        EFYT: EFYT,
        MGO: MGO,
        ETT: ETT,
        ZRC: ZRC,
        PBKX: PBKX,
        PING: PING,
        STAR: STAR,
        BEAR: BEAR,
        DAR: DAR,
        GLIPP: GLIPP,
        mTNT: mTNT,
        BKT: BKT,
        WGR: WGR,
        PBT: PBT,
        PPIO: PPIO,
        STA: STA,
        CORE: CORE,
        KSS: KSS,
        WFN: WFN,
        GRPH: GRPH,
        ESC: ESC,
        AGRO: AGRO,
        KING: KING,
        ARNA: ARNA,
        WNET: WNET,
        PBK: PBK,
        TOM: TOM,
        ViC: ViC,
        EQ: EQ,
        SHDW: SHDW,
        GIN: GIN,
        NEWS: NEWS,
        COXST: COXST,
        SMR: SMR,
        RDT: RDT,
        IRA: IRA,
        _2B4T: _2B4T,
        MBX: MBX,
        KNOWS: KNOWS,
        MBI: MBI,
        COF: COF,
        CHILL: CHILL,
        KUN: KUN,
        CEIT: CEIT,
        SGIT: SGIT,
        AHT: AHT,
        HALAL: HALAL,
        DIMO: DIMO,
        WIN: WIN,
        YTB: YTB,
        GFL: GFL,
        DAT: DAT,
        VK: VK,
        UWT: UWT,
        AP_0: AP_0,
        AP_1: AP_1,
        AP_2: AP_2,
        OCL: OCL,
        OCC: OCC,
        SMART: SMART,
        DCN: DCN,
        RSC: RSC,
        LIKE: LIKE,
        FUPOOF: FUPOOF,
        ANY: ANY,
        BRW: BRW,
        CNX: CNX,
        DARF: DARF,
        WNT: WNT,
        CWV: CWV,
        WCASH: WCASH,
        LIFE: LIFE,
        RDCR: RDCR,
        THNX: THNX,
        IKV: IKV,
        WDESK: WDESK,
        SUR: SUR,
        SIBERIA: SIBERIA,
        MODO: MODO,
        GIVE: GIVE,
        SOL: SOL,
        EOT: EOT,
        FIX: FIX,
        KKO: KKO,
        JNT: JNT,
        CGT: CGT,
        AFFT: AFFT,
        MFL: MFL,
        TURTL: TURTL,
        PropX: PropX,
        ECT: ECT,
        STT: STT,
        SCLRI: SCLRI,
        Knish: Knish,
        WPC: WPC,
        cryptoSterling: cryptoSterling,
        NGN: NGN,
        ALTOCAR: ALTOCAR,
        ANAT: ANAT,
        ATKN: ATKN,
        ATOM: ATOM,
        BAR: BAR,
        BCF: BCF,
        BET: BET,
        BIRTAL: BIRTAL,
        BITCHEKE: BITCHEKE,
        BITD: BITD,
        BKC: BKC,
        CROW: CROW,
        CBT: CBT,
        EDEN: EDEN,
        EQUA: EQUA,
        EQUILD: EQUILD,
        ETERP: ETERP,
        FENIX: FENIX,
        FTB: FTB,
        FLEX: FLEX,
        FNX: FNX,
        GBC: GBC,
        Grant: Grant,
        GrantsBounty: GrantsBounty,
        HEART: HEART,
        HOME: HOME,
        HTC: HTC,
        IMMO: IMMO,
        JNET: JNET,
        KRIP: KRIP,
        LLA: LLA,
        limburg: limburg,
        LIVEBIT: LIVEBIT,
        MED: MED,
        MNG: MNG,
        MMBT: MMBT,
        MPST: MPST,
        MFS: MFS,
        MCS: MCS,
        NICNAC: NICNAC,
        NUTS: NUTS,
        OCTANOX: OCTANOX,
        P2P: P2P,
        preNEX: preNEX,
        preVITO: preVITO,
        PRIMO: PRIMO,
        PYTI: PYTI,
        PUMP: PUMP,
        QUASA: QUASA,
        REDFISH: REDFISH,
        RMOB: RMOB,
        RXSC: RXSC,
        SEBEUM: SEBEUM,
        SGCN: SGCN,
        SHEEP: SHEEP,
        SGT: SGT,
        SQUASH: SQUASH,
        SRE: SRE,
        STYLO: STYLO,
        SXAS: SXAS,
        TENEBRIS: TENEBRIS,
        TEXCOIN: TEXCOIN,
        Tidals: Tidals,
        TFT: TFT,
        LOYAL: LOYAL,
        TOPS: TOPS,
        TRGL: TRGL,
        TRUZTAR: TRUZTAR,
        TWENTYONE: TWENTYONE,
        UOOMAG: UOOMAG,
        VTN: VTN,
        WTC: WTC,
        XVCA: XVCA,
        ANRYZE: ANRYZE,
        KLX: KLX,
        POST: POST,
        TRY: TRY,
        JDC: JDC,
        Blue: Blue,
        AKCHE: AKCHE,
        TDX: TDX,
        InPay: InPay,
        LIQUID: LIQUID,
        TN: TN,
        ENAN: ENAN,
        ContestCoin: ContestCoin,
        SMQ: SMQ,
        DASH: DASH
    };
})();

var Money = function(amount, currency) {
    var DECIMAL_SEPARATOR = '.';
    var THOUSANDS_SEPARATOR = ',';

    if (amount === undefined)
        throw Error('Amount is required');

    if (currency === undefined)
        throw Error('Currency is required');

    this.amount = new Decimal(amount)
        .toDecimalPlaces(currency.precision, Decimal.ROUND_FLOOR);
    this.currency = currency;

    var integerPart = function (value) {
        return value.trunc();
    };

    var fractionPart = function (value) {
        return value.minus(integerPart(value));
    };

    var format = function (value) {
        return value.toFixed(currency.precision, currency.roundingMode);
    };

    var validateCurrency = function (expected, actual) {
        if (expected.id !== actual.id)
            throw new Error('Currencies must be the same for operands. Expected: ' +
                expected.displayName + '; Actual: ' + actual.displayName);
    };

    var fromTokensToCoins = function (valueInTokens, currencyPrecision) {
        return valueInTokens.mul(Math.pow(10, currencyPrecision)).trunc();
    };

    var fromCoinsToTokens = function (valueInCoins, currencyPrecision) {
        return valueInCoins.trunc().div(Math.pow(10, currencyPrecision));
    };

    // in 2016 Safari doesn't support toLocaleString()
    // that's why we need this method
    var formatWithThousandsSeparator = function (formattedAmount) {
        var parts = formattedAmount.split(DECIMAL_SEPARATOR);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

        return parts.join(DECIMAL_SEPARATOR);
    };

    this.formatAmount = function (stripZeroes, useThousandsSeparator) {
        var result = stripZeroes ?
            this.toTokens().toFixed(this.amount.decimalPlaces()) :
            format(this.amount);

        return useThousandsSeparator ? formatWithThousandsSeparator(result) : result;
    };

    this.formatIntegerPart = function () {
        return integerPart(this.amount).toFixed(0);
    };

    this.formatFractionPart = function () {
        var valueWithLeadingZero = format(fractionPart(this.amount));

        return valueWithLeadingZero.slice(1); // stripping the leading zero
    };

    this.toTokens = function () {
        var result = fromCoinsToTokens(fromTokensToCoins(this.amount, this.currency.precision),
            this.currency.precision);

        return result.toNumber();
    };

    this.toCoins = function () {
        return fromTokensToCoins(this.amount, this.currency.precision).toNumber();
    };

    this.plus = function (money) {
        validateCurrency(this.currency, money.currency);

        return new Money(this.amount.plus(money.amount), this.currency);
    };

    this.minus = function (money) {
        validateCurrency(this.currency, money.currency);

        return new Money(this.amount.minus(money.amount), this.currency);
    };

    this.greaterThan = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.greaterThan(other.amount);
    };

    this.greaterThanOrEqualTo = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.greaterThanOrEqualTo(other.amount);
    };

    this.lessThan = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.lessThan(other.amount);
    };

    this.lessThanOrEqualTo = function (other) {
        validateCurrency(this.currency, other.currency);

        return this.amount.lessThanOrEqualTo(other.amount);
    };

    this.multiply = function (multiplier) {
        if (!_.isNumber(multiplier))
            throw new Error('Number is expected');

        if (isNaN(multiplier))
            throw new Error('Multiplication by NaN is not supported');

        return new Money(this.amount.mul(multiplier), this.currency);
    };

    this.toString = function () {
        return this.formatAmount(false, true) + ' ' + this.currency.toString();
    };

    return this;
};

Money.fromTokens = function (amount, currency) {
    return new Money(amount, currency);
};

Money.fromCoins = function (amount, currency) {
    currency = currency || {};
    if (currency.precision === undefined)
        throw new Error('A valid currency must be provided');

    amount = new Decimal(amount);
    amount = amount.div(Math.pow(10, currency.precision));

    return new Money(amount, currency);
};

// set up decimal to format 0.00000001 as is instead of 1e-8
Decimal.config({toExpNeg: -(Currency.MIR.precision + 1)});


(function() {
    'use strict';

    angular.module('waves.core', [
        'waves.core.services',
        'waves.core.constants',
        'waves.core.filter',
        'waves.core.directives'
    ]);
})();

(function() {
    'use strict';

    angular
        .module('waves.core.constants', [])
        .constant('constants.network', {
            NETWORK_NAME: 'devel', // 'devnet', 'testnet', 'mainnet'
            ADDRESS_VERSION: 1,
            NETWORK_CODE: 'T',
            INITIAL_NONCE: 0
        });

    angular
        .module('waves.core.constants')
        .constant('constants.address', {
            RAW_ADDRESS_LENGTH : 35,
            ADDRESS_PREFIX: '1W',
            MAINNET_ADDRESS_REGEXP: /^[a-zA-Z0-9]{35}$/
        });

    angular
        .module('waves.core.constants')
        .constant('constants.features', {
            ALIAS_VERSION: 2
        });

    angular
        .module('waves.core.constants')
        .constant('constants.ui', {
            MINIMUM_PAYMENT_AMOUNT : 1e-8,
            MINIMUM_TRANSACTION_FEE : 0.001,
            AMOUNT_DECIMAL_PLACES : 8,
            JAVA_MAX_LONG: 9223372036854775807,
            MAXIMUM_ATTACHMENT_BYTE_SIZE: 140
        });

    angular
        .module('waves.core.constants')
        .constant('constants.transactions', {
            PAYMENT_TRANSACTION_TYPE : 2,
            ASSET_ISSUE_TRANSACTION_TYPE: 3,
            ASSET_TRANSFER_TRANSACTION_TYPE: 4,
            ASSET_REISSUE_TRANSACTION_TYPE: 5,
            ASSET_BURN_TRANSACTION_TYPE: 6,
            EXCHANGE_TRANSACTION_TYPE: 7,
            START_LEASING_TRANSACTION_TYPE: 8,
            CANCEL_LEASING_TRANSACTION_TYPE: 9,
            CREATE_ALIAS_TRANSACTION_TYPE: 10,
            MASS_PAYMENT_TRANSACTION_TYPE: 11
        });
})();

(function () {
    'use strict';
    angular.module('waves.core.directives', []);
})();

(function() {
    'use strict';

    angular.module('waves.core.services', ['waves.core', 'restangular'])
        .config(function () {
            if (!String.prototype.startsWith) {
                Object.defineProperty(String.prototype, 'startsWith', {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: function(searchString, position) {
                        position = position || 0;
                        return this.lastIndexOf(searchString, position) === position;
                    }
                });
            }

            if (typeof String.prototype.endsWith !== 'function') {
                String.prototype.endsWith = function(suffix) {
                    return this.indexOf(suffix, this.length - suffix.length) !== -1;
                };
            }
        });
})();

/**
 * @author BjÃ¶rn Wenzel
 */
(function () {
    'use strict';
    angular.module('waves.core.filter', []);
})();

//https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md
(function() {
    'use strict';

    angular
        .module('waves.core.services')
        .constant('wordList', [
            'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse', 'access',
            'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act', 'action',
            'actor', 'actress', 'actual', 'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
            'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent', 'agree', 'ahead', 'aim', 'air',
            'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert', 'alien', 'all', 'alley', 'allow', 'almost',
            'alone', 'alpha', 'already', 'also', 'alter', 'always', 'amateur', 'amazing', 'among', 'amount', 'amused',
            'analyst', 'anchor', 'ancient', 'anger', 'angle', 'angry', 'animal', 'ankle', 'announce', 'annual',
            'another', 'answer', 'antenna', 'antique', 'anxiety', 'any', 'apart', 'apology', 'appear', 'apple',
            'approve', 'april', 'arch', 'arctic', 'area', 'arena', 'argue', 'arm', 'armed', 'armor', 'army', 'around',
            'arrange', 'arrest', 'arrive', 'arrow', 'art', 'artefact', 'artist', 'artwork', 'ask', 'aspect', 'assault',
            'asset', 'assist', 'assume', 'asthma', 'athlete', 'atom', 'attack', 'attend', 'attitude', 'attract',
            'auction', 'audit', 'august', 'aunt', 'author', 'auto', 'autumn', 'average', 'avocado', 'avoid', 'awake',
            'aware', 'away', 'awesome', 'awful', 'awkward', 'axis', 'baby', 'bachelor', 'bacon', 'badge', 'bag',
            'balance', 'balcony', 'ball', 'bamboo', 'banana', 'banner', 'bar', 'barely', 'bargain', 'barrel', 'base',
            'basic', 'basket', 'battle', 'beach', 'bean', 'beauty', 'because', 'become', 'beef', 'before', 'begin',
            'behave', 'behind', 'believe', 'below', 'belt', 'bench', 'benefit', 'best', 'betray', 'better', 'between',
            'beyond', 'bicycle', 'bid', 'bike', 'bind', 'biology', 'bird', 'birth', 'bitter', 'black', 'blade', 'blame',
            'blanket', 'blast', 'bleak', 'bless', 'blind', 'blood', 'blossom', 'blouse', 'blue', 'blur', 'blush',
            'board', 'boat', 'body', 'boil', 'bomb', 'bone', 'bonus', 'book', 'boost', 'border', 'boring', 'borrow',
            'boss', 'bottom', 'bounce', 'box', 'boy', 'bracket', 'brain', 'brand', 'brass', 'brave', 'bread', 'breeze',
            'brick', 'bridge', 'brief', 'bright', 'bring', 'brisk', 'broccoli', 'broken', 'bronze', 'broom', 'brother',
            'brown', 'brush', 'bubble', 'buddy', 'budget', 'buffalo', 'build', 'bulb', 'bulk', 'bullet', 'bundle',
            'bunker', 'burden', 'burger', 'burst', 'bus', 'business', 'busy', 'butter', 'buyer', 'buzz', 'cabbage',
            'cabin', 'cable', 'cactus', 'cage', 'cake', 'call', 'calm', 'camera', 'camp', 'can', 'canal', 'cancel',
            'candy', 'cannon', 'canoe', 'canvas', 'canyon', 'capable', 'capital', 'captain', 'car', 'carbon', 'card',
            'cargo', 'carpet', 'carry', 'cart', 'case', 'cash', 'casino', 'castle', 'casual', 'cat', 'catalog', 'catch',
            'category', 'cattle', 'caught', 'cause', 'caution', 'cave', 'ceiling', 'celery', 'cement', 'census',
            'century', 'cereal', 'certain', 'chair', 'chalk', 'champion', 'change', 'chaos', 'chapter', 'charge',
            'chase', 'chat', 'cheap', 'check', 'cheese', 'chef', 'cherry', 'chest', 'chicken', 'chief', 'child',
            'chimney', 'choice', 'choose', 'chronic', 'chuckle', 'chunk', 'churn', 'cigar', 'cinnamon', 'circle',
            'citizen', 'city', 'civil', 'claim', 'clap', 'clarify', 'claw', 'clay', 'clean', 'clerk', 'clever', 'click',
            'client', 'cliff', 'climb', 'clinic', 'clip', 'clock', 'clog', 'close', 'cloth', 'cloud', 'clown', 'club',
            'clump', 'cluster', 'clutch', 'coach', 'coast', 'coconut', 'code', 'coffee', 'coil', 'coin', 'collect',
            'color', 'column', 'combine', 'come', 'comfort', 'comic', 'common', 'company', 'concert', 'conduct',
            'confirm', 'congress', 'connect', 'consider', 'control', 'convince', 'cook', 'cool', 'copper', 'copy',
            'coral', 'core', 'corn', 'correct', 'cost', 'cotton', 'couch', 'country', 'couple', 'course', 'cousin',
            'cover', 'coyote', 'crack', 'cradle', 'craft', 'cram', 'crane', 'crash', 'crater', 'crawl', 'crazy',
            'cream', 'credit', 'creek', 'crew', 'cricket', 'crime', 'crisp', 'critic', 'crop', 'cross', 'crouch',
            'crowd', 'crucial', 'cruel', 'cruise', 'crumble', 'crunch', 'crush', 'cry', 'crystal', 'cube', 'culture',
            'cup', 'cupboard', 'curious', 'current', 'curtain', 'curve', 'cushion', 'custom', 'cute', 'cycle', 'dad',
            'damage', 'damp', 'dance', 'danger', 'daring', 'dash', 'daughter', 'dawn', 'day', 'deal', 'debate',
            'debris', 'decade', 'december', 'decide', 'decline', 'decorate', 'decrease', 'deer', 'defense', 'define',
            'defy', 'degree', 'delay', 'deliver', 'demand', 'demise', 'denial', 'dentist', 'deny', 'depart', 'depend',
            'deposit', 'depth', 'deputy', 'derive', 'describe', 'desert', 'design', 'desk', 'despair', 'destroy',
            'detail', 'detect', 'develop', 'device', 'devote', 'diagram', 'dial', 'diamond', 'diary', 'dice', 'diesel',
            'diet', 'differ', 'digital', 'dignity', 'dilemma', 'dinner', 'dinosaur', 'direct', 'dirt', 'disagree',
            'discover', 'disease', 'dish', 'dismiss', 'disorder', 'display', 'distance', 'divert', 'divide', 'divorce',
            'dizzy', 'doctor', 'document', 'dog', 'doll', 'dolphin', 'domain', 'donate', 'donkey', 'donor', 'door',
            'dose', 'double', 'dove', 'draft', 'dragon', 'drama', 'drastic', 'draw', 'dream', 'dress', 'drift', 'drill',
            'drink', 'drip', 'drive', 'drop', 'drum', 'dry', 'duck', 'dumb', 'dune', 'during', 'dust', 'dutch', 'duty',
            'dwarf', 'dynamic', 'eager', 'eagle', 'early', 'earn', 'earth', 'easily', 'east', 'easy', 'echo', 'ecology',
            'economy', 'edge', 'edit', 'educate', 'effort', 'egg', 'eight', 'either', 'elbow', 'elder', 'electric',
            'elegant', 'element', 'elephant', 'elevator', 'elite', 'else', 'embark', 'embody', 'embrace', 'emerge',
            'emotion', 'employ', 'empower', 'empty', 'enable', 'enact', 'end', 'endless', 'endorse', 'enemy', 'energy',
            'enforce', 'engage', 'engine', 'enhance', 'enjoy', 'enlist', 'enough', 'enrich', 'enroll', 'ensure',
            'enter', 'entire', 'entry', 'envelope', 'episode', 'equal', 'equip', 'era', 'erase', 'erode', 'erosion',
            'error', 'erupt', 'escape', 'essay', 'essence', 'estate', 'eternal', 'ethics', 'evidence', 'evil', 'evoke',
            'evolve', 'exact', 'example', 'excess', 'exchange', 'excite', 'exclude', 'excuse', 'execute', 'exercise',
            'exhaust', 'exhibit', 'exile', 'exist', 'exit', 'exotic', 'expand', 'expect', 'expire', 'explain', 'expose',
            'express', 'extend', 'extra', 'eye', 'eyebrow', 'fabric', 'face', 'faculty', 'fade', 'faint', 'faith',
            'fall', 'false', 'fame', 'family', 'famous', 'fan', 'fancy', 'fantasy', 'farm', 'fashion', 'fat', 'fatal',
            'father', 'fatigue', 'fault', 'favorite', 'feature', 'february', 'federal', 'fee', 'feed', 'feel', 'female',
            'fence', 'festival', 'fetch', 'fever', 'few', 'fiber', 'fiction', 'field', 'figure', 'file', 'film',
            'filter', 'final', 'find', 'fine', 'finger', 'finish', 'fire', 'firm', 'first', 'fiscal', 'fish', 'fit',
            'fitness', 'fix', 'flag', 'flame', 'flash', 'flat', 'flavor', 'flee', 'flight', 'flip', 'float', 'flock',
            'floor', 'flower', 'fluid', 'flush', 'fly', 'foam', 'focus', 'fog', 'foil', 'fold', 'follow', 'food',
            'foot', 'force', 'forest', 'forget', 'fork', 'fortune', 'forum', 'forward', 'fossil', 'foster', 'found',
            'fox', 'fragile', 'frame', 'frequent', 'fresh', 'friend', 'fringe', 'frog', 'front', 'frost', 'frown',
            'frozen', 'fruit', 'fuel', 'fun', 'funny', 'furnace', 'fury', 'future', 'gadget', 'gain', 'galaxy',
            'gallery', 'game', 'gap', 'garage', 'garbage', 'garden', 'garlic', 'garment', 'gas', 'gasp', 'gate',
            'gather', 'gauge', 'gaze', 'general', 'genius', 'genre', 'gentle', 'genuine', 'gesture', 'ghost', 'giant',
            'gift', 'giggle', 'ginger', 'giraffe', 'girl', 'give', 'glad', 'glance', 'glare', 'glass', 'glide',
            'glimpse', 'globe', 'gloom', 'glory', 'glove', 'glow', 'glue', 'goat', 'goddess', 'gold', 'good', 'goose',
            'gorilla', 'gospel', 'gossip', 'govern', 'gown', 'grab', 'grace', 'grain', 'grant', 'grape', 'grass',
            'gravity', 'great', 'green', 'grid', 'grief', 'grit', 'grocery', 'group', 'grow', 'grunt', 'guard', 'guess',
            'guide', 'guilt', 'guitar', 'gun', 'gym', 'habit', 'hair', 'half', 'hammer', 'hamster', 'hand', 'happy',
            'harbor', 'hard', 'harsh', 'harvest', 'hat', 'have', 'hawk', 'hazard', 'head', 'health', 'heart', 'heavy',
            'hedgehog', 'height', 'hello', 'helmet', 'help', 'hen', 'hero', 'hidden', 'high', 'hill', 'hint', 'hip',
            'hire', 'history', 'hobby', 'hockey', 'hold', 'hole', 'holiday', 'hollow', 'home', 'honey', 'hood', 'hope',
            'horn', 'horror', 'horse', 'hospital', 'host', 'hotel', 'hour', 'hover', 'hub', 'huge', 'human', 'humble',
            'humor', 'hundred', 'hungry', 'hunt', 'hurdle', 'hurry', 'hurt', 'husband', 'hybrid', 'ice', 'icon', 'idea',
            'identify', 'idle', 'ignore', 'ill', 'illegal', 'illness', 'image', 'imitate', 'immense', 'immune',
            'impact', 'impose', 'improve', 'impulse', 'inch', 'include', 'income', 'increase', 'index', 'indicate',
            'indoor', 'industry', 'infant', 'inflict', 'inform', 'inhale', 'inherit', 'initial', 'inject', 'injury',
            'inmate', 'inner', 'innocent', 'input', 'inquiry', 'insane', 'insect', 'inside', 'inspire', 'install',
            'intact', 'interest', 'into', 'invest', 'invite', 'involve', 'iron', 'island', 'isolate', 'issue', 'item',
            'ivory', 'jacket', 'jaguar', 'jar', 'jazz', 'jealous', 'jeans', 'jelly', 'jewel', 'job', 'join', 'joke',
            'journey', 'joy', 'judge', 'juice', 'jump', 'jungle', 'junior', 'junk', 'just', 'kangaroo', 'keen', 'keep',
            'ketchup', 'key', 'kick', 'kid', 'kidney', 'kind', 'kingdom', 'kiss', 'kit', 'kitchen', 'kite', 'kitten',
            'kiwi', 'knee', 'knife', 'knock', 'know', 'lab', 'label', 'labor', 'ladder', 'lady', 'lake', 'lamp',
            'language', 'laptop', 'large', 'later', 'latin', 'laugh', 'laundry', 'lava', 'law', 'lawn', 'lawsuit',
            'layer', 'lazy', 'leader', 'leaf', 'learn', 'leave', 'lecture', 'left', 'leg', 'legal', 'legend', 'leisure',
            'lemon', 'lend', 'length', 'lens', 'leopard', 'lesson', 'letter', 'level', 'liar', 'liberty', 'library',
            'license', 'life', 'lift', 'light', 'like', 'limb', 'limit', 'link', 'lion', 'liquid', 'list', 'little',
            'live', 'lizard', 'load', 'loan', 'lobster', 'local', 'lock', 'logic', 'lonely', 'long', 'loop', 'lottery',
            'loud', 'lounge', 'love', 'loyal', 'lucky', 'luggage', 'lumber', 'lunar', 'lunch', 'luxury', 'lyrics',
            'machine', 'mad', 'magic', 'magnet', 'maid', 'mail', 'main', 'major', 'make', 'mammal', 'man', 'manage',
            'mandate', 'mango', 'mansion', 'manual', 'maple', 'marble', 'march', 'margin', 'marine', 'market',
            'marriage', 'mask', 'mass', 'master', 'match', 'material', 'math', 'matrix', 'matter', 'maximum', 'maze',
            'meadow', 'mean', 'measure', 'meat', 'mechanic', 'medal', 'media', 'melody', 'melt', 'member', 'memory',
            'mention', 'menu', 'mercy', 'merge', 'merit', 'merry', 'mesh', 'message', 'metal', 'method', 'middle',
            'midnight', 'milk', 'million', 'mimic', 'mind', 'minimum', 'minor', 'minute', 'miracle', 'mirror', 'misery',
            'miss', 'mistake', 'mix', 'mixed', 'mixture', 'mobile', 'model', 'modify', 'mom', 'moment', 'monitor',
            'monkey', 'monster', 'month', 'moon', 'moral', 'more', 'morning', 'mosquito', 'mother', 'motion', 'motor',
            'mountain', 'mouse', 'move', 'movie', 'much', 'muffin', 'mule', 'multiply', 'muscle', 'museum', 'mushroom',
            'music', 'must', 'mutual', 'myself', 'mystery', 'myth', 'naive', 'name', 'napkin', 'narrow', 'nasty',
            'nation', 'nature', 'near', 'neck', 'need', 'negative', 'neglect', 'neither', 'nephew', 'nerve', 'nest',
            'net', 'network', 'neutral', 'never', 'news', 'next', 'nice', 'night', 'noble', 'noise', 'nominee',
            'noodle', 'normal', 'north', 'nose', 'notable', 'note', 'nothing', 'notice', 'novel', 'now', 'nuclear',
            'number', 'nurse', 'nut', 'oak', 'obey', 'object', 'oblige', 'obscure', 'observe', 'obtain', 'obvious',
            'occur', 'ocean', 'october', 'odor', 'off', 'offer', 'office', 'often', 'oil', 'okay', 'old', 'olive',
            'olympic', 'omit', 'once', 'one', 'onion', 'online', 'only', 'open', 'opera', 'opinion', 'oppose',
            'option', 'orange', 'orbit', 'orchard', 'order', 'ordinary', 'organ', 'orient', 'original', 'orphan',
            'ostrich', 'other', 'outdoor', 'outer', 'output', 'outside', 'oval', 'oven', 'over', 'own', 'owner',
            'oxygen', 'oyster', 'ozone', 'pact', 'paddle', 'page', 'pair', 'palace', 'palm', 'panda', 'panel', 'panic',
            'panther', 'paper', 'parade', 'parent', 'park', 'parrot', 'party', 'pass', 'patch', 'path', 'patient',
            'patrol', 'pattern', 'pause', 'pave', 'payment', 'peace', 'peanut', 'pear', 'peasant', 'pelican', 'pen',
            'penalty', 'pencil', 'people', 'pepper', 'perfect', 'permit', 'person', 'pet', 'phone', 'photo', 'phrase',
            'physical', 'piano', 'picnic', 'picture', 'piece', 'pig', 'pigeon', 'pill', 'pilot', 'pink', 'pioneer',
            'pipe', 'pistol', 'pitch', 'pizza', 'place', 'planet', 'plastic', 'plate', 'play', 'please', 'pledge',
            'pluck', 'plug', 'plunge', 'poem', 'poet', 'point', 'polar', 'pole', 'police', 'pond', 'pony', 'pool',
            'popular', 'portion', 'position', 'possible', 'post', 'potato', 'pottery', 'poverty', 'powder', 'power',
            'practice', 'praise', 'predict', 'prefer', 'prepare', 'present', 'pretty', 'prevent', 'price', 'pride',
            'primary', 'print', 'priority', 'prison', 'private', 'prize', 'problem', 'process', 'produce', 'profit',
            'program', 'project', 'promote', 'proof', 'property', 'prosper', 'protect', 'proud', 'provide', 'public',
            'pudding', 'pull', 'pulp', 'pulse', 'pumpkin', 'punch', 'pupil', 'puppy', 'purchase', 'purity', 'purpose',
            'purse', 'push', 'put', 'puzzle', 'pyramid', 'quality', 'quantum', 'quarter', 'question', 'quick', 'quit',
            'quiz', 'quote', 'rabbit', 'raccoon', 'race', 'rack', 'radar', 'radio', 'rail', 'rain', 'raise', 'rally',
            'ramp', 'ranch', 'random', 'range', 'rapid', 'rare', 'rate', 'rather', 'raven', 'raw', 'razor', 'ready',
            'real', 'reason', 'rebel', 'rebuild', 'recall', 'receive', 'recipe', 'record', 'recycle', 'reduce',
            'reflect', 'reform', 'refuse', 'region', 'regret', 'regular', 'reject', 'relax', 'release', 'relief',
            'rely', 'remain', 'remember', 'remind', 'remove', 'render', 'renew', 'rent', 'reopen', 'repair', 'repeat',
            'replace', 'report', 'require', 'rescue', 'resemble', 'resist', 'resource', 'response', 'result', 'retire',
            'retreat', 'return', 'reunion', 'reveal', 'review', 'reward', 'rhythm', 'rib', 'ribbon', 'rice', 'rich',
            'ride', 'ridge', 'rifle', 'right', 'rigid', 'ring', 'riot', 'ripple', 'risk', 'ritual', 'rival', 'river',
            'road', 'roast', 'robot', 'robust', 'rocket', 'romance', 'roof', 'rookie', 'room', 'rose', 'rotate',
            'rough', 'round', 'route', 'royal', 'rubber', 'rude', 'rug', 'rule', 'run', 'runway', 'rural', 'sad',
            'saddle', 'sadness', 'safe', 'sail', 'salad', 'salmon', 'salon', 'salt', 'salute', 'same', 'sample', 'sand',
            'satisfy', 'satoshi', 'sauce', 'sausage', 'save', 'say', 'scale', 'scan', 'scare', 'scatter', 'scene',
            'scheme', 'school', 'science', 'scissors', 'scorpion', 'scout', 'scrap', 'screen', 'script', 'scrub', 'sea',
            'search', 'season', 'seat', 'second', 'secret', 'section', 'security', 'seed', 'seek', 'segment', 'select',
            'sell', 'seminar', 'senior', 'sense', 'sentence', 'series', 'service', 'session', 'settle', 'setup',
            'seven', 'shadow', 'shaft', 'shallow', 'share', 'shed', 'shell', 'sheriff', 'shield', 'shift', 'shine',
            'ship', 'shiver', 'shock', 'shoe', 'shoot', 'shop', 'short', 'shoulder', 'shove', 'shrimp', 'shrug',
            'shuffle', 'shy', 'sibling', 'sick', 'side', 'siege', 'sight', 'sign', 'silent', 'silk', 'silly', 'silver',
            'similar', 'simple', 'since', 'sing', 'siren', 'sister', 'situate', 'six', 'size', 'skate', 'sketch', 'ski',
            'skill', 'skin', 'skirt', 'skull', 'slab', 'slam', 'sleep', 'slender', 'slice', 'slide', 'slight', 'slim',
            'slogan', 'slot', 'slow', 'slush', 'small', 'smart', 'smile', 'smoke', 'smooth', 'snack', 'snake', 'snap',
            'sniff', 'snow', 'soap', 'soccer', 'social', 'sock', 'soda', 'soft', 'solar', 'soldier', 'solid',
            'solution', 'solve', 'someone', 'song', 'soon', 'sorry', 'sort', 'soul', 'sound', 'soup', 'source', 'south',
            'space', 'spare', 'spatial', 'spawn', 'speak', 'special', 'speed', 'spell', 'spend', 'sphere', 'spice',
            'spider', 'spike', 'spin', 'spirit', 'split', 'spoil', 'sponsor', 'spoon', 'sport', 'spot', 'spray',
            'spread', 'spring', 'spy', 'square', 'squeeze', 'squirrel', 'stable', 'stadium', 'staff', 'stage', 'stairs',
            'stamp', 'stand', 'start', 'state', 'stay', 'steak', 'steel', 'stem', 'step', 'stereo', 'stick', 'still',
            'sting', 'stock', 'stomach', 'stone', 'stool', 'story', 'stove', 'strategy', 'street', 'strike', 'strong',
            'struggle', 'student', 'stuff', 'stumble', 'style', 'subject', 'submit', 'subway', 'success', 'such',
            'sudden', 'suffer', 'sugar', 'suggest', 'suit', 'summer', 'sun', 'sunny', 'sunset', 'super', 'supply',
            'supreme', 'sure', 'surface', 'surge', 'surprise', 'surround', 'survey', 'suspect', 'sustain', 'swallow',
            'swamp', 'swap', 'swarm', 'swear', 'sweet', 'swift', 'swim', 'swing', 'switch', 'sword', 'symbol',
            'symptom', 'syrup', 'system', 'table', 'tackle', 'tag', 'tail', 'talent', 'talk', 'tank', 'tape', 'target',
            'task', 'taste', 'tattoo', 'taxi', 'teach', 'team', 'tell', 'ten', 'tenant', 'tennis', 'tent', 'term',
            'test', 'text', 'thank', 'that', 'theme', 'then', 'theory', 'there', 'they', 'thing', 'this', 'thought',
            'three', 'thrive', 'throw', 'thumb', 'thunder', 'ticket', 'tide', 'tiger', 'tilt', 'timber', 'time', 'tiny',
            'tip', 'tired', 'tissue', 'title', 'toast', 'tobacco', 'today', 'toddler', 'toe', 'together', 'toilet',
            'token', 'tomato', 'tomorrow', 'tone', 'tongue', 'tonight', 'tool', 'tooth', 'top', 'topic', 'topple',
            'torch', 'tornado', 'tortoise', 'toss', 'total', 'tourist', 'toward', 'tower', 'town', 'toy', 'track',
            'trade', 'traffic', 'tragic', 'train', 'transfer', 'trap', 'trash', 'travel', 'tray', 'treat', 'tree',
            'trend', 'trial', 'tribe', 'trick', 'trigger', 'trim', 'trip', 'trophy', 'trouble', 'truck', 'true',
            'truly', 'trumpet', 'trust', 'truth', 'try', 'tube', 'tuition', 'tumble', 'tuna', 'tunnel', 'turkey',
            'turn', 'turtle', 'twelve', 'twenty', 'twice', 'twin', 'twist', 'two', 'type', 'typical', 'ugly',
            'umbrella', 'unable', 'unaware', 'uncle', 'uncover', 'under', 'undo', 'unfair', 'unfold', 'unhappy',
            'uniform', 'unique', 'unit', 'universe', 'unknown', 'unlock', 'until', 'unusual', 'unveil', 'update',
            'upgrade', 'uphold', 'upon', 'upper', 'upset', 'urban', 'urge', 'usage', 'use', 'used', 'useful', 'useless',
            'usual', 'utility', 'vacant', 'vacuum', 'vague', 'valid', 'valley', 'valve', 'van', 'vanish', 'vapor',
            'various', 'vast', 'vault', 'vehicle', 'velvet', 'vendor', 'venture', 'venue', 'verb', 'verify', 'version',
            'very', 'vessel', 'veteran', 'viable', 'vibrant', 'vicious', 'victory', 'video', 'view', 'village',
            'vintage', 'violin', 'virtual', 'virus', 'visa', 'visit', 'visual', 'vital', 'vivid', 'vocal', 'voice',
            'void', 'volcano', 'volume', 'vote', 'voyage', 'wage', 'wagon', 'wait', 'walk', 'wall', 'walnut', 'want',
            'warfare', 'warm', 'warrior', 'wash', 'wasp', 'waste', 'water', 'wave', 'way', 'wealth', 'weapon', 'wear',
            'weasel', 'weather', 'web', 'wedding', 'weekend', 'weird', 'welcome', 'west', 'wet', 'whale', 'what',
            'wheat', 'wheel', 'when', 'where', 'whip', 'whisper', 'wide', 'width', 'wife', 'wild', 'will', 'win',
            'window', 'wine', 'wing', 'wink', 'winner', 'winter', 'wire', 'wisdom', 'wise', 'wish', 'witness', 'wolf',
            'woman', 'wonder', 'wood', 'wool', 'word', 'work', 'world', 'worry', 'worth', 'wrap', 'wreck', 'wrestle',
            'wrist', 'write', 'wrong', 'yard', 'year', 'yellow', 'you', 'young', 'youth', 'zebra', 'zero', 'zone', 'zoo'
        ]);
})();

(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('passPhraseService', ['wordList', '$window', function (wordList, $window) {
            this.generate = function () {
                var crypto = $window.crypto || $window.msCrypto;
                var bits = 160;
                var wordCount = wordList.length;
                var log2FromWordCount = Math.log(wordCount) / Math.log(2);
                var wordsInPassPhrase = Math.ceil(bits / log2FromWordCount);
                var random = new Uint16Array(wordsInPassPhrase);
                var passPhrase;

                crypto.getRandomValues(random);

                var i = 0,
                    index,
                    words = [];

                for (; i < wordsInPassPhrase; i++) {
                    index = random[i] % wordCount;
                    words.push(wordList[index]);
                }

                passPhrase = words.join(' ');

                crypto.getRandomValues(random);

                return passPhrase;
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('accountService', ['storageService', '$q', function (storageService, $q) {
            var stateCache;

            function removeByIndex(state, index) {
                state.accounts.splice(index, 1);

                return state;
            }

            function getState() {
                if (angular.isUndefined(stateCache)) {
                    return storageService.loadState().then(function (state) {
                        state = state || {};
                        if (!state.accounts)
                            state.accounts = [];

                        stateCache = state;

                        return stateCache;
                    });
                }

                return $q.when(stateCache);
            }

            this.addAccount = function (accountInfo) {
                return getState()
                    .then(function (state) {
                        state.accounts.push(accountInfo);

                        return state;
                    })
                    .then(storageService.saveState);
            };

            this.removeAccountByIndex = function (index) {
                return getState()
                    .then(function (state) {
                        return removeByIndex(state, index);
                    })
                    .then(storageService.saveState);
            };

            this.removeAccount = function (account) {
                return getState()
                    .then(function (state) {
                        var index = _.findIndex(state.accounts, {
                            address: account.address
                        });
                        return removeByIndex(state, index);
                    })
                    .then(storageService.saveState);
            };

            this.getAccounts = function () {
                return getState()
                    .then(function (state) {
                        return state.accounts;
                    });
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('addressService', ['constants.address', function (constants) {
            this.cleanupOptionalPrefix = function(displayAddress) {
                if (displayAddress.length <= 30) {
                    // Don't change aliases
                    return displayAddress;
                }

                var address = displayAddress,
                    prefixLen = constants.ADDRESS_PREFIX.length;

                if (address.length > constants.RAW_ADDRESS_LENGTH || address.startsWith(constants.ADDRESS_PREFIX)) {
                    address = address.substr(prefixLen, address.length - prefixLen);
                }

                return address;
            };

            this.validateAddress = function(address) {
                var cleanAddress = this.cleanupOptionalPrefix(address);
                return constants.MAINNET_ADDRESS_REGEXP.test(cleanAddress);
            };
        }]);
})();

/**
 * @requires {blake2b-256.js}
 * @requires {Base58.js}
 */
(function() {
    'use strict';

    angular
        .module('waves.core.services')
        .service('cryptoService', ['constants.network', '$window', function(constants, window) {

            // private version of getNetworkId byte in order to avoid circular dependency
            // between cryptoService and utilityService
            var getNetworkIdByte = function() {
                return constants.NETWORK_CODE.charCodeAt(0) & 0xFF;
            };

            var appendUint8Arrays = function(array1, array2) {
                var tmp = new Uint8Array(array1.length + array2.length);
                tmp.set(array1, 0);
                tmp.set(array2, array1.length);
                return tmp;
            };

            var appendNonce = function (originalSeed) {
                // change this is when nonce increment gets introduced
                var nonce = new Uint8Array(converters.int32ToBytes(constants.INITIAL_NONCE, true));

                return appendUint8Arrays(nonce, originalSeed);
            };

            // sha256 accepts messageBytes as Uint8Array or Array
            var sha256 = function (message) {
                var bytes;
                if (typeof(message) == 'string')
                    bytes = converters.stringToByteArray(message);
                else
                    bytes = message;

                var wordArray = converters.byteArrayToWordArrayEx(new Uint8Array(bytes));
                var resultWordArray = CryptoJS.SHA256(wordArray);

                return converters.wordArrayToByteArrayEx(resultWordArray);
            };

            var prepareKey = function (key) {
                var rounds = 1000;
                var digest = key;
                for (var i = 0; i < rounds; i++) {
                    digest = converters.byteArrayToHexString(sha256(digest));
                }

                return digest;
            };

            // blake2b 256 hash function
            this.blake2b = function (input) {
                return blake2b(input, null, 32);
            };

            // keccak 256 hash algorithm
            this.keccak = function(messageBytes) {
                // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                return keccak_256.array(messageBytes);
                // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
            };

            this.sha256 = sha256;

            this.hashChain = function(noncedSecretPhraseBytes) {
                return this.keccak(this.blake2b(new Uint8Array(noncedSecretPhraseBytes)));
            };

            // Base68 encoding/decoding implementation
            this.base58 = {
                encode: function (buffer) {
                    return Base58.encode(buffer);
                },
                decode: function (string) {
                    return Base58.decode(string);
                }
            };

            this.buildAccountSeedHash = function(seedBytes) {
                var data = appendNonce(seedBytes);
                var seedHash = this.hashChain(data);

                return sha256(Array.prototype.slice.call(seedHash));
            };

            this.buildKeyPair = function(seedBytes) {
                var accountSeedHash = this.buildAccountSeedHash(seedBytes);
                var p = axlsign.generateKeyPair(accountSeedHash);

                return {
                    public: this.base58.encode(p.public),
                    private: this.base58.encode(p.private)
                };
            };

            this.buildPublicKey = function (seedBytes) {
                return this.buildKeyPair(seedBytes).public;
            };

            this.buildPrivateKey = function (seedBytes) {
                return this.buildKeyPair(seedBytes).private;
            };

            this.buildRawAddress = function (encodedPublicKey) {
                var publicKey = this.base58.decode(encodedPublicKey);
                var publicKeyHash = this.hashChain(publicKey);

                var prefix = new Uint8Array(2);
                prefix[0] = constants.ADDRESS_VERSION;
                prefix[1] = getNetworkIdByte();

                var unhashedAddress = appendUint8Arrays(prefix, publicKeyHash.slice(0, 20));
                var addressHash = this.hashChain(unhashedAddress).slice(0, 4);

                return this.base58.encode(appendUint8Arrays(unhashedAddress, addressHash));
            };

            this.buildRawAddressFromSeed = function (secretPhrase) {
                var publicKey = this.getPublicKey(secretPhrase);

                return this.buildRawAddress(publicKey);
            };

            //Returns publicKey built from string
            this.getPublicKey = function(secretPhrase) {
                return this.buildPublicKey(converters.stringToByteArray(secretPhrase));
            };

            //Returns privateKey built from string
            this.getPrivateKey = function(secretPhrase) {
                return this.buildPrivateKey(converters.stringToByteArray(secretPhrase));
            };

            //Returns key pair built from string
            this.getKeyPair = function (secretPhrase) {
                return this.buildKeyPair(converters.stringToByteArray(secretPhrase));
            };

            // function accepts buffer with private key and an array with dataToSign
            // returns buffer with signed data
            // 64 randoms bytes are added to the signature
            // method falls back to deterministic signatures if crypto object is not supported
            this.nonDeterministicSign = function(privateKey, dataToSign) {
                var crypto = window.crypto || window.msCrypto;
                var random;
                if (crypto) {
                    random = new Uint8Array(64);
                    crypto.getRandomValues(random);
                }

                var signature = axlsign.sign(privateKey, new Uint8Array(dataToSign), random);

                return this.base58.encode(signature);
            };

            // function accepts buffer with private key and an array with dataToSign
            // returns buffer with signed data
            this.deterministicSign = function(privateKey, dataToSign) {
                var signature = axlsign.sign(privateKey, new Uint8Array(dataToSign));

                return this.base58.encode(signature);
            };

            this.verify = function(senderPublicKey, dataToSign, signatureBytes) {
                return axlsign.verify(senderPublicKey, dataToSign, signatureBytes);
            };

            // function returns base58 encoded shared key from base58 encoded a private
            // and b public keys
            this.getSharedKey = function (aEncodedPrivateKey, bEncodedPublicKey) {
                var aPrivateKey = this.base58.decode(aEncodedPrivateKey);
                var bPublicKey = this.base58.decode(bEncodedPublicKey);
                var sharedKey = axlsign.sharedKey(aPrivateKey, bPublicKey);

                return this.base58.encode(sharedKey);
            };

            // function can be used for sharedKey preparation, as recommended in: https://github.com/wavesplatform/curve25519-js
            this.prepareKey = function (key) {
                return prepareKey(key);
            };

            this.encryptWalletSeed = function (seed, key) {
                var aesKey = prepareKey(key);

                return CryptoJS.AES.encrypt(seed, aesKey);
            };

            this.decryptWalletSeed = function (cipher, key, checksum) {
                var aesKey = prepareKey(key);
                var data = CryptoJS.AES.decrypt(cipher, aesKey);

                var actualChecksum = this.seedChecksum(converters.hexStringToByteArray(data.toString()));
                if (actualChecksum === checksum)
                    return converters.hexStringToString(data.toString());
                else
                    return false;
            };

            this.seedChecksum = function (seed) {
                return converters.byteArrayToHexString(sha256(seed));
            };
        }]);
})();

(function () {
    'use strict';

    function AssetService(signService, validateService, utilityService, cryptoService) {
        function buildId(transactionBytes) {
            var hash = cryptoService.blake2b(new Uint8Array(transactionBytes));
            return cryptoService.base58.encode(hash);
        }

        function buildCreateAssetSignatureData (asset, tokensQuantity, senderPublicKey) {
            return [].concat(
                signService.getAssetIssueTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAssetNameBytes(asset.name),
                signService.getAssetDescriptionBytes(asset.description),
                signService.getAssetQuantityBytes(tokensQuantity),
                signService.getAssetDecimalPlacesBytes(asset.decimalPlaces),
                signService.getAssetIsReissuableBytes(asset.reissuable),
                signService.getFeeBytes(asset.fee.toCoins()),
                signService.getTimestampBytes(asset.time)
            );
        }

        this.createAssetIssueTransaction = function (asset, sender) {
            validateService.validateAssetIssue(asset);
            validateService.validateSender(sender);

            asset.time = asset.time || utilityService.getTime();
            asset.reissuable = angular.isDefined(asset.reissuable) ? asset.reissuable : false;
            asset.description = asset.description || '';

            var assetCurrency = Currency.create({
                displayName: asset.name,
                precision: asset.decimalPlaces
            });

            var tokens = new Money(asset.totalTokens, assetCurrency);
            var signatureData = buildCreateAssetSignatureData(asset, tokens.toCoins(), sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                id: buildId(signatureData),
                name: asset.name,
                description: asset.description,
                quantity: tokens.toCoins(),
                decimals: Number(asset.decimalPlaces),
                reissuable: asset.reissuable,
                timestamp: asset.time,
                fee: asset.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };

        function buildCreateAssetTransferSignatureData(transfer, senderPublicKey) {
            return [].concat(
                signService.getAssetTransferTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAssetIdBytes(transfer.amount.currency.id),
                signService.getFeeAssetIdBytes(transfer.fee.currency.id),
                signService.getTimestampBytes(transfer.time),
                signService.getAmountBytes(transfer.amount.toCoins()),
                signService.getFeeBytes(transfer.fee.toCoins()),
                signService.getRecipientBytes(transfer.recipient),
                signService.getAttachmentBytes(transfer.attachment)
            );
        }

        this.createAssetTransferTransaction = function (transfer, sender) {
            validateService.validateAssetTransfer(transfer);
            validateService.validateSender(sender);

            transfer.time = transfer.time || utilityService.getTime();
            transfer.attachment = transfer.attachment || [];
            transfer.recipient = utilityService.resolveAddressOrAlias(transfer.recipient);

            var signatureData = buildCreateAssetTransferSignatureData(transfer, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                id: buildId(signatureData),
                recipient: transfer.recipient,
                timestamp: transfer.time,
                assetId: transfer.amount.currency.id,
                amount: transfer.amount.toCoins(),
                fee: transfer.fee.toCoins(),
                feeAssetId: transfer.fee.currency.id,
                senderPublicKey: sender.publicKey,
                signature: signature,
                attachment: cryptoService.base58.encode(transfer.attachment)
            };
        };

        function buildCreateAssetReissueSignatureData(reissue, senderPublicKey) {
            return [].concat(
                signService.getAssetReissueTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAssetIdBytes(reissue.totalTokens.currency.id, true),
                signService.getAssetQuantityBytes(reissue.totalTokens.toCoins()),
                signService.getAssetIsReissuableBytes(reissue.reissuable),
                signService.getFeeBytes(reissue.fee.toCoins()),
                signService.getTimestampBytes(reissue.time)
            );
        }

        this.createAssetReissueTransaction = function (reissue, sender) {
            validateService.validateAssetReissue(reissue);
            validateService.validateSender(sender);

            reissue.reissuable = angular.isDefined(reissue.reissuable) ? reissue.reissuable : false;
            reissue.time = reissue.time || utilityService.getTime();

            var signatureData = buildCreateAssetReissueSignatureData(reissue, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                id: buildId(signatureData),
                assetId: reissue.totalTokens.currency.id,
                quantity: reissue.totalTokens.toCoins(),
                reissuable: reissue.reissuable,
                timestamp: reissue.time,
                fee: reissue.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };
    }

    AssetService.$inject = ['signService', 'validateService', 'utilityService', 'cryptoService'];

    angular
        .module('waves.core.services')
        .service('assetService', AssetService);
})();

(function () {
    'use strict';

    function AliasRequestService(signService, utilityService, validateService) {
        function buildCreateAliasSignatureData (alias, senderPublicKey) {
            return [].concat(
                signService.getCreateAliasTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getAliasBytes(alias.alias),
                signService.getFeeBytes(alias.fee.toCoins()),
                signService.getTimestampBytes(alias.time)
            );
        }

        this.buildCreateAliasRequest = function (alias, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            alias.time = alias.time || currentTimeMillis;

            var signatureData = buildCreateAliasSignatureData(alias, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                alias: alias.alias,
                timestamp: alias.time,
                fee: alias.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };
    }

    AliasRequestService.$inject = ['signService', 'utilityService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('aliasRequestService', AliasRequestService);
})();

(function () {
    'use strict';

    function LeasingRequestService(signService, utilityService, validateService) {
        function buildStartLeasingSignatureData (startLeasing, senderPublicKey) {
            return [].concat(
                signService.getStartLeasingTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getRecipientBytes(startLeasing.recipient),
                signService.getAmountBytes(startLeasing.amount.toCoins()),
                signService.getFeeBytes(startLeasing.fee.toCoins()),
                signService.getTimestampBytes(startLeasing.time)
            );
        }

        this.buildStartLeasingRequest = function (startLeasing, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            startLeasing.time = startLeasing.time || currentTimeMillis;
            startLeasing.recipient = utilityService.resolveAddressOrAlias(startLeasing.recipient);

            var signatureData = buildStartLeasingSignatureData(startLeasing, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                recipient: startLeasing.recipient,
                amount: startLeasing.amount.toCoins(),
                timestamp: startLeasing.time,
                fee: startLeasing.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };

        function buildCancelLeasingSignatureData (cancelLeasing, senderPublicKey) {
            return [].concat(
                signService.getCancelLeasingTxTypeBytes(),
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getFeeBytes(cancelLeasing.fee.toCoins()),
                signService.getTimestampBytes(cancelLeasing.time),
                signService.getTransactionIdBytes(cancelLeasing.startLeasingTransactionId)
            );
        }

        this.buildCancelLeasingRequest = function (cancelLeasing, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            cancelLeasing.time = cancelLeasing.time || currentTimeMillis;

            var signatureData = buildCancelLeasingSignatureData(cancelLeasing, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                txId: cancelLeasing.startLeasingTransactionId,
                timestamp: cancelLeasing.time,
                fee: cancelLeasing.fee.toCoins(),
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };
    }

    LeasingRequestService.$inject = ['signService', 'utilityService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('leasingRequestService', LeasingRequestService);
})();

(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('apiService', ['Restangular', 'cryptoService', function (rest, cryptoService) {
            var blocksApi = rest.all('blocks');

            this.blocks = {
                height: function() {
                    return blocksApi.get('height');
                },
                last: function() {
                    return blocksApi.get('last');
                },
                list: function (startHeight, endHeight) {
                    return blocksApi.one('seq', startHeight).all(endHeight).getList();
                }
            };

            var addressApi = rest.all('addresses');
            var consensusApi = rest.all('consensus');
            this.address = {
                balance: function (address) {
                    return addressApi.one('balance', address).get();
                },
                effectiveBalance: function (address) {
                    return addressApi.one('effectiveBalance', address).get();
                },
                generatingBalance: function (address) {
                    return consensusApi.one('generatingbalance', address).get();
                }
            };

            var transactionApi = rest.all('transactions');

            var request;
            var timer;
            this.transactions = {
                unconfirmed: function () {
                    if (!request) {
                        request = transactionApi.all('unconfirmed').getList();
                    } else {
                        if (!timer) {
                            timer = setTimeout(function () {
                                request = transactionApi.all('unconfirmed').getList();
                                request.finally(function () {
                                    timer = null;
                                });
                            }, 10000);
                        }
                    }
                    return request;
                },
                list: function (address, max) {
                    max = max || 50;
                    return transactionApi.one('address', address).one('limit', max).getList();
                },
                info: function (transactionId) {
                    return transactionApi.one('info', transactionId).get();
                }
            };

            var leasingApi = rest.all('leasing').all('broadcast');
            this.leasing = {
                lease: function (signedStartLeasingTransaction) {
                    return leasingApi.all('lease').post(signedStartLeasingTransaction);
                },
                cancel: function (signedCancelLeasingTransaction) {
                    return leasingApi.all('cancel').post(signedCancelLeasingTransaction);
                }
            };

            var aliasApi = rest.all('alias');
            this.alias = {
                create: function (signedCreateAliasTransaction) {
                    return aliasApi.all('broadcast').all('create').post(signedCreateAliasTransaction);
                },
                getByAddress: function (address) {
                    return aliasApi.all('by-address').get(address).then(function (response) {
                        return response.map(function (alias) {
                            return alias.slice(8);
                        });
                    });
                }
            };

            var assetApi = rest.all('assets');
            var assetBroadcastApi = assetApi.all('broadcast');
            this.assets = {
                balance: function (address, assetId) {
                    var rest = assetApi.all('balance');
                    if (assetId)
                        return rest.all(address).get(assetId);
                    else
                        return rest.get(address);
                },
                issue: function (signedAssetIssueTransaction) {
                    return assetBroadcastApi.all('issue').post(signedAssetIssueTransaction);
                },
                reissue: function (signedAssetReissueTransaction) {
                    return assetBroadcastApi.all('reissue').post(signedAssetReissueTransaction);
                },
                transfer: function (signedAssetTransferTransaction) {
                    return assetBroadcastApi.all('transfer').post(signedAssetTransferTransaction);
                },
                massPay: function (signedTransactions) {
                    return assetBroadcastApi.all('batch-transfer').post(signedTransactions);
                },
                makeAssetNameUnique: function (signedMakeAssetNameUniqueTransaction) {
                    return assetApi
                        .all('broadcast')
                        .all('make-asset-name-unique')
                        .post(signedMakeAssetNameUniqueTransaction);
                },
                isUniqueName: function (assetName) {
                    assetName = cryptoService.base58.encode(converters.stringToByteArray(assetName));
                    return assetApi
                        .all('asset-id-by-unique-name')
                        .get(assetName)
                        .then(function (response) {
                            // FIXME : temporary fix for the API format
                            if (typeof response !== 'object') {
                                response = {assetId: response};
                            }

                            return response.assetId;
                        });
                }
            };
        }]);
})();

(function () {
    'use strict';

    var BASE58_REGEX = new RegExp('^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{0,}$');

    angular
        .module('waves.core.services')
        .service('utilityService', ['constants.network', 'cryptoService', function (constants, cryptoService) {
            var self = this;

            self.getNetworkIdByte = function () {
                return constants.NETWORK_CODE.charCodeAt(0) & 0xFF;
            };

            // long to big-endian bytes
            self.longToByteArray = function (value) {
                var bytes = new Array(7);
                for (var k = 7; k >= 0; k--) {
                    bytes[k] = value & (255);
                    value = value / 256;
                }

                return bytes;
            };

            // short to big-endian bytes
            self.shortToByteArray = function (value) {
                return converters.int16ToBytes(value, true);
            };

            self.base58StringToByteArray = function (base58String) {
                var decoded = cryptoService.base58.decode(base58String);
                var result = [];
                for (var i = 0; i < decoded.length; ++i) {
                    result.push(decoded[i] & 0xff);
                }

                return result;
            };

            self.stringToByteArrayWithSize = function (string) {
                var bytes = converters.stringToByteArray(string);
                return self.byteArrayWithSize(bytes);
            };

            self.byteArrayWithSize = function (byteArray) {
                var result = self.shortToByteArray(byteArray.length);
                return result.concat(byteArray);
            };

            self.booleanToBytes = function (flag) {
                return flag ? [1] : [0];
            };

            self.endsWithWhitespace = function (value) {
                return /\s+$/g.test(value);
            };

            self.getTime = function() {
                return Date.now();
            };

            self.isValidBase58String = function (input) {
                return BASE58_REGEX.test(input);
            };

            // Add a prefix in case of alias
            self.resolveAddressOrAlias = function (string) {
                if (string.length <= 30) {
                    return 'alias:' + constants.NETWORK_CODE + ':' + string;
                } else {
                    return string;
                }
            };
        }]);
})();

(function() {
    'use strict';

    angular
        .module('waves.core.services')
        .service('chromeStorageService', ['$q', function ($q) {
            var $key = 'WavesAccounts';
            var self = this;

            self.saveState = function (state) {
                var deferred = $q.defer();
                var json = {};
                json[$key] = state;

                chrome.storage.local.set(json, function () {
                    deferred.resolve();
                });

                return deferred.promise;
            };

            self.loadState = function () {
                var deferred = $q.defer();

                self.loadSyncState().then(function (syncState) {
                    if (syncState) {
                        self.saveState(syncState)
                            .then(function () {
                                return self.clearSyncState();
                            })
                            .then(function () {
                                deferred.resolve(syncState);
                            });
                    } else {
                        chrome.storage.local.get($key, function (data) {
                            deferred.resolve(data[$key]);
                        });
                    }
                });

                return deferred.promise;
            };

            self.loadSyncState = function () {
                var deferred = $q.defer();

                chrome.storage.sync.get($key, function (data) {
                    deferred.resolve(data[$key]);
                });

                return deferred.promise;
            };

            self.clearSyncState = function () {
                var deferred = $q.defer();

                chrome.storage.sync.clear(function () {
                    deferred.resolve();
                });

                return deferred.promise;
            };
        }]);
})();

(function() {
    'use strict';

    angular
        .module('waves.core.services')
        .service('html5StorageService', ['constants.network', '$window', '$q', function(constants, window, $q) {
            if (angular.isUndefined(constants.NETWORK_NAME))
                throw new Error('Network name hasn\'t been configured');

            var $key = 'Mir' + constants.NETWORK_NAME;

            this.saveState = function(state) {
                var serialized = angular.toJson(state);

                window.localStorage.setItem($key, serialized);

                return $q.when();
            };

            this.loadState = function() {
                var data;
                var serialized = window.localStorage.getItem($key);

                if (serialized) {
                    data = angular.fromJson(serialized);
                }

                return $q.when(data);
            };

            this.clear = function() {
                window.localStorage.removeItem($key);

                return $q.when();
            };
        }]);
})();

(function() {
    'use strict';

    var STORAGE_STRUCTURE_VERSION = 1;

    angular
        .module('waves.core.services')
        .provider('storageService', [function () {
            function getStorageVersion () {
                return STORAGE_STRUCTURE_VERSION;
            }

            function isLocalStorageEnabled(window) {
                var storage, fail, uid;
                try {
                    uid = String(new Date());
                    (storage = window.localStorage).setItem(uid, uid);
                    fail = storage.getItem(uid) != uid;
                    if (!fail)
                        storage.removeItem(uid);
                    else
                        storage = false;
                }
                catch (exception) {
                }
                return storage;
            }

            this.$get = ['$window', 'chromeStorageService', 'html5StorageService',
                function($window, chromeStorageService, html5StorageService) {
                    var result = isLocalStorageEnabled($window) ? html5StorageService : chromeStorageService;
                    result.getStorageVersion = getStorageVersion;

                    return result;
                }];
        }]);
})();

(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('formattingService', ['$window', '$filter', function (window, $filter) {

            var LOCALE_DATE_FORMATS = {
                'ar-SA': 'dd/MM/yy',
                'bg-BG': 'dd.M.yyyy',
                'ca-ES': 'dd/MM/yyyy',
                'zh-TW': 'yyyy/M/d',
                'cs-CZ': 'd.M.yyyy',
                'da-DK': 'dd-MM-yyyy',
                'de-DE': 'dd.MM.yyyy',
                'el-GR': 'd/M/yyyy',
                'en-US': 'M/d/yyyy',
                'fi-FI': 'd.M.yyyy',
                'fr-FR': 'dd/MM/yyyy',
                'he-IL': 'dd/MM/yyyy',
                'hu-HU': 'yyyy. MM. dd.',
                'is-IS': 'd.M.yyyy',
                'it-IT': 'dd/MM/yyyy',
                'ja-JP': 'yyyy/MM/dd',
                'ko-KR': 'yyyy-MM-dd',
                'nl-NL': 'd-M-yyyy',
                'nb-NO': 'dd.MM.yyyy',
                'pl-PL': 'yyyy-MM-dd',
                'pt-BR': 'd/M/yyyy',
                'ro-RO': 'dd.MM.yyyy',
                'ru-RU': 'dd.MM.yyyy',
                'hr-HR': 'd.M.yyyy',
                'sk-SK': 'd. M. yyyy',
                'sq-AL': 'yyyy-MM-dd',
                'sv-SE': 'yyyy-MM-dd',
                'th-TH': 'd/M/yyyy',
                'tr-TR': 'dd.MM.yyyy',
                'ur-PK': 'dd/MM/yyyy',
                'id-ID': 'dd/MM/yyyy',
                'uk-UA': 'dd.MM.yyyy',
                'be-BY': 'dd.MM.yyyy',
                'sl-SI': 'd.M.yyyy',
                'et-EE': 'd.MM.yyyy',
                'lv-LV': 'yyyy.MM.dd.',
                'lt-LT': 'yyyy.MM.dd',
                'fa-IR': 'MM/dd/yyyy',
                'vi-VN': 'dd/MM/yyyy',
                'hy-AM': 'dd.MM.yyyy',
                'az-Latn-AZ': 'dd.MM.yyyy',
                'eu-ES': 'yyyy/MM/dd',
                'mk-MK': 'dd.MM.yyyy',
                'af-ZA': 'yyyy/MM/dd',
                'ka-GE': 'dd.MM.yyyy',
                'fo-FO': 'dd-MM-yyyy',
                'hi-IN': 'dd-MM-yyyy',
                'ms-MY': 'dd/MM/yyyy',
                'kk-KZ': 'dd.MM.yyyy',
                'ky-KG': 'dd.MM.yy',
                'sw-KE': 'M/d/yyyy',
                'uz-Latn-UZ': 'dd/MM yyyy',
                'tt-RU': 'dd.MM.yyyy',
                'pa-IN': 'dd-MM-yy',
                'gu-IN': 'dd-MM-yy',
                'ta-IN': 'dd-MM-yyyy',
                'te-IN': 'dd-MM-yy',
                'kn-IN': 'dd-MM-yy',
                'mr-IN': 'dd-MM-yyyy',
                'sa-IN': 'dd-MM-yyyy',
                'mn-MN': 'yy.MM.dd',
                'gl-ES': 'dd/MM/yy',
                'kok-IN': 'dd-MM-yyyy',
                'syr-SY': 'dd/MM/yyyy',
                'dv-MV': 'dd/MM/yy',
                'ar-IQ': 'dd/MM/yyyy',
                'zh-CN': 'yyyy/M/d',
                'de-CH': 'dd.MM.yyyy',
                'en-GB': 'dd/MM/yyyy',
                'es-MX': 'dd/MM/yyyy',
                'fr-BE': 'd/MM/yyyy',
                'it-CH': 'dd.MM.yyyy',
                'nl-BE': 'd/MM/yyyy',
                'nn-NO': 'dd.MM.yyyy',
                'pt-PT': 'dd-MM-yyyy',
                'sr-Latn-CS': 'd.M.yyyy',
                'sv-FI': 'd.M.yyyy',
                'az-Cyrl-AZ': 'dd.MM.yyyy',
                'ms-BN': 'dd/MM/yyyy',
                'uz-Cyrl-UZ': 'dd.MM.yyyy',
                'ar-EG': 'dd/MM/yyyy',
                'zh-HK': 'd/M/yyyy',
                'de-AT': 'dd.MM.yyyy',
                'en-AU': 'd/MM/yyyy',
                'es-ES': 'dd/MM/yyyy',
                'fr-CA': 'yyyy-MM-dd',
                'sr-Cyrl-CS': 'd.M.yyyy',
                'ar-LY': 'dd/MM/yyyy',
                'zh-SG': 'd/M/yyyy',
                'de-LU': 'dd.MM.yyyy',
                'en-CA': 'dd/MM/yyyy',
                'es-GT': 'dd/MM/yyyy',
                'fr-CH': 'dd.MM.yyyy',
                'ar-DZ': 'dd-MM-yyyy',
                'zh-MO': 'd/M/yyyy',
                'de-LI': 'dd.MM.yyyy',
                'en-NZ': 'd/MM/yyyy',
                'es-CR': 'dd/MM/yyyy',
                'fr-LU': 'dd/MM/yyyy',
                'ar-MA': 'dd-MM-yyyy',
                'en-IE': 'dd/MM/yyyy',
                'es-PA': 'MM/dd/yyyy',
                'fr-MC': 'dd/MM/yyyy',
                'ar-TN': 'dd-MM-yyyy',
                'en-ZA': 'yyyy/MM/dd',
                'es-DO': 'dd/MM/yyyy',
                'ar-OM': 'dd/MM/yyyy',
                'en-JM': 'dd/MM/yyyy',
                'es-VE': 'dd/MM/yyyy',
                'ar-YE': 'dd/MM/yyyy',
                'en-029': 'MM/dd/yyyy',
                'es-CO': 'dd/MM/yyyy',
                'ar-SY': 'dd/MM/yyyy',
                'en-BZ': 'dd/MM/yyyy',
                'es-PE': 'dd/MM/yyyy',
                'ar-JO': 'dd/MM/yyyy',
                'en-TT': 'dd/MM/yyyy',
                'es-AR': 'dd/MM/yyyy',
                'ar-LB': 'dd/MM/yyyy',
                'en-ZW': 'M/d/yyyy',
                'es-EC': 'dd/MM/yyyy',
                'ar-KW': 'dd/MM/yyyy',
                'en-PH': 'M/d/yyyy',
                'es-CL': 'dd-MM-yyyy',
                'ar-AE': 'dd/MM/yyyy',
                'es-UY': 'dd/MM/yyyy',
                'ar-BH': 'dd/MM/yyyy',
                'es-PY': 'dd/MM/yyyy',
                'ar-QA': 'dd/MM/yyyy',
                'es-BO': 'dd/MM/yyyy',
                'es-SV': 'dd/MM/yyyy',
                'es-HN': 'dd/MM/yyyy',
                'es-NI': 'dd/MM/yyyy',
                'es-PR': 'dd/MM/yyyy',
                'am-ET': 'd/M/yyyy',
                'tzm-Latn-DZ': 'dd-MM-yyyy',
                'iu-Latn-CA': 'd/MM/yyyy',
                'sma-NO': 'dd.MM.yyyy',
                'mn-Mong-CN': 'yyyy/M/d',
                'gd-GB': 'dd/MM/yyyy',
                'en-MY': 'd/M/yyyy',
                'prs-AF': 'dd/MM/yy',
                'bn-BD': 'dd-MM-yy',
                'wo-SN': 'dd/MM/yyyy',
                'rw-RW': 'M/d/yyyy',
                'qut-GT': 'dd/MM/yyyy',
                'sah-RU': 'MM.dd.yyyy',
                'gsw-FR': 'dd/MM/yyyy',
                'co-FR': 'dd/MM/yyyy',
                'oc-FR': 'dd/MM/yyyy',
                'mi-NZ': 'dd/MM/yyyy',
                'ga-IE': 'dd/MM/yyyy',
                'se-SE': 'yyyy-MM-dd',
                'br-FR': 'dd/MM/yyyy',
                'smn-FI': 'd.M.yyyy',
                'moh-CA': 'M/d/yyyy',
                'arn-CL': 'dd-MM-yyyy',
                'ii-CN': 'yyyy/M/d',
                'dsb-DE': 'd. M. yyyy',
                'ig-NG': 'd/M/yyyy',
                'kl-GL': 'dd-MM-yyyy',
                'lb-LU': 'dd/MM/yyyy',
                'ba-RU': 'dd.MM.yy',
                'nso-ZA': 'yyyy/MM/dd',
                'quz-BO': 'dd/MM/yyyy',
                'yo-NG': 'd/M/yyyy',
                'ha-Latn-NG': 'd/M/yyyy',
                'fil-PH': 'M/d/yyyy',
                'ps-AF': 'dd/MM/yy',
                'fy-NL': 'd-M-yyyy',
                'ne-NP': 'M/d/yyyy',
                'se-NO': 'dd.MM.yyyy',
                'iu-Cans-CA': 'd/M/yyyy',
                'sr-Latn-RS': 'd.M.yyyy',
                'si-LK': 'yyyy-MM-dd',
                'sr-Cyrl-RS': 'd.M.yyyy',
                'lo-LA': 'dd/MM/yyyy',
                'km-KH': 'yyyy-MM-dd',
                'cy-GB': 'dd/MM/yyyy',
                'bo-CN': 'yyyy/M/d',
                'sms-FI': 'd.M.yyyy',
                'as-IN': 'dd-MM-yyyy',
                'ml-IN': 'dd-MM-yy',
                'en-IN': 'dd-MM-yyyy',
                'or-IN': 'dd-MM-yy',
                'bn-IN': 'dd-MM-yy',
                'tk-TM': 'dd.MM.yy',
                'bs-Latn-BA': 'd.M.yyyy',
                'mt-MT': 'dd/MM/yyyy',
                'sr-Cyrl-ME': 'd.M.yyyy',
                'se-FI': 'd.M.yyyy',
                'zu-ZA': 'yyyy/MM/dd',
                'xh-ZA': 'yyyy/MM/dd',
                'tn-ZA': 'yyyy/MM/dd',
                'hsb-DE': 'd. M. yyyy',
                'bs-Cyrl-BA': 'd.M.yyyy',
                'tg-Cyrl-TJ': 'dd.MM.yy',
                'sr-Latn-BA': 'd.M.yyyy',
                'smj-NO': 'dd.MM.yyyy',
                'rm-CH': 'dd/MM/yyyy',
                'smj-SE': 'yyyy-MM-dd',
                'quz-EC': 'dd/MM/yyyy',
                'quz-PE': 'dd/MM/yyyy',
                'hr-BA': 'd.M.yyyy.',
                'sr-Latn-ME': 'd.M.yyyy',
                'sma-SE': 'yyyy-MM-dd',
                'en-SG': 'd/M/yyyy',
                'ug-CN': 'yyyy-M-d',
                'sr-Cyrl-BA': 'd.M.yyyy',
                'es-US': 'M/d/yyyy'
            };

            var LANG = window.navigator.userLanguage || window.navigator.language;
            var LOCALE_DATE_FORMAT = LOCALE_DATE_FORMATS[LANG] || 'dd/MM/yyyy';
            var settings = {
                '24_hour_format': '1'
            };

            this.formatTimestamp = function (timestamp, dateOnly, isAbsoluteTime) {
                var date;
                if (typeof timestamp == 'object') {
                    date = timestamp;
                } else if (isAbsoluteTime) {
                    date = new Date(timestamp);
                } else {
                    date = new Date(timestamp);
                }

                var format = LOCALE_DATE_FORMAT;
                if (!dateOnly) {
                    var timeFormat = 'H:mm:ss';

                    if (settings['24_hour_format'] === '0')
                        timeFormat = 'h:mm:ss a';

                    format += ' ' + timeFormat;
                }

                return $filter('date')(date, format);
            };
        }]);
})();

/**
 * @author BjÃ¶rn Wenzel
 */
(function () {
    'use strict';
    angular.module('waves.core.filter')
        .filter('formatting', ['formattingService', function (formattingService) {
            return function(timestamp, dateOnly) {
                if (angular.isUndefined(dateOnly)) {
                    dateOnly = false;
                }

                return formattingService.formatTimestamp(timestamp, dateOnly);
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('coinomatCurrencyMappingService', [function () {
            function unsupportedCurrency(currency) {
                throw new Error('Unsupported currency: ' + currency.displayName);
            }

            /**
             * Currency codes for Waves Platform
             * @param {Currency} currency
             * @returns {string} currency code
             */
            this.platformCurrencyCode = function (currency) {
                switch (currency.id) {
                    case Currency.BTC.id:
                        return 'WBTC';

                    case Currency.MIR.id:
                        return 'MIR';

                    case Currency.ETH.id:
                        return 'WETH';

                    case Currency.LTC.id:
                        return 'WLTC';

                    case Currency.ZEC.id:
                        return 'WZEC';

                    case Currency.BCH.id:
                        return 'WBCH';
                }

                unsupportedCurrency(currency);
            };

            /**
             * Currency codes for Coinomat gateway
             * @param {Currency} currency
             * @returns {string} currency code
             */
            this.gatewayCurrencyCode = function (currency) {
                switch (currency.id) {
                    case Currency.BTC.id:
                        return 'BTC';

                    case Currency.MIR.id:
                        return 'MIR';

                    case Currency.ETH.id:
                        return 'ETH';

                    case Currency.LTC.id:
                        return 'LTC';

                    case Currency.ZEC.id:
                        return 'ZEC';

                    case Currency.BCH.id:
                        return 'BCH';
                }

                unsupportedCurrency(currency);
            };
        }]);
})();

(function () {
    'use strict';

    var LANGUAGE = 'ru_RU';

    function ensureTunnelCreated(response) {
        if (!response.ok) {
            console.log(response);
            throw new Error('Failed to create tunnel: ' + response.error);
        }
    }

    function ensureTunnelObtained(response) {
        if (!response.tunnel) {
            console.log(response);
            throw new Error('Failed to get tunnel: ' + response.error);
        }
    }

    function CoinomatService(rest, mappingService) {
        var apiRoot = rest.all('api').all('v1');

        /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
        function loadPaymentDetails(currencyCodeFrom, currencyCodeTo, recipientAddress) {
            return apiRoot.get('create_tunnel.php', {
                currency_from: currencyCodeFrom,
                currency_to: currencyCodeTo,
                wallet_to: recipientAddress
            }).then(function (response) {
                ensureTunnelCreated(response);

                return {
                    id: response.tunnel_id,
                    k1: response.k1,
                    k2: response.k2
                };
            }).then(function (tunnel) {
                return apiRoot.get('get_tunnel.php', {
                    xt_id: tunnel.id,
                    k1: tunnel.k1,
                    k2: tunnel.k2,
                    history: 0,
                    lang: LANGUAGE
                });
            }).then(function (response) {
                ensureTunnelObtained(response);

                // here only BTC wallet is returned
                // probably for other currencies more requisites are required
                return {
                    address: response.tunnel.wallet_from,
                    attachment: response.tunnel.attachment
                };
            });
        }
        /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */

        this.getDepositDetails = function (sourceCurrency, targetCurrency, wavesRecipientAddress) {
            var gatewayCurrencyCode = mappingService.gatewayCurrencyCode(sourceCurrency);
            var platformCurrencyCode = mappingService.platformCurrencyCode(targetCurrency);

            return loadPaymentDetails(gatewayCurrencyCode, platformCurrencyCode, wavesRecipientAddress);
        };

        this.getWithdrawDetails = function (currency, recipientAddress) {
            var gatewayCurrencyCode = mappingService.gatewayCurrencyCode(currency);
            var platformCurrencyCode = mappingService.platformCurrencyCode(currency);

            return loadPaymentDetails(platformCurrencyCode, gatewayCurrencyCode, recipientAddress);
        };

        this.getWithdrawRate = function (currency) {
            var gatewayCurrencyCode = mappingService.gatewayCurrencyCode(currency);
            var platformCurrencyCode = mappingService.platformCurrencyCode(currency);

            return apiRoot.get('get_xrate.php', {
                f: platformCurrencyCode,
                t: gatewayCurrencyCode,
                lang: LANGUAGE
            });
        };
    }

    CoinomatService.$inject = ['CoinomatRestangular', 'coinomatCurrencyMappingService'];

    angular
        .module('waves.core.services')
        .service('coinomatService', CoinomatService);
})();

(function () {
    'use strict';

    function CoinomatFiatService(rest, currencyMappingService) {
        var apiRoot = rest.all('api').all('v2').all('indacoin');

        this.getLimits = function (address, fiatCurrency, cryptoCurrency) {
            return apiRoot.get('limits.php', {
                address: address,
                fiat: fiatCurrency,
                crypto: currencyMappingService.gatewayCurrencyCode(cryptoCurrency)
            });
        };

        this.getRate = function (address, fiatAmount, fiatCurrency, cryptoCurrency) {
            return apiRoot.get('rate.php', {
                address: address,
                fiat: fiatCurrency,
                amount: fiatAmount,
                crypto: currencyMappingService.gatewayCurrencyCode(cryptoCurrency)
            });
        };

        this.getMerchantUrl = function (address, fiatAmount, fiatCurrency, cryptoCurrency) {
            return apiRoot.all('buy.php').getRequestedUrl() +
                '?address=' + address +
                '&fiat=' + fiatCurrency +
                '&amount=' + fiatAmount +
                '&crypto=' + currencyMappingService.gatewayCurrencyCode(cryptoCurrency);
        };
    }

    CoinomatFiatService.$inject = ['CoinomatRestangular', 'coinomatCurrencyMappingService'];

    angular
        .module('waves.core.services')
        .service('coinomatFiatService', CoinomatFiatService);
})();

(function () {
    'use strict';

    var MIR_ASSET_ID = 'MIR',
        MIR_PRECISION = 8;

    function denormalizeId(id) {
        return id === MIR_ASSET_ID ? '' : id;
    }

    function normalizeId(id) {
        return id ? id : MIR_ASSET_ID;
    }

    function MatcherApiService(rest, utilityService, cryptoService, validateService) {
        var apiRoot = rest.all('matcher');
        var orderbookRoot = apiRoot.all('orderbook');

        this.createOrder = function (signedOrderRequest) {
            return orderbookRoot.post(signedOrderRequest);
        };

        this.cancelOrder = function (firstAssetId, secondAssetId, signedCancelRequest) {
            return orderbookRoot
                .all(normalizeId(firstAssetId))
                .all(normalizeId(secondAssetId))
                .all('cancel')
                .post(signedCancelRequest);
        };

        this.deleteOrder = function (firstAssetId, secondAssetId, signedCancelRequest) {
            return orderbookRoot
                .all(normalizeId(firstAssetId))
                .all(normalizeId(secondAssetId))
                .all('delete')
                .post(signedCancelRequest);
        };

        this.orderStatus = function (firstAssetId, secondAssetId, orderId) {
            return orderbookRoot
                .all(normalizeId(firstAssetId))
                .all(normalizeId(secondAssetId))
                .get(orderId);
        };

        this.loadMatcherKey = function () {
            return apiRoot.get('');
        };

        this.loadOrderbook = function (firstAssetId, secondAssetId) {
            return orderbookRoot.all(normalizeId(firstAssetId)).get(normalizeId(secondAssetId))
                .then(function (response) {
                    response.pair.amountAsset = denormalizeId(response.pair.amountAsset);
                    response.pair.priceAsset = denormalizeId(response.pair.priceAsset);

                    return response;
                });
        };

        function buildLoadUserOrdersSignature(timestamp, sender) {
            validateService.validateSender(sender);

            var publicKeyBytes = utilityService.base58StringToByteArray(sender.publicKey),
                timestampBytes = utilityService.longToByteArray(timestamp),
                signatureData = [].concat(publicKeyBytes, timestampBytes),

                privateKeyBytes = cryptoService.base58.decode(sender.privateKey);

            return cryptoService.nonDeterministicSign(privateKeyBytes, signatureData);
        }

        this.loadUserOrders = function (amountAsset, priceAsset, sender) {
            var timestamp = Date.now(),
                signature = buildLoadUserOrdersSignature(timestamp, sender);

            return orderbookRoot
                .all(normalizeId(amountAsset))
                .all(normalizeId(priceAsset))
                .all('publicKey')
                .get(sender.publicKey, {}, {
                    Timestamp: timestamp,
                    Signature: signature
                });
        };

        this.loadAllMarkets = function () {
            return orderbookRoot.get('').then(function (response) {
                var pairs = [];
                _.forEach(response.markets, function (market) {
                    var id = normalizeId(market.amountAsset) + '/' + normalizeId(market.priceAsset);
                    var pair = {
                        id: id,
                        amountAssetInfo: market.amountAssetInfo,
                        amountAsset: Currency.create({
                            id: denormalizeId(market.amountAsset),
                            displayName: market.amountAssetName,
                            precision: market.amountAssetInfo ? market.amountAssetInfo.decimals : MIR_PRECISION
                        }),
                        priceAssetInfo: market.priceAssetInfo,
                        priceAsset: Currency.create({
                            id: denormalizeId(market.priceAsset),
                            displayName: market.priceAssetName,
                            precision: market.priceAssetInfo ? market.priceAssetInfo.decimals : MIR_PRECISION
                        }),
                        created: market.created
                    };
                    pairs.push(pair);
                });

                return pairs;
            });
        };

        this.getTradableBalance = function (amountAsset, priceAsset, address) {
            var normAmountAsset = normalizeId(amountAsset),
                normPriceAsset = normalizeId(priceAsset);

            return orderbookRoot
                .all(normAmountAsset)
                .all(normPriceAsset)
                .all('tradableBalance')
                .get(address)
                .then(function (response) {
                    var result = {};
                    result[denormalizeId(normAmountAsset)] = response[normAmountAsset];
                    result[denormalizeId(normPriceAsset)] = response[normPriceAsset];
                    return result;
                });
        };
    }

    MatcherApiService.$inject = ['MatcherRestangular', 'utilityService', 'cryptoService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('matcherApiService', MatcherApiService);
})();

(function () {
    'use strict';

    var MINUTE = 60 * 1000,
        DEFAULT_FRAME = 30,
        DEFAULT_LIMIT = 50;

    function serializeId(id) {
        return id === '' ? 'MIR' : id;
    }

    function DatafeedApiService(rest) {
        var self = this,
            apiRoot = rest.all('api');

        self.getSymbols = function () {
            return apiRoot.get('symbols');
        };

        self.getCandles = function (pair, from, to, frame) {
            frame = frame || DEFAULT_FRAME;
            to = to || Date.now();
            from = from || to - 50 * frame * MINUTE;

            return apiRoot
                .all('candles')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .all(frame)
                .all(from)
                .get(to);
        };

        self.getLastCandles = function (pair, limit, frame) {
            frame = frame || DEFAULT_FRAME;
            limit = limit || DEFAULT_LIMIT;

            return apiRoot
                .all('candles')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .all(frame)
                .get(limit);
        };

        self.getTrades = function (pair, limit) {
            limit = limit || DEFAULT_LIMIT;

            return apiRoot
                .all('trades')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .get(limit);
        };

        self.getTradesByAddress = function (pair, address, limit) {
            limit = limit || DEFAULT_LIMIT;

            return apiRoot
                .all('trades')
                .all(serializeId(pair.amountAsset.id))
                .all(serializeId(pair.priceAsset.id))
                .all(address)
                .get(limit);
        };
    }

    DatafeedApiService.$inject = ['DatafeedRestangular'];

    angular
        .module('waves.core.services')
        .service('datafeedApiService', DatafeedApiService);
})();

(function () {
    'use strict';

    var SELL_ORDER_TYPE = 'sell';

    function MatcherRequestService(signService, utilityService, validateService) {
        function buildCreateOrderSignatureData(order, senderPublicKey) {
            return [].concat(
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getPublicKeyBytes(order.matcherKey),
                signService.getAssetIdBytes(order.price.amountAsset.id),
                signService.getAssetIdBytes(order.price.priceAsset.id),
                signService.getOrderTypeBytes(order.orderType === SELL_ORDER_TYPE),
                signService.getAmountBytes(order.price.toBackendPrice()),
                signService.getAmountBytes(order.amount.toCoins()),
                signService.getTimestampBytes(order.time),
                signService.getTimestampBytes(order.expiration),
                signService.getFeeBytes(order.fee.toCoins())
            );
        }

        this.buildCreateOrderRequest = function (order, sender) {
            validateService.validateSender(sender);

            var currentTimeMillis = utilityService.getTime();
            order.time = order.time || currentTimeMillis;

            var date = new Date(currentTimeMillis);
            order.expiration = order.expiration || date.setDate(date.getDate() + 20);

            var signatureData = buildCreateOrderSignatureData(order, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                orderType: order.orderType,
                assetPair: {
                    amountAsset: order.price.amountAsset.id,
                    priceAsset: order.price.priceAsset.id
                },
                price: order.price.toBackendPrice(),
                amount: order.amount.toCoins(),
                timestamp: order.time,
                expiration: order.expiration,
                matcherFee: order.fee.toCoins(),
                matcherPublicKey: order.matcherKey,
                senderPublicKey: sender.publicKey,
                signature: signature
            };
        };

        function buildCancelOrderSignatureData(orderId, senderPublicKey) {
            return [].concat(
                signService.getPublicKeyBytes(senderPublicKey),
                signService.getOrderIdBytes(orderId)
            );
        }

        this.buildCancelOrderRequest = function (orderId, sender) {
            validateService.validateSender(sender);

            if (!orderId) {
                throw new Error('orderId hasn\'t been set');
            }

            var signatureData = buildCancelOrderSignatureData(orderId, sender.publicKey);
            var signature = signService.buildSignature(signatureData, sender.privateKey);

            return {
                sender: sender.publicKey,
                orderId: orderId,
                signature: signature
            };
        };
    }

    MatcherRequestService.$inject = ['signService', 'utilityService', 'validateService'];

    angular
        .module('waves.core.services')
        .service('matcherRequestService', MatcherRequestService);
})();

var OrderPrice = (function () {

    var MATCHER_SCALE = 1e8;

    function OrderPrice(price, pair) {
        this.amountAsset = pair.amountAsset;
        this.priceAsset = pair.priceAsset;
        this.price = roundToPriceAsset(price, pair);
    }

    OrderPrice.prototype.toTokens = function () {
        return this.price.toNumber();
    };

    OrderPrice.prototype.toCoins = function () {
        return this.toTokens() * Math.pow(10, this.priceAsset.precision - this.amountAsset.precision);
    };

    OrderPrice.prototype.toBackendPrice = function () {
        return Math.round(this.toCoins() * MATCHER_SCALE);
    };

    function roundToPriceAsset(price, pair) {
        return new Decimal(new Decimal(price).toFixed(pair.priceAsset.precision, Decimal.ROUND_FLOOR));
    }

    function normalizePrice(price, pair) {
        return new Decimal(price)
            .div(MATCHER_SCALE)
            .div(Math.pow(10, pair.priceAsset.precision - pair.amountAsset.precision));
    }

    return {
        fromTokens: function (price, pair) {
            return new OrderPrice(price, pair);
        },

        fromBackendPrice: function (price, pair) {
            var normalizedPrice = normalizePrice(price, pair);

            return new OrderPrice(normalizedPrice, pair);
        }
    };
})();

(function () {
    'use strict';

    function SignService(txConstants, featureConstants, cryptoService, utilityService) {
        var self = this;

        // Transaction types

        self.getAssetIssueTxTypeBytes = function () {
            return [txConstants.ASSET_ISSUE_TRANSACTION_TYPE];
        };

        self.getAssetReissueTxTypeBytes = function () {
            return [txConstants.ASSET_REISSUE_TRANSACTION_TYPE];
        };

        self.getAssetTransferTxTypeBytes = function () {
            return [txConstants.ASSET_TRANSFER_TRANSACTION_TYPE];
        };

        self.getStartLeasingTxTypeBytes = function () {
            return [txConstants.START_LEASING_TRANSACTION_TYPE];
        };

        self.getCancelLeasingTxTypeBytes = function () {
            return [txConstants.CANCEL_LEASING_TRANSACTION_TYPE];
        };

        self.getCreateAliasTxTypeBytes = function () {
            return [txConstants.CREATE_ALIAS_TRANSACTION_TYPE];
        };

        // Keys

        self.getPublicKeyBytes = function (publicKey) {
            return utilityService.base58StringToByteArray(publicKey);
        };

        self.getPrivateKeyBytes = function (privateKey) {
            return cryptoService.base58.decode(privateKey);
        };

        // Data fields

        self.getNetworkBytes = function () {
            return [utilityService.getNetworkIdByte()];
        };

        self.getTransactionIdBytes = function (tx) {
            return utilityService.base58StringToByteArray(tx);
        };

        self.getRecipientBytes = function (recipient) {
            if (recipient.slice(0, 6) === 'alias:') {
                return [].concat(
                    [featureConstants.ALIAS_VERSION],
                    [utilityService.getNetworkIdByte()],
                    utilityService.stringToByteArrayWithSize(recipient.slice(8)) // Remove leading 'asset:W:'
                );
            } else {
                return utilityService.base58StringToByteArray(recipient);
            }
        };

        self.getAssetIdBytes = function (assetId, mandatory) {
            if (mandatory) {
                return utilityService.base58StringToByteArray(assetId);
            } else {
                return assetId ? [1].concat(utilityService.base58StringToByteArray(assetId)) : [0];
            }
        };

        self.getAssetNameBytes = function (assetName) {
            return utilityService.stringToByteArrayWithSize(assetName);
        };

        self.getAssetDescriptionBytes = function (assetDescription) {
            return utilityService.stringToByteArrayWithSize(assetDescription);
        };

        self.getAssetQuantityBytes = function (assetQuantity) {
            return utilityService.longToByteArray(assetQuantity);
        };

        self.getAssetDecimalPlacesBytes = function (assetDecimalPlaces) {
            return [assetDecimalPlaces];
        };

        self.getAssetIsReissuableBytes = function (assetIsReissuable) {
            return utilityService.booleanToBytes(assetIsReissuable);
        };

        self.getAmountBytes = function (amount) {
            return utilityService.longToByteArray(amount);
        };

        self.getFeeAssetIdBytes = function (feeAssetId) {
            return self.getAssetIdBytes(feeAssetId);
        };

        self.getFeeBytes = function (fee) {
            return utilityService.longToByteArray(fee);
        };

        self.getTimestampBytes = function (timestamp) {
            return utilityService.longToByteArray(timestamp);
        };

        self.getAttachmentBytes = function (attachment) {
            return utilityService.byteArrayWithSize(attachment);
        };

        self.getAliasBytes = function (alias) {
            return utilityService.byteArrayWithSize([].concat(
                [featureConstants.ALIAS_VERSION],
                [utilityService.getNetworkIdByte()],
                utilityService.stringToByteArrayWithSize(alias)
            ));
        };

        self.getOrderTypeBytes = function (orderType) {
            return utilityService.booleanToBytes(orderType);
        };

        self.getOrderIdBytes = function (orderId) {
            return utilityService.base58StringToByteArray(orderId);
        };

        // Signatures

        self.buildSignature = function (bytes, privateKey) {
            var privateKeyBytes = self.getPrivateKeyBytes(privateKey);
            return cryptoService.nonDeterministicSign(privateKeyBytes, bytes);
        };
    }

    SignService.$inject = ['constants.transactions', 'constants.features', 'cryptoService', 'utilityService'];

    angular
        .module('waves.core.services')
        .service('signService', SignService);
})();

(function () {
    'use strict';

    angular
        .module('waves.core.services')
        .service('validateService', function () {
            var self = this;

            self.validateSender = function (sender) {
                if (!sender) {
                    throw new Error('Sender hasn\'t been set');
                }

                if (!sender.publicKey) {
                    throw new Error('Sender account public key hasn\'t been set');
                }

                if (!sender.privateKey) {
                    throw new Error('Sender account private key hasn\'t been set');
                }
            };

            self.validateAssetIssue = function (issue) {
                if (angular.isUndefined(issue.name)) {
                    throw new Error('Asset name hasn\'t been set');
                }

                if (angular.isUndefined(issue.totalTokens)) {
                    throw new Error('Total tokens amount hasn\'t been set');
                }

                if (angular.isUndefined(issue.decimalPlaces)) {
                    throw new Error('Token decimal places amount hasn\'t been set');
                }

                if (issue.fee.currency !== Currency.MIR) {
                    throw new Error('Transaction fee must be nominated in Mir');
                }
            };

            self.validateAssetTransfer = function (transfer) {
                if (angular.isUndefined(transfer.recipient)) {
                    throw new Error('Recipient account hasn\'t been set');
                }

                if (angular.isUndefined(transfer.fee)) {
                    throw new Error('Transaction fee hasn\'t been set');
                }

                if (angular.isUndefined(transfer.amount)) {
                    throw new Error('Transaction amount hasn\'t been set');
                }
            };

            self.validateAssetReissue = function (reissue) {
                if (reissue.totalTokens.currency === Currency.MIR) {
                    throw new Error('Reissuing Mir is not allowed.');
                }

                if (angular.isUndefined(reissue.totalTokens)) {
                    throw new Error('Total tokens amount hasn\'t been set');
                }

                if (angular.isUndefined(reissue.fee)) {
                    throw new Error('Transaction fee hasn\'t been set');
                }

                if (reissue.fee.currency !== Currency.MIR) {
                    throw new Error('Transaction fee must be nominated in Mir');
                }
            };
        });
})();

(function() {
    'use strict';

    angular
        .module('app.ui', [])
        .constant('ui.events', {
            SPLASH_COMPLETED: 'splash-completed',
            LOGIN_SUCCESSFUL: 'login-successful',
            LEASING_CANCEL: 'leasing-cancel'
        });

    angular
        .module('app.ui')
        // actual values are set in the application config phase
        .constant('constants.application', {
            CLIENT_VERSION: '',
            NODE_ADDRESS: '',
            COINOMAT_ADDRESS: ''
        });
})();

(function () {
    'use strict';

    angular
        .module('app.ui')
        .service('utilsService', ['constants.network', function (networkConstants) {
            this.isTestnet = function () {
                return networkConstants.NETWORK_NAME === 'devel' || networkConstants.NETWORK_NAME === 'testnet';
            };

            this.testnetSubstitutePair = function (pair) {
                var realIds = {};
                realIds[Currency.BTC.id] = '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS';
                realIds[Currency.USD.id] = 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck';
                realIds[Currency.EUR.id] = 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU';
                realIds[Currency.CNY.id] = 'DEJbZipbKQjwEiRjx2AqQFucrj5CZ3rAc4ZvFM8nAsoA';

                return {
                    amountAsset: {id: realIds[pair.amountAsset.id] || ''},
                    priceAsset: {id: realIds[pair.priceAsset.id] || realIds[Currency.BTC.id]}
                };
            };
        }]);
})();

(function () {
    'use strict';

    function ApplicationContextFactory(constants) {

        var assets = {};

        return {
            account: {},
            cache: {
                assets: assets,
                updateAsset: function (assetId, balance, reissuable, totalTokens) {
                    var asset = assets[assetId];
                    if (asset) {
                        asset.balance = Money.fromCoins(balance, asset.currency);
                        asset.totalTokens = Money.fromCoins(totalTokens, asset.currency);
                        asset.reissuable = reissuable;
                    }
                },
                putAsset: function (issueTransaction) {
                    var currency = Currency.create({
                        id: issueTransaction.assetId,
                        displayName: issueTransaction.name,
                        precision: issueTransaction.decimals
                    });
                    var asset = {
                        currency: currency,
                        description: issueTransaction.description,
                        timestamp: issueTransaction.timestamp,
                        sender: issueTransaction.sender,
                        totalTokens: Money.fromCoins(issueTransaction.quantity, currency)
                    };
                    var balance;

                    if (angular.isDefined(assets[currency.id])) {
                        balance = assets[currency.id].balance;
                    } else {
                        balance = new Money(0, currency);
                    }

                    asset.balance = balance;

                    assets[currency.id] = asset;
                },
                getAssetsList: function () {
                    return Object.keys(assets).map(function (key) {
                        return assets[key];
                    });
                }
            }
        };
    }

    ApplicationContextFactory.$inject = ['constants.transactions'];

    angular
        .module('app.ui')
        .factory('applicationContext', ApplicationContextFactory);
})();

(function () {
    'use strict';

    function CoinomatRestangularFactory(constants, rest) {
        return rest.withConfig(function(configurer) {
            configurer.setBaseUrl(constants.COINOMAT_ADDRESS);
        });
    }

    function DatafeedRestangularFactory(constants, rest) {
        return rest.withConfig(function(configurer) {
            configurer.setBaseUrl(constants.DATAFEED_ADDRESS);
        });
    }

    function MatcherRestangularFactory(constants, rest) {
        return rest.withConfig(function(configurer) {
            configurer.setBaseUrl(constants.MATCHER_ADDRESS);
        });
    }

    CoinomatRestangularFactory.$inject = ['constants.application', 'Restangular'];
    DatafeedRestangularFactory.$inject = ['constants.application', 'Restangular'];
    MatcherRestangularFactory.$inject = ['constants.application', 'Restangular'];

    angular
        .module('app.ui')
        .factory('CoinomatRestangular', CoinomatRestangularFactory)
        .factory('DatafeedRestangular', DatafeedRestangularFactory)
        .factory('MatcherRestangular', MatcherRestangularFactory);
})();

(function () {
    'use strict';

    var SCREENS = {
        splash: 'splash-screen',
        accounts: 'accounts-screen',
        main: 'main-screen'
    };

    function HomeController($scope, $window, events, applicationConstants, utilsService,
                            dialogService, applicationContext, notificationService, apiService) {

        $scope.isTestnet = utilsService.isTestnet;

        var home = this;
        home.screen = SCREENS.splash;
        home.featureUnderDevelopment = featureUnderDevelopment;
        home.logout = logout;

        home.title = utilsService.isTestnet() ? 'TESTNET ' : '';
        home.version = applicationConstants.CLIENT_VERSION;

        $scope.$on(events.SPLASH_COMPLETED, function () {
            home.screen = SCREENS.accounts;
        });

        $scope.clipboardOk = function (message) {
            message = message || 'Address copied successfully';
            notificationService.notice(message);
        };

        $scope.$on(events.LOGIN_SUCCESSFUL, function (event, account) {
            // putting the current account to the app context
            applicationContext.account = account;

            NProgress.start();
            apiService.assets.balance(applicationContext.account.address)
                .then(function (response) {
                    _.forEach(response.balances, function (balanceItem) {
                        applicationContext.cache.putAsset(balanceItem.issueTransaction);
                    });
                })
                .finally(function () {
                    home.screen = SCREENS.main;
                    NProgress.done();
                });
        });

        function featureUnderDevelopment() {
            dialogService.open('#feat-not-active');
        }

        function logout() {
            if ($window.chrome && $window.chrome.runtime && typeof $window.chrome.runtime.reload === 'function') {
                $window.chrome.runtime.reload();
            } else {
                $window.location.reload();
            }
        }
    }

    HomeController.$inject = ['$scope', '$window', 'ui.events', 'constants.application', 'utilsService',
        'dialogService', 'applicationContext', 'notificationService', 'apiService'];

    angular
        .module('app.ui')
        .controller('homeController', HomeController);
})();

(function () {
    'use strict';

    angular
        .module('app.ui')
        .controller('splashController', ['$scope', '$timeout', 'ui.events', function ($scope, $timeout, events) {
            NProgress.start();

            $timeout(function () {
                NProgress.done();
                $scope.$emit(events.SPLASH_COMPLETED);
            }, 1);
        }]);
})();

(function() {
    'use strict';

    angular
        .module('app.shared', []);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .constant('constants.tooltip', {
            contentAsHTML: false,
            delay: 1000
        });
})();

(function () {
    'use strict';

    // TODO : move to the future `appState` service.

    var predefinedAssets = [
        Currency.BTC,
        Currency.USD,
        Currency.EUR,
        Currency.CNY,
        Currency.WCT,
        Currency.MRT
    ];

    angular
        .module('app.shared')
        .factory('assetStoreFactory', [
            '$q', 'apiService', 'matcherApiService', function ($q, apiService, matcherApiService) {
                function AssetStore(address) {
                    this.address = address;
                    this.balances = {};
                    this.promise = $q.when();
                }

                AssetStore.prototype._getBalances = function () {
                    var self = this;
                    this.promise = this.promise
                        .then(function () {
                            return apiService.assets.balance(self.address);
                        })
                        .then(function (response) {
                            response.balances.forEach(function (asset) {
                                self.balances[asset.assetId] = Money.fromCoins(asset.balance, Currency.create({
                                    id: asset.assetId,
                                    displayName: asset.issueTransaction.name,
                                    shortName: asset.issueTransaction.name,
                                    precision: asset.issueTransaction.decimals
                                }));
                            });
                        })
                        .then(apiService.address.balance.bind(apiService.address, self.address))
                        .then(function (response) {
                            self.balances[Currency.MIR.id] = Money.fromCoins(response.balance, Currency.MIR);
                        });
                };

                AssetStore.prototype._getPredefined = function () {
                    var self = this;
                    this.promise = this.promise
                        .then(function () {
                            predefinedAssets.forEach(function (asset) {
                                if (!self.balances[asset.id]) {
                                    self.balances[asset.id] = Money.fromCoins(0, asset);
                                }
                            });
                        });
                };

                AssetStore.prototype._getTradedAssets = function () {
                    var self = this;
                    this.promise = this.promise
                        .then(matcherApiService.loadAllMarkets)
                        .then(function (markets) {
                            markets.forEach(function (market) {
                                var amountAsset = market.amountAsset;
                                if (!self.balances[amountAsset.id]) {
                                    self.balances[amountAsset.id] = Money.fromCoins(0, amountAsset);
                                }

                                var priceAsset = market.priceAsset;
                                if (!self.balances[priceAsset.id]) {
                                    self.balances[priceAsset.id] = Money.fromCoins(0, priceAsset);
                                }
                            });
                        });
                };

                AssetStore.prototype.getAll = function () {
                    var self = this;

                    self._getBalances();
                    self._getPredefined();
                    self._getTradedAssets();
                    self.promise = self.promise.then(function () {
                        return Object.keys(self.balances).map(function (key) {
                            return self.balances[key];
                        });
                    });

                    return self.promise;
                };

                AssetStore.prototype.syncGet = function (id) {
                    return this.balances[id];
                };

                AssetStore.prototype.syncGetAsset = function (id) {
                    var item = this.syncGet(id);
                    if (item && item.currency) {
                        return item.currency;
                    }
                };

                AssetStore.prototype.syncGetBalance = function (id) {
                    var item = this.syncGet(id);
                    if (item && item.amount) {
                        return item.amount.toNumber();
                    } else {
                        return 0;
                    }
                };

                var stores = {};

                return {
                    createStore: function (address) {
                        if (!stores[address]) {
                            stores[address] = new AssetStore(address);
                        }
                        return stores[address];
                    }
                };
            }
        ]);
})();

(function () {
    'use strict';

    var allowedParams = ['amount', 'label', 'message'];

    angular
        .module('app.shared')
        .service('bitcoinUriService', [function () {

            this.generate = function (address, params) {

                if (!address || typeof address !== 'string') {
                    return '';
                }

                var uri = 'bitcoin:' + address,
                    keys = Object.keys(params || {});

                if (keys.length) {
                    uri += keys.reduce(function (queryString, key) {
                        if (allowedParams.indexOf(key) > -1) {
                            return queryString + key + '=' + params[key] + '&';
                        } else {
                            return queryString;
                        }
                    }, '?');
                    uri = uri.slice(0, -1); // Remove trailing '&'
                }

                return uri;

            };

            // this.validate = function (uri) {};

        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('dialogService', ['$document', function ($document) {
            this.open = function (elementAccessor, options) {
                angular.element(elementAccessor).modal(options);
            };

            this.openNonCloseable = function (elementAccessor) {
                this.open(elementAccessor, {
                    escapeClose: false,
                    clickClose: false,
                    showClose: false
                });
            };

            this.close = function () {
                angular.element.modal.close();
            };

            /**
                jquery.modal pollutes document body with copied modal dialog divs
                This creates several items with the same "id" and dialogService opens
                dialogs with outdated data
             */
            this.cleanup = function () {
                var result = $document.find('body > div.modal.recyclable');
                _.forEach(result, function (divNode) {
                    divNode.remove();
                });
            };
        }]);
})();

(function () {
    'use strict';

    var prefix = 'Mir';

    angular
        .module('app.shared')
        .service('documentTitleService', [function () {
            this.set = function (title) {
                document.title = prefix + (title ? ' | ' + title : '');
            };
        }]);
})();

(function () {
    'use strict';

    var DELAY = 500;

    function debounce(notifier) {
        var lastCalls = {};
        return function (message) {
            var now = Date.now();
            lastCalls[message] = lastCalls[message] || 0;
            if (lastCalls[message] + DELAY < now) {
                lastCalls[message] = now;
                notifier(message);
            }
        };
    }

    angular
        .module('app.shared')
        .service('notificationService', [function () {
            this.notice = debounce(function (message) {
                angular.element.growl.notice({message : message});
            });

            this.error = debounce(function (message) {
                angular.element.growl.error({message : message});
            });

            this.warning = debounce(function (message) {
                angular.element.growl.warning({message : message});
            });
        }]);
})();

(function () {
    'use strict';

    var spamAssets = {
    };
    var hasBeenUpdated = false; // set this to false to update asset list from github
    var isPendingUpdate = false;
    var SPAM_ASSET_LIST_URL = 'https://raw.githubusercontent.com/wavesplatform/waves-community/' +
        'master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv';

    angular
        .module('app.shared')
        .service('spamAssetService', ['$http', function ($http) {
            var self = this;

            this.parseAssetList = function (communityContent) {
                var lines = communityContent.split('\n');
                var result = {};
                _.forEach(lines, function (line) {
                    var parts = line.split(',');
                    if (parts.length > 0) {
                        var assetId = parts[0].trim();
                        if (assetId) {
                            result[assetId] = true;
                        }
                    }
                });

                return result;
            };

            this.isSpam = function (assetId) {
                if (!assetId) {
                    return false;
                }

                var result = !!spamAssets[assetId];

                if (!hasBeenUpdated && !isPendingUpdate) {
                    isPendingUpdate = true;
                    $http.get(SPAM_ASSET_LIST_URL).then(function (response) {
                        spamAssets = self.parseAssetList(response.data);
                    }).catch(function () {
                        // do nothing
                    }).then(function () {
                        // if we failed to update spam asset list, there is no need to try again
                        isPendingUpdate = false;
                        hasBeenUpdated = true;
                    });
                }

                return result;
            };
        }]);
})();

(function () {
    'use strict';

    var DEFAULT_ASSET_ID_FIELD_NAME = 'assetId';

    function AntiSpamFilter(spamAssetService) {
        return function filterInput(input, fieldName) {
            if (!input) {
                return [];
            }

            fieldName = fieldName || DEFAULT_ASSET_ID_FIELD_NAME;

            return _.filter(input, function (tx) {
                return !spamAssetService.isSpam(tx[fieldName]);
            });
        };
    }

    AntiSpamFilter.$inject = ['spamAssetService'];

    angular
        .module('app.shared')
        .filter('antiSpam', AntiSpamFilter);
})();

(function () {
    'use strict';

    function PadderFilter() {
        return function filterInput(input, maxLength) {
            var spaces = '',
                i = input.length;

            while (i++ < maxLength) {
                spaces +=  '&nbsp;';
            }

            return spaces + input;
        };
    }

    angular
        .module('app.shared')
        .filter('padder', PadderFilter);
})();

(function () {
    'use strict';

    function PageController($attrs, documentTitleService) {
        // documentTitleService.set($attrs.pageTitle); // TODO : uncomment this when all pages are using that component.
    }

    PageController.$inject = ['$attrs', 'documentTitleService'];

    angular
        .module('app.shared')
        .component('wavesPage', {
            controller: PageController,
            bindings: {
                pageTitle: '@'
            }
        });
})();

(function () {
    'use strict';

    var BACKGROUND = '#fff',
        FOREGROUND = '#000',
        SIZE = 150;

    function QrCodeController($element) {

        var ctrl = this,
            canvas = $element.children('canvas'),
            qr = new QRious({
                element: canvas.get(0),
                size: ctrl.size || SIZE
            });

        ctrl.setCode = function () {
            ctrl.removeCode();
            if (ctrl.value) {
                qr.background = ctrl.background || BACKGROUND;
                qr.foreqround = ctrl.foreground || FOREGROUND;
                qr.size = ctrl.size || SIZE;
                qr.value = ctrl.value;
                canvas.removeClass('hidden');
            }
        };

        ctrl.removeCode = function () {
            canvas.addClass('hidden');
        };

        ctrl.$onInit = ctrl.setCode.bind(ctrl);

        ctrl.$onChanges = function (changes) {
            if (changes.value) {
                ctrl.setCode();
            }
        };

    }

    angular
        .module('app.shared')
        .component('wavesQrCode', {
            controller: QrCodeController,
            bindings: {
                size: '<',
                background: '<',
                foreground: '<',
                value: '<'
            },
            template: '<canvas class="hidden"></canvas>'
        });
})();

(function () {
    'use strict';

    function ScrollboxController() {}

    angular
        .module('app.shared')
        .component('wavesScrollbox', {
            controller: ScrollboxController,
            transclude: true,
            template: '<div ng-transclude></div>'
        });
})();

(function () {
    'use strict';

    function WavesDialogController($scope, dialogService) {
        var defaults = {
            isError: false,
            cancelButtonVisible: true,
            closeable: true,
            showButtons: true,
            okButtonCaption: 'OK',
            okButtonEnabled: true,
            cancelButtonCaption: 'CANCEL'
        };

        _.defaults($scope, defaults);

        var imageSuffix = $scope.isError ? '-danger' : '';
        $scope.image = 'modal-header' + imageSuffix;
        if (!$scope.closeable) {
            $scope.image = 'modal-header-round';
        }

        $scope.image += '.svg';

        $scope.onOk = function () {
            var shouldClose;

            if ($scope.dialogOk) {
                shouldClose = $scope.dialogOk();
            }

            if (angular.isUndefined(shouldClose) || shouldClose !== false) {
                dialogService.close();
            }
        };

        $scope.onCancel = function () {
            if ($scope.dialogCancel) {
                $scope.dialogCancel();
            }

            dialogService.close();
        };
    }

    function WavesDialogLink(scope, element) {
        element.addClass('wavesPop');

        if (!scope.global) {
            element.addClass('recyclable');
        }
    }

    angular
        .module('app.shared')
        .directive('wavesDialog', function WavesDialogDirective() {

            return {
                restrict: 'A',
                controller: ['$scope', 'dialogService', WavesDialogController],
                transclude: true,
                scope: {
                    closeable: '=?',
                    cancelButtonVisible: '=?',
                    showButtons: '=?',
                    tooltip: '=?',
                    dialogOk: '&onDialogOk',
                    dialogCancel: '&onDialogCancel',
                    okButtonCaption: '@',
                    okButtonEnabled: '=?',
                    cancelButtonCaption: '@',
                    isError: '=?',
                    global: '=?',
                    noSupportLink: '=?'
                },
                link: WavesDialogLink,
                templateUrl: 'shared/dialog.directive'
            };
        });
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('focusMe', ['$timeout', function WavesFocusDirective($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attributes) {
                    scope.$watch(attributes.focusMe, function (newValue) {
                        $timeout(function () {
                            return newValue && element[0].focus();
                        });
                    }, true);
                }
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('tooltipster', ['constants.tooltip', function WavesTooltipsterDirective(constants) {

            return {
                restrict: 'A',
                link: function (scope, element, attributes) {
                    var text;
                    if (angular.isDefined(attributes.title))
                        text = attributes.title;
                    else if (angular.isDefined(attributes.tooltipTitle))
                        text = attributes.tooltipTitle;

                    if (angular.isUndefined(text))
                        throw new Error('Tooltip text is undefined. ' +
                            'Tooltipster directive is unnecessary for element: ' + element);

                    var tooltipOptions = _.clone(constants);
                    if (angular.isDefined(attributes.tooltipTheme))
                        tooltipOptions.theme = attributes.tooltipTheme;
                    tooltipOptions.content = text;

                    if (angular.isDefined(attributes.tooltipHtml) || attributes.tooltipHtml === true)
                        tooltipOptions.contentAsHTML = true;

                    element.tooltipster(tooltipOptions);

                    scope.$on('$destroy', function DestroyTooltip() {
                        element.tooltipster('destroy');
                    });
                }
            };
        }]);
})();

(function () {
    'use strict';

    function WavesTransactionLoadingService($q, constants, apiService) {
        var self = this;

        // returns promise that loads and merges unconfirmed and confirmed transactions
        this.loadTransactions = function (account, limit) {
            var unconfirmed;
            return apiService.transactions.unconfirmed()
                .then(function (response) {
                    unconfirmed = response;

                    return apiService.transactions.list(account.address, limit);
                })
                .then(function (response) {
                    // FIXME : redo this when the API is fixed.
                    if (response[0] instanceof Array) {
                        response = response[0];
                    }

                    return self.mergeTransactions(account, unconfirmed, response);
                });
        };

        this.refreshAssetCache = function (cache, transactions) {
            var sequence = $q.resolve();
            _.forEach(transactions, function (tx) {
                var assetId;
                if (tx.assetId) {
                    assetId = tx.assetId;
                } else if (tx.order1 && tx.order1.assetPair.amountAsset) {
                    assetId = tx.order1.assetPair.amountAsset;
                }
                var feeAssetId;
                if (tx.feeAsset) {
                    feeAssetId = tx.feeAsset;
                }

                var cached;

                if (assetId) {
                    cached = cache.assets[assetId];
                    if (!cached) {
                        sequence = sequence
                            .then(function () {
                                return apiService.transactions.info(assetId);
                            })
                            .then(function (response) {
                                cache.putAsset(response);
                            });
                    }
                }

                if (feeAssetId) {
                    cached = cache.assets[feeAssetId];
                    if (!cached) {
                        sequence = sequence
                            .then(function () {
                                return apiService.transactions.info(feeAssetId);
                            })
                            .then(function (response) {
                                cache.putAsset(response);
                            });
                    }
                }
            });

            return sequence;
        };

        // TODO : refactor with a map.
        this.mergeTransactions = function (account, unconfirmed, confirmed) {
            var rawAddress = account.address;
            unconfirmed = _.filter(unconfirmed, function (transaction) {
                if (transaction.type === constants.EXCHANGE_TRANSACTION_TYPE) {
                    return transaction.order1.senderPublicKey === account.keyPair.public ||
                        transaction.order2.senderPublicKey === account.keyPair.public ||
                        transaction.sender === rawAddress;
                } else {
                    return (transaction.sender === rawAddress || transaction.recipient === rawAddress);
                }
            });
            var unconfirmedSignatures = _.map(unconfirmed, function (transaction) {
                return transaction.signature;
            });
            confirmed = _.filter(confirmed, function (transaction) {
                return unconfirmedSignatures.indexOf(transaction.signature) === -1;
            });
            unconfirmed = _.map(unconfirmed, function (transaction) {
                transaction.unconfirmed = true;

                return transaction;
            });

            return _.union(unconfirmed, confirmed);
        };
    }

    WavesTransactionLoadingService.$inject = ['$q', 'constants.transactions', 'apiService'];

    angular
        .module('app.shared')
        .service('transactionLoadingService', WavesTransactionLoadingService);
})();

(function () {
    'use strict';

    function TransactionFilter(constants, applicationContext, formattingService) {
        var TRANSACTION_SPEC = {};
        TRANSACTION_SPEC[constants.PAYMENT_TRANSACTION_TYPE] = {
            type: 'Payment',
            processor: processPaymentTransaction
        };
        TRANSACTION_SPEC[constants.ASSET_ISSUE_TRANSACTION_TYPE] = {
            type: 'Asset Issue',
            processor: processAssetIssueTransaction
        };
        TRANSACTION_SPEC[constants.ASSET_TRANSFER_TRANSACTION_TYPE] = {
            type: 'Transfer',
            processor: processAssetTransferTransaction
        };
        TRANSACTION_SPEC[constants.ASSET_REISSUE_TRANSACTION_TYPE] = {
            type: 'Asset Reissue',
            processor: processAssetReissueTransaction
        };
        TRANSACTION_SPEC[constants.START_LEASING_TRANSACTION_TYPE] = {
            type: 'Start Leasing',
            processor: processStartLeasingTransaction
        };
        TRANSACTION_SPEC[constants.CANCEL_LEASING_TRANSACTION_TYPE] = {
            type: 'Cancel Leasing',
            processor: processCancelLeasingTransaction
        };
        TRANSACTION_SPEC[constants.CREATE_ALIAS_TRANSACTION_TYPE] = {
            type: 'Create Alias',
            processor: processCreateAliasTransaction
        };
        TRANSACTION_SPEC[constants.EXCHANGE_TRANSACTION_TYPE] = {
            type: '',
            processor: processExchangeTransaction
        };
        TRANSACTION_SPEC[constants.MASS_PAYMENT_TRANSACTION_TYPE] = {
            type: 'Mass Payment',
            processor: processMassPaymentTransaction
        };

        function buildTransactionType (number) {
            var spec = TRANSACTION_SPEC[number];

            return spec ? spec.type : '';
        }

        function transformAddress(rawAddress) {
            var result = angular.isDefined(rawAddress) ? rawAddress : 'n/a';

            if (result === applicationContext.account.address) {
                result = 'You';
            }

            return result;
        }

        function processTransaction(transaction) {
            var spec = TRANSACTION_SPEC[transaction.type];
            if (angular.isUndefined(spec) || angular.isUndefined(spec.processor)) {
                return;
            }

            spec.processor(transaction);
        }

        function processPaymentTransaction(transaction) {
            transaction.formatted.amount = Money.fromCoins(transaction.amount, Currency.MIR).formatAmount();
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processAssetIssueTransaction(transaction) {
            var asset = Currency.create({
                id: transaction.id,
                displayName: transaction.name,
                precision: transaction.decimals
            });
            transaction.formatted.amount = Money.fromCoins(transaction.quantity, asset).formatAmount();
            transaction.formatted.asset = asset.displayName;
        }

        function processCreateAliasTransaction(transaction) {
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processAssetTransferTransaction(transaction) {
            var currency;
            if (transaction.assetId) {
                var asset = applicationContext.cache.assets[transaction.assetId];
                if (asset) {
                    currency = asset.currency;
                }
            } else {
                currency = Currency.MIR;
            }

            if (!currency) {
                return;
            }

            transaction.formatted.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
            transaction.formatted.asset = currency.displayName;
        }

        function processAssetReissueTransaction(transaction) {
            var asset = applicationContext.cache.assets[transaction.assetId];
            if (angular.isUndefined(asset)) {
                return;
            }

            transaction.formatted.amount = Money.fromCoins(transaction.quantity, asset.currency).formatAmount();
            transaction.formatted.asset = asset.currency.displayName;
        }

        function processStartLeasingTransaction(transaction) {
            transaction.formatted.amount = Money.fromCoins(transaction.amount, Currency.MIR).formatAmount();
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processCancelLeasingTransaction(transaction) {
            transaction.formatted.asset = Currency.MIR.displayName;
        }

        function processMassPaymentTransaction(transaction) {
            var currency = Currency.MIR;
            var assetId = transaction.assetId;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            }

            transaction.formatted.asset = currency.displayName;
            transaction.formatted.amount = Money.fromCoins(transaction.totalAmount, currency).formatAmount();
        }

        function processExchangeTransaction(transaction) {
            var type = 'Exchange';

            var buyOrder = transaction.order1;
            var assetId = buyOrder.assetPair.amountAsset;
            var totalFee = 0;
            if (buyOrder.senderPublicKey === applicationContext.account.keyPair.public) {
                type = type + ' ' + 'Buy';
                totalFee += transaction.buyMatcherFee;
            }

            var sellOrder = transaction.order2;
            if (sellOrder.senderPublicKey === applicationContext.account.keyPair.public) {
                type = type + ' ' + 'Sell';
                totalFee += transaction.sellMatcherFee;
            }

            transaction.formatted.type = type;
            transaction.formatted.fee = Money.fromCoins(totalFee, Currency.MIR).formatAmount(true);

            var currency;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            } else {
                currency = Currency.MIR;
            }

            if (currency) {
                transaction.formatted.asset = currency.displayName;
                transaction.formatted.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
            }
        }

        function formatFee(transaction) {
            var currency = Currency.MIR;
            var assetId = transaction.feeAsset;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            }

            return Money.fromCoins(transaction.fee, currency).formatAmount(true);
        }

        function getFeeAsset(transaction) {
            var currency = Currency.MIR;
            var assetId = transaction.feeAsset;
            if (assetId) {
                var asset = applicationContext.cache.assets[assetId];
                if (asset) {
                    currency = asset.currency;
                }
            }

            return currency;
        }

        function formatTransaction(transaction) {
            // in the future currency should be a part of transaction itself
            var currentAddress = applicationContext.account.address;
            var type = transaction.sender === currentAddress ? 'Outgoing' : 'Incoming';

            transaction.formatted = {
                type: type + ' ' + buildTransactionType(transaction.type),
                datetime: formattingService.formatTimestamp(transaction.timestamp),
                isOutgoing: transaction.sender === currentAddress,
                sender: transformAddress(transaction.sender),
                recipient: transformAddress(transaction.recipient),
                amount: 'N/A',
                fee: formatFee(transaction),
                feeAsset: getFeeAsset(transaction),
                asset: 'Loading'
            };

            processTransaction(transaction);

            return transaction;
        }

        return function filterInput(input) {
            return _.map(input, formatTransaction);
        };
    }

    TransactionFilter.$inject = ['constants.transactions', 'applicationContext', 'formattingService'];

    angular
        .module('app.shared')
        .filter('transaction', TransactionFilter);
})();

(function () {
    'use strict';

    var DEFAULT_STRIP_ZEROES = true;
    var DEFAULT_USE_THOUSANDS_SEPARATOR = true;

    function MoneyShortFilter() {
        return function filterInput(input, stripZeroes, useThousandsSeparator) {
            if (!input || !input.formatAmount) {
                return '';
            }

            if (angular.isUndefined(stripZeroes)) {
                stripZeroes = DEFAULT_STRIP_ZEROES;
            }

            if (angular.isUndefined(useThousandsSeparator)) {
                useThousandsSeparator = DEFAULT_USE_THOUSANDS_SEPARATOR;
            }

            return input.formatAmount(stripZeroes, useThousandsSeparator);
        };
    }

    angular
        .module('app.shared')
        .filter('moneyShort', MoneyShortFilter);
})();

(function () {
    'use strict';

    var DEFAULT_STRIP_ZEROES = false;
    var DEFAULT_USE_THOUSANDS_SEPARATOR = true;

    function MoneyLongFilter() {
        return function filterInput(input, stripZeroes, useThousandsSeparator) {
            if (!input || !input.formatAmount) {
                return '';
            }

            if (angular.isUndefined(stripZeroes)) {
                stripZeroes = DEFAULT_STRIP_ZEROES;
            }

            if (angular.isUndefined(useThousandsSeparator)) {
                useThousandsSeparator = DEFAULT_USE_THOUSANDS_SEPARATOR;
            }

            var result = input.formatAmount(stripZeroes, useThousandsSeparator);
            var currency = input.currency.shortName ? input.currency.shortName : input.currency.displayName;

            return result + ' ' + currency;
        };
    }

    angular
        .module('app.shared')
        .filter('moneyLong', MoneyLongFilter);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .factory('autocomplete.fees', function AutocompleteFeesFactory() {
            var result = {
                fees: [
                    {
                        amount: 0.001,
                        displayText: '0.001 WAVE (Economic)'
                    },
                    {
                        amount: 0.0015,
                        displayText: '0.0015 WAVE (Standard)'
                    },
                    {
                        amount: 0.002,
                        displayText: '0.002 WAVE (Premium)'
                    }
                ],
                selectedFee: undefined,
                searchText: undefined
            };

            result.getFeeAmount = function() {
                return result.selectedFee ?
                    result.selectedFee.amount :
                    result.searchText;
            };

            result.defaultFee = function (feeAmount) {
                var feeIndex = 0;

                if (angular.isNumber(feeAmount)) {
                    var index = _.findIndex(result.fees, function (fee) {
                        return fee.amount === feeAmount;
                    });

                    if (index >= 0) {
                        feeIndex = index;
                    }
                }

                result.selectedFee = result.fees[feeIndex];
            };

            result.querySearch = function (searchText) {
                if (!searchText) {
                    return result.fees;
                }

                return _.filter(result.fees, function (item) {
                    return item.amount.toString().indexOf(searchText) !== -1;
                });
            };

            return result;
        })
        .factory('autocomplete.assets', function AutocompleteAssetsFactory() {
            function createAutocomplete() {
                var result = {
                    assets: [],
                    selectedAsset: undefined,
                    searchText: undefined
                };

                result.querySearch = function (searchText) {
                    if (!searchText) {
                        return result.assets.slice(0, 10);
                    }

                    var searchTextLC = searchText.toLowerCase(),
                        list = [],
                        ids = {};

                    // Adding assets which match by name.
                    list = list.concat(result.assets.filter(function (asset) {
                        ids[asset.id] = asset.displayName.toLowerCase().indexOf(searchTextLC) > -1;
                        return ids[asset.id];
                    }));

                    // Adding assets which match by ID.
                    list = list.concat(result.assets.filter(function (asset) {
                        if (ids[asset.id] === true) {
                            return false;
                        } else {
                            ids[asset.id] = asset.id.indexOf(searchText) > -1;
                            return ids[asset.id];
                        }
                    }));

                    return list;
                };

                return result;
            }

            return {
                create: function () {
                    return createAutocomplete();
                }
            };
        });
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .factory('transactionBroadcast', ['notificationService', function (notificationService) {
            function Instance(method, successCallback) {
                var self = this;
                var transaction;

                this.pending = false;
                this.setTransaction = function (value) {
                    transaction = value;
                };

                this.broadcast = function () {
                    // checking if transaction was saved
                    if (angular.isUndefined(transaction)) {
                        return;
                    }

                    // prevent method execution when there is a pending request
                    if (self.pending) {
                        return;
                    }

                    // start pending request
                    self.pending = true;

                    method(transaction).then(function (response) {
                        successCallback(transaction, response);
                    }, function (response) {
                        if (response.data) {
                            notificationService.error('Error:' + response.data.error + ' - ' + response.data.message);
                        } else {
                            notificationService.error('Request failed. Status: ' + response.status + ' - ' +
                                response.statusText);
                        }
                    }).finally(function () {
                        self.pending = false;
                        transaction = undefined;
                    });
                };
            }

            return {
                instance: Instance
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('decimalInputRestrictor', [function WavesDecimalInputRestrictorDirective() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attributes, ngModelController) {
                    var pattern = /[^0-9.]+/g;

                    function fromUser (text) {
                        if (!text)
                            return text;

                        var transformedInput = text.replace(pattern, '');
                        if (transformedInput !== text) {
                            ngModelController.$setViewValue(transformedInput);
                            ngModelController.$render();
                        }

                        return transformedInput;
                    }

                    ngModelController.$parsers.push(fromUser);
                }
            };
        }]);
})();

(function () {
    'use strict';

    angular
        .module('app.shared')
        .directive('integerInputRestrictor', [function WavesIntegerInputRestrictorDirective() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attributes, ngModelController) {
                    var pattern = /[^0-9]+/g;

                    function fromUser (text) {
                        if (!text)
                            return text;

                        var transformedInput = text.replace(pattern, '');
                        if (transformedInput !== text) {
                            ngModelController.$setViewValue(transformedInput);
                            ngModelController.$render();
                        }

                        return transformedInput;
                    }

                    ngModelController.$parsers.push(fromUser);
                }
            };
        }]);
})();

(function () {
    'use strict';

    var url = 'mir.one/client';

    function SupportLinkController() {}

    angular
        .module('app.shared')
        .component('wavesSupportLink', {
            controller: SupportLinkController,
            template: '<a href="http://' + url + '" target="_blank">' + url + '</a>'
        });
})();

(function () {
    'use strict';

    var ADDRESS_STUB = 'n/a';

    function TransactionMenuController($scope, constants, events, notificationService) {
        var ctrl = this;

        ctrl.idCopied = idCopied;
        ctrl.dataCopied = dataCopied;
        ctrl.fullTransactionData = fullTransactionData;
        ctrl.hasRecipient = hasRecipient;
        ctrl.addressCopied = addressCopied;
        ctrl.isLeasing = isLeasing;
        ctrl.cancelLeasing = cancelLeasing;

        function addressCopied () {
            return notificationService.notice('Address has been copied');
        }

        function idCopied () {
            notificationService.notice('Transaction ID has been copied');
        }

        function dataCopied () {
            notificationService.notice('Full transaction data have been copied');
        }

        function hasRecipient () {
            return !!ctrl.transaction.recipient;
        }

        function isLeasing () {
            return ctrl.transaction.type === constants.START_LEASING_TRANSACTION_TYPE;
        }

        function cancelLeasing () {
            $scope.$emit(events.LEASING_CANCEL, {
                startLeasingTransaction: ctrl.transaction
            });
        }

        function fullTransactionData () {
            var recipient = hasRecipient() ? ctrl.transaction.recipient : ADDRESS_STUB;
            var attachment = '';
            if (ctrl.transaction.attachment) {
                attachment = ' | ATTACHMENT: ' + ctrl.transaction.attachment;
            }

            return 'TX ID: ' + ctrl.transaction.id +
                ' | TYPE: ' + ctrl.transaction.formatted.type +
                ' | DATE: ' + ctrl.transaction.formatted.datetime +
                ' | SENDER ADDRESS: ' + ctrl.transaction.sender +
                ' | TX AMOUNT: ' + ctrl.transaction.formatted.amount + ' ' + ctrl.transaction.formatted.asset +
                ' | RECIPIENT ADDRESS: ' + recipient +
                ' | TX FEE: ' + ctrl.transaction.formatted.fee + ' ' + ctrl.transaction.formatted.feeAsset.displayName +
                (ctrl.transaction.formatted.feeAsset.id ? ' (' + ctrl.transaction.formatted.feeAsset.id + ')' : '') +
                attachment;
        }
    }

    TransactionMenuController.$inject = ['$scope', 'constants.transactions', 'ui.events', 'notificationService'];

    angular
        .module('app.shared')
        .component('txMenu', {
            controller: TransactionMenuController,
            bindings: {
                transaction: '<'
            },
            templateUrl: 'shared/transaction.menu.component'
        });
})();

(function () {
    'use strict';

    var FEE_CURRENCY = Currency.MIR;
    var DEFAULT_ERROR_MESSAGE = 'The Internet connection is lost';

    // TODO : add the `exceptField` attribute or a list of all the needed fields.

    function WavesTransactionHistoryController($scope, events, constants, applicationContext,
                                               apiService, leasingRequestService, notificationService, dialogService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.cancelLeasing = cancelLeasing;
        ctrl.confirm = {
            fee: minimumFee
        };

        $scope.$on(events.LEASING_CANCEL, function (event, eventData) {
            ctrl.startLeasingTransaction = eventData.startLeasingTransaction;

            ctrl.confirm.recipient = ctrl.startLeasingTransaction.recipient;
            ctrl.confirm.amount = ctrl.startLeasingTransaction.formatted.amount;
            ctrl.confirm.asset = ctrl.startLeasingTransaction.formatted.asset;

            dialogService.open('#cancel-leasing-confirmation');
        });

        function cancelLeasing () {
            var cancelLeasing = {
                startLeasingTransactionId: ctrl.startLeasingTransaction.id,
                fee: minimumFee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            var transaction = leasingRequestService.buildCancelLeasingRequest(cancelLeasing, sender);

            apiService.leasing.cancel(transaction)
                .then(function () {
                    notificationService.notice('Leasing transaction of ' +
                        ctrl.startLeasingTransaction.formatted.amount + ' ' +
                        ctrl.startLeasingTransaction.formatted.asset + ' has been cancelled.');
                })
                .catch(function (exception) {
                    if (exception) {
                        if (exception.data) {
                            notificationService.error(exception.data.message);
                        } else if (exception.message) {
                            notificationService.error(exception.message);
                        } else if (exception.statusText) {
                            notificationService.error(exception.statusText);
                        } else {
                            notificationService.error(DEFAULT_ERROR_MESSAGE);
                        }
                    } else {
                        notificationService.error(DEFAULT_ERROR_MESSAGE);
                    }

                    dialogService.close();
                });

            return true;
        }
    }

    WavesTransactionHistoryController.$inject = ['$scope', 'ui.events', 'constants.ui', 'applicationContext',
        'apiService', 'leasingRequestService', 'notificationService', 'dialogService'];

    angular
        .module('app.shared')
        .component('wavesTransactionHistory', {
            controller: WavesTransactionHistoryController,
            bindings: {
                heading: '@',
                transactions: '<',
                limitTo: '<'
            },
            templateUrl: 'shared/transaction.history.component'
        });
})();

(function() {
    'use strict';

    angular.module('app.login', ['waves.core.services', 'app.ui', 'app.shared']);
})();

(function () {
    'use strict';

    angular
        .module('app.login')
        .constant('ui.login.modes', {
            REGISTER: 'register',
            CREATE_SEED: 'create-seed',
            LIST: 'list',
            LOGIN: 'login'
        });

    angular
        .module('app.login')
        .constant('ui.login.events', {
            CHANGE_MODE: 'change-mode',
            GENERATE_SEED: 'generate-seed',  // parameter - seed
            LOGIN: 'login'                   // parameter - account object
        });
})();

(function () {
    'use strict';

    function LoginContextFactory(moduleEvents, applicationEvents, modes) {
        return {
            showAccountsListScreen: function($scope) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.LIST);
            },

            showInputSeedScreen: function ($scope) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.CREATE_SEED);
            },

            showLoginScreen: function ($scope, account) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.LOGIN, account);
            },

            showRegisterScreen: function ($scope, seed) {
                $scope.$emit(moduleEvents.CHANGE_MODE, modes.REGISTER, seed);
            },

            notifyGenerateSeed: function ($scope) {
                $scope.$emit(moduleEvents.GENERATE_SEED);
            },

            notifySignedIn: function ($scope, rawAddress, seed, keys) {
                var applicationState = {
                    address: rawAddress,
                    seed: seed,
                    keyPair: keys
                };

                $scope.$emit(applicationEvents.LOGIN_SUCCESSFUL, applicationState);
            }
        };
    }

    LoginContextFactory.$inject = ['ui.login.events', 'ui.events', 'ui.login.modes'];

    angular
        .module('app.login')
        .factory('loginContext', LoginContextFactory);
})();

(function () {
    'use strict';

    function AccountsController($scope, modes, events, passPhraseService, dialogService, cryptoService, loginContext) {
        var accounts = this;

        // by default start in list mode
        switchToMode(modes.LIST);

        $scope.$on(events.CHANGE_MODE, function (event, mode, param) {
            switchToMode(mode, param);
        });

        $scope.$on(events.GENERATE_SEED, function () {
            var seed = passPhraseService.generate();
            switchToMode(modes.REGISTER, seed);
            dialogService.openNonCloseable('#login-wPop-new');
        });

        function switchToMode(mode, param) {
            switch (mode) {
                case modes.REGISTER:
                    switchToRegisterMode(param);
                    break;

                case modes.CREATE_SEED:
                    switchToCreateSeedMode();
                    break;

                case modes.LIST:
                    switchToListMode();
                    break;

                case modes.LOGIN:
                    switchToLoginMode(param);
                    break;

                default:
                    throw new Error('Unsupported account operation: ' + mode);
            }

            accounts.mode = mode;
        }

        function switchToListMode() {
            accounts.caption = 'ACCOUNTS';
        }

        function switchToCreateSeedMode() {
            accounts.caption = 'SET UP YOUR SEED';
        }

        function switchToRegisterMode(seed) {
            accounts.caption = 'REGISTER ACCOUNT';
            accounts.displayAddress = cryptoService.buildRawAddressFromSeed(seed);
            // setting a seed to register a new account
            loginContext.seed = seed;
        }

        function switchToLoginMode(account) {
            accounts.caption = 'SIGN IN';
            accounts.displayAddress = account.address;
            // setting an account which we would like to sign in
            loginContext.currentAccount = account;
        }
    }

    AccountsController.$inject = [
        '$scope',
        'ui.login.modes',
        'ui.login.events',
        'passPhraseService',
        'dialogService',
        'cryptoService',
        'loginContext'
    ];

    angular
        .module('app.login')
        .controller('accountsController', AccountsController);
})();

(function () {
    'use strict';

    function AccountListController($scope, accountService, dialogService, loginContext) {
        var list = this;
        list.accounts = [];
        list.removeCandidate = {};

        list.removeAccount = removeAccount;
        list.createAccount = createAccount;
        list.importAccount = importAccount;
        list.signIn = signIn;
        list.showRemoveWarning = showRemoveWarning;

        accountService.getAccounts().then(function (accounts) {
            list.accounts = accounts;
        });

        function showRemoveWarning(index) {
            list.removeIndex = index;
            list.removeCandidate = list.accounts[index];
            dialogService.open('#account-remove-popup');
        }

        function removeAccount() {
            if (list.removeCandidate) {
                accountService.removeAccountByIndex(list.removeIndex).then(function () {
                    list.removeCandidate = undefined;
                    list.removeIndex = undefined;
                });
            }
        }

        function createAccount() {
            loginContext.notifyGenerateSeed($scope);
        }

        function importAccount() {
            loginContext.showInputSeedScreen($scope);
        }

        function signIn(account) {
            loginContext.showLoginScreen($scope, account);
        }
    }

    AccountListController.$inject = ['$scope', 'accountService', 'dialogService', 'loginContext'];

    angular
        .module('app.login')
        .controller('accountListController', AccountListController);
})();

(function () {
    'use strict';

    var WALLET_NAME_MAXLENGTH = 16;

    function AccountRegisterController($scope, accountService, cryptoService, loginContext) {
        var ctrl = this;

        ctrl.validationOptions = {
            onfocusout: false,
            rules: {
                walletName: {
                    maxlength: WALLET_NAME_MAXLENGTH
                },
                walletPassword: {
                    required: true,
                    minlength: 8,
                    password: true
                },
                walletPasswordConfirm: {
                    equalTo: '#walletPassword'
                }
            },
            messages: {
                walletName: {
                    maxlength: 'A wallet name is too long. Maximum name length is ' +
                        WALLET_NAME_MAXLENGTH + ' characters'
                },
                walletPassword: {
                    required: 'A password is required to store your seed safely',
                    minlength: 'Password must be 8 characters or longer'
                },
                walletPasswordConfirm: {
                    equalTo: 'Passwords do not match'
                }
            }
        };
        ctrl.saveAccountAndSignIn = saveAccountAndSignIn;
        ctrl.cancel = cancel;
        ctrl.seed = function (seed) {
            return arguments.length ? (loginContext.seed = seed) : loginContext.seed;
        };

        function cleanup() {
            ctrl.name = '';
            ctrl.password = '';
            ctrl.confirmPassword = '';
        }

        function saveAccountAndSignIn(form) {
            if (!form.validate()) {
                return false;
            }

            var seed = loginContext.seed;
            var cipher = cryptoService.encryptWalletSeed(seed, ctrl.password).toString();
            var keys = cryptoService.getKeyPair(seed);
            var checksum = cryptoService.seedChecksum(seed);
            var address = cryptoService.buildRawAddress(keys.public);

            var account = {
                name: ctrl.name,
                cipher: cipher,
                checksum: checksum,
                publicKey: keys.public,
                address: address
            };

            accountService.addAccount(account);

            loginContext.notifySignedIn($scope, address, seed, keys);

            cleanup();

            return true;
        }

        function cancel() {
            loginContext.showAccountsListScreen($scope);
            cleanup();
        }
    }

    AccountRegisterController.$inject = ['$scope', 'accountService', 'cryptoService', 'loginContext'];

    angular
        .module('app.login')
        .controller('accountRegisterController', AccountRegisterController);
})();

(function () {
    'use strict';

    var SEED_MINIMUM_LENGTH = 25;

    function AccountSeedController($scope, loginContext, utilityService,
                                   cryptoService, dialogService, passPhraseService) {
        var vm = this;

        vm.validationOptions = {
            onfocusout: false,
            rules: {
                walletSeed: {
                    required: true,
                    minlength: SEED_MINIMUM_LENGTH
                }
            },
            messages: {
                walletSeed: {
                    required: 'Wallet seed is required',
                    minlength: 'Wallet seed is too short. A secure wallet seed should contain more than ' +
                       SEED_MINIMUM_LENGTH + ' characters'
                }
            }
        };
        vm.registerAccount = registerAccount;
        vm.back = goBack;
        vm.refreshAddress = refreshAddress;
        vm.checkSeedAndRegister = checkSeedAndRegister;
        vm.generateSeed = generateSeed;

        function cleanup() {
            //it seems we won't need this code if we switch to recreation of controllers on each event
            vm.seed = '';
            vm.displayAddress = '';
        }

        function refreshAddress() {
            vm.displayAddress = cryptoService.buildRawAddressFromSeed(vm.seed);
        }

        function checkSeedAndRegister(form) {
            if (!form.validate()) {
                return false;
            }

            if (utilityService.endsWithWhitespace(vm.seed)) {
                dialogService.openNonCloseable('#seed-whitespace-popup');
            } else {
                registerAccount();
            }

            return true;
        }

        function generateSeed() {
            vm.seed = passPhraseService.generate();
            refreshAddress();
        }

        function registerAccount() {
            loginContext.showRegisterScreen($scope, vm.seed);
            cleanup();
        }

        function goBack() {
            loginContext.showAccountsListScreen($scope);
            cleanup();
        }
    }

    AccountSeedController.$inject = ['$scope',
        'loginContext',
        'utilityService',
        'cryptoService',
        'dialogService',
        'passPhraseService'];

    angular
        .module('app.login')
        .controller('accountSeedController', AccountSeedController);
})();

(function () {
    'use strict';

    function AccountLoginController ($scope, cryptoService, loginContext, notificationService) {
        var vm = this;

        vm.signIn = signIn;
        vm.cancel = cancel;

        function cleanup() {
            vm.password = '';
        }

        function performSignIn() {
            var account = loginContext.currentAccount;
            if (angular.isUndefined(account)) {
                throw new Error('Account to log in hasn\'t been selected');
            }

            var decryptedSeed = cryptoService.decryptWalletSeed(account.cipher, vm.password, account.checksum);
            if (!decryptedSeed) {
                notificationService.error('Wrong password! Please try again.');
            }
            else {
                var keys = cryptoService.getKeyPair(decryptedSeed);
                loginContext.notifySignedIn($scope, account.address, decryptedSeed, keys);
            }
        }

        function signIn() {
            performSignIn();
            cleanup();
        }

        function cancel() {
            loginContext.showAccountsListScreen($scope);
            cleanup();
        }
    }

    AccountLoginController.$inject = ['$scope', 'cryptoService', 'loginContext', 'notificationService'];

    angular
        .module('app.login')
        .controller('accountLoginController', AccountLoginController);
})();

(function() {
    'use strict';

    angular.module('app.navigation', ['waves.core.services', 'app.ui', 'app.shared'])
        .constant('navigation.events', {
            NAVIGATION_CREATE_ALIAS: 'navigation-create-alias'
        });
})();

(function () {
    'use strict';

    angular
        .module('app.navigation')
        .controller('navigationController', ['$scope', function ($scope) {
            var nav = this;

            nav.currentTab = 'wallet';
            nav.changeTab = changeTab;

            function changeTab (pageId) {
                nav.currentTab = pageId;
            }
        }]);
})();

(function () {
    'use strict';

    function MainMenuController($scope, $interval, events, applicationContext,
                                cryptoService, dialogService, notificationService, apiService) {
        var ctrl = this,
            refreshPromise,
            delayRefresh = 10 * 1000;

        ctrl.blockHeight = 0;
        ctrl.address = applicationContext.account.address;
        ctrl.addressQr = 'waves://' + ctrl.address;

        function initializeBackupFields() {
            ctrl.seed = applicationContext.account.seed;
            ctrl.encodedSeed = cryptoService.base58.encode(converters.stringToByteArray(ctrl.seed));
            ctrl.publicKey = applicationContext.account.keyPair.public;
            ctrl.privateKey = applicationContext.account.keyPair.private;
        }

        function buildBackupClipboardText() {
            var text = 'Seed: ' + ctrl.seed + '\n';
            text += 'Encoded seed: ' + ctrl.encodedSeed + '\n';
            text += 'Private key: ' + ctrl.privateKey + '\n';
            text += 'Public key: ' + ctrl.publicKey + '\n';
            text += 'Address: ' + ctrl.address;
            return text;
        }

        refreshBlockHeight();
        refreshPromise = $interval(refreshBlockHeight, delayRefresh);

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        ctrl.showAddressQr = showAddressQr;
        ctrl.showBackupDialog = showBackupDialog;
        ctrl.showProfileDialog = showProfileDialog;
        ctrl.backup = backup;

        function showAddressQr() {
            dialogService.open('#address-qr-modal');
        }

        function showProfileDialog() {
            $scope.$broadcast(events.NAVIGATION_CREATE_ALIAS, {});
        }

        function showBackupDialog() {
            initializeBackupFields();
            dialogService.open('#header-wPop-backup');
        }

        function backup() {
            var clipboard = new Clipboard('#backupForm', {
                text: function () {
                    return buildBackupClipboardText();
                }
            });

            clipboard.on('success', function(e) {
                notificationService.notice('Account backup has been copied to clipboard');
                e.clearSelection();
            });

            angular.element('#backupForm').click();
            clipboard.destroy();
        }

        function refreshBlockHeight() {
            apiService.blocks.height().then(function (response) {
                ctrl.blockHeight = response.height;
                applicationContext.blockHeight = response.height;
            });
        }
    }

    MainMenuController.$inject = ['$scope', '$interval', 'navigation.events', 'applicationContext',
                                  'cryptoService', 'dialogService', 'notificationService', 'apiService'];

    angular
        .module('app.navigation')
        .controller('mainMenuController', MainMenuController);
})();

(function () {
    'use strict';

    var DEFAULT_FEE = Money.fromTokens(0.001, Currency.MIR);
    var ALIAS_MINIMUM_LENGTH = 4;
    var ALIAS_MAXIMUM_LENGTH = 30;

    function WavesCreateAliasController($scope, $timeout, events, applicationContext,
                                        dialogService, notificationService, transactionBroadcast,
                                        formattingService, aliasRequestService, apiService) {
        var ctrl = this;

        ctrl.fee = DEFAULT_FEE;
        ctrl.aliasList = null;

        ctrl.validationOptions = {
            onfocusout: false,
            rules: {
                aliasName: {
                    required: true,
                    minlength: ALIAS_MINIMUM_LENGTH,
                    maxlength: ALIAS_MAXIMUM_LENGTH
                }
            },
            messages: {
                aliasName: {
                    required: 'Symbolic name is required',
                    minlength: 'Alias name is too short. Please enter at least ' + ALIAS_MINIMUM_LENGTH + ' symbols',
                    maxlength: 'Alias name is too long. Please use no more than ' + ALIAS_MAXIMUM_LENGTH + ' symbols'
                }
            }
        };

        ctrl.broadcast = new transactionBroadcast.instance(apiService.alias.create, function (tx) {
            var formattedTime = formattingService.formatTimestamp(tx.timestamp),
                displayMessage = 'Created alias \'' + tx.alias + '\'<br/>Date: ' + formattedTime;
            notificationService.notice(displayMessage);
        });

        ctrl.confirmCreateAlias = confirmCreateAlias;
        ctrl.broadcastTransaction = broadcastTransaction;

        $scope.$on(events.NAVIGATION_CREATE_ALIAS, function () {
            reset();
            getExistingAliases();
            dialogService.open('#create-alias-dialog');
        });

        function getExistingAliases() {
            apiService.alias
                .getByAddress(applicationContext.account.address)
                .then(function (aliasList) {
                    ctrl.aliasList = aliasList;
                });
        }

        function broadcastTransaction () {
            ctrl.broadcast.broadcast();
        }

        function confirmCreateAlias (form) {
            if (!form.validate(ctrl.validationOptions)) {
                return false;
            }

            var createAlias = {
                alias: ctrl.alias,
                fee: ctrl.fee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create the transaction and waiting for confirmation
            ctrl.broadcast.setTransaction(aliasRequestService.buildCreateAliasRequest(createAlias, sender));

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#create-alias-confirmation');
            }, 1);

            return true;
        }

        function reset () {
            ctrl.alias = '';
        }
    }

    WavesCreateAliasController.$inject = ['$scope', '$timeout', 'navigation.events', 'applicationContext',
                                          'dialogService', 'notificationService', 'transactionBroadcast',
                                          'formattingService', 'aliasRequestService', 'apiService'];

    angular
        .module('app.navigation')
        .controller('createAliasController', WavesCreateAliasController);
})();

(function () {
    'use strict';

    function WavesTabController($scope, dialogService) {
        $scope.isSelected = function () {
            return $scope.pageId === $scope.currentPageId;
        };

        $scope.onClick = function () {
            $scope.onSelect({pageId: $scope.pageId});

            // cleaning unused modal dialog divs, created by previous tab
            dialogService.cleanup();
        };
    }

    function WavesTabLink(scope, element) {
        element.addClass('tabs-radio');
    }

    angular
        .module('app.navigation')
        .directive('wavesTab', function WavesTabDirective() {
            return {
                restrict: 'A',
                controller: ['$scope', 'dialogService', WavesTabController],
                scope: {
                    pageId: '@',
                    caption: '<',
                    onSelect: '&',
                    currentPageId: '<'
                },
                link: WavesTabLink,
                templateUrl: 'navigation/tab.directive'
            };
        });
})();

(function() {
    'use strict';

    angular.module('app.wallet', ['app.shared'])
        .constant('wallet.events', {
            WALLET_SEND: 'wallet-send',
            WALLET_WITHDRAW: 'wallet-withdraw',
            WALLET_DEPOSIT: 'wallet-deposit',
            WALLET_CARD_DEPOSIT: 'wallet-card-deposit'
        });
})();

(function () {
    'use strict';

    function WalletBoxController() {
        var ctrl = this;

        var mapping = {};
        mapping[Currency.MIR.displayName] = {
            image: 'wB-bg-MIR.svg',
            displayName: Currency.MIR.displayName
        };
        mapping[Currency.BTC.displayName] = {
            image: 'wB-bg-BTC.svg',
            displayName: Currency.BTC.displayName
        };
        mapping[Currency.USD.displayName] = {
            image: 'wB-bg-USD.svg',
            displayName: Currency.USD.displayName
        };
        mapping[Currency.EUR.displayName] = {
            image: 'wB-bg-EUR.svg',
            displayName: Currency.EUR.displayName
        };
        mapping[Currency.ETH.displayName] = {
            image: 'wB-bg-ETH.svg',
            displayName: Currency.ETH.displayName
        };
        mapping[Currency.LTC.displayName] = {
            image: 'wB-bg-LTC.svg',
            displayName: Currency.LTC.displayName
        };
        mapping[Currency.ZEC.displayName] = {
            image: 'wB-bg-ZEC.svg',
            displayName: Currency.ZEC.displayName
        };
        mapping[Currency.TRY.displayName] = {
            image: 'wB-bg-WTRY.png',
            displayName: Currency.TRY.displayName
        };
        mapping[Currency.BCH.displayName] = {
            image: 'wB-bg-BCH.svg',
            displayName: 'BCH'
        };
				mapping[Currency.PROTON.displayName] = {
            image: 'wB-bg-PROTON.svg',
            displayName: Currency.PROTON.displayName
        };

        ctrl.$onChanges = function (changesObject) {
            if (changesObject.balance) {
                var balance = changesObject.balance.currentValue;
                ctrl.integerBalance = balance.formatIntegerPart();
                ctrl.fractionBalance = balance.formatFractionPart();
            }
        };
        ctrl.$onInit = function () {
            ctrl.image = mapping[ctrl.balance.currency.displayName].image;
            ctrl.displayName = mapping[ctrl.balance.currency.displayName].displayName;
        };
    }

    WalletBoxController.$inject = [];

    angular
        .module('app.wallet')
        .component('walletBox', {
            controller: WalletBoxController,
            bindings: {
                balance: '<',
                onSend: '&',
                onWithdraw: '&',
                onDeposit: '&',
                detailsAvailable: '<?'
            },
            templateUrl: 'wallet/box.component'
        });
})();

(function () {
    'use strict';

    var TRANSACTIONS_TO_LOAD = 100;

    function WavesWalletListController($scope, $interval, events, applicationContext,
                                       apiService, transactionLoadingService, dialogService) {
        var ctrl = this;
        var refreshPromise;
        var refreshDelay = 10 * 1000;

        function sendCommandEvent(event, currency) {
            var assetWallet = findWalletByCurrency(currency);
            var wavesWallet = findWalletByCurrency(Currency.MIR);

            $scope.$broadcast(event, {
                assetBalance: assetWallet.balance,
                wavesBalance: wavesWallet.balance
            });
        }

        function findWalletByCurrency(currency) {
            return _.find(ctrl.wallets, function (w) {
                return w.balance.currency === currency;
            });
        }

        ctrl.wallets = [
            {
                balance: new Money(0, Currency.MIR),
                depositWith: Currency.BTC
            },
						{
                balance: new Money(0, Currency.PROTON),
                depositWith: Currency.BTC
            }
        ];

        ctrl.transactions = [];
        ctrl.send = send;
        ctrl.withdraw = withdraw;
        ctrl.deposit = deposit;
        ctrl.depositFromCard = depositFromCard;

        loadDataFromBackend();
        patchCurrencyIdsForTestnet();

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function send (wallet) {
            sendCommandEvent(events.WALLET_SEND, wallet.balance.currency);
        }

        function withdraw (wallet) {
            var id = wallet.balance.currency.id,
                type;

            if (id === Currency.BTC.id ||
                id === Currency.ETH.id ||
                id === Currency.MIR.id ||
                id === Currency.LTC.id ||
                id === Currency.ZEC.id ||
                id === Currency.BCH.id
            ) {
                type = 'crypto';
            } else if (id === Currency.EUR.id || id === Currency.USD.id) {
                type = 'fiat';
            } else if (id === Currency.TRY.id) {
                dialogService.open('#digilira-dialog');
							} else if (id === Currency.PROTON.id) {
									dialogService.open('#feat-not-active');
            } else {
                throw new Error('Add an option here!');
            }

            sendCommandEvent(events.WALLET_WITHDRAW + type, wallet.balance.currency);
        }

        function deposit (wallet) {
            if (wallet.balance.currency === Currency.MIR) {
                dialogService.open('#feat-not-active');
            } else if (wallet.balance.currency === Currency.TRY) {
                dialogService.open('#digilira-dialog');
						} else if (wallet.balance.currency === Currency.PROTON) {
									dialogService.open('#feat-not-active');
            } else {
                $scope.$broadcast(events.WALLET_DEPOSIT + wallet.balance.currency.id, {
                    assetBalance: wallet.balance,
                    depositWith: wallet.depositWith
                });
            }
        }

        function depositFromCard (currency) {
            dialogService.close();

            $scope.$broadcast(events.WALLET_CARD_DEPOSIT, {
                currency: currency
            });
        }

        function loadDataFromBackend() {
            refreshWallets();
            refreshTransactions();

            refreshPromise = $interval(function() {
                refreshWallets();
                refreshTransactions();
            }, refreshDelay);
        }

        function refreshWallets() {
            apiService.address.balance(applicationContext.account.address)
                .then(function (response) {
                    var wavesWallet = findWalletByCurrency(Currency.MIR);
                    wavesWallet.balance = Money.fromCoins(response.balance, Currency.MIR);
                });

            apiService.assets.balance(applicationContext.account.address).then(function (response) {
                _.forEach(response.balances, function (assetBalance) {
                    var id = assetBalance.assetId;

                    // adding asset details to cache
                    applicationContext.cache.putAsset(assetBalance.issueTransaction);
                    applicationContext.cache.updateAsset(id, assetBalance.balance,
                        assetBalance.reissuable, assetBalance.quantity);
                });

                _.forEach(ctrl.wallets, function (wallet) {
                    var asset = applicationContext.cache.assets[wallet.balance.currency.id];
                    if (asset) {
                        wallet.balance = asset.balance;
                    }
                });
            });
        }

        function refreshTransactions() {
            var txArray;
            transactionLoadingService.loadTransactions(applicationContext.account, TRANSACTIONS_TO_LOAD)
                .then(function (transactions) {
                    txArray = transactions;

                    return transactionLoadingService.refreshAssetCache(applicationContext.cache, transactions);
                })
                .then(function () {
                    ctrl.transactions = txArray;
                });
        }

        // Assets ID substitution for testnet
        function patchCurrencyIdsForTestnet() {
            if ($scope.isTestnet()) {
                Currency.EUR.id = '2xnE3EdpqXtFgCP156qt1AbyjpqdZ5jGjWo3CwTawcux';
                Currency.USD.id = 'HyFJ3rrq5m7FxdkWtQXkZrDat1F7LjVVGfpSkUuEXQHj';
                Currency.BTC.id = 'Fmg13HEHJHuZYbtJq8Da8wifJENq8uBxDuWoP9pVe2Qe';
                Currency.ETH.id = '3fVdr1oiX39uS82ZGUPnu7atNQtFHZfPnseRDUcDxrhp';
                Currency.LTC.id = 'NO_ID_YET'; // FIXME
                Currency.ZEC.id = 'NO_ID_YET'; // FIXME
                Currency.invalidateCache();
            }
        }
    }

    WavesWalletListController.$inject = ['$scope', '$interval', 'wallet.events', 'applicationContext',
                                         'apiService', 'transactionLoadingService', 'dialogService'];

    angular
        .module('app.wallet')
        .controller('walletListController', WavesWalletListController);
})();

(function () {
    'use strict';

    var DEFAULT_FEE_AMOUNT = '0.001';
    var FEE_CURRENCY = Currency.MIR;

    function WalletSendController($scope, $timeout, constants, events, autocomplete,
                                  applicationContext, apiService, dialogService,
                                  transactionBroadcast, assetService, notificationService,
                                  formattingService, addressService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.autocomplete = autocomplete;

        ctrl.confirm = {
            recipient: ''
        };

        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.transfer,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, ctrl.assetBalance.currency);
                var address = transaction.recipient;
                var displayMessage = 'Sent ' + amount.formatAmount(true) + ' of ' +
                    ctrl.assetBalance.currency.displayName +
                    '<br/>Recipient ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            }
        );

        ctrl.validationOptions = {
            rules: {
                sendRecipient: {
                    required: true
                },
                sendAmount: {
                    required: true,
                    decimal: 8, // stub value updated on validation
                    min: 0,     // stub value updated on validation
                    max: constants.JAVA_MAX_LONG // stub value updated on validation
                },
                sendFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                },
                sendAttachment: {
                    maxbytelength: constants.MAXIMUM_ATTACHMENT_BYTE_SIZE
                }
            },
            messages: {
                sendRecipient: {
                    required: 'Recipient account number is required'
                },
                sendAmount: {
                    required: 'Amount to send is required'
                },
                sendFee: {
                    required: 'Transaction fee is required',
                    decimal: 'Transaction fee must be a number with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Transaction fee is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                },
                sendAttachment: {
                    maxbytelength: 'Attachment is too long'
                }
            }
        };

        ctrl.submitTransfer = submitTransfer;
        ctrl.broadcastTransaction = broadcastTransaction;

        resetForm();

        $scope.$on(events.WALLET_SEND, function (event, eventData) {

            resetForm();

            ctrl.feeAssetBalance = eventData.wavesBalance;
            ctrl.assetBalance = eventData.assetBalance;
            ctrl.feeAndTransferAssetsAreTheSame = eventData.assetBalance.currency === FEE_CURRENCY;
            ctrl.currency = eventData.assetBalance.currency.displayName;

            // Update validation options and check how they affect form validation
            ctrl.validationOptions.rules.sendAmount.decimal = ctrl.assetBalance.currency.precision;
            var minimumPayment = Money.fromCoins(1, ctrl.assetBalance.currency);
            ctrl.validationOptions.rules.sendAmount.min = minimumPayment.toTokens();
            ctrl.validationOptions.rules.sendAmount.max = ctrl.assetBalance.toTokens();
            ctrl.validationOptions.messages.sendAmount.decimal = 'The amount to send must be a number ' +
                'with no more than ' + minimumPayment.currency.precision +
                ' digits after the decimal point (.)';
            ctrl.validationOptions.messages.sendAmount.min = 'Payment amount is too small. ' +
                'It should be greater or equal to ' + minimumPayment.formatAmount(false);
            ctrl.validationOptions.messages.sendAmount.max = 'Payment amount is too big. ' +
                'It should be less or equal to ' + ctrl.assetBalance.formatAmount(false);

            dialogService.open('#wB-butSend-WAV');
        });

        function submitTransfer(transferForm) {
            if (!transferForm.validate(ctrl.validationOptions)) {
                // Prevent dialog from closing
                return false;
            }

            var amount = Money.fromTokens(ctrl.amount, ctrl.assetBalance.currency);
            var transferFee = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), FEE_CURRENCY);
            var paymentCost = transferFee;

            if (ctrl.feeAndTransferAssetsAreTheSame) {
                paymentCost = paymentCost.plus(amount);
            }

            if (paymentCost.greaterThan(ctrl.feeAssetBalance)) {
                notificationService.error('Not enough ' + FEE_CURRENCY.displayName + ' for the transfer');
                return false;
            }

            var assetTransfer = {
                recipient: addressService.cleanupOptionalPrefix(ctrl.recipient),
                amount: amount,
                fee: transferFee
            };

            if (ctrl.attachment) {
                assetTransfer.attachment = converters.stringToByteArray(ctrl.attachment);
            }

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create a transaction and wait for confirmation
            ctrl.broadcast.setTransaction(assetService.createAssetTransferTransaction(assetTransfer, sender));

            // Set data to the confirmation dialog
            ctrl.confirm.amount = assetTransfer.amount;
            ctrl.confirm.fee = assetTransfer.fee;
            ctrl.confirm.recipient = assetTransfer.recipient;

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#send-payment-confirmation');
            }, 1);

            // Close payment dialog
            return true;
        }

        function broadcastTransaction() {
            ctrl.broadcast.broadcast();
        }

        function resetForm() {
            ctrl.recipient = '';
            ctrl.amount = '0';
            ctrl.confirm.amount = Money.fromTokens(0, Currency.MIR);
            ctrl.confirm.fee = Money.fromTokens(DEFAULT_FEE_AMOUNT, FEE_CURRENCY);
            ctrl.autocomplete.defaultFee(Number(DEFAULT_FEE_AMOUNT));
        }
    }

    WalletSendController.$inject = ['$scope', '$timeout', 'constants.ui', 'wallet.events', 'autocomplete.fees',
        'applicationContext', 'apiService', 'dialogService', 'transactionBroadcast', 'assetService',
        'notificationService', 'formattingService', 'addressService'];

    angular
        .module('app.wallet')
        .controller('walletSendController', WalletSendController);
})();

(function () {
    'use strict';

    var DEFAULT_FEE_AMOUNT = '0.001',
        DEFAULT_ERROR_MESSAGE = 'Connection is lost';

    function WavesWalletWithdrawController ($scope, constants, events, autocomplete, dialogService, $element,
                                            coinomatService, transactionBroadcast, notificationService,
                                            apiService, formattingService, assetService, applicationContext) {

        var ctrl = this;
        var type = $element.data('type');

        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, Currency.MIR);
        var notPermittedBitcoinAddresses = {};

        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.transfer,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, ctrl.assetBalance.currency);
                var address = transaction.recipient;
                var displayMessage = 'Sent ' + amount.formatAmount(true) + ' of ' +
                    ctrl.assetBalance.currency.displayName +
                    '<br/>Gateway ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            });

        ctrl.autocomplete = autocomplete;

        ctrl.validationOptions = {
            onfocusout: function (element) {
                return !(element.name in ['withdrawFee']); // FIXME
            },
            rules: {
                withdrawAddress: {
                    required: true
                },
                withdrawAmount: {
                    required: true,
                    decimal: 8,
                    min: 0,
                    max: constants.JAVA_MAX_LONG
                },
                withdrawFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                },
                withdrawTotal: {
                    required: true,
                    decimal: 8,
                    min: 0,
                    max: constants.JAVA_MAX_LONG
                }
            },
            messages: {
                withdrawAddress: {
                    required: 'Bitcoin address is required'
                },
                withdrawAmount: {
                    required: 'Amount to withdraw is required'
                },
                withdrawFee: {
                    required: 'Gateway transaction fee is required',
                    decimal: 'Transaction fee must be with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Transaction fee is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                },
                withdrawTotal: {
                    required: 'Total amount is required'
                }
            }
        };

        ctrl.confirm = {
            amount: {},
            fee: {},
            gatewayAddress: '',
            address: ''
        };

        ctrl.confirmWithdraw = confirmWithdraw;
        ctrl.refreshAmount = refreshAmount;
        ctrl.refreshTotal = refreshTotal;
        ctrl.broadcastTransaction = broadcastTransaction;
        ctrl.gatewayEmail = 'support@coinomat.com';

        resetForm();

        $scope.$on(events.WALLET_WITHDRAW + type, function (event, eventData) {
            ctrl.assetBalance = eventData.assetBalance;
            ctrl.wavesBalance = eventData.wavesBalance;

            if (ctrl.assetBalance.currency === Currency.BTC ||
                ctrl.assetBalance.currency === Currency.ETH ||
                ctrl.assetBalance.currency === Currency.LTC ||
                ctrl.assetBalance.currency === Currency.ZEC ||
                ctrl.assetBalance.currency === Currency.BCH
            ) {
                withdrawCrypto();
            } else if (ctrl.assetBalance.currency === Currency.EUR) {
                withdrawEUR();
            } else if (ctrl.assetBalance.currency === Currency.USD) {
                withdrawUSD();
            } else {
                $scope.home.featureUnderDevelopment();
            }
        });

        function withdrawCrypto() {
            coinomatService.getWithdrawRate(ctrl.assetBalance.currency)
                .then(function (response) {
                    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
                    var minimumPayment = Money.fromCoins(1, ctrl.assetBalance.currency);
                    minimumPayment = Money.fromTokens(Math.max(minimumPayment.toTokens(), response.in_min),
                        ctrl.assetBalance.currency);
                    var maximumPayment = Money.fromTokens(Math.min(ctrl.assetBalance.toTokens(),
                        response.in_max), ctrl.assetBalance.currency);
                    ctrl.sourceCurrency = ctrl.assetBalance.currency.displayName;
                    ctrl.isEthereum = (ctrl.assetBalance.currency === Currency.ETH);
                    ctrl.exchangeRate = response.xrate;
                    ctrl.feeIn = response.fee_in;
                    ctrl.feeOut = response.fee_out;
                    ctrl.targetCurrency = response.to_txt;
                    ctrl.total = response.in_def;
                    ctrl.minimumPayment = minimumPayment;
                    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
                    ctrl.validationOptions.rules.withdrawAmount.decimal = ctrl.assetBalance.currency.precision;
                    ctrl.validationOptions.rules.withdrawAmount.max = maximumPayment.toTokens();
                    ctrl.validationOptions.rules.withdrawAmount.min = minimumPayment.toTokens();
                    ctrl.validationOptions.messages.withdrawAddress.required = minimumPayment.currency.displayName +
                        ' address is required';
                    ctrl.validationOptions.messages.withdrawAmount.decimal = 'The amount to withdraw must be ' +
                        'a number with no more than ' + minimumPayment.currency.precision +
                        ' digits after the decimal point (.)';
                    ctrl.validationOptions.messages.withdrawAmount.min = 'Withdraw amount is too small. ' +
                        'It should be greater or equal to ' + minimumPayment.formatAmount();
                    ctrl.validationOptions.messages.withdrawAmount.max = 'Withdraw amount is too big. ' +
                        'It should be less or equal to ' + maximumPayment.formatAmount();

                    refreshAmount();

                    dialogService.open('#withdraw-crypto-dialog');
                }).catch(function (exception) {
                if (exception && exception.data && exception.data.error) {
                    notificationService.error(exception.error);
                } else {
                    notificationService.error(DEFAULT_ERROR_MESSAGE);
                }
            }).then(function () {
                return coinomatService.getDepositDetails(Currency.BTC, Currency.BTC,
                    applicationContext.account.address);
            }).then(function (depositDetails) {
                notPermittedBitcoinAddresses[depositDetails.address] = 1;

                return coinomatService.getDepositDetails(Currency.BTC, Currency.MIR,
                    applicationContext.account.address);
            }).then(function (depositDetails) {
                notPermittedBitcoinAddresses[depositDetails.address] = 1;
            });
        }

        function withdrawEUR() {
            ctrl.sourceCurrency = Currency.EUR.displayName;
            dialogService.open('#withdraw-fiat-dialog');
        }

        function withdrawUSD() {
            ctrl.sourceCurrency = Currency.USD.displayName;
            dialogService.open('#withdraw-fiat-dialog');
        }

        function validateRecipientBTCAddress(recipient) {
            if (!recipient.match(/^[0-9a-z]{27,34}$/i)) {
                throw new Error('Bitcoin address is invalid. Expected address length is from 27 to 34 symbols');
            }

            if (notPermittedBitcoinAddresses[recipient]) {
                throw new Error('Withdraw on deposit bitcoin accounts is not permitted');
            }
        }

        function validateWithdrawCost(withdrawCost, availableFunds) {
            if (withdrawCost.greaterThan(availableFunds)) {
                throw new Error('Not enough Mir for the withdraw transfer');
            }
        }

        function confirmWithdraw (amountForm) {
            if (!amountForm.validate(ctrl.validationOptions)) {
                return false;
            }

            try {
                var withdrawCost = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), Currency.MIR);
                validateWithdrawCost(withdrawCost, ctrl.wavesBalance);
                if (ctrl.assetBalance.currency === Currency.BTC) {
                    validateRecipientBTCAddress(ctrl.recipient);
                } else if (ctrl.assetBalance.currency === Currency.ETH) {
                    // TODO
                }
            } catch (e) {
                notificationService.error(e.message);
                return false;
            }

            var total = Money.fromTokens(ctrl.total, ctrl.assetBalance.currency);
            var fee = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), Currency.MIR);
            ctrl.confirm.amount = total;
            ctrl.confirm.fee = fee;
            ctrl.confirm.recipient = ctrl.recipient;

            coinomatService.getWithdrawDetails(ctrl.assetBalance.currency, ctrl.recipient)
                .then(function (withdrawDetails) {
                    ctrl.confirm.gatewayAddress = withdrawDetails.address;

                    var assetTransfer = {
                        recipient: withdrawDetails.address,
                        amount: total,
                        fee: fee,
                        attachment: converters.stringToByteArray(withdrawDetails.attachment)
                    };
                    var sender = {
                        publicKey: applicationContext.account.keyPair.public,
                        privateKey: applicationContext.account.keyPair.private
                    };
                    // creating the transaction and waiting for confirmation
                    ctrl.broadcast.setTransaction(assetService.createAssetTransferTransaction(assetTransfer, sender));

                    resetForm();

                    dialogService.open('#withdraw-confirmation');
                })
                .catch(function (exception) {
                    notificationService.error(exception.message);
                });

            return true;
        }

        function broadcastTransaction () {
            ctrl.broadcast.broadcast();
        }

        function refreshTotal () {
            var amount = ctrl.exchangeRate * ctrl.amount;
            var total = Money.fromTokens(amount + ctrl.feeIn + ctrl.feeOut, ctrl.assetBalance.currency);
            ctrl.total = total.formatAmount(true, false);
        }

        function refreshAmount () {
            var total = Math.max(0, ctrl.exchangeRate * (ctrl.total - ctrl.feeIn) - ctrl.feeOut);
            var amount = Money.fromTokens(total, ctrl.assetBalance.currency);
            ctrl.amount = amount.formatAmount(true, false);
        }

        function resetForm () {
            ctrl.recipient = '';
            ctrl.address = '';
            ctrl.autocomplete.defaultFee(Number(DEFAULT_FEE_AMOUNT));
        }
    }

    WavesWalletWithdrawController.$inject = [
        '$scope', 'constants.ui', 'wallet.events', 'autocomplete.fees', 'dialogService', '$element',
        'coinomatService', 'transactionBroadcast', 'notificationService',
        'apiService', 'formattingService', 'assetService', 'applicationContext'
    ];

    angular
        .module('app.wallet')
        .controller('walletWithdrawController', WavesWalletWithdrawController);
})();

(function () {
    'use strict';

    var DEFAULT_ERROR_MESSAGE = 'Connection is lost';

    function WavesWalletDepositController($scope, events, coinomatService, dialogService, notificationService,
                                          applicationContext, bitcoinUriService, utilsService, $element) {

        var ctrl = this;
        var currencyId = Currency[$element.data('currency')].id;

        ctrl.btc = {
            bitcoinAddress: '',
            bitcoinAmount: '',
            bitcoinUri: '',
            minimumAmount: 0.001
        };

        ctrl.eth = {
            ethereumAddress: '',
            minimumAmount: 0.001
        };

        ctrl.ltc = {
            litecoinAddress: '',
            minimumAmount: 0.001
        };

        ctrl.zec = {
            zcashAddress: '',
            minimumAmount: 0.001
        };

        ctrl.bch = {
            cashAddress: '',
            minimumAmount: 0.001
        };

        ctrl.fiat = {
            verificationLink: 'https://go.idnow.de/coinomat/userdata/' + applicationContext.account.address,
            email: 'support@coinomat.com'
        };

        ctrl.refreshBTCUri = function () {
            var params = null;
            if (ctrl.btc.bitcoinAmount >= ctrl.btc.minimumAmount) {
                params = {
                    amount: ctrl.btc.bitcoinAmount
                };
            }
            ctrl.btc.bitcoinUri = bitcoinUriService.generate(ctrl.btc.bitcoinAddress, params);
        };

        $scope.$on(events.WALLET_DEPOSIT + currencyId, function (event, eventData) {
            ctrl.depositWith = eventData.depositWith;
            ctrl.assetBalance = eventData.assetBalance;
            ctrl.currency = ctrl.assetBalance.currency.displayName;

            // Show deposit popups only on mainnet
            if (ctrl.assetBalance.currency === Currency.BTC && !utilsService.isTestnet()) {
                depositBTC();
            } else if (ctrl.assetBalance.currency === Currency.ETH && !utilsService.isTestnet()) {
                depositETH();
            } else if (ctrl.assetBalance.currency === Currency.LTC && !utilsService.isTestnet()) {
                depositLTC();
            } else if (ctrl.assetBalance.currency === Currency.ZEC && !utilsService.isTestnet()) {
                depositZEC();
            } else if (ctrl.assetBalance.currency === Currency.BCH && !utilsService.isTestnet()) {
                depositBCH();
            } else if (ctrl.assetBalance.currency === Currency.EUR) {
                depositEUR();
            } else if (ctrl.assetBalance.currency === Currency.USD) {
                depositUSD();
            } else {
                $scope.home.featureUnderDevelopment();
            }
        });

        function catchErrorMessage(e) {
            if (e && e.message) {
                notificationService.error(e.message);
            } else {
                notificationService.error(DEFAULT_ERROR_MESSAGE);
            }
        }

        function depositBTC() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-btc-dialog');
                    ctrl.btc.bitcoinAddress = depositDetails.address;
                    ctrl.btc.bitcoinUri = bitcoinUriService.generate(ctrl.btc.bitcoinAddress);
                })
                .catch(catchErrorMessage);
        }

        function depositETH() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-eth-dialog');
                    ctrl.eth.ethereumAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositLTC() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-ltc-dialog');
                    ctrl.ltc.litecoinAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositZEC() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-zec-dialog');
                    ctrl.zec.zcashAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositBCH() {
            coinomatService.getDepositDetails(ctrl.depositWith, ctrl.assetBalance.currency,
                applicationContext.account.address)
                .then(function (depositDetails) {
                    dialogService.open('#deposit-bch-dialog');
                    ctrl.bch.cashAddress = depositDetails.address;
                })
                .catch(catchErrorMessage);
        }

        function depositEUR() {
            dialogService.open('#deposit-eur-dialog');
        }

        function depositUSD() {
            dialogService.open('#deposit-usd-dialog');
        }
    }

    WavesWalletDepositController.$inject = [
        '$scope', 'wallet.events', 'coinomatService', 'dialogService', 'notificationService',
        'applicationContext', 'bitcoinUriService', 'utilsService', '$element'
    ];

    angular
        .module('app.wallet')
        .controller('walletDepositController', WavesWalletDepositController);
})();

(function () {
    'use strict';

    var DEFAULT_AMOUNT_TO_PAY = 50;

    function FiatCurrency (code, displayName) {
        this.code = code;
        if (displayName) {
            this.displayName = displayName;
        } else {
            this.displayName = code;
        }
    }

    function WavesCardDepositController ($scope, $window, $q, events, dialogService,
                                         fiatService, applicationContext, notificationService) {
        var deferred;
        var ctrl = this;
        ctrl.currencies = [new FiatCurrency('EURO', 'Euro'), new FiatCurrency('USD')];
        ctrl.limits = {};
        ctrl.updateReceiveAmount = updateReceiveAmount;
        ctrl.updateLimitsAndReceiveAmount = updateLimitsAndReceiveAmount;
        ctrl.redirectToMerchant = redirectToMerchant;

        reset();

        $scope.$on(events.WALLET_CARD_DEPOSIT, function (event, eventData) {
            dialogService.open('#card-deposit-dialog');

            reset();
            ctrl.crypto = eventData.currency;

            updateLimitsAndReceiveAmount();
        });

        function reset() {
            ctrl.payAmount = DEFAULT_AMOUNT_TO_PAY;
            ctrl.payCurrency = ctrl.currencies[0];
            ctrl.crypto = {};
            ctrl.getAmount = '';
        }

        function updateLimitsAndReceiveAmount() {
            fiatService.getLimits(applicationContext.account.address, ctrl.payCurrency.code, ctrl.crypto)
                .then(function (response) {
                    ctrl.limits = {
                        min: Number(response.min),
                        max: Number(response.max)
                    };

                    if (ctrl.payAmount < ctrl.limits.min) {
                        ctrl.payAmount = ctrl.limits.min;
                    } else if (ctrl.payAmount > ctrl.limits.max) {
                        ctrl.payAmount = ctrl.limits.max;
                    }
                }).catch(function (response) {
                    remotePartyErrorHandler('get limits', response);
                });

            updateReceiveAmount();
        }

        function remotePartyErrorHandler(operationName, response) {
            if (response) {
                if (response.data) {
                    notificationService.error(response.data.message);
                } else if (response.statusText) {
                    notificationService.error('Failed to ' + operationName + '. Error code: ' + response.status +
                        '<br/>Message: ' + response.statusText);
                }
            } else {
                notificationService.error('Operation failed: ' + operationName);
            }
        }

        function updateReceiveAmount() {
            if (deferred) {
                deferred.reject();
                deferred = undefined;
            }

            var amount = Number(ctrl.payAmount);
            if (isNaN(amount) || ctrl.payAmount <= 0) {
                ctrl.getAmount = '';
                return;
            }

            deferred = $q.defer();
            deferred.promise.then(function (response) {
                if (response) {
                    ctrl.getAmount = response + ' ' + ctrl.crypto.shortName;
                } else {
                    ctrl.getAmount = '';
                }
            }).catch(function (value) {
                if (value) {
                    remotePartyErrorHandler('get rates', value);
                }
            });

            fiatService.getRate(applicationContext.account.address, ctrl.payAmount, ctrl.payCurrency.code, ctrl.crypto)
                .then(deferred.resolve).catch(deferred.reject);
        }

        function redirectToMerchant() {
            try {
                validateAmountToPay();

                var url = fiatService.getMerchantUrl(applicationContext.account.address,
                    ctrl.payAmount, ctrl.payCurrency.code, ctrl.crypto);
                $window.open(url, '_blank');

                return true;
            } catch (e) {
                notificationService.error(e.message);
                return false;
            }
        }

        function validateAmountToPay() {
            if (Number(ctrl.payAmount) < ctrl.limits.min) {
                throw new Error('Minimum amount to pay is ' + ctrl.limits.min + ' ' + ctrl.payCurrency.displayName);
            }
            if (Number(ctrl.payAmount) > ctrl.limits.max) {
                throw new Error('Maximum amount to pay is ' + ctrl.limits.max + ' ' + ctrl.payCurrency.displayName);
            }
        }
    }

    WavesCardDepositController.$inject = ['$scope', '$window', '$q', 'wallet.events', 'dialogService',
                                          'coinomatFiatService', 'applicationContext', 'notificationService'];

    angular
        .module('app.wallet')
        .controller('cardDepositController', WavesCardDepositController);
})();

(function() {
    'use strict';

    angular.module('app.tokens', ['app.shared']);
})();

(function () {
    'use strict';

    var ASSET_DESCRIPTION_MAX = 1000;
    var ASSET_NAME_MIN = 4;
    var ASSET_NAME_MAX = 16;
    var TOKEN_DECIMALS_MAX = 8;
    var FIXED_ISSUE_FEE = new Money(1, Currency.MIR);

    function TokenCreateController($scope, $interval, constants, applicationContext, assetService,
                                   dialogService, apiService, notificationService,
                                   formattingService, transactionBroadcast) {
        var refreshPromise;
        var refreshDelay = 15 * 1000;
        var transaction;
        var ctrl = this;

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        ctrl.wavesBalance = new Money(0, Currency.MIR);
        ctrl.issuanceValidationOptions = {
            rules: {
                assetName: {
                    required: true,
                    minbytelength: ASSET_NAME_MIN,
                    maxbytelength: ASSET_NAME_MAX
                },
                assetDescription: {
                    maxbytelength: ASSET_DESCRIPTION_MAX
                },
                assetTotalTokens: {
                    required: true,
                    min: 0
                },
                assetTokenDecimalPlaces: {
                    required: true,
                    min: 0,
                    max: TOKEN_DECIMALS_MAX
                }
            },
            messages: {
                assetName: {
                    required: 'Asset name is required',
                    minbytelength: 'Asset name is too short. Please give your asset a longer name',
                    maxbytelength: 'Asset name is too long. Please give your asset a shorter name'
                },
                assetDescription: {
                    maxbytelength: 'Maximum length of asset description exceeded. Please make a shorter description'
                },
                assetTotalTokens: {
                    required: 'Total amount of issued tokens in required',
                    min: 'Total issued tokens amount must be greater than or equal to zero'
                },
                assetTokenDecimalPlaces: {
                    required: 'Number of token decimal places is required',
                    min: 'Number of token decimal places must be greater or equal to zero',
                    max: 'Number of token decimal places must be less than or equal to ' + TOKEN_DECIMALS_MAX
                }
            }
        };
        ctrl.asset = {
            fee: FIXED_ISSUE_FEE
        };
        ctrl.confirm = {};
        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.issue,
            function (transaction, response) {
                resetForm();

                applicationContext.cache.putAsset(response);

                var displayMessage = 'Asset ' + ctrl.confirm.name + ' has been issued!<br/>' +
                    'Total tokens amount: ' + ctrl.confirm.totalTokens + '<br/>' +
                    'Date: ' + formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            });
        ctrl.broadcastIssueTransaction = broadcastIssueTransaction;
        ctrl.assetIssueConfirmation = assetIssueConfirmation;
        ctrl.resetForm = resetForm;

        loadDataFromBackend();
        resetForm();

        function assetIssueConfirmation(form, event) {
            event.preventDefault();

            if (!form.validate()) {
                return;
            }

            if (ctrl.asset.fee.greaterThan(ctrl.wavesBalance)) {
                notificationService.error('Not enough funds for the issue transaction fee');
                return;
            }

            var decimalPlaces = Number(ctrl.asset.decimalPlaces);
            var maxTokens = Math.floor(constants.JAVA_MAX_LONG / Math.pow(10, decimalPlaces));
            if (ctrl.asset.totalTokens > maxTokens) {
                notificationService.error('Total issued tokens amount must be less than ' + maxTokens);

                return;
            }

            var asset = {
                name: ctrl.asset.name,
                description: ctrl.asset.description,
                totalTokens: ctrl.asset.totalTokens,
                decimalPlaces: Number(ctrl.asset.decimalPlaces),
                reissuable: ctrl.asset.reissuable,
                fee: ctrl.asset.fee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            ctrl.confirm.name = ctrl.asset.name;
            ctrl.confirm.totalTokens = ctrl.asset.totalTokens;
            ctrl.confirm.reissuable = ctrl.asset.reissuable ? 'RE-ISSUABLE' : 'NON RE-ISSUABLE';

            ctrl.broadcast.setTransaction(assetService.createAssetIssueTransaction(asset, sender));

            dialogService.open('#create-asset-confirmation');
        }

        function broadcastIssueTransaction() {
            ctrl.broadcast.broadcast();
        }

        function resetForm() {
            ctrl.asset.name = '';
            ctrl.asset.description = '';
            ctrl.asset.totalTokens = '0';
            ctrl.asset.decimalPlaces = '0';
            ctrl.asset.reissuable = false;
        }

        function loadDataFromBackend() {
            refreshBalance();

            refreshPromise = $interval(function() {
                refreshBalance();
            }, refreshDelay);
        }

        function refreshBalance() {
            apiService.address.balance(applicationContext.account.address)
                .then(function (response) {
                    ctrl.wavesBalance = Money.fromCoins(response.balance, Currency.MIR);
                });
        }
    }

    TokenCreateController.$inject = ['$scope', '$interval', 'constants.ui', 'applicationContext',
        'assetService', 'dialogService', 'apiService', 'notificationService',
        'formattingService', 'transactionBroadcast'];

    angular
        .module('app.tokens')
        .controller('tokenCreateController', TokenCreateController);
})();

(function() {
    'use strict';

    angular.module('app.dex', ['app.shared', 'ngSanitize']);
})();

(function () {
    'use strict';

    var POLLING_DELAY = 5000,
        HISTORY_LIMIT = 50;

    function DexController($scope, $interval, applicationContext, assetStoreFactory, datafeedApiService,
                           dexOrderService, dexOrderbookService, notificationService, utilsService, dialogService) {

        var ctrl = this,
            intervalPromise,

            assetStore = assetStoreFactory.createStore(applicationContext.account.address),

            sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

        ctrl.assetsList = [];

        ctrl.pair = {
            amountAsset: Currency.MIR,
            priceAsset: Currency.PROTON
        };

        emptyDataFields();

        var favoritePairs = [
            { amountAsset: Currency.MIR, priceAsset: Currency.PROTON }
        ];

        ctrl.favoritePairs = favoritePairs;

        ctrl.createOrder = function (type, price, amount, fee, callback) {
            // TODO : add a queue for the orders which weren't yet accepted

            function emptyBadOrderFields() {
                ctrl.badOrderQuestion = '';
                ctrl.placeBadOrder = ctrl.refuseBadOrder = function () {};
            }

            var amountName = ctrl.pair.amountAsset.displayName,
                priceName = ctrl.pair.priceAsset.displayName,
                badSellOrder = (type === 'sell' && ctrl.buyOrders.length && price < ctrl.buyOrders[0].price * 0.9),
                badBuyOrder = (type === 'buy' && ctrl.sellOrders.length && price > ctrl.sellOrders[0].price * 1.1);

            if (badSellOrder || badBuyOrder) {

                ctrl.badOrderQuestion = 'Are you sure you want to ' + type + ' ' +
                    amountName + ' at price ' + price + ' ' + priceName + '?';

                ctrl.placeBadOrder = function () {
                    emptyBadOrderFields();
                    ctrl.realCreateOrder(type, price, amount, fee, callback);
                };

                ctrl.refuseBadOrder = function () {
                    emptyBadOrderFields();
                    callback();
                };

                dialogService.open('#dex-bad-order-confirmation');

            } else {
                ctrl.realCreateOrder(type, price, amount, fee, callback);
            }

        };

        ctrl.realCreateOrder = function (type, price, amount, fee, callback) {
            // TODO : add a queue for the orders which weren't yet accepted
            dexOrderService
                .addOrder(ctrl.pair, {
                    orderType: type,
                    amount: Money.fromTokens(amount, ctrl.pair.amountAsset),
                    price: OrderPrice.fromTokens(price, ctrl.pair),
                    fee: Money.fromTokens(fee, Currency.MIR)
                }, sender)
                .then(function () {
                    refreshOrderbooks();
                    refreshUserOrders();
                    notificationService.notice('Order has been created!');
                    if (callback) {
                        callback();
                    }
                })
                .catch(function (e) {
                    var errorMessage = e.data ? e.data.message : null;
                    notificationService.error(errorMessage || 'Order has not been created!');
                    if (callback) {
                        callback();
                    }
                });
        };

        ctrl.cancelOrder = function (order) {
            // TODO : add a queue for the orders which weren't yet canceled

            // TODO : add different messages for cancel and delete actions
            dexOrderService
                .removeOrder(ctrl.pair, order, sender)
                .then(function () {
                    refreshOrderbooks();
                    refreshUserOrders();
                    notificationService.notice('Order has been canceled!');
                })
                .catch(function (e) {
                    console.log(e);
                    notificationService.error('Order could not be canceled!');
                });
        };

        ctrl.changePair = function (pair) {
            ctrl.pair = pair;
            emptyDataFields();
            refreshAll();
        };

        ctrl.fillBuyForm = fillBuyForm;

        ctrl.fillSellForm = fillSellForm;

        assetStore
            .getAll()
            .then(function (assetsList) {
                ctrl.assetsList = assetsList;
            })
            .then(function () {
                return dexOrderbookService.getOrderbook(ctrl.pair.amountAsset, ctrl.pair.priceAsset);
            })
            .then(function (orderbook) {
                ctrl.pair = {
                    // Here we just get assets by their IDs
                    amountAsset: assetStore.syncGetAsset(orderbook.pair.amountAsset),
                    priceAsset: assetStore.syncGetAsset(orderbook.pair.priceAsset)
                };

                ctrl.buyOrders = orderbook.bids;
                ctrl.sellOrders = orderbook.asks;
                refreshUserOrders();
                refreshTradeHistory();
            })
            .catch(function (e) {
                console.log(e);
            });

        // Events are from asset pickers
        $scope.$on('asset-picked', function (e, newAsset, type) {
            // Define in which widget the asset was changed
            ctrl.pair[type] = newAsset;
            emptyDataFields();
            refreshAll();
        });

        // Enable polling for orderbooks and newly created assets
        intervalPromise = $interval(function () {
            refreshAll();
        }, POLLING_DELAY);

        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        function emptyDataFields() {
            ctrl.buyOrders = [];
            ctrl.sellOrders = [];
            ctrl.userOrders = [];

            ctrl.buyFormValues = {};
            ctrl.sellFormValues = {};

            ctrl.tradeHistory = [];
            ctrl.lastTradePrice = 0;

            fillBuyForm();
            fillSellForm();

            // That forces children components to react on the pair change
            ctrl.pair = _.clone(ctrl.pair);
        }

        function refreshAll() {
            refreshOrderbooks();
            refreshUserOrders();
            refreshTradeHistory();
        }

        function refreshOrderbooks() {
            if (!ctrl.pair.amountAsset || !ctrl.pair.priceAsset) {
                return;
            }

            dexOrderbookService
                .getOrderbook(ctrl.pair.amountAsset, ctrl.pair.priceAsset)
                .then(function (orderbook) {
                    ctrl.buyOrders = orderbook.bids;
                    ctrl.sellOrders = orderbook.asks;
                    return orderbook.pair;
                })
                .then(function (pair) {
                    // Placing each asset in the right widget
                    if (ctrl.pair.amountAsset.id !== pair.amountAsset && ctrl.pair.priceAsset.id !== pair.priceAsset) {
                        var temp = ctrl.pair.amountAsset;
                        ctrl.pair.amountAsset = ctrl.pair.priceAsset;
                        ctrl.pair.priceAsset = temp;
                    }
                })
                .catch(function (e) {
                    console.log(e);
                });
        }

        function refreshUserOrders() {
            if (!ctrl.pair.amountAsset || !ctrl.pair.priceAsset) {
                return;
            }

            dexOrderService
                .getOrders(ctrl.pair)
                .then(function (orders) {
                    // TODO : add here orders from pending queues
                    ctrl.userOrders = orders;
                });
        }

        function refreshTradeHistory() {
            var pair = ctrl.pair;
            if (pair) {
                if (utilsService.isTestnet()) {
                    pair = utilsService.testnetSubstitutePair(pair);
                }

                datafeedApiService
                    .getTrades(pair, HISTORY_LIMIT)
                    .then(function (response) {
                        ctrl.tradeHistory = response.map(function (trade) {
                            return {
                                timestamp: trade.timestamp,
                                type: trade.type,
                                typeTitle: trade.type === 'buy' ? 'Buy' : 'Sell',
                                price: trade.price,
                                amount: trade.amount,
                                total: trade.price * trade.amount
                            };
                        });

                        ctrl.lastTradePrice = ctrl.tradeHistory[0].price;
                    });
            }
        }

        function fillBuyForm(price, amount, total) {
            ctrl.buyFormValues = {
                price: price,
                amount: amount,
                total: total
            };
        }

        function fillSellForm(price, amount, total) {
            ctrl.sellFormValues = {
                price: price,
                amount: amount,
                total: total
            };
        }
    }

    DexController.$inject = ['$scope', '$interval', 'applicationContext', 'assetStoreFactory', 'datafeedApiService',
        'dexOrderService', 'dexOrderbookService', 'notificationService', 'utilsService', 'dialogService'];

    angular
        .module('app.dex')
        .component('wavesDex', {
            controller: DexController,
            templateUrl: 'dex/component'
        });
})();

(function () {
    'use strict';

    var ASSET_ID_BYTE_LENGTH = 32;

    function AssetPickerController($scope, $element, autocomplete, apiService, utilityService) {
        var ctrl = this,
            autocompleteElement = $element.find('md-autocomplete');

        ctrl.isAssetLoading = false;
        ctrl.isPickingInProgress = false;
        ctrl.autocomplete = autocomplete.create();

        ctrl.$onChanges = function () {
            if (ctrl.assets && ctrl.pickedAsset) {
                if (!ctrl.isPickingInProgress) {
                    ctrl.autocomplete.selectedAsset = ctrl.pickedAsset;
                }

                ctrl.autocomplete.assets = ctrl.assets.map(function (asset) {
                    return asset.currency;
                }).filter(function (asset) {
                    return asset.verified && (asset !== ctrl.hiddenAsset);
                });
            }
        };

        autocompleteElement.on('focusin', function () {
            ctrl.isPickingInProgress = true;
        });

        autocompleteElement.on('focusout', function () {
            ctrl.isPickingInProgress = false;
            ctrl.autocomplete.selectedAsset = ctrl.pickedAsset;
        });

        ctrl.changeAsset = function () {
            var asset = ctrl.autocomplete.selectedAsset;
            if (asset && asset !== ctrl.pickedAsset) {
                ctrl.isPickingInProgress = false;
                $scope.$emit('asset-picked', asset, ctrl.type);
            }
        };

        ctrl.findAssets = function (query) {
            var assets = ctrl.autocomplete.querySearch(query);
            if (assets.length === 0 && isValidAssetId(query)) {
                ctrl.isAssetLoading = true;
                apiService.transactions.info(query).then(function (response) {
                    var currency = Currency.create({
                        id: response.id,
                        displayName: response.name,
                        precision: response.decimals
                    });

                    ctrl.autocomplete.assets.push(currency);
                    ctrl.autocomplete.selectedAsset = currency;

                    // That strangely unfocuses the element thus avoiding an empty dropdown.
                    autocompleteElement.focus();
                }).finally(function () {
                    ctrl.isAssetLoading = false;
                });
                return [];
            } else {
                ctrl.isAssetLoading = false;
                return assets;
            }
        };

        function isValidAssetId(str) {
            if (utilityService.isValidBase58String(str)) {
                return utilityService.base58StringToByteArray(str).length === ASSET_ID_BYTE_LENGTH;
            }
        }
    }

    AssetPickerController.$inject = ['$scope', '$element', 'autocomplete.assets', 'apiService', 'utilityService'];

    angular
        .module('app.dex')
        .component('wavesDexAssetPicker', {
            controller: AssetPickerController,
            bindings: {
                name: '@',
                type: '@',
                assets: '<',
                hiddenAsset: '<',
                pickedAsset: '<'
            },
            templateUrl: 'dex/asset.picker.component'
        });
})();

(function () {
    'use strict';

    var CANDLE_NUMBER = 100,
        CANDLE_FRAME = 30,
        POLLING_DELAY = 5000;

    function isCandleEmpty(c) {
        return +c.open === 0 && +c.high === 0 && +c.low === 0 && +c.close === 0 && +c.vwap === 0;
    }

    function adjustCandles(candles) {

        var i = candles.length;
        while (isCandleEmpty(candles[--i])) {}

        var fix = candles[i].open;
        while (++i < candles.length) {
            candles[i].open = candles[i].high = candles[i].low = candles[i].close = candles[i].vwap = fix;
        }

        return candles;

    }

    function ChartController($element, $interval, datafeedApiService, utilsService, chartsFactory) {
        var ctrl = this,
            intervalPromise;

        setTimeout(function () {
            // That instantiation is placed here because of the synchronous width resolving issue.
            ctrl.chart = chartsFactory.create('candlestick', $element);
            refreshCandles();
        }, 100);

        intervalPromise = $interval(refreshCandles, POLLING_DELAY);

        ctrl.$onChanges = function (changes) {
            if (ctrl.chart && changes.pair) {
                ctrl.chart.clear();
                refreshCandles();
            }
        };

        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        function refreshCandles() {
            var pair = ctrl.pair;
            if (pair) {
                if (utilsService.isTestnet()) {
                    pair = utilsService.testnetSubstitutePair(pair);
                }

                datafeedApiService
                    .getLastCandles(pair, CANDLE_NUMBER, CANDLE_FRAME)
                    .then(function (response) {
                        response = adjustCandles(response);
                        ctrl.chart.draw(response);
                    });
            }
        }
    }

    ChartController.$inject = ['$element', '$interval', 'datafeedApiService', 'utilsService', 'chartsFactory'];

    angular
        .module('app.dex')
        .component('wavesDexChart', {
            controller: ChartController,
            bindings: {
                pair: '<'
            },
            templateUrl: 'dex/chart.component'
        });
})();

(function () {
    'use strict';

    angular
        .module('app.dex')
        .factory('chartsFactory', [function () {
            function CandlestickChart($element) {
                var w = $element.width(),
                    h = $element.height(),
                    elem = $element.children('.chart').get(0),
                    margins = {left: 60, top: 20, right: 60, bottom: 30};

                this.width = w - margins.left - margins.right;
                this.height = h - margins.top - margins.bottom;

                this.x = techan.scale.financetime().range([0, this.width]);
                this.y = d3.scaleLinear().range([this.height, 0]);
                this.yVolume = d3.scaleLinear().range([this.y(0), this.y(0.2)]);

                this.candlestick = techan.plot.candlestick().xScale(this.x).yScale(this.y);
                this.accessor = this.candlestick.accessor();
                this.volume = techan.plot.volume()
                    .accessor(this.accessor)
                    .xScale(this.x)
                    .yScale(this.yVolume);

                this.xAxis = d3.axisBottom(this.x);
                this.yAxis = d3.axisLeft(this.y);
                this.yAxisRight = d3.axisRight(this.y);
                this.volumeAxis = d3.axisRight(this.yVolume).ticks(2).tickFormat(d3.format(',.3s'));

                this.svg = d3
                    .select(elem)
                    .append('svg')
                    .attr('width', this.width + margins.left + margins.right)
                    .attr('height', this.height + margins.top + margins.bottom);

                this.chart = this.svg
                    .append('g')
                    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

                this.chart.append('g')
                    .attr('class', 'candlestick');

                this.chart.append('g')
                    .attr('class', 'volume');

                this.chart.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + this.height + ')');

                this.chart.append('g')
                    .attr('class', 'y axis');

                this.chart.append('g')
                    .attr('class', 'y axis-right')
                    .attr('transform', 'translate(' + this.width + ',0)');

                this.chart.append('g')
                    .attr('class', 'volume axis');

                this.chart.append('text')
                    .attr('class', 'note')
                    .attr('transform', 'translate(' + (this.width - 250) + ',10)')
                    .text('Candles cover 30 minute intervals');

                this.chart.append('text')
                    .attr('class', 'ticker')
                    .attr('transform', 'translate(' + (this.width - 250) + ',30)');
            }

            CandlestickChart.prototype.clear = function () {
                this.draw([]);
            };

            CandlestickChart.prototype.draw = function (data) {
                data = this.prepareData(data);

                this.x.domain(data.map(this.accessor.d));
                this.y.domain(techan.scale.plot.ohlc(data, this.accessor).domain());
                this.yVolume.domain(techan.scale.plot.volume(data).domain());

                this.chart.selectAll('g.candlestick').datum(data).call(this.candlestick);
                this.chart.selectAll('g.volume').datum(data).call(this.volume);
                this.chart.selectAll('g.x.axis').call(this.xAxis);
                this.chart.selectAll('g.y.axis').call(this.yAxis);
                this.chart.selectAll('g.y.axis-right').call(this.yAxisRight);
                this.chart.selectAll('g.volume.axis').call(this.volumeAxis);

                var now = new Date(),
                    hh = now.getHours(),
                    mm = now.getMinutes(),
                    ss = now.getSeconds();
                hh = hh < 10 ? '0' + hh : hh;
                mm = mm < 10 ? '0' + mm : mm;
                ss = ss < 10 ? '0' + ss : ss;
                this.chart.selectAll('text.ticker').text('Last updated: ' + hh + ':' + mm + ':' + ss);
            };

            CandlestickChart.prototype.prepareData = function (rawData) {
                var self = this,
                    lastTradePrice = 0;
                return rawData.map(function (candle) {
                    var adjustedHigh = Math.min(+candle.high, +candle.vwap * 1.5),
                        adjustedLow = Math.max(+candle.low, +candle.vwap / 2);

                    return {
                        date: candle.timestamp,
                        open: +candle.open,
                        high: adjustedHigh,
                        low: adjustedLow,
                        close: +candle.close,
                        volume: +candle.volume
                    };
                }).sort(function (a, b) {
                    return d3.ascending(self.accessor.d(a), self.accessor.d(b));
                }).map(function (c) {
                    if (c.open === 0 && c.high === 0 && c.low === 0 && c.close === 0) {
                        c.open = c.high = c.low = c.close = lastTradePrice;
                    } else {
                        lastTradePrice = c.close;
                    }

                    return c;
                });
            };

            return {
                create: function (type, $element) {
                    if (type === 'candlestick') {
                        return new CandlestickChart($element);
                    }
                }
            };
        }]);
})();

(function () {
    'use strict';

    function FavoritesController() {
        var ctrl = this;

        ctrl.onClick = function (pair) {
            ctrl.switchPair({
                amountAsset: pair.amountAsset,
                priceAsset: pair.priceAsset
            });
        };
    }

    angular
        .module('app.dex')
        .component('wavesDexFavorites', {
            controller: FavoritesController,
            bindings: {
                pairs: '<',
                switchPair: '<'
            },
            templateUrl: 'dex/favorites.component'
        });
})();

(function () {
    'use strict';

    function HistoryController() {}

    angular
        .module('app.dex')
        .component('wavesDexHistory', {
            controller: HistoryController,
            bindings: {
                pair: '<',
                trades: '<'
            },
            templateUrl: 'dex/history.component'
        });
})();

(function () {
    'use strict';

    var FEE = 0.003,
        BALANCE_UPDATE_DELAY = 5000;

    function OrderCreatorController($interval, applicationContext, matcherApiService) {

        var ctrl = this,
            intervalPromise;

        ctrl.buy = {
            price: '',
            amount: '',
            total: '',
            fee: FEE,
            blocked: false
        };

        ctrl.sell = {
            price: '',
            amount: '',
            total: '',
            fee: FEE,
            blocked: false
        };

        ctrl.submitBuyOrder = function () {
            if (!ctrl.buy.amount || !ctrl.buy.price) {
                return;
            }

            ctrl.buy.blocked = true;
            ctrl.submit('buy', ctrl.buy.price, ctrl.buy.amount, FEE, function () {
                ctrl.buy.blocked = false;
                refreshBalances();
            });
        };

        ctrl.submitSellOrder = function () {
            if (!ctrl.sell.amount || !ctrl.sell.price) {
                return;
            }

            ctrl.sell.blocked = true;
            ctrl.submit('sell', ctrl.sell.price, ctrl.sell.amount, FEE, function () {
                ctrl.sell.blocked = false;
                refreshBalances();
            });
        };

        // Those two methods are called to update `total` after user's input:

        ctrl.updateBuyTotal = function () {
            ctrl.buy.total = ctrl.buy.price * ctrl.buy.amount || '';
        };

        ctrl.updateSellTotal = function () {
            ctrl.sell.total = ctrl.sell.price * ctrl.sell.amount || '';
        };

        // Those two methods calculate the amount as current balance divided by last history price:

        ctrl.buyFullBalance = function () {
            var price = ctrl.buy.price || ctrl.lastPrice,
                balance = ctrl.priceAssetBalance.toTokens();

            if (price && balance) {
                ctrl.buy.price = price;
                ctrl.buy.amount = Money.fromTokens(balance / price, ctrl.pair.amountAsset).toTokens();
                ctrl.updateBuyTotal();
            }
        };

        ctrl.sellFullBalance = function () {
            var price = ctrl.sell.price || ctrl.lastPrice,
                balance = ctrl.amountAssetBalance.toTokens();

            if (price && balance) {
                ctrl.sell.price = price;
                ctrl.sell.amount = balance;
                ctrl.updateSellTotal();
            }
        };

        intervalPromise = $interval(refreshBalances, BALANCE_UPDATE_DELAY);

        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        ctrl.$onChanges = function (changes) {
            refreshBalances();

            // Those lines write directly to the `total` field when it's calculated in an orderbook:

            if (changes.outerBuyValues) {
                ctrl.buy.price = ctrl.outerBuyValues.price || '';
                ctrl.buy.amount = ctrl.outerBuyValues.amount || '';
                ctrl.buy.total = ctrl.outerBuyValues.total || ctrl.buy.price * ctrl.buy.amount || '';
            }

            if (changes.outerSellValues) {
                ctrl.sell.price = ctrl.outerSellValues.price || '';
                ctrl.sell.amount = ctrl.outerSellValues.amount || '';
                ctrl.sell.total = ctrl.outerSellValues.total || ctrl.sell.price * ctrl.sell.amount || '';
            }
        };

        function refreshBalances() {
            var amountAsset = ctrl.pair.amountAsset,
                priceAsset = ctrl.pair.priceAsset;

            matcherApiService
                .getTradableBalance(amountAsset.id, priceAsset.id, applicationContext.account.address)
                .then(function (data) {
                    ctrl.amountAssetBalance = Money.fromCoins(data[amountAsset.id], amountAsset);
                    ctrl.priceAssetBalance = Money.fromCoins(data[priceAsset.id], priceAsset);
                });
        }
    }

    OrderCreatorController.$inject = ['$interval', 'applicationContext', 'matcherApiService'];

    angular
        .module('app.dex')
        .component('wavesDexOrderCreator', {
            controller: OrderCreatorController,
            bindings: {
                pair: '<',
                submit: '<',
                lastPrice: '<',
                outerBuyValues: '<buyValues',
                outerSellValues: '<sellValues'
            },
            templateUrl: 'dex/order.creator.component'
        });
})();

(function () {
    'use strict';

    var ACCEPTED = 'Accepted',
        PARTIALLY = 'PartiallyFilled',
        FILLED = 'Filled',
        CANCELLED = 'Cancelled',
        NOT_FOUND = 'NotFound',

        ORDER_CANCELED = 'OrderCanceled',
        ORDER_DELETED = 'OrderDeleted';

    function DexOrderService(matcherRequestService, matcherApiService, applicationContext) {

        // TODO : clean that all from the state.

        this.addOrder = function (pair, order, sender) {
            return matcherApiService
                .loadMatcherKey()
                .then(function (matcherKey) {
                    order.matcherKey = matcherKey;
                    var signedRequest = matcherRequestService.buildCreateOrderRequest(order, sender);
                    return matcherApiService.createOrder(signedRequest);
                }).catch(function (e) {
                    throw new Error(e);
                });
        };

        this.removeOrder = function (pair, order, sender) {
            var signedRequest = matcherRequestService.buildCancelOrderRequest(order.id, sender);
            if (order.status === ACCEPTED || order.status === PARTIALLY) {
                return matcherApiService
                    .cancelOrder(pair.amountAsset.id, pair.priceAsset.id, signedRequest)
                    .then(function (response) {
                        if (response.status !== ORDER_CANCELED) {
                            throw new Error();
                        }
                    }).catch(function (e) {
                        throw new Error(e);
                    });
            } else if (order.status === FILLED || order.status === CANCELLED) {
                return matcherApiService
                    .deleteOrder(pair.amountAsset.id, pair.priceAsset.id, signedRequest)
                    .then(function (response) {
                        if (response.status !== ORDER_DELETED) {
                            throw new Error();
                        }
                    }).catch(function (e) {
                        throw new Error(e);
                    });
            }
        };

        this.getOrders = function (pair) {
            return matcherApiService
                .loadUserOrders(pair.amountAsset.id, pair.priceAsset.id, {
                    publicKey: applicationContext.account.keyPair.public,
                    privateKey: applicationContext.account.keyPair.private
                })
                .then(function (response) {
                    return response.map(function (o) {
                        if (o.amount === null || o.price === null || o.filled === null || o.timestamp === null) {
                            console.error('Bad order!', o);
                            o.amount = o.amount || 0;
                            o.price = o.price || 0;
                            o.filled = o.filled || 0;
                            o.timestamp = o.timestamp || 0;
                        }

                        var orderPrice = OrderPrice.fromBackendPrice(o.price, pair).toTokens();

                        return {
                            id: o.id,
                            type: o.type,
                            price: Money.fromTokens(orderPrice, pair.priceAsset),
                            amount: Money.fromCoins(o.amount, pair.amountAsset),
                            filled: Money.fromCoins(o.filled, pair.amountAsset),
                            status: o.status || NOT_FOUND,
                            timestamp: o.timestamp
                        };
                    });
                })
                .catch(function (e) {
                    throw new Error(e);
                });
        };
    }

    DexOrderService.$inject = ['matcherRequestService', 'matcherApiService', 'applicationContext'];

    angular
        .module('app.dex')
        .service('dexOrderService', DexOrderService);
})();

(function () {
    'use strict';

    function denormalizeOrders(orders) {
        if (!orders || !orders.length) {
            return [];
        }

        var currentSum = 0;
        return orders.map(function (order) {
            var total = order.price * order.amount;
            currentSum += total;
            return {
                id: order.id,
                price: order.price,
                amount: order.amount,
                total: total,
                sum: currentSum
            };
        });
    }

    function calculateStringLength(n, precision) {
        // Get initial string length with a given precision.
        var len = n.toFixed(precision).length;
        // Add some length for commas (e.g. 10,000,000.0000).
        return len + Math.floor(n.toFixed(0).length / 3);
    }

    function getMaxLengths(orders, pair) {
        var price = 0,
            amount = 0,
            total = 0,
            sum = 0;

        // Get max value for each column.
        orders.forEach(function (order) {
            if (order.price > price) {
                price = order.price;
            }
            if (order.amount > amount) {
                amount = order.amount;
            }
            if (order.total > total) {
                total = order.total;
            }
            if (order.sum > sum) {
                sum = order.sum;
            }
        });

        return {
            price: calculateStringLength(price, pair.priceAsset.precision),
            amount: calculateStringLength(amount, pair.amountAsset.precision),
            total: calculateStringLength(total, pair.priceAsset.precision),
            sum: calculateStringLength(sum, pair.priceAsset.precision)
        };
    }

    function OrderbookController() {
        var ctrl = this;

        ctrl.lineClick = function (index) {
            var order = ctrl.orders[index],
                cumulativeAmount = ctrl.orders.slice(0, index + 1).reduce(function (amountSum, order) {
                    return amountSum + order.amount;
                }, 0);

            ctrl.onClick(Number(order.price).toFixed(8), cumulativeAmount, order.sum);
        };

        ctrl.$onChanges = function (changes) {
            if (!changes.rawOrders) {
                return;
            }

            var denormPreviousValue = denormalizeOrders(changes.rawOrders.previousValue),
                denormCurrentValue = denormalizeOrders(changes.rawOrders.currentValue);

            if (!_.isEqual(denormPreviousValue, denormCurrentValue)) {
                ctrl.orders = denormCurrentValue;
                ctrl.lengths = getMaxLengths(ctrl.orders, ctrl.pair);
            }
        };
    }

    angular
        .module('app.dex')
        .component('wavesDexOrderbook', {
            controller: OrderbookController,
            bindings: {
                type: '@',
                name: '@',
                pair: '<',
                onClick: '<',
                rawOrders: '<orders'
            },
            templateUrl: 'dex/orderbook.component'
        });
})();

(function () {
    'use strict';

    function normalizeOrder(order, pair) {
        return {
            price: OrderPrice.fromBackendPrice(order.price, pair).toTokens(),
            amount: Money.fromCoins(order.amount, pair.amountAsset).toTokens()
        };
    }

    function DexOrderbookService(matcherApiService) {
        this.getOrderbook = function (assetOne, assetTwo) {
            var assets = {};
            assets[assetOne.id] = assetOne;
            assets[assetTwo.id] = assetTwo;
            return matcherApiService
                .loadOrderbook(assetOne.id, assetTwo.id)
                .then(function (orderbook) {
                    var pair = {
                        amountAsset: assets[orderbook.pair.amountAsset],
                        priceAsset: assets[orderbook.pair.priceAsset]
                    };

                    return {
                        timestamp: orderbook.timestamp,
                        pair: orderbook.pair,
                        bids: orderbook.bids.map(function (order) {
                            return normalizeOrder(order, pair);
                        }),
                        asks: orderbook.asks.map(function (order) {
                            return normalizeOrder(order, pair);
                        })
                    };
                });
        };
    }

    DexOrderbookService.$inject = ['matcherApiService'];

    angular
        .module('app.dex')
        .service('dexOrderbookService', DexOrderbookService);
})();

(function () {
    'use strict';

    var statuses = {
        'PartiallyFilled': {
            title: 'Partial',
            order: 2
        },
        'Accepted': {
            title: 'Opened',
            order: 4
        },
        'Filled': {
            title: 'Closed',
            order: 6
        },
        'Cancelled': {
            title: 'Canceled',
            order: 8
        },
        'NotFound': {
            title: 'NotFound',
            order: 10
        }
    };

    var types = {
        'buy': {
            title: 'Buy',
            order: 0
        },
        'sell': {
            title: 'Sell',
            order: 1
        }
    };

    function status(s) {
        return statuses[s] ? statuses[s].title : '---';
    }

    function type(t) {
        return types[t] ? types[t].title : '---';
    }

    function denormalizeUserOrders(orders) {
        if (!orders || !orders.length) {
            return [];
        }

        return orders.map(function (order) {
            var price = order.price.toTokens(),
                amount = order.amount.toTokens(),
                filled = order.filled.toTokens();

            return {
                id: order.id,
                status: order.status,
                statusTitle: status(order.status),
                type: order.type,
                typeTitle: type(order.type),
                price: price,
                amount: amount,
                total: price * amount,
                filled: filled,
                timestamp: order.timestamp
            };
        });
    }

    function sortUserOrders(orders) {
        return orders.sort(function (a, b) {
            var aVal = statuses[a.status].order + types[a.type].order,
                bVal = statuses[b.status].order + types[b.type].order;
            return aVal - bVal;
        });
    }

    function UserOrdersController() {
        var ctrl = this;

        ctrl.cancel = function (obj) {
            ctrl.cancelOrder(obj.order);
        };

        ctrl.$onChanges = function (changes) {
            if (!changes.rawOrders) {
                return;
            }

            var denormPreviousValue = denormalizeUserOrders(changes.rawOrders.previousValue),
                denormCurrentValue = denormalizeUserOrders(changes.rawOrders.currentValue);

            if (!_.isEqual(denormPreviousValue, denormCurrentValue)) {
                ctrl.orders = sortUserOrders(denormCurrentValue);
            }
        };
    }

    angular
        .module('app.dex')
        .component('wavesDexUserOrders', {
            controller: UserOrdersController,
            bindings: {
                pair: '<',
                rawOrders: '<orders',
                cancelOrder: '<'
            },
            templateUrl: 'dex/user.orders.component'
        });
})();

(function() {
    'use strict';

    angular.module('app.leasing', ['app.shared']);
})();

(function () {
    'use strict';

    var DEFAULT_CURRENCY = Currency.MIR;

    function WavesLeasingService (apiService) {
        function parseBalance(response) {
            return Money.fromCoins(response.balance, DEFAULT_CURRENCY);
        }

        this.loadBalanceDetails = function (address) {
            var details = {};
            return apiService.address.balance(address)
                .then(function (response) {
                    details.regular = parseBalance(response);

                    return apiService.address.effectiveBalance(address);
                })
                .then(function (response) {
                    details.effective = parseBalance(response);

                    return apiService.address.generatingBalance(address);
                })
                .then(function (response) {
                    details.generating = parseBalance(response);

                    return details;
                });
        };
    }

    WavesLeasingService.$inject = ['apiService'];

    angular
        .module('app.leasing')
        .service('leasingService', WavesLeasingService);
})();

(function () {
    'use strict';

    var POLLING_DELAY = 5000,
        DEFAULT_ERROR_MESSAGE = 'Failed to load balance details';

    function LeasingController($interval, constants, applicationContext,
                               leasingService, transactionLoadingService, notificationService) {
        var ctrl = this,
            intervalPromise;

        ctrl.transactions = [];
        ctrl.limitTo = 1000;
        ctrl.balanceDetails = null;

        refreshAll();
        intervalPromise = $interval(refreshAll, POLLING_DELAY);
        ctrl.$onDestroy = function () {
            $interval.cancel(intervalPromise);
        };

        function refreshAll() {
            refreshBalanceDetails();
            refreshLeasingTransactions();
        }

        function refreshBalanceDetails() {
            leasingService
                .loadBalanceDetails(applicationContext.account.address)
                .then(function (balanceDetails) {
                    ctrl.balanceDetails = balanceDetails;
                }).catch(function (e) {
                    if (e) {
                        if (e.data) {
                            notificationService.error(e.data.message);
                        } else if (e.message) {
                            notificationService.error(e.message);
                        } else if (e.statusText) {
                            notificationService.error(e.statusText);
                        } else {
                            notificationService.error(DEFAULT_ERROR_MESSAGE);
                        }
                    } else {
                        notificationService.error(DEFAULT_ERROR_MESSAGE);
                    }
                });
        }

        function refreshLeasingTransactions() {
            transactionLoadingService
                .loadTransactions(applicationContext.account, ctrl.limitTo)
                .then(function (transactions) {
                    ctrl.transactions = transactions.filter(function (tx) {
                        var startLeasing = constants.START_LEASING_TRANSACTION_TYPE,
                            cancelLeasing = constants.CANCEL_LEASING_TRANSACTION_TYPE;
                        return tx.type === startLeasing || tx.type === cancelLeasing;
                    });
                });
        }
    }

    LeasingController.$inject = ['$interval', 'constants.transactions', 'applicationContext',
                                 'leasingService', 'transactionLoadingService', 'notificationService'];

    angular
        .module('app.leasing')
        .component('wavesLeasing', {
            controller: LeasingController,
            templateUrl: 'leasing/component'
        });
})();

(function () {
    'use strict';

    var FEE_CURRENCY = Currency.MIR;

    function LeasingFormController($timeout, constants, applicationContext,
                                   apiService, dialogService, notificationService, transactionBroadcast,
                                   formattingService, addressService, leasingService, leasingRequestService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.fee = minimumFee;
        ctrl.availableBalance = Money.fromCoins(0, Currency.MIR);

        ctrl.broadcast = new transactionBroadcast.instance(apiService.leasing.lease,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, Currency.MIR);
                var address = transaction.recipient;
                var displayMessage = 'Leased ' + amount.formatAmount(true) + ' of ' +
                    amount.currency.displayName +
                    '<br/>Recipient ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            }
        );

        ctrl.validationOptions = {
            rules: {
                leasingRecipient: {
                    required: true
                },
                leasingAmount: {
                    required: true,
                    decimal: 8, // stub value updated on validation
                    min: 0, // stub value updated on validation
                    max: constants.JAVA_MAX_LONG // stub value updated on validation
                }
            },
            messages: {
                leasingRecipient: {
                    required: 'Recipient account number is required'
                },
                leasingAmount: {
                    required: 'Amount to lease is required'
                }
            }
        };

        ctrl.confirm = {
            recipient: ''
        };

        ctrl.confirmLease = confirmLease;
        ctrl.broadcastTransaction = broadcastTransaction;

        reset();

        leasingService
            .loadBalanceDetails(applicationContext.account.address)
            .then(function (balanceDetails) {
                //FIXME: add here a correct value available to lease
                ctrl.availableBalance = balanceDetails.effective;

                reset();

                // Update validation options and check how they affect form validation
                ctrl.validationOptions.rules.leasingAmount.decimal = ctrl.availableBalance.currency.precision;
                var minimumPayment = Money.fromCoins(1, ctrl.availableBalance.currency);
                ctrl.validationOptions.rules.leasingAmount.min = minimumPayment.toTokens();
                ctrl.validationOptions.rules.leasingAmount.max = ctrl.availableBalance.toTokens();
                ctrl.validationOptions.messages.leasingAmount.decimal = 'The amount to leasing must be a number ' +
                    'with no more than ' + minimumPayment.currency.precision +
                    ' digits after the decimal point (.)';
                ctrl.validationOptions.messages.leasingAmount.min = 'Leasing amount is too small. ' +
                    'It should be greater or equal to ' + minimumPayment.formatAmount(false);
                ctrl.validationOptions.messages.leasingAmount.max = 'Leasing amount is too big. ' +
                    'It should be less or equal to ' + ctrl.availableBalance.formatAmount(false);
            });

        function confirmLease(form) {
            if (!form.validate(ctrl.validationOptions)) {
                return false;
            }

            var amount = Money.fromTokens(ctrl.amount, ctrl.availableBalance.currency);
            var transferFee = ctrl.fee;

            // We assume here that amount and fee are in Waves, however it's not hardcoded
            var leasingCost = amount.plus(transferFee);
            if (leasingCost.greaterThan(ctrl.availableBalance)) {
                notificationService.error('Not enough ' + FEE_CURRENCY.displayName + ' for the leasing transaction');
                return false;
            }

            var startLeasing = {
                recipient: addressService.cleanupOptionalPrefix(ctrl.recipient),
                amount: amount,
                fee: transferFee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create a transaction and wait for confirmation
            ctrl.broadcast.setTransaction(leasingRequestService.buildStartLeasingRequest(startLeasing, sender));

            // Set data to the confirmation dialog
            ctrl.confirm.amount = startLeasing.amount;
            ctrl.confirm.fee = startLeasing.fee;
            ctrl.confirm.recipient = startLeasing.recipient;

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#start-leasing-confirmation');
            }, 1);

            // Close payment dialog
            return true;
        }

        function broadcastTransaction() {
            ctrl.broadcast.broadcast();
        }

        function reset() {
            ctrl.amount = '0';
            ctrl.recipient = '';
            ctrl.confirm.amount = Money.fromTokens(0, Currency.MIR);
            ctrl.confirm.fee = minimumFee;
        }
    }

    LeasingFormController.$inject = ['$timeout', 'constants.ui', 'applicationContext',
                                     'apiService', 'dialogService', 'notificationService', 'transactionBroadcast',
                                     'formattingService', 'addressService', 'leasingService', 'leasingRequestService'];

    angular
        .module('app.leasing')
        .component('wavesLeasingLeaseForm', {
            controller: LeasingFormController,
            templateUrl: 'leasing/lease.form.component'
        });
})();

(function () {
    'use strict';

    function WavesBalanceDetailsController () {
        var ctrl = this;

        ctrl.formattedBalance = {};

        ctrl.$onChanges = function () {
            if (ctrl.balanceDetails) {
                ctrl.formattedBalance = {
                    regular: formatMoney(ctrl.balanceDetails.regular),
                    effective: formatMoney(ctrl.balanceDetails.effective),
                    generating: formatMoney(ctrl.balanceDetails.generating)
                };
            }
        };

        function formatMoney(amount) {
            return amount.formatAmount(true) + ' ' + amount.currency.shortName;
        }
    }

    angular
        .module('app.leasing')
        .component('wavesLeasingBalanceDetails', {
            controller: WavesBalanceDetailsController,
            bindings: {
                balanceDetails: '<'
            },
            templateUrl: 'leasing/balance.details.component'
        });
})();

(function() {
    'use strict';

    angular.module('app.history', ['app.shared']);
})();

(function () {
    'use strict';

    var TRANSACTIONS_TO_LOAD = 200;

    function HistoryController($scope, $interval, applicationContext, transactionLoadingService) {
        var history = this;
        var refreshPromise;
        var refreshDelay = 10 * 1000;

        history.transactions = [];

        refreshTransactions();

        refreshPromise = $interval(refreshTransactions, refreshDelay);

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function refreshTransactions() {
            var txArray;
            transactionLoadingService.loadTransactions(applicationContext.account, TRANSACTIONS_TO_LOAD)
                .then(function (transactions) {
                    txArray = transactions;

                    return transactionLoadingService.refreshAssetCache(applicationContext.cache, transactions);
                })
                .then(function () {
                    history.transactions = txArray;
                });
        }
    }

    HistoryController.$inject = ['$scope', '$interval', 'applicationContext', 'transactionLoadingService'];

    angular
        .module('app.history')
        .controller('historyController', HistoryController);
})();

(function() {
    'use strict';

    angular.module('app.community', ['app.shared']);
})();

(function () {
    'use strict';

    function CommunityController($scope, $interval, apiService, applicationContext) {
        var community = this;
        var refreshPromise;
        var REFRESH_DELAY = 10 * 1000;
        var BLOCKS_DEPTH = 50;

        community.candidate = {
            block: 0,
            size: 0
        };
        community.blocks = [];

        refreshData();

        refreshPromise = $interval(refreshData, REFRESH_DELAY);

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function refreshData() {
            var blockHeight = applicationContext.blockHeight;

            var endBlock = blockHeight;
            var startBlock = Math.max(1, endBlock - BLOCKS_DEPTH);
            apiService.transactions.unconfirmed()
                .then(function (response) {
                    community.candidate.block = blockHeight + 1;
                    community.candidate.size = response.length;

                    return apiService.blocks.list(startBlock, endBlock);
                })
                .then(function (response) {
                    community.blocks = response;
                });
        }
    }

    CommunityController.$inject = ['$scope', '$interval', 'apiService', 'applicationContext'];

    angular
        .module('app.community')
        .controller('communityController', CommunityController);
})();

(function() {
    'use strict';

    angular.module('app.portfolio', ['app.shared'])
        .constant('portfolio.events', {
            ASSET_TRANSFER: 'asset-transfer',
            ASSET_REISSUE: 'asset-reissue',
            ASSET_DETAILS: 'asset-details',
            ASSET_MASSPAY: 'asset-masspay'
        });
})();

(function () {
    'use strict';

    function WavesAssetListController($scope, $timeout, $interval, events,
                                      applicationContext, apiService, formattingService) {
        var ctrl = this;
        var refreshPromise;
        var refreshDelay = 10 * 1000;

        ctrl.wavesBalance = new Money(0, Currency.MIR);
        ctrl.assets = [];
        ctrl.noData = true;
        ctrl.assetTransfer = assetTransfer;
        ctrl.assetDetails = assetDetails;
        ctrl.assetReissue = assetReissue;
        ctrl.assetMassPay = assetMassPay;
        loadDataFromBackend();

        $scope.$on('$destroy', function () {
            if (angular.isDefined(refreshPromise)) {
                $interval.cancel(refreshPromise);
                refreshPromise = undefined;
            }
        });

        function loadDataFromBackend() {
            refreshAssets();
            refreshBalance();

            refreshPromise = $interval(function() {
                refreshAssets();
                refreshBalance();
            }, refreshDelay);
        }

        function assetTransfer(assetId) {
            $scope.$broadcast(events.ASSET_TRANSFER, {
                assetId: assetId,
                wavesBalance: ctrl.wavesBalance
            });
        }

        function assetDetails(assetId) {
            $scope.$broadcast(events.ASSET_DETAILS, assetId);
        }

        function assetReissue(assetId) {
            $scope.$broadcast(events.ASSET_REISSUE, {
                assetId: assetId,
                wavesBalance: ctrl.wavesBalance
            });
        }

        function assetMassPay(assetId) {
            $scope.$broadcast(events.ASSET_MASSPAY, {
                assetId: assetId,
                wavesBalance: ctrl.wavesBalance
            });
        }

        function loadAssetDataFromCache(asset) {
            var cached = applicationContext.cache.assets[asset.id];
            asset.balance = cached.balance;
            asset.name = cached.currency.displayName;
            asset.total = cached.totalTokens.formatAmount();
            asset.timestamp = formattingService.formatTimestamp(cached.timestamp);
            asset.reissuable = cached.reissuable;
            asset.sender = cached.sender;
        }

        function refreshBalance() {
            apiService.address.balance(applicationContext.account.address)
                .then(function (response) {
                    ctrl.wavesBalance = Money.fromCoins(response.balance, Currency.MIR);
                });
        }

        function refreshAssets() {
            var assets = [];
            apiService.assets.balance(applicationContext.account.address).then(function (response) {
                _.forEach(response.balances, function (assetBalance) {
                    var id = assetBalance.assetId;
                    var asset = {
                        id: id,
                        name: ''
                    };

                    // adding asset details to cache
                    applicationContext.cache.putAsset(assetBalance.issueTransaction);
                    applicationContext.cache.updateAsset(id, assetBalance.balance,
                        assetBalance.reissuable, assetBalance.quantity);

                    // adding an asset with positive balance only or your reissuable assets
                    var yourReissuableAsset = assetBalance.reissuable &&
                        assetBalance.issueTransaction.sender === applicationContext.account.address;
                    if (assetBalance.balance !== 0 || yourReissuableAsset) {
                        loadAssetDataFromCache(asset);
                        assets.push(asset);
                    }
                });

                var delay = 1;
                // handling the situation when some assets appeared on the account
                if (ctrl.assets.length === 0 && assets.length > 0) {
                    ctrl.noData = false;
                    delay = 500; // waiting for 0.5 sec on first data loading attempt
                }

                // handling the situation when all assets were transferred from the account
                if (ctrl.assets.length > 0 && assets.length === 0) {
                    ctrl.noData = true;
                    delay = 500;
                }

                // to prevent no data message and asset list from displaying simultaneously
                // we need to update
                $timeout(function() {
                    ctrl.assets = assets.sort(function (a, b) {
                        var aVerified = (a.balance.currency.verified === true) ? '1:' : '0:',
                            bVerified = (b.balance.currency.verified === true) ? '1:' : '0:';

                        // The verified assets go first, then we sort them by timestamp
                        aVerified += new Date(a.timestamp).getTime();
                        bVerified += new Date(b.timestamp).getTime();

                        return (bVerified > aVerified) ? 1 : -1;
                    });
                }, delay);
            });
        }
    }

    WavesAssetListController.$inject = ['$scope', '$timeout', '$interval', 'portfolio.events',
        'applicationContext', 'apiService', 'formattingService'];

    angular
        .module('app.portfolio')
        .controller('assetListController', WavesAssetListController);
})();

(function () {
    'use strict';

    var FEE_CURRENCY = Currency.MIR;

    function AssetTransferController($scope, $timeout, constants, events, autocomplete, applicationContext,
                                     assetService, apiService, dialogService, formattingService,
                                     notificationService, transactionBroadcast, addressService) {
        var ctrl = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);

        ctrl.availableBalance = 0;
        ctrl.feeAssetBalance = 0;

        ctrl.confirm = {
            recipient: ''
        };

        ctrl.broadcast = new transactionBroadcast.instance(apiService.assets.transfer,
            function (transaction) {
                var amount = Money.fromCoins(transaction.amount, ctrl.asset.currency);
                var address = transaction.recipient;
                var displayMessage = 'Sent ' + amount.formatAmount(true) + ' of ' +
                    ctrl.asset.currency.displayName +
                    '<br/>Recipient ' + address.substr(0,15) + '...<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            }
        );

        ctrl.autocomplete = autocomplete;

        ctrl.validationOptions = {
            rules: {
                assetRecipient: {
                    required: true
                },
                assetAmount: {
                    required: true,
                    decimal: 8, // stub value updated on validation
                    min: 0,     // stub value updated on validation
                    max: constants.JAVA_MAX_LONG // stub value updated on validation
                },
                assetFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                },
                assetAttachment: {
                    maxbytelength: constants.MAXIMUM_ATTACHMENT_BYTE_SIZE
                }
            },
            messages: {
                assetRecipient: {
                    required: 'Recipient account number is required'
                },
                assetAmount: {
                    required: 'Amount to send is required'
                },
                assetFee: {
                    required: 'Transaction fee is required',
                    decimal: 'Transaction fee must be with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Transaction fee is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                },
                maxbytelength: {
                    maxbytelength: 'Attachment is too long'
                }
            }
        };

        ctrl.submitTransfer = submitTransfer;
        ctrl.broadcastTransaction = broadcastTransaction;

        resetPaymentForm();

        $scope.$on(events.ASSET_TRANSFER, function (event, eventData) {
            var asset = applicationContext.cache.assets[eventData.assetId];
            ctrl.availableBalance = asset.balance;
            ctrl.feeAssetBalance = eventData.wavesBalance;
            ctrl.asset = asset;

            resetPaymentForm();

            // Update validation options and check how they affect form validation
            ctrl.validationOptions.rules.assetAmount.decimal = asset.currency.precision;
            var minimumPayment = Money.fromCoins(1, asset.currency);
            ctrl.validationOptions.rules.assetAmount.min = minimumPayment.toTokens();
            ctrl.validationOptions.rules.assetAmount.max = ctrl.availableBalance.toTokens();
            ctrl.validationOptions.messages.assetAmount.decimal = 'The amount to send must be a number ' +
                'with no more than ' + minimumPayment.currency.precision +
                ' digits after the decimal point (.)';
            ctrl.validationOptions.messages.assetAmount.min = 'Payment amount is too small. ' +
                'It should be greater or equal to ' + minimumPayment.formatAmount(false);
            ctrl.validationOptions.messages.assetAmount.max = 'Payment amount is too big. ' +
                'It should be less or equal to ' + ctrl.availableBalance.formatAmount(false);

            dialogService.open('#asset-transfer-dialog');
        });

        function submitTransfer(transferForm) {
            if (!transferForm.validate(ctrl.validationOptions)) {
                // Prevent dialog from closing
                return false;
            }

            var transferFee = Money.fromTokens(ctrl.autocomplete.getFeeAmount(), FEE_CURRENCY);
            if (transferFee.greaterThan(ctrl.feeAssetBalance)) {
                notificationService.error('Not enough funds for the transfer transaction fee');
                return false;
            }

            var transferAmount = Money.fromTokens(ctrl.amount, ctrl.asset.currency);
            if (transferAmount.greaterThan(ctrl.availableBalance)) {
                notificationService.error('Transfer amount exceeds available asset balance');
                return false;
            }

            var assetTransfer = {
                recipient: addressService.cleanupOptionalPrefix(ctrl.recipient),
                amount: transferAmount,
                fee: transferFee
            };

            if (ctrl.attachment) {
                assetTransfer.attachment = converters.stringToByteArray(ctrl.attachment);
            }

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            // Create a transaction and wait for confirmation
            ctrl.broadcast.setTransaction(assetService.createAssetTransferTransaction(assetTransfer, sender));

            // Set data to the confirmation dialog
            ctrl.confirm.amount = assetTransfer.amount;
            ctrl.confirm.fee = assetTransfer.fee;
            ctrl.confirm.recipient = assetTransfer.recipient;

            // Open confirmation dialog (async because this method is called while another dialog is open)
            $timeout(function () {
                dialogService.open('#transfer-asset-confirmation');
            }, 1);

            // Close payment dialog
            return true;
        }

        function broadcastTransaction() {
            ctrl.broadcast.broadcast();
        }

        function resetPaymentForm() {
            ctrl.recipient = '';
            ctrl.amount = '0';
            ctrl.confirm.amount = Money.fromTokens(0, Currency.MIR);
            ctrl.confirm.fee = Money.fromTokens(constants.MINIMUM_TRANSACTION_FEE, FEE_CURRENCY);
            ctrl.autocomplete.defaultFee(constants.MINIMUM_TRANSACTION_FEE);
        }
    }

    AssetTransferController.$inject = ['$scope', '$timeout', 'constants.ui', 'portfolio.events',
        'autocomplete.fees', 'applicationContext', 'assetService', 'apiService', 'dialogService',
        'formattingService', 'notificationService', 'transactionBroadcast', 'addressService'];

    angular
        .module('app.portfolio')
        .controller('assetTransferController', AssetTransferController);
})();

(function () {
    'use strict';

    function WavesAssetDetailsController($scope, $timeout, events, applicationContext, dialogService) {
        var details = this;

        function transformAddress(address) {
            return isMyAddress(address) ? 'You' : address;
        }

        function isMyAddress(address) {
            return address === applicationContext.account.address;
        }

        $scope.$on(events.ASSET_DETAILS, function (event, assetId) {
            var asset = applicationContext.cache.assets[assetId];
            if (angular.isUndefined(asset)) {
                throw new Error('Failed to find asset details by id ' + assetId);
            }

            details.assetId = assetId;
            details.name = asset.currency.displayName;
            details.description = asset.description;
            details.sender = transformAddress(asset.sender);
            details.isSenderCopiable = !isMyAddress(asset.sender);
            details.timestamp = asset.timestamp;
            details.totalTokens = asset.totalTokens.formatAmount();
            details.reissuable = asset.reissuable ? 'Yes' : 'No';

            $timeout(function () {
                dialogService.open('#asset-details-dialog');
            }, 1);
        });
    }

    WavesAssetDetailsController.$inject = ['$scope', '$timeout', 'portfolio.events', 'applicationContext',
        'dialogService'];

    angular
        .module('app.portfolio')
        .controller('assetDetailsController', WavesAssetDetailsController);
})();

(function () {
    'use strict';

    var FIXED_REISSUE_FEE = new Money(1, Currency.MIR);

    function WavesAssetReissueController($scope, $timeout, constants, events, applicationContext, assetService,
                                         dialogService, notificationService, formattingService, apiService,
                                         transactionBroadcast) {
        var reissue = this;
        reissue.confirm = {};
        reissue.broadcast = new transactionBroadcast.instance(apiService.assets.reissue,
            function (transaction, response) {
                var amount = Money.fromCoins(transaction.quantity, reissue.asset.currency);
                var displayMessage = 'Reissued ' + amount.formatAmount(true) + ' tokens of asset ' +
                    reissue.asset.currency.displayName + '<br/>Date: ' +
                    formattingService.formatTimestamp(transaction.timestamp);
                notificationService.notice(displayMessage);
            });
        reissue.fee = FIXED_REISSUE_FEE;
        reissue.validationOptions = {
            rules: {
                assetAmount: {
                    required: true,
                    decimal: 0,
                    min: 0
                }
            },
            messages: {
                assetAmount: {
                    required: 'Amount to reissue is required'
                }
            }
        };
        reissue.submitReissue = submitReissue;
        reissue.broadcastTransaction = broadcastTransaction;

        resetReissueForm();

        $scope.$on(events.ASSET_REISSUE, function (event, eventData) {
            var asset = applicationContext.cache.assets[eventData.assetId];
            if (!asset)
                throw new Error('Failed to find asset data by id ' + eventData.assetId);

            resetReissueForm();

            reissue.assetId = eventData.assetId;
            reissue.assetName = asset.currency.displayName;
            reissue.totalTokens = asset.totalTokens;
            reissue.asset = asset;
            reissue.wavesBalance = eventData.wavesBalance;

            // update validation options and check how it affects form validation
            reissue.validationOptions.rules.assetAmount.decimal = asset.currency.precision;
            var minimumPayment = Money.fromCoins(1, asset.currency);
            var maximumPayment = Money.fromCoins(constants.JAVA_MAX_LONG, asset.currency);
            reissue.validationOptions.rules.assetAmount.min = minimumPayment.toTokens();
            reissue.validationOptions.rules.assetAmount.max = maximumPayment.toTokens();
            reissue.validationOptions.messages.assetAmount.decimal = 'The amount to reissue must be a number ' +
                'with no more than ' + minimumPayment.currency.precision +
                ' digits after the decimal point (.)';
            reissue.validationOptions.messages.assetAmount.min = 'Amount to reissue is too small. ' +
                'It should be greater or equal to ' + minimumPayment.formatAmount(false);
            reissue.validationOptions.messages.assetAmount.max = 'Amount to reissue is too big. ' +
                'It should be less or equal to ' + maximumPayment.formatAmount(false);

            dialogService.open('#asset-reissue-dialog');
        });

        function submitReissue (form) {
            if (!form.validate(reissue.validationOptions))
                // prevent dialog from closing
                return false;

            if (reissue.fee.greaterThan(reissue.wavesBalance)) {
                notificationService.error('Not enough funds for the reissue transaction fee');

                return false;
            }

            var assetReissue = {
                totalTokens: Money.fromTokens(reissue.amount, reissue.asset.currency),
                reissuable: reissue.reissuable,
                fee: reissue.fee
            };

            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };
            // creating the transaction and waiting for confirmation
            reissue.broadcast.setTransaction(assetService.createAssetReissueTransaction(assetReissue, sender));

            // setting data for the confirmation dialog
            reissue.confirm.amount = assetReissue.totalTokens;
            reissue.confirm.fee = assetReissue.fee;

            // open confirmation dialog
            // doing it async because this method is called while another dialog is open
            $timeout(function () {
                dialogService.open('#asset-reissue-confirm-dialog');
            }, 1);

            // it's ok to close reissue dialog
            return true;
        }

        function broadcastTransaction () {
            reissue.broadcast.broadcast();
        }

        function resetReissueForm() {
            reissue.amount = '0';
            reissue.confirm.amount = Money.fromTokens(0, Currency.MIR);
            reissue.confirm.fee = reissue.fee;
        }
    }

    WavesAssetReissueController.$inject = ['$scope', '$timeout', 'constants.ui', 'portfolio.events',
        'applicationContext', 'assetService', 'dialogService', 'notificationService',
        'formattingService', 'apiService', 'transactionBroadcast'];

    angular
        .module('app.portfolio')
        .controller('assetReissueController', WavesAssetReissueController);
})();

(function () {
    'use strict';

    function AssetFilter(applicationContext, addressService) {
        function transformAddress (rawAddress) {
            var result = angular.isDefined(rawAddress) ? rawAddress : 'n/a';

            if (isMyAddress(result))
                result = 'You';

            return result;
        }

        function isMyAddress(address) {
            return address === applicationContext.account.address;
        }

        function formatAsset (transaction) {
            transaction.formatted = {
                sender: transformAddress(transaction.sender),
                canReissue: transaction.reissuable && isMyAddress(transaction.sender)
            };

            return transaction;
        }

        return function filterInput (input) {
            return _.map(input, formatAsset);
        };
    }

    AssetFilter.$inject = ['applicationContext', 'addressService'];

    angular
        .module('app.portfolio')
        .filter('asset', AssetFilter);
})();

(function () {
    'use strict';

    var MAXIMUM_FILE_SIZE_BYTES = 256 * 1024;
    var MAXIMUM_TRANSACTIONS_PER_FILE = 500;
    var FIRST_TRANSACTIONS_COUNT = 10;
    var LOADING_STAGE = 'loading';
    var PROCESSING_STAGE = 'processing';
    var ZERO_MONEY = Money.fromTokens(0, Currency.MIR);

    function ValidationError(message) {
        this.message = message;
    }

    function WavesMassPaymentController ($scope, $window, $timeout, constants, events, applicationContext, autocomplete,
                                         notificationService, assetService, dialogService,
                                         transactionBroadcast, apiService) {
        var mass = this;
        var minimumFee = new Money(constants.MINIMUM_TRANSACTION_FEE, Currency.MIR);
        var transactions;

        mass.summary = {
            totalAmount: ZERO_MONEY,
            totalFee: ZERO_MONEY
        };
        mass.confirm = {
            recipients: 0
        };
        mass.filename = '';
        mass.transfers = [];
        mass.inputPayments = [];
        mass.autocomplete = autocomplete;
        mass.stage = LOADING_STAGE;
        mass.loadingInProgress = false;
        mass.broadcast = new transactionBroadcast.instance(apiService.assets.massPay,
            function (transaction, response) {
                var displayMessage = 'Sent ' + mass.summary.totalAmount.formatAmount(true) + ' of ' +
                        mass.summary.totalAmount.currency.displayName + ' to ' + mass.summary.totalTransactions +
                        ' recipients';
                notificationService.notice(displayMessage);
            });
        mass.validationOptions = {
            rules: {
                massPayFee: {
                    required: true,
                    decimal: Currency.MIR.precision,
                    min: minimumFee.toTokens()
                }
            },
            messages: {
                massPayFee: {
                    required: 'Fee per transaction is required',
                    decimal: 'Fee must be with no more than ' +
                        minimumFee.currency.precision + ' digits after the decimal point (.)',
                    min: 'Fee per transaction is too small. It should be greater or equal to ' +
                        minimumFee.formatAmount(true)
                }
            }
        };
        mass.handleFile = handleFile;
        mass.loadInputFile = loadInputFile;
        mass.processInputFile = processInputFile;
        mass.submitPayment = submitPayment;
        mass.broadcastTransaction = broadcastTransaction;
        mass.transactionsToClipboard = transactionsToClipboard;
        mass.dataCopied = dataCopied;
        mass.cancel = cancel;

        cleanup();

        $scope.$on(events.ASSET_MASSPAY, function (event, eventData) {
            mass.wavesBalance = eventData.wavesBalance;
            mass.assetBalance = eventData.wavesBalance;
            if (eventData.assetId) {
                mass.assetBalance = applicationContext.cache.assets[eventData.assetId].balance;
            }

            mass.sendingWaves = mass.assetBalance.currency === Currency.MIR;

            cleanup();

            dialogService.open('#asset-mass-pay-dialog');
        });

        function fileErrorHandler(evt) {
            cleanup();

            switch (evt.target.error.code) {
                case evt.target.error.NOT_FOUND_ERR:
                    notificationService.error('File Not Found!');
                    break;
                case evt.target.error.NOT_READABLE_ERR:
                    notificationService.error('File is not readable');
                    break;
                case evt.target.error.ABORT_ERR:
                    break; // noop
                default:
                    notificationService.error('An error occurred reading this file.');
            }
        }

        function loadInputFile (fileName, content) {
            try {
                mass.inputPayments = [];
                if (fileName.endsWith('.json')) {
                    mass.inputPayments = parseJsonFile(content);
                }
                else if (fileName.endsWith('.csv')) {
                    mass.inputPayments = parseCsvFile(content);
                }
                else {
                    throw new Error('Unsupported file type: ' + fileName);
                }
            }
            catch (ex) {
                notificationService.error('Failed to parse file: ' + ex);
            }
        }

        function parseCsvFile (content) {
            var lines = content.split('\n');
            var result = [];
            _.forEach(lines, function (line) {
                line = line.trim();
                if (line.length < 1)
                    return;

                var parts = line.split(';');
                if (parts.length < 2) {
                    throw new Error('CSV file contains ' + parts.length + ' columns. Expected 2 or 3 columns');
                }
                var address = parts[0];
                var amount = parseFloat(parts[1]);
                var id;
                if (parts.length > 2) {
                    id = parts[2];
                }

                result.push({
                    recipient: address,
                    amount: amount,
                    id: id
                });
            });

            return result;
        }

        function parseJsonFile (content) {
            return $window.JSON.parse(content);
        }

        function loadTransactionsFromFile() {
            var sender = {
                publicKey: applicationContext.account.keyPair.public,
                privateKey: applicationContext.account.keyPair.private
            };

            try {
                transactions = [];
                var transfersToDisplay = [];
                var transferCurrency = mass.assetBalance.currency;
                var totalTransactions = 0;
                var totalAmount = Money.fromCoins(0, transferCurrency);
                var totalFee = Money.fromCoins(0, Currency.MIR);
                var fee = Money.fromTokens(mass.autocomplete.getFeeAmount(), Currency.MIR);
                var minimumPayment = Money.fromCoins(1, transferCurrency);
                _.forEach(mass.inputPayments, function (transfer) {
                    if (isNaN(transfer.amount)) {
                        throw new ValidationError('Failed to parse payment amount for address ' + transfer.recipient);
                    }

                    var assetTransfer = {
                        recipient: transfer.recipient,
                        amount: Money.fromTokens(transfer.amount, transferCurrency),
                        fee: fee,
                        attachment: transfer.id ? converters.stringToByteArray(transfer.id) : undefined
                    };

                    if (assetTransfer.amount.lessThan(minimumPayment)) {
                        throw new ValidationError('Payment amount ' + transfer.amount + ' to address ' +
                            transfer.recipient + ' is less than minimum (' + minimumPayment.formatAmount(true) + ')');
                    }

                    if (transfersToDisplay.length < FIRST_TRANSACTIONS_COUNT)
                        transfersToDisplay.push({
                            recipient: transfer.recipient,
                            amount: assetTransfer.amount.formatAmount(true)
                        });

                    transactions.push(assetService.createAssetTransferTransaction(assetTransfer, sender));

                    // statistics
                    totalAmount = totalAmount.plus(assetTransfer.amount);
                    totalFee = totalFee.plus(assetTransfer.fee);
                    totalTransactions++;
                });

                mass.broadcast.setTransaction(transactions);

                mass.summary.totalAmount = totalAmount;
                mass.summary.totalTransactions = totalTransactions;
                mass.summary.totalFee = totalFee;
                mass.transfers = transfersToDisplay;
                mass.stage = PROCESSING_STAGE;

                // cleaning up
                mass.filename = '';
                mass.inputPayments = [];
            }
            catch (e) {
                if (e instanceof ValidationError) {
                    mass.invalidPayment = true;
                    mass.inputErrorMessage = e.message;
                }
                else {
                    throw e;
                }
            }

            mass.loadingInProgress = false;
        }

        function processInputFile(form) {
            if (!form.validate(mass.validationOptions)) {
                return;
            }

            if (!mass.inputPayments || mass.inputPayments.length === 0) {
                notificationService.error('Payments were not provided or failed to parse. Nothing to load');

                return;
            }

            if (mass.inputPayments.length > MAXIMUM_TRANSACTIONS_PER_FILE) {
                notificationService.error('Too many payments for a single file. Maximum payments count ' +
                    'in a file should not exceed ' + MAXIMUM_TRANSACTIONS_PER_FILE);

                return;
            }

            mass.loadingInProgress = true;
            // loading transactions asynchronously
            $timeout(loadTransactionsFromFile, 150);
        }

        function submitPayment() {
            var paymentCost = !mass.sendingWaves ?
                mass.summary.totalFee :
                mass.summary.totalFee.plus(mass.summary.totalAmount);

            if (paymentCost.greaterThan(mass.wavesBalance)) {
                notificationService.error('Not enough Mir to make mass payment');

                return false;
            }

            if (mass.summary.totalAmount.greaterThan(mass.assetBalance)) {
                notificationService.error('Not enough "' + mass.assetBalance.currency.displayName +
                    '" to make mass payment');

                return false;
            }

            // setting data for the confirmation dialog
            mass.confirm.amount = mass.summary.totalAmount;
            mass.confirm.fee = mass.summary.totalFee;
            mass.confirm.recipients = mass.summary.totalTransactions;

            dialogService.close();
            $timeout(function () {
                dialogService.open('#asset-mass-pay-confirmation');
            }, 1);

            return true;
        }

        function cancel () {
            dialogService.close();
        }

        function broadcastTransaction() {
            mass.broadcast.broadcast();
        }

        function handleFile(file) {
            if (file.size > MAXIMUM_FILE_SIZE_BYTES) {
                notificationService.error('File "' + file.name + '" is too big. Maximum file size is ' +
                    MAXIMUM_FILE_SIZE_BYTES / 1024 + 'Kb');

                return;
            }

            var reader = new $window.FileReader();

            reader.onloadend = function (event) {
                NProgress.done();

                if (event.target.readyState == FileReader.DONE)
                    mass.loadInputFile(file.name, event.target.result);
            };
            reader.onloadstart = function (event) {
                cleanup();
                NProgress.start();
            };
            reader.onabort = function (event) {
                notificationService.error('File read cancelled');
            };
            reader.onerror = fileErrorHandler;

            reader.readAsText(file);
        }

        function transactionsToClipboard() {
            return $window.JSON.stringify(transactions, null, ' ');
        }

        function dataCopied() {
            notificationService.notice('Transactions copied successfully');
        }

        function cleanup() {
            mass.summary.totalAmount = ZERO_MONEY;
            mass.summary.totalTransactions = 0;
            mass.summary.totalFee = ZERO_MONEY;
            mass.stage = LOADING_STAGE;
            mass.invalidPayment = false;

            mass.confirm.amount = Money.fromTokens(0, Currency.MIR);
            mass.confirm.recipients = 0;
            mass.confirm.fee = Money.fromTokens(0, Currency.MIR);

            mass.autocomplete.defaultFee(constants.MINIMUM_TRANSACTION_FEE);
        }
    }

    WavesMassPaymentController.$inject = ['$scope', '$window', '$timeout', 'constants.ui', 'portfolio.events',
        'applicationContext', 'autocomplete.fees',
        'notificationService', 'assetService', 'dialogService', 'transactionBroadcast', 'apiService'];

    angular
        .module('app.portfolio')
        .controller('massPaymentController', WavesMassPaymentController);
})();

(function () {
    'use strict';

    angular
        .module('app.portfolio')
        .directive('fileSelect', [function WavesFileSelectDirective() {
            return {
                restrict: 'A',
                scope: {
                    fileHandler: '&'
                },
                link: function (scope, element) {
                    element.on('change', function (changeEvent) {
                        var files = changeEvent.target.files;
                        if (files.length) {
                            scope.fileHandler({file: files[0]});
                        }
                    });
                }
            };
        }]);
})();

/******************************************************************************
 * Copyright Â© 2016 The Waves Core Developers.                                *
 *                                                                            *
 * See the LICENSE.txt files at                                               *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Waves software, including this file, may be copied, modified, propagated,  *
 * or distributed except according to the terms contained in the LICENSE.txt  *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

(function ($, window) {
    'use strict';

    var $wrapW = $('#wrapper').width(),
        $mbBodyH = $('#mainBody').height();

    // GUI elements dynamic sizing and LeftBar visibility
    $(window).on('load resize', function (e) {

        var $wrapH = $('#wrapper').height(),
            $headerH = $('header').height(),
            $tabsH = $('#tabs').height(),
            $mainBodyH = $wrapH - $headerH - $tabsH,
            $mbBodyW = $wrapW;

        $('#mainBody').css('height', $mainBodyH);
        $('#mBBody').css('width', $mbBodyW);
    });
})(jQuery, window);

/**
 * Setup of main AngularJS application, with Restangular being defined as a dependency.
 *
 * @see controllers
 * @see services
 */

// mock methods to implement late binding
var __mockShowError = function(message) {};
var __mockValidateAddress = function(address) {};

var app = angular.module('app', [
    'restangular',
    'waves.core',

    'ngclipboard',
    'ngAnimate',
    'ngMaterial',
    'ngValidate',
    'app.ui',
    'app.shared',
    'app.login',
    'app.navigation',
    'app.wallet',
    'app.tokens',
    'app.dex',
    'app.leasing',
    'app.history',
    'app.community',
    'app.portfolio'
]).config(AngularApplicationConfig).run(AngularApplicationRun);

function AngularApplicationConfig($provide, $compileProvider, $validatorProvider, $qProvider,
                                  $sceDelegateProvider, $mdAriaProvider, networkConstants, applicationSettings) {
    'use strict';

    $provide.constant(networkConstants,
        angular.extend(networkConstants, {
            NETWORK_NAME: 'Mirnet',
            NETWORK_CODE: 'S'
        }));
    $provide.constant(applicationSettings,
        angular.extend(applicationSettings, {
            CLIENT_VERSION: '1.0.0', // W0.5.22a
            NODE_ADDRESS: 'https://node.mir.dei.su',
            COINOMAT_ADDRESS: 'https://coinomat.com',
            MATCHER_ADDRESS: 'http://185.181.164.136:6886',
            DATAFEED_ADDRESS: 'https://marketdata.wavesplatform.com'
        }));

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|file|chrome-extension):/);
    $qProvider.errorOnUnhandledRejections(false);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://test.coinomat.com/api/**',
        'https://coinomat.com/api/**',
        'https://marketdata.wavesplatform.com/**'
    ]);

    // Globally disables all ARIA warnings.
    $mdAriaProvider.disableWarnings();

    $validatorProvider.setDefaults({
        errorClass: 'wInput-error',
        onkeyup: false,
        showErrors : function(errorMap, errorList) {
            errorList.forEach(function(error) {
                // can't use notificationService here cos services are not available in config phase
                __mockShowError(error.message);
            });

            var i, elements;
            for (i = 0, elements = this.validElements(); elements[i]; i++) {
                angular.element(elements[i]).removeClass(this.settings.errorClass);
            }

            for (i = 0, elements = this.invalidElements(); elements[i]; i++) {
                angular.element(elements[i]).addClass(this.settings.errorClass);
            }
        }
    });

    $validatorProvider.addMethod('address', function (value, element) {
        return this.optional(element) || __mockValidateAddress(value);
    }, 'Account number must be a sequence of 35 alphanumeric characters with no spaces, ' +
        'optionally starting with \'1W\'');

    $validatorProvider.addMethod('decimal', function (value, element, maxDigits) {
        maxDigits = angular.isNumber(maxDigits) ? maxDigits : Currency.MIR.precision;
        var regex = new RegExp('^(?:-?\\d+)?(?:\\.\\d{0,' + maxDigits + '})?$');
        return this.optional(element) || regex.test(value);
    }, 'Amount is expected with a dot (.) as a decimal separator with no more than {0} fraction digits');

    $validatorProvider.addMethod('password', function (value, element) {
        if (this.optional(element)) {
            return true;
        }

        var containsDigits = /[0-9]/.test(value);
        var containsUppercase = /[A-Z]/.test(value);
        var containsLowercase = /[a-z]/.test(value);

        return containsDigits && containsUppercase && containsLowercase;
    }, 'The password is too weak. A good password must contain at least one digit, ' +
        'one uppercase and one lowercase letter');

    $validatorProvider.addMethod('minbytelength', function (value, element, minLength) {
        if (this.optional(element)) {
            return true;
        }

        if (!angular.isNumber(minLength)) {
            throw new Error('minbytelength parameter must be a number. Got ' + minLength);
        }

        return converters.stringToByteArray(value).length >= minLength;
    }, 'String is too short. Please add more characters.');

    $validatorProvider.addMethod('maxbytelength', function (value, element, maxLength) {
        if (this.optional(element)) {
            return true;
        }

        if (!angular.isNumber(maxLength)) {
            throw new Error('maxbytelength parameter must be a number. Got ' + maxLength);
        }

        return converters.stringToByteArray(value).length <= maxLength;
    }, 'String is too long. Please remove some characters.');
}

AngularApplicationConfig.$inject = ['$provide', '$compileProvider', '$validatorProvider', '$qProvider',
    '$sceDelegateProvider', '$mdAriaProvider', 'constants.network', 'constants.application'];

function AngularApplicationRun(rest, applicationConstants, notificationService, addressService) {
    'use strict';

    // restangular configuration
    rest.setDefaultHttpFields({
        timeout: 10000 // milliseconds
    });
    var url = applicationConstants.NODE_ADDRESS;
    rest.setBaseUrl(url);

    // override mock methods cos in config phase services are not available yet
    __mockShowError = function (message) {
        notificationService.error(message);
    };
    __mockValidateAddress = function (address) {
        return addressService.validateAddress(address.trim());
    };
}

AngularApplicationRun.$inject = ['Restangular', 'constants.application', 'notificationService', 'addressService'];

angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dex/asset.picker.component',
    "<md-autocomplete class=\"assets-autocomplete\" ng-class=\"{amount: $ctrl.type === 'amountAsset', price: $ctrl.type === 'priceAsset'}\" placeholder=\"Choose an asset or copy-paste an ID here\" md-menu-class=\"assets-autocomplete-popup\" md-selected-item=\"$ctrl.autocomplete.selectedAsset\" md-selected-item-change=\"$ctrl.changeAsset()\" md-search-text=\"$ctrl.autocomplete.searchText\" md-search-text-change=\"\" md-items=\"item in $ctrl.findAssets($ctrl.autocomplete.searchText)\" md-item-text=\"item.displayName\" md-clear-button=\"false\" md-no-cache=\"true\" md-min-length=\"0\" md-has-not-found=\"true\" md-select-on-focus><md-item-template><div class=\"asset-tile\"><span class=\"label\" ng-class=\"{'verified': item.verified}\" md-highlight-text=\"$ctrl.autocomplete.searchText\" title=\"{{item.verified ? 'Asset is verified' : ''}}\">{{item.verified ? item.displayName : ''}}</span> <span class=\"muted\">{{item.id}}</span></div></md-item-template><md-not-found><span ng-if=\"$ctrl.isAssetLoading\">Loading...</span> <span ng-if=\"!$ctrl.isAssetLoading\">Nothing is found!</span></md-not-found></md-autocomplete>"
  );


  $templateCache.put('dex/chart.component',
    "<div class=\"chart\"></div>"
  );


  $templateCache.put('dex/component',
    "<div class=\"exchange\"><div class=\"choice\"><div class=\"picker-widget\"><waves-dex-asset-picker name=\"Amount asset\" type=\"amountAsset\" assets=\"$ctrl.assetsList\" hidden-asset=\"$ctrl.pair.priceAsset\" picked-asset=\"$ctrl.pair.amountAsset\"></waves-dex-asset-picker></div><div class=\"current-pair\">{{$ctrl.pair.amountAsset.shortName}}/{{$ctrl.pair.priceAsset.shortName}}</div><div class=\"picker-widget\"><waves-dex-asset-picker name=\"Price asset\" type=\"priceAsset\" assets=\"$ctrl.assetsList\" hidden-asset=\"$ctrl.pair.amountAsset\" picked-asset=\"$ctrl.pair.priceAsset\"></waves-dex-asset-picker></div></div><div class=\"charts\"><waves-dex-chart pair=\"$ctrl.pair\"></waves-dex-chart></div><div class=\"workplace\"><div class=\"orderbooks\"><div class=\"orderbook\"><waves-dex-orderbook type=\"buy\" name=\"{{$ctrl.pair.amountAsset.displayName}} buy orders\" pair=\"$ctrl.pair\" on-click=\"$ctrl.fillSellForm\" orders=\"$ctrl.buyOrders\"></waves-dex-orderbook></div><div class=\"orderbook\"><waves-dex-orderbook type=\"sell\" name=\"{{$ctrl.pair.amountAsset.displayName}} sell orders\" pair=\"$ctrl.pair\" on-click=\"$ctrl.fillBuyForm\" orders=\"$ctrl.sellOrders\"></waves-dex-orderbook></div><div class=\"orderbook\"><waves-dex-history pair=\"$ctrl.pair\" trades=\"$ctrl.tradeHistory\"></waves-dex-history></div></div><div class=\"user-orders\"><waves-dex-order-creator pair=\"$ctrl.pair\" submit=\"$ctrl.createOrder\" last-price=\"$ctrl.lastTradePrice\" buy-values=\"$ctrl.buyFormValues\" sell-values=\"$ctrl.sellFormValues\"></waves-dex-order-creator><waves-dex-user-orders pair=\"$ctrl.pair\" orders=\"$ctrl.userOrders\" cancel-order=\"$ctrl.cancelOrder\"></waves-dex-user-orders></div></div></div><aside class=\"pairs-lists\"><waves-dex-favorites pairs=\"$ctrl.favoritePairs\" switch-pair=\"$ctrl.changePair\"></waves-dex-favorites><div class=\"how-to\"><h3>Quick guide</h3><p>1. Choose a pair of assets you want to trade. Just start typing asset name, then pick the right one.</p><p>2. Take a look at orderbooks to get an understanding of the pair market.</p><p>3. Finally, fill the form and submit your order.</p></div></aside><div id=\"dex-bad-order-confirmation\" waves-dialog ok-button-caption=\"YES\" on-dialog-ok=\"$ctrl.placeBadOrder()\" cancel-button-caption=\"NO\" on-dialog-cancel=\"$ctrl.refuseBadOrder()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">{{$ctrl.badOrderQuestion}}</p></div></div>"
  );


  $templateCache.put('dex/favorites.component',
    "<h2>Favorites</h2><div class=\"pairs-list\"><div class=\"pair\" ng-repeat=\"p in $ctrl.pairs\" ng-click=\"$ctrl.onClick(p)\">{{p.amountAsset.shortName}}/{{p.priceAsset.shortName}}</div></div>"
  );


  $templateCache.put('dex/history.component',
    "<h3>Trade history</h3><table><thead><tr><td>Date</td><td>Type</td><td>Price ({{$ctrl.pair.priceAsset.shortName}})</td><td>Amount ({{$ctrl.pair.amountAsset.shortName}})</td><td>Total ({{$ctrl.pair.priceAsset.shortName}})</td></tr></thead></table><waves-scrollbox><table><tbody><tr ng-repeat=\"trade in $ctrl.trades\"><td>{{trade.timestamp | formatting}}</td><td class=\"type\" ng-class=\"trade.type\">{{trade.typeTitle}}</td><td>{{trade.price | number:$ctrl.pair.priceAsset.precision}}</td><td>{{trade.amount | number:$ctrl.pair.amountAsset.precision}}</td><td>{{trade.total | number:$ctrl.pair.priceAsset.precision}}</td></tr><tr ng-if=\"!$ctrl.trades.length\"><td colspan=\"5\"><span>There was no trades for the current pair.</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('dex/order.creator.component',
    "<div class=\"half buy\"><h2><span>Buy {{$ctrl.pair.amountAsset.displayName}} </span><small ng-click=\"$ctrl.buyFullBalance()\">{{$ctrl.priceAssetBalance}}</small></h2><div class=\"fields\"><md-input-container><label>Price in {{$ctrl.pair.priceAsset.displayName}}</label><input type=\"text\" ng-model=\"$ctrl.buy.price\" ng-change=\"$ctrl.updateBuyTotal()\" decimal-input-restrictor></md-input-container><md-input-container><label>{{$ctrl.pair.amountAsset.displayName}} amount</label><input type=\"text\" ng-model=\"$ctrl.buy.amount\" ng-change=\"$ctrl.updateBuyTotal()\" decimal-input-restrictor></md-input-container><div><span>Total:&nbsp;</span> <span>{{$ctrl.buy.total | number:$ctrl.pair.priceAsset.precision}}&nbsp;</span> <span>{{$ctrl.pair.priceAsset.shortName}}</span></div><div><span><abbr title=\"Fee will be taken in the moment of order execution\">Fee</abbr>:&nbsp;</span> <span>{{$ctrl.buy.fee}}</span> <span>WAV</span></div></div><div class=\"button-container\"><button ng-disabled=\"$ctrl.buy.blocked\" ng-click=\"$ctrl.submitBuyOrder()\">Buy</button></div></div><div class=\"half sell\"><h2><span>Sell {{$ctrl.pair.amountAsset.displayName}} </span><small ng-click=\"$ctrl.sellFullBalance()\">{{$ctrl.amountAssetBalance}}</small></h2><div class=\"fields\"><md-input-container><label>Price in {{$ctrl.pair.priceAsset.displayName}}</label><input type=\"text\" ng-model=\"$ctrl.sell.price\" ng-change=\"$ctrl.updateSellTotal()\" decimal-input-restrictor></md-input-container><md-input-container><label>{{$ctrl.pair.amountAsset.displayName}} amount</label><input type=\"text\" ng-model=\"$ctrl.sell.amount\" ng-change=\"$ctrl.updateSellTotal()\" decimal-input-restrictor></md-input-container><div><span>Total:&nbsp;</span> <span>{{$ctrl.sell.total | number:$ctrl.pair.priceAsset.precision}}&nbsp;</span> <span>{{$ctrl.pair.priceAsset.shortName}}</span></div><div><span><abbr title=\"Fee will be taken in the moment of order execution\">Fee</abbr>:&nbsp;</span> <span>{{$ctrl.sell.fee}}</span> <span>WAV</span></div></div><div class=\"button-container\"><button ng-disabled=\"$ctrl.sell.blocked\" ng-click=\"$ctrl.submitSellOrder()\">Sell</button></div></div>"
  );


  $templateCache.put('dex/orderbook.component',
    "<h3>{{$ctrl.name}}</h3><table ng-class=\"$ctrl.type\"><thead><tr><td>Price</td><td>{{$ctrl.pair.amountAsset.shortName}}</td><td>{{$ctrl.pair.priceAsset.shortName}}</td><td>SUM ({{$ctrl.pair.priceAsset.shortName}})</td></tr></thead></table><waves-scrollbox><table ng-class=\"$ctrl.type\"><tbody><tr ng-repeat=\"order in $ctrl.orders\" ng-click=\"$ctrl.lineClick($index)\"><td ng-bind-html=\"order.price | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.price\"></td><td ng-bind-html=\"order.amount | number:$ctrl.pair.amountAsset.precision | padder:$ctrl.lengths.amount\"></td><td ng-bind-html=\"order.total | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.total\"></td><td ng-bind-html=\"order.sum | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.sum\"></td></tr><tr ng-if=\"!$ctrl.orders.length\"><td colspan=\"4\"><span>Some orders will appear soon.</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('dex/pair.chart.component',
    "<img src=\"http://www.ifmr.co.in/blog/wp-content/uploads/2014/04/BitcoinPrice.png\">"
  );


  $templateCache.put('dex/user.orders.component',
    "<h3>My orders</h3><table class=\"user\"><thead><tr><td>Status</td><td>Type</td><td>Price</td><td>{{$ctrl.pair.amountAsset.shortName}}</td><td>{{$ctrl.pair.priceAsset.shortName}}</td><td></td></tr></thead></table><waves-scrollbox><table class=\"user\"><tbody><tr ng-repeat=\"order in $ctrl.orders\" ng-class=\"{\n" +
    "            'filled': order.status === 'Filled' || order.status === 'Cancelled',\n" +
    "            'not-found': order.status === 'NotFound'\n" +
    "          }\"><td>{{order.statusTitle}}</td><td class=\"type\" ng-class=\"order.type\">{{order.typeTitle}}</td><td>{{order.price | number:8}}</td><td>{{order.amount | number:8}}</td><td>{{order.total | number:8}}</td><td ng-click=\"$ctrl.cancel({order: order})\">&times;</td></tr><tr ng-if=\"!$ctrl.orders.length\"><td colspan=\"6\"><span>Create your first order!</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('leasing/balance.details.component',
    "<section-header>BALANCE DETAILS</section-header><table class=\"waves-table\"><tbody><tr><td>Regular</td><td>{{$ctrl.formattedBalance.regular}}</td></tr><tr><td>Effective</td><td>{{$ctrl.formattedBalance.effective}}</td></tr><tr><td>Generating</td><td>{{$ctrl.formattedBalance.generating}}</td></tr></tbody></table>"
  );


  $templateCache.put('leasing/component',
    "<div class=\"leasing\"><div class=\"tools\"><div class=\"column balance\"><waves-leasing-balance-details balance-details=\"$ctrl.balanceDetails\"></waves-leasing-balance-details></div><div class=\"column form\"><waves-leasing-lease-form></waves-leasing-lease-form></div><div class=\"column quick-note\"><section-header>QUICK NOTE</section-header><p>You can only transfer or trade Mir that arenâ€™t leased. The leased amount cannot be transferred or traded by you or anyone else.</p><p>You can cancel a leasing transaction as soon as it appears in the blockchain which usually occurs in a minute or less.</p><p>To cancel a lease, click on the black button in the far right column of the Leasing Transactions table below and select Cancel Leasing.</p><p>The generating balance will be updated after 1000 blocks.</p></div></div><waves-transaction-history heading=\"LEASING TRANSACTIONS\" transactions=\"$ctrl.transactions\" limit-to=\"$ctrl.limitTo\"></waves-transaction-history></div>"
  );


  $templateCache.put('leasing/lease.form.component',
    "<section-header>BALANCE LEASING</section-header><form name=\"$ctrl.form\" novalidate ng-validate=\"$ctrl.validationOptions\"><table class=\"form-table\"><tbody><tr><td>Recipient</td><td><input class=\"wInput form-control\" name=\"leasingRecipient\" type=\"text\" placeholder=\"Recipient address\" ng-model=\"$ctrl.recipient\"></td></tr><tr><td>Amount</td><td><input class=\"wInput form-control\" name=\"leasingAmount\" type=\"text\" placeholder=\"Leasing amount\" ng-model=\"$ctrl.amount\" decimal-input-restrictor></td></tr><tr><td class=\"fee\">Fee</td><td class=\"fee\">{{$ctrl.fee | moneyLong:true}}</td></tr><tr><td colspan=\"2\" class=\"button-container\"><button class=\"wButton wButton-neg fade\" ng-click=\"$ctrl.confirmLease($ctrl.form)\">LEASE</button></td></tr></tbody></table></form><div id=\"start-leasing-confirmation\" waves-dialog ok-button-caption=\"CONFIRM\" ok-button-enabled=\"!$ctrl.broadcast.pending\" on-dialog-ok=\"$ctrl.broadcastTransaction()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">You are going to lease <span class=\"confirmation-value\">{{$ctrl.confirm.amount | moneyLong:true}}</span> with <span class=\"confirmation-value\">{{$ctrl.confirm.fee | moneyLong:true}}</span> fee to the address<br><span class=\"confirmation-value\">{{$ctrl.confirm.recipient}}</span></p><p class=\"dialog-text\">Please <span class=\"fontBold\">CONFIRM </span>to execute or <span class=\"fontBold\">CANCEL </span>to discard.</p></div></div>"
  );


  $templateCache.put('navigation/tab.directive',
    "<img ng-src=\"img/tabs-iconset-{{pageId}}.svg\" class=\"fFade\" alt=\"{{caption}}\" ng-click=\"onClick()\" ng-class=\"[{selected: isSelected()}]\">"
  );


  $templateCache.put('shared/dialog.directive',
    "<img class=\"wPop-header\" ng-src=\"img/{{image}}\"><div class=\"wavesPop-content\" ng-transclude></div><div class=\"wavesPop-content-buttons button-row\" ng-show=\"showButtons\"><button class=\"wButton wButton-dialog fade tooltip-1\" ng-class=\"[{wButtonDanger: isError}]\" title=\"{{::tooltip}}\" ng-click=\"onOk()\" ng-disabled=\"!okButtonEnabled\">{{::okButtonCaption}}</button> <span class=\"divider-2\" ng-if=\"cancelButtonVisible\"></span> <button ng-if=\"cancelButtonVisible\" class=\"wButton wButton-dialog fade\" ng-class=\"[{wButtonDanger: isError}]\" ng-click=\"onCancel()\">{{::cancelButtonCaption}}</button><waves-support-link ng-if=\"::!noSupportLink\" class=\"dark\"></waves-support-link></div>"
  );


  $templateCache.put('shared/transaction.history.component',
    "<section-header>{{::$ctrl.heading}}</section-header><waves-scrollbox class=\"transactions-table\"><table><thead><tr><td>DATE</td><td>TYPE</td><td>NAME</td><td>SENDER</td><td>RECIPIENT</td><td>FEE</td><td>UNITS</td><td></td></tr></thead><tbody><tr ng-repeat=\"tx in $ctrl.transactions | antiSpam | orderBy:'timestamp':true | limitTo:$ctrl.limitTo | transaction track by tx.timestamp\" ng-class=\"{'tx-unc': tx.unconfirmed, 'tx-in': !tx.formatted.isOutgoing, 'tx-out': tx.formatted.isOutgoing}\"><td>{{tx.formatted.datetime}}</td><td>{{tx.formatted.type}}</td><td>{{tx.formatted.asset}}</td><td>{{tx.formatted.sender}}</td><td>{{tx.formatted.recipient}}</td><td>{{tx.formatted.fee}} {{tx.formatted.feeAsset.shortName}}</td><td>{{tx.formatted.amount}}</td><td width=\"16\"><tx-menu transaction=\"tx\"></tx-menu></td></tr></tbody></table><div id=\"cancel-leasing-confirmation\" waves-dialog ok-button-caption=\"CONFIRM\" on-dialog-ok=\"$ctrl.cancelLeasing()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">You are going to cancel leasing of <span class=\"confirmation-value\">{{$ctrl.confirm.amount}}</span> <span class=\"confirmation-value\">{{$ctrl.confirm.asset}}</span> with <span class=\"confirmation-value\">{{$ctrl.confirm.fee | moneyLong:true}}</span> fee<br>for the address <span class=\"confirmation-value\">{{$ctrl.confirm.recipient}}</span></p><p class=\"dialog-text\">Please <span class=\"fontBold\">CONFIRM </span>to execute or <span class=\"fontBold\">CANCEL </span>to discard.</p></div></div></waves-scrollbox>"
  );


  $templateCache.put('shared/transaction.menu.component',
    "<md-menu><md-button class=\"md-icon-button\" ng-click=\"$mdMenu.open($event)\"><img ng-src=\"img/wicon_txmenu.svg\" height=\"16\" width=\"16\"></md-button><md-menu-content width=\"2\"><md-menu-item><md-button ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.sender}}\" ngclipboard-success=\"$ctrl.addressCopied()\"><span md-menu-align-target>Copy sender address</span></md-button></md-menu-item><md-menu-item><md-button ng-disabled=\"!$ctrl.hasRecipient()\" ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.recipient}}\" ngclipboard-success=\"$ctrl.addressCopied()\"><span md-menu-align-target>Copy recipient address</span></md-button></md-menu-item><md-menu-item><md-button ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.id}}\" ngclipboard-success=\"$ctrl.idCopied()\"><span md-menu-align-target>Copy TX ID</span></md-button></md-menu-item><md-menu-item><md-button ngclipboard ngclipboard-text-provider=\"$ctrl.fullTransactionData()\" ngclipboard-success=\"$ctrl.dataCopied()\"><span md-menu-align-target>Copy full TX data</span></md-button></md-menu-item><md-menu-item ng-if=\"$ctrl.isLeasing()\"><md-button ng-click=\"$ctrl.cancelLeasing()\"><span md-menu-align-target>Cancel Leasing</span></md-button></md-menu-item></md-menu-content></md-menu>"
  );


  $templateCache.put('wallet/box.component',
    "<img ng-src=\"img/{{::$ctrl.image}}\" alt=\"{{::$ctrl.displayName}}\"><div class=\"wB-name\">{{::$ctrl.displayName | uppercase}}</div><div class=\"wB-add\"></div><div class=\"wB-balInt\">{{$ctrl.integerBalance}}</div><div class=\"wB-balDec\">{{$ctrl.fractionBalance}}</div><div class=\"wB-buttons\"><a ng-click=\"$ctrl.onSend({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butSend fade\"><p>SEND</p></div></a><a ng-click=\"$ctrl.onWithdraw({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butRec fade\"><p>WITHDRAW</p></div></a><a ng-click=\"$ctrl.onDeposit({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butTrade fade\"><p>DEPOSIT</p></div></a></div>"
  );

}]);
