import { defineRule } from 'vee-validate';

export default defineNuxtPlugin((nuxtApp) => {
   
  defineRule('minLength', (value:any, [limit]:any) => {
    if (!value || !value.length) {
      return true;  
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`;
    }
    return true;  
  });

 
  defineRule('email', (value:any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!value) {
      return true;  
    }
    return emailPattern.test(value) || 'Invalid email address'; 
  });
});

