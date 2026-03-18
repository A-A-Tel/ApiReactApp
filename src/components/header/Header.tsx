import Logo from '@/assets/img/logo.png';
import {Link} from 'wouter';

export function Header() {
    return (
        <header
            className="speedee no-decor z-50 bg-primary-dark w-full h-[4vw] flex items-center justify-between pr-[1vw] pl-[1vw] sticky top-0">
            <img src={Logo} alt="logo" className='select-none h-[2.5vw]'/>
            <nav className='flex gap-8 text-2xl'>
                <Link href='/' children={<span className='text-white'>Home</span>}/>
                <Link href='/favourites' children={<span className='text-white'>Favourites</span>}/>
            </nav>
            <img src={Logo} alt="logo" className='select-none h-[2.5vw] invisible'/>
        </header>
    );
}