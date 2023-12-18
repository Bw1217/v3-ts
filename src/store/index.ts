import { defineStore } from "pinia";
// 1. 定义容器、导出容器
// 参数1：容器的ID，必须是唯一的，后面Pinia会把所有的容器挂载到根容器
// 参数2：一些选项对象，也就是state、getter和action
// 返回值：一个函数，调用即可得到容器实例

const useMainStore = defineStore({
  // 接着在对应的 store 里开启 persist 即可。数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。
    id:'login',
   // 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
    // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
    state:()=>{
      return {
        info:'pinia可以使用',
        cut:10,
        newid:0,
      }
    },
    // 开启数据缓存
     persist: {
        enabled: true,
      },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       // 自定义名称
  //       key: 'login_store',
  //       // 保存位置，默认保存在sessionStorage
  //       storage: localStorage,
  //       // 指定要持久化的数据，默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
  //       paths: ['age'],
  //     },
  //   ],
  // },
    // getters 的使用
    // 类似于组件的computed，用来封装计算属性，具有缓存的功能
    getters:{
      //函数接受一个可选参数：state状态对象
      count10(state){
        const arr = state.cut -1
        return state.newid = arr
      },
      // count12(state){
      //   return this.cut -=1
      // },
        // 若使用this.count，则必须指明返回数据的类型
      count13():number{
        return this.cut -= 10
      }
    },
      //通过actions修改
      // 类似于vue2组件的methods，用于封装业务逻辑，修改state
      // 注意：不能使用箭头函数来定义actions，因为箭头函数绑定外部的this
    actions:{
      setchange1(){
        this.cut += 1
        this.info = '我要+1'
      },
      setchange2(num:number){
        this.cut += num + 2
        this.info = '略略略'
      }
    }
})
// 2. 使用容器中的 state
// 3. 通过 getter 修改 state
// 4. 使用容器中的 action 同步和异步请求


//Pinia 数据持久化
//保存至localStorage中
// 数据持久化
// 1. 保存数据
// const instance = useMainStore()
// instance.$subscribe((_,state)=>{
//   localStorage.setItem('login-store',JSON.stringify({...state}))
// })
// // 2. 获取保存的数据，先判断有无，无则用先前的
// const old = localStorage.getItem('login-store');
// if (old) {
//   instance.$state = JSON.parse(old);
// }
export default useMainStore

// 使用 插件 pinia-plugin-persist 可以辅助实现数据持久化功能
// # 安装插件
// pnpm install pinia-plugin-persist --save