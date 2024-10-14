<!-- <script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import CustomInput from "~/components/CustomInput.vue";
import { useCustomFetch } from "~/composable/useFetchOptions";

const route = useRoute();
const id = route.query.animalId;
console.log(id);
const name = ref("");
const gender = ref("");

const handleSubmit = async () => {
  console.log("Updating animal data...");

  const data = {
    name: name.value,
    gender: gender.value,
  };

  try {
    const response = await useCustomFetch(`/updateanimal/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SavedToken")}`,
      },
    });

    alert(response);
  } catch (err) {
    console.error("Error updating animal data:", err);
    alert("Failed to update animal data.");
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
    <div class="max-w-sm w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Animal Data Update
      </h1>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <CustomInput
            type="text"
            v-model="name"
            placeholder="Enter name"
            :regex="/^.+$/"
            errorMessage="Please enter a name."
          />
        </div>
        <div class="flex flex-col">
          <label for="gender" class="text-gray-700 font-medium mb-2"
            >Gender</label
          >
          <CustomInput
            type="text"
            v-model="gender"
            placeholder="Enter gender"
            :regex="/^.+$/"
            errorMessage="Please enter gender."
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template> -->
<template></template>
