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
                <div>
                    <p>
                        <Markdown>{coin.description}</Markdown>
                    </p>
                </div>
            </article>
        </div>
    )
}