<template>
	<view class="H_100vh bg_000">
		<headerTop title="推荐视频" showBack="true"></headerTop>
		<view class="fixed WH_100 flex_colC" style="top: 0;">
			<video id="myVideo" class="H_100 W_100 object_fit_contain" :src="videoURL" controls></video>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	export default {
		data() {
			return {
				videoURL: ''
			}
		},

		onLoad() {
			this.videoURL = this.$parseURL().video;
			console.log(this.videoURL);
			this.videoContext = wx.createVideoContext('myVideo', this);
			this.videoContext.requestFullScreen();
			this.videoContext.play();
		},
		onReady() {

			// this.videoContext = wx.createVideoContext('myVideo', this);

			// this.videoContext.requestFullScreen({
			// 	direction: 90
			// });

		},
		created() {
			// console.log(this.$parseURL())
		},
		methods: {

		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
