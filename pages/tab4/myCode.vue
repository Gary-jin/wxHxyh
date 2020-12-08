<template>
	<view class="flex_colT flex_items_stretch H_100vh bg_f2f2f2">
		<headerTop title="邀请二维码" showBack="true"></headerTop>
		<view class="flex_colC H_100vh">
			<view class="bg_fff W_80 B_radius_5">
				<view class="flex_rowC relative" style="top: -8vw;">
					<image class="WH_18vw B_radius_max " :src="dataList.headImg" mode=""></image>
				</view>
				<view class="relative" style="top: -5vw;">
					<view class="textC fontS_16 font_weight_bold">
						{{dataList.nickname}}
					</view>
					<view class="fontS_10 textC">
						{{dataList.str1}}
					</view>
					<view class="color_ED2251 textC fontS_22 font_weight_bold PTB_3">
						{{dataList.str5}}
					</view>
					<view class="PLR_3 PT_1 PB_5" style="border-bottom: #ED2251 2px dashed ;">
						<view class="flex_rowL" v-for="(item,index) in dataList.str2" :key="index">
							<view class="flex_grow_1 lineH_5 fontS_12">
								<view class="iconfont color_FFCD03 PR_1 PT_1 fontS_18" style="display: inline-block;">&#xe7a5;</view>{{item}}
							</view>
						</view>
					</view>

					<view class="flex_row_around PT_4">
						<image class="WH_26vw" @click="showImage()" :src="dataList.shareImg" mode=""></image>
						<view class="textL">
							<view>{{dataList.str3}}</view>
							<view>{{dataList.str4}}!</view>
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
		getMycode
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				dataList:{}
			}
		},
		onLoad() {
			this.getCode();
		},
		methods: {
			getCode() {
				let that = this;
				api._post(getMycode,{}).then((res)=>{
					if(res.code == 0){
						that.dataList = res.data;
					}
				})
			},
			showImage(){
				let arr = [];
				arr = arr.concat(this.dataList.shareImg)
				uni.previewImage({
				    urls: arr,
				    longPressActions: {
				        itemList: ['保存图片','识别图中二维码'],
				        success: function(data) {
				            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				        },
				        fail: function(err) {
				            console.log(err.errMsg);
				        }
				    }
				});
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
