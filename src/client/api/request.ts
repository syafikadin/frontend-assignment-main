import axios, {type AxiosResponse} from 'axios'
import authConfig from '@/config/auth'
import {type JwtPayload, jwtDecode} from 'jwt-decode'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
    timeout: 30000
})

let refreshTokenPromise: Promise<AxiosResponse<RefreshTokenResponse, any>> | null = null

type Data = {
    access_token: string
    expires: number
    refresh_token: string
}

type RefreshTokenResponse = {
    data: Data
}

async function refreshToken() {
    return axios.post<RefreshTokenResponse>(
        `${process.env.NEXT_PUBLIC_REST_API_URL}/auth/refresh`,
        {
            refresh_token: localStorage.getItem(authConfig.refreshTokenKeyName),
            mode: 'json'
        },
        {
            timeout: 30000
        }
    )
}

api.interceptors.request.use(async config => {
    if (
        (config.url && ['/auth/login', '/auth/refresh', '/auth/logout'].includes(config.url)) ||
        !localStorage.getItem(authConfig.refreshTokenKeyName)
    ) {
        return config
    }

    const token = localStorage.getItem(authConfig.accessTokenKeyName)
    if (token) {
        type Payload = {
            id: string
            role: string
            app_access: boolean
            admin_access: boolean
        } & Pick<JwtPayload, 'iat' | 'exp' | 'iss'>

        const decoded = jwtDecode<Payload>(token)
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            if (!refreshTokenPromise) {
                refreshTokenPromise = refreshToken()
            }
        } else {
            config.headers.Authorization = `Bearer ${token}`

            return config
        }
    } else {
        refreshTokenPromise = refreshToken()
    }

    if (refreshTokenPromise) {
        try {
            const response = await refreshTokenPromise
            localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
            localStorage.setItem(authConfig.refreshTokenKeyName, response.data.data.refresh_token)
            refreshTokenPromise = null
            config.headers.Authorization = `Bearer ${response.data.data.access_token}`
        } catch {
        }
    }

    return config
})

export default api
