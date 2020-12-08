<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<headerTop :title="uid == '' ? '我的订单' : '下级订单'" showBack="true"></headerTop>
		<view class="">
			<view class="BB_5_f2f2f2 flex_row_around bg_fff">
				<view class="PTB_2" :class="checkIdx == 5 ? 'BB_2_F6C658' : ''" @click="checkTab(5)">
					全部
				</view>
				<view class="PTB_2" :class="checkIdx == index ? 'BB_2_F6C658' : ''" v-for="(item,index) in tabNav" :key="index"
				 @click="checkTab(index)">
					{{item}}
				</view>
			</view>
			<view class="PLR_2">
				<view class="bg_fff B_radius_5 PTB_2 MB_3" v-for="(item,index) in dataList" :key="index">
					<view class="textR color_ED2251 PB_2 PR_2">
						{{item.str}}
					</view>
					<view class="" @click="$openPage({name:'orderInfo',query:{oid:item.order_id,gid:item.goods_list[0].goods_id,type:checkIdx,uid:uid}})">
						<view class="flex_rowL relative" v-for="(asset,idx) in item.goods_list" :key="idx">
							<view class="ML_2 flex_colC">
								<image class="WH_24vw B_radius_5 B_2_fff" :src="asset.img" mode=""></image>
								<view class="PTB_1 fontS_14">
									<!-- ￥{{asset.goods_price}} -->
								</view>
							</view>
							<view class="W_65 fontS_12 absolute PR_2" style="top: 0;right: 0;">
								<view class="flex_row_between">
									<view class="text_overflow_1 ">{{asset.goods_name}}</view>
								</view>
								<view class="PTB_1 color_ED2251 fontS_12 flex_row_between">
									<view v-if="item.is_score == 0">￥{{asset.goods_price}}</view>
									<view v-else>{{asset.goods_price}}积分</view>
									<view v-if="item.is_score == 0">购买省:{{asset.total_zms}}</view>
									<view>{{asset.total_goods_nums}}</view>
								</view>
								<view class="B_1_bbb bg_f2f2f2 H_14vw overflow_y PLR_1 flex_rows_start">
									<view class=" PT_1 PR_2" v-for="(i,index) in asset.attr_list" :key="index">
										{{i}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="textR PTB_2 PR_2" v-if="item.is_score == 0">
						共{{item.total_goods_nums}}件商品 合计：￥{{item.order_price}}
					</view>
					<view class="flex_rowR PR_2" v-if="uid == ''">
						<view class="PTB_1 PLR_2 textC B_radius_5 B_1_f2f2f2 ML_2" @click="$openPage({name:'orderInfo',query:{oid:item.order_id,gid:item.goods_list[0].goods_id,type:checkIdx,uid:uid}})">查看详情</view>
						<view class="PTB_1 PLR_2 textC B_radius_5 B_1_f2f2f2 ML_2" v-show="item.status == 3 && item.is_comment == 0" @click="goPl(item)">点击评价</view>
						
						<view class="PTB_1 PLR_2 textC B_radius_5 B_1_f2f2f2 ML_2" v-show="item.status == 2 || item.status == 3" @click="copyUrl(item.post_url)">查看物流</view>
						<view class="PTB_1 PLR_2 textC B_radius_5 bg_ED2251 color_fff ML_2" v-show="item.status == 2" @click="orderAffirm(item.order_id)">确认收货</view>
						<view class="PTB_1 PLR_2 textC B_radius_5 B_1_f2f2f2 ML_2" v-show="item.status === 0" @click="orderCancelDialog(item.order_id)">取消订单</view>
						<view class="PTB_1 PLR_2 textC B_radius_5 bg_ED2251 color_fff ML_2" v-show="item.status === 0" @click="toPay(item)">去付款</view>
					</view>
				</view>
			</view>
		</view>

		<van-overlay :show="buy_show">
			<view class="bg_fff fixed W_100" style="bottom: 0;">
				<view class="PLR_2">
					<view class="flex_rowC PTB_2 BB_1_f2f2f2">
						<view class="textC">
							申请退货退款
						</view>
						<view class="iconfont fontS_24 absolute" style="right: 5%;" @click="buy_show=false">&#xe6a7;</view>
					</view>

					<view class="">

						<view class="flex_rowL">
							<view class="PTB_1 PLR_2 MR_2 textC B_radius_5" @click="checkidx(item,index)" :class="checkAttr == index ? 'bg_ED2251 color_fff':'color_999 B_1_999'"
							 v-for="(item,index) in goodsDetail.list1" :key="index">
								{{item}}
							</view>
						</view>
						<view class="PTB_3">
							<view class="flex_row_around PTB_1 bg_D0D0D0">
								<view>尺码</view>
								<view>可退数量</view>
								<view>本次退款数量</view>
							</view>
							<view class="H_38vw bg_eee overflow_y">
								<view class="flex_row_around PTB_1" v-for="(item,index) in attr2" :key="index">
									<view>{{item.attr}}</view>
									<view class="">
										{{item.goods_nums}}
									</view>
									<van-stepper min="0" :value="item.selected_nums" :max="item.goods_nums" :disable-plus="addNum" @minus="minusItem(item)"
									 @plus="addItem(item)" button-size="24" />
								</view>
							</view>
						</view>

						<view class="PTB_2 textL ">
							退货说明
						</view>
						<view class="PLR_1 B_1_999 B_radius_5">
							<van-cell-group>
								<van-field :value="message" @input="getMessage" type="textarea" autosize />
							</van-cell-group>
						</view>
						<view class="PTB_1 textL fontS_12 color_ED2251" v-show="selectNumShow">
							！！退货明细
						</view>
						<view class="">
							<view class="color_ED2251 PT_1 W_100 fontS_12" v-for="(item,index) in selectNums" :key="index">
								{{item}}
							</view>
						</view>
					</view>

					<view class="color_fff flex_rowC W_80 M_auto PTB_3">
						<view class="PTB_2 textC flex_grow_1 bg_ED2251 B_radius_max" @click="salesReturn">
							确定
						</view>
					</view>
				</view>
			</view>
		</van-overlay>
		<van-dialog id="van-dialog" />

		<van-dialog use-slot title="提示" :show="orderCancelshow" show-cancel-button confirmButtonText="确定取消" cancelButtonText="暂不取消"
		 @confirm="orderCancel" @cancel="cancel">
			<view class="PTB_3 textC">
				确定要取消订单吗？
			</view>
		</van-dialog>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog.js'
	import {
		orderList,
		orderInfo,
		cancelOrder,
		affirmOrder,
		refundOrder,
		createOrder,
		getPaySign,
		returnGoodsInfoOfOrder,
		delOrder
	} from '../../static/script/const.js';
	import {
		pay,
		checkSpecification,
		unique
	} from '../../static/script/minix.js';
	export default {
		data() {
			return {
				tabNav: ['待付款', '待发货', '待收货', '已完成', '退货换货'],
				checkIdx: -1,
				checkAttr: 0,
				buy_show: false,
				show: false,
				attr1: ['白色', '黑色', '绿色', '蓝色'],
				attr2: [],
				selectNums: [],
				selectNumShow: false,
				message: '',
				page: 1,
				dataList: [],
				goodsDetail: {},
				addNum: false,
				goodsId: '',
				orderId: '',
				checkNum: [],
				remark: '',
				active: -1,
				steps: [],
				copyShow: false,
				orderCancelshow: false,
				orderCancelId: '',
				uid: '',
			}
		},
		onLoad(options) {
			if (options.idx) {
				this.checkIdx = options.idx;
			} else {
				this.checkIdx = this.$parseURL().idx;
			}
			if (this.$parseURL().uid) {
				this.uid = this.$parseURL().uid;
			}
		},
		onShow() {
			this.getOrderlist();
		},
		onReachBottom() {
			this.getOrderlist('more');
		},
		onPullDownRefresh() {
			this.dataList = [];
			this.page = 1;
			this.getOrderlist();
		},
		methods: {
			goPl(item){
				console.log(item.order_id)
				api._post(orderInfo, {'order_id':item.order_id}).then((res) => {
					if (res.code == 0) {
						let xx = res.data.info.goods_list[0];
						console.log(JSON.stringify(xx))
						this.$openPage({name:'orderEvaluate',query:{oid:item.order_id,goods:xx}})
					}
				})
			},
			getMessage(value) {
				this.remark = value.detail;
			},
			getOrderlist(type) {
				let that = this;
				let param;
				if (type == 'more') {
					param = {
						'other_uid': that.uid,
						'type': that.checkIdx,
						'page': ++that.page
					}
				} else {
					param = {
						'other_uid': that.uid,
						'type': that.checkIdx,
						'page': 1
					}
				}
				api._post(orderList, param).then((res) => {
					if (res.code == 0) {
						if (type == 'more') {
							console.log(res.data.list.length)
							if (res.data.list.length != 0) {
								that.dataList = that.dataList.concat(res.data.list);
							}
						} else {
							that.dataList = res.data.list;
							console.log(JSON.stringify(that.dataList))
						}
						if (res.data.list.length < 1) {
							uni.showToast({
								title: '没有更多了!',
								icon: 'none',
								duration: 1500
							});
						}

					}
				})
			},
			salesReturn() {
				let that = this;
				if (that.checkNum.length < 1) {
					uni.showToast({
						title: '您还未选择退款商品!',
						icon: 'none',
						duration: 1500
					});
					return
				}
				let param = {
					'goods_id': that.goodsId,
					'order_id': that.orderId,
					'remark': that.remark,
					'json_str': encodeURIComponent(JSON.stringify(that.checkNum))
				}
				api._post(refundOrder, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						that.buy_show = false;
						setTimeout(() => {
							that.getOrderlist();
						}, 300)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			salesReturnDetail(oid, goods) {
				let that = this;
				that.orderId = oid;
				that.goodsId = goods.goods_id;
				let param = {
					'order_id': oid,
					'goods_id': goods.goods_id
				}
				api._post(returnGoodsInfoOfOrder, param).then((res) => {
					if (res.code == 0) {
						that.buy_show = true;
						that.selectNums = [];
						that.message = '';
						that.goodsDetail = res.data;
						that.attr2 = that.goodsDetail.list2[0].list
					}
				})
			},
			orderCancelDialog(id) {
				let that = this;
				that.orderCancelshow = true;
				that.orderCancelId = id;
			},
			cancel() {
				let that = this;
				that.orderCancelshow = false;
			},
			orderCancel(id) {
				let that = this;
				that.orderCancelshow = false;
				// return
				let param = {
					'order_id': that.orderCancelId
				}
				api._post(cancelOrder, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						that.getOrderlist();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			orderAffirm(id) {
				
				let that = this;
				let param = {
					'order_id': id
				}
				Dialog.confirm({
				  title: '注意',
				  message: '确认收货后视为质量、尺码、颜色皆无疑问',
				}).then(() => {
				    api._post(affirmOrder, param).then((res) => {
				    	if (res.code == 0) {
				    		uni.showToast({
				    			title: res.msg,
				    			icon: 'none',
				    			duration: 1500
				    		});
				    		that.getOrderlist();
				    	} else {
				    		uni.showToast({
				    			title: res.msg,
				    			icon: 'none',
				    			duration: 1500
				    		});
				    	}
				    })
				  }).catch(() => {
				    // on cancel
				  });

			},
			toPay(item) {
				let that = this;
				api._post(getPaySign, {
					'paySite': 'HX',
					'payType': 'xiaochengxu',
					'payId': item.order_no
				}).then((ret) => {
					console.log(ret.data);
					console.log('获取支付签名！！！')
					// console.log(JSON.parse(ret.data.info.pay_sign_str));
					let obj = JSON.parse(ret.data.info.pay_sign_str)
					if (ret.code == 0) {
						pay(obj, 'order');
						uni.$on('paySuccess', (data) => {
							console.log('支付成功')
							this.getOrderlist();
						})
					} else {
						uni.showToast({
							title: ret.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			deletOrder(id) {
				let param = {
					'order_id': id
				}
				api._post(delOrder, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						this.getOrderlist();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			checkTab(index) {
				this.checkIdx = index;
				this.dataList = [];
				this.page = 1;
				this.getOrderlist();
			},
			checkShow() {
				this.show = true;
			},
			checkidx(item, index) {
				let that = this;
				that.checkAttr = index;
				let arr = that.goodsDetail.list2;
				let arr2 = [];
				console.log(item)
				arr.forEach((i) => {
					if (i.color === item) {
						that.attr2 = i.list;
					}
				})
				console.log(that.attr2);
			},
			addItem(item) {
				let that = this;
				that.selectNumShow = true;
				++item.selected_nums;
				console.log(item.goods_nums + '------' + item.selected_nums)
				that.backGoodsAttrStr(that.goodsDetail.list2);
				that.checkNum = [];
				that.checkSpecification(that.goodsId, that.goodsDetail.list2);
			},
			minusItem(item) {
				let that = this;
				--item.selected_nums;
				that.selectNumShow = true;
				that.addNum = false;
				console.log(that.goodsDetail.list2)
				that.backGoodsAttrStr(that.goodsDetail.list2);
				that.checkNum = [];
				that.checkSpecification(that.goodsId, that.goodsDetail.list2);
				// console.log()
			},
			backGoodsAttrStr(list) {
				let data1 = [];
				let num = 0;
				for (let item in list) {
					let demo_obj = list[item];
					// console.log(demo_obj)
					// if (this.getTotalSelectedNums(demo_obj.list)) {
					let str = demo_obj.color + ": ";
					console.log(demo_obj);
					let arr = demo_obj.list;

					for (let it in demo_obj.list) {
						let demo_item = demo_obj.list[it];
						num += Number(demo_item.selected_nums);
						this.goodsNum = num;
						// if(demo_item.goods_nums > 0){
						str += demo_item.attr + "/" + demo_item.selected_nums + "件，";
						// }
					}
					console.log(str);
					data1.push(str);
					// }

				}
				return this.selectNums = data1;
			},
			getTotalSelectedNums(demo_list) {
				let total_nums = 0;
				for (let it in demo_list) {
					let demo_item = demo_list[it];
					total_nums += demo_item.selected_nums
				}
				return total_nums;
			},
			checkSpecification(id, lists) {
				let data = [];
				let arr = lists;
				let obj = {};

				arr.forEach((asset, index) => {
					for (let ret in asset) {
						// console.log(asset[ret])
						if (ret == 'list') {
							let res = asset[ret];
							res.forEach((i, idx) => {
								// if (i.goods_nums < i.selected_nums) {
								console.log(i.selected_nums)
								this.checkNum.push({
									'order_goods_info_id': i.order_goods_info_id,
									'attr_id': i.attr_id,
									'goods_nums': i.selected_nums
								})

								// }
							})
							// this.checkNum = this.checkNum.concat(obj)
							// console.log(this.checkNum)
						}
					}
				})
			},
			copyUrl(url) {
				uni.setClipboardData({
					data: url,
					success: () => {
						console.log('success');
						uni.hideToast();
						Dialog.alert({
							title: '提示',
							message: '您已复制物流信息链接，在浏览器打开此链接即可查询您的物流信息',
						}).then(() => {
							// on close
						});
					}
				});
			},
			onClose() {
				this.copyShow = false;
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
