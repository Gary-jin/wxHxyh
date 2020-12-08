<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<canvas id="firstCanvas" class="firstCanvas absolute WH_100" :style="{width: cw + 'px', height: ch + 'px'}" style="z-index: -1;top: -99999px;"
		 canvas-id="firstCanvas"></canvas>
		<headerTop title="【和鞋一号】严选商城"></headerTop>
		<view class="bg_ff5126 PTB_3 PLR_3 flex_row_between relative">
			<view class="iconfont absolute color_999" style="left: 15%;">&#xe60f;</view>
			<view class="iconfont absolute fontS_20 color_999 z_index_100" @click="show=true" style="right: 17%;">&#xe62c;</view>
			<view class="iconfont color_fff" @click="back">&#xe724;</view>
			<input type="text" placeholder="搜索您喜欢的商品" confirm-type="search" @confirm="searchGood(0,'')" v-model="word" class="PTB_1 bg_fff B_radius_max W_70 PL_7">
			<view class="color_fff" @click="searchGood(0,'')">搜索</view>
		</view>
		<view class="" v-show="showidx==0">
			<view class="P_3 flex_row_between">
				<view class="">历史记录</view>
				<button class="iconfont color_999 fontS_18 bg_f2f2f2" :disabled="disabled" @click="delHistory">&#xe628;</button>
			</view>
			<view class="flex_rows_start PLR_3">
				<view class="bg_D0D0D0 color_fff textC PLR_1 MR_2 MB_1 B_radius_5" @click="checkSearchItem(item)" v-for="(item,index) in serchList"
				 :key="index">{{item}}</view>
			</view>
		</view>

		<view :class="sizerShowPop?'xxx':''" class="PLR_2 bg_f2f2f2" v-show="showidx==1">
			<view class="flex_row_between PTB_2">
				<view class="flex_rowC W_25" @click="filtrateDef()">
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
				<!-- 			<view class="flex_rowC W_25" @click="filtrateGoods(2)">
				<view>佣金</view>
				<view class="flex_colC PL_2">
					<image class="sort_icon" v-show="showIcon3" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png" mode=""></image>
					<image class="sort_icon" v-show="showIcon4" src="http://qnyimages.hexieyihao.vip/downRank.png" mode=""></image>
				</view>
			</view> -->
				<view class="flex_rowC W_25" @click="filtrateGoods(3)">
					<view>销量</view>
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
			<view class="PTB_2 flex_rows_start">
				<view class="W_50 flex_colC MB_2" @click="$openPage({name:'shopGoodInfo',query:{good_id: item.goods_id}})" v-for="(item,index) in dataList"
				 :key="index">
					<view class="W_44vw bg_fff PB_2">
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
						<view class="PLR_1 MT_1">
							<text class="B_1_DA3B57 fontS_12 color_DA3B57 PLR_2 B_radius_5" style="padding-top: 4rpx;padding-bottom: 4rpx;">
								{{item.str2}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="color_999 textC MT_10" v-if="dataList.length == 0">
					没有相应筛选商品
				</view> -->
			<view class="PT_10 W_100 flex_colC fontS_12" v-if="noneShow">
				<view class="color_999">
					没有找到相关商品
				</view>
				<!-- 				<view class="flex_rowC color_999">
					点此<view class="color_ED2251" @click="afreshSearch()">重新搜索</view>或者<view class="color_ED2251" @click="backIndex">返回首页</view>
				</view> -->
			</view>
		</view>


		<van-popup :show="show" round position="bottom" z-index="9999" @close="onClose">
			<view class="W_100 bg_fff BT_radius_15">
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


	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getSearchhistorylist,
		delSearchhistorylist,
		getGoodList,
		getQNYtoken
	} from '../../static/script/const.js';
	import {
		init,
		upload
	} from '../../static/script/qiniuUploader.js';
	import minix from '../../static/script/minix.js'
	export default {
		data() {
			return {
				showidx: 0,
				tabList: ['综合', '价格', '佣金', '销量'],
				serchList: [],
				dataList: [],
				word: '',
				page: 1,
				sorts: 1,
				cate_id: 1,
				goods_status: 0,
				cw: '',
				ch: '',
				show: false,
				sort1: true,
				sort2: true,
				sort3: true,
				disabled: true,
				showIcon1: true,
				showIcon2: true,
				showIcon3: true,
				showIcon4: true,
				showIcon5: true,
				showIcon6: true,
				noneShow: false,
				user: {},

				sizerShow: false,//筛选显示
				sizerShowPop:false, // 筛选弹窗显示
				sizerList : [],
				lowest_price :'', // 最低价
				top_price :'' ,//  最高价
				sizerIds: '' ,//筛选IDs type == 1
				traitIds:'', //筛选IDs type ==2
				
			}
		},
		created() {
			this.getSearchhistory();
			this.user = uni.getStorageSync('userInfo');
		},
		onReachBottom() {
			this.searchGood(1, 'more');
		},
		methods: {
			searchGood(type, load) {
				let that = this;
				let param;
				if (load == 'more') {
					param = {
						page: ++that.page,
						sort: that.sorts,
						// cate_id: that.cate_id,
						goods_status: that.goods_status,
						'keywords': that.word,
						lowest_price:this.lowest_price,
						top_price:this.top_price,
						selected_ids: this.sizerIds || ' ',
						attr_select_ids: this.traitIds || ' '
					}
				} else {
					param = {
						page: 1,
						sort: that.sorts,
						// cate_id: that.cate_id,
						goods_status: that.goods_status,
						'keywords': that.word,
						lowest_price:this.lowest_price,
						top_price:this.top_price,
						selected_ids: this.sizerIds || ' ',
						attr_select_ids: this.traitIds || ' '
					}
				}
				api._get(getGoodList, param).then((res) => {
					if (res.code == 0) {
						that.showidx = 1;
						if (load == 'more') {
							if (res.data.list.length > 0) {
								that.dataList = that.dataList.concat(res.data.list);

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
						} else {
							that.dataList = res.data.list;

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
							if(that.dataList.length == 0){
								that.noneShow = true;
							}
							if (type === 0) {
								if (that.dataList.length < 1) {
									that.noneShow = true;
								} else {
									that.noneShow = false;
								}
							}
						}
					}
				})
			},
			afreshSearch() {
				let that = this;
				that.page = 1;
				that.sorts = '1'
				that.goods_status = '0'
				that.word = ''
				that.showidx = 0;
				that.noneShow = false;
			},
			getSearchhistory() {
				api._get(getSearchhistorylist, {}).then((res) => {
					if (res.code == 0) {
						this.serchList = res.data.list;
						console.log(this.serchList.length)
						if (res.data.list.length == 0) {
							this.disabled = true;
						} else {
							this.disabled = false;
						}
					}
				})
			},
			delHistory() {
				api._get(delSearchhistorylist, {}).then((res) => {
					if (res.code == 0) {
						this.getSearchhistory();
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1000
						})
					} else {
						// uni.showToast({
						// 	title: res.msg,
						// 	icon: 'none',
						// 	duration: 1000
						// })
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
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
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [item], //从相册选择
					success: (res) => {
						let file = res.tempFilePaths[0];
						that.$openPage({
							name: 'searchdrawingGood',
							query: {
								file: file,
								// image:ret
							}
						})
					}
				});
			},

			checkSearchItem(item) {
				this.word = item;
				this.page = 1;
				this.cate_id = 1;
				this.sorts = 1;
				this.goods_status = 0;
				this.dataList = [];
				this.searchGood(0, '');
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
				this.page = 1;
				this.goods_status = 0;
				this.searchGood();
			},
			filtrateDef() {
				this.showIcon1 = true;
				this.showIcon2 = true;
				this.showIcon3 = true;
				this.showIcon4 = true;
				this.showIcon5 = true;
				this.showIcon6 = true;
				// this.word = '';
				this.page = 1;
				this.sorts = 1;
				this.goods_status = 0;
				this.searchGood();
			},
			onClose() {
				this.show = false;
			},
			backIndex() {
				uni.$emit('backHome')
				uni.switchTab({
					url: '../tab1'
				})
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
				this.searchGood()
			},
			// 筛选 确认
			sizerConfirm(){
				this.searchGood()
				this.sizerShowPop = false
			},
			// 筛选	重置
			sizerReset(){
				this.lowest_price = '';
				this.top_price = '';
				this.sizerIds = '';
				this.traitIds = ''
				this.sizerShow = false;
				this.searchGood()
			}







		},
		components: {
			headerTop,
		}
	}
</script>

<style>
	button::after {
		border: none;
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
