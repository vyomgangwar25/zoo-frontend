import { useCookie, type UseFetchOptions } from "nuxt/app";
import { useRoute } from "vue-router";

export async function useCustomFetch<T>(
    
  url: string,
 
  options: UseFetchOptions<T> = {}
) {
    
    
  //console.log(useCookie("SavedToken").value);
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:8080",
    // headers: useCookie("SavedToken").value
    //   ? {
    //       Authorization: `Bearer ${useCookie("SavedToken").value}`,
    //     }
    //   : token
    //   ? { Authorization2: `Bearer ${token}` }
    //   : {},
  };
  let mergedOptions = {};
  mergedOptions = { ...defaults, ...options };
  return $fetch<T>(url, mergedOptions);
}
