import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchSponsors = {
  create: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPost('/sponsors/createOrder', data, isUnLoad)
}
