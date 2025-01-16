import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const session = await userSession(event);

  const res = await useCustomFetch<string>("/animal/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
    body: {
      name: body.name,
      gender: body.gender,
      dob: body.dob,
      zooid: body.zooid,
    },
  });

  return res;
});
