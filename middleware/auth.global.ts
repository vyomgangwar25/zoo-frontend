 
import { useRoleStore } from "~/store/useRoleStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const roleStore=useRoleStore();
  const token = useCookie("SavedToken");
  roleStore.closeDropDown();
  if (token.value && (to.path == '/login' || to.path == "/registration")) {
    return navigateTo("/Dashboard");
  }
  else if(!token.value && (to.path=='/zoo/ExtractZooData' || to.path=='/Animal/ExtractAnimalData') ){
    return navigateTo('/login')
  } else {
    return;
  }
 
});
