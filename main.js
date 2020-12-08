import Vue from 'vue'
import App from './App'
// 引入MinRouter文件
import MinRouter from './MinRouter'
// 引入router文件
import minRouter from './router'
Vue.config.productionTip = false
// 注册插件
// mescroll
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.use(MinRouter)
App.mpType = 'app'
const app = new Vue({
    ...App,
    minRouter
})
app.$mount()

