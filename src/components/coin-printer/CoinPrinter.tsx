import {Coin} from "@/components/coin";
import {useLocalStorage} from 'react-use';
import type { ReactElement } from 'react';
import type {CoinData} from "@/types.ts";

export function CoinPrinter({coins}: { coins: CoinData[] }) {
    const [favourites, setFavourites] = useLocalStorage<string[]>('favourites', []);


    const coinElements: ReactElement[] = [];

    for (const coin of coins) {
        coinElements.push(<Coin key={coin.id} icon={coin.icon} name={coin.name} price={coin.price} symbol={coin.symbol} id={coin.id}
                                favourites={favourites!} setFavourites={setFavourites}/>);
    }

    return (
        <div className='mt-6 flex flex-col gap-5'>
            {coinElements}
        </div>
    )
}