import React from "react";
import { parseJwt } from ".";
import { useGlobalState } from "../states";
import {useRouter} from "next/router"

const useAuthen = () => {
    const router = useRouter()
    const [token] = useGlobalState("token")

    React.useEffect(() => {
        const userToken = parseJwt(token)
        if(!(userToken && userToken.id && userToken.email)){
            router.push("/login")  
        }
    }, [token])
}

const useNotAuthen = () => {
    const router = useRouter()
    const [token] = useGlobalState("token")

    React.useEffect(() => {
        const userToken = parseJwt(token)
        if(userToken && userToken.id && userToken.email){
            router.push("/")  
        }
    }, [token])
}

export {useAuthen, useNotAuthen}