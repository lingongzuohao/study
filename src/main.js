import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Qs from 'qs'
import { baseUrl, Api } from './api.js'
import axios from './axios'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  Option,
  Button,
  DatePicker,
  TimeSelect,
  TimePicker,
  Form,
  FormItem,
  Loading,
  Tag,
  Message,
  MessageBox,
  Pagination,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Dialog,
} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/element-ui.scss'

Vue.prototype.$qs = Qs
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.Api = Api

Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dialog)

Vue.use(axios, {
  baseURL: baseUrl
})

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

let LOGIN_SESSION_KEY = localStorage.getItem('TOKEN')

if(LOGIN_SESSION_KEY) {
  //验证登录状态
  axios.post(Api.POST_VALIDATE_LOGIN_STATUS, Qs.stringify({
    token: LOGIN_SESSION_KEY
  })).then(resp => {
    let { data: { status } } = resp

    if(status === 0) {
      // 保存用户信息
      // store.commit()
    }
  }).catch(() => {
    // localStorage.removeItem('TOKEN')
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/* 
 * 环信
 * 18833886059@163.com
 * nhl10571x
 */