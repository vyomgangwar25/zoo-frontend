import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getQuery(event).token;

  const res = await useCustomFetch<string>("/user/setnewpassword", {
    method: "POST",
    headers: {
      Authorization2: `Bearer ${token}`,
    },

    body: {
      newpassword: body.newpassword,
    },
  });

  return res;
});
