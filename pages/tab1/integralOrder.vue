<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2 " :class="show ? '' : 'H_100vh'">
		<headerTop title="【和鞋一号】严选商城1"></headerTop>
		<view class="bg_ff5126 P_2 relative flex_rowC color_fff fontS_16">
			<view class="iconfont absolute PL_2" style="left: 0;" @click="goBack">&#xe724;</view>
			<view>确认订单</view>
		</view>
		<view class="PLR_2">
			<view class="flex_rowC">
				<view v-if="!address.id" class="MTB_2 bg_fff W_100 PTB_4 PLR_2 flex_row_between B_radius_15" @click="$openPage({name:'shopSelectAddress'})">
					<view class="">
						暂无收货地址，请添加收货地址
					</view>
					<view class="iconfont">
						&#xe600;
					</view>
				</view>
				<view v-else class="MTB_2 bg_fff W_100 PTB_4 PLR_2 flex_row_between B_radius_15" @click="$openPage({name:'shopSelectAddress',query:{aid:address.id}})">
					<view class="flex_rowL">
						<image src="http://qnyimages.hexieyihao.vip/address.png" class="WH_10vw B_radius_max ML_1 MR_3" mode=""></image>
						<view class="">
							<view class="flex_rowL PB_2">
								<view class="fontS_16 font_weight_bold">{{address.username}}</view>
								<view class="color_999 ML_3">{{address.mobile}}</view>
							</view>
							<view class="color_999" v-if="address.province">{{address.province}}{{address.city}}{{address.country}}{{address.detail}}</view>
							<view class="color_999" v-else>{{address.address}}</view>
						</view>
					</view>
					<view class="WH_8vw flex_colC">
						<view class="iconfont color_FFC41C">
							&#xe600;
						</view>
					</view>
				</view>
			</view>

			<view class="bg_fff B_radius_15 PTB_3 PLR_2" v-if="show">
        
				<view class="PB_2">
					<view class="flex_row_between">
						<view class="MR_2 flex_colC">
							<image class="WH_26vw B_radius_10" :src="order.img" mode=""></image>
							<view class="PTB_1">
							</view>
						</view>
						<view class="W_65 fontS_12">
              <view class="text_overflow_1 MB_5">{{order.goods_name}}</view>
              <view class="color_999 MB_2">{{order.attr}}</view>
							<view class="flex_row_between">
                <view class="color_red">{{order.price}} 积分</view>
                <view>x{{order.num}}</view>
							</view>
						</view>
					</view>
				</view>

				
				<view class="flex_row_between PTB_2 BB_1_f2f2f2">
					<view class="fontS_12">配送方式</view>
					<view class="fontS_12">快递 免邮</view>
				</view>

				<view class="PTB_2">
					<van-cell-group>
						<van-field :value="remark" label="备注" @input="onInput" type="textarea" placeholder="请输入备注" autosize :border="false" />
					</van-cell-group>
				</view>
			</view>
			<view class="H_20vw">

			</view>
		</view>

		<view v-if="show" class="fixed H_14vw W_100 flex_row_between z_index_100" style="bottom: 0;">
			<view class="PL_2 bg_fff flex_grow_1 H_100 flex_rowL">
				<view class="fontS_16">合计：</view>
				<view class="fontS_20 color_ED2251">{{order.total_price}} 积分</view>
			</view>
			<view class="bg_ff5126 color_fff H_100 W_35 textC fontS_16" style="line-height: 14vw;" @click="creationOrder">
				提交订单
			</view>
		</view>

	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getDefaultAddress,
		payScoreOrder,
		getPaySign,
		userInfo,
		saveArea,
		checkOrder,
    checkBindMobile,
    scoreCheckOrder
	} from '../../static/script/const.js';
	import {
		pay
	} from '../../static/script/minix.js'
	export default {
		data() {
			return {
				show: false,
				order: {},
				address: {},
				remark: '',
				json_str: '',
				address_id: '',
				type: '',
        remarkStr: '',
        
			}
		},
		onLoad() {
			uni.$on('checkSite', (data) => {
				console.log(data);
				this.address_id = data.site.id;
				this.address = data.site;
			})
      this.getAddress();
		},
		onShow() {
			this.bindMobile();
			if (this.address_id) {
				this.checkOrders();
				this.getAddress();
			}
		},
		methods: {
			bindMobile() {
				api._post(checkBindMobile, {}).then((res) => {
					if (res.code == 0) {
						if (res.data.is_bind_mobile != 1) {
							this.$openPage({
								name: 'bindMobile'
							})
						}
					}
				})
			},
			getAddress() {
				let that = this;
				api._post(getDefaultAddress, {}).then((res) => {
					if (res.code == 0) {
						that.address = res.data;
						if (res.data.id) {
							that.address_id = res.data.id;
							that.checkOrders();
							that.show = true;
						}
					}
				})
			},
			checkOrders() {
				let param;
					param = {
						'attr_id':this.$parseURL().attr_id,
            'num': this.$parseURL().num,
            'address_id':this.address_id
					}
				api._post(scoreCheckOrder, param).then((res) => {
					if (res.code == 0) {
						// console.log(res.data)
            this.order = res.data;
            
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			creationOrder() {
				let that = this;
				if (!that.address.id) {
					uni.showToast({
						title: '您还未添加收货地址，请先添加收货地址',
						icon: 'none',
						duration: 1500
					});
					return
				}
				api._post(userInfo, {}).then((res) => {
					console.log(res.data)
					if (res.code == 0) {
						if (res.data.info.score > Number(this.order.total_price)) {
							that.creatBuyOrder();
						} else {
              uni.showToast({
                title: '您的积分不足',
                icon: 'none',
                duration: 1500
              });
						}
					} else {
						console.log(res)
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			creatBuyOrder() {
				let that = this;
				let params = {
					'address_id': that.address.id,
					'remark': that.remarkStr,
					'attr_id':this.$parseURL().attr_id,
					'num': this.$parseURL().num
				}
				api._post(payScoreOrder, params).then((res) => {
						console.log(res)
						if(res.code == 0){
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							});
							setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/tab4/order?idx=5'
									});
							},2000)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
						}
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onInput(e) {
				// console.log(e.detail);
				this.remarkStr = e.detail
			},
			getPosition(){
				let that = this;
				uni.authorize({ // 发起请求用户授权
					scope: 'scope.userLocation',
					success:(res) => { // 用户允许了授权
					console.log(res);
						uni.getLocation({ // 请求位置信息
							type: 'wgs84',
							success(res) {
								console.log(res, 95); //  得到位置信息（经纬度，速度等等
								let param = {
									'lon': res.longitude,
									'lat': res.latitude
								}
								api._post(saveArea, param).then((ass) => {
									if (ass.code == 0) {
										that.creatBuyOrder();
									} else {
										console.log(res)
										uni.showToast({
											title: res.msg,
											icon: 'none',
											duration: 1500
										});
									}
								})
							}
						})
					},
					fail:(err) => {
						console.log(err);
						uni.getSetting({
							success(res) { // 查看所有权限
								console.log(res.authSetting['scope.userLocation']);
								let status = res.authSetting['scope.userLocation'] // 查看位置权限的状态，此处为初次请求，所以值为undefined
								if (!status) { // 如果是首次授权(undefined)或者之前拒绝授权(false)
									uni.showModal({
										title: '是否授权当前位置',
										content: '需要获取您的地理位置,请确认授权,否则会影响下单支付功能使用',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting({
													success: (ret) => {
														console.log(ret.authSetting);
														if (ret.authSetting["scope.userLocation"]) {
															that.getPosition();
														}
													}
												});
											}
										}
									})
								} else {
									that.getPosition();
								}
							}
						})
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


</style>
