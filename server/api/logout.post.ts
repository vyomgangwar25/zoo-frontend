import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
  const res = await useCustomFetch <string>("/user/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });
  await session.clear();

  return res;
});
