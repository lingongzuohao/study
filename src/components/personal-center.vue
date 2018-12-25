<template>
	<div class="personal-center-wrap">
		<div class="personal-info">
			<form id="payForm" v-show="false" method="post" :action="payUrl">
				<input type="hidden" name="sn" v-model="payObj.sn">
				<button id="submitPayForm" type="submit"></button>
			</form>
			<div class="info-left">
				<img src="../assets/images/personal-center-user-img.png" alt="">
				<div class="info-container">
					<h3>{{userInfo.name}}</h3>
					<p>
						<span>{{userInfo.sex}}</span>
						<span>{{getDateObj(userInfo.birthday).dateStr}}</span>
						<span>{{getDateObj(userInfo.birthday).timeNotc}}</span>
						<span>{{userInfo.tel}}</span>
					</p>
				</div>
			</div>
			<div class="info-right">
				<p>
					<img src="../assets/images/personal-center-amount-icon.png" alt="">
					<span>账户余额：</span>
					<span class="amount">{{userInfo.money}}</span>
					<span class="unit">元</span>
				</p>
			</div>
		</div>
		<div class="personal-charge">
			<h3>请选择充值金额</h3>
			<div class="charge-list">
				<div 
					v-for="(item, index) in chargeList"
					:key="index"
					:class="['charge-item', chargeCheckedItem === index ? 'checked' : '']"
					@click="checkChargeItem(index)"
				>
					<img 
						v-if="item.iscommend == 1" 
						src="../assets/images/personal-center-charge-recommend.png" 
						alt=""
						class="charge-item-recommend"
					>
					<div>
						<span>{{item.money}}</span>
						<span>元</span>
					</div>
					<p>充值金额</p>
					<img 
						class="charge-item-checked"
						src="../assets/images/personal-center-charge-checked.png" 
						alt=""
					>
				</div>
			</div>
			<el-button @click="submitChargeOrder" class="check-charge-item-btn" type="primary">确认</el-button>
		</div>
	</div>
</template>

<script>
	import Util from '../assets/js/util'
	import { baseUrl, Api } from '../api.js'

	export default {
		data() {
			return {
				chargeList: [],
				chargeCheckedItem: 0,
				payObj: {
					sn: ''
				},
				payUrl: baseUrl + Api.POST_PAY_PATH,
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo.user
			}
		},
		watch: {
			'chargeList'(list) {
				let index = list.findIndex(item => item.recommend)

				this.chargeCheckedItem = index === -1 ? 0 : index
			}
		},
		created() {
			this.getChargeList()
		},
		methods: {
			checkChargeItem(index) {
				this.chargeCheckedItem = index
			},
			submitChargeOrder() {
				let checked = this.chargeList[this.chargeCheckedItem]
				this.$http.post(this.Api.POST_CREATE_ORDER, this.$qs.stringify({
					money: checked.money,
					paytype: 3,
				})).then(resp => {
					let { data, status } = resp

					if(status === 200) {
						this.payObj.sn = data
						this.$nextTick(() => {
							document.querySelector('#submitPayForm').click()
						})
					}
				})
			},
			getChargeList() {
				this.$http.post(this.Api.POST_CHARGE_LIST).then(resp => {
					if(resp.status === 200) {
						this.chargeList = resp.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getDateObj(timestamp) {
				let dateStr = Util.getDateString(timestamp).slice(0, 10)
				let d = new Date(timestamp * 1000)
				let hour = d.getHours(d)
				
				hour = hour > 9 ? hour + ':00' : '0' + hour + ':00'

				let timeNotc = Util.timeNotc.filter(h => h.text.slice(0, 5) === hour)[0]

				return {
					dateStr,
					timeNotc: timeNotc.text.slice(6, 8)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.personal-center-wrap
		height auto

		.personal-info
			display flex
			justify-content space-between
			align-items center 
			height 200px
			color #fff
			background url('../assets/images/personal-center-banner.png') center center no-repeat
			background-size cover
			padding 0 20px

			.info-left 
				display flex
				justify-content flex-start
				align-items center

				img 
					width 100px
					height 100px
					margin-right 20px

				.info-container
					text-align left
					h3 
						font-size 24px
						margin-bottom 10px
					p 
						font-size 12px

						span 
							padding-right 8px
							line-height 1

							&:not(:last-child) 
								border-right 1px solid #fff
							&:not(:first-child)
								padding-left 8px

			.info-right
				display flex
				align-items center
				justify-content center
				height 100px
				padding 0 20px
				background-color rgba(0, 0, 0, 0.3)
				border-radius 4px

				p 
					text-align center
					font-size 14px

					img 
						width 16px
						height 16px
						margin-right 5px

					.amount,
					.unit 
						color #de0000
					.amount 
						font-size 50px
						margin-right 5px
					.unit
						font-size 16px

		.personal-charge
			width 1000px
			height auto
			margin auto
			margin-top 30px
			box-shadow 0 0 30px 1px rgba(0, 0, 0, 0.2)
			padding-top 40px

			h3 
				color #636363
				font-size 16px
				font-weight normal
				margin-bottom 40px
			
			.charge-list
				width 960px
				margin auto
				display flex
				justify-content flex-start
				align-items center
				flex-wrap wrap

				.charge-item 
					position relative
					width 225px
					height 150px
					border 1px solid #bebebe
					border-radius 5px
					display flex
					flex-direction column
					align-items center
					justify-content center
					padding 0 30px
					color #fd521f
					cursor pointer
					margin-right 20px
					margin-bottom 20px

					&.checked 
						border-color #fd521f

						.charge-item-checked 
							display block

					&:nth-child(4n)
						margin-right 0

					.charge-item-recommend,
					.charge-item-checked
						position absolute 
						right 0

					.charge-item-recommend 
						top 0

					.charge-item-checked 
						bottom -1px
						display none

					div 
						width 100%
						border-bottom 1px solid #fd521f

						span
							&:first-child 
								font-size 40px
								margin-right 5px
							&:last-child 
								font-size 16px

					p 
						font-size 16px
						margin-top 20px
			
			.check-charge-item-btn
				width 120px
				margin 30px 0
</style>

