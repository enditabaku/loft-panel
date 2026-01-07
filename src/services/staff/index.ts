import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const StaffService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}staff`, { params }),
  addStaff: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}staff`, payload)
}
export default StaffService
