 
import { User } from "~/types/UserData";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

   
  const res = await $fetch<User> ("http://localhost:8080/user/login", {
    method: "POST",
    body: {
      email: body.email,
      password: body.password,
    },
  });
   
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

   
    await session.update({
      jwtToken:res.token,
      refreshToken:res.refreshToken  
    })

  return res;
});
