import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchSponsor = {
  create: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPost('/sponsors/createOrder', data, isUnLoad),
  // 獲得單一詳細
  get: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/sponsors/details', { params }, isUnLoad),
  // 獲得列表
  getList: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/sponsors', { params }, isUnLoad)
}
