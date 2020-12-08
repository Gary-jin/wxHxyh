<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="订单详情" showBack="true"></headerTop>
		<view class="flex_rowL PLR_3 PTB_2 BB_10_f2f2f2">
			<image class="WH_10vw B_radius_max" src="../../static/image/tab_ac_0.png" mode=""></image>
			<view class="ML_3 W_70 flex_grow_1">
				<view class="flex_row_between PTB_1">
					<view class="flex_rowL">
						<view class="fontS_16 font_weight_bold PR_1">
							{{order.address_obj.username}}
						</view>
						<view class="color_999 fontS_12">
							{{order.address_obj.mobile}}
						</view>
					</view>
					<view class="color_ED2251 PL_2" v-if="order.status == 0 && uid == ''" @click="$openPage({name:'shopSelectAddress',query:{aid:order.address_obj.address_id,type:'orderInfo'}})">
						修改地址
					</view>
				</view>
				<view class="text_overflow_2 color_999 fontS_12">
					{{order.address_obj.province}}{{order.address_obj.city}}{{order.address_obj.district}}{{order.address_obj.address}}
				</view>
			</view>
		</view>
		<view class="">
			<view class="">
				<view class=" PTB_2 BB_1_f2f2f2" v-for="(item,index) in order.goods_list" :key="index">
					<view class="flex_rowL">
						<view class="ML_2 flex_colC">
							<image class="WH_24vw B_radius_5 B_2_fff" @click="toGoodsInfo(item)" :src="item.img" mode=""></image>
							<view class="PTB_1">
								<!-- ￥{{item.goods_price}} -->
							</view>
						</view>
						<view class="W_65 flex_grow_1 PLR_2 fontS_12">
							<view class="flex_row_between">
								<view class="text_overflow_1 ">{{item.goods_name}}</view>
							</view>
							<view class="PTB_1 color_ED2251 fontS_12 flex_row_between">
								<view v-if="order.is_score == 0">￥{{item.goods_price}}</view>
								<view v-else>{{item.goods_price}}积分</view>
								<view v-if="order.is_score == 0">购买省:{{item.total_zms}}</view>
								<view>{{item.total_goods_nums}}</view>
							</view>
							<view class="B_1_bbb bg_f2f2f2 PLR_1 overflow_y H_16vw">
								<view class=" PT_1 PR_2" v-for="(i,idx) in item.attr_list" :key="idx">
									{{i}}
								</view>
							</view>
						</view>
					</view>
					<view class="flex_rowR PT_1 fontS_12" v-if="uid == ''">
						<view v-if="order.is_show_return_text == 1" class="PTB_1 PLR_3 bg_f2f2f2 textC B_radius_5 MR_2" @click="salesDetail(item)">
							商家退货信息
						</view>
						<view v-show="btnShow &&  order.is_score == 0" class="PTB_1 PLR_3 bg_f2f2f2 textC B_radius_5 MR_2" @click="salesReturnAll(item)">
							申请售后
						</view>
						<!-- <view v-if="order.status == 1" class="PTB_1 PLR_3 bg_f2f2f2 textC B_radius_5 MR_2" @click="salesReturnDetail(item,'exchange')">
							换货
						</view> -->
						<view v-if="order.status == 1 && order.is_score == 0" class="PTB_1 PLR_3 bg_f2f2f2 textC B_radius_5 MR_2" @click="salesReturnDetail(item)">
							<!-- 退货 -->
							退款
						</view>
						<view v-if="order.status == 3 && item.is_comment == 0" class="PTB_1 PLR_3 bg_f2f2f2 textC B_radius_5 MR_2" @click="$openPage({name:'orderEvaluate',query:{oid:oId,goods:item}})">
							点击评价
						</view>
						<view v-if="order.status == 3 && item.is_comment == 1" class="PTB_1 PLR_3 bg_f2f2f2 textC B_radius_5 MR_2" @click="$openPage({name:'orderEvaluate',query:{oid:oId,goods:item}})">
							查看评价
						</view>
					</view>
				</view>

			</view>

			<view class="P_2 BB_1_f2f2f2" v-if="order.is_score == 0">
				<view class="PT_1 flex_row_between">
					<view>运费</view>
					<view>￥{{order.post_money}}</view>
				</view>
				<view class="PT_1 flex_row_between">
					<view>总货款(含运费)</view>
					<view class="color_FF0000">￥{{order.zong_money}}</view>
				</view>
				<view class="flex_row_between PT_1" v-if="Number(order.total_zms_price) > 0">
					<view>购买省</view>
					<view class="color_FF0000">￥{{order.total_zms_price}}</view>
				</view>
				<view class="flex_row_between PTB_1">
					<view>实付款(含运费)</view>
					<view class="color_FF0000">￥{{order.shi_money}}</view>
				</view>
				<view class="flex_row_between PTB_1" v-if="order.youhui > 0">
					<view>已优惠</view>
					<view class="color_FF0000">￥{{order.youhui}}</view>
				</view>
			</view>
			<view class="P_2 BB_1_f2f2f2" v-else>
				<view class="PT_1 flex_row_between">
					<view>总积分</view>
					<view class="color_FF0000">积分：{{order.zong_money}}</view>
				</view>
			</view>
			<!-- 退货订单 -->
			<view class="PT_2 PB_1 PL_2 bg_f2f2f2" v-if="order.return_list && order.return_list.length > 0">
				退货退款历史
			</view>
			<view class="BT_5_f2f2f2 P_2 flex_row_between fontS_10" v-if="order.return_list && order.return_list.length > 0"
			 v-for="(item,index) in order.return_list" :key="index">

				<view class="flex_colT">
					<image class="WH_14vw B_radius_5" :src="item.goods_img" mode=""></image>
				</view>
				<view class="color_ED2251 W_80">
					<view class="flex_rowL">
						<view class="PR_2 color_666">
							商品名称:
						</view>
						<view class="text_overflow_1 W_75">
							{{item.goods_name}}
						</view>
					</view>
					<view class="flex_rowL">
						<view class="PR_2 color_666">退货明细:</view>
						<view class="flex_grow_1">
							<view class="flex_row_between">
								<view class="flex_grow_1 textL">{{item.str}}</view>
								<view class="W_30">
									<view class="font_weight_bold textR fontS_12 color_blue">
										{{item.status_text}}
									</view>
									<!-- v-if="order.pay_time && item.status == 1" -->
									<view v-if="item.is_show == 1 && uid == ''" class="B_radius_5 color_000 fontS_10  textC bg_eee B_1_bbb" style="padding-top: 6rpx;padding-bottom: 6rpx;"
									 @click="addresDialogShow(item)">
										填写快递信息
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex_row_between">
						<view class="color_666">
							退货说明:
						</view>
						<view class="">
							{{item.return_reason}}
						</view>
					</view>
					<view class="flex_row_between">
						<view class="color_666">
							退货金额:
						</view>
						<view class="">
							{{item.tui_money}}
						</view>
					</view>
					<view class="flex_row_between">
						<view class="color_666">
							退货数量:
						</view>
						<view class="">
							{{item.tui_nums}}
						</view>
					</view>
					<view class="flex_row_between" v-if="item.back_reason">
						<view class="color_666">
							驳回原因:
						</view>
						<view class="">
							{{item.back_reason}}
						</view>
					</view>
					<view class="flex_row_between" v-if="item.create_time">
						<view class="color_666">
							申请时间:
						</view>
						<view class="">
							{{item.create_time}}
						</view>
					</view>
					<view class="flex_row_between" v-if="item.handle_time">
						<view class="color_666">
							审核时间:
						</view>
						<view class="">
							{{item.handle_time}}
						</view>
					</view>
				</view>
			</view>
			<!-- 换货订单 -->
			<view class="PT_2 PB_1 PL_2 bg_f2f2f2" v-if="order.change_list && order.change_list.length > 0">
				换货历史
			</view>
			<view class="BT_5_f2f2f2 P_2 flex_row_between fontS_10" v-if="order.change_list && order.change_list.length > 0"
			 v-for="(item,index) in order.change_list" :key="index">

				<view class="flex_colT">
					<image class="WH_14vw B_radius_5" :src="item.goods_img" mode=""></image>
				</view>
				<view class="color_ED2251 W_80">
					<view class="flex_rowL">
						<view class="PR_2 color_666">
							商品名称:
						</view>
						<view class="text_overflow_1 W_75">
							{{item.goods_name}}
						</view>
					</view>
					<view class="flex_rowL">
						<view class="PR_2 color_666">换货明细:</view>
						<view class="flex_grow_1">
							<view class="flex_row_between">
								<view class="flex_grow_1 textL">{{item.str}}</view>
								<view class="W_30">
									<view class="font_weight_bold textR fontS_12 color_blue">
										{{item.status_text}}
									</view>
									<!-- v-if="order.pay_time && item.status == 1" -->
									<view v-if="item.is_show == 1 && uid == ''" class="B_radius_5 color_000 fontS_10  textC bg_eee B_1_bbb" style="padding-top: 6rpx;padding-bottom: 6rpx;"
									 @click="addresDialogShow(item,'exchange')">
										填写快递信息
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex_row_between">
						<view class="color_666">
							换货说明:
						</view>
						<view class="">
							{{item.change_reason}}
						</view>
					</view>
					<!-- 					<view class="flex_row_between">
						<view class="">
							退货金额:
						</view>
						<view class="">
							{{item.tui_money}}
						</view>
					</view> -->
					<view class="flex_row_between">
						<view class="color_666">
							换货数量:
						</view>
						<view class="">
							{{item.change_nums}}
						</view>
					</view>
					<view class="flex_row_between" v-if="item.back_reason">
						<view class="color_666">
							驳回原因:
						</view>
						<view class="">
							{{item.back_reason}}
						</view>
					</view>
					<view class="flex_row_between" v-if="item.create_time">
						<view class="color_666">
							申请时间:
						</view>
						<view class="">
							{{item.create_time}}
						</view>
					</view>
					<view class="flex_row_between" v-if="item.handle_time">
						<view class="color_666">
							审核时间:
						</view>
						<view class="">
							{{item.handle_time}}
						</view>
					</view>
					<view class="flex_rowR" v-if="item.reply">
						<view class="B_radius_5 color_000 fontS_10  textC bg_eee B_1_bbb" style="padding-top: 6rpx;padding-bottom: 6rpx;"
						 @click="(replyShow=true),(reply=item.reply)">
							查看商家回复({{item.reply_time}})
						</view>
					</view>
					<!-- item.reply -->
				</view>
			</view>
			<view class="PLR_2 BB_1_f2f2f2 PTB_1">
				<view class="PTB_2 flex_rowL">
					<view>丨</view>
					<view>订单信息</view>
				</view>
				<view class="PLR_2 fontS_12">
					<view class="flex_rowL PB_3 relative">
						<view>订单编号:</view>
						<view class="PL_3">{{order.order_no}}</view>
						<view class="absolute color_ED2251" style="right: 5%;" @click="copyUrl(order.order_no,1)">复制</view>
					</view>
					<view class="flex_rowL PB_3">
						<view>创建时间:</view>
						<view class="PL_3">{{order.create_time}}</view>
					</view>
					<view class="flex_rowL PB_3" v-if="order.pay_time">
						<view>付款时间:</view>
						<view class="PL_3">{{order.pay_time}}</view>
					</view>
					<view class="flex_rowL PB_3" v-if="order.send_time">
						<view>发货时间:</view>
						<view class="PL_3">{{order.send_time}}</view>
					</view>
					<view class="flex_rowL PB_3" v-if="order.confirm_time">
						<view>成交时间:</view>
						<view class="PL_3">{{order.confirm_time}}</view>
					</view>
				</view>
			</view>

			<view class="PLR_3 PTB_2" v-if="order.status != 4 && uid == ''">
				<view class="flex_rowR MB_2 " v-if="order.status === 0" @click="toPay()">
					<view class="PTB_1 bg_D93038 color_fff textC PLR_3 B_radius_max">
						去付款
					</view>
				</view>
				<view class="flex_rowR MB_2 " v-if="order.status === 2 || order.status === 3" @click="copyUrl(order.post_url,2)">
					<view class="PTB_1 bg_D93038 color_fff textC PLR_3 B_radius_max">
						查看物流
					</view>
				</view>
				<view class="flex_rowR MB_2 " v-if="order.status === 3 && order.is_comment == 0" @click="$openPage({name:'orderEvaluate',query:{oid:item.order_id,goods:item.goods_list[0]}})">
					<view class="PTB_1 bg_D93038 color_fff textC PLR_3 B_radius_max">
						点击评价
					</view>
				</view>
				<view class="flex_rowR MB_2 " v-if="order.status === 2" @click="orderAffirm">
					<view class="PTB_1 bg_D93038 color_fff textC PLR_3 B_radius_max">
						确认收货
					</view>
				</view>
				<view class="flex_rowR " v-if="order.status === 3">
					<view class="PTB_1 bg_D93038 color_fff textC PLR_3 B_radius_max" style="width: 100%;">
						订单已完成
					</view>
				</view>
			</view>

		</view>

		<van-popup :show="buy_show" position="bottom" custom-style="height: 75%" z-index="9999">
			<view class="bg_fff W_100 overflow_y">
				<view class="PLR_2">
					<view class="flex_rowC PTB_2 BB_1_f2f2f2">
						<view class="textC">
							<!-- 申请{{!exchangeShow ? '退货' :'换货' }} -->
							申请{{!exchangeShow ? '退款' :'换货' }}
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
								<view>可{{!exchangeShow ? '退' :'换' }}数量</view>
								<view>本次{{!exchangeShow ? '退货' :'换货' }}数量</view>
							</view>

							<scroll-view scroll-view show-scrollbar="true" class="bg_eee PLR_1" style="width: 97%;">
								<view class="flex_row_around PTB_1" v-for="(item,index) in attr2" :key="index">
									<view>{{item.attr}}</view>
									<view class="">
										{{item.goods_nums}}
									</view>
									<van-stepper min="0" :value="item.selected_nums" :max="item.goods_nums" :disable-plus="addNum" @minus="minusItem(item)"
									 @plus="addItem(item)" button-size="24" @change="onChange" @blur="inputIdx(item)" />
								</view>
							</scroll-view>
						</view>

						<view class="PTB_2 textL ">
							<!-- {{!exchangeShow ? '退货' :'换货' }}说明 -->
							{{!exchangeShow ? '退款' :'换货' }}说明
						</view>
						<view class="PLR_1 B_1_999 B_radius_5">
							<van-cell-group>
								<van-field :value="message" @input="getMessage" type="textarea" autosize />
							</van-cell-group>
						</view>
						<view class="PTB_1 textL fontS_12 color_ED2251" v-show="selectNumShow">
							！！{{!exchangeShow ? '退货' :'换货' }}明细
						</view>
						<view class="">
							<view class="color_ED2251 PT_1 W_100 fontS_12" v-for="(item,index) in selectNums" :key="index">
								{{item}}
							</view>
						</view>
					</view>

					<view class="color_fff flex_rowC W_100 PTB_3">
						<view class="PTB_2 textC W_80 bg_ED2251 B_radius_max" @click="salesReturn">
							确定
						</view>
					</view>
				</view>
			</view>
		</van-popup>
		<van-popup :show="addresDialog" custom-style="width: 70%;border-radius: 5px;">
			<view class="PLR_5">
				<view class="flex_rowC PTB_3 relative W_100">
					<view class="textC">
						请填写快递信息
					</view>
					<view class="iconfont absolute fontS_20" style="right: 0;" @click="addresDialog=false">
						&#xe6a7;
					</view>
				</view>
				<view class="flex_colC W_100 MTB_2">
					<input type="text" class="PTB_1 B_1_999 PL_2 MB_4 W_95 flex_grow_1" :disabled="is_sub == 1" v-model="post_name"
					 placeholder="请输入快递名称">
					<input type="text" class="PTB_1 B_1_999 PL_2 W_95 flex_grow_1" :disabled="is_sub == 1" v-model="post_no"
					 placeholder="请输入快递单号">
				</view>
				<view class="color_ED2251 fontS_12">
					*快递信息只允许添加一次，请确保 填写信息正确
				</view>
				<view class="PTB_4 " :class="is_sub == 0 ? 'flex_row_between' : 'flex_rowC'">
					<view class="B_1_999 PTB_1 PLR_2 textC B_radius_5" @click="addresDialog=false">取消</view>
					<view class="bg_ED2251 color_fff PTB_1 PLR_2 textC B_radius_5" v-if="is_sub == 0" @click="submitAddress">保存</view>
				</view>
			</view>
		</van-popup>
		<van-popup :show="salesShow" overlay-style="background-color: rgba(0,0,0,0.3);" custom-style="width: 60%;" round="true"
		 @close="onClose">
			<view class="PTB_2 textC B_1_f2f2f2">
				提示
			</view>
			<view class="PTB_2 textC B_1_f2f2f2" @click="$openPage({name:'service',query:{is_service:dataList.is_service}})">
				请先联系客服
			</view>
			<view class="PTB_2 textC" @click="dialogShow('')">
				退货退款
			</view>
			<view class="PTB_2 textC" @click="dialogShow('exchange')">
				换货
			</view>
		</van-popup>
		<van-popup :show="replyShow" custom-style="width: 70%;border-radius: 5px;">
			<view class="PLR_2">
				<view class="flex_rowC PTB_3">
					平台回复
				</view>
				<view class="B_1_999 P_1 bg_f2f2f2">
					{{reply}}
				</view>
				<view class="PTB_4 flex_rowC">
					<view class="bg_ED2251 color_fff PTB_1 W_80 textC B_radius_5" @click="replyShow=false">我已知晓</view>
				</view>
			</view>
		</van-popup>
		<van-dialog id="van-dialog"></van-dialog>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		orderInfo,
		cancelOrder,
		affirmOrder,
		refundOrder,
		createOrder,
		getPaySign,
		returnGoodsInfoOfOrder,
		returnOrderAddress,
		goodInfo,
		updateOrderaddress,
		changeGoods,
		logisticsAddress
	} from '../../static/script/const.js';
	import {
		pay,
		checkSpecification,
		unique
	} from '../../static/script/minix.js';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog.js'
	export default {
		data() {
			return {
				oId: '',
				order: {},
				buy_show: false,
				gid: '',
				checkAttr: 0,
				show: false,
				attr1: [],
				attr2: [],
				selectNums: [],
				message: '',
				page: 1,
				dataList: [],
				goodsDetail: {},
				addNum: false,
				orderId: '',
				checkNum: [],
				remark: '',
				active: -1,
				steps: [],
				copyShow: false,
				salesShow: false,
				btnShow: false,
				type: -1,
				addresDialog: false,
				post_name: '',
				post_no: '',
				return_id: '',
				is_sub: '',
				uid: '',
				address_id: '',
				selected_nums: 0,
				exchangeShow: false,
				replyShow:false,
				reply:''
			}
		},
		onLoad() {
			this.oId = this.$parseURL().oid;
			this.gid = this.$parseURL().gid;
			this.type = this.$parseURL().type;
			if (this.$parseURL().uid) {
				this.uid = this.$parseURL().uid;
			}

			// this.getOrder();
		},
		onShow() {
			this.getOrder();
		},
		mounted() {
			uni.$on('update_order', (data) => {
				console.log(data);
				this.address_id = data.site.id;
				this.updateAddress();
			})
		},
		methods: {
			getMessage(value) {
				this.remark = value.detail;
			},
			getOrder() {
				let that = this;
				let param = {
					'order_id': that.oId
				}
				api._post(orderInfo, param).then((res) => {
					if (res.code == 0) {
						that.order = res.data.info;
						if (that.order.status == 4 || that.order.status == 2) {
							console.log(that.order.is_return)
							if (that.order.is_return == 1) {
								that.btnShow = true;
							}
						}
					}
				})
			},
			orderCancel() {
				let that = this;
				let param = {
					'order_id': that.oId
				}
				api._post(cancelOrder, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			orderAffirm() {
				let that = this;
				let param = {
					'order_id': that.oId
				}
				api._post(affirmOrder, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			copyUrl(url, type) {
				if (type == 1) {
					uni.setClipboardData({
						data: url,
						success: () => {
							uni.showToast({
								title: '复制成功',
								icon: 'none',
								duration: 1500
							});
						}
					});
				} else {
					uni.setClipboardData({
						data: url,
						success: () => {
							console.log('success');
							uni.hideToast();
							Dialog.alert({
								context: this,
								title: '提示',
								message: '您已复制物流信息链接，在浏览器打开此链接即可查询您的物流信息',
							}).then(() => {
								// on close
							});
						}
					});
				}
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
					'goods_id': that.gid,
					'order_id': that.oId,
					'remark': that.remark,
					// 'json_str': encodeURIComponent(JSON.stringify(that.checkNum))
					'json_str': JSON.stringify(that.checkNum)
				}
				if (!that.exchangeShow) {
					api._post(refundOrder, param).then((res) => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
							that.buy_show = false;
							this.getOrder();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
						}
					})
				} else {
					api._post(changeGoods, param).then((res) => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
							that.buy_show = false;
							this.getOrder();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
						}
					})
				}

			},
			salesDetail(item) {
				this.$openPage({
					name: 'articleInfo',
					query: {
						type: '3'
					}
				})
			},
			salesReturnAll(item) {
				this.gid = item.goods_id;
				this.salesShow = true;
			},
			salesReturnDetail(item, type) {
				let that = this;
				if (item != 'all') {
					that.gid = item.goods_id;
				}
				let param
				if (item == 'all') {
					param = {
						'order_id': that.oId,
						'goods_id': that.gid
					}
				} else {
					param = {
						'order_id': that.oId,
						'goods_id': item.goods_id
					}
				}
				api._post(returnGoodsInfoOfOrder, param).then((res) => {
					if (res.code == 0) {
						if (type === 'exchange') {
							that.exchangeShow = true;
						} else {
							that.exchangeShow = false;
						}
						that.buy_show = true;
						that.selectNums = [];
						that.message = '';
						that.goodsDetail = res.data;
						that.attr2 = that.goodsDetail.list2[0].list
						console.log(that.attr2)
					}
				})

			},
			toPay() {
				let that = this;
				api._post(getPaySign, {
					'paySite': 'HX',
					'payType': 'xiaochengxu',
					'payId': that.order.order_no
				}).then((ret) => {
					// console.log(JSON.parse(ret.data.info.pay_sign_str));
					let obj = JSON.parse(ret.data.info.pay_sign_str)
					if (ret.code == 0) {
						uni.showToast({
							title: ret.msg,
							icon: 'none',
							duration: 1500
						});
						pay(obj, 'order');
						uni.$on('paySuccess', (data) => {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 500)
						})

					}
				})
			},
			dialogShow(type) {
				this.salesShow = false;
				this.salesReturnDetail('all', type);
			},
			checkTab(index) {
				this.checkIdx = index;
				this.dataList = [];
				this.page = 1;
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
			inputIdx(item) {
				let that = this;
				item.selected_nums = that.selected_nums;
				that.backGoodsAttrStr(that.goodsDetail.list2);
				that.checkNum = [];
				that.checkSpecification(that.goodsId, that.goodsDetail.list2);
				that.selected_nums = 0;
			},
			onChange(e) {
				this.selected_nums = e.detail;
			},
			addItem(item) {
				let that = this;
				that.selectNumShow = true;
				++item.selected_nums;
				// console.log(item.goods_nums + '------' + item.selected_nums)
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
						if (demo_item.selected_nums > 0) {
							str += demo_item.attr + "/" + demo_item.selected_nums + "件，";
						}
					}
					// console.log(str);
					data1.push(str);
					// console.log(data1)
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
								console.log(i.order_goods_info_id)
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

			onClose() {
				this.salesShow = false;
			},
			addresDialogShow(item) {
				this.addresDialog = true;
				this.is_sub = item.is_sub;
				if (item.return_id) {
					this.return_id = item.return_id;
				} else {
					this.return_id = item.change_id;
					this.exchangeShow = true;
				}
				this.post_name = item.post_name;
				this.post_no = item.post_no;
			},
			submitAddress() {
				if (!this.post_name || !this.post_no) {
					uni.showToast({
						title: '快递信息不能为空',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				let param;
				if (!this.exchangeShow) {
					param = {
						'return_id': this.return_id,
						'post_name': this.post_name,
						'post_no': this.post_no,
					}
					api._post(returnOrderAddress, param).then((res) => {
						if (res.code == 0) {
							this.addresDialog = false;
							this.post_name = '';
							this.post_no = '';
							this.return_id = '';
							this.getOrder();
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
						} else {
							this.addresDialog = false;
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
						}
					})
				} else {
					param = {
						'change_id': this.return_id,
						'post_name': this.post_name,
						'post_no': this.post_no,
					}
					api._post(logisticsAddress, param).then((res) => {
						if (res.code == 0) {
							this.addresDialog = false;
							this.post_name = '';
							this.post_no = '';
							this.return_id = '';
							this.getOrder();
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
						} else {
							this.addresDialog = false;
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							});
						}
					})
				}

			},
			toGoodsInfo(item) {
				api._post(goodInfo, {
					'goods_id': item.goods_id
				}).then((res) => {
					if (res.code == 0) {
						this.$openPage({
							name: 'shopGoodInfo',
							query: {
								good_id: item.goods_id
							}
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})

			},
			updateAddress() {
				let param = {
					'order_id': this.oId,
					'address_id': this.address_id,
				};
				api._post(updateOrderaddress, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						setTimeout(() => {
							this.getOrder();
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


</style>
