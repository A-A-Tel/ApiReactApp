import type {CoinInfoData} from "@/types.ts";
import Markdown from 'react-markdown';

export function CoinInfo(coin: CoinInfoData ) {
    return (
        <div className='grid place-items-center mt-5'>
            <article className='flex-col w-270 h-fit bg-primary-light p-7 rounded-2xl text-white flex speedee'>
                <div className='flex h-50 justify-between mb-7'>
                    <img className='select-none h-50' src={coin.icon} alt="icon"/>
                    <div className='flex text-3xl flex-col mr-100 justify-center gap-10'>
                        <h2>Name: <span className='text-coin-name'>{coin.name}</span></h2>
                        <h2>Symbol: <span className='text-coin-symbol'>{coin.symbol}</span></h2>
                    </div>
                </div>
                <ul className='text-2xl '>
                    <li>
                        Launch date: {coin.launchDate.toLocaleString()}
                    </li>
                    <li>
                        24h change:
                        <span className={coin.dayChange > 0 ? 'text-green-500' : 'text-red-500'}>
                            {' ' + coin.dayChange.toFixed(6)}%
                        </span>
                    </li>
                    <li>
                        7d change:<span className={coin.weekChange > 0 ? 'text-green-500' : 'text-red-500'}>
                            {' ' + coin.weekChange.toFixed(6)}%
                        </span>
                    </li>
                    <li>
                        30d change:
                        <span className={coin.monthChange > 0 ? 'text-green-500' : 'text-red-500'}>
                            {' ' + coin.monthChange.toFixed(6)}%
                        </span>
                    </li>
                </ul>
                <div>
                    <p>
                        <Markdown>{coin.description}</Markdown>
                    </p>
                </div>
            </article>
        </div>
    )
}