import { ref } from "vue";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
   const session=await userSession(event)

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
