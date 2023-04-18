import Cookies from 'js-cookie';
// role = wowcho 贊助 、 wowchoAdmin
// const TokenKey = 'wowcho';

export function GET_TOKEN(role:string = 'wowcho') {
  return Cookies.get(role);
}

const inFifteenMinutes = new Date(new Date().getTime() + 480 * 60 * 1000);
export function SET_TOKEN(token:string, role:string = 'wowcho') {
  return Cookies.set(role, token, {
    expires: inFifteenMinutes,
  });
}

export function REMOVE_TOKEN(role:string = 'wowcho') {
  return Cookies.remove(role);
}
