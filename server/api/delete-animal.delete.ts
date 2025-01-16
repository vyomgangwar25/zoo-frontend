import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
  const session = await userSession(event);

  const animalId = ref(getQuery(event).animalId);

  const res = await useCustomFetch<string>(`/animal/delete/${animalId.value}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
