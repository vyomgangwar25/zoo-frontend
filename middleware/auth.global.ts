import { useRoleStore } from "~/store/useRoleStore";
import { RefreshTokenValidation } from "~/composable/useRefreshTokenValidation"; 

 const {validateToken}=RefreshTokenValidation();

export default defineNuxtRouteMiddleware(async (to, from) => {
  const roleStore = useRoleStore();
  const token: any = useCookie("SavedToken");

 
  if (token.value) {
    return await validateToken()
  }
     

  roleStore.closeDropDown();
  if (token.value && (to.path == "/login" || to.path == "/registration")) {
    return navigateTo("/Dashboard");
  } else if (
    !token.value &&
    (to.path == "/zoo/ZooData" || to.path == "/animal/AnimalData")
  ) {
    return navigateTo("/login");
  } else {
    return;
  }
});


