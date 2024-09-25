import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:8080",
    headers: localStorage.getItem("SavedToken")
      ? {
          Authorization: `Bearer ${localStorage.getItem("SavedToken")}}`,
        }
      : {},
  };
  let mergedOptions = {};
  mergedOptions = { ...defaults, ...options };
  return $fetch(url, mergedOptions);
}