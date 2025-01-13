import { ref } from "vue";
export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
        password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
      });
     
      const page :any= ref(getQuery(event).page);
      const pagesize=ref(getQuery(event).pagesize)
       
  const res=await $fetch<string>(`http://localhost:8080/zoo/list`,
    {
     
        method: "GET",
        params:{
        page:page.value, pagesize:pagesize.value
        },
        headers: {
          Authorization: `Bearer ${session.data.jwtToken}`,
        },
      }
    )

  return  res;
})
