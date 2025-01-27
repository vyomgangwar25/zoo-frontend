<template>
  <!-- <div class="container mx-auto max-w-full ">
    <div class="border rounded flex flex-col items-center justify-center">
      <h1 class="text-2xl font-bold">Welcome to Tailwind CSS</h1>
      <p class="mt-4">This is a simple example demonstrating the use of the container class in Tailwind CSS.</p>
    </div>
  </div> -->
  <!-- <div class="w-full h-screen  bg-gray-200 ">
    <div class="container mx-auto border-4 border-purple-500 ">
      <div class="flex items-center justify-center">
        <h1>Hello</h1>
      </div>
     
    </div>

  </div> -->
  <div id="main" class="grid grid-cols-4 gap-1">
    <div class="bg-green-700 w-26 h-12">1</div>
    <div class="bg-green-500 w-26 h-12">2</div>
    <div class="bg-green-300 w-26 h-12">3</div>
    <div class="bg-green-700 w-26 h-12">4</div>
    <div class="bg-green-500 w-26 h-12">5</div>
    <div class="bg-green-300 w-26 h-12">6</div>
  </div>

  <div class="box box-border border-4 p-4 bg-blue-200">
    Box with padding and border included in size
  </div>
  <div class="box box-content border-4 p-4 bg-green-200">
    Box with size excluding padding and border
  </div>
  <div>
    <div class="inline-block w-32 h-12 bg-green-500 rounded-lg">
      inline block
    </div>
    <div class="inline-block w-32 h-12 bg-green-500 rounded-lg">
      inline block
    </div>
    <div class="inline-block w-32 h-12 bg-green-500 rounded-lg">
      inline block
    </div>
  </div>
  
</template>

<script lang="ts" setup>

</script>

<style></style>