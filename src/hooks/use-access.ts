import useRole from "./use-role";
import { Role } from "@/types/user/role";

const useAccess = () => {
    const { role } = useRole();

    return {
        admin: role === Role.Admin,
        support: role === Role.Support,
    }
}

export default useAccess;