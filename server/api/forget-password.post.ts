import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

  const res = await useCustomFetch<string>("/user/forgetpassword", {
    method: "POST",

    body: {
      email: body.email,
    },
  });

  return res;
});
