<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2 relative">
		<headerTop title="商品管理" showBack="true"></headerTop>
		<view class="absolute W_100 H_100vh">
			<image class="WH_22vw B_radius_5 absolute MLR_3" v-if="manager.app_logo" style="left: 10;top:11%;" :src="manager.app_logo" mode=""></image>
		</view>
		<view class="">
			<view class="PTB_2 bg_ff5126 color_fff PL_20">
				{{manager.app_name}}
			</view>

			<view class="flex_rowR bg_fff">
				<view class="flex_row_around W_70 z_index_100">
					<view class="flex_colC flex_grow_1 " @click="checkTab(0)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 0}">
							<view class="textC">{{manager.num1}}</view>
							<view class="fontS_12 PT_1" :class="tabIdx == 0 ? 'color_ED2251': 'color_999'">全部商品</view>
						</view>
					</view>
					|
					<view class="flex_colC flex_grow_1" @click="checkTab(1)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 1}">
							<view class="textC">{{manager.num2}}</view>
							<view class="fontS_12 PT_1" :class="tabIdx == 1 ? 'color_ED2251': 'color_999'">正在出售</view>
						</view>
					</view>
					|
					<view class="flex_colC flex_grow_1" @click="checkTab(2)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 2}">
							<view class="textC">{{manager.num3}}</view>
							<view class="fontS_12 PT_1" :class="tabIdx == 2 ? 'color_ED2251': 'color_999'">已下架</view>
						</view>
					</view>
					|
					<view class="flex_colC flex_grow_1" @click="checkTab(3)">
						<view class="PTB_2 PLR_1" :class="{'color_ED2251 BB_2_ED2251':tabIdx == 3}">
							<view class="textC">{{manager.num4}}</view>
							<view class="fontS_12 PT_1" :class="tabIdx == 3 ? 'color_ED2251': 'color_999'">仓库</view>
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

		<view class="flex_row_between PTB_2 z_index_1000">
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
		<view class="PLR_4 overflow_y" v-if="listShow">
			<view class="PT_2 PB_5 flex_rowL BB_1_DCDCDC relative" v-for="(item,index) in goodsList" :key="index">
				<view class="iconfont fontS_18 PR_2" v-show="!show" @click="checkSelected(item,index)">
					{{!item.is_selected ? '&#xe609;' : '&#xe7e9;'}}
				</view>
				<image class="WH_16vw B_radius_5 MR_2" @click="$openPage({name:'managementGoodinfo',query:{id:item.goods_id,times:manager.bei,adm:admin}})" 
				 :src="item.img" v-if="item.img" mode="aspectFill"></image>
				<view class="W_70 flex_grow_1">
					<view class="text_overflow_1">
						{{item.goods_name}}
					</view>
					<view class="flex_row_between PTB_2">
						<view class="color_ED2251">￥{{item.spe_price}}</view>
						<view class="fontS_10 color_999">出厂价：￥{{item.ex_price}}</view>
						<view class="fontS_10 color_999 PR_5">品牌代号 {{item.pp_no}}</view>
					</view>
					<view class="flex_rowL relative">
						<view class="fontS_10 color_999">库存：{{item.total}}</view>
						<view class="fontS_10 color_999 PL_6">销量：{{item.sales}}</view>
						<view class="fontS_10 color_ED2251 PL_5" v-if="tabIdx === 2 && item.is_ground == 0">
							已下架
						</view>
						<view class="fontS_10 color_ED2251 PL_5" v-if="tabIdx != 2">
							{{item.status_text}}
						</view>
						<view class="iconfont fontS_20 absolute color_999" style="right: 0;" @click="edit(item,index)">&#xe7fb;</view>
					</view>
				</view>
				<view v-show="item.is_sel" class="PLR_3 PTB_2 B_radius_5 flex_row_around absolute color_fff fontS_12 W_50" style="background-color: rgba(0,0,0,0.6);right: 5%;
top: 50%;
">
					<view class="flex_colC PLR_1" @click="$openPage({name:'managementEditgood',query:{id:item.goods_id,type:'edit',times:manager.bei,adm:admin}})">
						<image class="WH_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon1.png" mode=""></image>
						<view>编辑</view>
					</view>
					<view class="flex_colC PLR_1" @click="upAndDowngoods(item)" v-if="admin != 2 && tabIdx != 3 || tabIdx != 0">
						<image class="WH_6vw MB_1" v-if="img1 || img2" :src="item.is_ground == 1 ? img1 : img2" mode=""></image>
						<view>{{item.is_ground == 1 ? '下架' : '上架'}}</view>
					</view>
					<view class="flex_colC PLR_1" @click="delGood(item)">
						<image class="WH_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon3.png" mode=""></image>
						<view>删除</view>
					</view>
					<view class="flex_colC PLR_1" @click="refGood(item)" v-if="admin != 2 && tabIdx != 3 || tabIdx != 0">
						<image class="WH_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon4.png" mode=""></image>
						<view>刷新</view>
					</view>
				</view>
			</view>
		</view>
		<view class="PT_10 textC color_999" v-else>
			当前管理员（员工）身份没有权限查看此分类
		</view>
		<view class="H_12vw">

		</view>

		<view class="W_100 flex_rowL z_index_100" style="position: fixed !important;bottom: 0" v-show="show">
			<view class="bg_fff flex_grow_1 PTB_2 PL_5 color_666" @click="show=false">批量操作</view>
			<view class="bg_ED2251 textC PTB_2 color_fff W_30" @click="$openPage({name:'managementEditgood',query:{type:'add',times:manager.bei,adm:admin}})">发布商品</view>
		</view>
		<view class=" W_100 bg_fff z_index_100  fixed" style="bottom: 0;" v-show="!show">
			<view class="flex_row_between ">
				<view class="bg_fff flex_rowL W_30">
					<view class="flex_rowL PR_3" @click="checkAll()">
						<view class="iconfont fontS_18 PLR_2">
							{{allCheck ? '&#xe7e9;' : '&#xe609;'}}
						</view>
						<view class="">全选</view>
					</view>
					<view @click="show=true">取消</view>
				</view>
				<view class="flex_row_around W_60 PTB_2">
					<view class="flex_colC flex_grow_1 PLR_1" @click="dialogshow=true">
						<!-- <image class="WH_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon3.png" mode=""></image> -->
						<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">删除</view>
					</view>
					<view class="flex_colC flex_grow_1 PLR_1" @click="refGood">
						<!-- <image class="W_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon4.png" mode=""></image> -->
						<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">刷新</view>
					</view>
					<view class="flex_colC flex_grow_1 PLR_1" @click="allupAndDowngoods(0)">
						<!-- <image class="W_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon2.png" mode=""></image> -->
						<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">下架</view>
					</view>
					<view class="flex_colC flex_grow_1 PLR_1" @click="allupAndDowngoods(1)">
						<!-- <image class="W_6vw MB_1" src="http://qnyimages.hexieyihao.vip/Management_icon2.png" mode=""></image> -->
						<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">上架</view>
					</view>
				</view>
			</view>
			<!-- 二开增加 -->
			<view class="flex_row_between" v-if="is_goods_admin == 1">
				<view class="W_30"></view>
				<view class="flex_row_around W_60 PTB_2">
					<view class="flex_colC flex_grow_1 PLR_1" @click="priceChange('add')">
						<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">加价</view>
					</view>
					<view class="flex_colC flex_grow_1 PLR_1" @click="priceChange('fall')">
						<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">降价</view>
					</view>
					<view class="flex_colC flex_grow_1 PLR_1" @click="addSales()">
						<view class="PTB_1 PLR_2 fontS_12 bg_f7f7f7 B_radius_5">增加销量</view>
					</view>
				</view>
			</view>
		</view>
		<van-dialog use-slot title="标题" :show="dialogshow" show-cancel-button @confirm="confirm" @cancel="cancel">
			<view class="textC PTB_3">
				确定删除选中商品吗?
			</view>
		</van-dialog>
		<van-dialog use-slot :title="priceChangeTit" :show="priceChangeShow" show-cancel-button @confirm="confirmPriceChange" @cancel="cancelPriceChange">
			<view class="textC PTB_3 fontS_12 PLR_2 D_flex" style="flex-wrap:wrap;justify-content: center;">
				<input type="number" v-model = 'priceChangeNum'  class="bg_fff B_1 W_75 B_radius_5 " placeholder="请输入" />
			</view>
		</van-dialog>
		<van-popup :show="popupShow" overlay-style="background-color: rgba(0,0,0,0.3)" custom-style="width: 70%;z-index:9999" class-name="z_index_9999" @close="popupClose">

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
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog.js'
	import api from '../../static/script/ajax.js';
	import {
		getManager,
		managerGoodslist,
		refreshGoods,
		delGoods,
		upAndDownGoods,
		getGoodsCateList,
		ManSetAddPrice,
		ManSetAddSales
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
				goods_id: [],
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
				listShow: true,


				priceChangeTit:'',
				priceChangeShow:false,
				priceChangeNum:'',
				priceChangeWay:'',
				is_goods_admin:uni.getStorageSync('userInfo').is_goods_admin
			}
		},
		onShow() {
			this.getManagement();
			this.getGoodslist();
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
		methods: {
			getManagement() {
				let that = this;
				let param = {
					'cate_id':that.cateId
				}
				api._post(getManager, param).then((res) => {
					if (res.code == 0) {
						that.manager = res.data.info;
						uni.stopPullDownRefresh;
					}
				})
			},
			getGoodslist(type) {
				let that = this;
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
						'keywords': that.word,
						'sort': that.sorts,
						'cate_id': that.cateId,
						'goods_status': that.goods_status,
					}
				}
				that.listShow = true;
				api._post(managerGoodslist, param).then((res) => {
					if (res.code == 0) {
						uni.stopPullDownRefresh;
						if (type == 'more') {
							if (res.data.list.length > 0) {
								that.goodsList = that.goodsList.concat(res.data.list);
							}
						} else {
							that.goodsList = res.data.list;
							if (that.admin == 2) {
								if (that.goods_status == 1 || that.goods_status == 2) {
									that.listShow = false;
								}
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
							duration: 1500
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
							duration: 1500
						});
						this.getManagement();
						this.getGoodslist();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			refGood(item) {
				let param
				if (item.goods_id) {
					param = {
						'goods_id': item.goods_id
					}
				} else {
					if (this.goods_id.length < 1) {
						uni.showToast({
							title: '请选择商品',
							icon: 'none',
							duration: 1500
						});
						return
					}
					param = {
						'goods_id': this.goods_id.toString()
					}
				}
				api._post(refreshGoods, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						// this.getManagement();
						this.getGoodslist();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			upAndDowngoods(item) {
				let ground;
				if (item.is_ground == 1) {
					ground = 0;
				} else {
					ground = 1;
				}
				let param = {
					'goods_id': item.goods_id,
					'is_ground': ground
				}

				api._post(upAndDownGoods, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						item.is_ground = !item.is_ground;
						setTimeout(() => {
							this.getManagement();
							this.getGoodslist();
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
			allupAndDowngoods(idx) {
				if (this.goods_id.length < 1) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none',
						duration: 1500
					});
					return
				}
				let param = {
					'goods_id': this.goods_id.toString(),
					'is_ground': idx
				}
				api._post(upAndDownGoods, param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						setTimeout(() => {
							this.getManagement();
							this.getGoodslist();
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
			checkTab(index) {
				// console.log(1)
				this.page = 1;
				this.tabIdx = index;
				this.goodsList = [];
				this.goods_status = index;
				this.getGoodslist();
			},
			edit(item, index) {
				// this.idxShow = index;
				// this.goodsList[index].is_selected = !this.goodsList[index].is_selected
				item.is_sel = !item.is_sel;
				if (item.is_sel) {
					this.goodsList.forEach((i, idx) => {
						if (i.goods_id != item.goods_id) {
							i.is_sel = false;
						}
					})
				}
			},
			checkSelected(item, index) {

				this.goodsList[index].is_selected = !this.goodsList[index].is_selected;
				if (this.goodsList[index].is_selected) {
					// this.checkNumList = this.checkNumList.concat()
					this.goods_id = unique(this.goods_id.concat(this.goodsList[index].goods_id));
				} else {
					this.goods_id.forEach((i, idx) => {
						if (i == this.goodsList[index].goods_id) {
							this.goods_id.splice(idx, 1);
						}
					})
				}

			},
			checkAll() {
				this.allCheck = !this.allCheck;
				if (this.allCheck) {
					this.goodsList.forEach((item) => {
						item.is_selected = true;
						this.goods_id.push(item.goods_id);
						console.log(this.goods_id)
					})
				} else {
					this.goodsList.forEach((item) => {
						item.is_selected = false;
						this.goods_id = [];
					})
				}
			},
			confirm() {
				this.dialogshow = false;
				this.delGood();
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
								duration: 2000
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
							duration: 2000
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

			confirmPriceChange(){
				if(this.priceChangeWay!=''){
						let param = {
							goods_id: this.goods_id.toString(),
							money :this.priceChangeNum,
							type : this.priceChangeWay
						}
						api._post(ManSetAddPrice, param).then((res) => {
									this.priceChangeNum = ''
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 3000
									});
									setTimeout(()=>{
										this.getManagement();
										this.getGoodslist();
									},3000)
									this.priceChangeShow = false
									this.goods_id = []
						})
				} else{
					let param = {
							goods_id: this.goods_id.toString(),
							num :this.priceChangeNum
						}
					api._post(ManSetAddSales, param).then((res) => {
									this.priceChangeNum = ''
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 3000
									});
									setTimeout(()=>{
										this.getManagement();
										this.getGoodslist();
									},3000)
									this.priceChangeShow = false	
									this.goods_id = []
						})
				}
			},
			cancelPriceChange() {
				this.priceChangeShow = false
			},
			priceChange(way){
				if (this.goods_id.length < 1) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(way == 'add'){
					this.priceChangeTit = '请输入加价金额'
					this.priceChangeWay = '1'
				} else{
					this.priceChangeTit = '请输入降价金额'
					this.priceChangeWay = '2'
				}
				this.priceChangeShow = true
			},
			addSales(){
				this.priceChangeTit = '请输入增加销量数量'
				this.priceChangeShow = true
			}
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
