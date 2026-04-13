import './index.css';
import {Link} from 'wouter'
import type {CoinData} from "@/types.ts";
import {useState, useEffect} from 'react';

type CoinProps = {
    coin: CoinData,
    favourites: number[],
    setFavourites: (favourites: number[]) => void
}

export function Coin({coin, favourites, setFavourites}: CoinProps) {

    const [percentage, setPercentage] = useState<number>(0);
    const isFavourite = favourites.includes(coin.id);

    useEffect(() => {
        const newPercentage =
            ((coin.price - coin.oldPrice) / coin.oldPrice) * 100;

        if (newPercentage !== 0) {
            // eslint-disable-next-line
            setPercentage(newPercentage);
        }

    }, [coin.price, coin.oldPrice]);

    function toggleFavourite(id: number) {
        if (isFavourite) {
            setFavourites(favourites.filter(fav => fav !== id));
        } else {
            setFavourites([...favourites, id]);
        }
    }

    return (
        <Link href={'/info/' + coin.id} className='coin flex items-center justify-between pl-4'>
            <img className='mx-auto rounded-full w-12 h-12 select-none' src={coin.icon} alt="Crypto"/>

            <span className='speedee text-white text-2xl flex justify-between mx-4 bg-[rgba(0,0,0,0.3)]'>
                Name:
                <span className='text-coin-name'>{coin.name}</span>
            </span>

            <span className='speedee text-white text-2xl flex justify-between mx-4 bg-[rgba(0,0,0,0.3)]'>
                Symbol:
                <span className='text-coin-symbol'>{coin.symbol}</span>
            </span>

            <span className='speedee text-white text-2xl flex justify-between mx-4 bg-[rgba(0,0,0,0.3)]'>
                Market cap:
                <span className='text-coin-cap'>${coin.marketCap.toFixed(2)}</span>
            </span>

            <span className='speedee text-white text-2xl flex justify-between mx-4 bg-[rgba(0,0,0,0.3)]'>
                Price:
                <span>
                    {percentage !== 0 && (
                        <span className={percentage > 0 ? 'text-green-500' : 'text-red-500'}>
                            {(percentage > 0 ? '+' : '') + percentage.toFixed(6)}%
                        </span>
                    )}
                    {percentage !== 0 && <span className='text-white'> - </span>}
                    <span className='text-coin-price'>${Math.round(coin.price * 100) / 100}</span>
                </span>
            </span>

            <button
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleFavourite(coin.id)
                }}
                className='speedee bg-primary-light p-4 text-white text-2xl rounded-2xl'
            >
                {isFavourite ? 'Unfavourite' : 'Favourite'}
            </button>
        </Link>
    )
}