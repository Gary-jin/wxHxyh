<template>
	<view class="flex_colT flex_items_stretch bg_fff">
		<headerTop title="积分记录" showBack="true"></headerTop>
		
		<view>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" >
				<view v-for="(item,index) in dataList" :key="index">
					<view class="flex_colC W_100">
						<view class="W_90 BB_1_f2f2f2">
							<view class="flex_row_between PT_3 PB_2">
								<view>{{item.remark}}</view>
								<view v-if="Number(item.score)>0" class="color_red PR_3 font_weight_bold">{{item.score}}</view>
								<view v-else class="font_weight_bold PR_3" style="color:#0CBD00">{{item.score}}</view>
							</view>
							<view class="fontS_12 color_999 PB_4">{{item.create_time}}</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		

	</view>
</template>

<script>
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js";
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getScoreList
	} from '../../static/script/const.js';
	export default {
		mixins: [MescrollMixin], 
		components: {
			headerTop
		},
		data() {
			return {
					mescroll: null, 
					downOption: { },
					upOption: {
						page: {
							size: 10 
						},
						noMoreSize: 5,
						empty: {
							tip: '暂无相关数据'
						}
					},
					// 列表数据
					dataList: []
			}
		},
		created() {
		},
		onReachBottom() {
		},
		methods: {
      downCallback(){
				this.mescroll.resetUpScroll(); 
			},
			upCallback(page) {
				let param ={
					page : page.num
				}
				api._post(getScoreList,param).then((res) => {
					if(res.code == 0) {
						 	let arr = res.data.list === '' ? [] : res.data.list
							if (page.num === 1) this.dataList = []
							this.dataList = this.dataList.concat(arr)
							this.$nextTick(() => {
									this.mescroll.endSuccess(res.data.list.length, true)
							})
					}
				})
			}
		},
	}
</script>

<style>


</style>
