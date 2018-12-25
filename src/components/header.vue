<template>
	<div class="header-wrap">
		<div class="header-container">
			<div class="header-logo-wrap">
				<div class="container">
					<div class="header-logo-wrap">
						<a href="/">
							<img src="../assets/images/header-logo.png" alt="" />
						</a>
					</div>
					<div class="header-tool-wrap">
						<div class="header-tool-tel">
							<img src="../assets/images/header-tel-icon.png" alt="" />
							<span>TEL: 400-6588-128</span>
						</div>
						<div class="header-tool-user" v-if="!getUserLoginStatus.login">
							<a href="javascript:;" @click="openLoginWrapHandler">登录</a>
							<span>|</span>
							<a href="javascript:;" @click="openRegisterWrapHandler">注册</a>
						</div>
						<div class="header-tool-user" v-else>
							<span>欢迎您，</span>
							<a href="javascript:;" @click="showPersonalCetnerDialog">{{getUserLoginStatus.user.name}}</a>
							<span>|</span>
							<a href="javascript:;" @click="logout">退出</a>
						</div>
					</div>
				</div>
			</div>
			<div class="header-menu-wrap">
				<div class="container">
					<span
						v-for="(menu, index) in menuList"
						:key="index"
					>
						<router-link
							v-if="!menu.thirdPath"
							:to="menu.path"
							:exact="menu.path === '/' ? true : false"
							active-class="active"
						>{{menu.text}}</router-link>
						<a 
							v-else
							:href="menu.thirdPath"
							target="_blank"
						>{{menu.text}}</a>
					</span>
					
				</div>
			</div>
			<div class="header-banner-wrap">
				
			</div>
		</div>
		<!-- 个人中心 -->
		<el-dialog
			:visible.sync="personalCenterDialogVisible"
			width="1100px"
			custom-class="personal-center-dialog"
			top="5vh"
		>
			<PersonalCenter />
		</el-dialog>
	</div>
</template>

<script>
	import Menu from '../assets/js/menu'
	import PersonalCenter from './personal-center.vue'
	
	export default {
		data() {
			return {
				menuList: Menu,
				personalCenterDialogVisible: false,
			}
		},
		computed: {
			getUserLoginStatus() {
				return this.$store.state.userInfo
			}
		},
		components: {
			PersonalCenter,
		},
		created() {
			let url = location.href
			let reg = url.match(/(\?|&)orderId=(\w+)($|&)/)

			if (reg && url.indexOf('/?') !== -1) {
				this.validatePayResule(reg[2])
			}
		},
		methods: {
			validatePayResule(ordersn) {
				this.$http.get(this.Api.POST_VALIDATE_ORDER, {
					ordersn,
				}).then(resp => {
					let { data: { status, kind } } = resp
					
					if (this.getUserLoginStatus.login && status === 1 && kind === 3) {
						this.$alert('恭喜你，充值成功', '提示', {
							type: 'success'
						}).then(() => {
							// this.togglePersonalCetnerDialog()
							this.$route.replace('/')
						})
					}
				})
			},
			openLoginWrapHandler() {
				this.$store.commit('setLoginWrapState', true)
			},
			openRegisterWrapHandler() {
				this.$store.commit('setRegisterWrapState', true)
			},
			togglePersonalCetnerDialog() {
				this.personalCenterDialogVisible = !this.personalCenterDialogVisible
			},
			showPersonalCetnerDialog() {
				this.togglePersonalCetnerDialog()
			},
			// 退出
			logout() {
				this.$store.commit('setUserLoginStatus', {
					login: false,
					user: null
				})

				localStorage.removeItem('TOKEN')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.personal-center-dialog
		.el-dialog__body
			padding 30px 0
		
	.header-wrap 
		width: 100%
		height: auto

		.header-container 

			.header-logo-wrap
				height 52px
				background-color: #f5e9da
			.header-menu-wrap
				height 50px
				background: -webkit-linear-gradient(top, #7d4f4e, #502c2b)
			.header-banner-wrap
				height 192px
				background #453039 url('../assets/images/header-banner.png') center center no-repeat
			.container
				width: 1100px
				margin: auto
				display: flex
				justify-content: space-between
				align-items: center

				.header-tool-wrap 
					display: flex
					justify-content: center
					align-items: center

					> div 
						display: flex
						align-items: center

					.header-tool-tel
						margin-right: 35px

						span 
							margin-left: 10px

					.header-tool-user 
						a 
							margin: 0 10px
							font-size: 15px

			.header-menu-wrap
				.container
					display: flex
					justify-content: center
					align-items: center
					height 100%

					span
						display flex
						height 100%
						align-items center
						justify-content center
						flex 1
						color #fff
						cursor pointer
						font-size 16px
						transition all .3s ease

						&.active,
						&:hover
							background-color #533231

						&:not(:last-child) 
							border-right 1px solid #5d3c3a

						a 
							color #ffffff
							width 100%
							height 100%
							display flex
							align-items center
							justify-content center

							&.active,
							&:hover
								background-color #533231
</style>
