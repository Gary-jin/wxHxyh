<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop :title="title" showBack="true"></headerTop>
		<view class="PT_5 PLR_3 flex_rows_start" v-if="type == 'images' || type == 'banner'">
			<van-uploader style="width: 100%;" :file-list="fileList" multiple="true" :max-count="maxLength" @delete="beforeDelete"
			 @after-read="afterRead" />
		</view>
		<view class="PT_5 PLR_3" v-else>
			<view class="PT_5">
				<van-uploader style="width: 100%;" accept="video" :file-list="fileList" multiple="true" max-count="1" @delete="beforeDelete"
				 @after-read="afterRead" />
			</view>
		</view>
		<view class="fixed W_100 flex_rowR" style="bottom: 0;" @click="submitEdit">
			<view class="PTB_2 W_100 bg_ED2251 color_fff textC">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		imageCompress,
		imageToBase64
	} from '../../static/script/minix.js'
	import {
		getQNYtoken
	} from '../../static/script/const.js';
	import {
		init,
		upload
	} from '../../static/script/qiniuUploader.js';
	export default {
		data() {
			return {
				fileList: [],
				file: [],
				banner_file: [],
				type: '',
				maxLength: 999,
				link: '',
				title: '',
				imgList: []

			}
		},
		onLoad() {
			this.fileList = [];
			this.file = [];
			this.type = this.$parseURL().type;
			if (this.type == 'images') {
				this.title = '商品详情';
			} else if (this.type == 'banner') {
				this.title = '商品主图';
			} else {
				this.title = '推荐视频';
			}
			let arr = this.$parseURL().data;
			if (arr.length > 0) {
				arr.forEach((item, index) => {
					this.fileList.push({
						url: item
					});
					if (this.type === 'banner') {
						this.banner_file.push(arr[index]);
					} else {
						this.file.push(item);
					}
				})

			}
		},
		methods: {
			initQniu(data) {
				init({
					region: 'ECN', // 华南
					// ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
					uptoken: data.token,
					domain: data.host, // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
					shouldUseQiniuFileName: false
				});
			},
			afterRead(e) {
				// console.log(e.detail.file);
				if (this.type == 'images') {
					let imgArr = e.detail.file;
					imgArr.forEach((item) => {
						this.uploadImg(item.path);
					})
				} else if (this.type == 'banner') {
					let imgArr = e.detail.file;
					imgArr.forEach((item) => {
						this.fileList.push({
							url: item.path
						});
						this.banner_file.push(item.path);
					});
				} else {
					let videoArr = e.detail.file;
					this.uploadImg(videoArr.path);
				}
			},
			uploadImg(file) {
				api._post(getQNYtoken, {}).then((res) => {
					if (res.code == 0) {
						this.initQniu(res.data)
						upload(file, (ret) => {
							this.fileList.push({
								url: res.data.host + '/' + ret.key
							});
							this.file.push(res.data.host + '/' + ret.key);
						})
					}
				})
			},
			beforeDelete(file) {
				var that = this;
				let idx = file.detail.index;
				var book_name = that.fileList;
				book_name.splice(idx, 1);
				that.fileList = book_name;
				that.file = [];
				if (that.type === 'banner') {
					var banner = that.banner_file;
					banner.splice(idx, 1);
					that.banner_file = banner;
				} else {
					for (let i in book_name) {
						that.file = that.file.concat(book_name[i].url);
					}
				}
			},
			submitEdit() {
				let that = this;
				if (that.type === 'images') {
					uni.$emit('editImages', {
						imgs: that.file
					})

				} else if (that.type === 'banner') {
					console.log(that.banner_file);
					uni.$emit('editBanner_imgs', {
						imgs: that.banner_file,
					})
				} else {
					uni.$emit('editVideo', {
						imgs: that.file[0]
					})
				}
				uni.navigateBack({
					delta: 1
				});
			},
		},
		components: {
			headerTop,
		}
	}
</script>

<style>
	.van-uploader {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.van-uploader__preview {
		margin: 0 !important;
	}

	.van-uploader__preview {
		position: relative;
		/* margin: 0 8px 8px 0; */
		cursor: pointer;
		width: 33%;
		display: flex;
		justify-content: center;
		margin-bottom: 16upx !important;
	}

	.van-uploader__preview .van-icon-clear {
		font-size: 6.5vw;
	}

	.van-uploader__upload {
		margin-left: 16upx !important;
		margin-bottom: 16upx !important;
	}
</style>
