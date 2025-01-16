import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const session = await userSession(event);

  const res = await useCustomFetch<string>("/user/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });
  await session.clear();

  return res;
});
