import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchProduct = {
  getProducts: (params?:any):Promise<ApiResponse> => http.httpGet('/proposal',{ params }),
}
