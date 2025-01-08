import { jwtDecode } from "jwt-decode";

export function RefreshTokenValidation() {
  const validateToken = async () => {
    const token: any = useCookie("SavedToken");
    const refreshtoken: any = useCookie("RefreshToken");
    if (token.value) {

      const decodeToken = jwtDecode(token.value);
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpirationTime: any= decodeToken.exp;

      const timetaken = tokenExpirationTime - 200;

      const tokenValidationCheck = async () => {
        try {
          const data = await $fetch("http://localhost:8080/user/refreshtoken", {
            method: "POST",
            body: JSON.stringify({ token: refreshtoken.value }),
          });
          //console.log(data);
          token.value = data;
        } catch (error) {
          token.value = "";
          refreshtoken.value = "";
          console.error("Error validating token:", error);
        }
      };
      if (currentTime >= timetaken) {
        await tokenValidationCheck();
        return;
      }
    }
  };
  return { validateToken };
}
