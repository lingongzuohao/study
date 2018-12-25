<template>
	<div class="login-wrap">
		<transition name="slide-in">
			<div v-if="loginContainerShow" :class="['login-container', loginType === 'phone' ? 'phone-login' : '']">
				<img class="login-close" @click="closeLoginWrapHandler" src="../assets/images/close-icon.png" alt="">
				<div v-if="loginType === 'phone'" class="phone-login-module">
					<!-- <div class="login-desc-line">
						<img src="../assets/images/login-head-line-icon.jpg" alt="">
						<div>
							<h3>绑定手机</h3>
							<p>
								<img src="../assets/images/login-head-warning-icon.jpg" alt="">
								<span>根据法律相关规定，用户需绑定真实手机号进行相关验证</span>
							</p>
						</div>
					</div> -->
					<h3>登录</h3>
					<div class="login-input-wrap">
						<el-form>
							<el-form-item
								label=""
							>
								<el-input v-model.number="loginObj.tel" placeholder="手机号"></el-input>
							</el-form-item>
							<el-form-item
								label=""
							>
								<div class="login-form-code-line">
									<el-input class="code-line-input" v-model.number="loginObj.code" placeholder="验证码"></el-input>
									<el-button 
										type="text"
										class="code-line-button" 
										:disabled="isSendingCode"
										@click="sendCodeHandler"
									>{{isSendingCode ? countDown + ' S' : '发送验证码'}}</el-button>
								</div>
							</el-form-item>
							<el-form-item
								label=""
							>
								<el-input placeholder="支付码（选题）" v-model="loginObj.sn"></el-input>
							</el-form-item>
							<div class="login-form-tool-wrap">
								<el-button 
									class="login-form-submit" 
									type="primary" 
									:disabled="submitInfoBtnDisabled"
									@click="login"
								>登录</el-button>
							</div>
						</el-form>
					</div>
					<div class="login-tool-wrap">
						<p>
							<span>没有帐号？</span>
							<a href="javascipt:;" @click="go2Register">立即注册</a>
						</p>
					</div>
				</div>
				<div v-if="loginType === 'thirdPart'" class="third-part-login-container">
					<h3>登陆</h3>
					<div class="third-part-list">
						<div @click="loginThirdPart('QQ')" id="">
							<img src="../assets/images/qq.png" alt="">
							<span>QQ登陆</span>
							<span id="QQ-login-btn" style="display:none"></span>
						</div>
						<div @click="loginThirdPart('WeChat')">
							<img src="../assets/images/wechat.png" alt="">
							<span>微信登陆</span>
						</div>
					</div>
					<div class="go-login-container">
						<p>
							<a href="javascript:;" @click="phoneCodeLogin">短信登陆</a>
						</p>
						<p>
							<span>还没账号？</span>
							<a href="javascript:;" @click="go2Register">去注册</a>
						</p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	const COUNT_DOWN_SECOND = 60

	export default {
		data() {
			return {
				loginObj: {
					tel: '15010042978',
					code: '',
					sn: '',
				},
				loginContainerShow: false,
				countDown: COUNT_DOWN_SECOND,
				isSendingCode: false,
				// loginType: 'thirdPart'
				loginType: 'phone'
			}
		},
		computed: {
			submitInfoBtnDisabled() {
				return !this.isPhone() || !this.loginObj.code
			}
		},
		mounted() {
			this.loginContainerShow = true
			// this.$nextTick(() => {
			// 	this.initQQLogin()
			// })
		},
		methods: {
			initQQLogin() {
				console.log(document.querySelector('#QQ-login-btn'))

				QC.Login({
					btnId: 'QQ-login-btn',
					//用户需要确认的scope授权项，可选，默认all
					scope:"all",
					//按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
				}, function(reqData, opts) {
					console.log(reqData)
					console.log(opts)
				}, function(error) {
					console.log(error)
				})
			},
			login() {
				this.$http.post(this.Api.POST_LOGIN, this.$qs.stringify(this.loginObj)).then(resp => {
					console.log(resp)
					this.$message.success('登录成功')
					localStorage.setItem('TOKEN', resp.data.token)
					// 用户信息保存进store
				 	this.$store.commit('setUserLoginStatus', {
						login: true,
						user: resp.data
					})
					// 关闭登陆dialog
					this.$store.commit('setLoginWrapState', false)
				}).catch(error => {
				 	console.log(error)
				 })
			},
			sendCode() {
				this.countDownHandler()
			},
			closeLoginWrapHandler() {
				this.$store.commit('setLoginWrapState', false)
			},
			isPhone() {
				return /(13|15|17|18|14|16)[0-9]{9}/.test(this.loginObj.tel)
			},
			sendCodeHandler() {
				// if(!this.isPhone()) {
				// 	this.$message.error('请输入正确的手机号')

				// 	return 
				// }
				this.$http.post(this.Api.POST_SEND, this.$qs.stringify({
					tel: this.loginObj.tel
				})).then(resp => {
				 	// login success
				 	this.$store.commit('setUserLoginStatus', {
				 		login: true,
				 		user: resp.data
				 	})
				}).catch(error => {
				 	console.log(error)
				 })
				this.sendCode()
			},
			countDownHandler() {
				let timer = null
				this.isSendingCode = true
				this.countDown = COUNT_DOWN_SECOND

				timer = setInterval(() => {
					if(this.countDown > 0) {
						this.countDown --
					} else {
						clearInterval(timer)
						this.isSendingCode = false
					}
				}, 1000)
			},
			loginThirdPart(type) {
				this.$message.error('暂未开放，请先使用手机验证码登陆')
				// if(type === 'QQ') {
				// 	document.querySelector('#QQ-login-btn a').click()
				// }
			},
			phoneCodeLogin() {
				this.loginType = 'phone'
			},
			go2Register() {
				this.$store.commit('setLoginWrapState', false)
				this.$store.commit('setRegisterWrapState', true)
			}
		}
	}
</script>

<style lang="stylus" scoped>

	@keyframes translate-in {
		0% {
			transform: translateY(-3000px);
		}
		60% {
			transform: translateY(25px);
		}
		75% {
			transform: translateY(-10px);
		}
		90% {
			transform: translateY(5px);
		}
		100% {
			transform: translateY(0);
		}
	}

	.slide-in-enter-active, .slide-in-leave-active {
		animation: translate-in 1s cubic-bezier(.215, .61, .355, 1);
	}

	.login-wrap 
		position fixed
		top 0
		left 0
		bottom 0
		right 0
		overflow hidden
		background-color rgba(0, 0, 0, 0.8)
		display flex
		justify-content center
		align-items center
		color #919191
		z-index 99

		.login-container
			width 500px
			height 320px
			background-color #ffffff
			border-radius 8px
			padding 30px 20px
			position relative
			transition all .4s ease

			&.phone-login 
				height 420px
				width 440px

			.login-close
				width 14px
				height 14px
				position absolute 
				top 30px
				right 20px
				cursor pointer
				z-index 10

		.phone-login-module
			width 100%

			h3 
				color #2b2b2b

			.login-desc-line 
				height 80px
				display flex
				justify-content flex-start
				align-items center
				border-bottom 1px solid #ccc
				
				img 
					width 24px
					height auto
					flex-grow 0
					margin 0 20px

				div 
					text-align left
					
					h3 
						font-size 16px
						color #2b2b2b

					p 
						font-size 12px
						display flex
						align-items center

						span 
							color #ff3a00

						img 
							width 14px
							height 14px
							margin-right 4px
							margin-left 0

			.login-input-wrap
				width 280px
				margin auto
				margin-top 40px

				.login-form-code-line
					position relative
					display flex
					justify-content center
					align-items center

					.code-line-button
						margin-left 10px
						color #008aff
						position absolute 
						top 0
						right 10px
						// background-color #0060cd

				.login-form-tool-wrap
					text-align center

					.login-form-submit
						width 100%
						margin-top 10px

			.login-tool-wrap
				margin-top 30px
				text-align right
				font-size 14px

				a 
					color #008aff

		.third-part-login-container 
			
			h3 
				text-align center
				color #2b2b2b
			
			.third-part-list
				display flex
				justify-content space-around
				align-items center
				margin 40px 0

				div 
					display flex
					justify-content center
					align-items center
					flex-direction column
					width 100px
					cursor pointer

					img 
						width 100px
						height auto

					span 
						font-size 14px
						margin-top 10px

			.go-login-container
				display flex
				justify-content space-between
				align-items center
				margin-top 20px
				font-size 14px

				a 
					color #919191

				p:last-child 
					a 
						color: #008aff
</style>

