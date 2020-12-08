<template>
	<view class="flex_colT flex_items_stretch bg_ff5126"  style="overflow: hidden;">
		<headerTop :title="title" :subhead="user.shop_name" :cateShow="cateShow" :containerStyle="containerStyle"></headerTop>

		<view class="fixed W_100 flex_col_between z_index_1000" id="testId" style="top: 0;" :style="{'margin-top':getStausBarMT + 'px'}">
			<view class="W_100 bg_ff5126 PB_1" style="margin: 0;box-sizing: border-box;">
				<view class="relative flex_row_around PLR_2" v-if="leave < 2">
					<view class="absolute iconfont fontS_20" style="left: 7%;">&#xe60f;</view>
					<view class="absolute iconfont fontS_25 z_index_100" style="right: 15%;" @click="show=true">&#xe62c;</view>
					<input type="text" disabled class="bg_fff PTB_1 W_75 B_radius_max PL_8" placeholder="关键词搜索" @click="$openPage({'name':'searchGood'})" />
					<view class="color_fff flex_colC" @click="$openPage({'name':'service'})">
						<view class="WH_6vw iconfont fontS_22">&#xe666;</view>
						<view>客服</view>
					</view>
				</view>
				<view class="H_6vw" v-if="indexMT == 'android' && leave > 1">

				</view>
				<view class="flex_rowL W_100 color_fff PLR_2">
					<view class="MR_3 PTB_2" style="white-space: nowrap;" v-show="leave  < 2" :class="parentid == 0 ? 'font_weight_bold BB_2_fff' : 'color_fff'"
					 @click="checkTab('all',0)">
						首页
					</view>
					<view class="W_85 color_fff flex_rowL overflow_x nav">
						<view class="MR_3 PTB_2" style="white-space: nowrap;" :class="parentid == item.cateId ? 'font_weight_bold BB_2_fff' : 'color_fff'"
						 v-for="(item,index) in cateList" :key="index" @click="checkTab(item,(index + 1))">
							{{item.cateName}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg_ff5126 H_100" :style="{'padding-top':viewHeight + getStausBarMT + 'px'}" v-if="checkIdx == 0">
			<!-- banner -->
			<view class="">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" style="height: 340rpx;" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay"
							 :interval="interval" :duration="duration">
								<swiper-item v-for="(item,index) in bannerList" :key="index">
									<view class="swiper-item flex_colC H_100">
										<image :src="item.imgUrl" class="W_100" @click="openBanner(item)" mode="widthFix"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>

			<!-- main -->
			<view class="PTB_2 bg_fff">
				<view class="PLR_2 flex_row_around">
					<view class="textC bg_fff W_42vw PTB_2 shadow_2 B_radius_10" @click="$openPage({'name':'searchGood'})">
						<view class="iconfont color_ED2251 fontS_32">&#xe60f;</view>
						<view class="PTB_2">关键词搜索</view>
					</view>
					<view class="textC bg_fff W_42vw PTB_2 shadow_2 B_radius_10" @click="show=true">
						<view class="iconfont color_ED2251 fontS_35">&#xe62c;</view>
						<view class="PTB_2">以图搜款式</view>
					</view>
				</view>
				<view class="MTB_2 W_100  flex_rowC" style="height: 200rpx;" @click="show=true">
					<image :src="portionList.ad_img2" class="WH_100" mode="aspectFill"></image>
				</view>
			
				<!-- 积分商城 -->
				<view class="MTB_2 W_100  flex_rowC" style="height: 200rpx;" @click="$openPage({'name':'integralShop'})" >
					<image :src="portionList.ad_img3" class="WH_100" mode="aspectFill"></image>
				</view>

				<view class="MB_2">
					<view class="flex_rowL PTB_2 bg_fff BT_radius_5">
						<image class="WH_6vw MLR_2" src="http://qnyimages.hexieyihao.vip/tab1_icon1.png" mode="aspectFill"></image>
						<view class="flex_grow_1 BB_1_red">
							推荐视频
						</view>
					</view>
					<view class="H_52vw BB_radius_5 relative flex_colC" @click="$openPage({'name':'recommendVideo',query:{video:portionList.videoUrl}})">
						<image id="myVideo" class="WH_100" mode="scaleToFill" :src="portionList.videoUrlImg" object-fit="fill"></image>

						<image class="WH_10vw z_index_200 B_radius_max absolute" src="http://qnyimages.hexieyihao.vip/videoPlay1.png"
						 mode=""></image>
						<view class="absolute WH_100 z_index_100" style="background-color: rgba(0,0,0,0.3);">

						</view>
					</view>
				</view>
				<view class="PLR_3">
					<view class="flex_rowL PTB_2 bg_fff BT_radius_5">
						<image class="WH_6vw MLR_2" src="http://qnyimages.hexieyihao.vip/tab1_icon2.png" mode="aspectFill"></image>
						<view class="flex_grow_1 BB_1_red">
							推荐分类
						</view>
					</view>
				</view>
				<view class="PLR_3 MB_2" v-for="(item,index) in recommendlist" @click="getCate(item)" :key="index">
					<view class="flex_rowC M_auto" style="height: 290rpx;width: 680rpx;">
						<image class="WH_100" :src="item.bannerImg" mode=""></image>
					</view>
					<view class="PLR_2 PTB_1 textL bg_fff">
						<view class="font_weight_bold PB_1">{{item.cateName}}</view>
						<view class="fontS_12">{{item.desc}}</view>
					</view>
				</view>


				<!-- 商品列表 -->
				<view class="flex_rowC">
					<view class="W_56vw bg_size_100" style="height: 36rpx;background-image: url(http://qnyimages.hexieyihao.vip/tab1_goodlist_nav.png);">

					</view>
				</view>
				<view class="PTB_2 PLR_2 flex_rows_start">
					<view class="W_50 flex_colC MB_2" v-for="(item,index) in goodList" :key="index">
						<view class="W_44vw bg_fff PB_2" @click="$openPage({name:'shopGoodInfo',query:{good_id: item.goods_id}})">
							<view class="WH_44vw bg_red_500">
								<image :src="item.img" class="WH_100" mode="aspectFill"></image>
							</view>
							<view class=" flex_row_between PTB_2 PLR_1">
								<view class="B_1_DA3B57 color_DA3B57 PLR_1 fontS_12 B_radius_5">
									{{item.str1}}
								</view>
								<view class="text_overflow_1 W_75">
									{{item.goods_name}}
								</view>
							</view>
							<view class="flex_rowL PLR_1">
								<view class="color_DA3B57 font_weight_bold">￥{{clearNum(item.spe_price)}}</view>
								<view class="fontS_12 color_999 text_decoration_line-through">￥{{item.shop_price}}</view>
								<view class="fontS_10 color_999 PL_1">
									月销：{{item.sales}}
								</view>
							</view>
							<view class="PLR_1 flex_rowL">
								<view class="fontS_12 bg_DA3B57 PLR_1 B_radius_5 flex_rowL color_fff" style="padding-top: 6rpx;padding-bottom: 6rpx;" v-if="item.is_consumer == 0 && item.show_save_price != 0">
									省后：￥ <view class="font_weight_bold fontS_14">{{item.save_price}}</view>
								</view>
							</view>

							<view class="PLR_1 MT_1" >
								<text class="B_1_DA3B57 fontS_12 color_DA3B57 PLR_2 B_radius_5" style="padding-top: 4rpx;padding-bottom: 4rpx;">
									{{item.str2}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg_fff H_100" :style="{'margin-top':viewHeight + getStausBarMT + 'px'}" v-else>
			<view class="PTB_2 PLR_3 bg_fff flex_rows_start z_index_1000" v-if="cateSonlist.length > 0">

				<view class="W_20 MB_1 flex_colC" @click="checksonTab(item,index)" v-for="(item,index) in cateSonlist" :key="index">
					<view class="WH_14vw B_radius_5">
						<image :src="item.thumbnailImg" class="WH_100" mode="aspectFill"></image>
					</view>
					<view class="PT_1">{{item.cateName}}</view>
				</view>

				<view v-if="timeListShow && index < 9" class="W_20 MB_1 MT_4 flex_colC" @click="checkTimeTab(item)" v-for="(item,index) in timeList" :key="index">
					<view class="font_weight_bold fontS_20" v-if="item.is_show == 1 ">{{item.date}}</view>
					<view class="PB_1" v-else>{{item.date}}</view>
					<view class="font_weight_bold fontS_20">新款</view>
				</view>

				<view v-if="timeListShow && timeList.length>9" class="W_20 MB_1 MT_4 flex_colC" @click="checkTimeTab({time:'0',date:'查看更多'})" >
					<view class="PB_1" >查看更多</view>
					<view class="font_weight_bold fontS_20">日期</view>
				</view>
				
				
			</view>

		<view :class="sizerShowPop?'xxx':''">

			<view class="PLR_2 H_100" >

				<view class="flex_row_between PTB_2">
					<view class="flex_rowC W_25" @click="filtrateDef()">
						<view :class="filtrate1Show?'color_DA3B57':''">综合</view>
					</view>
					<view class="flex_rowC W_25" @click="filtrateGoods(1)">
						<view :class="filtrateIndex == 1?'color_DA3B57':''">价格</view>
						<view class="flex_colC PL_2">
							<image class="sort_icon" v-show="showIcon1" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png"
							 mode=""></image>
							<image class="sort_icon" v-show="showIcon2" src="http://qnyimages.hexieyihao.vip/downRank.png" mode=""></image>
						</view>
					</view>
					<view class="flex_rowC W_25" @click="filtrateGoods(3)">
						<view :class="filtrateIndex == 3?'color_DA3B57':''">销量</view>
						<view class="flex_colC PL_2">
							<image class="sort_icon" v-show="showIcon5" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png"
							 mode=""></image>
							<image class="sort_icon" v-show="showIcon6" src="http://qnyimages.hexieyihao.vip/downRank.png" mode=""></image>
						</view>
					</view>
					<view class="flex_rowC W_25 B_radius_5" @click="sizer()" :class="sizerShow?'color_DA3B57 B_1_DA3B57':'B_1_000'">
						<view>点击筛选</view>
						<view class="flex_colC PL_2">
							<image v-if="sizerShow" style="width:20rpx;height:28rpx" src="https://qnyimages.hexieyihao.vip/sizer1.png" mode=""></image>
							<image v-else style="width:20rpx;height:28rpx" src="https://qnyimages.hexieyihao.vip/sizer2.png" mode=""></image>
						</view>
					</view>
				</view>


				<view class="PTB_2 flex_rows_start H_100 relative" v-if="cateGoodlist && cateGoodlist.length > 0" style="z-index: 0;">
					<view class="W_50 flex_colC MB_2" @click="openGoods(item)" v-for="(item,index) in cateGoodlist" :key="index">
						<view class="W_44vw bg_fff PB_2">
							<view class="WH_44vw bg_red_500">
								<image :src="item.img" class="WH_100" mode=""></image>
							</view>
							<view class=" flex_row_between PTB_2 PLR_1">
								<view class="B_1_DA3B57 color_DA3B57 PLR_1 fontS_12 B_radius_5">
									{{item.str1}}
								</view>
								<view class="text_overflow_1 W_75">
									{{item.goods_name}}
								</view>
							</view>
							<view class="flex_rowL PLR_1">
								<view class="color_DA3B57 font_weight_bold">￥{{clearNum(item.spe_price)}}</view>
								<view class="fontS_12 color_999 text_decoration_line-through">￥{{item.shop_price}}</view>
								<view class="fontS_10 color_999 PL_1">
									月销：{{item.sales}}
								</view>
							</view>
							<view class="PLR_1 flex_rowL">
								<view class="fontS_12 bg_DA3B57 PLR_1 B_radius_5 flex_rowL color_fff" style="padding-top: 6rpx;padding-bottom: 6rpx;" v-if="item.is_consumer == 0 && item.show_save_price != 0">
									省后：￥ <view class="font_weight_bold fontS_14">{{item.save_price}}</view>
								</view>
							</view>
							<view class="PLR_1 MT_1">
								<text class="B_1_DA3B57 fontS_12 color_DA3B57 PLR_2 B_radius_5" style="padding-top: 4rpx;padding-bottom: 4rpx;">
									{{item.str2}}
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="color_999 textC MT_10" v-if="cateGoodlist.length == 0 && sizerShow">
					没有相应筛选商品
				</view>

				<view class="textC PT_10" v-if="goodsShow">
					没有更多了
				</view>
			</view>
		</view>

		</view>
		<van-popup :show="show" round position="bottom" z-index="9999" @close="onClose">
			<view class=" W_100 bg_fff BT_radius_15">
				<view class="PTB_2 textC BB_1_f2f2f2" @click="photograph('camera')">
					拍照
				</view>
				<view class="PTB_2 textC BB_5_f2f2f2" @click="photograph('album')">
					从手机相册选择
				</view>
				<view class="PTB_2 textC BB_1_f2f2f2" @click="show=false">
					取消
				</view>
			</view>
		</van-popup>
		<view v-show="toastSaveshow" class="fixed PTB_2 PLR_3 flex_colC B_radius_5 bg_fff " style="top: 10%;right: 5%;z-index: 9999;">
			<view class="iconfont absolute fontS_14" style="right: 3%;top: 10%;" @click="checktoastSaveshow">&#xe6a7;</view>
			<view class="fontS_12">
				点击“···”添加到我的小程序，
			</view>
			<view class="PT_1 fontS_12">
				微信首页下拉即可快速访问商城
			</view>
		</view>




		<!-- 筛选 -->
		<van-popup :show="sizerShowPop" custom-style="width: 80%;height:100%" position="right" z-index="9999" @close="closeSizer()">
			
				<view class="PLR_2 H_100 overflow_y">
					<view>
						<view class="PB_2 MT_10">
							<view class="font_weight_bold fontS_16">价格区间(元)</view>
						</view>
						<view class="flex_row_between PB_2 PR_4">
							<input v-model="lowest_price" @blur.prevent="changeCount()" class="W_40 B_radius_n3 textC color_d9d9d9 B_1_f2f2f2" type="number" placeholder="输入最低价">
							<view>——</view>
							<input v-model="top_price" @blur.prevent="changeCount()" class="W_40 B_radius_n3 textC color_d9d9d9 B_1_f2f2f2" type="number" placeholder="输入最高价">
						</view>
					</view>

					<view v-for="(item,index) in sizerList" :key="index">
						<view class="flex_row_between MT_4 PB_2">
							<view class="font_weight_bold fontS_16">{{item.trait_cate_name}}</view>
							<view class="flex_rowL color_d9d9d9"  @click="skuall(index,item.list_show,item.child_list.length)">
								<!-- <view style="width:340rpx;" class="text_overflow_1 textR" v-if="item.child_list.length>6">{{item.skuChange?item.skuChange:'全部'}}</view>
								<view style="width:340rpx;" class="text_overflow_1 textR" v-else>{{item.skuChange?item.skuChange:''}}</view> -->
								<view style="width:340rpx;" class="text_overflow_1 textR" >{{item.child_list.length>6?'点击更多':''}}</view>
								<view v-if="item.child_list.length>6" class="iconfont PL_2">{{item.list_show=='true'?'&#xe619;':'&#xe611;'}}</view>
								<view v-else class="iconfont PL_2 color_fff">&#xe619;</view>
							</view>
						</view>
						<view class="D_flex color_d9d9d9" style="flex-wrap: wrap;">

							<view v-for="(items,idx) in item.child_list" :key="idx" v-if="item.child_list.length>6&&idx<6&&item.list_show=='true'" class="MR_2 MB_2 relative" style="width:28%;">
								<view @click="sizerCha(index,idx,items.trait_name,items.show)" :class="items.show == 'true'?'bg_f7dbf4 color_DA3B57 B_2_DA3B57':'B_2_f2f2f2'" class="W_100 PTB_n2 flex_rowC B_radius_n3 box_sizingB">
									<view class="W_80 text_overflow_1 textC">{{items.trait_name}}</view>
								</view>
								<view class="iconfont color_DA3B57 absoluteBR" v-if="items.show == 'true'" style="bottom:0;right:0;">&#xe638;</view>
							</view>

							<view v-for="(items,idx) in item.child_list" :key="idx" v-if="item.list_show=='false'" class="MR_2 MB_2 relative" style="width:28%;">
								<view @click="sizerCha(index,idx,items.trait_name,items.show)" :class="items.show == 'true'?'bg_f7dbf4 color_DA3B57 B_2_DA3B57':'B_2_f2f2f2'" class="W_100 PTB_n2 flex_rowC B_radius_n3 box_sizingB">
									<view class="W_80 text_overflow_1 textC">{{items.trait_name}}</view>
								</view>
								<view class="iconfont color_DA3B57 absoluteBR" v-if="items.show == 'true'" style="bottom:0;right:0;">&#xe638;</view>
							</view>


							<!-- <view v-if="item.child_list.length>6&&idx<6&&item.list_show=='true'" v-for="(items,idx) in item.child_list" :key="idx" @click="sizerCha(index,idx,items.trait_name)" :class="items.show == 'true'?'B_2_333':'B_2_f2f2f2'" style="width:28%;" class="PTB_n2 MR_2 MB_2 flex_rowC B_radius_n3">
								<view class="W_80 text_overflow_1 textC">{{items.trait_name}}</view>
							</view>
							<view v-if="item.list_show=='false'" v-for="(items,idx) in item.child_list" :key="idx" @click="sizerCha(index,idx,items.trait_name)" :class="items.show == 'true'?'B_2_333':'B_2_f2f2f2'" style="width:28%;" class="PTB_n2 MR_2 MB_2 flex_rowC B_radius_n3">
								<view class="W_80 text_overflow_1 textC">{{items.trait_name}}</view>
							</view> -->

						</view>
					</view>
					<view class="textC MT_10 color_d9d9d9" v-if="sizerList.length == 0">
						没有更多的分类了
					</view>

					<view class="H_15"></view>
				</view>
				
				<view class="fixed W_100 bg_fff" style="bottom:0;">
					<view class="flex_row_between PLR_2 MB_2 MT_2">
							<view @click="sizerReset()" class="PTB_2 B_1_f2f2f2 textC W_30">重置</view>
							<view @click="sizerConfirm()" class="PTB_2 bg_DA3B57 B_1_DA3B57 color_fff textC W_65">确定</view>
					</view>
				</view>
			
		</van-popup>







<!-- <uni-drawer  ref="draw" :width="300" mode="right" style="z-index: 9999;">  
		<view  class="">  
				<text>车辆列表：</text>   
		</view>  
</uni-drawer> -->




	</view>
</template>

<script>
	import headerTop from '../components/headerTop/headerTop.vue';
	import api from '../static/script/ajax.js';
	import {
		getBannerlist,
		getPortiondata,
		getRecommendlist,
		getIndexGoodlist,
		getGoodsCateList,
		getGoodList,
		getGoodsGradecate,
		getQNYtoken,
		getShoppingCartlist,
		getParentBrotherCateList,
		getDateCateList,
		GoodsTrait
	} from '../static/script/const.js';
	import {
		init,
		upload
	} from '../static/script/qiniuUploader.js';
	import minix from '../static/script/minix.js';
	import uniDrawer from "../components/uni-drawer/uni-drawer.vue"
	export default {
		data() {
			return {
				navTab: [],
				tabList: ['综合', '价格', '佣金', '销量'],
				checkIdx: 0,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				cateShow: false,
				show: false,
				bannerList: [],
				portionList: {},
				recommendlist: [],
				goodList: [],
				parentid: '0',
				cateList: [],
				brotherCateid: '',
				cateSonlist: [],
				cateGoodlist: [],
				page: 1,
				pages: 1,
				active: '',
				toastSaveshow: true,
				containerStyle: 'position: fixed;z-index:9999;width:100%',
				sorts: 1,
				sort1: true,
				sort2: true,
				sort3: true,
				goods_status: 0,
				leave: 0,
				title: '【和鞋一号】严选商城',
				cate_id: '',
				is_cate: false,
				cateIdx: -1,
				classify_id: '',
				indexMT: '',
				idList: [],
				cw: '',
				ch: '',
				goodsShow: false,
				ios_mt: '',
				user: {},
				viewHeight:5,

				showIcon1: true,
				showIcon2: true,
				showIcon3: true,
				showIcon4: true,
				showIcon5: true,
				showIcon6: true,
				timeList:[] , //时间分类
				timeKey:'',
				timeListShow: false,

				sizerShow: false,//筛选显示
				sizerShowPop:false, // 筛选弹窗显示
				sizerList : [],
				lowest_price :'', // 最低价
				top_price :'' ,//  最高价
				sizerIds: '' ,//筛选IDs type == 1
				traitIds:'', //筛选IDs type ==2

				filtrate1Show:true, //综合颜色
				filtrateIndex:0 , //价格 销量 颜色
			}
		},
		onReachBottom() {
			if (this.parentid == 0) {
				this.getGoodlist('more');
			} else {
				this.getCategood('more');
			}
		},
		onTabItemTap(e) {
			if (e.index === 0) {
				// this.getViewHeight()
				this.pageScrollTop((ret) => {
					setTimeout(() => {
						this.parentid = 0;
						this.checkIdx = 0;
						this.leave = 0;
						this.idList = [];
						this.is_cate = false;
						this.title = '【和鞋一号】严选商城';
						this.cateShow = false;
						this.getCatelist();
						this.getGoodsGrade();
					}, 100)
				})
				console.log('***///***')
				// 跳到二级分类页面 返回时节点高度变不回来  
				setTimeout(() => {
						this.getViewHeight()
						setTimeout(() => {
								this.getViewHeight()
						},300)
				},300)
			}
		},
		onLoad(options) {
			this.getPortion();
			this.getBanner();
			this.getRecommend();
			this.getCatelist();
			this.timeListNew();
			if (options.pid) {
				uni.setStorageSync('pid', options.pid);
				if (!uni.getStorageSync('token') && options.is_worker == 1) {
					// console.log('跳转登录')
					uni.navigateTo({
						url: '/pages/common/login?type=delToken'
					});
				} else {
					this.getGoodlist();
				}
				return
			} else {
				this.getGoodlist();
			}
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
			})
			// if (!uni.getStorageSync('toastSave')) {
			// 	this.toastSaveshow = true;
			// } else {
			// 	this.toastSaveshow = false;
			// }
			this.is_cate = false;
			
		},
		onShow() {
			this.page = 1;
			this.user = uni.getStorageSync('userInfo');
			console.log(this.user);
		},
		// 分享
		onShareAppMessage(res) {
			console.log(res);
			if (res.from === 'menu') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.title,
				path: '/pages/tab1?pid=' + uni.getStorageSync('userId') + '&is_worker=' + this.user.is_worker
			}
		},
		onShareTimeline(res) {
			if (res.from === 'menu') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '【和鞋一号】严选商城',
				query: 'pid=' + uni.getStorageSync('userId') + '&is_worker=' + this.user.is_worker
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.pages = 1;
			if (this.checkIdx == 0) {
				this.getBanner();
				this.getPortion();
				this.getRecommend();
				this.getGoodlist();
				this.getCatelist();
			} else {
				this.getCatelist();
				this.getCategood();
			}

		},
		onAddToFavorites(res){
			console.log(JSON.stringify(res) + '收藏');
			// this.toastSaveshow = false;
			// uni.setStorageSync('toastSave', true);
		},
		mounted() {
			setTimeout(()=>{
				this.toastSaveshow = false
			},3000)
			this.getViewHeight();
			this.getShoppingCart();
			uni.$on('backHome', (data) => {
				this.parentid = 0;
				this.checkIdx = 0;
				this.leave = 0;
				this.idList = [];
				this.is_cate = false;
				this.title = '【和鞋一号】严选商城';
				this.cateShow = false;
				setTimeout(() => {
					this.pageScrollTop((ret) => {

					});
				}, 100)
			})
			uni.$on('backAll', (data) => {
				console.warn("7777777888888")
					this.pageScrollTop((ret) => {});
					this.page = 1;
					this.pages = 1;
					this.leave = 1
					this.checkLeave(1);
					this.checkIdx = -1;
					this.parentid = data.item.about_id;
					this.getCatelist();
					this.getGoodsGrade();
					this.getCategood();

					if(data.item.about_id == this.recommendlist[0].cateId){
						this.timeListShow = true
					} else {
						this.timeListShow = false
					}
			})
			uni.getSystemInfo({
				success: ((res) => {
					// console.log(res.windowHeight);
					if (res.windowHeight < 700) {
						this.ios_mt = 'margin-top: 338rpx';
					} else {
						this.ios_mt = 'margin-top: 350rpx';
					}
					this.indexMT = res.platform;
				})
			});
			uni.$on('goodsInfoBack', (data) => {
				// console.error(data);
				this.pages = data.pages;
				// this.cateBack()
			})
			uni.$on('cateback', (data) => {
				// console.log('后退更新!');
				this.cateBack()
			})
			// setTimeout(() => {

			// }, 3000);
			// 商品详情页面  商城活动跳转
			var that = this;
			uni.$on('goodsDetallUpdate',function(data){
				console.log(JSON.stringify(data));
				that.openBanner(data.goodsDetall)
			})

		},
		methods: {

			checkTab(item, index) {
				this.zhikong()
				console.warn('清空 top')

				console.warn(this.checkIdx)
				if(item.level == 1 && index == 1) {
					this.timeListShow = true
				} else {
					this.timeListShow = false
				}
				this.getViewHeight();
				this.leave = item.level;
				this.checkLeave(item.level)

				if (item === 'all') {
					this.checkIdx = index;
					this.parentid = 0;
					this.pageScrollTop((ret) => {

					});
					this.getCatelist();
				} else if (item.cateId) {
					this.pageScrollTop((ret) => {

					});
					this.pages = 1;
					this.checkIdx = index;
					this.parentid = item.cateId;
					if (this.idList.length >= 0) {
						let arr = this.idList.splice(this.idList.length - 1, 1, item.cateId);
					}
					if (!this.is_cate) {
						this.cate_id = item.cateId;
					}
					this.is_cate = true;
					this.getCatelist();
					this.getCategood();
				} else {
					uni.showToast({
						title: '您点击的太快了',
						icon: 'none',
						duration: 2000
					});
				}

			},
			checksonTab(item, index) {
				this.zhikong()
				console.warn('清空 bot')


				this.timeListShow = false
				this.pages = 1;
				this.leave = item.level;
				this.cateIdx = index;
				this.classify_id = item.cateId;
				this.idList = minix.unique(this.idList.concat(item.cateId));
				this.checkLeave(item.level)
				this.parentid = item.cateId;
				this.getCatelist();
				this.getGoodsGrade();
				this.getCategood();
				setTimeout(()=> {
					this.getViewHeight();
				},100);
			},
			checkTimeTab(item,index){
				// this.timeKey = index
				// this.getCategood()
				// return
				if(item.time != '0'){
					this.$openPage({name:'newTimeTab',query:{timeType: item.time,timeTit:item.date}})
				} else {
					this.$openPage({name:'newTimeTab',query:{timeType: item.time,timeTit:item.date,item9:this.timeList[9].time}})
				}
			},
			initQniu(data) {
				// console.log(data)
				init({
					region: 'ECN', // 华南
					// ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
					uptoken: data.token,
					domain: data.host, // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
					shouldUseQiniuFileName: false
				});
			},
			// 以图搜索
			photograph(item) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [item], //从相册选择
					success: (res) => {
						let file = res.tempFilePaths[0];
						that.$openPage({
							name: 'searchdrawingGood',
							query: {
								file: file,
							}
						});
					}
				});
			},
			// 获取轮播图
			getBanner() {
				api._get(getBannerlist, {}).then(res => {

					if (res.code == 0) {
						this.bannerList = res.data.list;

					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 获取部分数据
			getPortion() {
				api._get(getPortiondata, {}).then((res) => {
					if (res.code == 0) {
						this.portionList = res.data;
					}
				})
			},
			// 获取推荐分类
			getRecommend() {
				api._get(getRecommendlist, {
					'page': '1'
				}).then((res) => {
					if (res.code == 0) {
						this.recommendlist = res.data.list;
					}
				})
			},

			// 商品列表
			getGoodlist(type) {
				let param;
				if (type == 'more') {
					param = {
						'page': ++this.page
					};
				} else {
					param = {
						'page': 1
					};
				}
				api._get(getIndexGoodlist, param).then((res) => {
					if (res.code == 0) {
						if (type == 'more') {
							if (res.data.list.length > 0) {
								this.goodList = this.goodList.concat(res.data.list);
							}
						} else {
							this.goodList = res.data.list;
							if (res.data.list && res.data.list.length > 0) {
								this.goodsShow = false;
							} else {
								this.goodsShow = true;
							}
						}
					}
				})
			},
			openGoods(item) {
				if (item.is_ground === 1) {
					this.$openPage({
						name: 'shopGoodInfo',
						query: {
							good_id: item.goods_id,
							pages: this.pages
						}
					})
				} else {
					uni.showToast({
						title: '该商品已过期！',
						icon: 'none',
						duration: 2000
					});
				}
			},
			getCategood(type) {
				console.log('jiazai111');
				console.log(type,'***');
				let that = this;
				let param;
				let jiazai = 1;
				if (type == 'more') {
					param = {
						page: ++that.pages,
						sort: that.sorts,
						cate_id: that.parentid,
						goods_status: that.goods_status,
						date_id: this.timeKey,
						lowest_price:this.lowest_price,
						top_price:this.top_price,
						selected_ids: this.sizerIds || ' ',
						attr_select_ids: this.traitIds || ' '
					}
				} else {
					jiazai = 0
					param = {
						page: 1,
						sort: that.sorts,
						cate_id: that.parentid,
						goods_status: that.goods_status,
						date_id: this.timeKey,
						lowest_price:this.lowest_price,
						top_price:this.top_price,
						selected_ids: this.sizerIds || ' ',
						attr_select_ids: this.traitIds || ' '
					}
				}
				api._get(getGoodList,param,jiazai).then((res) => {
					if (type == 'more') {
						if (res.data.list.length > 0) {
							this.cateGoodlist = this.cateGoodlist.concat(res.data.list);
							this.cateGoodlist = this.deWeight(this.cateGoodlist);
							
							// 刷选列表更新
								this.sizerList = res.data.trait_list 
								//设置选中sku展示名称
							console.error("*****",this.sizerList)
								this.sizerList.forEach((item,index) => {
									item['child_list'].forEach((item,idx) => {
										if(item.show == 'true'){
											this.$set(this.sizerList[index], 'skuChange', item.trait_name)
										} else{
											this.$set(this.sizerList[index], 'skuChange', '')
										}
									})
								})

						} else {
							uni.showToast({
								title: '没有更多了！',
								icon: 'none',
								duration: 2000
							});
						}
					} else {
						this.cateGoodlist = res.data.list;
						this.cateGoodlist = this.deWeight(this.cateGoodlist);


						// 刷选列表更新
							this.sizerList = res.data.trait_list 
							//设置选中sku展示名称
								console.error("*****",this.sizerList.length)
							this.sizerList.forEach((item,index) => {
								item['child_list'].forEach((item,idx) => {
									if(item.show == 'true'){
										this.$set(this.sizerList[index], 'skuChange', item.trait_name)
									} else{
										this.$set(this.sizerList[index], 'skuChange', '')
									}
								})
							})

							
					}
				})
				if(!this.sizerIds && this.pages == 1){
					this.timeListNew()
				}
			},
			deWeight(arr) {
			    for (var i = 0; i < arr.length - 1; i++) {
			        for (var j = i + 1; j < arr.length; j++) {
			            if (arr[i].goods_id == arr[j].goods_id) {
			                arr.splice(j, 1);
			                //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
			                j--;
			            }
			        }
			    }
				// console.log(arr);
			    return arr;
			},


			// 子分类列表
			getCatelist() {
				let param = {
					'parentId': this.parentid
				}
				api._get(getGoodsCateList, param).then((res) => {
					if (res.code == 0) {
						if (res.data.list.length > 0) {
							if (this.checkIdx === 0) {
								this.cateList = res.data.list;
							} else {
								this.cateSonlist = res.data.list;
							}
						} else {
							this.cateSonlist = []
						}
						// this.cateList = res.data.list;
					}
				})
			},
			timeListNew() {
				api._get(getDateCateList).then((res) => {
					if (res.code == 0) {
						this.timeList = res.data;
					} else {
						this.timeList = []
					}
				})
			},

			// 分类兄弟列表
			getGoodsGrade() {
				let param = {
					'cate_id': this.parentid
				}
				api._get(getGoodsGradecate, param).then((res) => {
					if (res.code == 0) {
						if (res.data.list.length > 0) {
							this.cateList = res.data.list;
						}
					}
				})
			},
			openBanner(item) {
				if (item.about_type == 1) {
					this.$openPage({
						name: 'shopGoodInfo',
						query: {
							good_id: item.about_id
						}
					})
				} else if (item.about_type == 2) {
					this.page = 1;
					this.pages = 1;
					this.checkIdx = -1;
					this.parentid = item.about_id;
					this.getCatelist();
					this.getGoodsGrade();
					this.getCategood();
					let arr = this.cateList;
					this.cateList = [];
					// console.log(arr)
					arr.forEach((i, index) => {
						if (item.cateId == i.cateId) {
							[arr[0], arr[index]] = [arr[index], arr[0]];
						}
					})
					setTimeout(() => {
						this.cateList = arr;
					}, 1000)
					console.error(item.about_id)
					console.error(this.recommendlist[0].cateId)
					if(item.about_id == this.recommendlist[0].cateId){
						this.timeListShow = true
					} else {
						this.timeListShow = false
					}
				} else if(item.about_type == 3){
					this.$openPage({'name':'integralShop'})
				} else {
					
				}
				// 
			},
			getCate(item) {
				if(item.level == 1 ) {
					this.timeListShow = true
				} else {
					this.timeListShow = false
				}
				this.pageScrollTop((ret) => {});
				this.page = 1;
				this.pages = 1;
				this.leave = item.level
				this.checkLeave(item.level);
				this.checkIdx = -1;
				this.parentid = item.cateId;
				this.getCatelist();
				this.getGoodsGrade();
				this.getCategood();
				
			},
			filtrateGoods(index) {
				console.log("**",index)
				this.filtrate1Show = false
				this.filtrateIndex = index

				if (index == 1) {
					this.sort1 = !this.sort1;
					if (!this.sort1) {
						this.sorts = 2;

						this.showIcon1 = true;
						this.showIcon2 = false;
						this.showIcon3 = true;
						this.showIcon4 = true;
						this.showIcon5 = true;
						this.showIcon6 = true;
					} else {
						this.sorts = 3;
						this.showIcon1 = false;
						this.showIcon2 = true;
						this.showIcon3 = true;
						this.showIcon4 = true;
						this.showIcon5 = true;
						this.showIcon6 = true;
					}
				} else if (index == 2) {
					this.sort2 = !this.sort2;
					if (!this.sort2) {
						this.sorts = 4;
						this.showIcon3 = true;
						this.showIcon4 = false;
						this.showIcon1 = true;
						this.showIcon2 = true;
						this.showIcon5 = true;
						this.showIcon6 = true;
					} else {
						this.sorts = 5;
						this.showIcon3 = false;
						this.showIcon4 = true;
						this.showIcon1 = true;
						this.showIcon2 = true;
						this.showIcon5 = true;
						this.showIcon6 = true;
					}
				} else if (index == 3) {
					this.sort3 = !this.sort3;
					if (!this.sort3) {
						this.sorts = 7;
						this.showIcon5 = true;
						this.showIcon6 = false;
						this.showIcon1 = true;
						this.showIcon2 = true;
						this.showIcon3 = true;
						this.showIcon4 = true;
					} else {
						this.sorts = 6;
						this.showIcon5 = false;
						this.showIcon6 = true;
						this.showIcon1 = true;
						this.showIcon2 = true;
						this.showIcon3 = true;
						this.showIcon4 = true;
					}
				}

				this.word = '';
				this.page = 1;
				this.goods_status = 0;
				this.getCategood();
			},
			filtrateDef() {
				this.filtrateIndex = 0
				this.filtrate1Show =!this.filtrate1Show

				this.showIcon1 = true;
				this.showIcon2 = true;
				this.showIcon3 = true;
				this.showIcon4 = true;
				this.showIcon5 = true;
				this.showIcon6 = true;
				this.word = '';
				this.page = 1;
				this.sorts = 1;
				this.goods_status = 0;
				this.getCategood();
			},
			onClose() {
				this.show = false;
			},
			getShoppingCart() {
				api._post(getShoppingCartlist, {}).then((res) => {
					if (res.code == 0) {
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
			 checktoastSaveshow() {
				this.toastSaveshow = false;
				// uni.setStorageSync('toastSave', true);
			},
			cateBack() {
				let that = this;
				that.pages = 1;
				let lv = that.cateList[0].level
				console.log("888")
				console.log(lv)
				if(lv == 2) {
						this.timeListShow = true
				}
				that.pageScrollTop((ret) => {

				})
				if (lv < 2) {
					that.leave = 1;
					that.cateShow = false;
					that.parentid = 0;
					that.checkIdx = 0;
					that.getCatelist();
					that.getGoodsGrade()
					that.getCategood();
					that.title = '【和鞋一号】严选商城';
					that.cateShow = false;
					setTimeout(()=> {
						that.getViewHeight();
					},100);
					
				} else {
					that.cateShow = true;
					that.title = '';
					let param;
					param = {
						'cate_id': that.parentid
					}
					api._post(getParentBrotherCateList, param).then((res) => {
						if (res.code == 0) {
							that.cateList = res.data.parent_list;
							that.cateSonlist = res.data.brother_list;
							let id = res.data.parent_id;
							that.cateList.forEach((item) => {
								if (item.cateId == id) {
									that.parentid = item.cateId;
								}
							})
							that.getCategood();
							return
							if (that.cateList && that.cateList.length > 0) {
								if (that.idList.length > 0) {
									that.idList = that.truncate(that.idList);
									that.parentid = that.idList[that.idList.length - 1];
									// console.log(that.idList.length - 1);
								}
							}

						}
					});
					setTimeout(()=> {
						that.getViewHeight();
					},100);
				}
			},

			truncate(arr) {
				return arr.filter(function(v, i, ar) {
					return i !== ar.length - 1
				})
			},
			checkLeave(lv) {
				if (lv < 2) {
					this.title = '【和鞋一号】严选商城';
					this.cateShow = false;
				}
				if (lv >= 2) {
					this.cateShow = true;
					this.title = '';
				}
			},
			pageScrollTop(callback) {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
					success: (res) => {
						callback(res);
					},
					fail: (err) => {

					},
					complete: (end) => {

					}
				});
			},
			getViewHeight(){
				let view = uni.createSelectorQuery().in(this).select("#testId");
				console.log(view)
				view.fields({
				  size: true,
				  scrollOffset: true
				}, data => {
				  console.log("节点的高为" + data.height);
				  this.viewHeight = data.height;
				}).exec();
			},
			clearNum(num){
				return Number(num).toFixed(0);
			},



			// 价格区间 失去焦点触发
			changeCount(){
				console.log("失去")
				if(this.top_price && this.lowest_price){
					this.sizerShow = true;
					this.searchGood()
				}
			},
			// 关闭筛选
			closeSizer(){
				this.sizerShowPop = false;
			},
			// 打开筛选
			sizer(){
				this.sizerShowPop = true;
			},
			// sku全部
			skuall(num1,show,length){
				if(length>6 && show == "true"){
					console.warn(show)
					this.$set(this.sizerList[num1], 'list_show', 'false')
				} else if(length>6 && show == "false"){
					this.$set(this.sizerList[num1], 'list_show', 'true')
				}
			},
			// 筛选sku 选中
			sizerCha(num1,num2,name,show){
				this.sizerShow = true;
				// 设置选中sku边框
				if(show == 'false'){
					this.$set(this.sizerList[num1]['child_list'][num2], 'show', 'true')
				} else {
					this.$set(this.sizerList[num1]['child_list'][num2], 'show', 'false')
				}
				// 设置选中sku展示名称
				this.$set(this.sizerList[num1], 'skuChange', name)
				// 设置非选中sku边框
				
				// this.sizerList[num1]['child_list'].forEach((item,index)=>{
				// 	if(num2!=index){
				// 		this.$set(this.sizerList[num1]['child_list'][index], 'show', 'false')
				// 	}
				// })

				this.sizerForList()
			},
			// 选择 数据请求
			sizerForList(){
				let  xx = ''
				let  ss = ''
				this.sizerList.forEach((item,index) => {
					item['child_list'].forEach((item,idx) => {
						if(item.show == 'true' && item.type == 1){
							xx = xx + item.trait_id + ','
						} else if(item.show == 'true' && item.type == 2){
							ss = ss + item.trait_id + ','
						}
					})
				})
				let ll = xx.length -1
				xx = xx.slice(0,ll)

				ss = ss.slice(0,ss.length -1)
				console.log(xx)
				console.log(ss)

				this.sizerIds = xx
				this.traitIds = ss
				// 刷新数据
				this.getCategood()
			},
			// 筛选 确认
			sizerConfirm(){
				this.getCategood()
				this.sizerShowPop = false
			},
			// 筛选	重置
			sizerReset(){
					this.lowest_price = '';
					this.top_price = '';
					this.sizerIds = '';
					this.traitIds = ''
					this.sizerShow = false;
					this.getCategood()
			},
			zhikong(){
				this.lowest_price = '';
				this.top_price = '';
				this.sizerIds = '';
				this.traitIds = ''
				this.sizerShow = false;
			}














		},
		components: {
			headerTop,
			uniDrawer
		},
		computed: {
			getStausBarMT() {
				try {
					const res = uni.getSystemInfoSync();
					console.log((Number(res.statusBarHeight) + 44) + 'px')
					return (Number(res.statusBarHeight) + 44);
				} catch (e) {}
			}
		},
	}
</script>

<style>
	.nav::-webkit-scrollbar {
		/*隐藏滚动条*/
		display: none;
	}

	.MT_ios_32 {
		margin-top: 45vw;
	}

	/* popup  下拉页面 穿透 */
	.xxx{
		/* top: 87px; */
		left: 0px;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: fixed;
		z-index: 0;
	}
</style>
