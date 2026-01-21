import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ClientService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}clients`, { params }),
  addClient: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}clients`, payload),
  editClient: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().put(`${API_ADMIN}clients/${id}`, payload),
  deleteClient: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}clients/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}clients/${id}`),
}
export default ClientService
