<template>
	<div class="story-detail-wrap">
		<Breadcrumb :breadcrumb="breadcrumb"></Breadcrumb>
		<div class="story-detail-container">
			<div class="story-title-info">
				<h3>{{story.title}}</h3>
				<div class="title-info-wrap">
					<!-- <el-tag type="info" size="mini">{{story.tag}}</el-tag> -->
					<span>原作者：{{story.author}}</span>
					<span><img src="../../assets/images/story-tag-date-icon.png" alt="">{{getDateString(story.addtime)}}</span>
					<span><img src="../../assets/images/story-tag-scan-icon.png" alt="">{{story.click}}</span>
					<span>
						来自：<a :href="story.from" target="_blank">{{story.from}}</a>
					</span>
				</div>
			</div>
			<div class="story-conetnt-wrap" v-html="story.content">
				<!-- <p>这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p> -->
			</div>
			<div class="story-tool-wrap">
				<div class="story-change-page">
					<div><el-button type="text" v-if="front && front.id" @click="goStoryDetail(front.id)">上一篇：{{front.title}}</el-button></div>
					<div><el-button type="text" v-if="after && after.id" @click="goStoryDetail(after.id)">下一篇：{{after.title}}</el-button></div>
				</div>
				<div class="story-about-story">
					<h5>
						<span>相关阅读</span>
					</h5>
					<div class="about-story-list">
						<StoryItem
							v-for="story in storyAboutList"
							:key="story.id"
							:story="story"
						 />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../../assets/js/util'
	import Mock from '../../assets/js/mock'

	import Breadcrumb from '../../components/breadcrumb'
	import StoryItem from '../../components/storyItem'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '命理故事',
						en: 'FREE FORTUNE TELLING'
					},
					address: ['命理故事', '>', '详情'],
				},
				story: {
					title: '',
					tag: '',
					author: '',
					addtime: '',
					click: 0,
					from: '',
					content: '',
				},
				after: {
					title: '',
					id: ''
				},
				front: {
					title: '',
					id: ''
				},
				storyAboutList: []
			}
		},
		components: {
			Breadcrumb,
			StoryItem,
		},
		created() {
			let id = this.$route.query.id

			this.getStoryDetail(id)
		},
		watch: {
			'$route': function(to, from) {
				console.log(to, from)
				let id = this.$route.query.id

				this.getStoryDetail(id)
			}
		},
		methods: {
			getStoryDetail(id) {
				this.$http.post(this.Api.POST_STORY_DETAIL, this.$qs.stringify({
					id: this.$route.query.id
				})).then(response => {
					this.story = response.data.info
					this.after = response.data.after
					this.front = response.data.front
					this.storyAboutList = response.data.other
				}).catch(error => {

				})
			},
			getDateString(timestamp) {
				return Util.getDateString(timestamp)
			},
			goStoryDetail(id) {
				this.$router.push('/story?id=' + id)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.story-detail-wrap 
		height auto
		overflow hidden
		background-color #fffcf5

	.story-detail-container
		width 1100px
		height auto 
		margin 20px auto 

		.story-title-info
			h3 
				font-size 18px

			.title-info-wrap
				display flex
				justify-content center
				align-items center
				font-size 12px
				margin 20px 0

				> span
					margin 0 10px
					display flex
					justify-content center
					align-items center

					a 
						color #0000ff

					img 
						display block
						width 14px
						height 14px
						margin-right 5px

		.story-conetnt-wrap
			font-size 14px
			line-height 2
			letter-spacing 1px
			text-indent 2em
			
			p 
				text-align left	
		
		.story-tool-wrap
			height auto 
			border-top 1px solid #ccc
			margin-top 20px
			padding-top 20px

			.story-change-page
				display flex
				justify-content space-between
				align-items center
				font-size 12px

			.story-about-story
				margin-top 50px

				h5 
					color #ffffff
					background-color #ececec
					height 70px
					display flex
					justify-content flex-start
					align-items center

					span 
						padding-left 10px
						border-left #5f3736 3px solid 
						margin-left 16px
						font-size 18px
						line-height 1.2
						font-weight normal
						color #5f3736

				.about-story-list
					display flex
					justify-content flex-start
					align-items center
					margin-top 20px
</style>

