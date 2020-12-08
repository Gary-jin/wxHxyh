<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2 H_100vh">
		<headerTop title="设置" showBack="true"></headerTop>
		<view class="bg_fff">
			<view class="flex_row_between P_3 BB_1_f2f2f2">
				<view>头像</view>
				<view class="flex_grow_1 flex_rowR PR_2">
					<image v-if="userInfo.avatar" class="WH_10vw B_radius_max" :src="userInfo.avatar" mode=""></image>
				</view>
				<!-- <view class="iconfont color_999">&#xe600;</view> -->
			</view>
			<view class="flex_row_between PTB_2 PLR_3 BB_1_f2f2f2">
				<view>昵称</view>
				<view class="flex_grow_1 textR PR_2 color_999" v-if="userInfo.nickname">
					{{userInfo.nickname}}
				</view>
				<!-- <view class="iconfont color_999">&#xe600;</view> -->
			</view>
			<view class="flex_row_between PTB_2 PLR_3 BB_1_f2f2f2">
				<view>我的手机号</view>
				<view class="flex_grow_1 textR PR_2 color_999">
					{{userInfo.mobile ? userInfo.mobile : '未绑定'}}
				</view>
			</view>
			<view class="flex_row_between PTB_2 PLR_3 BB_1_f2f2f2" @click="$openPage({name:'shopSelectAddress'})">
				<view>收货地址</view>
				
				<view class="iconfont color_999">&#xe600;</view>
			</view>
			<view class="flex_row_between PTB_2 PLR_3 BB_5_f2f2f2" @click="$openPage({name:'bindAliPay',query:{data:dataList}})">
				<view>{{dataList.has_bind_ali === 0 ? '绑定' : '修改'}}支付宝</view>
				
				<view class="flex_rowR">
					<view class="PR_2 color_999">
						{{dataList.has_bind_ali === 0 ? '未绑定' : '已绑定'}}
					</view>
					<view class="iconfont color_999">&#xe600;</view>
				</view>
			</view>
			<view class="flex_row_between PTB_2 PLR_3 BB_5_f2f2f2" @click="$openPage({name:'articleInfo',query:{type:2}})">
				<view>关于我们</view>
				
				<view class="iconfont color_999">&#xe600;</view>
			</view>
			<view class="PTB_3 textC" @click="loginOut">
				注销登录
			</view>
		</view>
	</view>
</template>

<script>
    import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		userInfo
	} from '../../static/script/const.js';
    export default {
        data() {
            return {
				userInfo:{},
				isBind:0,
				dataList:{}
            }
        },
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
			uni.$on('bindAlipay',(res)=>{
				this.getUserInfo();
			})
			console.log(this.userInfo)
		},
		onShow() {
			this.getUserInfo();
		},
        methods: {
			getUserInfo() {
				let that = this;
				api._post(userInfo).then((res) => {
					if (res.code == 0) {
						that.dataList = res.data.info;
					}
				})
			},
			loginOut(){
				uni.clearStorage();
				this.$openPage({name:'login'})
			}
        },
        components: {
            headerTop,
        }
    }
</script>

<style>


</style>
