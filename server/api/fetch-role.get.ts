export default defineEventHandler(async (event) => {

  const res = $fetch("http://localhost:8080/user/fetchroles",{
    method:'GET'
  })
  return res;
})