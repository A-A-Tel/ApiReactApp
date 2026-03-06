import {Header} from "@/components/header";
import {useEffect, useState} from 'react';
import type {CoinData} from "@/types.ts";
import {CoinPrinter} from "@/components/coin-printer";

export function Favourites() {
    const [coins, setCoins] = useState<CoinData[]>([]);

    useEffect(() => {

        const ids = JSON.parse(localStorage.getItem('favourites')?? '[]').join(',');

        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${ids}`
        )
            .then(r => r.json())
            .then(data => {

                setCoins(data.map((c: {
                    name: string;
                    symbol: string;
                    current_price: string;
                    image: string;
                    id: string;
                }) => ({
                    name: c.name,
                    symbol: c.symbol.toUpperCase(),
                    price: c.current_price,
                    icon: c.image,
                    id: c.id
                })));
            });
    }, []);

    return (
        <>
            <Header/>
            <CoinPrinter coins={coins}/>
        </>
    )
}