import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ClientService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}client`, { params }),
  addClient: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}client`, payload)
}
export default ClientService
