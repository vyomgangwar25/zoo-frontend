import { ref } from "vue";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
  const session = await userSession(event);

  const zooid: any = ref(getQuery(event).zooid);
  const pageno = ref(getQuery(event).pageno);
  const pagesize = ref(getQuery(event).pagesize);

  const res = await $fetch<string>(
    `http://localhost:8080/animal/list/${zooid.value}?page=${pageno.value}&pagesize=${pagesize.value}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${session.data.jwtToken}`,
      },
    }
  );

  return res;
});
