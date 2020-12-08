<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<headerTop title="发表评论" showBack="true"></headerTop>
		<view class="P_2">
			<view class="bg_fff B_radius_5 PTB_3 PLR_2">
				<view class="">
					<view class="flex_rowL">
						<image class="WH_14vw B_radius_5" :src="goods.img" mode=""></image>
						<view class="flex_grow_1 W_70 PL_2">
							<view class="text_overflow_1">{{goods.goods_name}}</view>
							<view class="flex_rows_start">
								<view class="fontS_12 color_999" v-for="(j,k) in goods.attr_list" :key="k">
									{{j}}
								</view>
							</view>
						</view>
					</view>
					<view class="">
						<view class="flex_rowL PTB_3" >
							<view class="PR_2">
								描述相符
							</view>
							<view class="" v-if="goods.comment_info && goods.is_comment == 0">
							<!-- <view class="" v-if="item.is_comment == 0"> -->
								<van-rate :value="goods.comment_info.star" :disabled="goods.is_comment == 1"	 size="22" color="#ED2251" void-color="#c1c1c1" void-icon="star" gutter="8" @change="change" />
							</view>
							<view class="" v-else>
								<van-rate :value="goods.comment_info.star" :disabled="goods.is_comment == 0" readonly="true" size="22" color="#ED2251" void-icon="star" gutter="8"/>
							</view>
							<view class="color_ED2251 PL_3" v-if="goods.comment_info.star">
								{{getType(goods.comment_info.star)}}
							</view>
						</view>
						<view class="H_20vw bg_f8f8f8 B_radius_5">
							<textarea class="WH_100 P_1" v-if="goods.is_comment == 0" name="" v-model="goods.comment_info.content" id="" cols="30" placeholder="请输入宝贝评价" rows="10"></textarea>
							<textarea class="WH_100 P_1" v-else name="" disabled v-model="goods.comment_info.content" id="" cols="30" placeholder="请输入宝贝评价" rows="10"></textarea>
						</view>
						
						<view class="PTB_3" v-if="goods.is_comment == 0">
							<van-uploader :file-list="fileList" @delete="beforeDelete" multiple="true"  max-count="3" @after-read="afterRead" />
						</view>
						<view class="PTB_3 flex_rowL"  v-else>
							<view class="W_30 flex_rowL" v-for="(asset,idx) in goods.comment_info.imgs" @click="checkImg(index)" :key="idx">
								<image class="WH_24vw" :src="asset" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<view class="flex_rowC MB_2" v-if="goods.is_comment == 0">
						<view class="bg_ED2251 color_fff B_radius_max W_80 PTB_2 textC" @click="submit()">
							提交评价
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		submitComments,
		orderInfo,
		getQNYtoken
	} from '../../static/script/const.js';
	import {
		init,
		upload
	} from '../../static/script/qiniuUploader.js';
	export default {
		data() {
			return {
				value: 0,
				fileList: [],
				file:[],
				oId: '',
				order: {},
				gId: '',
				remark: '',
				type:['album', 'camera'],
				checkIdx:-1,
				rateIdx:0,
				goods:{}
			}
		},
		onLoad() {
			this.oId = this.$parseURL().oid;
			// this.gid = this.$parseURL().goods.goods_id;
			this.goods = this.$parseURL().goods;
			console.log(this.$parseURL().goods);
			// this.getOrder();
		},
		methods: {
			getOrder() {
				let that = this;
				let param = {
					'order_id': that.oId
				}
				api._post(orderInfo, param).then((res) => {
					if (res.code == 0) {
						res.data.info.goods_list.forEach((item,index)=>{
							(item.comment_info.star).toString()
						})
						that.order = res.data.info;
						console.log(that.order.goods_list[0].comment_info.star)
					}
				})
			},
			submit() {
				let that = this;
				if(that.goods.comment_info.star === '0'){
					that.goods.comment_info.star = 5;
				}
				if(!that.goods.comment_info.content) {
					uni.showToast({
						title:'您还没有输入评价内容哦！',
						icon:'none',
						duration:1500
					});
					return
				}
				let param = {
					'goods_id':that.goods.goods_id,
					'star':that.goods.comment_info.star,
					'img1':that.file[0],
					'img2':that.file[1],
					'img3':that.file[2],
					'remark':that.goods.comment_info.content,
					'order_id':that.oId
				}
				api._post(submitComments,param).then((res)=>{
					if(res.code == 0){
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						});
						this.getOrder();
						that.file = [];
						param = {};
						// return
						uni.navigateBack({
						    delta: 1
						});
					}
				})
			},
			change(e) {
				this.value = e.detail;
				this.goods.comment_info.star = e.detail;
			},
			initQniu(data) {
				init({
					region: 'ECN', // 华南
					// ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
					uptoken: data.token,
					domain: data.host, // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
					shouldUseQiniuFileName: false
				});
			},
			getIdx(item,index){
				this.checkIdx = index;
				this.fileList = item.comment_info.imgs;
				console.log(this.checkIdx)
			},
			afterRead(e) {
				console.log(e.detail.file);
				
				let imgArr = e.detail.file;
				
				imgArr.forEach((item)=>{
					this.uploadImg(item.path);
				})
			
			},
			uploadImg(file){
				api._post(getQNYtoken, {}).then((res) => {
					if (res.code == 0) {
						this.initQniu(res.data)
						upload(file, (ret) => {
							// console.log(res.data.host + '/' + ret.key);
							this.fileList.push({
								url: res.data.host + '/' + ret.key
							});
							this.file.push(res.data.host + '/' + ret.key);
							this.goods.comment_info.imgs = this.file;
							// console.log(this.file);
						})
					}
				})
			},
			beforeDelete(file) {
				var that = this;
				// console.log(JSON.stringify(file.content));
				console.log('111')
				var book_name = that.fileList;
				var i = book_name.indexOf(file.url);
				book_name.splice(i, 1);
				that.fileList = book_name;
				that.file = [];
				for(let i in book_name){
					console.log(book_name[i].url);
					that.file = that.file.concat(book_name[i].url)
				}
				console.log(that.file);
			},
			getType(status) {
				var type = '';
				switch (status) {
					case 1:
						type = '很差';
						break;
					case 2:
						type = '差';
						break;
					case 3:
						type = '一般';
						break;
					case 4:
						type = '很好';
						break;
					case 5:
						type = '非常好';
						break;
				}
				return type
			},
			checkImg(index){
				uni.previewImage({
					current:index,
				    urls: this.goods.comment_info.imgs,
				    longPressActions: {
				        itemList: ['保存图片'],
				        success: function(data) {
				            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				        },
				        fail: function(err) {
				            console.log(err.errMsg);
				        }
				    }
				});
			},
		},
		components: {
			headerTop,
		}
	}
</script>

<style>
	.van-icon{
		font-size: 28px;
	}
	.van-uploader {
		position: relative;
		display: inline-block;
		width: 100%;
	}
	.van-uploader__preview{
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
	.van-uploader__upload{
		margin-left: 16upx !important;
		margin-bottom: 16upx !important;
	}
	.van-icon{
		left: -8rpx;
	}
</style>
