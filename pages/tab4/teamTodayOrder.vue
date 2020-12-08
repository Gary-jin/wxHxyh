<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="最近订单情况" :showBack="true"></headerTop>
		<view class="flex_grow_1 overflow_y">
			<view class="" v-for="(item,index) in teamUlist" :key="index">
				<view class="flex_row_between PTB_2 BB_1_f2f2f2" @click="checkOrder(item.uid)">
					<view class="flex_rowL PL_2 W_50">
						<image class="WH_10vw B_radius_max" :src="item.headImg" mode=""></image>
						<view class="textL flex_grow_1 ML_1">
							<view class="flex_rowL text_overflow_1 PB_1 PL_1">
								{{item.nickname}}
							</view>
							<view class="flex_rowL fontS_12">
								<view class="color_ED2251">{{item.level_str}}</view>
								<view class="color_999">{{item.mobile}}</view>
							</view>
						</view>
					</view>
					<view class="W_30 fontS_10 textC color_999">
						{{item.time}}
					</view>
					<view class="W_20 flex_rowC BL_1_f2f2f2">
						<view class="flex_colC">
							<view class="color_999 fontS_12">最近订单数</view>
							<view class="color_ED2251 fontS_16 font_weight_bold">{{item.today_order_num	}}</view>
						</view>

					</view>
				</view>
				<view class="PLR_1" v-show="orderShow">
					<view class="bg_f7f7f7 P_2" v-for="(asset,index) in teamOrderlist" :key="index">
						<view class="fontS_12 <color_999></color_999>">
							订单号：{{asset.order_no}}
						</view>
						<view class="PTB_2" v-for="(i,index) in asset.goods_list" :key="index">
							<view class="flex_row_between PT_2">
								<view class="text_overflow_1 W_80">{{i.goods_name}}</view>
								<view>x{{i.total_goods_nums}}</view>
							</view>
							<view class="flex_row_between PT_2">
								<view class="P_1 B_1_999 W_70 flex_rows_start">
									<view class="fontS_12" v-for="(j,index) in i.attr_list" :key="index">
										{{j}}
									</view>
								</view>
								<view class="color_ED2251">
									<view>￥{{asset.order_price}}</view>
									<view class="PT_2">佣金：{{asset.yongjin}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
	// teamOrderList,
	todayOrderList
	} from '../../static/script/const.js';
    export default {
        data() {
            return {
				orderShow: false,
				teamData:{},
				teamUlist:[],
				teamOrderlist:[],
				page:1,
				mobile:'',
				show:false,
				searhType:-1
            }
        },
      created() {
      	this.getUserList();
      },
      onReachBottom() {
      	this.getUserList('more');
      },
      methods: {
      	getUserList(type){
      		let that = this;
      		let param;
      		if(type === 'more') {
      			param = {
      				'page':++that.page,
      				'mobile':that.mobile
      			}
      		} else {
      			param = {
      				'page':1,
      				'mobile':that.mobile
      			}
      		}
      
      		api._post(todayOrderList,param).then((res)=>{
      			if(res.code == 0){
      				if (type == 'more') {
      					if (res.data.list.length > 0) {
      						that.teamUlist = that.teamUlist.concat(res.data.list);
      					} else {
							uni.showToast({
								title: '没有更多数据了！',
								icon: 'none',
								duration: 1000
							})
						}
      				} else {
      					that.teamUlist = res.data.list;
      				}
      				if(this.searhType == 0){
      					if(that.teamUlist.length < 1){
      						that.show = true;
      					} else {
      						that.show = false;
      					}
      				}
      				this.searhType = -1;
      			}
      		})
      	},
      	getOrderList(id){
      		let that = this;
      		let param = {
      			'uid':id
      		}
      		api._post(myTeamOlist,param).then((res)=>{
      			if(res.code == 0){
      				that.teamOrderlist = res.data.list;
      			}
      		})
      	},
      	checkOrder(id) {
      		this.$openPage({name:'order',query:{uid:id,idx:5}})
      	},
      	searchList(){
      		this.searhType = 0;
      		this.getUserList();
      	}
      },
      components: {
      	headerTop,
      }
    }
</script>

<style>


</style>
