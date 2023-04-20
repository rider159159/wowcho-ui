import { App } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

export function setDatePicker(AppInstance:App<Element>) {
  AppInstance.component('VueDatePicker', VueDatePicker)
}
