import { ref } from "vue";
export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

  const text: any = ref(getQuery(event).text);
  const zooid = ref(getQuery(event).zooid);

  const res = await $fetch<string>(
    `http://localhost:8080/animal/search/${zooid.value}`,
    {
      method: "GET",
      params: {
        text: text.value,
      },
      headers: {
        Authorization: `Bearer ${session.data.jwtToken}`,
      },
    }
  );

  return res;
});