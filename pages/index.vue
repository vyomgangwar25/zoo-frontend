<template>
  <div
    class="relative flex items-center justify-center"
    style="height: calc(100vh - 4rem)"
  >
    <img
      src="https://images.forbesindia.com/media/images/2023/Jul/img_214501_0-tiger.jpg"
      alt="A description of the image"
      class="absolute inset-0 object-cover w-full h-full"
    />

    <h1
      class="absolute z-10 text-white text-6xl font-extrabold text-center"
      style="
        max-width: 600px;
        font-family: Arial, sans-serif;
        margin-top: -33.5rem;
      "
    >
      Welcome to the Zoo
    </h1>

    <div class="absolute mid-10 left-10 z-10 max-w-lg">
      <p class="text-white text-2xl font-medium text-center mx-auto">
        Discover amazing animals and learn about their habitats.We are dedicated
        to providing information and resources about various animal species from
        around the world.
      </p>
      <div class="flex justify-center space-x-4 y-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button>

        <NuxtLink to="/login" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Get Started
       </NuxtLink>

      </div>
    </div>
  </div>

  <section class="mt-16 px-6 max-w-5xl mx-auto">
    <div class="mb-8">
      <h2 class="text-6xl font-bold mb-6 flex items-center justify-center">
        About Us
      </h2>
      <p class="text-lg leading-relaxed text-gray-700 mb-4">
        Welcome to ZOO! We are dedicated to providing information and resources
        about various animal species from around the world. Our goal is to
        educate and inspire visitors to appreciate the beauty and diversity of
        wildlife. At ZOO, you'll find a collection of articles, photos, and
        educational materials designed to engage audiences of all ages.
      </p>

      <p class="text-lg leading-relaxed text-gray-700 mb-4">
        Our mission is to promote wildlife conservation and environmental
        awareness through engaging exhibits and educational programs. We believe
        that by fostering a love for animals, we can inspire future generations
        to protect our planet's biodiversity.
      </p>

      <p class="text-lg leading-relaxed text-gray-700 mb-4">
        At ZOO, you can meet a variety of fascinating animals, including:
      </p>

      <ul
        class="list-disc list-inside text-lg leading-relaxed text-gray-700 mb-4"
      >
        <li class="mb-2">Majestic lions and tigers</li>
        <li class="mb-2">Playful monkeys and apes</li>
        <li class="mb-2">Colorful birds from around the world</li>
        <li class="mb-2">Gentle elephants and rhinos</li>
        <li class="mb-2">Unique reptiles and amphibians</li>
      </ul>

      <p class="text-lg leading-relaxed text-gray-700 mb-4">
        We invite you to explore our interactive exhibits, attend informative
        talks, and participate in hands-on activities designed for all ages.
        Whether you're a lifelong animal lover or visiting for the first time,
        there’s something for everyone at ZOO!
      </p>

      <p class="text-lg leading-relaxed text-gray-700 mb-4">
        Join us in our mission to protect wildlife and their habitats. Together,
        we can make a difference!
      </p>

      <p class="text-lg leading-relaxed text-gray-700">
        For more information about visiting hours, tickets, and special events,
        please visit our
        <a href="/contact" class="text-blue-500 underline">Contact Us</a> page.
      </p>
    </div>

    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div class="md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://img.freepik.com/free-photo/view-wild-lion-nature_23-2150460851.jpg"
          alt="Lion"
          class="w-full h-40 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold">Lion</h3>
          <p class="text-gray-600">
            The king of the jungle, lions are known for their majestic
            appearance and social behavior.
          </p>
        </div>
      </div>

      <div class="md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D"
          alt="Tiger"
          class="w-full h-40 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold">Tiger</h3>
          <p class="text-gray-600">
            Tigers are the largest members of the cat family and are renowned
            for their striking orange coats with black stripes
          </p>
        </div>
      </div>

      <div class="md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/27/86/500/panda-animal-cute-bear-wallpaper-preview.jpg"
          alt="panda"
          class="w-full h-40 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold">Panda</h3>
          <p class="text-gray-600">
            Pandas, specifically the giant panda, are beloved for their
            distinctive black-and-white fur and adorable appearance.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}

section {
  margin-top: 20px;
}
</style>
