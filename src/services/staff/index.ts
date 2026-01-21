import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const StaffService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}staff`, { params }),
  addStaff: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}staff`, payload),
  editStaff: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().put(`${API_ADMIN}staff/${id}`, payload),
  deleteStaff: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}staff/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}staff/${id}`),
}
export default StaffService
