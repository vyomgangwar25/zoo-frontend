import { useRoute } from "vue-router";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getQuery(event).token;
 

  const res = await $fetch<string>(
    "http://localhost:8080/user/setnewpassword",
    {
      method: "POST",
      headers: {
        Authorization2: `Bearer ${token}`,
      },

      body: {
        newpassword: body.newpassword,
      },
    }
  );

  return res;
});
