<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop :title="title" :titleStyle="titleStyle" editGoodsShow="true"></headerTop>
		<view class="flex_grow_1 overflow_y H_100">
			<view class="H_100vw bg_f2f2f2" v-if="images && images.length > 0">
				<view class="uni-padding-wrap WH_100" >
					<view class="page-section swiper WH_100">
						<view class="page-section-spacing WH_100">
							<swiper class="swiper WH_100" :current="current" :indicator-dots="indicatorDots" :circular="circular" :autoplay="autoplay" :interval="interval"
							 :duration="duration">
								<swiper-item v-for="(item,index) in images" @click="$openPage({name:'managementAddgoodimg',query:{type:'banner',data:images}})" :key="index">
									<view class="swiper-item uni-bg-red WH_100">
										<image :src="item" class="WH_100" mode="aspectFill"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="H_40vw bg_f2f2f2 flex_colC" v-if="images.length < 1">
				<image @click="$openPage({name:'managementAddgoodimg',query:{type:'banner',data:images}})" class="WH_16vw" src="http://qnyimages.hexieyihao.vip/addgoodsImage.png" mode=""></image>
			</view>
			<view class="P_2">
				<view class="PTB_2 flex_row_between BB_1_f2f2f2 " @click="$openPage({name:'managementAddgoodimg',query:{type:'video',data:videoUrl}})">
					<view>主图视频</view>
					<view class="flex_rowL">
						<view class="color_999">{{!addVideo ? '未添加' : '已添加'}}</view>
						<view class="iconfont PL_2">&#xe600;</view>
					</view>
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2 " @click="$openPage({name:'managementAddgoodimg',query:{type:'images',data:detailImg}})">
					<view>*商品详情</view>
					<view class="flex_rowL">
						<view class="color_999">{{!editImg ? '未添加' : '已添加'}}</view>
						<view class="iconfont PL_2">&#xe600;</view>
					</view>
				</view>
				<view class="PTB_2 BB_1_f2f2f2">
					<!-- <view class="color_999 text_overflow_2">{{param.goods_name}}</view> -->
					<input type="text" class="color_999 flex_grow_1" placeholder="请输入商品名称" v-model="param.goods_name">
				</view>
				<view class="PTB_2 BB_1_f2f2f2">
					<!-- <view class="color_999">{{param.goods_no}}</view> -->
					<input type="text" class="color_999 flex_grow_1" placeholder="请输入商品货号" v-model="param.goods_no">
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2" @click="$openPage({name:'managementClassifygood',query:{cate:cate_id}})">
					<view>*产品分类</view>
					<view class="flex_rowL">
						<view class="color_999">{{param.cate_ids != '' ? '已选择分类' : '选择商品分类'}}</view>
						<!-- <input type="text" disabled v-model=""> -->
						<view class="iconfont PL_2">&#xe600;</view>
					</view>
				</view>
				<view class="PTB_2 flex_row_between BB_5_f2f2f2">
					<view>*品牌代号</view>
					<input type="text" class="textR" v-model="param.pp_no" placeholder="请输入数字、字母或文字等信息">
				</view>
				<view class="PTB_2 flex_row_between BB_5_f2f2f2" @click="$openPage({name:'managementCarriage',query:{pid:param.post_id}})">
					<view>运费模板</view>
					<view class="flex_rowL">
						<view class="color_999">{{!post_text ? '未设置' : post_text}}</view>
						<view class="iconfont PL_2">&#xe600;</view>
					</view>
				</view>

				<view class="PTB_2 flex_row_between BB_5_f2f2f2" @click="$openPage({name:'managementSpecification',query:{obj:specificationObj,type:type}})">
					<view>*规格</view>
					<view class="flex_rowL">
						<view class="color_999"> {{specificationObj.length < 1 ? '未添加' : '已添加'}}</view>
						<view class="iconfont PL_2">&#xe600;</view>
					</view>
				</view>
				<view class="PTB_2 flex_row_between BB_5_f2f2f2" @click="$openPage({name:'managementAddSizer',query:{trait_ids: param.trait_id}})">
					<view>筛选</view>
					<view class="flex_rowL">
						<view class="color_999"> {{param.trait_id ? '已添加':'未添加'}}</view>
						<view class="iconfont PL_2">&#xe600;</view>
					</view>
				</view>
			
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view>*出厂价</view>
					<input type="text" v-model="param.ex_price" class="textR" placeholder="输入商品出厂价">
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view class="flex_row_between">
						<view>*商品价格</view>
						<input type="number" @input="changeModel" v-model="param.spe_price" class="textC W_60" placeholder="输入商品销售价">
					</view>
					<view class="flex_row_between">
						<view class="flex_grow_1">市场价</view>
						<input type="number" v-model="param.shop_price" disabled class="flex_grow_1 W_60 textR">
					</view>
				</view>
			
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view>库存</view>
					<input type="number" v-model="param.total" class="PL_4 textR" placeholder="请输入商品库存">
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view>销量</view>
					<input type="number" v-model="param.sales" class="PL_4 textR" placeholder="请输入商品库存">
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view>佣金</view>
					<input type="number" v-model="param.yongjin" class="PL_4 textR" placeholder="请输入商品佣金">
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view>董事长额外佣金数</view>
					<input type="number" v-model="param.dsz_yongjin" class="PL_4 textR" placeholder="请输入董事长额外佣金数">
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view>总经理分佣比例</view>
					<view class="flex_rowR">
						<input type="number" v-model="param.zjl_rate" class="PL_4 textR" placeholder="请输入总经理分佣比例">%
					</view>
				</view>
				<view class="PTB_2 flex_row_between BB_1_f2f2f2">
					<view>经理分佣比例</view>
					<view class="flex_rowR">
						<input type="number" v-model="param.jl_rate" class="PL_4 textR" placeholder="请输入经理分佣比例">%
					</view>
				</view>
			
			
				<view class="flex_rowC PTB_6">
					<button class="W_80 B_radius_max textC bg_ED2251 color_fff" hover-class="none" :disabled="disabled" @click="editGoods">
						{{admin == 2 ? '放入仓库' : '上架出售'}}
					</button>
				</view>
			</view>
			<van-dialog id="van-dialog" />
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog.js';
	import {
		managerGoodsinfo,
		managerAddEditgoods,
		defaultPost,
		getManager
	} from '../../static/script/const.js';
	import {
		compute,
		dealInputVal,
		imageToBase64
	} from '../../static/script/minix.js';
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				current:0,
				titleStyle:'margin-left: 0 !important;',
				checked: false,
				disabled:false,
				gId: '',
				goodsInfo: {},
				images:[],
				param: {
					goods_id: '',
					img: '',
					goods_name: '',
					goods_no: '',
					pp_no: '',
					cate_ids: '',
					post_id: '',
					ex_price: '',
					spe_price: '',
					shop_price: '',
					total: '9999',
					yongjin: '',
					dsz_yongjin: '',
					jl_rate: '',
					zjl_rate: '',
					imgs: [],
					banner_imgs:[],
					attr1: '',
					attr2: '',
					attr_json:'',
					video_url:'' ,
					sales:'',
					trait_id:''
				},
				is_attr: false,
				cate_id: [],
				post_text: '',
				editImg:false,
				detailImg:[],
				specificationObj:[],
				title:'',
				times:'',
				addVideo:false,
				videoUrl:[],
				type:'',
				admin:'',
				imgs:[],
				imageList:[]
			}
		},
		onShow() {
			this.current = 0;
		},
		onLoad() {
			let that = this;
			that.admin = that.$parseURL().adm;
			that.getManager();
			console.log(that.admin)
			if(that.$parseURL().id){
				that.title = '编辑商品'
				that.gId = that.$parseURL().id;
				that.getGoods();
			} else {
				that.title = '新增商品';
				that.getdefaultPost();
			}
			that.type = that.$parseURL().type;
			// that.times = that.$parseURL().times;
			if(that.type == 'add'){
				uni.$on('back',function(data){
					Dialog.confirm({
					  title: '提示',
					  message: '退出后需要重新编辑商品信息，请谨慎操作',
					}).then(() => {
					    // on confirm
						
						uni.navigateBack({
							delta: 1
						})
					  }).catch(() => {
					    // on cancel
					  });
				})
			} else {
				uni.$on('back',function(data){
					Dialog.confirm({
					  title: '提示',
					  message: '是否确认保存',
					}).then(() => {
					    // on confirm
						that.editGoods();
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},200)
					  }).catch(() => {
					    // on cancel
						uni.navigateBack({
							delta: 1
						})
					  });
				})
			}	
		},
		mounted() {
			let that = this;
			uni.$on('checkCid',(data)=> {
				// this.cate_name = data.name;
				that.param.cate_ids = (data.cate_list).toString();
				that.cate_id = data.cate_list;
				console.log(data.cate_list)
			})
			uni.$on('checkPost',(data)=> {
				that.post_text = data.pStr;
				that.param.post_id = data.pId;
				
			})
			uni.$on('specification',(data)=> {
				// console.log(data)
				that.specificationObj = data.content;
				that.param.attr1 = data.title[0];
				that.param.attr2 = data.title[1];
				that.param.attr_json = encodeURIComponent(JSON.stringify(data.content));
			})
			uni.$on('editImages',(data)=> {
				that.param.imgs = encodeURIComponent(JSON.stringify(data.imgs));
				that.detailImg = data.imgs;
				if(data.imgs.length > 0) {
					that.editImg = true;
				}
			})
			uni.$on('editBanner_imgs',(data)=> {
				console.log(data);
				that.images = data.imgs;
				that.imageList = data.imgs;
				that.imgs = [];
				let arr = data.imgs;
				let arr2 = [];
				arr.forEach((item)=>{
					if(item.indexOf("qnyimages") != -1){
						arr2 = arr2.concat(item);
						console.log(arr2);
						that.param.banner_imgs = encodeURIComponent(JSON.stringify(arr2));	
					} else {
						 imageToBase64(item,(ret,suc)=>{
							// console.log(ret);
							if(suc){
								arr2 = arr2.concat(ret);
								if(arr.length == arr2.length){
									that.param.banner_imgs = encodeURIComponent(JSON.stringify(arr2));	
									console.log(that.param.banner_imgs)
								}
							}	
						});
					}
				})
			})
			uni.$on('editVideo',(data)=> {
				if(data.imgs) {
					that.videoUrl = that.videoUrl.concat(data.imgs);
					that.param.video_url = JSON.stringify(data.imgs);
					that.addVideo = true;
				}
			})

			uni.$on('addSizer',(data)=> {
				console.log(JSON.stringify(data))
				that.param.trait_id = data.SizerList;
			})
		},
		onUnload() {
			
			Dialog.confirm({
			  title: '提示',
			  message: '退出后需要重新编辑商品信息，请谨慎操作',
			}).then(() => {
			    // on confirm
				uni.navigateBack({
					delta: 1
				})
			  }).catch(() => {
			    // on cancel
			  });
		},
		methods: {
			getManager(){
				api._post(getManager, {}).then((res) => {
					if (res.code == 0) {
						this.times = res.data.info.bei;
					}
				})
			},
			getGoods() {
				let that = this;
				let param = {
					'goods_id': that.gId
				}
				api._post(managerGoodsinfo, param).then((res) => {
					if (res.code == 0) {
						that.param.goods_id = res.data.g_info.goods_id;
						that.images = res.data.banner_imgs;
						that.detailImg = res.data.imgs;
						that.param.banner_imgs = encodeURIComponent(JSON.stringify(res.data.banner_imgs))
						that.param.imgs = encodeURIComponent(JSON.stringify(res.data.imgs));
						this.images = res.data.banner_imgs;
						this.imgs = res.data.banner_imgs;
						this.imageList = res.data.banner_imgs;
						this.editImg = true;
						that.param.goods_name = res.data.goods_name;
						that.param.goods_no = res.data.goods_no;
						that.param.pp_no = res.data.pp_no;
						that.param.video_url = res.data.g_info.video_url;
						// this.videoUrl = res.data.g_info.video_url;
						this.videoUrl = this.videoUrl.concat(res.data.g_info.video_url);
						this.addVideo = true;
						that.cate_name = res.data.cate_name;
						that.param.cate_ids = (res.data.cate_ids).toString();
						that.cate_id = res.data.cate_ids;
						that.post_text = res.data.post_text;
						that.param.post_id = res.data.post_id;
						that.param.ex_price = res.data.ex_price;
						that.param.spe_price = res.data.spe_price;
						that.param.shop_price = res.data.shop_price;
						that.param.total = res.data.total;
						that.param.yongjin = res.data.yongjin;
						that.param.dsz_yongjin = res.data.dsz_yongjin;
						that.param.jl_rate = res.data.jl_rate;
						that.param.zjl_rate = res.data.zjl_rate;
						that.param.attr1 = res.data.attr1;
						that.param.attr2 = res.data.attr2;
						that.param.sales = res.data.sales;
						that.param.trait_id = res.data.trait_ids;
						that.is_attr = res.data.is_attr;
						that.param.attr_json = encodeURIComponent(JSON.stringify(res.data.attr_json));
						that.specificationObj = res.data.attr_json;
					}
				})
			},
			editGoods() {
				
				if(this.param.imgs == ''){
					uni.showToast({
						title: '商品详情不能为空',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.param.goods_name == ''){
					uni.showToast({
						title: '商品名称不能为空',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.param.goods_no == ''){
					uni.showToast({
						title: '商品货号不能为空',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.param.pp_no == ''){
					uni.showToast({
						title: '品牌代号不能为空',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.param.cate_ids == ''){
					uni.showToast({
						title: '商品类别不能为空',
						icon: 'none',
						duration: 1500
					});
					return
				}
				// if(this.param.ex_price == ''){
				// 	uni.showToast({
				// 		title: '出厂价不能为空',
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return
				// }
				if(this.param.spe_price == ''){
					uni.showToast({
						title: '销售价不能为空',
						icon: 'none',
						duration: 1500
					});
					return
				}
				// if(this.param.yongjin == ''){
				// 	uni.showToast({
				// 		title: '商品佣金不能为空',
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return
				// }
				// if(this.param.dsz_yongjin == ''){
				// 	uni.showToast({
				// 		title: '董事长佣金不能为空',
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return
				// }
				// if(this.param.jl_rate == ''){
				// 	uni.showToast({
				// 		title: '经理佣金比例不能为空',
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return
				// }
				// if(this.param.zjl_rate == ''){
				// 	uni.showToast({
				// 		title: '总经理佣金比例不能为空',
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return
				// }
				if(this.param.banner_imgs == ''){
					uni.showToast({
						title: '请添加商品轮播图',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.param.attr_json == '' || this.specificationObj.length < 1){
					uni.showToast({
						title: '请添加商品规格',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.param.attr1 == ''){
					uni.showToast({
						title: '请添加商品规格',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.param.attr2 == ''){
					uni.showToast({
						title: '请添加商品规格',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				
				// console.log(this.param.goods_name);
				this.disabled = true;
				api._post(managerAddEditgoods, this.param).then((res) => {
					// console.log(res);
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
						uni.$emit('Editgoodupdate')
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},800)
					} else {
						this.disabled = false;
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						});
					}
				})
			},
			onChange(e) {
				// console.log(e.detail);
				this.is_attr = e.detail;
				let asset = e.detail;
				if (e.detail) {

				}
			},
			changeModel() {
				// console.log(this.param.spe_price * 1.8)
				this.param.spe_price = dealInputVal(this.param.spe_price)
				let price = Number(this.param.spe_price) * Number(this.times)
				this.param.shop_price = Math.round(price);
				console.log(this.param.shop_price)
			},
			getdefaultPost(){
				api._post(defaultPost,{}).then((res)=>{
					if(res.code == 0){
						this.param.post_id = res.data.post_id;
						this.post_text = res.data.str;
					}
				})
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
