import {useEffect, useState} from "react";
import {Header} from "@/components/header";

import {CoinPrinter} from "@/components/coin-printer";
import type {CoinData} from "@/types.ts";

export function Home() {
    const [coins, setCoins] = useState<CoinData[]|undefined>(undefined);

    useEffect(() => {
            const fetchCoins = () => {
                fetch('https://data-api.coindesk.com/asset/v1/top/list' +
                    '?page=1' +
                    '&page_size=100' +
                    '&sort_by=PRICE_USD' +
                    '&sort_direction=DESC' +
                    '&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK' +
                    '&asset_type=BLOCKCHAIN'
                )
                    .then(r => r.json())
                    .then(data => {
                        setCoins(prevCoins => {
                            const newCoins: CoinData[] = [];

                            for (const coinData of data.Data.LIST) {
                                const previousPrice =
                                    prevCoins?.find(c => c.symbol === coinData.SYMBOL)?.price
                                    ?? coinData.PRICE_USD;

                                newCoins.push({
                                    id: coinData.ID,
                                    name: coinData.NAME,
                                    symbol: coinData.SYMBOL,
                                    price: coinData.PRICE_USD,
                                    oldPrice: previousPrice,
                                    icon: coinData.LOGO_URL,
                                    marketCap: coinData.CIRCULATING_MKT_CAP_USD
                                });
                            }
                            console.log(newCoins.slice(0, 5));
                            return newCoins.sort((a, b) => b.marketCap - a.marketCap);
                        });
                    })
            };

            fetchCoins();

            const interval = setInterval(fetchCoins, 3000);

            return () => clearInterval(interval);
        }, []
    );

    return (
        <>
            <Header/>
            {coins && <CoinPrinter coins={coins}/>}
        </>
    );
}