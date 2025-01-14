import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string,
  
  options: UseFetchOptions<T> = {}
) {
//   const route = useRoute();
//   const token = route.query.token;
//   //console.log(useCookie("SavedToken").value);
//   const defaults: UseFetchOptions<T> = {
//     baseURL: "http://localhost:8080",
//     headers: useCookie("SavedToken").value
//       ? {
//           Authorization: `Bearer ${useCookie("SavedToken").value}`,
//         }
//       : token
//       ? { Authorization2: `Bearer ${token}` }
//       : {},
//   };
//   let mergedOptions = {};
//   mergedOptions = { ...defaults, ...options };
//   return $fetch<T>(url, mergedOptions);
}