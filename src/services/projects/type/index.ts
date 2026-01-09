import AuthClient from "../../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ProjectsTypeService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/type`, {params}),
  createType: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}projects/type`, payload),
  updateType: (type_id: string, payload: any): AwaitStatusResponse<any> => AuthClient().patch(`${API_ADMIN}projects/type/${type_id}`, payload),
  deleteType: (type_id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}projects/type/${type_id}`),
  getDetails: (type_id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/type/${type_id}`),
}
export default ProjectsTypeService
