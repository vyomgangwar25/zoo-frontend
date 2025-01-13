import { ref } from "vue";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
  const body = await readBody(event);
  const animalId = ref(getQuery(event).AnimalId);
  //console.log(animalId.value)

  const res = await $fetch<string>(
    `http://localhost:8080/animal/update/${animalId.value}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.data.jwtToken}`,
      },

      body: {
        name: body.name,
        gender: body.gender,
      },
    }
  );

  return res;
});
