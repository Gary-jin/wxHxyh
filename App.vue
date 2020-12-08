<script>
	export default {

		onLaunch() {
			uni.removeStorageSync('pid');
			// console.log('aaaa')
			// console.log(uni.getStorageSync('pid'));
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {

				// 请求完新版本信息的回调
				console.warn('hasUpdate',res.hasUpdate);
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});



			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，但下载失败，请检查网络设置？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
		},
		onShow() {
			// console.log('App Show')
		},
		onHide() {
			// console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/common.css");
	@import url("static/css/iconfont.css");
	@import "/wxcomponents/vant/dist/common/index.wxss";

	::-webkit-scrollbar {
		display: none;
	}
</style>
