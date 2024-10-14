<!-- <script setup>
import { ref } from "vue";
import { useCustomFetch } from "~/composable/useFetchOptions";
const route = useRoute();
const id = route.query.zooId;
const name = ref("");
const location = ref("");
const size = ref("");
const handleSubmit = async () => {
  const data = {
    name: name.value,
    location: location.value,
    size: size.value,
  };

  const response = await useCustomFetch(`/updatezoo/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SavedToken")}`,
    },
  });
  console.log(response);
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
    <div class="p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8 max-w-sm">
        Zoo Data Update
      </h1>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <label for="" class="block text-sm font-medium text-gray-700"
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
        <div>
          <label for="">Location</label>
          <CustomInput
            type="text"
            v-model="location"
            placeholder="Enter location"
            :regex="/^.+$/"
            errorMessage="Please enter a location."
          />
        </div>
        <div>
          <label for="">Size</label>
          <CustomInput
            type="text"
            v-model="size"
            placeholder="Enter size "
            :regex="/^.+$/"
            errorMessage="Please enter size."
          />
        </div>
        <Button name="Submit" />
      </form>
    </div>
  </div>
</template> -->

<template>
  <div></div>
</template>
