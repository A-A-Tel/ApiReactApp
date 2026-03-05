import Coin from "@/components/coin";
import type { ReactElement } from 'react';

export default function CoinPrinter({coins}: { coins: { name: string, symbol: string, price: string, icon: string }[] }) {

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