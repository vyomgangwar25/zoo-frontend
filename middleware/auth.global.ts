import { useRoleStore } from "~/store/useRoleStore";
import { RefreshTokenValidation } from "~/composable/useRefreshTokenValidation";

 

export default defineNuxtRouteMiddleware(async (to, from) => {
  const roleStore = useRoleStore();
  roleStore.closeDropDown();
  //const token: any = useCookie("SavedToken");
  const tokenData=ref("")
const data:any=await $fetch("/api/user-session",{
  method:"GET"
})
const token: any = useCookie("h3");
if(data)
{
  tokenData.value=data.exp;
  const currentTime = Math.floor(Date.now() / 1000);
 const tokenExpirationTime: any = data?.exp;
 const timetaken = tokenExpirationTime - 200; 
 if (currentTime >= timetaken) {
   console.log("not expired");
   
   await $fetch("/api/extractData-session");
   return;
 }
}


  // if (tokenData.value && (to.path == "/login" || to.path == "/registration")) {
  //   return navigateTo("/Dashboard");
  // } else if (
  //   !tokenData.value &&
  //   (to.path == "/zoo/ZooData" || to.path == "/animal/AnimalData")
  // ) {
  //   return navigateTo("/login");
  // } else {
  //   return;
  // }
});
