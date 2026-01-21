import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const PartnersService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}partners`, { params }),
  addPartner: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}partners`, payload),
  editPartner: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().put(`${API_ADMIN}partners/${id}`, payload),
  deletePartner: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}partners/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}partners/${id}`),
}
export default PartnersService
