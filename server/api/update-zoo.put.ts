import { ref } from "vue";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
  const body = await readBody(event);
  const zooid = ref(getQuery(event).zooid);

  const res = await $fetch<string>(
    `http://localhost:8080/zoo/update/${zooid.value}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.data.jwtToken}`,
      },

      body: {
        name: body.name,
        location: body.location,
        size: body.size,
        description: body.description,
      },
    }
  );

  return res;
});