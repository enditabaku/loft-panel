import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const MailSubscriptionService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}email-subscriptions`, {params}),
}
export default MailSubscriptionService
