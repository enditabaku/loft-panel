import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ProjectsListService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects`, {params}),
  addProject: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}projects`, payload),
  updateProject: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().patch(`${API_ADMIN}projects/${id}`, payload),
  deleteProject: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}projects/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/${id}`),
}
export default ProjectsListService
