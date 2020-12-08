<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<headerTop title="积分商城" showBack="true" :containerStyle="containerStyle"></headerTop>
		<view class="fixed W_100 flex_col_between z_index_1000" id="test" style="top: 0;" :style="{'margin-top':getStausBarMT + 'px'}">

			<view class="W_100 bg_ff5126" style="margin: 0;box-sizing: border-box;height:40px">
				<view class="relative flex_row_around PLR_2">
					<view @click="search()" class="absolute iconfont fontS_20" style="left: 12%;">&#xe60f;</view>
					<input type="text" v-model="txTval" style="height:30px;bargin-bottom:10px" class="bg_fff W_75 B_radius_max PL_8" placeholder="关键词搜索"  />
				</view>
			</view>
		</view>

		<view :style="{'margin-top':getStausBarMT + 40 + 'px'}">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" >
        <view class="PLR_2  MT_1">
          <view class="flex_row_between" style="flex-flow: wrap;">
            <view class="MTB_1 B_radius_5 bg_fff" v-for="(item,index) in dataList" :key="index" @click="$openPage({name:'integralDetail',query:{good_id: item.goods_id}})" style="width:48%;overflow: hidden;">
              <view  style="height: 44vw;">
                <image  :src="item.img" class="WH_100"></image>
              </view>
              <view class="flex_rowL ">
                <view class="ML_1 PLR_1 B_1_DA3B57 B_radius_5 color_DA3B57">礼品</view>
                <view class="W_70 PL_1 PTB_2 font_weight_bold text_overflow_1">{{item.goods_name}}</view>
              </view>
              <view class="color_fff flex_row_between MB_3">
                <view class=" ML_1 PLR_1 B_radius_5 fontS_12 bg_DA3B57">{{item.spe_price}}积分可兑换</view>
								<view class="color_999 MR_1 fontS_10">已兑换:{{item.sales}}</view>
              </view>
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
		scoreGoodsList
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
          dataList: [],
					containerStyle: 'position: fixed;z-index:9999;width:100%',
					txTval: ''
			}
		},
		created() {
		},
		onReachBottom() {
    },
    computed: {
			getStausBarMT() {
				try {
					const res = uni.getSystemInfoSync();
					console.log((Number(res.statusBarHeight) + 44) + 'px')
					return (Number(res.statusBarHeight) + 44);
				} catch (e) {}
			}
		},
		methods: {
			search(){
				this.mescroll.triggerDownScroll()
				this.mescroll.scrollTo( 0, 300 )
			},
      downCallback(){
				this.mescroll.resetUpScroll(); 
			},
			upCallback(page) {
				let param ={
					page : page.num,
					goods_id: '4246',
					keywords: this.txTval
				}
				api._post(scoreGoodsList,param,0).then((res) => {
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
