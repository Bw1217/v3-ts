<template>
  <div class="about">
    <h1>{{ tit.title }}</h1>
    <p>{{ tit.newId }}</p>
    <h2>{{ useMain.info }}</h2>
      <h1 style="color: aqua;">{{ useMain.cut }}</h1>
    <button @click="newfn">newadd</button>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import useMainStore from "../store"

  const useMain = useMainStore()

  const tit = defineProps({
    title:String,
    newId:String,
  })
  console.log(tit.newId);

  const emit = defineEmits(['entxt'])
  const newfn = ()=>{
    emit('entxt')
  }
</script>
