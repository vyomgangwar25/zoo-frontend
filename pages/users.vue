<script setup>
const items = ref([]);
const userId = ref("");
const username = ref("")
function handleUserList() {
  $fetch(`/api/fetch-user`, {
    method: "GET",
  })
    .then(function (response) {
      items.value = response;
    })
    .catch(function (err) {
      toastMessage.value = err.response2._data;
      isToastVisible.value = true;
    });
}
const updateModal = ref(false);
function handleUpdate(id, name) {
  username.value = name
  userId.value = id;
  updateModal.value = true;
}

const handleSelectedId = (roleId) => {

  $fetch("/api/update-role", {
    method: "PUT",
    params: {
      id: userId.value,
      roleId: roleId
    },
  })
    .then(function (response) {
      toastMessage.value = response
      handleUserList()
      updateModal.value = false
    })
    .catch(function (err) {
      toastMessage.value = response

    });
  isToastVisible.value = true;

}
const handleClose = () => {
  updateModal.value = false
}

const toastMessage = ref("");
const isToastVisible = ref(false);
const closeToast = () => {
  isToastVisible.value = false;
}


onMounted(() => {
  handleUserList();
});
</script>

<template>
  <div class="flex flex-col mt-5  items-center w-full">
    <UpdateId :isModalOpen="updateModal" :username="username" @success="handleSelectedId" @close="handleClose" />
    <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
    <div class="w-4/5">
      <h1 class="text-2xl font-bold mb-2">List of users stored in database:</h1>
      <table class=" container mx-auto ">
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
              <button class="bg-blue-500 rounded p-1 text-white" @click="handleUpdate(item.id, item.username)">
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

<style></style>
