import { describe, expect, test } from 'vitest'
import { render } from "@testing-library/react";
import { CoinPrinter } from "@/components/coin-printer";
import type {CoinData} from "@/types.ts";

describe('CoinPrinter', () => {

    const coins: CoinData[] = [
        {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "price": 71689.418981532,
            "oldPrice": 71689.418981532,
            "icon": "https://resources.cryptocompare.com/asset-management/1/1756822117897.png",
            "marketCap": 1434722134312.8743
        },
        {
            "id": 2,
            "name": "Ethereum",
            "symbol": "ETH",
            "price": 2244.31270313974,
            "oldPrice": 2244.31270313974,
            "icon": "https://resources.cryptocompare.com/asset-management/2/1774347920093.png",
            "marketCap": 270868715608.84808
        },
        {
            "id": 8,
            "name": "BNB",
            "symbol": "BNB",
            "price": 612.150801848054,
            "oldPrice": 612.150801848054,
            "icon": "https://resources.cryptocompare.com/asset-management/8/1661250459982.png",
            "marketCap": 83470893874.38066
        },
        {
            "id": 29,
            "name": "Bitcoin Cash",
            "symbol": "BCH",
            "price": 445.383597613164,
            "oldPrice": 445.383597613164,
            "icon": "https://resources.cryptocompare.com/asset-management/29/1774276616943.png",
            "marketCap": 8915954649.325104
        },
        {
            "id": 20883,
            "name": "UCHAIN",
            "symbol": "UCN",
            "price": 361.748695852208,
            "oldPrice": 361.748695852208,
            "icon": "https://resources.cryptocompare.com/asset-management/20883/1760606290951.png",
            "marketCap": 36174869.5852208
        }
    ]

    test('prints all coins', () => {
        const element = render(<CoinPrinter coins={coins}/>)
        expect(element.container.querySelector('#coin-printer')?.children.length ?? -1, 'Should be five elements').toBe(coins.length + 2);
    })
});