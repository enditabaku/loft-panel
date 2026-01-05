import AuthGuest from "../AuthGuest"
import AuthClient from "../AuthClient"
import { API_PUBLIC } from "@/constants/url"

const AuthService = {
  login: (payload: any): AwaitStatusResponse<any> => AuthGuest().post(`${API_PUBLIC}login`, payload),
  refreshToken: (payload: any) => AuthClient().post(`${API_PUBLIC}token/refresh`, payload),
  logout: (): AwaitStatusResponse<unknown> => AuthClient().post(`${API_PUBLIC}logout`, {}),
  sendPasswordOtp: (payload: any) => AuthGuest().post(`${API_PUBLIC}otp/request`, payload),
  validateOtp: (payload: any) => AuthGuest().post(`${API_PUBLIC}otp/validate`, payload),
  resetPassword: (payload: any) => AuthGuest().post(`${API_PUBLIC}reset-password`, payload),
}
export default AuthService
