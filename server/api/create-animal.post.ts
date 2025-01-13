export default defineEventHandler(async (event) => {
  const body = await readBody(event);
//  console.log(body)

  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

  const res = await $fetch<string>("http://localhost:8080/animal/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
    body: {
      name: body.name,
      gender: body.gender,
      dob: body.dob,
      zooid: body.zooid,
    },
  });

  return res;
});
