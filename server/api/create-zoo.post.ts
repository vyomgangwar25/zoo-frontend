import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const session = await userSession(event);
  const res = await useCustomFetch<string>("/zoo/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
    body: {
      name: body.name,
      location: body.location,
      size: body.size,
      description: body.description,
    },
  });

  return res;
});
