<template>
  <div class=" ">
    <input
      type="text"
      v-model="serachText"
      class="border-2 border-black rounded-l text-black px-4 py-1.5"
      placeholder="Search..."
    />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
      @click="emit('success', serachText)"
    >
      {{ props.label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const serachText = ref("");
const props = defineProps<{
  label: string;
}>();
 

watch(serachText,async()=>{
  if(serachText.value=="")
{
   emit('fail')
}
 })

const emit = defineEmits(["success","fail"]);

</script>
