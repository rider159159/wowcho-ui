import { Field, useForm } from 'vee-validate'
export interface login_interface {
  email: string,
  password: string,
  role?: number
  confirmPassword?:string
}