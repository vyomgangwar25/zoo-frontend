import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const zooid = ref(getQuery(event).deleteZooId);

  const res = await useCustomFetch<string>(`/zoo/delete/${zooid.value}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
