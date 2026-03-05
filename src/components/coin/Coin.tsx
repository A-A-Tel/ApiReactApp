import './index.css'

export default function Coin({icon, name, price, symbol}:{icon: string, name: string, price: string, symbol: string}) {

    return (
        <div className='coin flex items-center justify-between pl-4'>
            <div className='flex gap-[3vw] items-center pl-4 speedee text-white text-2xl'>

                <img className='w-12 select-none' src={icon} alt="Crypto"/>
                <span>{name}</span>
                <span>{symbol}</span>
                <span>&euro; {price}</span>
            </div>
            <button className='speedee bg-primary-light p-4 text-white text-2xl rounded-2xl mr-20'>
                Favourite
            </button>
        </div>
    )
}