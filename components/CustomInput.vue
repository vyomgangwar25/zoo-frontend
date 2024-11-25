<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
       :disabled="disabled"
      class="custom-input px-4 py-2 text-xl border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800"
      @input="onInputChange"
      :value="modelValue"
      />
  
    <p v-if="errormsz || show" class="text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
 
import { ref } from "vue";
 
 

const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
  regex: String,
  errorMessage: String,
  show: Boolean,
  disabled: {  
      type: Boolean,
      default: false  
    }
});

const emit = defineEmits(["update:modelValue",'validity', 'emailErr']);
const errormsz = ref(false);


const onInputChange = (event: any) => {
  const value = event.target.value;
  console.log(value);
  
  if (props.regex) {
    const pattern = new RegExp(props.regex);
    const isValid = pattern.test(value);
    errormsz.value = !isValid;
   
    emit("validity", isValid);
    if(errormsz) {      
      emit("emailErr");
    }
  } else {
    emit("validity", true);
  }
  emit("update:modelValue", value);
}
 
</script>
