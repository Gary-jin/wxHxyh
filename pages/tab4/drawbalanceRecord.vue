<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="提现记录" showBack="true"></headerTop>
		<view class="PLR_2 flex_grow_1 overflow_y" v-if="dataList && dataList.length > 0">
			<view class="PTB_2 BB_1_f2f2f2 flex_row_between" v-for="(item,index) in dataList" :key="index">
				<view>
					<view>{{item.withdrawType}}</view>
					<view class="fontS_12 PT_1 color_999" v-if="item.cost != ''">
						手续费：{{item.cost}}
					</view>
					<view class="fontS_12 PT_1 color_999" v-if="item.reason != ''">
						驳回原因：{{item.reason}}
					</view>
					<view class="fontS_12 PT_1 color_999">{{item.create_time}}</view>
				</view>
				<view>
					<view class="fontS_18 font_weight_bold color_FF0000">{{item.money}}元</view>
					<view class="fontS_12 PT_1">{{item.status_text}}</view>
				</view>
			</view>
		</view>
		<view class="H_100vh W_100 flex_colC" v-else>
			<view class="">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		withDrawlist
	} from '../../static/script/const.js'
	export default {
		data() {
			return {
				dataList:[]
				// dataList:[{
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// },
				// {
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// },
				// {
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// },
				// {
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// },
				// {
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// },
				// {
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// },
				// {
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// },
				// {
				// 	withdrawType:'123123',
				// 	cost:'123123',
				// 	reason:'123123',
				// 	create_time:'123123123',
				// 	money:'1231223',
				// 	status_text:'123123'
				// }]
			}
		},
		onLoad() {
			this.getwithDrawlist();
		},
		methods: {
			getwithDrawlist(){
				let that = this;
				api._post(withDrawlist,{}).then((res)=>{
					if(res.code == 0){
						that.dataList = res.data.list;
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
