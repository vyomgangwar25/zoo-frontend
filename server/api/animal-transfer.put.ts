import { ref } from "vue";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const session = await userSession(event);

  const animalId = ref(getQuery(event).animalid);
  const zooid = ref(getQuery(event).zooid);
  //console.log(animalId.value)

  const res = await $fetch<string>(`http://localhost:8080/animal/transfer`, {
    method: "PUT",
    query: {
      animalid: animalId.value,
      zooid: zooid.value,
    },
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
