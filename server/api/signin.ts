import { navigateTo } from "nuxt/app";
import userSession from "../util/user-session";
import { ref } from "vue";
export default defineEventHandler(async (event) => {
  // const item = ref([]);
  const session = await userSession(event);
  const email: any = ref(getQuery(event).email);
  const id: any = ref(getQuery(event).id);
  const role: any = ref(getQuery(event).role);
  const name: any = ref(getQuery(event).name);
  const jwtToken = ref(getQuery(event).token);
  const refreshToken = ref(getQuery(event).refreshToken);

 

  console.log("hello world");
  await session.update({
    jwtToken: jwtToken.value,
    refreshToken: refreshToken.value,
  });

  // return navigateTo({
  //   name: "Dashboard",
  //   params: {
  //     email: email.value,
  //     id: id.value,
  //     role: role.value,
  //     name: name.value,
  //   },
  // });
    return sendRedirect(event, `/dashboard?email=${email.value}&id=${id.value} &role=${role.value} &name=${name.value}`, 302);
});
