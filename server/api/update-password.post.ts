import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await userSession(event);

  const res = await useCustomFetch<string>("/user/updatepassword", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
    body: JSON.stringify({
      oldpassword: body.oldpassword,
      newpassword: body.newpassword,
    }),
  });

  return res;
});
