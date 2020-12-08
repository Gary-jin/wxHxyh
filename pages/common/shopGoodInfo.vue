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
			<view class="bg_ff5126 z_index_200 PB_1 PLR_3 flex_row_between color_fff relative" style="z-index: 0;">
				<view class="">
					<view class="flex_rowL">
						<view class="fontS_20 font_weight_bold PR_2">￥{{clearNum(dataList.spe_price)}}</view>
						<view class="fontS_12 font_weight_bold PTB_1 PLR_2 flex_rowC B_radius_max bg_fff color_FF5029 MT_1" v-if="dataList.is_consumer == 0 && dataList.show_save_price != 0">
							  省后:￥ <view class="fontS_16">{{dataList.save_price}}</view>
						</view>
						<view class="fontS_12 text_decoration_line-through" v-else>￥{{dataList.shop_price}}</view>
					</view>
					<text class="fontS_12">{{dataList.str5}}</text>
				</view>
				<view class="textR fontS_12 flex_cols_start">
					<text>{{dataList.str3}} </text>
					<text>{{dataList.str4}}</text>
				</view>
			</view>
			<view class="PLR_2 BB_5_f2f2f2">
				<view class="flex_row_between PTB_2">
					<text :selectable="true" class="W_80 fontS_16">{{dataList.goods_name}}</text>
					<view>
						<view class="PLR_1 PTB_1 fontS_10 bg_ED2251 color_fff B_radius_max textC MB_1" @click="signIn">{{is_sign == 0 ? '点击签到':'今日已签到' }}</view>
						<view class="PLR_1 PTB_1 fontS_10 bg_ED2251 color_fff B_radius_max" @click="$openPage({'name':'integralShop'})">免费得礼品</view>
						<!-- <view class="PLR_1 PTB_1 fontS_10 bg_ED2251 color_fff B_radius_max" @click="buy()">加入购物车</view> -->
					</view>
				</view>
				<view class="flex_row_between color_999 fontS_12 PB_2">
					<view>{{dataList.str6}}</view>
					<view>{{dataList.str7}}</view>
					<view>月销{{dataList.sales}}件</view>
				</view>
			</view>
			<view class="" v-if="dataList.show_comment == 1">
				<view class="P_2 flex_row_between" @click="$openPage({name:'shopGoodEvaluatelist',query:{good_id:dataList.goods_id,type:0}})">
					<view>商品评价</view>
					<view class="flex_rowL color_ED2251">
						<view>查看全部评价</view>
						<view class="iconfont fontS_20">&#xe600;</view>
					</view>
				</view>
				<view class="PLR_2 flex_row_around PTB_3">
					<view class="bg_red_500 PTB_1 W_25 textC bg_ED2251_25 B_radius_5" @click="$openPage({name:'shopGoodEvaluatelist',query:{good_id:dataList.goods_id,type:1}})">
						好评率 {{dataList.comment_info.ok_rate}}%
					</view>
					<view class="bg_red_500 PTB_1 W_20 textC bg_ED2251_25 B_radius_5" @click="$openPage({name:'shopGoodEvaluatelist',query:{good_id:dataList.goods_id,type:1}})">
						好评 {{dataList.comment_info.ok_nums}}
					</view>
					<view class="bg_red_500 PTB_1 W_20 textC bg_ED2251_25 B_radius_5" @click="$openPage({name:'shopGoodEvaluatelist',query:{good_id:dataList.goods_id,type:2}})">
						中评 {{dataList.comment_info.middle_nums}}
					</view>
					<view class="bg_red_500 PTB_1 W_20 textC bg_ED2251_25 B_radius_5" @click="$openPage({name:'shopGoodEvaluatelist',query:{good_id:dataList.goods_id,type:3}})">
						差评 {{dataList.comment_info.low_nums}}
					</view>
				</view>
			</view>
			
			<view class="PTB_2">
				商城活动
			</view>
			<view class="" >
				<image style="width: 100%;" v-for="(item,index) in recommendlist" @click="getCate(item)" :key="index" :src="item.imgUrl" mode="widthFix"></image>
			</view>
			
			<view class="PTB_2 BT_5_f2f2f2 ">
				宝贝详情
			</view>
			<view class="flex_colC W_100">
				<image class="W_100" @click="showImage(item,index)" v-for="(item,index) in dataList.imgs" :key="index"
				 style="display: block;" :src="item" mode="widthFix"></image>
			</view>
			<!-- 推荐商品 -->
			<view class="flex_rowC PTB_2">
				<view class="W_56vw bg_size_100" style="height: 36rpx;background-image: url(http://qnyimages.hexieyihao.vip/tab1_goodlist_nav.png);"></view>
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
			<view class="textC PT_2 PB_10 color_999" v-if="goodsShow">
				--已到底了，去首页逛逛有惊喜--
			</view>
			<view class="goTopBox" v-if="goTopShow" @click="goTop">
				<image src="https://qnyimages.hexieyihao.vip/gotop.png" mode=""></image>
			</view>
			
			
			
			
			
			
			<view class="H_18vw"></view>
			<!-- BT_5_f2f2f2 -->
			<view class="fixed W_100" style="bottom: 0;">
				<view class="flex_rowC W_85 relative" style="top: 10rpx;" v-if="dataList.first_page_ad_img">
					<image class="W_22vw H_10vw" :src="dataList.first_page_ad_img" mode=""></image>
				</view>
				<view class="flex_row_between P_2 bg_fff">
					<view class="W_35 flex_row_between">
						<view class="flex_colC PLR_1 fontS_11 relative" @click="addCart(0)">
							<view class="bg_red color_fff WH_4vw flex_colC B_radius_max absolute" v-if="shoppingCartlist.list1_total_goods_nums > 0"
							 style="top: -15%;right: 5%;">
								{{shoppingCartlist.list1_total_goods_nums}}
							</view>
							<view class="iconfont fontS_20">
								&#xe60c;
							</view>
							<view class="">
								购物车
							</view>
						</view>
						<view class="flex_colC PLR_1 fontS_11" @click="$openPage({name:'service'})">
							<view class="iconfont fontS_20">
								&#xe848;
							</view>
							<view class="">
								客服
							</view>
						</view>
						<view class="flex_colC PLR_1 fontS_11" @click="backHome">
							<view class="iconfont fontS_20">
								&#xe71b;
							</view>
							<view class="">
								首页
							</view>
						</view>
					</view>
					<view class="color_fff flex_rowC">
						<view class="PTB_2 textC bg_444444 W_28vw BL_radius_max" @click="buy()">
							<view>{{dataList.zms_fxz.str1}}</view>
							<view class="fontS_10" v-if="dataList.zms_fxz.price > 0">{{dataList.zms_fxz.price}}元</view>
						</view>
						<view class="PTB_2 textC bg_ED2251 W_28vw BR_radius_max" @click="share()">
							<view>{{dataList.zms_fxz.str2}}</view>
							<view class="fontS_10" v-if="dataList.zms_fxz.price > 0">{{dataList.zms_fxz.price}}元</view>
						</view>
					</view>
				</view>
			</view>

			<van-popup :show="show" @click-overlay="overlayShow" position="bottom">
				<view class="W_100 bg_fff PTB_3 BT_radius_15">
					<view class="textC fontS_16 font_weight_bold">
						分享商品
					</view>
					<view class="P_3">
						<view class="PLR_2 flex_row_around BB_1_f2f2f2">
							<button class="flex_colC PTB_2" hover-class='none' open-type='share'>
								<image class="WH_10vw" src="http://qnyimages.hexieyihao.vip/share_icon1.png" mode=""></image>

								<view class="fontS_12 MT_2">
									微信
								</view>
							</button>
							<button class="flex_colC PTB_2" hover-class='none' @click="shareCode(index)" v-for="(item,index) in shareList"
							 :key="index">
								<image class="WH_10vw" :src="item.img" mode=""></image>

								<view class="fontS_12 MT_2">
									{{item.title}}
								</view>
							</button>
						</view>
					</view>
					<view class="flex_rowC">
						<view class="PTB_2 bg_eee W_80 B_radius_max textC" @click="show=false">
							取消
						</view>
					</view>
				</view>
			</van-popup>


			<van-popup :show="buy_show" z-index="1000" position="bottom" safe-area-inset-top="true" @click-overlay="overlayShow">
				<scroll-view class="W_100 z_index_2000 overflow_hidden" style="height: 120vw;">
					<view class="flex_row_between BB_1_f2f2f2 PLR_2 relative">
						<image class="WH_26vw B_radius_5 B_2_fff MR_2" @click="skuImageShow(attr2[0].thumb == '' ? dataList.img : attr2[0].thumb)"  :src="attr2[0].thumb == '' ? dataList.img : attr2[0].thumb" mode=""></image>
						<view class="W_70">
							<view class="flex_row_between PB_2">
								<view class="W_70 flex_row_between">
									<view class="color_ED2251 font_weight_bold fontS_20">￥{{spe_price == '' ? dataList.spe_price : spe_price}}</view>
									<view class="fontS_12 PTB_1 PLR_2 flex_rowC B_radius_max bg_red color_fff" v-if="dataList.is_consumer == 0 && dataList.show_save_price != 0">省后:￥{{spe_price == '' ? dataList.save_price : save_price}}</view>
								</view>
								
								<view class="iconfont fontS_22" @click="buy_show=false">&#xe6a7;</view>
							</view>
							<view class="textL text_overflow_1 PB_2">
								{{dataList.goods_name}}
							</view>
						</view>
					</view>
					<view class="PLR_2 overflow_y H_100 PB_10">
						<view class="W_100">
							<view class="PTB_2 textL ">
								<!-- 选择颜色和尺码 -->
								{{dataList.field1}}
							</view>
							<view class="W_100 flex_rowL  overflow_x">
								<text class="PTB_1 PLR_2 MR_2 textC B_radius_5" style="white-space: nowrap;display: inline-block;" @click="checkidx('',item,index)"
								 :class="checkIdx == index ? 'bg_ED2251 color_fff':'color_999 B_1_999'" v-for="(item,index) in dataList.list1"
								 :key="index">
									{{item}}
								</text>
							</view>
							<view class="PTB_3">
								<view class="flex_row_around PTB_1 bg_D0D0D0">
									<!-- <view>尺码</view> -->
									<view>{{dataList.field2}}</view>
									<view>购买数量</view>
								</view>
								<view class=" bg_eee W_100">
									<view class="flex_row_around PTB_1" v-for="(item,index) in attr2" :key="index">
										<view>{{item.attr}}</view>
										<van-stepper min="0" :max="item.count" :disabled="disabled" @overlimit="deficiency" :value="item.selected_nums"
										 @minus="minusItem('buy',item)" @plus="addItem('buy',item)" @change="onChange" @blur="inputIdx('buy',item)"
										 button-size="24" />
									</view>
								</view>
							</view>

							<view class="PTB_2 textL " v-if="selectNums.length > 0">
								<!-- 选择颜色和尺码 -->
								{{dataList.field1}}
							</view>
							<view class="W_100 MB_4">
								<view class="PLR_1 B_1_ED2251 goods_specification" style="width: 97%;" v-if="selectNums.length > 0">
									<view class="color_ED2251 W_100 " style="padding: 2rpx 0 2rpx 0;" v-for="(item,index) in selectNums" :key="index">
										{{item}}
									</view>
								</view>
							</view>
						</view>

						<view class="color_fff flex_rowC W_100 z_index_100">
							<view class="PTB_2 textC W_40 bg_444444 BL_radius_max" @click="addCart(1)">
								加入购物车
							</view>
							<view class="PTB_2 flex_rowC W_40 bg_ED2251 BR_radius_max" @click="checkGood('buy')">
								立即购买 <view v-if="goodsNum > 0">({{goodsNum}})</view>
							</view>
						</view>
						<view class="H_40vw">

						</view>
					</view>
				</scroll-view>
			</van-popup>

			<van-popup :show="cart_show" z-index="1000" safe-area-inset-top="true" @click-overlay="overlayShow" position="bottom">
				<scroll-view class="W_100 z_index_2000 overflow_hidden" style="height: 120vw;">
					<view class="flex_row_between BB_1_f2f2f2 PLR_2 relative">
						<image class="WH_26vw B_radius_5 B_2_fff MR_2" :src="attr2[0].thumb == '' ? goodsDetail.img : attr2[0].thumb"
						 mode=""></image>
						<view class="W_70">
							<view class="flex_row_between PB_2">
								<view class="color_ED2251 font_weight_bold fontS_20">￥{{spe_price == '' ? goodsDetail.spe_price : spe_price}}</view>
								<view class="iconfont fontS_22" @click="cart_show=false">&#xe6a7;</view>
							</view>
							<view class="textL text_overflow_1 PB_2">
								{{goodsDetail.goods_name}}
							</view>
						</view>
					</view>
					<view class="PLR_2 overflow_y H_100">
						<view class="W_100">
							<view class="PTB_2 textL ">
								<!-- 选择颜色和尺码 -->
								{{dataList.field1}}
							</view>
							<view class="W_100 flex_rowL  overflow_x">
								<text class="PTB_1 PLR_2 MR_2 textC B_radius_5" style="white-space: nowrap;display: inline-block;" @click="checkidx('cart',item,index)"
								 :class="checkIdx == index ? 'bg_ED2251 color_fff':'color_999 B_1_999'" v-for="(item,index) in goodsDetail.goods_attr[0]"
								 :key="index">
									{{item}}
								</text>
							</view>
							<view class="PTB_3">
								<view class="flex_row_around PTB_1 bg_D0D0D0">
									<!-- <view>尺码</view> -->
									<view>{{dataList.field2}}</view>
									<view>购买数量</view>
								</view>
								<view class="bg_eee W_100 ">
									<view class="flex_row_around PTB_1" v-for="(item,index) in attr2" :key="index">
										<view>{{item.attr}}</view>
										<van-stepper min="0" :max="item.count" @overlimit="deficiency" :value="item.selected_nums" @minus="minusItem('cart',item)"
										 @plus="addItem('cart',item)" @change="onChange" @blur="inputIdx('cart',item)" button-size="24" />
									</view>
								</view>
							</view>

							<view class="PTB_2 textL " v-if="selectNums.length > 0">
								<!-- 选择颜色和尺码 -->
								{{dataList.field1}}
							</view>
							<view class="W_100 MB_4">
								<view :show-scrollbar="true" class="PLR_1 B_1_ED2251" style="width: 97%;" scroll-y="true" v-if="selectNums.length > 0">
									<view class="color_ED2251 W_100 " style="padding: 2rpx 0 2rpx 0;" v-for="(item,index) in selectNums" :key="index">
										{{item}}
									</view>
								</view>
							</view>
						</view>
						<view class="color_fff flex_rowC PTB_3 z_index_1000 W_100">
							<view class="PTB_2 flex_rowC W_70 bg_ED2251 B_radius_max" @click="editCart()">
								确定<view v-if="goodsNum > 0">({{goodsNum}})</view>
							</view>
						</view>
						<view class="H_40vw">

						</view>
					</view>
				</scroll-view>
			</van-popup>

			<van-popup :show="shoppingCartshow" z-index="1000" position="bottom" safe-area-inset-top="true" @click-overlay="overlayShow"
			 @close="onClose">

				<scroll-view class="W_100 overflow_hidden z_index_1000" style="height: 120vw;margin-bottom: 110rpx;">
					<view class="bg_fff PTB_3 flex_rowC relative">
						<view class="">
							我的购物车
						</view>
						<view class="iconfont absolute fontS_22" style="right: 5%;" @click="shoppingCartshow=false">
							&#xe6a7;
						</view>
					</view>
					<view class="overflow_y H_100 bg_f2f2f2 PB_10">
						<view class="bg_f7f7f7 BB_5_d0d0d0 PTB_3 PLR_1" v-for="(item,index) in shoppingCartlist.list1" :key="index">
							<view class="flex_rowL relative">
								<view class="iconfont color_ED2251 fontS_22 PR_1" @click="checkCart(index)">
									{{!item.is_selected ? '&#xe609;':'&#xe7e9;'}}
								</view>
								<view class="MR_2 flex_colC">
									<image class="WH_24vw B_radius_5 B_2_fff" :src="item.img" mode=""></image>
									<view class="PTB_1 fontS_14">
										￥{{item.goods_price}}
									</view>
								</view>
								<view class="W_65 fontS_12 absolute" style="top: 0;right: 0;">
									<view class="flex_row_between">
										<view class="text_overflow_1 ">{{item.goods_name}}</view>
									</view>
									<view class="PTB_1 color_ED2251 fontS_12 flex_row_between">
										<view>￥{{item.goods_price}}</view>
										<view>购买省:{{item.total_zms}}</view>
										<view>{{item.total_goods_nums}}</view>
									</view>
									<view class="B_1_bbb bg_f2f2f2 PL_1 H_14vw overflow_y flex_rows_start">
										<view class="PR_2" v-for="(asset,index) in item.attr_str" :key="index">
											{{asset}}
										</view>
									</view>
									<view class="PT_2 textR PR_2 fontS_14" @click="getcartGoodsDetail(item)">
										编辑
									</view>
								</view>
							</view>
						</view>
						<view class="H_10vw">

						</view>
					</view>
					<view class="fixed W_100 bg_fff H_14vw flex_rowL z_index_1000" style="bottom: 0;">
						<view class="iconfont color_ED2251 fontS_22 PLR_3" @click="checkCarts()">
							{{!allCheck ? '&#xe609;':'&#xe7e9;'}}
							<!-- &#xe609; -->
						</view>
						<view class="flex_rowL flex_grow_1" style="line-height: 14vw;">
							合计：<view class="fontS_16 color_ED2251 PL_2 PR_1">
								￥{{orderPrice}}
							</view>
						</view>
						<view class="PR_3" style="line-height: 14vw;" @click="dialog">
							删除
						</view>
						<view class="bg_ED2251 textC color_fff fontS_16 W_34vw" style="line-height: 14vw;" @click="checkGood('cart')">
							提交订单({{orderNum}})
						</view>
					</view>
				</scroll-view>
			</van-popup>

			<van-overlay :show="shareImgshow">
				<view class="H_100vh W_100 flex_colC z_index_100 relative">
					<image :src="shareImg" class="W_68vw B_radius_5" style="height: 980rpx;width: 560rpx;" mode=""></image>
					<view class="absolute iconfont fontS_22 color_fff" style="top: 12%;right: 5%;" @click="shareImgshow=false">
						&#xe6a7;
					</view>
					<view class="flex_rowC PT_4">
						<button class="flex_colC PR_5" hover-class='none' open-type='share'>
							<image class="WH_14vw B_radius_max" src="http://qnyimages.hexieyihao.vip/share_icon1.png" mode=""></image>
							<view class="color_fff fontS_14">微信</view>
						</button>
						<button class="flex_colC PL_5" hover-class='none' @click="saveImage">
							<image class="WH_14vw B_radius_max" src="http://qnyimages.hexieyihao.vip/share_icon5.png" mode=""></image>
							<view class="color_fff fontS_14">保存本地</view>
						</button>
					</view>
				</view>
			</van-overlay>

			<van-dialog id="van-dialog" />
			<van-popup :show="toastShow" z-index="9999" custom-style="border-radius: 5px;" :overlay='false'>
				<view class="PTB_1 PLR_3 bg_ED2251 color_fff B_radius_5">
					<!-- 请先选择颜色再选尺码 -->
					请先选择{{dataList.field1}}再选{{dataList.field2}}
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
		userInfo,
		userSignIn
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
				is_sign:'',
				signShow: false,
				save_price:'', // 省后价格
			}
		},
		onReachBottom() {
			this.getGoodlist('more');
		},
		onLoad(options) {
			// this.getGoodlist();
			this.getRecommend();
			console.warn('goins')
			console.log(JSON.stringify(options))
			console.warn('goins') 	 	
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
				// if (!uni.getStorageSync('token') && options.is_worker == 1) {
				// 	// console.log('跳转登录')
				// 	uni.navigateTo({
				// 		url: '/pages/common/login?type=' + options.type +'&pid=' + options.pid + '&goodsId=' + options.goodsId
				// 	});
				// }
				// return
			} else if (options.id) {
				this.backIdx = false;
				this.good_id = options.id;
				uni.setStorage({
					key: 'pid',
					data: options.pid,
					success: function() {
				
					}
				});
				// if (!uni.getStorageSync('token') && options.is_worker == 1) {
				// 	// console.log('跳转登录')
				// 	uni.navigateTo({
				// 		url: '/pages/common/login?type=delToken'
				// 	});
				// }
				// return
			} else if(options.good_id){
				this.backIdx = false;
				this.good_id = options.good_id;
				// return
			} else if(this.$parseURL().good_id) {
				this.pages = this.$parseURL().pages;
				this.good_id = this.$parseURL().good_id;
			} else {
				this.backIdx = false;
			}
			this.user_id = uni.getStorageSync('userId')
			uni.setStorageSync('goodId', this.good_id);
			console.warn('jinquan',uni.getStorageSync('goodId'))
			this.videoContext = uni.createVideoContext('myVideo',this);
			this.user = uni.getStorageSync('userInfo');
			// identity_str
			// console.log(this.user.identity_str)
			this.getUserInfo()
		},
		// 分享 好友
		onShareAppMessage(res) {
			return {
				title: this.dataList.goods_name,
				path: '/pages/common/shopGoodInfo?id=' + uni.getStorageSync('goodId') + '&pid=' + uni.getStorageSync('userId') +
					'&is_worker=' + this.user.is_worker,
				imageUrl: this.dataList.share_img
			}
		},
		// 朋友圈
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
						console.warn('zms_fxz',JSON.stringify(this.dataList.zms_fxz))
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
				if (index != -1) {
					that.disabled = false;
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
				this.selected_nums = e.detail;
			},
			addItem(type, item) {
				let that = this;
				// console.log(item);
				that.spe_price = item.spe_price;
				that.save_price = Number(item.spe_price) - (Number(that.dataList.spe_price) - Number(that.dataList.save_price))
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
				console.error('ShareId',that.good_id)
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
				let that = this;
				let param;
				if (type == 'cart') {
					if (that.checkCartlist < 1) {
						that.toastShow = true;
						// uni.showToast({
						// 	title: '您还未选择商品',
						// 	icon: 'none',
						// 	duration: 2000
						// });
						return
					}
					param = {
						'json_str': '',
						'car_ids': that.checkCartlist.toString()
					}
				} else {
					if (that.checkNum.length < 1) {
						// uni.showToast({
						// 	title: '您还未选择商品',
						// 	icon: 'none',
						// 	duration: 2000
						// });
						that.toastShow = true;
						return
					}
					param = {
						'json_str': encodeURIComponent(JSON.stringify(that.checkNum)),
						'car_ids': ''
					}
				}
				if (type == 'cart') {
					that.buy_show = false;
					that.$openPage({
						name: 'confirmOrder',
						query: {
							order_type: type,
							car_ids: that.checkCartlist.toString()
						}
					})
				} else {
					that.buy_show = false;
					that.$openPage({
						name: 'confirmOrder',
						query: {
							order_type: type,
							json_str: encodeURIComponent(JSON.stringify(that.checkNum))
						}
					})
				}
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
					that.getshoppingCartlist();
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

	/* ::-webkit-scrollbar {
		display: inline-block !important;
		width: 4px;
	} */

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
