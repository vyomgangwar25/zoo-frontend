import { type UseFetchOptions } from "nuxt/app";

export async function useCustomFetch<T>(
  url: string,

  options: UseFetchOptions<T> = {}
) {
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:8080",
  };
  let mergedOptions = {};
  mergedOptions = { ...defaults, ...options };
  return $fetch<T>(url, mergedOptions);
}
