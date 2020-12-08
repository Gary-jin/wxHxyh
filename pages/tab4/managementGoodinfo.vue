<template>
	<view class="" v-if="goodsInfo && goodsInfo.g_info.goods_id">
		<view class="WH_8vw B_radius_max flex_colC z_index_1000 fixed textC" @click="back()" style="top: 4%;left: 5%;background-color: rgba(0,0,0,0.5);">
			<view class="iconfont color_fff fontS_14">
				&#xe724;
			</view>
		</view>
		<view class="relative">

			<view class="W_100 H_100vw absolute" style="top: 0;z-index: 0;">
				<view class="uni-padding-wrap WH_100">
					<view class="page-section swiper WH_100">
						<view class="page-section-spacing WH_100">
							<swiper class="swiper WH_100" :indicator-dots="indicatorDots" :autoplay="autoplay" circular="true" :interval="interval"
							 :duration="duration">
								<!-- 								<swiper-item v-for="(item,index) in goodsInfo.banner_imgs" :key="index">
									<view class="swiper-item uni-bg-red WH_100">
										<image :src="item" class="WH_100" mode=""></image>
									</view>
								</swiper-item> -->
								<swiper-item v-for="(item,index) in goodsInfo.banner_imgs" :key="index">
									<view class="swiper-item uni-bg-red WH_100">
										<video class="WH_100" @play="videoPlay" @pause="videoPause" :enable-play-gesture="true" :src="goodsInfo.banner_imgs[0]"
										 v-if="index == 0 && goodsInfo.g_info.video_url != ''" controls></video>
										<view class="WH_100 flex_colC">
											<image :src="item" class="WH_100 object_fit_contain" style="height: 100%;" :mode="mode"></image>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>

			<view class="H_100vw">

			</view>
			<view class="bg_ff5126 z_index_200 PT_2 PB_1 PLR_3 flex_row_between color_fff relative" style="z-index: 0;">
				<view class="">
					<view class="flex_rowL">
						<view class="fontS_20 font_weight_bold PR_2">￥{{goodsInfo.spe_price}}</view>
						<view class="fontS_12 text_decoration_line-through">￥{{goodsInfo.shop_price}}</view>
					</view>
					<text class="fontS_12">{{goodsInfo.g_info.str5}}</text>
				</view>
				<view class="textR fontS_12 flex_cols_start">
					<text>{{goodsInfo.g_info.str3}} </text>
					<text>{{goodsInfo.g_info.str4}}</text>
				</view>
			</view>
			<view class="PLR_2 BB_5_f2f2f2">
				<view class="flex_row_between PTB_2">
					<view class="text_overflow_2 W_70 fontS_16">{{goodsInfo.goods_name}}</view>
					<!-- <view class="P_1 fontS_10 B_1_bbb B_radius_max">加入购物车</view> -->
				</view>
				<view class="flex_row_between color_999 fontS_12 PB_2">
					<view>{{goodsInfo.g_info.str6}}</view>
					<view>{{goodsInfo.g_info.str7}}</view>
					<view>{{goodsInfo.g_info.str8}}</view>
				</view>
			</view>

			<view class="PTB_2 PL_2">
				宝贝详情
			</view>
			<view class="flex_colC W_100">
				<image class="W_100" v-for="(item,index) in goodsInfo.imgs" :key="index" style="display: block;"
				 :src="item" :mode="mode"></image>
			</view>




		</view>


		<view class="fixed W_100 flex_rowR" style="bottom: 0;background-color: rgba(0,0,0,0.6);">
			<view class="PLR_3 PTB_2 B_radius_5 flex_row_between color_fff fontS_12 W_50">
				<view class="flex_colC PLR_1" @click="$openPage({name:'managementEditgood',query:{id:gId,type:'edit',times:times,adm:admin}})">
					<image class="WH_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon1.png" mode=""></image>
					<view>编辑</view>
				</view>
				<view class="flex_colC PLR_1" @click="upAndDowngoods">
					<image class="WH_6vw MB_1" :src="goodsInfo.g_info.is_ground == 1 ? img1 : img2" mode=""></image>
					<view>{{goodsInfo.g_info.is_ground == 1 ? '下架' : '上架'}}</view>
				</view>
				<view class="flex_colC PLR_1" @click="delGood">
					<image class="WH_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon3.png" mode=""></image>
					<view>删除</view>
				</view>
				<view class="flex_colC PLR_1" @click="refGood">
					<image class="WH_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon4.png" mode=""></image>
					<view>刷新</view>
				</view>
			</view>
		</view>

	</view>
	<view class="" v-else>
		<van-skeleton title row="10" />
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		refreshGoods,
		delGoods,
		upAndDownGoods,
		managerGoodsinfo
	} from '../../static/script/const.js'
	export default {
		data() {
			return {
				containerStyle: 'background-image: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0)) !important',
				headerStyle: 'background-image: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0)) !important',
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				circular: true,
				show: false,
				buy_show: false,
				mode: 'widthFix',
				attr1: ['白色', '黑色', '绿色', '蓝色'],
				checkIdx: 0,
				attr2: ['35', '36', '37', '38', '39', '40', '41'],
				gId: '',
				goodsInfo: {},
				img1: 'http://qnyimages.hexieyihao.vip/Management_icon2.png',
				img2: 'http://qnyimages.hexieyihao.vip/upGoods.png',
				times: '',
				admin:''
			}
		},
		onLoad() {
			this.gId = this.$parseURL().id;
			this.times = this.$parseURL().times;
			this.admin = this.$parseURL().adm;
			this.getGoodsinfo();
			let that = this;
			uni.$on('Editgoodupdate',function(data){
				that.getGoodsinfo();
			})

		},
		methods: {
			videoPlay(e) {
				// console.log(e);
				if (e.type == 'play') {
					this.autoplay = false;
				}
			},
			videoPause(e) {
				console.log(e.type);
				if (e.type == 'pause') {
					this.autoplay = true;
				}
			},
			getGoodsinfo() {
				let that = this;
				let param = {
					'goods_id': this.gId
				}
				api._post(managerGoodsinfo, param).then((res) => {
					// if (res.code == 0) {
					// 	that.goodsInfo = res.data;
					// 	console.log(res)
					// }
					// return
					if (res.code == 0) {
						if (res.data.g_info.video_url != '') {
							res.data.banner_imgs.unshift(res.data.g_info.video_url.replace(/"/g, ''));
							that.goodsInfo = res.data;
							console.log(that.goodsInfo.banner_imgs)
						} else {
							that.goodsInfo = res.data;
						}
						
					}
				})
			},
			checkidx(index) {
				this.checkIdx = index;
			},
			delGood() {
				let param = {
					'goods_id': this.gId
				}
				api._post(delGoods, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			refGood() {
				let param = {
					'goods_id': this.gId
				}
				api._post(refreshGoods, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						// this.getManagement();
						// this.getGoodslist();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			upAndDowngoods() {
				let ground;
				if (this.goodsInfo.g_info.is_ground == 1) {
					ground = 0;
				} else {
					ground = 1;
				}
				let param = {
					'goods_id': this.gId,
					'is_ground': ground
				}
				api._post(upAndDownGoods, param).then((res) => {
					if (res.code == 0) {
						// this.goodsInfo.g_info.is_ground = !this.goodsInfo.g_info.is_ground;
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						this.getGoodsinfo();
						// this.getGoodslist();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
		components: {
			headerTop,
		}
	}
</script>

<style>
	.name {
		color: #000000 !important;
	}
</style>
