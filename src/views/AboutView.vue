<template>
  <div class="about">
    <h1>{{ props.title }}</h1>
    <button @click="newfn">newadd</button>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps(['title'])
  const emit = defineEmits(['entxt'])
  const newfn = ()=>{
    emit('entxt')
  }
  console.log(props.title);
</script>
