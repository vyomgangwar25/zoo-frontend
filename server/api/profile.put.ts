import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
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
