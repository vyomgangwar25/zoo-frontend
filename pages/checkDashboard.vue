<template>
  <div>
    <h1>This is dashboard</h1>
  </div>
</template>

<script lang="ts" setup>
const handleUserInfo = async () => {
  const response = await $fetch(`http://localhost:8080/user/user-info`, {
    method: "GET",
    // credentials: "include"
  })
  console.log(response)

}
onMounted(()=>{
  handleUserInfo()
})
</script>

<style></style>