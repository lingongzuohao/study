<template>
	<div class="master-list-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="master-list-container">
			<Master :masterList="masterList" />
		</div>
		<div class="master-list-pagination">
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
</template>

<script>
	import Breadcrumb from '../../components/breadcrumb'
	import Master from '../../components/master'

	import mockData from '../../assets/js/mock'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '大师列表',
						en: 'MASTER LIST'
					},
					address: ['大师列表']
				},
				masterList: mockData.masterList,
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
			Master,
		},
		created() {
			this.getMasterList()
		},
		methods: {
			changeCurrentPageHandler(page) {
				this.pagination.page = page
				// TODO GET DATA
			},
			getMasterList() {
				this.$http.post(this.Api.POST_MASTER_LIST, this.$qs.stringify({
					page: this.pagination.page,
				})).then(response => {
					this.masterList = response.data
					this.pagination.pageCount = response.pagetotal
					console.log(response)
					console.log('3333')
				}).catch(error => {})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.master-list-wrap
		.master-list-container
			width 1100px
			height auto 
			margin auto

		.master-list-pagination
			padding 20px 0 30px 0
</style>

