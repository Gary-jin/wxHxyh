<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="收益明细" showBack="true"></headerTop>
		<view class="PLR_2" v-if="dataList&&dataList.length > 0">
			<view class="flex_row_between PTB_2 BB_1_f2f2f2" v-for="(item,index) in dataList" :key="index">
				<view>
					<view>{{item.remark}}</view>
					<view class="fontS_12 color_999 PTB_1">订单号：{{item.order_no}}</view>
					<view class="fontS_12 color_999">{{item.create_time}}</view>
				</view>
				<view class="color_FF0000 fontS_18 font_weight_bold">{{item.money}}</view>
			</view>
		</view>
		<view class="H_100vh W_100 flex_colC" v-else>
			<view class="">
				暂无收益明细
			</view>
		</view>
	</view>
</template>

<script>
    import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {earningsList} from '../../static/script/const.js';
    export default {
        data() {
            return {
				page:1,
				dataList:[]
            }
        },
		onLoad() {
			this.getEarningsList();
		},
		onReachBottom() {
			this.getEarningsList('more')
		},
        methods: {
			getEarningsList(type){
				let that = this;
				if(type === 'more') {
					that.page++;
				} else {
					that.page = 1;
				}
				api._post(earningsList,{'page':that.page}).then((res)=>{
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
