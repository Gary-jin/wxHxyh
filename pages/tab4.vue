<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<headerTop title="个人中心"></headerTop>
		<view class="bg_ff5126 PTB_3 PLR_2 color_fff flex_rowR">
			<view class="flex_rowC" @click="signIn">
				<view class="qidaoBox color_red fontS_12 flex_rowC">
					<view class="W_100 textC flex_rowC">
						<view>{{is_sign == 0 ? '点击签到':'今日已签到' }}</view>
					</view>
				</view>
				<image src="https://qnyimages.hexieyihao.vip/qd.png" class="WH_6vw PR_1" mode=""></image>
			</view>
			<view class="iconfont fontS_22" @click="$openPage({name:'setting'})">
				&#xe608;
			</view>
		</view>
		<view class="flex_colC H_40vw PT_5">
			<view class="bg_ff5126 PTB_3 W_100 relative" style="top: -4rpx;"></view>
			<view class="bg_fff W_95 relative B_radius_5 " style="top: -9vw;">
				<view class="flex_row_between">
					<view class="flex_rowL W_70">
						<image v-if="is_login && dataList.avatar" :src="dataList.avatar" class="WH_20vw B_radius_10 MLR_3 relative" style="top: -6vw;"
						 mode=""></image>
						<image v-else src="http://qnyimages.hexieyihao.vip/logo_img.jpg" class="WH_20vw B_radius_10 MLR_3 relative" style="top: -6vw;"
						 mode=""></image>
						<view class="W_55 H_20vw">
							<view v-if="is_login" class="fontS_18 W_100 textL font_weight_bold PT_2 PB_1 text_overflow_1">{{dataList.nickname}}</view>
							<view v-else class="fontS_18 W_100 textL font_weight_bold PT_2 PB_1" @click="login">去登录</view>
							<view class="iconfont flex_rowL" v-if="dataList.mobile">&#xe76a; <view class="fontS_12">{{dataList.mobile}}</view>
							</view>
						</view>
					</view>
					<view class="MR_3 flex_grow_1">
						<view class="fontS_12 B_1_999 B_radius_5 textC MB_1" v-if="dataList.identity_str !== 1">
							{{getType(dataList.identity_str)}}
						</view>
						<view class="fontS_12 B_1_999 B_radius_5 textC MB_1" v-if="dataList.is_worker === 1">
							工作人员
						</view>
					</view>
				</view>

				<view class="flex_row_between BB_1_f2f2f2">
					<view class="flex_rowL W_50 PL_3">
						<view class="flex_colC">
							<view class="fontS_12">我的余额</view>
							<view class="color_FF0000 PTB_2 font_weight_bold">￥{{ is_login ? dataList.balance : '0'}}</view>
						</view>
					</view>
					<view class="flex_row_around">
						<view class="flex_rowL PR_3">
							<view class="flex_colC">
								<view class="fontS_12">累计收入</view>
								<view class="color_FF0000 PTB_2 font_weight_bold">￥{{ is_login ? dataList.total_in : '0'}}</view>
							</view>
						</view>
						<view class="flex_rowL PR_3">
							<view class="flex_colC">
								<view class="fontS_12">已提现</view>
								<view class="color_FF0000 PTB_2 font_weight_bold">￥{{ is_login ? dataList.already_withdraw : '0'}}</view>
							</view>
						</view>
					</view>
				</view>

				<view class="flex_row_between PLR_3 PTB_2" @click="$openPage({name:'drawbalanceRecord'})">
					<view>提现记录</view>
					<view class="flex_rowL">点击查看 <view class="iconfont fontS_14">&#xe600;</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的积分 -->
		<view class="flex_colC W_100 MB_2">
			<view class="W_95 bg_fff B_radius_10">
				<view class="D_flex BB_1_f2f2f2">
					<view class="W_33">
						<view class="PT_3 PB_2 PL_4">今日积分</view>
						<view class="D_flex PL_4 PB_2" style="height: 45rpx;">
							<view class="PR_2 color_FF0000 font_weight_bold">￥{{dataList.today_score}}</view>
							<!-- <view class="jifenQP flex_rowC color_fff">
								<view class="W_100 PL_2">+{{dataList.today_score}}</view>
							</view> -->
						</view>
					</view>
					<view class="W_33">
						<view class="PT_3 PB_2 PL_2">我的积分</view>
						<view class="D_flex PL_2 PB_2" style="height: 45rpx;">
							<view class="PR_2 color_FF0000 font_weight_bold">￥{{dataList.score}}</view>
						</view>
					</view>
					<view class="W_33 flex_colC" @click="$openPage({name:'articleInfo',query:{type:5}})" >
						<view class="PLR_2 PTB_1 color_fff fontS_10 B_radius_5 bg_red">查看规则</view>
					</view>
				</view>
				<view class="flex_row_between W_100 " @click="$openPage({name:'integralRecord'})">
					<view class="PTB_2 fontS_12 PL_4">积分记录</view>
					<view class="PTB_2 flex_rowL clolo_999 PR_3">点击查看 <view class="iconfont fontS_14">&#xe600;</view></view>
				</view>
			</view>
		</view>

		<view class="PLR_1 flex_row_between">
			<view class="W_50 flex_rowC">
				<view class="W_46vw H_20vw" @click="$openPage({name:'earningsDetail'})">
					<image class="WH_100" src="http://qnyimages.hexieyihao.vip/tab4_left.png" mode=""></image>
				</view>
			</view>
			<view class="W_50 flex_rowC">
				<view class="W_46vw H_20vw" @click="$openPage({name:'drawBalance',query:{scale:dataList.withdraw_cost_percent}})">
					<image class="WH_100" src="http://qnyimages.hexieyihao.vip/tab4_right.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="PLR_2  MTB_2">
			<view class="bg_fff PTB_3 B_radius_5">
				<view class="PLR_2 PB_3 flex_row_between BB_1_f2f2f2" @click="$openPage({name:'order',query:{idx:5}})">
					<view>我的订单</view>
					<view class="flex_rowL">点击查看<view class="iconfont fontS_14">&#xe600;</view></view>
				</view>
				<view class="PT_3 flex_row_between">
					<view class="W_20 flex_rowC" @click="$openPage({name:'order',query:{idx:5}})">
						<view class="flex_colC relative flex_grow_1">
							<image src="http://qnyimages.hexieyihao.vip/order_icon1.png" class="WH_6vw MB_1" mode=""></image>
							<view>全部订单</view>
							<view class="bg_red color_fff fontS_10 WH_4vw B_radius_max absolute textC" v-if="counList[0] > 0" style="top: -15%;right: 5%;">
								{{counList[0]}}
							</view>
						</view>
					</view>
					<view class="W_20 flex_rowC" @click="$openPage({name:'order',query:{idx:0}})">
						<view class="flex_colC relative flex_grow_1">
							<image src="http://qnyimages.hexieyihao.vip/order_icon2.png" class="WH_6vw MB_1" mode=""></image>
							<view>待付款</view>
							<view class="bg_red color_fff fontS_10 WH_4vw B_radius_max absolute textC" v-if="counList[1] > 0" style="top: -15%;right: 5%;">
								{{counList[1]}}
							</view>
						</view>
					</view>
					<view class="W_20 flex_rowC" @click="$openPage({name:'order',query:{idx:1}})">
						<view class="flex_colC relative flex_grow_1">
							<image src="http://qnyimages.hexieyihao.vip/order_icon3.png" class="WH_6vw MB_1" mode=""></image>
							<view>待发货</view>
							<view class="bg_red color_fff fontS_10 WH_4vw B_radius_max absolute textC" v-if="counList[2] > 0" style="top: -15%;right: 5%;">
								{{counList[2]}}
							</view>
						</view>
					</view>
					<view class="W_20 flex_rowC" @click="$openPage({name:'order',query:{idx:2}})">
						<view class="flex_colC relative flex_grow_1">
							<image src="http://qnyimages.hexieyihao.vip/order_icon4.png" class="WH_6vw MB_1" mode=""></image>
							<view>待收货</view>
							<view class="bg_red color_fff fontS_10 WH_4vw B_radius_max absolute textC" v-if="counList[3] > 0" style="top: -15%;right: 5%;">
								{{counList[3]}}
							</view>
						</view>
					</view>
					<view class="W_20 flex_rowC" @click="$openPage({name:'order',query:{idx:4}})">
						<view class="flex_colC relative flex_grow_1">
							<image src="http://qnyimages.hexieyihao.vip/order_icon5.png" class="WH_6vw MB_1" mode=""></image>
							<view>退货换货</view>
							<view class="bg_red color_fff fontS_10 WH_4vw B_radius_max absolute textC" v-if="counList[4] > 0" style="top: -15%;right: 5%;">
								{{counList[4]}}
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<view class="bg_fff PLR_2">
			<view class="flex_row_between PTB_3 BB_1_f2f2f2" v-if="dataList.level == 5">
				<view class="flex_rowL PL_1">
					<image src="http://qnyimages.hexieyihao.vip/tab4_icon1.png" class="WH_6vw" mode=""></image>
					<view class="PL_2">
						指定董事长商品管理
					</view>
				</view>
				<view class="PTB_1 PLR_2 textC bg_FF4646 color_fff fontS_12 B_radius_5 MR_2" @click="$openPage({name:'managementZdDsz',query:{admin:dataList.is_goods_admin}})">点击前往</view>
			</view>
			<view class="flex_row_between PTB_3 BB_1_f2f2f2" v-if="dataList.is_goods_admin === 1 || dataList.is_goods_admin === 2">
				<view class="flex_rowL PL_1">
					<image src="http://qnyimages.hexieyihao.vip/tab4_icon1.png" class="WH_6vw" mode=""></image>
					<view class="PL_2">
						商品管理
					</view>
				</view>
				<view class="PTB_1 PLR_2 textC bg_FF4646 color_fff fontS_12 B_radius_5 MR_2" @click="$openPage({name:'management',query:{admin:dataList.is_goods_admin}})">点击前往</view>
			</view>
			<view class="flex_row_between PTB_3 BB_1_f2f2f2" @click="$openPage({name:'myTeam'})">
				<view class="flex_rowL PL_1">
					<image src="http://qnyimages.hexieyihao.vip/tab4_icon2.png" class="WH_6vw" mode=""></image>
					<view class="PL_2">
						我的团队
					</view>
				</view>
				<view class="iconfont PR_1">&#xe600;</view>
			</view>
			<view class="flex_row_between PTB_3 BB_1_f2f2f2" @click="$openPage({name:'myCode'})" v-if="dataList.level == 3 || dataList.level == 4 || dataList.level == 5">
				<view class="flex_rowL PL_1">
					<image src="http://qnyimages.hexieyihao.vip/tab4_icon3.png" class="WH_6vw" mode=""></image>
					<view class="PL_2">
						邀请成为总经理二维码
					</view>
				</view>
				<view class="iconfont PR_1">&#xe600;</view>
			</view>
			<view class="flex_row_between PTB_3 BB_1_f2f2f2" @click="$openPage({name:'myCodept'})" >
				<view class="flex_rowL PL_1">
					<image src="http://qnyimages.hexieyihao.vip/tab4_icon3.png" class="WH_6vw" mode=""></image>
					<view class="PL_2">
						邀请成为消费者二维码
					</view>
				</view>
				<view class="iconfont PR_1">&#xe600;</view>
			</view>
			<view class="flex_row_between PTB_3 BB_1_f2f2f2" @click="$openPage({name:'service',query:{is_service:dataList.is_service}})">
				<view class="flex_rowL PL_1">
					<image src="http://qnyimages.hexieyihao.vip/tab4_icon4.png" class="WH_6vw" mode=""></image>
					<view class="PL_2">
						客服
					</view>
				</view>
				<view class="iconfont PR_1">&#xe600;</view>
			</view>
			<view class="flex_row_between PTB_3 BB_1_f2f2f2" @click="$openPage({name:'officialAccounts'})">
				<view class="flex_rowL PL_1 W_50">
					<image src="http://qnyimages.hexieyihao.vip/tab4_icon5.png" class="WH_6vw" mode=""></image>
					<view class="PL_2">
						关注公众号
					</view>
				</view>
				<view class="flex_rowL W_50">
					<view class="fontS_12 color_999">
						关注公众号之后
						才会收到商品佣金提示
					</view>
					<view class="iconfont PR_1">&#xe600;</view>
				</view>

			</view>
		</view>

		<van-popup  @click.stop :show="signShow" overlay-style="background-color: rgba(0,0,0,0.8)" custom-style="width: 80%; border-radius: 10rpx;">
				<view class="PLR_3">
					<view class="W_100 textC" style="height: 150rpx;line-height:150rpx;">
						<view>已获得积分，积分可免费得礼品</view>
					</view>
					<view class="W_100 flex_rowC" style="height: 130rpx;">
						<view class="PTB_2 PLR_10 B_radius_5 bg_FF4646 color_fff" @click="signShow = false"> 
							我已知晓
						</view>
					</view>
				</view>
			</van-popup>

	</view>
</template>

<script>
	import headerTop from '../components/headerTop/headerTop.vue';
	// import Dialog from '../wxcomponents/vant/dist/dialog/dialog.js'
	import api from '../static/script/ajax.js';
	import {
		userInfo,
		orderCount,
		getShoppingCartlist,
		userSignIn
	} from '../static/script/const.js'
	export default {
		data() {
			return {
				counList: [],
				dataList: {},
				link: '',
				is_login: true,
				is_sign:'',
				signShow : false
			}
		},
		onShow() {
			this.getUserInfo();
			this.getCount();
			this.getShoppingCart();
		},
		onPullDownRefresh() {
			this.getUserInfo();
			this.getCount();
		},
		methods: {
			getUserInfo() {
				let that = this;
				api._post(userInfo).then((res) => {
					if (res.code == 0) {
						that.dataList = res.data.info;
						that.is_login = true;
						that.is_sign = res.data.info.is_sign
						uni.setStorageSync('userInfo', res.data.info);
					} else if (res.code == 1) {
						that.is_login = false;
					}
				})
			},
			getCount() {
				api._post(orderCount, {}).then((res) => {
					if (res.code == 0) {
						this.counList = res.data;
					}
				})
			},
			getType(status) {
				let type = ''
				switch (status) {
					case 0:
						type = '消费者'
						break
					// case 1:
					// 	type = '工作人员'
					// 	break
					case 2:
						type = '经理'
						break
					case 3:
						type = '总经理'
						break
					case 4:
						type = '董事长'
						break
					case 5:
						type = '指定董事长'
						break
				}
				// console.log(type);
				return type
			},
			login() {
				uni.navigateTo({
				    url: '/pages/common/login?type=delToken'
				});
			},
			getShoppingCart() {
				api._post(getShoppingCartlist, {}).then((res) => {
					if (res.code == 0) {
						// console.log(res.data.list1_total_goods_nums)
						if (res.data.list1_total_goods_nums > 0) {
							uni.setTabBarBadge({
								index: 2,
								text: (res.data.list1_total_goods_nums).toString()
							})
						} else {
							uni.removeTabBarBadge({
								index: 2,
							})
						}
					}
				})
			},
			signIn(){
				api._post(userSignIn).then((res)=>{
					if(res.code == 0){
						this.signShow = true
						this.getUserInfo()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 4000
						});
					}
				})
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>
.qidaoBox{
	width: 170rpx;
	height: 45rpx;
	background: url(https://qnyimages.hexieyihao.vip/qiandao.png) 0 0 no-repeat;
	background-size: 170rpx 45rpx;
	line-height: 45rpx;
	/* padding-left: 10rpx; */
}
.jifenQP{
	width: 120rpx;
	height: 45rpx;
	background: url(https://qnyimages.hexieyihao.vip/zengjai.png) 0 0 no-repeat;
	background-size: 120rpx 45rpx;
	line-height: 45rpx;
}
</style>
