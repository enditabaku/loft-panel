import { useContext } from 'react'
import { RoleContext } from '../providers/RoleProvider'

// ==============================|| ROLE  ||============================== //

export default () => {
    const contextValue = useContext(RoleContext)

    if (!contextValue) throw new Error('Please make sure your component tree is wrapped with FirebaseProvider component')

    return contextValue
}