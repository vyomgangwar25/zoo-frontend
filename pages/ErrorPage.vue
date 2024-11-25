<script lang="ts" setup></script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center"
  >
    <h1 class="text-4xl font-bold text-red-600 mb-4">Error Page !!</h1>

    <div class="text-xl text-gray-800 mb-2">404 not found</div>

    <div class="text-lg text-gray-700 mb-6">
      <h1>Whoops, the page you are looking for does not exist!</h1>
      <p>Might I suggest we go back to the signup page...</p>
    </div>

    <div>
      <button
        class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        <nuxt-link to="/Registration" class="text-white"
          >Go to Registration</nuxt-link
        >
      </button>
    </div>
  </div>
  <Icon
    name="heroicons:eye"
    class="text-4xl cursor-pointer hover:text-red-700"
  />
</template>
