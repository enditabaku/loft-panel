import React, { createContext, useState, useEffect, useCallback } from 'react'
import { setCurrentRole, getCurrentRole } from '../store/auth/user';
import { Role } from '@/types/user/role';

export const RoleContext = createContext<any>(null)

const RoleProvider = ({ children }: any) => {
  const [role, setRole] = useState<Role | null>(null)

  const checkCurrentRole = useCallback(async () => {
    const role =  await getCurrentRole()
    if (role) {
      await setCurrentRole(role)
      await setRole(role)
    } else {
      await setCurrentRole(null)
      await setRole(null)
    }
  }, [])

  useEffect(() => {
    checkCurrentRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        checkCurrentRole
      }}>
      {children}
    </RoleContext.Provider>
  )
}

export default RoleProvider
