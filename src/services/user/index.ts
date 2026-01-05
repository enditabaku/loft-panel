import AuthClient from "../AuthClient"
import { API_PUBLIC } from "@/constants/url"

const UserService = {
  userInformation: (): AwaitStatusResponse<any> => AuthClient().get(`${API_PUBLIC}user`),
  updatePassword: (payload: any): AwaitStatusResponse<any> => AuthClient().put(`${API_PUBLIC}password`, payload)
}
export default UserService
