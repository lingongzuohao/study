<template>
	<div class="master-list-content">
		<div
			class="master-list-item"
			v-for="(master, index) in masterList"
			:key="index"
			@click="go2MasterDetail(master.id)"
		>
			<div class="master-detail-img">
				<img :src="baseImgeUrl + master.logo" alt="" width="267px" height="170px">
			</div>
			<div class="master-detail-text-wrap">
				<div class="master-detail-name">
					<span>{{master.name}}</span>
					<span :class="['master-status', master.status == 1 ? 'online' : 'offline']">{{master.status == 1 ? '在线' : '离线'}}</span>
				</div>
				<div class="master-detail-tag">
					<el-tag 
						v-for="(tag, index) in master.mark"
						:key="index"
						size="mini"
						class="tag-item"
					>{{tag}}</el-tag>
				</div>
				<div class="master-detail-desc">
					<p>{{master.description}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			masterList: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				baseImgeUrl: 'https://www.51dashizaixian.com'
			}
		},
		methods: {
			go2MasterDetail(id) {
				this.$router.push('/master?id=' + id)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.master-list-content
		display flex
		justify-content flex-start
		align-items center
		flex-wrap wrap
		padding-top 10px

		.master-list-item
			width 267px
			height auto
			flex-shrink 1
			flex-grow 0
			margin-right 10px
			margin-top 10px
			cursor pointer

			&:nth-child(4n)
				margin-right 0

			.master-detail-img
				width 100%
				height 170px
				overflow hidden

				img
					transition .5s ease transform
					&:hover
						transform scale(1.1)
				

			.master-detail-text-wrap
				padding 10px 5px

				.master-detail-name 
					display flex
					justify-content space-between
					align-items center
					font-size 18px

					.master-status
						font-size 12px
						padding 2px 10px
						color #ffffff
						background-color #5f3736
						border-radius 4px

						&.offline
							background-color #cccccc

				.master-detail-tag
					text-align left 
					margin-top 10px

					.tag-item
						margin-right 10px

				.master-detail-desc
					margin-top 10px
					color #5f5f5f
					font-size 12px
					text-align left
</style>

