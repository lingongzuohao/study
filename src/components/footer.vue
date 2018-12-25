<template>
	<div class="footer-wrap">
		<div class="footer-container">
			<div class="footer-menu-list">
				<a 
					v-for="(menu, index) in menuList"
					:key="index"
				href="">{{menu.text}}</a>
			</div>
			<div class="footer-copyright-info">
				版权所有：NiuHaiLei
			</div>
		</div>
	</div>
</template>

<script>
	import Menu from '../assets/js/menu'

	export default {
		data() {
			return {
				menuList: Menu
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.footer-wrap
		width 100%
		height 105px
		background-color #1c1110

		.footer-container
			width 1100px
			height 100%
			margin auto
			display flex
			justify-content center
			align-items center
			flex-direction column
			color #342222
			font-size 12px

			.footer-menu-list
				a
					padding  0 25px
					&:not(:last-child)
						border-right 1px solid #342222
					
</style>

