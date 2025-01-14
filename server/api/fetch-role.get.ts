export default defineEventHandler(async (event) => {

  const res = await $fetch("http://localhost:8080/user/fetchroles",{
    method:'GET'
  })
  return res;
})