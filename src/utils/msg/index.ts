import { Swal } from '@/plugins/sweet-alert'

export function errorMsg(msg:string) {
  Swal.fire({
    icon: 'error',
    text: msg,
    showConfirmButton: true,
    confirmButtonColor: '#2378BF',
    confirmButtonText: '確定'
  })
}
