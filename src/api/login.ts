import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchLogin = {
  login: (data?:any):Promise<ApiResponse> => http.httpPost('/api/login',data)
}
