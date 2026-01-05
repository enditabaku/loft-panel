import AuthClient from "../AuthClient"
import { API_ADMIN } from "@/constants/url"

const MailSubscriptionService = {
  getList: (params: any): AwaitStatusResponse<any> => AuthClient().get(`${API_ADMIN}mails`, {params}),
}
export default MailSubscriptionService
