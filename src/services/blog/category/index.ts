import AuthClient from "../../AuthClient"
import { API_ADMIN } from "@/constants/url"

const BlogCategoryService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}blog/category`, {params}),
  createCategory: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}blog/category`, payload),
  updateCategory: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().put(`${API_ADMIN}blog/category/${id}`, payload),
  deleteCategory: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}blog/category/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}blog/category/${id}`),
}
export default BlogCategoryService
