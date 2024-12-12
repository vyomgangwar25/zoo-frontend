<template>
  <div class="flex h-screen bg-gray-100">
    <main class="flex-1 p-6">
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 class="text-2xl font-bold mb-4">Hello {{ roleStore.name }}</h1>
        <h2 class="text-lg mb-2">
          Good {{ getTimeOfDay() }}! Welcome back to zoo dashboard.
        </h2>
      </div>

      <section class="mt-16 px-6 max-w-9xl mx-auto">
        <div class="mb-8">
          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            Welcome to ZOO! We are dedicated to providing information and
            resources about various animal species from around the world. Our
            goal is to educate and inspire visitors to appreciate the beauty and
            diversity of wildlife. At ZOO, you'll find a collection of articles,
            photos, and educational materials designed to engage audiences of
            all ages.
          </p>

          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            Our mission is to promote wildlife conservation and environmental
            awareness through engaging exhibits and educational programs. We
            believe that by fostering a love for animals, we can inspire future
            generations to protect our planet's biodiversity.
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
            We invite you to explore our interactive exhibits, attend
            informative talks, and participate in hands-on activities designed
            for all ages. Whether you're a lifelong animal lover or visiting for
            the first time, there’s something for everyone at ZOO!
          </p>

          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            Join us in our mission to protect wildlife and their habitats.
            Together, we can make a difference!
          </p>

          <p class="text-lg leading-relaxed text-gray-700">
            For more information about visiting hours, tickets, and special
            events, please visit our
            <a href="/contact" class="text-blue-500 underline">Contact Us</a>
            page.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useRoleStore } from "~/store/useRoleStore";
const roleStore = useRoleStore();

const getTimeOfDay = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return "Morning";
  }
  if (hours < 18) {
    return "Afternoon";
  }
  return "Evening";
};
</script>
