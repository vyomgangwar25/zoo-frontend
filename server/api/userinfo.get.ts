export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });
  const res = await $fetch("http://localhost:8080/user/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });

  return res;
});
