import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchProposal = {
  // 獲得列表
  getList: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/proposal', { params }, isUnLoad),
  // 獲得詳細
  get: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/proposal/details', { params }, isUnLoad),
  // 獲得購物車
  getCart: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/proposal/cart', { params }, isUnLoad),
  // 搜尋
  getSearch: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/proposal/search', { params }, isUnLoad)
}
