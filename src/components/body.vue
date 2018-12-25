<template>
	<div class="body-wrap">
		<transition name="slide-fade" mode="out-in" appear>
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="stylus" scoped>
	.body-wrap
		width 100%
		flex 1
		min-height 300px
		overflow hidden
</style>

