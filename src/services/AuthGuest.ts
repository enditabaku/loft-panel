import axios, { AxiosInstance } from 'axios'

import { BASE_URL } from '@/constants/url'

const options = {
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: '' },
}

const axiosInstance = axios.create(options)


export default (): AxiosInstance => {

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      return Promise.reject(error)
    },
  )
  return axiosInstance
}
