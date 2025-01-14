import { User } from "~/types/UserData";
import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await useCustomFetch<User>("/user/login", {
    method: "POST",
    body: {
      email: body.email,
      password: body.password,
    },
  });

  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
    maxAge: 60 * 60 * 24 , 
  });

  await session.update({
    jwtToken: res.token,
    refreshToken: res.refreshToken,
  });

  return res;
});
