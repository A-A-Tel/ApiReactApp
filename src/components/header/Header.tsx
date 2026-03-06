import Logo from '@/assets/img/logo.png';

export function Header() {
    return (
        <header
            className="bg-primary-dark w-full h-[4vw] flex items-center justify-between pr-[1vw] pl-[1vw] sticky top-0">
            <img src={Logo} alt="logo" className='select-none h-[2.5vw]'/>
            <nav className='flex gap-8 text-2xl'>
                <button className='text-white'>Home</button>
                <button className='text-white'>Favourites</button>
            </nav>
            <img src={Logo} alt="logo" className='select-none h-[2.5vw] invisible'/>
        </header>
    );
}