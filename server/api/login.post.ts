import { User } from "~/types/UserData";
import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";
import { ref } from "vue";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = ref<User>();

  const res = await useCustomFetch<User>("/user/login", {
    method: "POST",
    body: {
      email: body.email,
      password: body.password,
    },
  });
  response.value = res;

  // const use_session = async (event: any) => {
  //   const session = await useSession(event, {
  //     password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  //     maxAge: 60 * 60 * 24,
  //   });
  //   return session;
  // };

  // const session = await use_session(event);
  const session = await userSession(event);

  await session.update({
    jwtToken: res.token,
    refreshToken: res.refreshToken,
  });
 
  return res;
});
