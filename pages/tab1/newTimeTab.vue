<template>
	<view class="flex_colT flex_items_stretch bg_ff5126">

		<view class="custom-header-container" :style="{'padding-top':getStausBarMT -44 + 'px'}" style="position: fixed;z-index:9999;width:100%">
			<!-- <view class="custom-header-status-bar" :style="{height:getStausBarHeight}"></view> -->
			<view class="custom-header-top-container">
				<view  style="height: 44px;width: 38px;margin: 0;padding: 0;border-radius: 0 !important;display: flex;align-items: center;justify-content: center;"
					@click="newCateBack()">
					<view class="iconfont fontS_14">
						&#xe724;
					</view>
				</view>
			</view>
		</view>
	
		<view class="fixed W_100 flex_col_between z_index_1000" id="test" style="top: 0;" :style="{'margin-top':getStausBarMT + 'px'}">
			<view class="PB_1 W_100 bg_ff5126" style="margin: 0;box-sizing: border-box;">
				<view class="H_6vw" v-if="indexMT == 'android' && leave > 1"></view>
				<view class="flex_rowL W_100 color_fff PLR_2">
					<view class="W_85 color_fff flex_rowL overflow_x nav">
						<view class="MR_3 PTB_2 font_weight_bold BB_2_fff" style="white-space: nowrap;" >
							{{timeTit}}
						</view>
					</view>
				</view>
			</view>
		</view>


		

		<view :class="sizerShowPop?'xxx':''" class="bg_fff H_100" :style="{'margin-top':viewHeight + getStausBarMT + 'px'}" >
			<view v-if="timeKeyShow" class=" PLR_3 bg_fff flex_rows_start z_index_1000" >
				<!-- <view class="W_20 MB_1 flex_colC" @click="checksonTab(item,index)" v-for="(item,index) in cateSonlist" :key="index">
					<view class="WH_14vw B_radius_5">
						<image :src="item.thumbnailImg" class="WH_100" mode="aspectFill"></image>
					</view>
					<view class="PT_1">{{item.cateName}}</view>
				</view> -->

				<view  class="W_20 MTB_2 flex_colC" v-if="index>8" @click="checkTimeTab(item,index)" v-for="(item,index) in timeList" :key="index">
					<view class="PB_1">{{item.date}}</view>
					<view class="font_weight_bold fontS_20" v-if="item.is_show == 1">新款</view>
					<view class="font_weight_bold fontS_20 H_10" style="width: 2px;height: 50rpx;" v-else></view>
				</view>
			</view>

			<view class="PLR_2 H_100">
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
					<view class="flex_rowC W_25 B_radius_5" :class="sizerShow?'color_DA3B57 B_1_DA3B57':'B_1_000'" @click="sizer()">
						<view :class="sizerShow?'color_DA3B57':''">点击筛选</view>
						<view class="flex_colC PL_2">
							<image v-if="sizerShow" style="width:20rpx;height:28rpx" src="https://qnyimages.hexieyihao.vip/sizer1.png" mode=""></image>
							<image v-else style="width:20rpx;height:28rpx" src="https://qnyimages.hexieyihao.vip/sizer2.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="PTB_2 flex_rows_start H_100">
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
				<view class="color_999 textC MT_10" v-if="cateGoodlist.length == 0">
					没有相应筛选商品
				</view>

				<view class="textC PT_10" v-if="goodsShow">
					没有更多了
				</view>
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
							<view class="flex_rowL color_d9d9d9"  >
								<!-- <view style="width:340rpx;" class="text_overflow_1 textR" v-if="item.child_list.length>6">{{item.skuChange?item.skuChange:'全部'}}</view>
								<view style="width:340rpx;" class="text_overflow_1 textR" v-else>{{item.skuChange?item.skuChange:''}}</view> -->
								<view style="width:340rpx;" @click="skuall(index,item.list_show,item.child_list.length)" class="text_overflow_1 textR" >{{item.child_list.length>6?'点击更多':''}}</view>
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

		
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
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
    moreDateCateList
	} from '../../static/script/const.js';
	import {
		init,
		upload
	} from '../../static/script/qiniuUploader.js';
	import minix from '../../static/script/minix.js'
	export default {
		data() {
			return {
				checkIdx: 0,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
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
        timeTit:'',
				timeKeyShow : false,
				cateShow: true,
				showBack: false,
				timeKeyShow1: '0',


				sizerShow: false,//筛选显示
				sizerShowPop:false, // 筛选弹窗显示
				sizerList : [],
				lowest_price :'', // 最低价
				top_price :'' ,//  最高价
				sizerIds: '' ,//筛选IDs type == 1
				traitIds:'', //筛选IDs type ==2
				trait_cate_id:'',

				filtrate1Show:true, //综合颜色
				filtrateIndex:0 , //价格 销量 颜色
			}
		},
		onReachBottom() {
				this.getCategood('more');
		},
		onLoad(options) {
      if (this.$parseURL().timeType != '0'){
        this.timeKey = this.$parseURL().timeType
        this.timeTit = this.$parseURL().timeTit
        this.getCategood()
      } else {
        this.timeKey = this.$parseURL().item9
        this.timeTit = this.$parseURL().timeTit
        this.timeKeyShow = true
        this.getCategood()
        this.timeListNew();
      }
		},
		mounted() {
			this.getViewHeight();
			// console.log(JSON.stringify(uni.getSystemInfoSync()))
		},
		methods: {
			newCateBack(){
				let that = this;
				if(that.timeKeyShow1 != '1') {
					uni.navigateBack()
				} else{
					this.pageScrollTop()
					that.timeKeyShow = true
					that.timeKeyShow1 = '0'
					this.timeTit = '查看更多'
					this.timeKey = this.$parseURL().item9
					this.pages = 1
					this.getCategood()
				}
			},
			checksonTab(item, index) {
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
				this.zhikong()

				this.pages = 1
				this.timeKeyShow = false
				this.timeKeyShow1 = '1'
        this.timeKey = item.time
        this.timeTit = item.date
				this.getCategood()
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
			timeListNew() {
				api._get(getDateCateList).then((res) => {
					if (res.code == 0) {
						this.timeList = res.data;
					} else {
						this.timeList = []
					}
				})
			},
			getCategood(type) {
				let that = this;
				let param;
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
						attr_select_ids: this.traitIds || ' ',
						trait_cate_id:this.listShow || ' '
					}
				} else {
					param = {
						page: 1,
						sort: that.sorts,
						cate_id: that.parentid,
						goods_status: that.goods_status,
						date_id: this.timeKey,
						lowest_price:this.lowest_price,
						top_price:this.top_price,
						selected_ids: this.sizerIds || ' ',
						attr_select_ids: this.traitIds || ' ',
						trait_cate_id:this.listShow || ' '
					}
				}
				api._get(getGoodList, param,0).then((res) => {
					if (type == 'more') {
						if (res.data.list.length > 0) {
							this.cateGoodlist = this.cateGoodlist.concat(res.data.list);
							this.cateGoodlist = this.deWeight(this.cateGoodlist);
							// 刷选列表更新
								this.sizerList = res.data.trait_list 
								//设置选中sku展示名称
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

			
			
			filtrateGoods(index) {
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
				let view = uni.createSelectorQuery().in(this).select("#test");
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

				let  xx = ''
				this.sizerList.forEach((item,index) => {
					if(item.list_show == 'false' && item.child_list.length>6){
						xx = xx + item.trait_cate_id + ','
					} 
				})
				xx = xx.slice(0,xx.length -1)
				console.warn('list_show',xx)
				this.listShow = xx
				this.getCategood()
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
					this.listShow = '';
					this.sizerShow = false;
					this.getCategood()
			},
			zhikong(){
				this.lowest_price = '';
				this.top_price = '';
				this.sizerIds = '';
				this.traitIds = ''
				this.listShow = '';
				this.sizerShow = false;
			}












		},
		components: {
			headerTop,
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



	.custom-header-top-container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		width: 100%;
		z-index: 9999;
		color: #FFFFFF;
		font-weight: bold;
		background-image: linear-gradient(to right, #ff5126, #ed2251);
	}

	.custom-header-back-btn {
		height: 44px;
		width: 38px;
		margin: 0;
		padding: 0;
		border-radius: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.custom-header-container {
		z-index: 1;
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: sticky;
		top: 0;
		/* background: #FFFFFF; */
		background-image: linear-gradient(to right, #ff5126, #ed2251);
	}

	.custom-header-status-bar {
		width: 100%;
		top: 0;
		position: sticky;
		z-index: 100;
	}

	.custom-header-title {
		height: 44px;
		align-self: flex-start;
		line-height: 44px;
		font-size: 15px;
	}

	.headeractive {
		margin-left: 30rpx;
	}

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
