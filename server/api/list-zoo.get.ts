import { ref } from "vue";
import { fetchzoo } from "~/types/FetchZoo";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const page: any = ref(getQuery(event).page);
  const pagesize = ref(getQuery(event).pagesize);
  const res = await $fetch<fetchzoo>(`http://localhost:8080/zoo/list`, {
    method: "GET",
    params: {
      page: page.value,
      pagesize: pagesize.value,
    },
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
