<template>
	<div class="story-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="story-container">
			<div class="story-list">
				<StoryItem
					v-for="(story, index) in storyList"
					:key="index"
					:story="story"
				 />
				<!-- <div 
					v-for="(story, index) in storyList"
					:key="index"
					class="story-item"
					@click="go2StoryDetail(index)"
				>
					<img :src="story.picture" alt="">
					<p>{{story.desc}}</p>
				</div> -->
			</div>
			<div class="story-pagination">
				<el-pagination
					:page-size="pagination.pageSize"
					:page-count="pagination.pageCount"
					:current-page="pagination.page"
					:layout="pagination.layout"
					:prev-text="pagination.prevText"
					:next-text="pagination.nextText"
					:current-change="changeCurrentPageHandler"
					background
				></el-pagination>
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
						en: 'FREE FORTUNE TELLING',
					},
					address: ['命理故事'],
				},
				storyList: Mock.storyList,
				pagination: {
					pageSize: 8,
					pageCount: 1,
					page: 1,
					layout: 'prev, pager, next',
					prevText: '上一页',
					nextText: '下一页'
				}
			}
		},
		components: {
			Breadcrumb,
			StoryItem,
		},
		created() {
			this.getStoryList()
		},
		methods: {
			changeCurrentPageHandler(page) {
				this.pagination.page = page
			},
			getStoryList() {
				this.$http.post(this.Api.POST_STORY_LIST, this.$qs.stringify({
					page: this.pagination.page,
				})).then(response => {
					this.storyList = response.data
					this.pagination.pageCount = response.pagetotal
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.story-container
		width 1100px
		margin auto 

		.story-list
			width 100%
			height auto 
			margin 20px auto
			display flex
			justify-content flex-start
			align-items center
			flex-wrap wrap

			

		.story-pagination
			text-align center
			margin-bottom 80px
</style>

