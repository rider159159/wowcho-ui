import { Swal } from '@/plugins/sweet-alert';

export function errorMsg(msg:string) {
  Swal.fire({
    icon: 'error',
    text: msg,
    showConfirmButton: true,
    confirmButtonText: '確定',
  });
}
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})