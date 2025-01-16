import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
 const session=await userSession(event);
  const body = await readBody(event);

  const userId = ref(getQuery(event).id);

  const res = await useCustomFetch<string>(`/user/update/${userId.value}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
    body: {
      name: body.name,
      email: body.email,
    },
  });

  return res;
});
