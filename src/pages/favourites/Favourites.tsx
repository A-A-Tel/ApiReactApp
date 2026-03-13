import {Header} from "@/components/header";
import {useEffect, useState} from 'react';
import {useLocalStorage} from 'react-use';
import type {CoinData} from "@/types.ts";
import {CoinPrinter} from "@/components/coin-printer";

export function Favourites() {
    const [favourites, setFavourites] = useLocalStorage<number[]>('favourites', []);
    const [coins, setCoins] = useState<CoinData[]>([]);

    useEffect(() => {

            const fetchCoins = () => {
                fetch('https://data-api.coindesk.com/asset/v2/metadata' +
                    '?assets=' + favourites!.join(',') +
                    '&asset_lookup_priority=ID&asset_language=en-US'
                )
                    .then(r => r.json())
                    .then(data => {
                        setCoins(prevCoins => {
                            const newCoins: CoinData[] = [];

                            for (const coinDataKey in data.Data) {
                                const previousPrice =
                                    prevCoins.find(c => c.symbol === data.Data[coinDataKey].SYMBOL)?.price
                                    ?? data.Data[coinDataKey].PRICE_USD;

                                newCoins.push({
                                    id: data.Data[coinDataKey].ID,
                                    name: data.Data[coinDataKey].NAME,
                                    symbol: data.Data[coinDataKey].SYMBOL,
                                    price: data.Data[coinDataKey].PRICE_USD,
                                    oldPrice: previousPrice,
                                    icon: data.Data[coinDataKey].LOGO_URL
                                });
                            }

                            return newCoins;
                        });
                    })
            };

            fetchCoins();

            const interval = setInterval(fetchCoins, 3000);

            return () => clearInterval(interval);
        }, [favourites]
    );

    return (
        <>
            <Header/>
            <CoinPrinter coins={coins} favouritesState={[favourites!, setFavourites]}/>
        </>
    )
}