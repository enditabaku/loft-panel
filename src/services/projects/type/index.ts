import AuthClient from "../../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ProjectsTypeService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/type`, {params}),
  createType: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}projects/type`, payload),
  updateType: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().put(`${API_ADMIN}projects/type/${id}`, payload),
  deleteType: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}projects/type/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/type/${id}`),
}
export default ProjectsTypeService
