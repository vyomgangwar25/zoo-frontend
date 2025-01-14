import { ref } from "vue";
import { AnimalHistory } from "~/types/AnimalHistory";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

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
