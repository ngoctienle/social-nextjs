import fetch from 'isomorphic-fetch'
import { BASE_URL } from "../constant"

type ConfigType = {
    method?: string,
    data?: any
}

const api = {
    callJson: async (url: string, {data, method = 'GET'}: ConfigType = {} ) => {
        const _url = `${BASE_URL}${url}`
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(_url, config).then(res => res.json())
    },
}
export default api