import './index.css'

export type coinData = {
    name: string;
    symbol: string;
    price: string;
    icon: string;
};

export default function Coin({icon, name, price, symbol}:coinData) {

    return (
        <div className='coin flex items-center justify-between pl-4'>

                <img className='mx-auto rounded-full w-12 h-12 select-none' src={icon} alt="Crypto"/>
                <span className='speedee text-white text-2xl flex justify-between mx-12 bg-[rgba(0,0,0,0.3)]'>Name: <span className='text-coin-name'>{name}</span></span>
                <span className='speedee text-white text-2xl flex justify-between mx-12 bg-[rgba(0,0,0,0.3)]'>Symbol: <span className='text-coin-symbol'>{symbol}</span></span>
                <span className='speedee text-white text-2xl flex justify-between mx-12 bg-[rgba(0,0,0,0.3)]'>Price: <span className='text-coin-price'>&euro;{price}</span></span>
            <button className='speedee bg-primary-light p-4 text-white text-2xl rounded-2xl mr-20'>
                Favourite
            </button>
        </div>
    )
}