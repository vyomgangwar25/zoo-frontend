<template>
  <div>
    <h1 class="text-xl mb-2">List of users stored in database</h1>

    <table>
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2 text-left">User name</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Role Id</th>

          <th class="border border-gray-300 px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" class="hover:bg-gray-100">
          <td class="border border-gray-300 px-4 py-2 text-left">
            {{ item?.username }}
          </td>
          <td class="border border-gray-300 px-4 py-2 text-left">
            {{ item?.roleId }}
          </td>
          <td class="border border-gray-300 px-4 py-2 text-left">
            <button class="bg-blue-500 rounded p-1 text-white">Update</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const items = ref();

function handleUserList() {
  $fetch(`/api/fetch-user`, {
    method: "GET",
  })
    .then(function (response2) {
      items.value = response2;
    })
    .catch(function (err) {
      // toastMessage.value = err.response2._data;
      // isToastVisible.value = true;
    });
}

onMounted(() => {
  handleUserList();
});
</script>

<style></style>
