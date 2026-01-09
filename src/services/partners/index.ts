import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const PartnersService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}partner`, { params }),
  addPartner: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}partner`, payload)
}
export default PartnersService
