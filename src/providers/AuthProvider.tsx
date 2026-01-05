import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Role } from '@/types/user/role';
import useRole from '@/hooks/use-role';
import accountReducer from '@/store/accountReducer';
import { getUserFromStorage, setUserInStorage, clearUserFromStorage } from '../store/auth/user';
import { setAccessToken, setRefreshToken, clearAccessToken, clearRefreshToken  } from '../store/auth/token';
import AuthService from '@/services/auth';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export const AuthContext = createContext<any>(null)

const AuthProvider = ({ children }: any) => {
//   const {showAlert} = useAlert()
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const [token, setToken] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(true);
  const { setRole } = useRole();

  useEffect(() => {
    handleAuthorization();
  }, [dispatch, isSigningIn]);

  const handleAuthorization = async () => {
    const findUser = await getUserFromStorage();
    if (findUser) {
      dispatch({
        type: 'LOGIN',
        payload: {
          isLoggedIn: true,
          user: {
            ...findUser
          }
        }
      })
    }
    else {
      dispatch({
        type: 'LOGOUT'
      })
    }
  }
  
  const checkRoles = (role: string ) => {
    const validRmsRoles = ['admin', 'support'];
    return validRmsRoles.includes(role);
  };

  const signIn = async (email: string, password: string) => {
    setIsSigningIn(true)
    try {
      const { data } = await AuthService.login({ email, password })
      if (data.data.authorization) {
        if(!checkRoles(data.data.user.profile) || data?.data?.user?.permissions?.length == 0){
          const { access_token } = data.data.authorization
          await setAccessToken(access_token)
          forceLogout()
          return {
            success: false,
            message: "You don't have access for dashboard"
          }
        }
        
        const { access_token, refresh_token } = data.data.authorization
        const user = data.data.user
        await setAccessToken(access_token)
        await setRefreshToken(refresh_token)
        await setUserInStorage(user)
        
        setToken(access_token)
        switch (user?.profile){
          case "admin":
            setRole(Role.Admin)
            break;
          case "support":
            setRole(Role.Support)
            break;
          default:
            setRole(null)
            break;
        }
        return {
          success: true,
          user: user
        }
      }
    } catch (error: any) {
      if (error?.response?.data.errors){
        return error?.response?.data.errors
      }
      if (error) return error?.response?.data
    } finally {
      setIsSigningIn(false)
    }
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const forceLogout = async () => {
    try {
      await AuthService.logout()
    } catch(error: any){
      console.log(error)
    } finally{
      await clearAccessToken()
      await clearRefreshToken()
      await clearUserFromStorage();
      setToken(null)
      dispatch({
        type: 'LOGOUT'
      })
      setIsSigningIn(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        forceLogout,
      }}
      >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
