import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const CampaignsService = {
  sendemail: (payload: any): AwaitStatusResponse<any> => AuthClient().post(`${API_ADMIN}campaign`, payload)
}
export default CampaignsService
