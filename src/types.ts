export type CoinData = {
    id: number
    name: string;
    symbol: string;
    price: number;
    oldPrice: number
    icon: string;
    marketCap: number;
};

export type CoinInfoData = CoinData & {
    launchDate: Date;
    description: string;
    dayChange: number;
    weekChange: number;
    monthChange: number;
}