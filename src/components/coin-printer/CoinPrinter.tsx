import {Coin} from "@/components/coin";
import { useState } from 'react';
import type { ReactElement } from 'react';
import type {CoinData} from "@/types.ts";

export function CoinPrinter({coins}: { coins: CoinData[] }) {
    const [favourites, setFavourites] = useState<string[]>(JSON.parse(localStorage.getItem('favourites') ?? '[]'));


    const coinElements: ReactElement[] = [];

    for (const coin of coins) {
        coinElements.push(<Coin icon={coin.icon} name={coin.name} price={coin.price} symbol={coin.symbol} id={coin.id}
                                favourites={favourites} setFavourites={setFavourites}/>);
    }

    return (
        <div className='mt-6 flex flex-col gap-5'>
            {coinElements}
        </div>
    )
}