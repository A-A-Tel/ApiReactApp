import Coin from "@/components/coin";
import type { ReactElement } from 'react';
import type {coinData} from "@/components/coin/Coin.tsx";

export default function CoinPrinter({coins}: { coins: coinData[] }) {

    const coinElements: ReactElement[] = [];

    for (const coin of coins) {
        coinElements.push(<Coin icon={coin.icon} name={coin.name} price={coin.price} symbol={coin.symbol}/>);
    }

    return (
        <div className='mt-6 flex flex-col gap-5'>
            {coinElements}
        </div>
    )
}