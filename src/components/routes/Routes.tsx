import { Route, Redirect} from "wouter";
import {Home} from "@/pages/home";
import {Favourites} from "@/pages/favourites";
import {Info} from "@/pages/info";

export function Routes() {
    return <>
        <Route path='/' children={<Home/>}/>
        <Route path='/favourites' children={<Favourites/>}/>
        <Route path={'/info'} children={<Redirect to="/" />}></Route>
        <Route path={'/info/:id'} children={<Info/>}></Route>
    </>
}