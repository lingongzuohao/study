import Axios from 'axios'
import { Message, Loading } from 'element-ui'

let axios = Axios.create()

let loading = null

axios.interceptors.request.use(function(config) {
	
	loading = Loading.service({
		lock: true,
		text: 'Loading',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	})

	let token = localStorage.getItem('TOKEN')

	if(token) {
		config.headers.token = token
	}
	
	return config
}, function(err) {
	loading.close()
	return Promise.reject(err)
})

axios.interceptors.response.use(function(response) {

	let resp = response.data

	loading.close()

	if(resp.status !== 200) {
		Message.error(resp.info || '请求失败')
		return Promise.reject(response)
	} else if(resp.status === 301) {
		Message.error('对不起，此操作需要登录，请点击右上角登录按钮')
		return Promise.reject(response)
	}

	return resp
}, function(err) {
	loading.close()
	
	Message.error('接口响应异常, 请联系开发人员!')

	console.log(err)

	return Promise.reject(err)
})

axios.post = function(url, data, config) {
	let options = {
		method: 'post',
		url,
		data,
		responseType: 'json',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
	
	Object.assign(options, config || {})

	return axios(options)
}

axios.install = (Vue, opt) => {
	axios.defaults.baseURL = opt.baseURL
	axios.defaults.timeout = 10000
	
	Vue.prototype.$http = axios
}

export default axios