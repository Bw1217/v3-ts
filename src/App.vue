<template>
  <div id="box">
    <p v-bind="objectOfAttrs">count:{{ count }}</p>
    <li v-for="(item,index) in arr" :key="index">{{ item }}</li>
    <button @click="add">add{{ count }}</button>
    <p>Has published books:</p>
    <span>{{ booksrf }}</span>
    <input type="text" ref="input">
    <div :style="{fontSize:picsize + 'em'}">
       <aboutview ref="about" v-for="(item,index) in pots" :key="index" :title="item.title" @entxt="picsize++"></aboutview>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import aboutview from "./views/AboutView.vue"
  import {ref,reactive,computed,onMounted,watch} from "vue"
    const arr = reactive([1,2,3])
    const arr2 = reactive([1,2,3])
    const count = ref(arr.length)
    const about = ref(null)
    const picsize = ref(1)
  const objectOfAttrs = {
    id: 'container',
    class: 'wrapper'
  }

  const pots = ref([
     { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' },
      {id:4,title:"bianwei"}
  ])

  const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
//返回的是一个ref，需要使用.value
  const booksrf = computed(()=>{
    return author.books.length > 0 ? 'yes' : 'no'
  })
  console.log(booksrf.value);

  const add = ()=>{
    arr.push(count.value += 1)
    arr2.push(count.value += 1)
    obj.count+=1
    obj2.count++
  }

  const input:any= ref(null)
  const n = ref({co:1})
  onMounted(()=>{
    console.log(n.value);
    console.log(about.value);

    console.log('this is onMounted');
     input.value.focus()
     console.log(input.value);
  })

  watch(count,(newid,oldid)=>{
    console.log(newid,oldid);
  })

  watch([arr,arr2],([newarr,newarr2])=>{
    console.log(`arr is ${newarr},arr2 is ${newarr2}`);
  })

  const obj = reactive({count:1})
  watch(()=>obj.count,(newid)=>{
    console.log(newid);
  })

  const obj2 = reactive({count:1})
  watch(obj2,(a,o)=>{
    console.log(a.count,o);
  })

  const source = ref(1)
  watch(source, (newValue, oldValue) => {
    console.log(newValue);
  // 立即执行，且当 `source` 改变时再次执行
}, { immediate: true })
</script>

<style>

</style>
