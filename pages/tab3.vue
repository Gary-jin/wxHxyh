<template>
	<view class="flex_colT flex_items_stretch" :class="buy_show ? 'overflow_hidden H_100vh' : ''">
		<headerTop title="购物车"></headerTop>
		<view class="P_2 " v-if="dataList.list1.length > 0 || dataList.list2.length > 0">
			<view class="flex_row_between">
				<view class="flex_rowL" @click="checkAll()">
					<view class="iconfont color_ED2251">
						{{allCheck ? '&#xe7e9;' : '&#xe609;'}}
					</view>
					<view class="PL_2">
						全选
					</view>
				</view>
				<view class="PTB_1 PLR_3 textC B_radius_5 B_1_999 fontS_12" @click="dialog('none')">
					删除
				</view>
			</view>
			<view class="color_999 fontS_12">
				共{{dataList.list1_total_goods_nums}}件商品
			</view>
		</view>

		<view class="" v-if="dataList.list1.length > 0">
			<view class="bg_f7f7f7 MB_2 PT_3 PB_5 PLR_1 " v-for="(item,index) in dataList.list1" :key="index">
				<view class="flex_rowL relative">
					<view class="iconfont color_ED2251 fontS_22 PR_1" @click="checkCart(index,item)">
						{{!item.is_selected ? '&#xe609;':'&#xe7e9;'}}
					</view>
					<view class="MR_2 flex_colC">
						<image class="WH_24vw B_radius_5 B_2_fff" @click="$openPage({name:'shopGoodInfo',query:{good_id:item.goods_id}})" :src="item.img" mode="aspectFill"></image>
						<view class="PTB_1 fontS_14">
							<!-- ￥{{item.goods_price}} -->
						</view>
					</view>
					<view class="W_65 fontS_12 absolute" style="top: 0;right: 0;">
						<view class="flex_row_between">
							<view class="text_overflow_1 ">{{item.goods_name}}</view>
						</view>
						<view class="PTB_1 color_ED2251 fontS_12 flex_row_between">
							<view>￥{{item.goods_price}}</view>
							<view v-if="item.total_zms > 0">购买省:{{item.total_zms}}</view>
							<view>X{{item.total_goods_nums}}</view>
						</view>
						<view class="B_1_bbb bg_f2f2f2 P_1 flex_rows_start H_12vw overflow_y">
							<view class=" PT_1 PR_2" v-for="(asset,index) in item.attr_str" :key="index">
								{{asset}}
							</view>
						</view>
						<view class="flex_rowR PR_2" >
							<view class="PTB_1 PLR_2" @click="getcartGoodsDetail(item)">
								编辑
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="" v-if="dataList.list2.length > 0">
			<view class="fontS_12 P_2 flex_row_between">
				<view class="color_999 fontS_12 PL_1 PB_1">失效商品共{{dataList.list2_total_goods_nums}}件</view>
				<view class="PTB_1 PLR_2 textC B_radius_5 B_1_999" @click="dialog('lose')">清除失效商品</view>
			</view>
			<view class="flex_colC">
				<view class="bg_f7f7f7 MB_2  W_95 relative" v-for="(item,index) in dataList.list2" :key="index">
								<view class="absolute WH_100" style="background-color: rgba(0,0,0,0.1);z-index: 5;">
									
								</view>
								<view class="flex_rowL relative">
									<view class="iconfont color_ED2251 fontS_22 PR_1">
				
									</view>
									<view class="MR_2 flex_colC">
										<image class="WH_24vw B_radius_5 B_2_fff" :src="item.img"
										 mode=""></image>
										<view class="PTB_1 fontS_14">
											<!-- ￥{{item.goods_price}} -->
										</view>
									</view>
									<view class="W_65 fontS_12 absolute" style="top: 0;right: 0;">
										<view class="flex_row_between PTB_2">
											<view class="W_90 text_overflow_1 ">{{item.goods_name}}</view>
											<view>X{{item.total_goods_nums}}</view>
										</view>
										<view class="B_1_bbb bg_f2f2f2 P_1 H_12vw overflow_hidden flex_rows_start">
											<view class=" PT_1 PR_2" v-for="(asset,index) in item.attr_str" :key="index">
												{{asset}}
											</view>
										</view>
					<!-- 					<view class="PT_2 textR PR_2">
											编辑
										</view> -->
									</view>
								</view>
							</view>
			</view>
		</view>
		<view class="H_14vw">
			
		</view>
		<view class="fixed W_100 z_index_1000 bg_fff H_12vw flex_rowL" style="bottom: 0;" v-if="dataList.list1.length > 0 || dataList.list2.length > 0">
			<view class="flex_rowL flex_grow_1" style="line-height: 12vw;">
				合计：<view class="fontS_16 color_ED2251 PL_2 PR_1">
					￥{{orderPrice}}
				</view>
			</view>
			<view class="bg_ED2251 textC color_fff fontS_16 W_34vw" style="line-height: 12vw;" @click="submitOrder">
				提交订单({{orderNum}})
			</view>
		</view>
		
		<view class="flex_colC PT_10" v-if="dataList.list1.length == 0 && dataList.list2.length == 0">
			<image src="http://qnyimages.hexieyihao.vip/tab3_image_cart.png" class="WH_32vw" mode=""></image>
			<view class="MT_5">
				购物车暂无商品
			</view>
			
			<view class="flex_rowC W_100 MT_10">
				<view class="PTB_2 W_40 B_radius_max textC B_1_ED2251 color_ED2251" @click="back">
					去逛逛
				</view>
			</view>
		</view>
		<template v-if="buy_show">
			<van-popup :show="buy_show" position="bottom"  :close-on-click-overlay="true" @click-overlay="overlayShow" z-index="9999">
				<view class="W_100 z_index_1000 overflow_hidden " style="height: 120vw;"> 
					<view class="flex_row_between BB_1_f2f2f2 PLR_2 relative">
						<image class="WH_26vw B_radius_5 B_2_fff MR_2" :src="goodsDetail.img" mode=""></image>
						<view class="W_70">
							<view class="flex_row_between PB_2">
								<view class="color_ED2251 font_weight_bold fontS_20">￥{{goodsDetail.spe_price}}</view>
								<view class="WH_8vw flex_colC" @click="buy_show=false">
									<view class="iconfont fontS_22" >&#xe6a7;</view>
								</view>
							</view>
							<view class="textL text_overflow_1 PB_2">
								{{goodsDetail.goods_name}}
							</view>
						</view>
					</view>
					<view class="PLR_2 overflow_y H_100" >
						<view class="W_100">
							<view class="PTB_2 textL ">
								选择颜色和尺码
							</view>
							<view class="flex_rowL W_100 overflow_x">
								<view class="PTB_1 PLR_2 MR_2 textC B_radius_5 " style="white-space: nowrap;" @click="checkidx(item,index)" :class="checkIdx == index ? 'bg_ED2251 color_fff':'color_999 B_1_999'"
								 v-for="(item,index) in goodsDetail.goods_attr[0]" :key="index">
									{{item}}
								</view>
							</view>
							<view class="PTB_3">
								<view class="flex_row_around PTB_1 bg_D0D0D0">
									<view>尺码</view>
									<view>购买数量</view>
								</view>
								<view class="bg_eee W_100" v-if="buy_show_attr">
									<view class="flex_row_around PTB_1" v-for="(item,idx) in attr2" :key="idx">
										<view>{{item.attr}}</view>
										<van-stepper min="0" :value="item.selected_nums" @minus="minusItem(item)" @plus="addItem(item)" button-size="24" @change="onChange" @blur="inputIdx(item)" />
									</view>
								</view>
							</view>
			
							<view class="PTB_2 textL ">
								选择颜色和尺码
							</view>
								<view class="W_100 MB_4">
									<view class="PLR_1 B_1_ED2251" style="width: 97%;" v-if="selectNums.length > 0">
										<view class="color_ED2251 W_100 " style="padding: 2rpx 0 2rpx 0;" v-for="(item,index) in selectNums" :key="index">
											{{item}}
										</view>
									</view>
								</view>
						</view>
			
						<view class="color_fff flex_rowC W_100 PTB_3 z_index_1000">
							<view class="PTB_2 W_70 flex_rowC bg_ED2251 B_radius_max" @click="editCart()">
								确定<view v-if="goodsNum > 0">({{goodsNum}})</view>
							</view>
						</view>
						<view class="H_40vw">
						
						</view>
					</view>
				</view>
			</van-popup>
		</template>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import headerTop from '../components/headerTop/headerTop.vue';
	import api from '../static/script/ajax.js';
	import {
		getShoppingCartlist,
		delGoodsOfCar,
		cartGoodsDetail,
		delCoosedGoodsOfCar,
		editShoppingCart,
		checkOrder
	} from '../static/script/const.js';
	import Dialog from '../wxcomponents/vant/dist/dialog/dialog.js';
	import {
		checkSpecification,
		unique,
		numEration
	} from '../static/script/minix.js'
	export default {
		data() {
			return {
				buy_show: false,
				checkIdx: 0,
				dataList: {},
				checkCartlist: [],
				goodsDetail: {},
				attr2: [],
				attr2List: [],
				selectNums: [],
				goodsNum: 0,
				checkNum: [],
				cId:'',
				gId:'',
				allCheck:false,
				orderPriceList:[],
				orderPrice:0,
				orderNumList:[],
				orderNum:0,
				selected_nums:0,
				buy_show_attr:false
			}
		},
		onShow() {
			this.allCheck = false;
			this.getShoppingCart();
			this.checkCartlist = [];
			this.orderPriceList = [];
			this.orderNumList = [];
			this.orderPrice = 0;
			this.orderNum = 0;
		},
		onPullDownRefresh() {
			this.getShoppingCart();
			this.checkCartlist = [];
		},
		methods: {
			getShoppingCart() {
				let that = this;
				api._post(getShoppingCartlist, {}).then((res) => {
					if (res.code == 0) {
						that.dataList = res.data;
						that.checkCartlist = [];
						that.orderPriceList = [];
						that.orderNumList = [];
						that.orderPrice = 0;
						that.orderNum = 0;
						if(res.data.list1_total_goods_nums > 0){
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
			checkidx(item, index) {
				let that = this;
				// console.log(that.goodsDetail)
				that.checkIdx = index;
				let arr = that.goodsDetail.goods_attr[1];
				let arr2 = [];
				arr.forEach((i) => {
					if (i.color === item) {
						that.attr2 = i.list;
					}
				})
				// console.log(that.attr2);
			},
			inputIdx(item){
				let that = this;
				item.selected_nums = that.selected_nums;
				that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);
				
				that.checkNum = checkSpecification(that.good_id, that.goodsDetail.goods_attr[1]);
				that.selected_nums = 0;
			},
			onChange(e){
				this.selected_nums = e.detail;
			},
			addItem(item) {
				let that = this;

				++item.selected_nums;

				that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);

				that.checkNum = checkSpecification(that.good_id, that.goodsDetail.goods_attr[1]);
			},
			minusItem(item) {
				let that = this;
				--item.selected_nums;
				that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);
				that.checkNum = checkSpecification(that.good_id, that.goodsDetail.goods_attr[1]);
			},
			checkCart(index,item) {
				this.dataList.list1[index].is_selected = !this.dataList.list1[index].is_selected;
				if (this.dataList.list1[index].is_selected) {
					this.checkCartlist = unique(this.checkCartlist.concat(this.dataList.list1[index].id));
					this.orderPriceList = unique(this.orderPriceList.concat(this.dataList.list1[index].total_price));
					this.orderPrice = numEration(this.orderPriceList);
					this.orderNumList = unique(this.orderNumList.concat(this.dataList.list1[index].total_goods_nums));
					this.orderNum = numEration(this.orderNumList);
				} else {
					this.orderNum = this.orderNum - this.dataList.list1[index].total_goods_nums;
					this.orderPrice = this.orderPrice - this.dataList.list1[index].total_price;
					this.checkCartlist.forEach((i,x)=>{
						if(i == this.dataList.list1[index].id){
							this.checkCartlist.splice(x,1);
						}
					})
					this.allCheck = false;
				}
				    for (let i = this.dataList.list1.length - 1; i >= 0; i--) {
				      if (!this.dataList.list1[i].is_selected) {
				        this.allCheck = false;
				        break;
				      } else {
						    this.allCheck = true;
					  }
				    }
			},
			dialog(type) {
				console.log(type)
				if(type == 'lose'){
					Dialog.confirm({
						message: '确定要删除过期商品吗?'
					}).then(() => {
						// on confirm
						api._post(delCoosedGoodsOfCar, {}).then((res) => {
							if (res.code == 0) {
								this.getShoppingCart();
								
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								});
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								});
							}
						})
					}).catch(() => {
						// on cancel
					});
				} else {
					if (this.checkCartlist.length < 1) {
						uni.showToast({
							title: '请选择商品',
							icon: 'none',
							duration: 2000
						});
						return
					}
					Dialog.confirm({
						message: '确定要删除选中商品吗?'
					}).then(() => {
						// on confirm
						if(this.checkCartlist.length < 1){
							uni.showToast({
								title: '请选择商品',
								icon: 'none',
								duration: 2000
							});
							return
						}
						api._post(delGoodsOfCar, {
							'ids': this.checkCartlist.toString()
						}).then((res) => {
							if (res.code == 0) {
								this.getShoppingCart();
								this.checkCartlist = [];
								this.orderPrice = 0;
								this.orderNum = 0;
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								});
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								});
							}
						})
					}).catch(() => {
						// on cancel
					});
				}
			},

			editCart(){
				let that = this;
				if(that.checkNum.length > 0){
					let attr = [];
					console.log()
					attr = that.checkNum[0].list;
					let param = {
						'car_id':that.cId,
						'goods_id':that.gId,
						'json_str':encodeURIComponent(JSON.stringify(attr)),
					}
					api._post(editShoppingCart,param).then((res)=>{
						if(res.code == 0){
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							});
							that.buy_show = false;
							that.getShoppingCart();
						}
					})
				} else {
					that.buy_show = false;
				}
			},

			getcartGoodsDetail(item) {
				let that = this;
				that.cId = item.id;
				that.gId = item.goods_id;
				let param = {
					'car_id': item.id,
					'goods_id': item.goods_id
				}
				api._post(cartGoodsDetail, param).then((res) => {
					if (res.code == 0) {
						that.buy_show = true;
						
						that.goodsDetail = res.data.info;
						
						setTimeout(()=>{
							that.buy_show_attr = true;
							that.attr2 = that.goodsDetail.goods_attr[1][0].list;
							that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);
						},150)
						
						
					}
				})
			},


			backGoodsAttrStr(list) {
				let data1 = [];
				let num = 0;
				for (let item in list) {
					let demo_obj = list[item];
					// console.log(demo_obj)
					if (this.getTotalSelectedNums(demo_obj.list) > 0) {
						let str = demo_obj.color + ": ";
						// console.log(demo_obj);
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
					}

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
			submitOrder(){
				let that = this;
				console.log(that.checkCartlist)
				// return
				if(this.checkCartlist.length < 1){
					uni.showToast({
						title: '请选择商品',
						icon: 'none',
						duration: 2000
					});
					return
				}
				let param = {
						'json_str': '',
						'car_ids':that.checkCartlist.toString()
					}
				
				that.$openPage({name:'confirmOrder',query:{order_type:'cart',car_ids:that.checkCartlist.toString()}})
			},
			checkAll(){
				console.log(this.dataList.list1);
				this.allCheck = !this.allCheck;
				if(this.allCheck){
					this.dataList.list1.forEach((item)=>{
						item.is_selected = true;
						this.checkCartlist.push(item.id);
						this.orderPriceList = unique(this.orderPriceList.concat(item.total_price));
						this.orderPrice = numEration(this.orderPriceList)
						this.orderNumList = unique(this.orderNumList.concat(item.total_goods_nums));
						this.orderNum = numEration(this.orderNumList)
					})
					console.log(this.orderPrice)
				} else {
					this.dataList.list1.forEach((item)=>{
						item.is_selected = false;
						this.checkCartlist = [];
						this.orderPriceList = [];
						this.orderNumList = [];
						this.orderPrice = 0;
						this.orderNum = 0;
					})
				}
			},
			back(){
				uni.switchTab({
					url: "tab1"
				})
			},
			overlayShow(e){
				this.buy_show = false;
			},
			handleTouchMove(e){
				console.log(e);
			    e.stopPropagation()
			  }
		},
		components: {
			headerTop,
		}
	}
</script>

<style>
	.plus-class {
		background-color: #F5F7FA;
		border: solid 1px #D8DCE6;
	}
	
	.minus-class {
		background-color: #F5F7FA;
		border: solid 1px #D8DCE6;
	}
	
	::-webkit-scrollbar {
		display: inline-block !important;
		width: 4px;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: #ED2251 !important;
	}
</style>
