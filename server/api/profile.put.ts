import { ref } from "vue";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
  const body = await readBody(event);

  const userId = ref(getQuery(event).id);

  const res = await $fetch<string>(
    `http://localhost:8080/user/update/${userId.value}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.data.jwtToken}`,
      },
      body: {
        name: body.name,
        email: body.email,
      },
    }
  );

  return res;
});
