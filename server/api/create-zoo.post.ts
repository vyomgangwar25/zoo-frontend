import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log(body, "HELLO");

  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

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
