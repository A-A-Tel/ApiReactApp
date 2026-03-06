import { Route } from "wouter";
import {Home} from "@/pages/home";

export function Routes() {
    return <>
        <Route path='/' children={<Home/>}/>
    </>
}