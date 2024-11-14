import { defineRule } from 'vee-validate';
import { all } from '@vee-validate/rules';
export default defineNuxtPlugin(() => {

  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
  });
  
  // defineRule("alphaOnly", (value:any) => {
  //   const regex = /^[A-Za-z]*$/;
  //   return regex.test(value) || "Only alphabetic characters are allowed";
  // });
});

