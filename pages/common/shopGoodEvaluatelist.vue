<template>
	<view class="flex_colT flex_items_stretch H_100vh">
		<headerTop title="商品评价" showBack="true"></headerTop>
		<view class="relative flex_grow_1" v-if="dataList && dataList.length > 0">
			<view class="P_3 BB_1_f2f2f2" v-for="(item,index) in dataList" :key="index">
				<view class="flex_row_between">
					<view class="flex_rowL">
						<image class="WH_8vw B_radius_max" :src="item.avatar" mode=""></image>
						<view class="PLR_2">
							{{item.nickname}}
						</view>
						<!-- (item.star).toString() -->
						<van-rate :value="item.star" size="15" gutter="0" color="#ED2251" />
					</view>
					<view class="color_999">{{formatDate(item.create_time)}}</view>
				</view>

				<view class="W_80 PTB_2">
					{{item.remark}}
				</view>

				<view class="W_100 flex_rowL">
					<view class="W_33 flex_rowC MB_2" v-for="(asset,idx) in item.imgs" @click="checkImg(item,idx)" :key="idx">
						<image class="WH_28vw B_radius_5" :src="asset" mode="aspectFit"></image>
					</view>
				</view>

				<view class="P_2 bg_f7f7f7 B_radius_5" v-if="item.reply_content">
					<view class="font_weight_bold">掌柜回复</view>
					<view class="fontS_12 PT_1">{{item.reply_content}}</view>
				</view>
			</view>
<!-- 			<view class="flex_colC color_000 WH_10vw B_radius_max fontS_12 absolute" @click="goTop()" style="background-color: rgba(0,0,0,0.3);bottom: 10%;right: 10%;">
				<view class="iconfont iconback"></view>
				<view>TOP</view>
			</view> -->
		</view>
		<view class="W_100 flex_rowC PTB_5 color_999" v-if="num > 0">
			<view class="" @click="$openPage({'name':'systemGoodEvaluatelist',query:{gId:gId}})">
				已折叠{{num}}条对您帮助不大的评价
			</view>
			<view class="iconfont PL_1">&#xe600;</view>
		</view>
		<view class="MT_20 textC" v-if="show && num <= 0">
			暂无评价！
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getGoodsCommentsList,
		getGoodCommentNum,
		
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				gId: '',
				dataList: [],
				page: 1,
				type: 0,
				show: false,
				num:-1
			}
		},
		onLoad() {
			this.gId = this.$parseURL().good_id;
			this.type = this.$parseURL().type;
			console.log(this.type !== 2 && this.type !== 3)
			this.getGoodsComments();
			if(this.type !== 2 && this.type !== 3){
				this.getNum();
			} 
			
		},
		onReachBottom() {
			this.getGoodsComments('more');
		},
		methods: {
			getGoodsComments(type) {
				let that = this;
				let param;
				if (type == 'more') {
					param = {
						'page': ++this.page,
						'goods_id': that.gId,
						'type': this.type
					};
				} else {
					param = {
						'page': 1,
						'goods_id': that.gId,
						'type': this.type
					};
				}
				api._get(getGoodsCommentsList, param).then((res) => {
					if (res.code == 0) {
						if (type == 'more') {
							if (res.data.list.length > 0) {
								that.dataList = that.dataList.concat(res.data.list);
							}
						} else {
							that.dataList = res.data.list;
							if (that.dataList.length < 1) {
								that.show = true;
							}
						}
					}
				})
			},
			checkImg(item, index) {
				uni.previewImage({
					current: index,
					urls: item.imgs,
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			formatDate(shijianchuo) {
				var time = new Date(shijianchuo * 1000);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm);
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			getNum(){
				api._post(getGoodCommentNum,{'goods_id': this.gId}).then((res) => {
					if(res.code == 0) {
						this.num = res.data.num;
						// this.show = false;
					}
				})
			},
			goTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
					success: (res) => {
						
					},
					fail: (err) => {
				
					},
					complete: (end) => {
				
					}
				});
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
