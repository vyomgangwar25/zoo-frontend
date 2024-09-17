<template>
    <div class="mt-4">
    
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    name: String,
    email: String,
    password: String,
    
  });
  
  const errors = computed(() => {
    const errorMessages = {
      name: '',
      email: '',
      password: ''
    };
  
    
    if (!props.name) {
      errorMessages.name = 'Name is required';
    }
  
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!props.email) {
      errorMessages.email = 'Email is required';
    } else if (!emailRegex.test(props.email)) {
      errorMessages.email = 'Invalid email format';
    }
  
  
    if (!props.password) {
      errorMessages.password = 'Password is required';
    } else if (props.password.length < 6) {
      errorMessages.password = 'Password must be at least 6 characters';
    }
  
    return errorMessages;
  });
  </script>
  