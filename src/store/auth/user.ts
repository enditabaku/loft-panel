import secureLocalStorage from "react-secure-storage";
import { Role } from "@/types/user/role";
import { UserType } from "@/types/user/user";

const USER = '@User'

export const setUserInStorage = async (user: UserType) => {
  try {
    await secureLocalStorage.setItem(USER, JSON.stringify(user))
  } catch (e) {
    console.log(e)
  }
}

export const getUserFromStorage = async () => {
  try {
    const user = await secureLocalStorage.getItem(USER)
    if (user && typeof user === 'string') {
      return JSON.parse(user)
    }
    return ''
  } catch (e) {
    console.log(e)
  }
}

export const clearUserFromStorage = async () => {
  try {
    const user = await getUserFromStorage()
    if (user) await secureLocalStorage.removeItem(USER)
  } catch (e) {
    console.log(e)
  }
}

export const setCurrentRole = async (role: Role | null) => {
  try {
    const user = await getUserFromStorage()
    if (user){
      await setUserInStorage({ ...user, profile: role ?? user.profile})
    }
  } catch (e) {
    console.log(e)
  }
}

export const getCurrentRole = async () => {
  try {
    const user = await getUserFromStorage()
    if (user) return user.profile
    return null
  } catch (_) {
    return null
  }
}
