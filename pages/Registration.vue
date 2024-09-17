<template>
  <Navbar/>
    <div class="flex items-center justify-center min-h-screen bg-blue-100 p-4">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">Registration Form</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="name"
              type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>
  
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div class="flex justify-center">
          <button
            type="submit"
            class="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </div>

        <div>
          Already have an account ? <nuxt-link to="/Login">Sign in</nuxt-link>
        </div>
       
          
  
          <FormValidator
            :name="name"
            :email="email"
            :password="password"
             
          />
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import FormValidator from '~/components/RegistrationFormValidator.vue';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  
  
  const handleSubmit = async () => {
   
    try {
      const response = await fetch('http://localhost:8080/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name.value,
          email: email.value,
          password: password.value,
        }),
      });
      const data = await response.text();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
     
      console.log('API Response:', data);
    } catch (err) {
      console.log(err);
    }
  };
  </script>
  