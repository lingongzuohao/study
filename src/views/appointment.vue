<template>
	<div class="appointment-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="appointment-user-info-wrap">
			<form id="payForm" v-show="false" method="post" :action="payUrl">
				<input type="hidden" name="sn" v-model="payObj.sn">
				<button id="submitPayForm" type="submit"></button>
			</form>
			<el-form
				:model="userSubmitInfo"
				:rules="userSubmitRule"
				ref="userSubmitForm"
				inline
			>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area">
						<el-form-item class="form-item" prop="username">
							<el-input 
								v-model="userSubmitInfo.username" 
								placeholder="姓名"
								class="w300"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area">
						<el-form-item class="form-item" prop="sex">
							<el-radio v-model.number="userSubmitInfo.sex" :label="1">男</el-radio>
							<el-radio v-model.number="userSubmitInfo.sex" :label="2">女</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>出生日期：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area">
						<el-form-item class="form-item" prop="type">
							<el-select placeholder="阳历/农历" class="w130" v-model="userSubmitInfo.type">
								<el-option value="1" label="阳历"></el-option>
								<el-option value="2" label="农历"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="form-item" prop="year">
							<el-date-picker
								type="year"
								placeholder="年"
								class="w130"
								format="yyyy"
								value-format="yyyy"
								v-model="userSubmitInfo.year"
							></el-date-picker>
						</el-form-item>
						<el-form-item class="form-item" prop="month">
							<el-select
								placeholder="月"
								class="w130"
								v-model="userSubmitInfo.month"
								:disabled="!userSubmitInfo.year"
								clearable
							>
								<span slot="prefix" class="el-icon-date"></span>
								<el-option 
									v-for="m in monthes"
									:key="m.id"
									:label="m.text"
									:value="m.id"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="form-item" prop="date">
							<el-select
								placeholder="日"
								class="w130"
								v-model="userSubmitInfo.date"
								:disabled="!userSubmitInfo.year && !userSubmitInfo.month"
								clearable
							>
								<span slot="prefix" class="el-icon-date"></span>
								<el-option 
									v-for="d in dates"
									:key="d"
									:label="d"
									:value="d"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="form-item" prop="hour">
							<el-select
								placeholder="时"
								class="w140"
								v-model="userSubmitInfo.hour"
								clearable
							>
								<el-option 
									v-for="time in timeNotc"
									:key="time.id"
									:value="time.text"
									:label="time.text"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>手机号码：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area">
						<el-form-item class="form-item" prop="tel">
							<el-input
								v-model="userSubmitInfo.tel"
								placeholder="请输入手机号码"
								class="w300"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>预约金额：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area tool">
						<span class="amount">{{apponitPrice}}</span>
						<span class="price-unit">￥</span>
						<el-button type="primary" class="submit-button" @click="validateAppointInfo">去支付</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Util from '../assets/js/util'
	import { baseUrl, Api } from '../api.js'
	import Breadcrumb from '../components/breadcrumb'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '预约上门',
						en: 'MAKE A RESERVATION'
					},
					address: ['预约上门'],
				},
				payUrl: baseUrl + Api.POST_PAY_PATH,
				apponitPrice: 0,
				userSubmitInfo: {
					username: '',
					sex: 1,
					type: '',
					year: '',
					month: '',
					date: '',
					hour: '',
					tel: '',
					paytype: 2,
				},
				payObj: {
					sn: ''
				},
				userSubmitRule: {
					username: [ { required: true, message: '请输入名称' } ],
					type: [ { required: true, message: '请选择阳历/农历' } ],
					year: [ { required: true, message: '请选择出生年份' } ],
					month: [ { required: true, message: '请选择出生月份' } ],
					date: [ { required: true, message: '请选择出生日期' } ],
					hour: [ { required: true, message: '请选择出生时辰' } ],
					sex: [ { required: true, message: '请选择性别' } ],
					tel: [ {
						required: true,
						message: '请输入手机号码'
					}, {
						validator (rule, val, cb) {
							if (!/(13|14|15|16|17|18|19)\d{9}/.test(val)) return cb(new Error('请输入正确的手机号码'))
							return cb()
						}
					} ],
				},
				monthes: [
					{ id: 1, text: '一月' },
					{ id: 2, text: '二月' },
					{ id: 3, text: '三月' },
					{ id: 4, text: '四月' },
					{ id: 5, text: '五月' },
					{ id: 6, text: '六月' },
					{ id: 7, text: '七月' },
					{ id: 8, text: '八月' },
					{ id: 9, text: '九月' },
					{ id: 10, text: '十月' },
					{ id: 11, text: '十一月' },
					{ id: 12, text: '十二月' },
				],
				dates: [],
				timeNotc: Util.timeNotc
			}
		},
		watch: {
			'userSubmitInfo.year'() {
				this.setDateList()
			},
			'userSubmitInfo.month'() {
				this.setDateList()
			}
		},
		components: {
			Breadcrumb,
		},
		created() {
			let url = location.search
			let reg = url.match(/(\?|&)orderId=(\w+)($|&)/)

			if (reg) {
				this.validatePayResule(reg[2])
			}
			this.getAppointPrice()
		},
		methods: {
			validatePayResule(ordersn) {
				this.$http.post(this.Api.POST_VALIDATE_ORDER, this.$qs.stringify({
					ordersn,
				})).then(resp => {
					let { data: { status, kind } } = resp

					if (status === '1' && kind === '2') {
						this.$alert('恭喜你，预约成功', '提示', {
							type: 'success',
							showClose: false,
							
						}).then(() => {
							this.$router.replace('/appointment')
						})
					}
				})
			},
			setDateList() {
				if(this.userSubmitInfo.year && this.userSubmitInfo.month) {
					let date = new Date(this.userSubmitInfo.year, this.userSubmitInfo.month, 0)
					
					this.dates = date.getDate()

					if(this.userSubmitInfo.date > this.dates) {
						this.userSubmitInfo.date = this.dates
					}
				}
			},
			validateAppointInfo() {
				this.$refs.userSubmitForm.validate(valid => {
					if(valid) {
						console.log('校验通过')
						this.createOrder()
					}
				})
			},
			createOrder() {
				this.$http.post(this.Api.POST_CREATE_ORDER, this.$qs.stringify(this.userSubmitInfo)).then(resp => {
					let { data, status } = resp

					if(status === 200) {
						this.payObj.sn = data
						this.$nextTick(() => {
							document.querySelector('#submitPayForm').click()
						})
					}
				})
			},
			getAppointPrice() {
				this.$http.post(this.Api.POST_APPOINTMENT_PRICE).then(resp => {
					let { data, status } = resp

					if (status === 200) {
						this.apponitPrice = data
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.appointment-user-info-wrap
		width 1100px
		height auto 
		margin 20px auto
		margin-bottom 150px
		padding 50px 20px
		border 1px solid #dfdfdf

		.form-row
			width 100%
			margin 20px 0

			.form-row-input-area
				display flex
				justify-content flex-start
				
				.form-item
					margin-bottom 0

				.submit-button
					margin-left 20px
					
					span 
						color #fff

				&.tool
					display flex
					align-items center

					span
						height 30px
						display flex
						align-items flex-end
						color #ff0000
						font-size 20px

						&.price-unit 
							font-size 14px

	.w130
		width 130px
		height 40px
	.w140
		width 180px
		height 40px
	.w300
		width 300px
		height 40px
</style>

