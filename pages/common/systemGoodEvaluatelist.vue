<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="更多评价" :showBack="true"></headerTop>
		<view class="flex_grow_1 overflow_y">
			<view class="P_3 BB_1_f2f2f2" v-for="(item,index) in dataList" :key="index">
				<view class="flex_row_between">
					<view class="flex_rowL">
						<image class="WH_8vw B_radius_max" :src="item.avatar" mode=""></image>
						<view class="PLR_2">
							{{item.nickname}}
						</view>
						<van-rate :value="item.star" size="15" gutter="0" color="#ED2251" />
					</view>
					<!-- <view class="color_999">{{formatDate(item.create_time)}}</view> -->
				</view>

				<view class="W_80 PTB_2">
					{{item.remark}}
				</view>

				<!-- 				<view class="W_100 flex_rowL">
					<view class="W_33 flex_rowC MB_2" v-for="(asset,idx) in item.imgs" @click="checkImg(item,idx)" :key="idx">
						<image class="WH_28vw B_radius_5" :src="asset" mode="aspectFit"></image>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getGoodsSystemCom
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				dataList: [],
				gId: '',
				page: 1
			}
		},
		onLoad() {
			this.gId = this.$parseURL().gId;
			this.getGoodsComments();
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
					};
				} else {
					param = {
						'page': 1,
						'goods_id': that.gId,
					};
				}
				api._get(getGoodsSystemCom, param).then((res) => {
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

		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
