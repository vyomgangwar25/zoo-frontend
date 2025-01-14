import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

  const animalId = ref(getQuery(event).animalId);

  const res = await useCustomFetch<string>(`/animal/delete/${animalId.value}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
