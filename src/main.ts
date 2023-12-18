import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
//引入pinia数据持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'
//创建pinia实例
const pinia = createPinia()
//使用插件
pinia.use(piniaPluginPersist)
const app:any = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
