import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const BlogService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}blog`, {params}),
  addArticle: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}blog`, payload),
  updateArticle: (id: string, payload: any): AwaitStatusResponse<any> => AuthClient().patch(`${API_ADMIN}blog/${id}`, payload),
  deleteArticle: (id: string): AwaitStatusResponse<any> => AuthClient().delete(`${API_ADMIN}blog/${id}`),
  getDetails: (id: string): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}blog/${id}`),
}
export default BlogService
