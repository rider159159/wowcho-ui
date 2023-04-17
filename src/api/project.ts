import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

// const api = {
//   // typeScript 設定必帶參數，1 網址、2 Axios 相關 header
//   getProjectAll: (params?:any):Promise<ApiResponse> => http.httpGet('/api/projectList',{ params }),
// }


export const fetchProject = {
  getProjectAll: (params?:any):Promise<ApiResponse> => http.httpGet('/api/projectList',{ params }),
}