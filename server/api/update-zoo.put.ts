import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const body = await readBody(event);
  const zooid = ref(getQuery(event).zooid);

  const res = await useCustomFetch<string>(`/zoo/update/${zooid.value}`, {
    method: "PUT",
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
