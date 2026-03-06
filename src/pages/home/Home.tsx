import {useEffect, useState} from "react";
import {Header} from "@/components/header";

import {CoinPrinter} from "@/components/coin-printer";
import type {CoinData} from "@/types.ts";

export function Home() {
    const [coins, setCoins] = useState<CoinData[]>([]);

    useEffect(() => {
        fetch(
            "https://api.coingecko.com/api/v3/search/trending"
        )
            .then(r => r.json())
            .then(data => {
                const ids = data.coins.map((c: { item: { id: string; }; }) => c.item.id).join(",");

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
            });
    }, []);

    return (
        <>
            <Header/>
            <CoinPrinter coins={coins}/>
        </>
    );
}