import fetch from 'isomorphic-fetch'
import { BASE_URL } from "../constant"

type ConfigType = {
    method?: string
    token?: string
    data?: any
}

const api = {
    callJson: async (url: string, {data, method = 'GET', token}: ConfigType = {} ) => {
        const _url = `${BASE_URL}${url}`
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        if(token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return fetch(_url, config).then(res => res.json())
    },
}
export default api