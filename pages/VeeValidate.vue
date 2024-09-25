<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Button from '~/components/Button.vue';

// Define the validation schema using Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});
</script>

<template>
    <Form :validation-schema="schema" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      
        <div class="flex flex-col mb-4">
            <label for="name" class="mb-2 text-sm font-semibold text-gray-700">Name</label>
            <Field name="name" type="text" id="name" class="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            <!-- Error message for name field -->
            <ErrorMessage name="name" class="text-red-500 text-sm" />
        </div>

       
        <div class="flex flex-col mb-4">
            <label for="password" class="mb-2 text-sm font-semibold text-gray-700">Password</label>
            <Field name="password" type="password" id="password" class="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
             
            <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>

    
        <Button name="submit" />
    </Form>
</template>
