import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const WebsiteService = {
  // Get list of groups/folders
  getPageGroups: (params: any): AwaitStatusResponse<unknown> => AuthClient().get(`${API_ADMIN}website/group`, {params}),
  // Create Page Group
  createPageGroup: (params: any): AwaitStatusResponse<unknown> => AuthClient().post(`${API_ADMIN}website/group`, params),
  // Delete page group
  deletePageGroup: (id: string): AwaitStatusResponse<unknown> => AuthClient().delete(`${API_ADMIN}website/group/${id}`),
  // Get website pages
  getPages: (params: any): AwaitStatusResponse<unknown> => AuthClient().get(`${API_ADMIN}website/group/pages`, {params}),
  // Delete website page
  deletePage: (id: string): AwaitStatusResponse<unknown> => AuthClient().delete(`${API_ADMIN}website/group/pages/${id}`),
  // Create Page
  createPage: (params: any): AwaitStatusResponse<unknown> => AuthClient().post(`${API_ADMIN}website/group/pages`, params),
  // Get website page
  getPage: (id: any): AwaitStatusResponse<unknown> => AuthClient().get(`${API_ADMIN}website/group/pages/${id}`),
  // Update Page
  updatePage: (params: any, id: string): AwaitStatusResponse<unknown> => AuthClient().patch(`${API_ADMIN}website/group/pages/${id}`, params),
}

export default WebsiteService
