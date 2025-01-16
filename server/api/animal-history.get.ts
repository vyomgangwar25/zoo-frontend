import { ref } from "vue";
import { AnimalHistory } from "~/types/AnimalHistory";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const animalId = ref(getQuery(event).animalId);

  const res = await $fetch<AnimalHistory>(
    `http://localhost:8080/animal/history/${animalId.value}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.data.jwtToken}`,
      },
    }
  );

  return res;
});
