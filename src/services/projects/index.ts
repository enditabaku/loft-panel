import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ProjectsListService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects`, {params}),
  addProject: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}projects`, payload),
  updateProject: (slug: string, payload: any): AwaitStatusResponse<any> => AuthClient().patch(`${API_ADMIN}projects/${slug}`, payload),
  deleteProject: (slug: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}projects/${slug}`),
  getDetails: (slug: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/${slug}`),
}
export default ProjectsListService
