<template>
	<div class="index-wrap">
		<div class="index-user-input-area-wrap">
			<h3>精准测算</h3>
			<form action="http://www.51dashizaixian.com/home/index" method="post"  name="login">
				<!-- <input type="text" name="xing" />
				<input type="text" name="ming" />
				<button type="submit">提交</button> -->				
				<div class="user-submit-data-form">
					<el-form
						:model="userInputData"
						:rules="userInputRules"
						ref="userSubmitForm"
						inline
						id="form"
						action="http://www.baidu.com"
						method="post"
						
					>
						<input type="hidden" name="ct" value="suanming">
						<input type="hidden" name="ac" value="sm_form">
						<input type="hidden" name="cY" value="">
						<input type="hidden" name="cM" value="">
						<input type="hidden" name="cD" value="">
						<input type="hidden" name="cH" value="">
						<input type="hidden" name="term1" value="">
						<input type="hidden" name="term2" value="">
						<input type="hidden" name="start_term" value="">
						<input type="hidden" name="end_term" value="">
						<input type="hidden" name="start_term1" value="">
						<input type="hidden" name="end_term1" value="">
						<input type="hidden" name="lDate" value="">
						<el-form-item class="user-input-item" prop="firstName">
							<el-input name="xing" v-model="userInputData.firstName" placeholder="姓" ref></el-input>
						</el-form-item>
						<el-form-item class="user-input-item" prop="lastName">
							<el-input name="ming" v-model="userInputData.lastName" placeholder="名" ref></el-input>
						</el-form-item>
						<el-form-item class="user-input-item" prop="sex">
							<el-select name="sex" placeholder="性别" class="w130" v-model="userInputData.sex">
								<el-option :value="0" :key="0" label="男"></el-option>
								<el-option :value="1" :key="1" label="女"></el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item class="user-input-item" prop="type">
							<el-select placeholder="阳历/农历" class="w130" v-model="userInputData.type">
								<el-option value="1" label="阳历"></el-option>
								<el-option value="2" label="农历"></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item class="user-input-item" prop="year">
							<el-date-picker
								type="year"
								placeholder="年"
								class="w130"
								format="yyyy"
								value-format="yyyy"
								v-model="userInputData.year"
								name="y"
							></el-date-picker>
						</el-form-item>
						<el-form-item class="user-input-item" prop="month">
							<el-select
								placeholder="月"
								class="w130"
								v-model="userInputData.month"
								:disabled="!userInputData.year"
								clearable
								name="m"
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
						<el-form-item class="user-input-item" prop="date">
							<el-select
								placeholder="日"
								class="w130"
								v-model="userInputData.date"
								:disabled="!userInputData.year && !userInputData.month"
								clearable
								name="d"
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
						<el-form-item class="user-input-item" prop="hour">
							<el-select
								placeholder="时"
								class="w140"
								v-model="userInputData.hour"
								clearable
								name="h"
							>
								<el-option 
									v-for="time in timeNotc"
									:key="time.id"
									:value="time.id"
									:label="time.text"
								></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
			</form>
			<div class="user-submit-data-button">
				<button class="user-submit-button" @click="validateUserSubmitData">提交</button>
			</div>
		</div>
		<div class="index-master-list-wrap">
			<div class="master-list-title">
				<h3>咨询大师</h3>
			</div>
			<Master :masterList="masterList" />
		</div>
	</div>
</template>

<script>
	import mockData from '../assets/js/mock'
	import Util from '../assets/js/util'
	import Master from '../components/master.vue'

	export default {
		data() {
			return {
				timeNotc: Util.timeNotc,
				userInputData: {
					firstName: '',
					lastName: '',
					sex: '',
					type: '',
					year: '',
					month: '',
					date: '',
					hour: '',
				},
				userInputRules: {
					firstName: [ { required: true, message: '请输入姓' } ],
					lastName: [ { required: true, message: '请输入名' } ],
					sex: [ { required: true, message: '请选择性别' } ],
					type: [ { required: true, message: '请选择阴历/农历' } ],
					year: [ { required: true, message: '请选择出生年份' } ],
					month: [ { required: true, message: '请选择出生月份' } ],
					date: [ { required: true, message: '请选择出生日期' } ],
					hour: [ { required: true, message: '请选择出生时辰' } ],
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
				masterList: mockData.masterList
			}
		},
		components: {
			Master
		},
		watch: {
			'userInputData.year'() {
				this.setDateList()
			},
			'userInputData.month'() {
				this.setDateList()
			}			
		},
		created() {
			this.getMasterList()
		},
		methods: {
			getMasterList: function() {
				this.$http.post(this.Api.POST_MASTER_LIST, this.$qs.stringify({
					page: 1
				})).then(response => {
					this.masterList = response.data
				}).catch(error => {
					console.log(error)
				})
			},
			setDateList() {
				if(this.userInputData.year && this.userInputData.month) {
					let date = new Date(this.userInputData.year, this.userInputData.month, 0)
					
					this.dates = date.getDate()

					if(this.userInputData.date > this.dates) {
						this.userInputData.date = this.dates
					}
				}				
			},
			validateUserSubmitData() {
				this.$refs.userSubmitForm.validate(valid => {
					if(valid) {
						this.submitUserData()
					}
				})
			},
			submitUserData() {
				console.log(this.userInputData);
				document.querySelector('#form').submit();
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.index-wrap
		width 100%
		height auto 

		.index-user-input-area-wrap
			height 246px
			display flex
			justify-content center
			align-items center
			flex-direction column
			background url('../assets/images/index-submit-data-bg.jpg') no-repeat center center
			background-size cover

			h3 
				font-size 30px
				color #5f3736
				margin-top 30px

			.user-submit-data-form
				margin 30px 0

				.user-input-item
					height 40px					

			.user-submit-data-button 
				display flex
				justify-content center
				align-items center
				margin-bottom 30px

				.user-submit-button
					width 200px
					height 40px
					border-radius 40px
					background-color #5f3736
					color #ffffff
					font-size 20px

		.index-master-list-wrap
			width 1100px
			margin auto
			padding 30px 0

			.master-list-title
				display flex
				justify-content center
				align-items center

				h3 
					width 485px
					height 55px
					font-size 28px
					text-align center
					background url('../assets/images/index-master-list-title.png') no-repeat center bottom 
					background-size 485px 12px

	.w130
		width 130px

	.w140 
		width 140px		
</style>

