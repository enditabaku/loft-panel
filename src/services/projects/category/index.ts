import AuthClient from "../../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ProjectsCategoryService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/category`, {params}),
  createCategory: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}projects/category`, payload),
  updateCategory: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().patch(`${API_ADMIN}projects/category/${id}`, payload),
  deleteCategory: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}projects/category/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/category/${id}`),
}
export default ProjectsCategoryService
