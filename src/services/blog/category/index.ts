import AuthClient from "../../AuthClient"
import { API_ADMIN } from "@/constants/url"

const BlogCategoryService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}blog/category`, {params}),
  createCategory: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}blog/category`, payload),
  updateCategory: (type_id: string, payload: any): AwaitStatusResponse<any> => AuthClient().patch(`${API_ADMIN}blog/category/${type_id}`, payload),
  deleteCategory: (type_id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}blog/category/${type_id}`),
  getDetails: (type_id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}blog/category/${type_id}`),
}
export default BlogCategoryService
