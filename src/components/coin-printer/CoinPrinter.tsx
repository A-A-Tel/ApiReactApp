import {Coin} from "@/components/coin";
import {useLocalStorage} from 'react-use';
import {useState} from 'react';
import type {CoinData} from "@/types.ts";

type CoinPrinterProps = {
    coins: CoinData[],
    favouritesState: [number[], (coins: number[]) => void] | undefined
}

export function CoinPrinter({coins, favouritesState}: CoinPrinterProps) {
    const [localFavourites, setLocalFavourites] = useLocalStorage<number[]>('favourites', []);
    const [favourites, setFavourites] = favouritesState ?? [localFavourites, setLocalFavourites]
    const [search, setSearch] = useState<string>('');


    const coinElements = coins
        .filter(coin => {
                return (
                    (
                        coin.name.toLowerCase().includes(search.toLowerCase()) ||
                        coin.symbol.toLowerCase().includes(search.toLowerCase())
                    ) &&
                    favouritesState ? favourites!.includes(coin.id) : true
                );
            }
        )
        .map(coin => <Coin key={coin.id} data={coin} favourites={favourites!} setFavourites={setFavourites}/>);


    return (
        <div className='mt-6 flex flex-col gap-5'>
            <input value={search} onChange={event => setSearch(event.target.value)}
                   className='mx-12 bg-cyan-900 p-2 rounded-2xl speedee text-white' type="text"/>
            {coinElements}
        </div>
    )
}