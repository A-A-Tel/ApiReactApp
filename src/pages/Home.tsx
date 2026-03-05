import { useEffect, useState } from "react";
import Header from "../components/header/";

import CoinPrinter from "@/components/coin-printer";

export function Home() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        (async () => {
            const trending = await fetch(
                "https://api.coingecko.com/api/v3/search/trending"
            ).then(r => r.json());

            const ids = trending.coins.map((c: { item: { id: string; }; }) => c.item.id).join(",");

            const markets = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${ids}`
            ).then(r => r.json());

            setCoins(markets.map((c: { name: string; symbol: string; current_price: string; image: string; }) => ({
                name: c.name,
                symbol: c.symbol,
                price: c.current_price,
                icon: c.image
            })));
        })();
    }, []);

    return (
        <>
            <Header/>
            <CoinPrinter coins={coins}/>
        </>
    );
}