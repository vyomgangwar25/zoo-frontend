<template>
  <nav class="bg-gray-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/" class="text-white text-4xl font-bold mr-3"> ZOO </a>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-6">
            <NuxtLink
              to="/"
              class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
              >Home
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
            >
              Login
            </NuxtLink>
            <NuxtLink
              to="/registration"
              class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
            >
              Signup
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
