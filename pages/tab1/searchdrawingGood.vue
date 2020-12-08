<template>

	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<template>
			<van-toast id="van-Toast" />
		</template>
		<headerTop title="【和鞋一号】严选商城" showBack="true"></headerTop>
		<view class="flex_rowC H_10vw bg_ff5126">
			<image class="WH_18vw B_radius_5 B_2_fff relative" style="top: 5vw;" :src="img" mode="aspectFit"></image>
		</view>
			<view class="PLR_2 MT_6">
		<view class="flex_row_between PTB_2 bg_f2f2f2">
			<view class="flex_rowC W_25" @click="filtrateDef()">
				<view>综合</view>
			</view>
			<view class="flex_rowC W_25" @click="filtrateGoods(1)">
				<view>价格</view>
				<view class="flex_colC PL_2">
					<image class="sort_icon" v-show="showIcon1" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png" mode=""></image>
					<image class="sort_icon" v-show="showIcon2" src="http://qnyimages.hexieyihao.vip/downRank.png" mode=""></image>
				</view>
			</view>
			<view class="flex_rowC W_25" @click="filtrateGoods(3)">
				<view>销量</view>
				<view class="flex_colC PL_2">
					<image class="sort_icon" v-show="showIcon5" style="margin-bottom: 4rpx;" src="http://qnyimages.hexieyihao.vip/upRank.png" mode=""></image>
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
				<view class="PTB_2 flex_rows_start bg_f2f2f2" v-if="dataList && dataList.length > 0">
					<view class="W_50 flex_colC MB_2" @click="$openPage({name:'shopGoodInfo',query:{good_id: item.goods_id}})" v-for="(item,index) in dataList" :key="index">
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
				
				<view class="PT_10 W_100 flex_colC fontS_12" v-if="show">
					<view class="color_999">
						没有找到相关商品
					</view>
				</view>
				<van-toast id="van-toast" />
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





	</view>
	<!-- <view class="" v-else> -->
		<!-- <van-skeleton title row="10" /> -->
	<!-- </view> -->
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {SearchbyImageGoodslist} from '../../static/script/const.js';
	import minix from '../../static/script/minix.js';
	import Toast from '../../wxcomponents/vant/dist/toast/toast.js';
	export default {
		data() {
			return {
				tabList:['综合','价格','佣金','销量'],
				img: '',
				image:'',
				page:1,
				sorts:"",
				dataList:[],
				user:{},
				show:false,
				loadingShow:true,
				showIcon1:true,
				showIcon2:true,
				showIcon3:true,
				showIcon4:true,
				showIcon5:true,
				showIcon6:true,

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
		onLoad() {
			this.user = uni.getStorageSync('userInfo');
			// 解析路由参数
			this.img = this.$parseURL().file;
			// this.img = 'wxfile://tmp_3a1d2995f9a3da0f42351588c42f3f38f8b9dee9669bc870.jpg'
			// 预览图片
			uni.previewImage({
				urls: this.img,
				// current: e.currentTarget.dataset.url
			});
			minix.imageToBase64(this.img,(ret)=>{
				this.image = ret;
				if(ret){
					this.getGoodslist();
				}
			})
		},
		onShow() {
			this.show = false;
		},
		onReachBottom() {
			this.getGoodslist('more');
		},
		methods: {
			getGoodslist(type){
				uni.hideLoading();
				Toast.loading({
				  message: '加载中...',
				  forbidClick: true,
				  duration:0
				});

				let that = this;
				let param;
				if(type == 'more'){
					param = {
						'page': ++that.page,
						'sort': that.sorts,
						'imgUrl': encodeURIComponent(that.image),
						selected_ids: this.sizerIds || ' ',
						attr_select_ids: this.traitIds || ' '
					}
				} else {
					param = {
						'page': 1,
						'sort': that.sorts,
						'imgUrl': encodeURIComponent(that.image),
						selected_ids: this.sizerIds || ' ',
						attr_select_ids: this.traitIds || ' '
					}
				}

				api._post(SearchbyImageGoodslist,param,0).then((res)=>{
					if(res.code == 0){
						 Toast.clear();
						 this.loadingShow = false;
						if(type == 'more'){
							if(res.data.list.length > 0){
								that.dataList = that.dataList.concat(res.data.list);
							} else {
								Toast('已经到最后了！');
							}

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
							that.dataList = res.data.list;
							if(that.dataList.length < 1){
								that.show = true;
							}

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
					}
				})
			},
	filtrateGoods(index){
		if(index == 1){
			this.sort1 = !this.sort1;
			if(!this.sort1){
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
		} else if(index == 2){
			this.sort2 = !this.sort2;
			if(!this.sort2){
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
		} else if(index == 3){
			this.sort3 = !this.sort3;
			if(!this.sort3){
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
				this.page = 1;
				this.getGoodslist();
			},
			filtrateDef(){
				this.showIcon1 = true;
				this.showIcon2 = true;
				this.showIcon3 = true;
				this.showIcon4 = true;
				this.showIcon5 = true;
				this.showIcon6 = true;
				this.page = 1;
				this.sorts = 1;
				this.getGoodslist();
			},
			clearNum(num){
				return Number(num).toFixed(0);
			},





		// 价格区间 失去焦点触发
			changeCount(){
				console.log("失去")
				if(this.top_price && this.lowest_price){
					this.sizerShow = true;
					this.getGoodslist()
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
				this.getGoodslist()
				this.sizerShowPop = false
			},
			// 筛选	重置
			sizerReset(){
				this.lowest_price = '';
				this.top_price = '';
				this.sizerIds = '';
				this.traitIds = ''
				this.sizerShow = false;
				this.getGoodslist()
			}





		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
