import './index.css';
import type {CoinData} from "@/types.ts";
import {useState, useEffect} from 'react';

type CoinProps = {
    data: CoinData,
    favourites: number[],
    setFavourites: (favourites: number[]) => void
}

export function Coin({data, favourites, setFavourites}: CoinProps) {

    const [percentage, setPercentage] = useState<number>(0);
    const isFavourite = favourites.includes(data.id);

    useEffect(() => {
        const newPercentage =
            ((data.price - data.oldPrice) / data.oldPrice) * 100;

        if (newPercentage !== 0) {
            // eslint-disable-next-line
            setPercentage(newPercentage);
        }

    }, [data.price, data.oldPrice]);

    function toggleFavourite(id: number) {
        if (isFavourite) {
            setFavourites(favourites.filter(fav => fav !== id));
        } else {
            setFavourites([...favourites, id]);
        }
    }

    return (
        <div className='coin flex items-center justify-between pl-4'>
            <img className='mx-auto rounded-full w-12 h-12 select-none' src={data.icon} alt="Crypto"/>

            <span className='speedee text-white text-2xl flex justify-between mx-4 bg-[rgba(0,0,0,0.3)]'>
                Name:
                <span className='text-coin-name'>{data.name}</span>
            </span>

            <span className='speedee text-white text-2xl flex justify-between mx-4 bg-[rgba(0,0,0,0.3)]'>
                Symbol:
                <span className='text-coin-symbol'>{data.symbol}</span>
            </span>

            <span className='speedee text-white text-2xl flex justify-between mx-4 bg-[rgba(0,0,0,0.3)]'>
                Price:
                <span>
                    {percentage !== 0 && (
                        <span className={percentage > 0 ? 'text-green-500' : 'text-red-500'}>
                            {percentage > 0 ? '+' : ''}
                            {percentage.toFixed(6)}%
                        </span>
                    )}
                    {percentage !== 0 && <span className='text-white'> - </span>}
                    <span className='text-coin-price'>${Math.round(data.price * 100) / 100}</span>
                </span>
            </span>

            <button
                onClick={() => toggleFavourite(data.id)}
                className='speedee bg-primary-light p-4 text-white text-2xl rounded-2xl mr-20'
            >
                {isFavourite ? 'Unfavourite' : 'Favourite'}
            </button>
        </div>
    )
}