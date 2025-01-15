import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const key = getQuery(event).token;
  console.log(key);

  const res = await useCustomFetch<string>("/user/setnewpassword", {
    method: "POST",
    params: {
      tokenKey: key,
    },

    body: {
      newpassword: body.newpassword,
    },
  });

  return res;
});
