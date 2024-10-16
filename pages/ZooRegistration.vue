<!-- <script lang="ts" setup>
import { ref } from "vue";
import { useCustomFetch } from "~/composable/useFetchOptions";

const name = ref("");
const location = ref("");
const size = ref("");
const token = localStorage.getItem("SavedToken");
const handleSubmit = async () => {
  const formData = {
    name: name.value,
    location: location.value,
    size: size.value,
  };

  try {
    const response = await useCustomFetch("/zoo", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    alert("zoo registration done!! ");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Zoo Registration Form
      </h1>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <label for="name" class="text-sm font-medium text-gray-700 mb-1">
            Name
          </label>

          <CustomInput
            type="text"
            placeholder="Enter name of zoo"
            v-model="name"
            regex="/^.+$/"
            errorMessage="Please enter name"
          />
        </div>

        <div class="flex flex-col">
          <label for="location" class="text-sm font-medium text-gray-700 mb-1">
            Location
          </label>

          <CustomInput
            type="text"
            placeholder="Enter the location"
            v-model="location"
            regex="/^.+$/"
            errorMessage="Please enter name"
          />
        </div>

        <div class="flex flex-col">
          <label
            for="Size(in acers)"
            class="text-sm font-medium text-gray-700 mb-1"
          >
            Size(in acers)
          </label>

          <CustomInput
            type="text"
            placeholder="Enter size"
            v-model="size"
            regex="/^.+$/"
            errorMessage="Please enter size"
          />
        </div>

        <div class="flex justify-center mt-4">
          <Button name="Submit" />
        </div>
      </form>
    </div>
  </div>
</template> -->
<template>
  <div></div>
</template>
