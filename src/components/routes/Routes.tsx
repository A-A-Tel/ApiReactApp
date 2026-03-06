import { Route } from "wouter";
import {Home} from "@/pages/home";
import {Favourites} from "@/pages/favourites";

export function Routes() {
    return <>
        <Route path='/' children={<Home/>}/>
        <Route path='/favourites' children={<Favourites/>}/>
    </>
}