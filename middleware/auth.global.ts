 
import { useRoleStore } from "~/store/useRoleStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const roleStore=useRoleStore();
  const test = useCookie("SavedToken");
  roleStore.closeDropDown();
  if (test.value && (to.path == '/login' || to.path == "/registration")) {
    return navigateTo("/Dashboard");
  } else {
    return;
  }
 
});
