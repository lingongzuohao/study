<template>
	<div 
		class="story-item"
		@click="go2StoryDetail(story.id)"
	>
		<!-- <div> -->
			<img :src="baseImgeUrl + story.thumb" alt="">
			<p>{{story.title}}</p>
		<!-- </div> -->
	</div>
</template>

<script>
	export default {
		props: {
			story: {
				type: Object,
				reuqired: true,
			}
		},
		data() {
			return {
               baseImgeUrl: 'https://www.51dashizaixian.com'
			}
		},
		methods: {
			go2StoryDetail(id) {
				this.$router.push({
					name: 'Story',
					query: {
						id,
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.story-item 
		position relative
		width 255px
		height 177px
		margin-right 26px
		margin-bottom 20px
		cursor pointer
		overflow hidden
		font-size 0
		
		&:nth-child(4n)
			margin-right 0

		&:hover 
			img 
				transform translateY(-10px)
			
			p 
				transform translateY(-50%)

		// div 
		// 	position relative
		// 	height 100%
		// 	width 100%

		img, p 
			position absolute 
			left 0
			right 0
			transition all .4s cubic-bezier(.215, .61, .355, 1)
			
		img 
			top 0
			bottom 0
			height 187px

			// &:hover 
				
		p 
			bottom -30px
			height 60px
			text-align left
			color #ffffff
			background-color rgba(0, 0, 0, 0.6)
			line-height 30px
			padding 0 12px
			font-size 12px
</style>
