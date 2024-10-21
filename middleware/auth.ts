// middleware/auth.js

export default defineNuxtRouteMiddleware((to, from) => {
  const test = useCookie("SavedToken");
  if (test.value) {
    console.log("Token hit");
    return navigateTo("/Dashboard");
  }
  // console.log(process.client);
  //   const token = localStorage.getItem('SavedToken');
  //   if (token) {
  //     return navigateTo('/Dashboard');
  //   }
});
