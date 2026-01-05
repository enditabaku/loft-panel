import axios, { AxiosInstance } from 'axios'
import { getAccessToken } from '@/store/auth/token'
import AuthService from './auth'
import { setAccessToken, setRefreshToken, clearAccessToken, clearRefreshToken } from '@/store/auth/token'
import { clearUserFromStorage } from '@/store/auth/user'
import secureLocalStorage from 'react-secure-storage'
import { BASE_URL } from '@/constants/url'

const options = {
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: '' },
}

const axiosInstance = axios.create(options)

axiosInstance.interceptors.request.use(async config => {
  try { 
    const accessToken = await getAccessToken()
    config.headers = { ...config.headers, Authorization: `Bearer ${accessToken || ''}` } as any
  } catch (err) {
    console.log(err)
  }
  return config
})

export default (): AxiosInstance => {

  const refreshToken = secureLocalStorage.getItem('@RefreshToken')

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (error?.response?.status !== 401) return Promise.reject(error)
        else{
          try {
            const { data } = await AuthService.refreshToken({refresh_token: `${refreshToken}`});
            if (data) {
              await setAccessToken(data?.data?.authorization?.access_token)
              await setRefreshToken(data?.data?.authorization?.refresh_token)
            }
            error.config.headers.Authorization = `Bearer ${data?.data?.authorization?.access_token}`
  
            return axios(error.config)
          } catch (e) {
            await clearAccessToken();
            await clearRefreshToken();
            await clearUserFromStorage();
            window?.location.replace('/auth/login');
            return Promise.reject(e)
          }
        }
    },
  )
  return axiosInstance
}
