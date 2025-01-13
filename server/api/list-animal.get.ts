import { ref } from "vue";
export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
  
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
