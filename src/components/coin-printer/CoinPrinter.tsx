import {Coin} from "@/components/coin";
import {useLocalStorage} from 'react-use';
import {useState} from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import type {PieValueType} from '@mui/x-charts/models';
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
        .filter(coin => (
                (
                    coin.name.toLowerCase().includes(search.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(search.toLowerCase())
                )
            )
        )
        .map(coin => <Coin key={coin.id} coin={coin} favourites={favourites!} setFavourites={setFavourites}/>);



    return (
        <div className='mt-6 flex flex-col gap-5'>
            <div className='flex gap-5mx-auto w-fit mx-auto flex-col items-center gap-8 '>
                <h2 className='speedee text-3xl'>Market cap</h2>
                <PieChart series={[{
                    data: coins.slice(0, 10).map<PieValueType>(coin => {
                        return {
                            id: coin.id,
                            value: coin.marketCap,
                            label: coin.name
                        }
                    })
                }]} width={300} height={300}/>
            </div>
            <input placeholder='Filter' value={search} onChange={event => setSearch(event.target.value)}
                   className='mx-12 bg-cyan-900 p-2 rounded-2xl speedee text-white' type="text"/>
            {coinElements}
        </div>
    )
}