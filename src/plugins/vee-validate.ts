import { Field, Form, ErrorMessage,configure, defineRule,FieldContext  } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import {
  required, min, max, email
} from '@vee-validate/rules';
import { App } from 'vue';


interface MobileRuleParams {
  target: any; // 請根據您的需求更改這個類型
  ctx: FieldContext;
}

defineRule('required', required);
defineRule('min', min);

defineRule('confirmed', (value:string, [target]:any) => {
  if (value === target) {
    return true;
  }
  return '兩次密碼需一致';
});

defineRule('password', (value:string) => {
  if (required(value) && 
    min(value ,{ length: 8 }) &&
    max(value ,{ length: 20 })
  ){
    return true
  }
  return '密碼必須在 8 至 20 碼之間'
});

defineRule('email', email);

export function setupVeeValidate(AppInstance:App<Element>) {
  AppInstance.component('VField', Field);
  AppInstance.component('VForm', Form);
  AppInstance.component('ErrorMessage', ErrorMessage);
}

configure({
  generateMessage: localize({
    zh_TW,
  }),
});
setLocale('zh_TW');
