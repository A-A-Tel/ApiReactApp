import { Route } from "wouter";
import Home from "@/pages/home";

export default function Routes() {
    return <>
        <Route path='/' children={<Home/>}/>
    </>
}