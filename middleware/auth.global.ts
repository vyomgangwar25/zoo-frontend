import { useRoleStore } from "~/store/useRoleStore";
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const roleStore = useRoleStore();
  const token: any = useCookie("SavedToken");
  if (token.value) {
    const decodeToken = jwtDecode(token.value);
    const currentTime = Date.now() / 1000;
    console.log("current", currentTime);

    const tokenExpirationTime: any = decodeToken.exp;
    console.log("expiration", tokenExpirationTime);
    const timetaken = tokenExpirationTime - 100;
    console.log(timetaken);

    const tokenValidationCheck = async () => {
      console.log("inside function...");
      try {
        const data = await $fetch("http://localhost:8080/user/refreshtoken", {
          method: "POST",
          body: JSON.stringify({ token: token.value }),
        });
        console.log(data);
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    if (currentTime >= timetaken) {
      console.log("token delete");
      await tokenValidationCheck();
      return;
    }
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


