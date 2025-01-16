import { ref } from "vue";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const text: any = ref(getQuery(event).text);

  const res = await $fetch(`http://localhost:8080/zoo/search`, {
    method: "GET",
    params: {
      text: text.value,
    },
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
