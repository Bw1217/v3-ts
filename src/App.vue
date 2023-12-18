<template>
  <div id="box">
    <p v-bind="objectOfAttrs">count:{{ count }}</p>
    <li v-for="(item, index) in arr" :key="index">{{ item }}</li>
    <button @click="add">add{{ count }}</button>
    <p>Has published books:</p>
    <span>{{ booksrf }}</span>
    <h1 style="color: red;">{{ useMain.info }}<i>{{ info }}</i></h1>
    <h1 style="color: rgb(0, 81, 255);">{{ useMain.cut }}<i>{{ cut }}</i></h1>
    <button @click="alertData">修改数据</button> <br>
    <button @click="set1">修改+1</button> <br>
    <button @click="set2">修改+10</button> <br>
    <h2 style="color: pink;">{{ useMain.count10 }}</h2>

    <input type="text" ref="input">
    <div :style="{ fontSize: picsize + 'em' }">
      <aboutview ref="about" v-for="(item, index) in pots" :key="index" newId="hhh" :title="item.title"
        @entxt="picsize++">
        <i>我是谁</i>
      </aboutview>
    </div>
    <el-button type="success" @click="newid2(index)" v-for="(item, index) in tab" :key="index">tab{{ index + 1
    }}</el-button>
    <component :is="tab[newid]"></component>
  </div>
</template>
<script lang="ts" setup>
import aboutview from "./views/AboutView.vue"
import Home1 from "./views/Tabone.vue"
import Home2 from "./views/Tabtwo.vue"
import { ref, reactive, computed, onMounted, watch } from "vue"
import useMainStore  from "./store"
// import { toRefs } from "vue"
import { storeToRefs } from "pinia"

const useMain = useMainStore()

// 解构数据，但是得到的数据是不具有响应式的，只是一次性的
// 相当于仅仅只是...mainStore而已，只是做了reactive处理，并没有做toRefs
// const { count, info } = useMainStore();
// 解决方法：
// 1. 通过使用toRefs函数，因为前面所说相当于是通过reactive处理，因此可以
// const { count, info } = toRefs(mainStore);
// 2. 通过pinia中提供的storeToRefs方法来解决，推荐使用
const { info, cut } = storeToRefs(useMain)

//state 中数据的修改方式（actions和组件中）
//一般修改
const alertData = () => {
  // 方式一：最简单的方法，如下
  // 解构后更改方式
  // cut.value += 10
  // 结构前更改方式
  // useMain.cut += 10
  // 方式二：若要同时修改多个数据，建议使用$patch来实现批量更新，在内部做了优化
  // useMain.$patch({
  //   cut: useMain.cut + 1,
  //   info: "hello"
  // })
  // 方式三：更好的批量更新方法，通过$patch传递一个函数来实现，这里的state就是useMainStore容器中的state
  useMain.$patch((state) => {
    state.cut += 1
    state.info = '你好呀好好好'
  })
}

//通过actions修改
const set1 = ()=>{
  useMain.setchange1()
}
const set2 = ()=>{
  useMain.setchange2(10)
}



const newid = ref(0)
const tab = [
  Home1, Home2
]
const newid2 = (id2: number) => {
  console.log(id2);
  newid.value = id2
}
const arr = reactive([1, 2, 3])
const arr2 = reactive([1, 2, 3])
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
  { id: 4, title: "bianwei" }
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
const booksrf = computed(() => {
  return author.books.length > 0 ? 'yes' : 'no'
})
console.log(booksrf.value);

const add = () => {
  arr.push(count.value += 1)
  arr2.push(count.value += 1)
  obj.count += 1
  obj2.count++
}

const input: any = ref(null)
const n = ref({ co: 1 })
onMounted(() => {
  console.log(n.value);
  console.log(about.value);

  console.log('this is onMounted');
  input.value.focus()
  console.log(input.value);
})

watch(count, (newid, oldid) => {
  console.log(newid, oldid);
})

watch([arr, arr2], ([newarr, newarr2]) => {
  console.log(`arr is ${newarr},arr2 is ${newarr2}`);
})

const obj = reactive({ count: 1 })
watch(() => obj.count, (newid) => {
  console.log(newid);
})

const obj2 = reactive({ count: 1 })
watch(obj2, (a, o) => {
  console.log(a.count, o);
})

const source = ref(1)
watch(source, (newValue) => {
  console.log(newValue);
  // 立即执行，且当 `source` 改变时再次执行
}, { immediate: true })
</script>

<style></style>
