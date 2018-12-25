<template>
	<div class="breadcrumb-wrap">
		<div class="breadcrumb-title">
			<span class="zh">{{breadcrumb.title.zh}}</span>
			<span class="en">{{breadcrumb.title.en}}</span>
		</div>
		<div class="breadcrumb-address">
			<span>
				<img src="../assets/images/breadcrumb-address-icon.png" alt="">
				您现在的位置：
			</span>
			<span 
				v-for="(add, index) in breadcrumb.address"
				:key="index"
				class="breadcrumb-address-item"
			>{{add}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			breadcrumb: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.breadcrumb-wrap
		width 1100px
		padding 10px 0
		margin auto
		display flex
		justify-content space-between
		align-items center
		border-bottom 1px solid #dfdfdf

		.breadcrumb-title
			color #1f1f1f
			font-size 18px
			vertical-align bottom

			.en 
				color #807f7f
				font-size 12px
				margin-left 10px

		.breadcrumb-address
			text-align right
			color #807f7f
			font-size 12px
			display flex
			justify-content center
			align-items center

			span 
				display flex
				justify-content center
				align-items center

				&.breadcrumb-address-item
					margin-right 5px

			img
				width 20px
				height 20px
				margin-right 6px
</style>

