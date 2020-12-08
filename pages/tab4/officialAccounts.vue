<template>
	<view class="flex_colT flex_items_stretch H_100vh">
		<headerTop title="关注公众号" showBack="true"></headerTop>
		<view class="H_100vh flex_colC relative">
			<image class="WH_40vw absolute" style="top: 15%;" @click="showImage" :src="link" mode=""></image>
			
			<view class=" fontS_14 PT_24 W_100 PL_10">
				<view class="font_weight_bold fontS_16 color_ED2251">
					关注“和鞋一号”公众号后的好处：
				</view>
				<view class="PTB_1 flex_rowL">
					<view class="color_ED2251 font_weight_bold">1.</view>
					<view>第一时间收到佣金到帐信息</view>	
				</view>
				<view class="PB_1 flex_rowL">
					<view class="color_ED2251 font_weight_bold">2.</view>
					<view>第一时间能收到优惠活动通知信息</view>
				</view>
				<view class="flex_rowL">
					<view class="color_ED2251 font_weight_bold">3.</view>
					<view>能及时关注到商城日常动态</view>	
				</view>	
				 
				<view class="MT_3">
					<view class="font_weight_bold fontS_16 color_ED2251">
						识别二维码流程:
					</view>
					<view class="PTB_1 flex_rowL">
						<view class="color_ED2251 font_weight_bold">1.</view>
						<view>小程序里无法直接识别二维码（腾讯公司规定）</view>
						
					</view>
					<view class="PB_1 flex_rowL">
						<view class="color_ED2251 font_weight_bold">2.</view>
						<view>需保存二维码后，再发到微信里识别</view>
						
					</view>
					<view class="PB_1 flex_rowL">
						<view class="color_ED2251 font_weight_bold">3.</view>
						<view>识别后会出来公众号二维码，再次识别一下就可以了</view>
					</view>
					<view class="flex_rowL">
						<view class="color_ED2251 font_weight_bold">4.</view>
						<view>或微信扫一扫也可以</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {getWxFocusLink} from '../../static/script/const.js';
    export default {
        data() {
            return {
				link:''
            }
        },
		onLoad() {
			this.getLink();
		},
        methods: {
			getLink(){
				api._post(getWxFocusLink,{}).then((res)=>{
					if(res.code == 0){
						this.link = res.data.url;
					}
				})
			},
			showImage(){
				let arr = [];
				arr = arr.concat(this.link)
				uni.previewImage({
				    urls: arr,
				    longPressActions: {
				        itemList: ['保存图片','识别图中二维码'],
				        success: function(data) {
				            // console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
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
