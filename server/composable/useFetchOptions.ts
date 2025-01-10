import { useCookie, type UseFetchOptions } from "nuxt/app";
import { useRoute } from "vue-router";

export async function useCustomFetch<T>(


  url: string,
  options: UseFetchOptions<T> = {}
) {
    const session = await useSession(event, {
        password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
      });
      
  const route = useRoute();
  const token = route.query.token;

  
  //console.log(useCookie("SavedToken").value);
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:8080",
    headers: useCookie("SavedToken").value
      ? {
          Authorization: `Bearer ${useCookie("SavedToken").value}`,
        }
      : token
      ? { Authorization2: `Bearer ${token}` }
      : {},
  };
  let mergedOptions = {};
  mergedOptions = { ...defaults, ...options };
  return $fetch<T>(url, mergedOptions);
}