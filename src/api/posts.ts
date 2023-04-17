import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

// const api = {
//   // typeScript 設定必帶參數，1 網址、2 Axios 相關 header
//   getPosts: (params?:any) => http.httpGet('/posts',{ params }),
//   createPosts: (data?:any) => http.httpPost('/posts',data),
// }


export const fetchPost = {
  getPosts: (params?:any):Promise<ApiResponse> => http.httpGet('/posts',{ params }),
  createPosts: (data?:any):Promise<ApiResponse> => http.httpPost('/posts',data)
}
