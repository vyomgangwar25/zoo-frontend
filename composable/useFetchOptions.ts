import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {},
 
) {
  const route=useRoute();
  const token=route.query.token;
  //console.log(token)
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:8080",
    headers: localStorage.getItem("SavedToken")
      ? {
           Authorization: `Bearer ${localStorage.getItem("SavedToken")}`
        }
      : 
      token ? { Authorization: `Bearer ${token}`} : {},
  };
  let mergedOptions = {};
  mergedOptions = { ...defaults, ...options };
  return $fetch(url, mergedOptions);
}