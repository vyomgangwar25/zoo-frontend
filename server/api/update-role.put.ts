import { ref } from "vue";
import { useCustomFetch } from "../composable/useFetchOptions";
import userSession from "../util/user-session";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await userSession(event);
  const userId: any = ref(getQuery(event).id);
  const roleId = ref(getQuery(event).roleId);
  const res = await useCustomFetch<string>(`/user/updaterole/${roleId.value}`, {
    method: "PUT",
    params: {
      userId: userId.value,
    },
    headers: {
      Authorization: `Bearer ${session.data.jwtToken}`,
    },
  });
  return res;
});
