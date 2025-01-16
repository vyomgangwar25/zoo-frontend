import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await useCustomFetch<string>("/user/forgetpassword", {
    method: "POST",

    body: {
      email: body.email,
    },
  });

  return res;
});
