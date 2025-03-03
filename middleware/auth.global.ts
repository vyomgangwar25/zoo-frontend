import { useRoleStore } from "~/store/useRoleStore";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const roleStore = useRoleStore();
  roleStore.closeDropDown();

  const flag: any = useCookie("flag");
  const cookie: any = useCookie("h3");
  if (!flag.value) {
    navigateTo("/login");
  }
  try {
    if (flag.value) {
      const data: any = await $fetch("/api/user-session", {
        method: "GET",
      });

      if (data) {
        const currentTime = Math.floor(Date.now() / 1000);
        const tokenExpirationTime: any = data.exp;
        const timetaken = tokenExpirationTime;
        if (currentTime >= timetaken) {
          const res = await $fetch("/api/extractData-session");
          if (res == false) {
            flag.value = "";
            cookie.value = "";

            return navigateTo("/login");
          }
        }
      }
    }
  } catch (err) {
    console.log("error in jwtToken", err);
    navigateTo("/login");
  }

  if (flag.value && (to.path == "/login" || to.path == "/registration")) {
    return navigateTo("/Dashboard");
  } else if (
    !flag.value &&
    (to.path == "/zoo/ZooData" || to.path == "/animal/AnimalData")
  ) {
    return navigateTo("/login");
  } else {
    return;
  }
});
