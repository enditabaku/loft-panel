import  secureLocalStorage  from  "react-secure-storage";

export const getAccessToken = async (): Promise<string | number | true | object> => {
  try {
    const token = await secureLocalStorage.getItem('@AccessToken')
    if (token) return token
    return ''
  } catch (e) {
    return ''
  }
}

export const setAccessToken = async (token: string | number | true | object): Promise<void> => {
  try {
    await secureLocalStorage.setItem('@AccessToken', token)
  } catch (e) {
    console.log(e)
  }
}

export const clearAccessToken = async (): Promise<void> => {
  try {
    const AT = await getAccessToken()
    if (AT) await secureLocalStorage.removeItem('@AccessToken')
  } catch (e) {
    console.log(e)
  }
}


export const getRefreshToken = async (): Promise<string> => {
  try {
    const token = await secureLocalStorage.getItem('@RefreshToken')
    if (token && typeof token === 'string'){
      return token
    }
    return ''
  } catch (e) {
    return ''
  }
}

export const setRefreshToken = async (token: string | number | true | object): Promise<void> => {
  try {
    await secureLocalStorage.setItem('@RefreshToken', token)
  } catch (e) {
    console.log(e)
  }
}

export const clearRefreshToken = async (): Promise<void> => {
  try {
    const RT = await getRefreshToken()
    if (RT) await secureLocalStorage.removeItem('@RefreshToken')
  } catch (e) {
    console.log(e)
  }
}
