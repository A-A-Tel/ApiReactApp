import {useParams, useLocation} from 'wouter';
import {useState, useEffect} from 'react'
import type {CoinInfoData} from "@/types.ts";
import {Header} from "@/components/header";
import {CoinInfo} from "@/components/coin-info";

type infoParams = {
    id: string
}

export function Info() {
    const params = useParams<infoParams>();
    const [, setLocation] = useLocation();
    const [coin, setCoin] = useState<CoinInfoData | undefined>();

    const coinId = Number.parseInt(params.id)

    if (Number.isNaN(coinId)) {
        setLocation('/');
    }

    useEffect(() => {
            const fetchCoins = () => {
                fetch('https://data-api.coindesk.com/asset/v2/metadata' +
                    '?assets=' + coinId +
                    '&asset_lookup_priority=ID' +
                    '&asset_language=en-US'
                )
                    .then(r => r.json())
                    .then(jsonResponse => jsonResponse.Data[coinId])
                    .then(data => {
                        setCoin(prevCoin => {

                            const previousPrice =
                                prevCoin?.price
                                ?? data.PRICE_USD;

                            return {
                                id: data.ID,
                                name: data.NAME,
                                symbol: data.SYMBOL,
                                price: data.PRICE_USD,
                                oldPrice: previousPrice,
                                icon: data.LOGO_URL,
                                marketCap: data.TOTAL_MKT_CAP_USD,
                                description: data.ASSET_DESCRIPTION,
                                launchDate: new Date(data.LAUNCH_DATE * 1000),
                                dayChange: data.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
                                weekChange: data.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD,
                                monthChange: data.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD,
                            };
                        });
                    })
            };

            fetchCoins();

            const interval = setInterval(fetchCoins, 3000);

            return () => clearInterval(interval);
        }, [coinId]
    );


    return (
        <>
            <Header/>
            {coin && <CoinInfo id={coin.id} name={coin.name} symbol={coin.symbol} price={coin.price}
                               oldPrice={coin.oldPrice} icon={coin.icon} marketCap={coin.marketCap}
                               launchDate={coin.launchDate} description={coin.description}
                               dayChange={coin.dayChange} weekChange={coin.weekChange}
                               monthChange={coin.monthChange}/>}
        </>
    )
}