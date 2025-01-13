import { ref } from "vue";
import { jwtDecode } from "jwt-decode";
const newToken=ref("");
export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
  console.log("in sxtractData session.........");
  const refreshtoken = session.data.refreshToken;
    console.log("api hit");
    try {
      const data: any = await $fetch("http://localhost:8080/user/refreshtoken", {
        method: "POST",
        body: JSON.stringify({ token: refreshtoken }),
      });
      newToken.value=data;
      console.log(data);
    } catch (error) {
      console.error("Error in  validating the token:", error);
    }
   
  console.log(newToken.value)
  await session.update({
     
    jwtToken: newToken.value,
  });
return "ghg"
});
