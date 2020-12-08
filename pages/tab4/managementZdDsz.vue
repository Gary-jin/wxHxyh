<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2 relative">
		<headerTop title="指定董事长商品管理" showBack="true"></headerTop>
		<view class="absolute W_100 H_100vh">
			<image class="WH_22vw B_radius_5 absolute MLR_3" v-if="manager.app_logo" style="left: 10;top:11%;" :src="manager.app_logo" mode=""></image>
			<image class="WH_6vw absolute" @click="popupQuery = true" style="right: 20rpx;top:10%;z-index: 9999;" src="https://qnyimages.hexieyihao.vip/query.png" mode=""></image>
		</view>
		<view class="">
			<view class="PTB_2 bg_ff5126 color_fff PL_20">
				{{manager.app_name}}
			</view>

			<view class="flex_rowR bg_fff">
				<view class="flex_row_around W_75 z_index_100">
					<view class="flex_colC flex_grow_1 " @click="checkTab(0)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 0}">
							<view class="textC">{{manager.num1}}</view>
							<view class="fontS_11 PT_1" :class="tabIdx == 0 ? 'color_ED2251': 'color_999'">在售商品</view>
						</view>
					</view>
					|
					<view class="flex_colC flex_grow_1" @click="checkTab(1)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 1}">
							<view class="textC">{{manager.num2}}</view>
							<view class="fontS_11 PT_1" :class="tabIdx == 1 ? 'color_ED2251': 'color_999'">可售商品</view>
						</view>
					</view>
					|
					<view class="flex_colC flex_grow_1" @click="checkTab(2)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 2}">
							<view class="textC">{{manager.num3}}</view>
							<view class="fontS_11 PT_1" :class="tabIdx == 2 ? 'color_ED2251': 'color_999'">平台全部商品</view>
						</view>
					</view>
					|
					<view class="flex_colC flex_grow_1" @click="checkTab(3)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 3}">
							<view class="textC">{{manager.num4}}</view>
							<view class="fontS_11 PT_1" :class="tabIdx == 3 ? 'color_ED2251': 'color_999'">必选商品</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="PTB_2 PLR_3 flex_row_around">
			<view class="flex_row_between color_999 W_25 bg_fff B_radius_5 PTB_1 PLR_3 shadow_1" @click="checkPopup">
				<input type="text" v-model="cateName" class="fontS_12 text_overflow_1" disabled placeholder="分类搜索">
				<view class="iconfont fontS_22">&#xe75c;</view>
			</view>
			<view class="bg_fff W_60 flex_rowL relative B_radius_5 shadow_1 color_999">
				<input type="text" confirm-type="search" class="PTB_1 PL_8  flex_grow_1 fontS_12" @confirm="getGoodslist" @input="onChange"
				 v-model="word" placeholder="关键词/货号/品牌代号搜索">
				<view class="iconfont fontS_18 absolute" style="left: 6%;" @click="getGoodslist">
					&#xe60f;
				</view>
			</view>
		</view>
		
		
		

		<view class="flex_row_between PTB_2 z_index_100">
			<view class="flex_rowC W_25" @click="filtrateDef">
				<view>综合</view>
			</view>
			<view class="flex_rowC W_25" @click="filtrateGoods(1)">
				<view>价格</view>
				<view class="flex_colC PL_2">
					<image class="sort_icon" v-show="showIcon1" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png"
					 mode=""></image>
					<image class="sort_icon" v-show="showIcon2" src="http://qnyimages.hexieyihao.vip/downRank.png" mode=""></image>
				</view>
			</view>
			<view class="flex_rowC W_25" @click="filtrateGoods(2)">
				<view>佣金</view>
				<view class="flex_colC PL_2">
					<image class="sort_icon" v-show="showIcon3" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png"
					 mode=""></image>
					<image class="sort_icon" v-show="showIcon4" src="http://qnyimages.hexieyihao.vip/downRank.png" mode=""></image>
				</view>
			</view>
			<view class="flex_rowC W_25" @click="filtrateGoods(3)">
				<view>销量</view>
				<view class="flex_colC PL_2">
					<image class="sort_icon" v-show="showIcon5" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png"
					 mode=""></image>
					<image class="sort_icon" v-show="showIcon6" src="http://qnyimages.hexieyihao.vip/downRank.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="PLR_4 overflow_y" >
			<view class="PT_2 PB_5 flex_rowL BB_1_DCDCDC relative" v-for="(item,index) in goodsList" :key="index">
				<view class="iconfont fontS_18 PL_2 PTB_2 PR_2" v-show="!show" @click="checkSelected(item,index)">
					{{item.is_selected ? '&#xe7e9;' : '&#xe609;'}}
				</view>
				<image class="WH_16vw B_radius_5 MR_2" @click="goGoodinfoZdDsz(item.id,)" 
				 :src="item.thumb" v-if="item.thumb" mode="aspectFill"></image>
				<view class="W_70 flex_grow_1">
					<view class="text_overflow_1">
						{{item.goods_name}}
					</view>
					<view class="flex_row_between PT_6">
						<view class="color_ED2251 ">￥{{item.spe_price}}</view>
						<view class=" color_red " v-if="goods_status == 0">修改后：￥{{item.add_price}}</view>
						<view class="fontS_10 color_999 ">销量：{{item.sales}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="H_12vw">

		</view>

		<view class="W_100 flex_rowL z_index_100" style="position: fixed !important;bottom: 0;" v-show="show">
			<view class="bg_fff flex_grow_1 PTB_2 PL_5 color_red" v-if="goods_status == 0" @click="show=false">批量操作</view>
			<view class="bg_fff flex_grow_1 PTB_2 PL_5 color_red" v-if="goods_status == 1" @click="show=false">批量操作</view>
			<view class="bg_fff flex_grow_1 PTB_2 PL_5 color_red" v-if="goods_status == 2" >*当前总平台全部商品，不可编辑</view>
			<view class="bg_fff flex_grow_1 PTB_2 PL_5 color_red" v-if="goods_status == 3" >*平台设置必选商品，不可编辑</view>
		</view>
		
		<view class="fixed W_100 bg_fff flex_row_between z_index_100" style="bottom: 0;" v-show="!show">
			<view class="bg_fff flex_rowL W_30">
				<view class="flex_rowL PR_3" @click="checkAll()">
					<view class="iconfont fontS_18 PLR_2">
						{{allCheck ? '&#xe7e9;' : '&#xe609;'}}
					</view>
					<view class="">全选</view>
				</view>
				<view @click="show=true">取消</view>
			</view>
			<view class="flex_row_around W_40 PTB_2" v-if="goods_status == 0">
				<!-- <view class="flex_colC flex_grow_1 PLR_1" @click="priceChange(0)">
					<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">加价</view>
				</view> -->
				<view class="flex_colC flex_grow_1 PLR_1" @click="priceChange(1)">
					<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">降价</view>
				</view>
				<view class="flex_colC flex_grow_1 PLR_1" @click="upAndDown(0)">
					<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">下架</view>
				</view>
			</view>
			<view class="flex_row_around W_50 PTB_2 PL_2" v-if="goods_status == 1">
				<view class="flex_rowR PLR_1"  @click="priceChange(0)">
					<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">加价上架</view>
				</view>
				<view class="flex_rowR PLR_1"  @click="upAndDown(1)">
					<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">不加价上架</view>
				</view>
			</view>

		</view>
		
		<van-dialog use-slot :title="title" :show="dialogshow" confirmButtonColor="red" show-cancel-button @confirm="confirm" @cancel="cancel">
			<view class="textC PTB_3 fontS_12 PLR_2 D_flex" style="flex-wrap:wrap;justify-content: center;">
				<view>下架后商品会转入</view>
				<view class="color_red">“可售商品”列表</view>
				<view>，您和您的下级</view>
				<view>将看不到下架的商品，</view>
				<view class="color_red">可重复选择是否下架</view>
			</view>
		</van-dialog>

		<van-dialog use-slot title="在销售价基础上增加价格" :show="addPri" confirmButtonText='加价' 
		confirmButtonColor="red" show-cancel-button @confirm="confirmaddPri" @cancel="canceladdPri">
			<view class="textC PTB_3 fontS_12 PLR_2 D_flex" style="flex-wrap:wrap;justify-content: center;">
				<input type="number" v-model = 'addPriNum'  class="bg_fff B_1 W_75 B_radius_5 " placeholder="请输入金额" />
			</view>
		</van-dialog>
		<van-dialog use-slot title="在销售价基础上降低价格" :show="reducePri" confirmButtonText='降价' 
		confirmButtonColor="red" show-cancel-button @confirm="confirmReducePri" @cancel="cancelReducePri">
			<view class="textC PTB_3 fontS_12 PLR_2 D_flex" style="flex-wrap:wrap;justify-content: center;">
				<input type="number" v-model = 'reducenNum'  class="bg_fff B_1 W_75 B_radius_5 " placeholder="请输入金额" />
			</view>
		</van-dialog>
		<van-dialog use-slot title="您选中的存在不可降价商品" :show="reduceTiShi" confirmButtonText='过滤' 
		confirmButtonColor="red" show-cancel-button @confirm="confirmareduceTiShi" @cancel="cancelareduceTiShi">
			<view class="textC PTB_3 fontS_12 PLR_2 D_flex" style="flex-wrap:wrap;justify-content: center;">
				<view class="color_red">是否为您自动过滤不可降价商品</view>
			</view>
		</van-dialog>

		<van-dialog use-slot title="您选中的无可降价商品" :show="ChongXuan" confirmButtonText='重选' 
		confirmButtonColor="red" show-cancel-button @confirm="confirmChongXuan" @cancel="cancelChongXuan">
			<view class="textC PTB_3 fontS_12 PLR_2 D_flex" style="flex-wrap:wrap;justify-content: center;">
				<view class="color_red">请重新选择</view>
			</view>
		</van-dialog>

		<!-- <van-dialog use-slot title="降价金额太大" :show="reduceMoney" confirmButtonText='过滤' 
		confirmButtonColor="red" show-cancel-button @confirm="confirmreduceMoneyi" @cancel="cancelareduceMoneyi">
			<view class="textC PTB_3 fontS_12 PLR_2 D_flex" style="flex-wrap:wrap;justify-content: center;">
				<view class="color_red">是否为您自动过滤不可降低此价格商品</view>
			</view>
		</van-dialog> -->
	







		<!-- 分类搜索 -->
		<van-popup :show="popupShow" overlay-style="background-color: rgba(0,0,0,0.3)" custom-style="width: 70%;z-index:9999;border-radius: 10rpx;" class-name="z_index_9999" @close="popupClose">
			<view class="PTB_3 PLR_2 overflow_y B_radius_10" style="height: 900rpx;z-index: 9999;">
				<view class="bg_fff PLR_2 PTB_1 MB_2">
					<view class="flex_row_between">
						<view class="flex_rowL" @click="checkId('all')">
							<image class="WH_10vw" src="" mode=""></image>
							<view class="PL_2">
								综合
							</view>
						</view>
						<view class="W_20 PTB_1 flex_rowR">
							<view class="iconfont">&#xe600;</view>
						</view>
					</view>
				</view>
				<view class="bg_fff PLR_2 PTB_1 MB_2" v-for="(item,index) in dataList" :key="index">
					<view class="flex_row_between">
						<view class="flex_rowL" @click="checkId(item)">
							<image class="WH_10vw" :src="item.thumbnailImg" mode=""></image>
							<view class="PL_2">
								{{item.cateName}}
							</view>
						</view>
						<view class="W_20 PTB_1 flex_rowR" @click="checkSelecteds(item,index,2)">
							<view class="iconfont">&#xe600;</view>
						</view>
					</view>
					<view class="PLR_3 bg_fff " v-show="index == idx1" v-for="(asset,idx) in dataLists" :key="idx">
						<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
							<view @click="checkId(asset)">{{asset.cateName}}</view>
							<view class="W_30 PTB_1 flex_rowR" @click="checkSelecteds(asset,idx,3)">
								<view class="iconfont">&#xe600;</view>
							</view>
						</view>
						<view class="PLR_3 bg_f2f2f2" v-show="idx == idx2" v-for="(i,x) in list" :key="x">
							<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
								<view @click="checkId(i)">{{i.cateName}}</view>
								<view class="W_30 PTB_1 flex_rowR" @click="checkSelecteds(i,x,4)">
									<view class="iconfont">&#xe600;</view>
								</view>
							</view>
							<view class="PLR_3 bg_f2f2f2" v-show="x == idx3" v-for="(j,k) in list1" :key="k">
								<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
									<view @click="checkId(j)">{{j.cateName}}</view>
									<view class="W_30 PTB_1 flex_rowR" @click="checkSelecteds(j,k,5)">
										<view class="iconfont">&#xe600;</view>
									</view>
								</view>
								<view class="PLR_3 bg_f2f2f2" v-show="k == idx3" v-for="(m,n) in list2" :key="n">
									<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
										<view @click="checkId(n)">{{m.cateName}}</view>
										<view class="W_30 PTB_1 flex_rowR" @click="checkSelecteds(m,n,6)">
											<view class="iconfont">&#xe600;</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</van-popup>
		<!-- 疑問彈窗 -->
		<van-popup  @click.stop :show="popupQuery" overlay-style="background-color: rgba(0,0,0,0.8)" custom-style="width: 80%; border-radius: 10rpx;">
			<view class="PLR_3">
				<view class="W_100 MT_3 overflow_y" style="height: 500rpx;">
					<view v-html="artHtml"></view>
				</view>
				<view class="W_100 flex_rowC" style="height: 130rpx;">
					<view class="PTB_2 PLR_10 B_radius_5 bg_FF4646 color_fff" @click="popupQuery = false"> 
						我已知晓
					</view>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog.js'
	import api from '../../static/script/ajax.js';
	import {
		ChairmanFirstPageInfo,
		ChairmanGoodsList,
		refreshGoods,
		delGoods,
		upAndDownGoods,
		getGoodsCateList,
		ChairmanAddGoodsMoney,
		ChairmanReduceGoodsMoney,
		ChairmanOnSelfGoods,
		ChairmanOffSelfGoods,
		getArticles,
		addMoneyOnSelfGoods
	} from '../../static/script/const.js';
	import {
		unique
	} from '../../static/script/minix.js';
	export default {
		data() {
			return {
				tabIdx: 0,
				tabNav: ['综合', '价格', '佣金', '销量'],
				edtiShow: false,
				show: true,
				dialogshow: false,
				manager: {},
				goodsList: [],
				word: '',
				sorts: 1,
				page: 1,
				goods_status: 0,
				// goods_id: [],
				goods_id: '',
				img1: 'http://qnyimages.hexieyihao.vip/Management_icon2.png',
				img2: 'http://qnyimages.hexieyihao.vip/upGoods.png',
				checkNumList: [],
				checkNum: 0,
				allCheck: false,
				idxShow: -1,
				sort1: true,
				sort2: true,
				sort3: true,
				popupShow: false,
				popupQuery: false,


				parentId: '0',
				dataList: [],
				dataLists: [],
				list: [],
				list1: [],
				list2: [],
				idx1: -1,
				idx2: -1,
				idx3: -1,
				idx4: -1,
				idx5: -1,
				idx6: -1,
				cateId: '',
				cateName: '',

				showIcon1: true,
				showIcon2: true,
				showIcon3: true,
				showIcon4: true,
				showIcon5: true,
				showIcon6: true,
				admin: '',
				title:'',
				addPri: false, //加价弹窗
				reducePri: false, //降价弹窗
				reduceTiShi: false, //降价过量提示弹窗
				reduceMoney:false, //降价金额太大
				ChongXuan:false, // 重选
				addPriNum:'',
				reducenNum:'',
				artHtml:'',

				xuanzhongLIst :[], //选中数据
				kjjList :[], //可降价数据列表

			}
		},
		onShow() {
			// this.getManagement();
			// this.getGoodslist();
			// this.getArticles()
		},
		onLoad() {
			this.admin = this.$parseURL().admin;
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getManagement();
			this.getGoodslist();
		},
		onReachBottom() {
			this.getGoodslist('more');
		},
		mounted(){
			// console.error("进入2")
			this.getManagement();
			this.getGoodslist();
			this.getArticles()
		},
		methods: {
			goGoodinfoZdDsz(id){
				this.page = 1 
				this.$openPage({name:'managementGoodinfoZdDsz',
				query:{id:id,times:this.manager.bei,adm:this.admin,type:this.goods_status}})
			},
			// 协议
			getArticles(){
				api._post(getArticles,{type:'4'}).then((res)=>{
					if(res.code == 0){
						this.artHtml = res.data.content
					}
				})
			},
			getManagement() {
				let that = this;
				let param = {
					'cate_id':that.cateId
				}
				api._post(ChairmanFirstPageInfo, param).then((res) => {
					if (res.code == 0) {
						that.manager = res.data.info;
						uni.stopPullDownRefresh;
					}
				})
			},
			// 商品列表
			getGoodslist(type) {
				this.allCheck = false
				let that = this;
				if (that.goods_status=='2'||that.goods_status=='3'){
					that.show = true
				}
				let param;
				if (type == 'more') {
					param = {
						'page': ++that.page,
						'keywords': that.word,
						'sort': that.sorts,
						'cate_id': that.cateId,
						'goods_status': that.goods_status,
					}
				} else {
					param = {
						'page': 1,
						'keywords': that.word, //关键词
						'sort': that.sorts,  //排序
						'cate_id': that.cateId, //分类搜索
						'goods_status': that.goods_status, //类型
					}
					
				}
				console.log(that.goods_status,"*************")
				api._post(ChairmanGoodsList, param).then((res) => {
					if (res.code == 0) {
						uni.stopPullDownRefresh;
						if (type == 'more') {
							if (res.data.list.length > 0) {
								let addList = res.data.list;
								for(var i = 0;i<addList.length;i++){
									that.$set(addList[i], 'is_selected', false)
								}
								that.goodsList = that.goodsList.concat(addList);
								// console.log("list",JSON.stringify(that.goodsList))
								// console.log("list",that.goodsList.length)
							}
						} else {
							that.goodsList = res.data.list;
							for(var i = 0;i<that.goodsList.length;i++){
								that.$set(that.goodsList[i], 'is_selected', false)
							}
						}
					}
				})
			},
			delGood(item) {
				let param
				if (item) {
					param = {
						'goods_id': item.goods_id
					}
				} else {
					if (this.goods_id.length < 1) {
						uni.showToast({
							title: '请选择商品',
							icon: 'none',
							duration: 4000
						});
						return
					}
					param = {
						'goods_id': this.goods_id.toString()
					}
				}
				api._post(delGoods, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 4000
						});
						this.getManagement();
						this.getGoodslist();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 4000
						});
					}
				})
			},
			// 加价 降价
			priceChange(way) {
				if(this.goods_id.length == 0){
					uni.showToast({
							title: '请选择商品',
							icon: 'none',
							duration: 4000
					});
					return
				}
				this.xuanzhongLIst = [];
				this.goodsList.forEach((item) => {
						if(item.is_selected){
							this.xuanzhongLIst.push(item)
						}
				})

				if(way == 0){
					console.log("加价")
					this.addPri = true
				} else {
					console.log("降价")

					let listGood =  this.xuanzhongLIst  // 列表所有数据
					this.kjjList = []; //可讲价数据列表
					let jj = 0;
					// 有能降价 和 不能降价
					let isno = 0;
					for(var i=0;i<listGood.length;i++){
						if(Number(listGood[i].spe_price) == Number(listGood[i].add_price)){
							isno+=1
						}else {
							this.kjjList.push(listGood[i])
							jj +=1
						} 
					}
					console.log('isno',isno)
					if(isno==listGood.length){  
						this.ChongXuan = true  //全不能降价
					}
					if (jj == listGood.length){
						this.reducePri = true  //全能降价
					}
					if(isno!=0&&jj!=0){
						this.reduceTiShi = true //有能降价 和 不能降价
					}


					// console.log("kjjList",this.kjjList.length)
					// console.log(JSON.stringify(this.kjjList))
				}
			},
			confirmareduceTiShi(){
				this.reduceTiShi = false
				this.reducePri = true
				
				this.goods_id = ''
				let xuanzhongLength =  0;
				this.kjjList.forEach((item) => {
					if(item.is_selected){
						this.goods_id = this.goods_id + item.id + ','
						xuanzhongLength+=1
					}
				})

				let ll = this.goods_id.length -1
				this.goods_id = this.goods_id.slice(0,ll)
			},
			confirmreduceMoneyi(){

			},
			cancelareduceMoneyi(){
				
			},
			confirmChongXuan(){
				this.ChongXuan = false
				this.page = 1
				this.pageScrollTop()
				this.getGoodslist();
			},
			cancelChongXuan(){
				this.ChongXuan = false
				// this.goods_id = ''
				this.offAll()
				// this.getGoodslist();
				if(this.page>1){
					this.pageScrollTop()
				}
				this.page = 1
			},
			cancelareduceTiShi(){
				this.reduceTiShi = false
				// this.goods_id = ''
				this.offAll()
				// this.getGoodslist();
				if(this.page>1){
					this.pageScrollTop()
				}
				this.page = 1
			},
			confirmaddPri(){
				let reg = /^[0-9]+.?[0-9]*$/;
				let isNo =  reg.test(this.addPriNum)
				if(isNo){
					this.addPri = false
					this.addGoodPri()
				} else {
					uni.showToast({
							title: '金额有误，请重新输入',
							icon: 'none',
							duration: 4000
					});
					setTimeout(()=>{
						this.page = 1
						this.pageScrollTop()
						this.getGoodslist();
					},4000)
					this.addPri = false
				}
			},
			canceladdPri(){
				this.addPri = false
				// this.goods_id = ''
				this.offAll()
				// this.getGoodslist();
				if(this.page>1){
					this.pageScrollTop()
				}
				this.page = 1
			},
			confirmReducePri(){
				let reg = /^[0-9]+.?[0-9]*$/;
				let isNo =  reg.test(this.reducenNum)
				if(isNo){
					this.reducePri = false
					this.reducenPri()
				} else {
					uni.showToast({
							title: '金额有误，请重新输入',
							icon: 'none',
							duration: 4000
					});
					setTimeout(()=>{
						this.page = 1
						this.pageScrollTop()
						this.getGoodslist();
					},4000)
					this.reducePri = false
				}
			},
			cancelReducePri(){
				this.reducePri = false
				// this.goods_id = ''
				this.offAll()
				// this.getGoodslist();
				if(this.page>1){
					this.pageScrollTop()
				}
				this.page = 1
			},
			// 加价
			addGoodPri(){
				// let param= {
				// 	ids: this.goods_id,
				// 	money: this.addPriNum
				// }
				// console.log(JSON.stringify(param))
				// api._post(ChairmanAddGoodsMoney, param).then((res) => {
				// 		uni.showToast({
				// 				title: res.msg,
				// 				icon: 'none',
				// 				duration: 4000
				// 		});
				// 		this.goods_id = ''
				// 		this.addPriNum = ''
				// 		setTimeout(()=>{
				// 			this.page = 1
				// 			this.pageScrollTop()
				// 			this.getGoodslist();
				// 		},4000)
				// })

				let param= {
					ids: this.goods_id,
					money: this.addPriNum
				}
				console.log(JSON.stringify(param))
				api._post(addMoneyOnSelfGoods, param).then((res) => {
						uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 4000
						});
						this.goods_id = ''
						this.addPriNum = ''
						setTimeout(()=>{
							this.page = 1
							this.pageScrollTop()
							this.getGoodslist();
							this.getManagement();
						},4000)
				})
			},
			// 降价
			reducenPri(){
				let param= {
					ids: this.goods_id,
					money: this.reducenNum
				}
				console.log(JSON.stringify(param))
				api._post(ChairmanReduceGoodsMoney, param).then((res) => {
						uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 4000
						});
						this.goods_id = ''
						this.reducenNum = ''
						setTimeout(()=>{
							this.page = 1
							this.pageScrollTop()
							this.getGoodslist();
						},4000)
				})
			},








			// 上下架
			upAndDown(way) {
				if(this.goods_id.length == 0){
					uni.showToast({
							title: '请选择商品',
							icon: 'none',
							duration: 4000
					});
					return
				}
				let param= {
					ids: this.goods_id
				}
				if(way == 0){
					console.log('下架')
					console.log(param)
					this.title = "确定要下架这"+this.goodsList.length+"个商品吗？"
					this.dialogshow =true
					this.confirm(param)
				} else {
					console.log("上架")
					console.log(param)
					this.onSelf(param)
				}
			},
			// 上架
			onSelf(param){
				api._post(ChairmanOnSelfGoods, param).then((res) => {
						uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 4000
						});
						setTimeout(()=>{
							this.goods_id = ''
							this.page = 1
							this.getManagement();
							this.pageScrollTop()
							this.getGoodslist();
						},4000)
				})
			},
			// 下架
			OffSelf(param){
				api._post(ChairmanOffSelfGoods, param).then((res) => {
						uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 4000
						});
						setTimeout(()=>{
							this.goods_id = ''
							this.page = 1
							this.getManagement();
							this.pageScrollTop()
							this.getGoodslist();
						},4000)
				})
			},
			// 筛选
			checkTab(index) {
				// console.log(1)
				this.goods_id = ''
				this.page = 1;
				this.tabIdx = index;
				this.goodsList = [];
				this.goods_status = index;
				this.getGoodslist();
			},
			checkSelected(item, index) {
				this.goods_id = ''
				this.goodsList[index].is_selected = !this.goodsList[index].is_selected;
				this.allCheck = false;
				console.log(this.goodsList.length)
				let xuanzhongLength =  0;
				this.goodsList.forEach((item) => {
					if(item.is_selected){
						this.goods_id = this.goods_id + item.id + ','
						xuanzhongLength+=1
					}
				})

					console.log('xuanzhongLength',xuanzhongLength)
					console.log(this.goods_id)
					let ll = this.goods_id.length -1
					this.goods_id = this.goods_id.slice(0,ll)
					console.log(this.goods_id)


					if(xuanzhongLength==this.goodsList.length){
						this.allCheck = true
					}

			},
			// 全选
			checkAll() {
				this.goods_id = ''
				this.allCheck = !this.allCheck;
				if (this.allCheck) {
					this.goodsList.forEach((item) => {
						item.is_selected = true;
						this.goods_id = this.goods_id + item.id + ','
					})
					console.log(this.goods_id)
					let ll = this.goods_id.length -1
					this.goods_id = this.goods_id.slice(0,ll)
					console.log(this.goods_id)
				} else {
					this.goodsList.forEach((item) => {
						item.is_selected = false;
						this.goods_id = '';
					})
				}
			},
			confirm(param) {
				this.dialogshow = false;
				this.	OffSelf(param)
				// this.delGood();
			},
			cancel() {
				this.dialogshow = false;
			},
			onChange(e) {
				console.log(e.detail.value);
				if (e.detail.value == '') {
					this.page = 1;
					this.sorts = 1;
					// this.goods_status = 0;

					this.getGoodslist();
				}
			},
			filtrateGoods(index) {
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
						this.sorts = 6;
						this.showIcon5 = true;
						this.showIcon6 = false;
						this.showIcon1 = true;
						this.showIcon2 = true;
						this.showIcon3 = true;
						this.showIcon4 = true;
					} else {
						this.sorts = 7;
						this.showIcon5 = false;
						this.showIcon6 = true;
						this.showIcon1 = true;
						this.showIcon2 = true;
						this.showIcon3 = true;
						this.showIcon4 = true;
					}
				}
				console.log(this.sorts);
				this.word = '';
				this.page = 1;
				// this.goods_status = 0;
				this.getGoodslist();
			},
			filtrateDef() {
				console.log('综合筛选')
				this.showIcon1 = true;
				this.showIcon2 = true;
				this.showIcon3 = true;
				this.showIcon4 = true;
				this.showIcon5 = true;
				this.showIcon6 = true;
				this.word = '';
				this.page = 1;
				this.sorts = 1;
				// this.goods_status = 0;
				this.getGoodslist();
			},
			checkPopup() {
				this.popupShow = true;
				this.parentId = 0;
				this.classIfy(1);
			},
			popupClose() {
				this.popupShow = false;
			},
			classIfy(type) {
				let that = this;
				let param = {
					'parentId': that.parentId
				}
				console.log(type)
				api._post(getGoodsCateList, param).then((res) => {
					if (res.code == 0) {
						if (res.data.list.length < 1) {
							uni.showToast({
								title: '没有下级分类了',
								icon: 'none',
								duration: 4000
							});
						}
						if (type === 1) {
							that.dataList = res.data.list;
						} else if (type === 2) {
							that.dataLists = res.data.list;
						} else if (type === 3) {
							that.list = res.data.list;
						} else if (type === 4) {
							that.list1 = res.data.list;
						} else if (type === 5) {
							that.list2 = res.data.list;
						} else if (type === 6) {
							// that.list = res.data.list;
						}
					} else {
						uni.showToast({
							title: '没有下级分类了',
							icon: 'none',
							duration: 4000
						});
					}
				})
			},
			checkSelecteds(item, index, type) {
				console.log(index, type)
				
				if (type === 1) {
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 2) {
					this.idx1 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 3) {
					this.idx2 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 4) {
					this.idx3 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 5) {
					this.idx4 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 6) {
					this.idx5 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				}
			},
			checkId(item) {
				if (item == 'all') {
					this.cateId = '0';
					this.cateName = '';
				} else {
					this.cateId = item.cateId;
					this.cateName = item.cateName;
				}
				this.popupShow = false;
				this.dataList = [];
				this.dataLists = [];
				this.list = [];
				this.list1 = [];
				this.list2 = [];
				this.word = '';
				this.page = 1;
				this.sorts = 1;
				// this.goods_status = 0;
				this.getManagement();
				this.getGoodslist();
			},
			pageScrollTop(callback) {
				// uni.pageScrollTo({
				// 	scrollTop: 0,
				// 	duration: 300,
				// 	success: (res) => {
				// 		callback(res);
				// 	},
				// 	fail: (err) => {

				// 	},
				// 	complete: (end) => {

				// 	}
				// });
			},
			offAll() {
					// this.goodsList.forEach((item) => {
					// 	item.is_selected = false;
					// })
			},
		},
		components: {
			headerTop,
		}
	}
</script>

<style>
.van-center-enter{
	z-index: 9999 !important; 
}

</style>
