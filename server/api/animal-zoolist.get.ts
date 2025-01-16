import { ref } from "vue";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const zooid = ref(getQuery(event).zooId);

  const res = await $fetch<string>(`http://localhost:8080/animal/zoolist`, {
    method: "GET",
    params: {
      zooId: zooid.value,
    },
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
