import Cookies from 'js-cookie'

const TokenKey = 'wowcho'

export function GET_TOKEN() {
  return Cookies.get(TokenKey)
}

const inSevenDays = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
export function SET_TOKEN(token:any) {
  return Cookies.set(TokenKey, token, {
    expires: inSevenDays
  })
}

export function REMOVE_TOKEN() {
  return Cookies.remove(TokenKey)
}
