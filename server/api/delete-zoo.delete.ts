import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

  const zooid = ref(getQuery(event).deleteZooId);

  const res = await useCustomFetch<string>(`/zoo/delete/${zooid.value}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
