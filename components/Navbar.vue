<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/" class="text-white text-3xl font-bold"> ZOO </a>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
              to="/"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-gray-300 hover:text-white px-3 mx-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

 

 
