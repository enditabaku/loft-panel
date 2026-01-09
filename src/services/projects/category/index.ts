import AuthClient from "../../AuthClient"
import { API_ADMIN } from "@/constants/url"

const ProjectsCategoryService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/category`, {params}),
  createCategory: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}projects/category`, payload),
  updateCategory: (category_id: string, payload: any): AwaitStatusResponse<any> => AuthClient().patch(`${API_ADMIN}projects/category/${category_id}`, payload),
  deleteCategory: (category_id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}projects/category/${category_id}`),
  getDetails: (category_id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}projects/category/${category_id}`),
}
export default ProjectsCategoryService
