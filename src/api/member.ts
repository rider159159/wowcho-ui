import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchMember = {
  getMemberInfo: (params?:any):Promise<ApiResponse> => http.httpGet('/api/memberInfo',{ params }),
  // 註冊
  signup:(data?:any):Promise<ApiResponse> => http.httpPost('/sign-up',data),
  // 登入
  login: (data?:any):Promise<ApiResponse> => http.httpPost('/login',data),
  // 取得帳戶資料
  getProfile: (params?:any):Promise<ApiResponse> => http.httpGet('/general/profile',{ params }),
  // 更新帳戶資料
  editProfile: (data?:any):Promise<ApiResponse> => http.httpPatch('/general/profile',data),
}

