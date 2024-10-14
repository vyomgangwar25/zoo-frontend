<script lang="js" setup>

const name = ref("");
const gender = ref("");
const dob = ref("");
const zooid=ref("");
import { useCustomFetch } from '~/composable/useFetchOptions';
import { useRoute } from 'vue-router';
const route = useRoute();
//const zooId = route.query.zooId;
//zooId.value = route.query.zooId
zooid.value = route.query.zooId
console.log(zooid.value);


const handleSubmit = async () => {
  const formData = {
    name: name.value,
    gender: gender.value,
    dob: dob.value,
    zooid: zooid.value
  };
  try {
    const response = await useCustomFetch("/animalregistration", {
        method: "POST",
        body: JSON.stringify(formData),
      });
    alert("Animal registration done!! ")
    console.log(response)
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <!-- <Navbar
    title=" Zoo"
    :links="[
      { text: 'Home', href: '/' },
      { text: 'Login', href: '/login' },
      { text: 'Signup', href: '/registration' },
      {
        text: 'ZooList',
        href: '/ExtractZooData',
      },
    ]"
  /> -->
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Animal Registration Form
        </h1>
      </div>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Name</label
          >

          <CustomInput
            type="text"
            placeholder="Enter name of animal"
            v-model="name"
            :regex="/^.+$/"
            errorMessage="Please enter name"
          />
        </div>

        <div>
          <label
            for="gender"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Gender</label
          >

          <CustomInput
            type="text"
            placeholder="Enter your name"
            v-model="gender"
            :regex="/^.+$/"
            errorMessage="Please enter name"
          />
        </div>

        <div>
          <label for="dob" class="block text-sm font-medium text-gray-700 mb-1"
            >Date of Birth</label
          >

          <CustomInput
            type="date"
            placeholder="Enter your name"
            v-model="dob"
            :regex="/^.+$/"
            errorMessage="Please enter dob"
          />
        </div>

        <div class="text-center">
          <Button name="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>
