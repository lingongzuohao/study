<template>
	<div class="divination-wrap">
		<el-button @click="showVideoChatDialog">视频</el-button>
		<el-dialog
			:visible.sync="videoChatDialogVisible"
			width="700px"
		>
			<VideoChat />
		</el-dialog>
		
	</div>
</template>

<script>

	import VideoChat from '../components/videoChat.vue'

	export default {
		data() {
			return {
				videoChatDialogVisible: false,
				i: 0,
			}
		},
		components: {
			VideoChat,
		},
		methods: {
			toggleVideoChatDialog() {
				this.videoChatDialogVisible = !this.videoChatDialogVisible
			},
			showVideoChatDialog() {
				this.toggleVideoChatDialog()
			},
			
		}
	}
</script>

<style lang="stylus">
	.personal-center-dialog
		.el-dialog__body
			padding 30px 0
</style>

