import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
  const session = await userSession(event);
  const res = await $fetch("http://localhost:8080/user/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });
  return res;
});
