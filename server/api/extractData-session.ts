import { ref } from "vue";
import userSession from "../util/user-session";

const newToken = ref("");
export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const refreshtoken = session.data.refreshToken;

  try {
    const data: any = await $fetch("http://localhost:8080/user/refreshtoken", {
      method: "POST",
      body: JSON.stringify({ token: refreshtoken }),
    });
    // if (data.response.statusCode === '500') {
    //   console.log("status")
    //   return false;
    // }
    newToken.value = data;
  } catch (error) {
    console.error("Error in  validating the token:", error);
    await session.clear();
    return false;
  }

  await session.update({
    jwtToken: newToken.value,
  });
  return "abc";
});
