<template>
	<view class="flex_colT flex_items_stretch H_100vh">
		<headerTop title="【和鞋一号】严选商城"></headerTop>
		<view class="H_50 flex_colC">
			<view class="H_16vw W_42vw">
				<image class="WH_100" src="http://qnyimages.hexieyihao.vip/logo.png" mode=""></image>
			</view>
		</view>
		<button class=" bg_ff5126 color_fff fontS_16 textC B_radius_5 W_40 MLR_auto" open-type="getUserInfo" @getuserinfo="getuserinfo">
			微信安全登录
		</button>
		<view class=" MT_5 cancel color_000 PTB_2 fontS_14 textC B_radius_5 W_40 MLR_auto" @click="back">
			暂不登录
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from 'static/script/ajax.js'
	import {
		getUserinfo,
		validateToken
	} from '../../static/script/const.js'
	import {
		getQueryString
	} from '../../static/script/minix.js';
	export default {
		data() {
			return {
				param: {
					js_code: '',
					avatar: '',
					nickname: '',
					sex: '',
					pid: '',
					type: '',
					goods_id: '',
					deltoken: ''
				}
			}
		},
		onLoad(options) {
			//在此函数中获取扫描普通链接二维码参数
			// console.log(uni.getStorageSync('pid') + 'login');
			console.log("****123****")
			console.warn(options)
			if(uni.getStorageSync('token') && options.type == 'xfz'){
					console.log("****12321****")
				this.newGoin()
			}else{
				if (options.type) {
					if (options.type === 'delToken') {
						this.deltoken = options.type;
						if(uni.getStorageSync('pid')) {
							this.pid = uni.getStorageSync('pid');
						}
					} else {
						this.type = options.type;
						this.pid = options.pid;
						this.goods_id = options.goodsId;
					}
				} else if (uni.getStorageSync('pid')) {
					this.pid = uni.getStorageSync('pid');
				} else if (options.q) {
					let q = decodeURIComponent(options.q);
					this.pid = getQueryString(q, 'pid');
					this.type = getQueryString(q, 'type');
					this.goods_id = getQueryString(q, 'goodsId');
				}

			}

					
			
		},
		methods: {
			getuserinfo(e) {
				if (e.detail.encryptedData) {
					let user = JSON.parse(e.detail.rawData);
					// console.log(user);
					this.param.avatar = user.avatarUrl;
					this.param.nickname = user.nickName;
					this.param.sex = user.gender;
					this.param.pid = this.pid;
					uni.login({
						provider: 'weixin',
						success: (loginRes) => {
							this.param.js_code = loginRes.code;
							api._post(getUserinfo, this.param).then((res) => {
								console.log("**77**88**")
								console.warn(JSON.stringify(res.data));

								if (res.code == 0) {
									try {
										uni.setStorageSync('token', res.data.token);
										uni.setStorageSync('userId', res.data.uid);
										if (this.type == 'goods') {
											uni.redirectTo({
												url: 'shopGoodInfo?good_id=' + this.goods_id
											});
											return
										} else if (this.type == 'yqm') {
											this.$openPage({
												name: 'scanCode',
												query: {
													pid: this.pid
												}
											})
											return
										} else if (this.deltoken === 'delToken') {
											uni.navigateBack({
												delta: 1
											});
										} else {
											uni.switchTab({
												url: "../tab1"
											})
										}

									} catch (e) {
										// error
									}
									// if(res.data.is_bind_mobile == 0){
									// 	this.$openPage({name:'bindMobile'})
									// } else{

									// }
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 2000
									});
								}
							})
						}
					});
				} 
			},
			newGoin(){
				api._post(validateToken).then((res) => {
					if(res.code == 0){
						uni.switchTab({
							url: "../tab1"
						})
					}
				})
			},
			back() {
				uni.switchTab({
					url: "../tab1"
				})
			},
		},
		components: {
			headerTop,
		}
	}
</script>

<style>
	.cancel {
		background: #EDEDED;
	}
</style>
