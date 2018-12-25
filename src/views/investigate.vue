<template>
	<div class="investigate-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="investigate-container" v-html="investigateContentHtml">
			<!-- <div 
				v-for="(invest, index) in investList"
				:key="index"
				:class="['investigate-text-info', index % 2 === 1 ? 'reverse' : '']"
			>
				<div class="text">
					<h3>{{invest.title}}</h3>
					<p>{{invest.content}}</p>
				</div>
				<div class="image">
					<img :src="invest.image" alt="">
				</div>
			</div> -->
		</div>
		<div class="investigate-contcat-wrap">
			<div class="address">
				<img src="../assets/images/breadcrumb-address-icon.png" alt="">
				<span>地址</span>
				<p>河北省石家庄市嘉禾广场3号公寓15A14</p>
			</div>
			<div class="tel">
				<img src="../assets/images/investigate-tel-icon.png" alt="">
				<span>电话</span>
				<p>+86-18833886059</p>
			</div>
			<div class="address">
				<img src="../assets/images/investigate-time-icon.png" alt="">
				<span>办公时间</span>
				<p>早8:00~晚八点</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../components/breadcrumb'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '实地考察',
						en: 'INVESTIGATION'
					},
					address: ['实地考察']
				},
				investList: [
					{
						title: '实地考察',
						content: '实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察',
						image: require('../assets/images/investigate-text-image.jpg')
					},
					{
						title: '实地考察',
						content: '实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察',
						image: require('../assets/images/investigate-text-image.jpg')
					},
					{
						title: '实地考察',
						content: '实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察',
						image: require('../assets/images/investigate-text-image.jpg')
					}
				],
				investigateContentHtml: ''
			}
		},
		components: {
			Breadcrumb,
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				this.$http.post(this.Api.POST_INVESTIGATE_INFO).then(response => {
					this.investigateContentHtml = response.data.content
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.investigate-container,
	.investigate-container
		width 1100px
		height auto 
		margin auto 
		padding-top 20px

	.investigate-text-info
		display flex
		justify-content space-between
		align-items flex-start
		height 280px
		
		&:not(:first-child) {
			margin-top 35px
		}

		&.reverse
			flex-direction row-reverse

			.image 
				img
					&:hover
						transform translateX(-20px)

		.text
			width 525px
			
			h3
				font-size 22px
				color #343434
				text-align left
				line-height 2
				border-bottom 1px solid #909090
			
			p
				font-size 16px
				color #909090
				margin-top 35px
				text-align left

		.image
			width 525px
			overflow hidden

			img 
				transition transform .5s ease

				&:hover 
					transform translateX(20px)

	.investigate-contcat-wrap
		display flex
		justify-content space-around
		align-items center
		width 1100px
		height 320px
		margin 40px auto

		> div 
			display: flex
			flex-direction column
			justify-content center
			align-items center
			width 350px
			height 100%
			background-color #eeeeee

			&:hover
				img
					transform translateY(-10px)

			img 
				transition transform .5s ease

				

			span 
				font-size 18px
				color #919191
				margin: 20px 0

			p 
				font-weight bold
				font-size 22px
				color #232323
				padding 0 20px
				height 60px
</style>

