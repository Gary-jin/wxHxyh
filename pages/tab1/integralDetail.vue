<template>
	<view v-if="getGoodsInfo" :class="buy_show || cart_show || shoppingCartshow ? 'overflow_hidden H_100vh' : ''">
		<view class="WH_10vw B_radius_max flex_colC z_index_1000 fixed" @click="backOut" style="top: 4%;left: 5%;background-color: rgba(0,0,0,0.5);">
			<view class="iconfont color_fff fontS_20 PL_1">
				&#xe724;
			</view>
		</view>
		<!-- <view class="flex_rowC" style='width:0px;height:0px;overflow:hidden;'> -->
			<canvas canvas-id="shareCanvas" style="width: 255px;height: 455px;z-index: 9999;position: absolute;bottom: 10000rpx"></canvas>
		<!-- </view> -->
		<view class="">
			<view class="W_100 H_100vw absolute" style="top: 0;z-index: 0;">
				<view class="uni-padding-wrap WH_100">
					<view class="page-section swiper WH_100">
						<view class="page-section-spacing WH_100">
							<swiper class="swiper WH_100" :indicator-dots="indicatorDots" :autoplay="autoplay" circular="true" :interval="interval"
							 :duration="duration" @change="swiperChange">
								<swiper-item v-for="(item,index) in dataList.banner_imgs" :key="index">
									<view class="swiper-item uni-bg-red WH_100">
										<video class="WH_100" @play="videoPlay" @pause="videoPause" :enable-play-gesture="true" :src="dataList.banner_imgs[0]"
										 v-if="index === 0 && dataList.video_url != ''" controls></video>
										<view class="WH_100 flex_colC">
											<image :src="item" class="WH_100" :mode="mode"></image>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="H_100vw"></view>

      <view class="text_overflow_2 MTB_2 PLR_2">{{dataList.goods_name}}</view>
      <view class="PLR_2 MB_2 flex_row_between">
        <view class="color_ED2251 flex_rowL">
          <view class="font_weight_bold">{{parseInt(dataList.spe_price)}}</view>
          <view>积分可兑换</view>
        </view>
        <view class="flex_rowL">
          <view class="PLR_2 bg_ED2251 color_fff B_radius_max MR_2" @click="signIn">{{is_sign == 0 ? '点击签到':'今日已签到' }}</view>
          <view class="PLR_2 bg_ED2251 color_fff B_radius_max" @click="$openPage({name:'articleInfo',query:{type:5}})">积分规则</view>
        </view>
      </view>
			<view class="flex_rowL PL_2 MB_2 color_999">已兑换次数：{{dataList.sales}}</view>
			
			<view class="PTB_2 BT_5_f2f2f2">
				商城活动
			</view>
			<view class="" >
					<image style="width: 100%; height:340rpx" v-for="(item,index) in recommendlist" @click="getCate(item)" :key="index" :src="item.imgUrl" mode=""></image>
			</view>
			
			<view class="PTB_2 BT_5_f2f2f2 ">
				宝贝详情
			</view>
			<view class="flex_colC W_100">
				<image class="W_100" @click="showImage(item,index)" v-for="(item,index) in dataList.imgs" :key="index"
				 style="display: block;" :src="item" mode="widthFix"></image>
			</view>
			
			
			
			<view class="H_18vw"></view>
			<view class="fixed W_100" style="bottom: 0;">
        <view class="bg_fff flex_rowC PTB_1">
          <view class="W_85 PTB_2 B_radius_max color_fff bg_ED2251 textC"  @click="buy()">点击积分兑换</view>
        </view>
			</view>



			<van-popup :show="buy_show" z-index="1000" position="bottom" safe-area-inset-top="true" @click-overlay="overlayShow">
				<scroll-view class="W_100 z_index_2000 overflow_hidden" style="height: 120vw;">
					<view class="flex_row_between BB_1_f2f2f2 PLR_2 relative">
						<image class="WH_26vw B_radius_5 B_2_fff MR_2" @click="skuImageShow(attr2[0].thumb == '' ? dataList.img : attr2[0].thumb)" :src="attr2[0].thumb == '' ? dataList.img : attr2[0].thumb" mode=""></image>
						<view class="W_70">
							<view class="flex_row_between PB_2">
								<view class="W_70 flex_row_between">
									<view class="color_ED2251 font_weight_bold fontS_18">{{spe_price == '' ? parseInt(dataList.spe_price) : spe_price}}积分可兑换</view>
								</view>
								<view class="iconfont fontS_22" @click="buy_show=false">&#xe6a7;</view>
							</view>
							<view class="textL text_overflow_1 PB_2">
								{{dataList.goods_name}}
							</view>
						</view>
					</view>

					<view class="PLR_2 overflow_y H_100 PB_10">

						<view class="W_100 PTB_2">
              <view>
                <view class="PTB_2">{{dataList.field1}}</view>
                <view class="flex_rowL"  style="flex-flow: wrap;">
                  <view v-for="(item,index) in dataList.list1" :key="index"  @click="checkidx('',item,index)" :class="checkIdx == index ? 'bg_ED2251 color_fff':'color_999 B_1_999'" class="MR_2 PTB_1 MB_2 B_radius_5 PLR_2">{{item}}</view>
                </view>
              </view>
              <view >
                <view class="PTB_2">{{dataList.field2}}</view>
                <view class="flex_rowL"  style="flex-flow: wrap;">
                  <view v-for="(items,ind) in attr2" :key="ind" @click="checkidx2v(items,ind)" :class="checkIdx2 == ind ? 'bg_ED2251 color_fff':'color_999 B_1_999'" class="MR_2 PTB_1 MB_2  B_radius_5 PLR_2">{{items.attr}}</view>
                </view>
              </view>
						</view>

            <view class="flex_rowR MB_2">
              <van-stepper min="1" :max="checkIdx2count" :disabled="disabled" @change="onChange" value="checkIdx2Num"
                 />
            </view>

						<view class="color_fff flex_rowC W_100 z_index_100">
							<view class="PTB_2 flex_rowC W_100 bg_ED2251 B_radius_max" @click="checkGood('buy')">
								点击积分兑换 
							</view>
						</view>

						<view class="H_40vw"></view>
					</view>
				</scroll-view>
			</van-popup>

			<van-dialog id="van-dialog" />
			<van-popup :show="toastShow" z-index="9999" custom-style="border-radius: 5px;" :overlay='false'>
				<view class="PTB_1 PLR_3 bg_ED2251 color_fff B_radius_5">
					请先选择颜色再选尺码
				</view>
			</van-popup>

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
	</view>
	<view class="" v-else>
		<van-skeleton title row="10" />
	</view>

	
	
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		goodInfo,
		getGoodsShareimage,
		checkOrder,
		getShoppingCartlist,
		addShoppingCartlist,
		delGoodsOfCar,
		cartGoodsDetail,
		editShoppingCart,
		getGoodsImg,
    hotGoodsList,
    userSignIn,
    userInfo
	} from '../../static/script/const.js';
	import {
		checkSpecification,
		unique,
		numEration,
		downloadFile
	} from '../../static/script/minix.js';
	export default {
		data() {
			return {
				signShow:false,
				containerStyle: 'background-image: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0)) !important',
				headerStyle: 'background-image: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0)) !important',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				circular: true,
				show: false,
				buy_show: false,
				cart_show: false,
				shareImgshow: false,
				shareList: [{
					'title': '二维码海报',
					'img': 'http://qnyimages.hexieyihao.vip/share_icon3.png'
				}],
        checkIdx: -1,
        checkIdx2: -1,
				good_id: '',
				dataList: {},
				specificationImg: '',
				attr2: [],
				attr2List: [],
				selectNums: [],
				goodsNum: 0,
				checkNum: [],
				shoppingCartshow: false,
				shoppingCartlist: [],
				checkCartlist: [],
				user_id: '',
				mode: 'aspectFill',
				shareImg: '',
				allCheck: false,
				orderPriceList: [],
				orderPrice: 0,
				orderNumList: [],
				orderNum: 0,
				videoContext: {},
				lists: [],
				goodsDetail: {},
				cId: '',
				gId: '',
				disabled: true,
				spe_price: '',
				user: {},
				selected_nums: 0,
				pages: '',
				getGoodsInfo: false,
				backIdx:true,
				canvasWidth:0,
				canvasHeight:0,
				toastShow:false,
				recommendlist: [],
				goodList:[],//推荐商品列表
				page: 1,
				goodsShow: false,
        goTopShow:false,
        checkIdx2count:'',
        checkIdx2Num: 1 ,
        attr_id:'',
        is_sign:''
			}
		},
		onReachBottom() {
			this.getGoodlist('more');
		},
		onLoad(options) {
			// this.getGoodlist();
			this.getRecommend();
			console.log(options)
			wx.showShareMenu({  
				withShareTicket: true,
				menus: ['shareAppMessage', 'ShareTimeline'],	
			})
			if(options.type){
				this.backIdx = false;
				this.good_id = options.goodsId;
				uni.setStorage({
					key: 'pid',
					data: options.pid,
					success: function() {
				
					}
				});
				if (!uni.getStorageSync('token') && options.is_worker == 1) {
					// console.log('跳转登录')
					uni.navigateTo({
						url: '/pages/common/login?type=' + options.type +'&pid=' + options.pid + '&goodsId=' + options.goodsId
					});
				}
				return
			} else if (options.id) {
				this.backIdx = false;
				this.good_id = options.id;
				uni.setStorage({
					key: 'pid',
					data: options.pid,
					success: function() {
				
					}
				});
				if (!uni.getStorageSync('token') && options.is_worker == 1) {
					// console.log('跳转登录')
					uni.navigateTo({
						url: '/pages/common/login?type=delToken'
					});
				}
				return
			} else if(options.good_id){
				this.backIdx = false;
				this.good_id = options.good_id;
				return
			} else if(this.$parseURL().good_id) {
				this.pages = this.$parseURL().pages;
				this.good_id = this.$parseURL().good_id;
			} else {
				this.backIdx = false;
			}
			this.user_id = uni.getStorageSync('userId')
			uni.setStorageSync('goodId', this.good_id);
			this.videoContext = uni.createVideoContext('myVideo',this);
			this.user = uni.getStorageSync('userInfo');
			// identity_str
			// console.log(this.user.identity_str)
			this.getUserInfo()
		},
		// 分享
		onShareAppMessage(res) {
			return {
				title: this.dataList.goods_name,
				path: '/pages/common/shopGoodInfo?id=' + uni.getStorageSync('goodId') + '&pid=' + uni.getStorageSync('userId') +
					'&is_worker=' + this.user.is_worker,
				imageUrl: this.dataList.share_img
			}
		},
		onShareTimeline(res) {
			console.log(res);
			let that = this;
			if (res.from === 'menu') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
				title: that.dataList.goods_name,
				query: 'id=' + uni.getStorageSync('goodId') + '&pid=' + uni.getStorageSync('userId') +
					'&is_worker=' + that.user.is_worker,
				imageUrl: that.dataList.img
			}
		},
		onShow() {
			this.checkIdx = -1;
			this.disabled = true;
			this.getGoodmsg();
			this.getshoppingCartlist();
			this.show = false;
		},
		watch:{
			toastShow(val){
				console.log(val);
				if(this.toastShow) {
					setTimeout(() => {
						this.toastShow = false;
					},2000)
				}
			}
		},
		mounted() {
			
		},
		methods: {
			goTop(){
				this.pageScrollTop((ret) => {});
				this.goTopShow = false
			},
			pageScrollTop(callback) {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
					success: (res) => {
						callback(res);
					}
				});
			},
			// 推荐 商品列表
			getGoodlist(type) {
				let param;
				if (type == 'more') {
					param = {
						'page': ++this.page,
						'goods_id': this.good_id
					};
				} else {
					param = {
						'page': 1,
						'goods_id': this.good_id
					};
				}
				console.log(param)
				api._get(hotGoodsList, param).then((res) => {
					if (res.code == 0) {
						if (type == 'more') {
							this.goTopShow = true
							if (res.data.list && res.data.list.length > 0) {
								this.goodList = this.goodList.concat(res.data.list);
								this.goodsShow = false;
							} else {
								this.goodsShow = true;
							}
						} else {
							this.goodList = res.data.list;
						}
					}
				})
			},
			// 商城活动 列表
			getRecommend() {
				api._get(getGoodsImg, {
					'page': '1'
				}).then((res) => {
					if (res.code == 0) {
						this.recommendlist = res.data.list;
						console.log(JSON.stringify(this.recommendlist))
					}
				})
			},
			// 商城活动 跳转
			getCate(item){
				if(item.about_type == 1){
					uni.$emit('goodsDetallUpdate',{goodsDetall:item})
				}else if(item.about_type == 3){
					this.$openPage({'name':'integralShop'})
				}else{
					uni.switchTab({
						url: '../tab1'
					})
					setTimeout(() => {
						uni.$emit('backAll',{item:item})
					},700)
				}
			},
			getGoodmsg() {
				let that = this;
				let param = {
					'goods_id': that.good_id
				}
				api._post(goodInfo, param).then((res) => {
					if (res.code == 0) {
						
						if (res.data.info.video_url != '') {
							res.data.info.banner_imgs.unshift(res.data.info.video_url.replace(/"/g, ''));
							
						}
						that.dataList = res.data.info;
						that.goods_id = res.data.info.goods_id;
						that.getGoodlist();
						console.log(that.dataList.img)
						that.getGoodsInfo = true;
						// console.log(that.dataList.banner_imgs.length)
						that.lists.push(res.data.info);
					} else if(res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						setTimeout(() => {
							uni.switchTab({
								url: "../tab1"
							});
						},1000);
					}
				})
			},
			checkidx(type, item, index) {
				let that = this;
        that.checkIdx = index;
        this.checkIdx2 = -1
				if (index != -1) {
					// that.disabled = false;
				}
				if (type == 'cart') {
					let arr = that.goodsDetail.goods_attr[1];
					arr.forEach((i) => {
						if (i.color === item) {
							that.attr2 = i.list;
						}
					})
				} else {
					let arr = that.dataList.list2;
					arr.forEach((i) => {
						if (i.color === item) {
							that.attr2 = i.list;
						}
					})
				}

      },
      checkidx2v(item,index){
				console.warn(JSON.stringify(item.spe_price))
				this.spe_price = item.spe_price
        this.checkIdx2 = index 
        this.checkIdx2count = item.count
        this.disabled = false
        this.attr_id = item.attr_id
      },
			inputIdx(type, item) {
				let that = this;
				item.selected_nums = that.selected_nums;
				if (type == 'cart') {
					that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);

					that.checkNum = checkSpecification(that.good_id, that.goodsDetail.goods_attr[1]);
				} else {
					that.backGoodsAttrStr(that.dataList.list2);
					that.checkNum = checkSpecification(that.good_id, that.dataList.list2);
				}
				that.selected_nums = 0;
			},
			onChange(e) {
        this.checkIdx2Num = e.detail;
			},
			addItem(type, item) {
				let that = this;
				// console.log(item);
				that.spe_price = item.spe_price;
				if (that.checkIdx == -1) {
					that.toastShow = true;
					return
				} else {
					++item.selected_nums;
					if (type == 'cart') {
						that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);

						that.checkNum = checkSpecification(that.good_id, that.goodsDetail.goods_attr[1]);
					} else {
						that.backGoodsAttrStr(that.dataList.list2);
						that.checkNum = checkSpecification(that.good_id, that.dataList.list2);
					}
				}

			},
			minusItem(type, item) {
				let that = this;
				--item.selected_nums;
				if (type == 'cart') {
					that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);

					that.checkNum = checkSpecification(that.good_id, that.goodsDetail.goods_attr[1]);
				} else {
					that.backGoodsAttrStr(that.dataList.list2);
					that.checkNum = checkSpecification(that.good_id, that.dataList.list2);
				}
			},
			getShareimage() {
				let that = this;
				let param = {
					'goods_id': that.good_id
				}
				api._get(getGoodsShareimage, param).then((res) => {
					if (res.code == 0) {
						that.shareImg = res.data.imgUrl;
						// that.canvasImg(res.data.imgUrl,res.data.xcx_code_img);
					}
				})
			},
			canvasImg(img1,img2){
				const GetImageInfo = uni.getImageInfo;
				uni.showLoading({
				    title: '加载中'
				});
				let that = this;
				Promise.all([
				    GetImageInfo({
				        src: img1
				    }),
				    GetImageInfo({
				        src: img2
				    })
				]).then(res => {
					let arr1 = res[0];
					let arr2 = res[1];
				    const ctx = uni.createCanvasContext('shareCanvas')
				    
				    // 底图
				    ctx.drawImage(arr1[1].path, 0, 0, 255, 455)
				
				    // 小程序码
				    const qrImgSize = 75
				    ctx.drawImage(arr2[1].path, 175, 375, qrImgSize, qrImgSize)
				
				    ctx.stroke();
				    ctx.draw();
					const wxCanvasToTempFilePath = uni.canvasToTempFilePath;
					
					wxCanvasToTempFilePath({
					    canvasId: 'shareCanvas'
					}, this).then(res => {
						that.shareImg = res[1].tempFilePath;
						setTimeout(() => {
							uni.hideLoading();
						},500)
					})
				})
			},
			checkGood(type) {
        console.log(this.checkIdx2Num)
        console.log(this.attr_id)
				let that = this;
          if(this.checkIdx == -1){
             uni.showToast({
							title: '您还未选择颜色',
							icon: 'none',
							duration: 2000
            });
            return
          }
          if(this.checkIdx2 == -1){
             uni.showToast({
							title: '您还未选择尺寸',
							icon: 'none',
							duration: 2000
            });
            return
          }
          that.buy_show = false;
					that.$openPage({
						name: 'integralOrder',
						query: {
							attr_id: this.attr_id,
							num: this.checkIdx2Num
						}
					})
			},
			buy() {

				let that = this;
				let value = uni.getStorageSync('token');
				if (!value) {
					that.buy_show = false;
					uni.navigateTo({
						url: '/pages/common/login?type=delToken'
					});
				} else {
					// that.getshoppingCartlist();
					that.buy_show = true
					that.attr2 = that.dataList.list2[0].list
				}
			},
			share() {
				this.show = true;
				this.getShareimage();
			},
			getshoppingCartlist() {
				let that = this;
				api._post(getShoppingCartlist, {}).then((res) => {
					if (res.code == 0) {
						that.shoppingCartlist = res.data;
						that.checkCartlist = [];
						that.orderPriceList = [];
						that.orderNumList = [];
						that.orderPrice = 0;
						that.orderNum = 0;
					}
				})
			},

			addShoppingCart() {
				let that = this;
				let attr = that.checkNum[0].list;
				// return
				let param = {
					'json_str': encodeURIComponent(JSON.stringify(attr)),
					'goods_id': that.good_id
				}
				api._post(addShoppingCartlist, param).then((res) => {
					if (res.code == 0) {
						that.checkIdx = 0;
						this.shoppingCartshow = true;
						this.buy_show = false;
						that.getshoppingCartlist();
					}
				})
			},
			checkCart(index) {
				this.shoppingCartlist.list1[index].is_selected = !this.shoppingCartlist.list1[index].is_selected;

				if (this.shoppingCartlist.list1[index].is_selected) {
					this.checkCartlist = unique(this.checkCartlist.concat(this.shoppingCartlist.list1[index].id));
					this.orderPriceList = unique(this.orderPriceList.concat(this.shoppingCartlist.list1[index].total_price));
					this.orderPrice = numEration(this.orderPriceList);
					this.orderNumList = unique(this.orderNumList.concat(this.shoppingCartlist.list1[index].total_goods_nums));
					this.orderNum = numEration(this.orderNumList);
				} else {
					this.allCheck = false;
					this.orderNum = this.orderNum - this.shoppingCartlist.list1[index].total_goods_nums;
					this.orderPrice = this.orderPrice - this.shoppingCartlist.list1[index].total_price;
					this.checkCartlist.forEach((i, idx) => {
						if (i == this.shoppingCartlist.list1[index].id) {
							this.checkCartlist.splice(idx, 1);
						}
					})
				}
				for (let i = this.shoppingCartlist.list1.length - 1; i >= 0; i--) {
					if (!this.shoppingCartlist.list1[i].is_selected) {
						this.allCheck = false;
						break;
					} else {
						this.allCheck = true;
					}
				}

				if (this.checkCartlist.length < 1) {
					this.orderPrice = 0;
					this.orderNum = 0;
				}
			},
			checkCarts() {
				this.allCheck = !this.allCheck;
				this.shoppingCartlist.list1.forEach((item) => {
					if (this.allCheck) {
						this.checkCartlist.push(item.id)
						item.is_selected = true;
						this.orderPriceList = unique(this.orderPriceList.concat(item.total_price));
						this.orderPrice = numEration(this.orderPriceList)
						this.orderNumList = unique(this.orderNumList.concat(item.total_goods_nums));
						this.orderNum = numEration(this.orderNumList)
					} else {
						this.orderNum = this.orderNum - this.total_goods_nums;
						this.orderPrice = this.orderPrice - this.total_price;
						this.checkCartlist = [];
						item.is_selected = false;
						this.orderPriceList = [];
						this.orderNumList = [];
						this.orderPrice = 0;
						this.orderNum = 0;
					}
				})
			},
			addCart(type) {
				if (type === 1) {
					if (this.checkNum.length < 1) {
						// uni.showToast({
						// 	title: '请选择商品',
						// 	icon: 'none',
						// 	duration: 2000
						// });
						this.toastShow = true;
						return
					}
					this.addShoppingCart();
				} else {
					this.shoppingCartshow = true;
					this.buy_show = false;
					this.getshoppingCartlist();
				}

			},
			backHome() {
				uni.$emit('backHome')
				uni.switchTab({
					url: '../tab1'
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
					}

				}
				return this.selectNums = data1;
			},
			getTotalSelectedNums(demo_list) {
				let total_nums = 0;
				for (let it in demo_list) {
					let demo_item = demo_list[it];
					total_nums += demo_item.selected_nums;
				}
				return total_nums;
			},
			shareCode(index) {
				this.show = false;
				this.getShareimage();
				setTimeout(() => {
					this.shareImgshow = true;
				},100)
			},
			editCart() {
				let that = this;
				if (that.checkNum.length > 0) {
					let attr = [];

					attr = that.checkNum[0].list;
					let param = {
						'car_id': that.cId,
						'goods_id': that.gId,
						'json_str': encodeURIComponent(JSON.stringify(attr)),
					}
					api._post(editShoppingCart, param).then((res) => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							});
							that.checkIdx = 0;
							that.cart_show = false;
							that.getshoppingCartlist();
							that.shoppingCartshow = true;
						}
					})
				} else {
					that.cart_show = false;
				}
			},
			getcartGoodsDetail(item) {
				let that = this;
				that.attr2 = [];
				that.cId = item.id;
				that.gId = item.goods_id;
				let param = {
					'car_id': item.id,
					'goods_id': item.goods_id
				}
				api._post(cartGoodsDetail, param).then((res) => {
					if (res.code == 0) {
						that.shoppingCartshow = false;
						that.cart_show = true;
						that.goodsDetail = res.data.info;
						that.attr2 = that.goodsDetail.goods_attr[1][0].list;
						that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);
						// console.log(that.goodsDetail)
					}
				})
			},
			saveImage() {
				let that = this
				uni.showLoading({
				    title: '加载中'
				});
				downloadFile(that.shareImg, (res) => {

					if (res) {
						uni.hideLoading();
						that.shareImgshow = false;
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration: 2000
						});
					} else {
						uni.showToast({
							title: '保存失败',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			dialog() {
				if (this.checkCartlist.length < 1) {
					// uni.showToast({
					// 	title: '请选择商品',
					// 	icon: 'none',
					// 	duration: 2000
					// });
					this.toastShow = true;
					return
				}
				api._post(delGoodsOfCar, {
					'ids': this.checkCartlist.toString()
				}).then((res) => {
					if (res.code == 0) {
						// orderPriceList
						this.checkCartlist = [];
						this.getshoppingCartlist();
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						this.orderNum = 0;
						this.orderPrice = 0;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			backOut() {
				if(this.backIdx){
					uni.$emit('goodsInfoBack', {
						pages: this.pages
					});
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.$emit('backHome')
					uni.switchTab({
						url: '../tab1'
					})
				}

			},
			deficiency() {
				if (this.checkIdx == -1) {
					this.toastShow = true;
				} else {
					uni.showToast({
						title: '库存不足',
						icon: 'none',
						duration: 2000
					});
				}
			},
			videoPlay(e) {
				// console.log(e);
				if (e.type == 'play') {
					this.autoplay = false;
				}
			},
			videoPause(e) {
				// console.log(e.type);
				if (e.type == 'pause') {
					this.autoplay = true;
				}
			},
			swiperChange(e) {
				// console.log(e);
				if (e.type == 'change') {
					if(this.dataList.video_url) {
						// this.videoContext.pause()
					}
				}
			},
			skuImageShow(img){
				let imgs = []
				imgs.push(img)
				uni.previewImage({
					current: 1,
					urls: imgs,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			showImage(item, index) {
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.dataList.imgs,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			onClose() {
				this.shoppingCartshow = false;
			},
			overlayShow(e) {
				this.cart_show = false;
				this.shoppingCartshow = false
				this.buy_show = false;
			},
			handleTouchMove(e) {
				// console.log(e);
				e.stopPropagation()
			},
			clearNum(num){
				return Number(num).toFixed(0);
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
      },
      getUserInfo() {
				let that = this;
				api._post(userInfo).then((res) => {
					if (res.code == 0) {;
						that.is_sign = res.data.info.is_sign
					} 
				})
			}
		},
		components: {
			headerTop,
		},
	}
</script>

<style>
	.name {
		color: #000000 !important;
	}

	button::after {
		border: none;
	}

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
	
	.goTopBox{
		position: fixed;
		bottom: 260rpx;
		right: 30rpx;
		width: 80rpx;
		height: 80rpx;	
	}
	.goTopBox>image{
		width: 100%;
		height: 100%;
	}

	/* "disableScroll":true */
</style>
