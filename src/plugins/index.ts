import { setupDayjs } from './dayjs';
import { setupGSAP } from './gsap';
import { setupSweetAlert } from './sweet-alert';
import { setupVeeValidate } from './vee-validate';
import { setDatePicker } from './DatePicker';
import { App } from 'vue';
// import './vee-validate';

export function setupPlugins(AppInstance:App<Element>) {
  setDatePicker(AppInstance)
  setupVeeValidate(AppInstance)
  setupGSAP(AppInstance);
  setupSweetAlert(AppInstance);
  setupDayjs(AppInstance);
}