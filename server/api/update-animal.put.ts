import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const body = await readBody(event);
  const animalId = ref(getQuery(event).AnimalId);
  //console.log(animalId.value)

  const res = await useCustomFetch<string>(`/animal/update/${animalId.value}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },

    body: {
      name: body.name,
      gender: body.gender,
    },
  });

  return res;
});
