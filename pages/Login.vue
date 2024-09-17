<template>
   <Navbar/>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
   
    <div class="max-w-sm w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Login Form
      </h1>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-gray-700 font-medium mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
     
        <div class="flex justify-center">
          <button
            type="submit"
            class="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </div>
        
        <div>
          not Registered?  <nuxt-link to="Registration">create an account</nuxt-link>
        </div>

        <LoginFormValidator
          :email="email"
          :password="password"
          
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const router = useRouter()
const email = ref("");
const password = ref("");
 

const handleSubmit = async () => {
 
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    const token = data;
    localStorage.setItem("SavedToken", token);
    console.log("API Response:", data);
    router.push("/Dashboard");
  } catch (err) {
    console.log(err);
  }
};
</script>
