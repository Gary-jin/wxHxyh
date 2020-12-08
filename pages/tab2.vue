<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<headerTop title="浏览记录"></headerTop>
		<view class="bg_fff P_3 flex_row_between relative overflow_y">
			<input class=" B_radius_5 B_1_999 PL_3 W_60" v-model="day" disabled @click="show=true">

			</input>
			<view class="iconfont" @click="checkShow = !checkShow">
				{{checkShow ?'完成' : '&#xe628;'}}
			</view>
			<view class="iconfont absolute fontS_18 color_999" style="left: 50%;">
				&#xe6ae;
			</view>
		</view>
		
		<view class="overflow_x" v-if="dataList&&dataList.length > 0">
			<view class="" v-for="(asset,idx) in dataList" :key="idx">
				<view class="PLR_3 PTB_2">
					{{asset.date}}
				</view>
				<view class="flex_rows_start">
					<view class="W_33 flex_colC MB_1" v-for="(item,index) in asset.goods_list" :key="index">
						<image :src="item.img" class="WH_32vw" mode="aspectFill" @click="openGoods(item)"></image>
						<view class="PTB_2 W_32vw bg_fff flex_row_around">
							<view class="flex_rowL">
								<view class="iconfont fontS_20" @click="checkSelected(item,index)" v-show="checkShow">
									{{!item.is_selected ? '&#xe609;':'&#xe7e9;'}}
								</view>
								<view class="color_ED2251">￥{{item.spe_price}}</view>
							</view>
							<view class="iconfont fontS_22" @click="share(item)" v-show="!checkShow">&#xe7fb;</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="fixed W_100 bg_fff H_14vw flex_rowL" style="bottom: 0;" v-show="checkShow">
			<view class="flex_rowL flex_grow_1" style="line-height: 14vw;" @click="checkAll">
				<view class="iconfont PL_2 PR_1">
					 {{allCheck ? '&#xe7e9;' : '&#xe609;'}}
				</view> 
				<view>全选</view>
			</view>
			<view class="bg_ff5126 textC color_fff fontS_16 W_34vw" style="line-height: 14vw;" @click="delGood('all')">
				删除
			</view>
		</view>
		<!-- 时间选择 -->
		<view class="absolute W_100" style="bottom: 0;">
			<van-datetime-picker v-if="show" visible-item-count="3" type="date" :value="currentDate" :max-date="maxDate"
			 :formatter="formatter" @confirm="confirm" @cancel="cancel" />
		</view>
		
		<van-overlay :show="shareShow">
		  <view class="fixed W_100 bg_fff" style="bottom: 0;">
				<view class="PLR_3 PTB_2 flex_rowC" style="background-color: #F4F4F4">
					<view class="PLR_2 W_60 flex_row_around BB_1_f2f2f2">
						<button class="flex_colC" open-type="share">
							<image class="WH_10vw" src="http://qnyimages.hexieyihao.vip/tab2_shareImg1.png" mode=""></image>
							<view class="fontS_12 MT_2">
								微信
							</view>
						</button>
						<button class="flex_colC" @click="checkShare(index)" v-for="(item,index) in shareList" :key="index">
							<image class="WH_10vw" :src="item.img" mode=""></image>
							<view class="fontS_12 MT_2">
								{{item.title}}
							</view>
						</button>
					</view>
				</view>
				<view class="flex_rowC PTB_2" @click="shareShow=false">
					取消
				</view>
		  </view>
		</van-overlay>
	
		<van-popup :show="buy_show" :close-on-click-overlay="true" @click-overlay="overlayShow" position="bottom">
			<view class="W_100 overflow_hidden" style="height: 150vw;">
				<view class="PLR_2 H_100 overflow_y">
					<view class="flex_row_between BB_1_f2f2f2">
						<image class="WH_26vw B_radius_5 B_2_fff MR_2" :src="attr2[0].thumb == '' ? goodsDetail.img : attr2[0].thumb"
						 mode=""></image>
						<view class="W_70">
							<view class="flex_row_between PB_2">
								<view class="color_ED2251 font_weight_bold fontS_20">￥{{goodsDetail.spe_price}}</view>
								<view class="iconfont fontS_22" @click="buy_show=false">&#xe6a7;</view>
							</view>
							<view class="textL text_overflow_1 PB_2">
								{{goodsDetail.goods_name}}
							</view>
						</view>
					</view>
		
					<view class="W_100">
						<view class="PTB_2 textL ">
							选择颜色和尺码
						</view>
						<view class="W_100 flex_rowL  overflow_x">
							<text class="PTB_1 PLR_2 MR_2 textC B_radius_5" style="white-space: nowrap;display: inline-block;" @click="checkidx(item,index)"
							 :class="checkIdx == index ? 'bg_ED2251 color_fff':'color_999 B_1_999'" v-for="(item,index) in goodsDetail.list1"
							 :key="index">
								{{item}}
							</text>
						</view>
						<view class="PTB_3">
							<view class="flex_row_around PTB_1 bg_D0D0D0">
								<view>尺码</view>
								<view>购买数量</view>
							</view>
							<scroll-view class="bg_eee W_100 ">
								<view class="flex_row_around PTB_1" v-for="(item,index) in attr2" :key="index">
									<view>{{item.attr}}</view>
									<van-stepper min="0" :value="item.selected_nums" @minus="minusItem(item)" @plus="addItem(item)" button-size="24" />
								</view>
							</scroll-view>
						</view>
		
						<view class="PTB_2 textL " v-if="selectNums.length > 0">
							选择颜色和尺码
						</view>
						<view class="W_100 MB_14">
							<scroll-view class="PLR_1 B_1_ED2251" style="width: 97%;" v-if="selectNums.length > 0">
								<view class="color_ED2251 W_100 " style="padding: 2rpx 0 2rpx 0;" v-for="(item,index) in selectNums" :key="index">
									{{item}}
								</view>
							</scroll-view>
						</view>
					</view>
		
					<view class="color_fff flex_rowC W_100 fixed z_index_1000 PTB_3" style="bottom: 0;">
						<view class="PTB_2 textC W_40 bg_444444 BL_radius_max" @click="addShoppingCart">
							加入购物车
						</view>
						<view class="PTB_2 flex_rowC W_40 bg_ED2251 BR_radius_max" @click="checkGood('buy')">
							立即购买 <view v-if="goodsNum > 0">({{goodsNum}})</view>
						</view>
					</view>
				</view>
			</view>
		</van-popup>
	
		<view class="H_100vh W_100 flex_colC" v-if="dataList&&dataList.length < 1">
			<view>努力加载中...</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../components/headerTop/headerTop.vue';
	import api from '../static/script/ajax.js';
	import {getBrowsegoodList,delBrowsegoodList,addShoppingCartlist,checkOrder,getShoppingCartlist} from '../static/script/const.js';
	import {formatDate,unique,checkSpecification} from '../static/script/minix.js';
	export default {
		data() {
			return {
				show: false,
				currentDate: new Date().getTime(),
				maxDate: new Date().getTime(),
				checkShow:false,
				shareShow:false,
				shareList:[
					{
						'title':'加入购物车',
						'img':'http://qnyimages.hexieyihao.vip/tab2_shareImg2.png'
					},
					{
						'title':'删除',
						'img':'http://qnyimages.hexieyihao.vip/tab2_shareImg3.png'
					}
				],
				dataList:[],
				page:1,
				gId:'',
				Id:'',
				goodsId:[],
				day:'',
				allCheck:false,
				checkIdx:0,
				buy_show:false,
				goodsDetail:{},
				attr2: [],
				attr2List: [],
				selectNums: [],
				goodsNum: 0,
				checkNum: [],
			}
		},
		onReachBottom() {
			this.getBrowseList('more');
		},
		// 分享
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				
			}
		
			return {
				title: '和鞋一号',
				path: '/pages/common/shopGoodInfo?id=' + uni.getStorageSync('goodId') + '&pid=' + uni.getStorageSync('userId'),
				// path: '/pages/videoinfo/videoinfo?id=' + this.courseId + '&type=' + this.type + '&activity_id=' + this.activity_id +
				// 	'&uid=' + this.uid,
				imageUrl: this.shareImg
			}
		},
		onShow() {
			this.page = 1;
			this.getBrowseList();
			// let timestamp = new Date().getTime();
			// this.day = formatDate(timestamp)
			this.getShoppingCart();
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			});
		},
		onPullDownRefresh() {
			// let timestamp = new Date().getTime();
			// this.day = formatDate(timestamp)
			this.getBrowseList();
		},
		methods: {
			getBrowseList(type){
				let that =this;
				let param;
				if(type == 'more'){
					param = {
						'page':++that.page,
						'search_type':that.day
					};
				} else {
					param = {
						'page':1,
						'search_type':that.day
					};
				}
				api._get(getBrowsegoodList,param).then((res)=>{
					if(res.code == 0){
						if(type == 'more'){
							that.dataList = that.dataList.concat(res.data.list);
						} else {
							that.dataList = res.data.list;
						}
					}
				})
			},
			openGoods(item){
				if(item.is_ground === 1){
					this.$openPage({name:'shopGoodInfo',query:{good_id:item.goods_id}})
				} else {
					uni.showToast({
						title: '该商品已过期！',
						icon: 'none',
						duration: 2000
					});
				}
			},
			share(item){
				let that = this;
				that.shareShow = !that.shareShow;
				that.Id = item.id;
				that.gId = item.goods_id;
				that.goodsDetail = item;
			},
			delGood(type){
				let that = this;
				let param
				if(type == 'all'){
					param = {
						'ids':that.goodsId.toString()
					}
				} else {
					param = {
						'ids':that.Id
					}
				}
				
				api._post(delBrowsegoodList,param).then((res)=>{
					if(res.code == 0){
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						that.shareShow = false;
						that.getBrowseList();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			goTo(index){
				if(index === 0){
					
				} else if(index === 1){
					this.$openPage({name:'shopGoodInfo'})
				} else {
					
				}
			},
			checkShare(index){
				if(index == 0){
					this.buy();
				} else {
					this.delGood('once');
				}
			},
			checkSelected(item,index){
				item.is_selected = !item.is_selected;
				if(item.is_selected){
					this.goodsId = unique(this.goodsId.concat(item.id));
				} else {
					this.allCheck = false;
				}
				return
				for (let i = this.dataList.length - 1; i >= 0; i--) {
					
					this.dataList[i].goods_list.forEach((j)=>{
						
						if (!j.is_selected) {
						  this.allCheck = false;
						} else {
							this.allCheck = true;
						}
					})

				}
				
				// this.dataList[index].is_selected = !this.dataList[index].is_selected;
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`;
				}
				return value;
			},
			confirm(val){
				
				let date = val;
				this.day = formatDate(date.detail)
				
				this.getBrowseList();
				this.show = false;
			},
			cancel(){
				this.show = false;
			},
			checkAll(){
				this.allCheck = !this.allCheck;
				if(this.allCheck){
					this.dataList.forEach((item)=>{
						for(let asset in item.goods_list){
							
							item.goods_list[asset].is_selected = true;
							this.goodsId.push(item.goods_list[asset].id)
						}
					})
				} else {
					this.dataList.forEach((item)=>{
						for(let asset in item.goods_list){
							
							item.goods_list[asset].is_selected = false;
							this.goodsId = [];
						}
					})
				}
			},
			buy() {
				let that = this;
				
				that.buy_show = true
				that.attr2 = that.goodsDetail.list2[0].list
			},
			checkidx(item, index) {
				let that = this;
				console.log(that.goodsDetail)
				console.log(item)
				that.checkIdx = index;
				let arr = that.goodsDetail.list2;
				arr.forEach((i) => {
					if (i.color === item) {
						that.attr2 = i.list;
					}
				})
			},
			addItem(item) {
				let that = this;
			
				++item.selected_nums;
			
				that.backGoodsAttrStr(that.goodsDetail.list2);
			
				that.checkNum = checkSpecification(that.gId, that.goodsDetail.list2);
			},
			minusItem(item) {
				let that = this;
				--item.selected_nums;
				that.backGoodsAttrStr(that.goodsDetail.list2);
				that.checkNum = checkSpecification(that.gId, that.goodsDetail.list2);
			},
			backGoodsAttrStr(list) {
				let data1 = [];
				let num = 0;
				for (let item in list) {
					let demo_obj = list[item];
					
					if (this.getTotalSelectedNums(demo_obj.list) > 0) {
						let str = demo_obj.color + ": ";
						
						let arr = demo_obj.list;
			
						for (let it in demo_obj.list) {
							let demo_item = demo_obj.list[it];
							num += Number(demo_item.selected_nums);
							this.goodsNum = num;
							if (demo_item.selected_nums > 0) {
								str += demo_item.attr + "/" + demo_item.selected_nums + "件，";
							}
						}
						
						data1.push(str);
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
		
			addShoppingCart() {
				let that = this;
				let attr = that.checkNum[0].list;
				
				// return
				let param = {
					'json_str': encodeURIComponent(JSON.stringify(attr)),
					'goods_id': that.gId
				}
				api._post(addShoppingCartlist, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						that.buy_show = false;
						that.getShoppingCart();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
		checkGood(type) {
			let that = this;
			
			if (that.checkNum.length < 1) {
				uni.showToast({
					title: '您还未选择商品',
					icon: 'none',
					duration: 2000
				});
				return
			}
						that.$openPage({
							name: 'confirmOrder',
							query: {
								data: '',
								json_str: encodeURIComponent(JSON.stringify(that.checkNum))
							}
						})

		},
		getShoppingCart(){
			api._post(getShoppingCartlist, {}).then((res) => {
				if (res.code == 0) {
					
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
		overlayShow(e){
			this.buy_show = false;
		}
		},
		
		components: {
			headerTop,
		},
	}
</script>

<style>
	button::after {
		border: none;
	}
</style>
