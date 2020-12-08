<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<headerTop title="我的团队" showBack="true"></headerTop>
		<view class="bg_ff5126 flex_colC">
			<image class="WH_18vw B_radius_max MTB_2" :src="teamData.headImg" mode=""></image>
			<view class="flex_rowC color_fff PTB_2">
				<view class="BR_1_fff PR_3">
					<view>我的累计数量(双)</view>
					<view class="textC PT_2 fontS_16 font_weight_bold">{{teamData.nums}}</view>
				</view>
				<view class="PL_3">
					<view>我的总佣金(￥)</view>
					<view class="textC PT_2 fontS_16 font_weight_bold">{{teamData.total_price}}</view>
				</view>
			</view>
		</view>

		<view class="PLR_2 MTB_2 flex_rowC">
			<view class="bg_fff W_100 B_radius_15">
				<view class="BB_5_f2f2f2 P_2">
					我的推荐人
				</view>
				<view class="PTB_4 textC" v-if="teamData.tjrNickname == '' && teamData.tjrMobile == ''">
					暂无推荐人
				</view>
				<view class="flex_rowL PTB_2" v-else>
					<image class="WH_14vw B_radius_max MLR_2" :src="teamData.tjrHeadImg" mode=""></image>
					<view class="textL">
						<view class="fontS_16 font_weight_bold">{{teamData.tjrNickname}}</view>
						<view class="fontS_12 color_999 PT_1">{{teamData.tjrMobile}}</view>
					</view>
				</view>

			</view>
		</view>


		<view class="bg_fff BT_radius_15">
			<view class="flex_row_between PLR_2 PTB_3">
				<view class="W_70 flex_row_between">
					<view class="flex_colC BR_1_999 flex_grow_1" @click="$openPage({'name':'teamTodayOrder'})">
						<view class="fontS_12 color_999">最近订单情况</view>
						<view class="font_weight_bold color_ED2251">{{teamData.today_order_num}}</view>
					</view>
					<view class="flex_colC flex_grow_1">
						<view class="fontS_12 color_999">团队总累计双数</view>
						<view class="font_weight_bold color_ED2251">{{teamData.total_shoes_num}}</view>
					</view>
				</view>
				<view class="flex_rowR" @click="$openPage({'name':'teamOrder'})">
					<view>团队订单排行</view>
					<view class="iconfont">&#xe600;</view>
				</view>
			</view>
			<view class="flex_row_between PLR_3">
				<view class="MTB_2 flex_rowC flex_grow_1 relative">
					<input class="flex_grow_1 bg_f2f2f2 PTB_1 PL_8 shadow_1 B_radius_5" confirm-type="search" @confirm="getUserList" type="number" v-model="mobile" placeholder="手机号搜索">
					<view class="iconfont color_999 fontS_18 absolute" style="left: 5%;" @click="searchList">&#xe60f;</view>
				</view>
				<view class="color_999 ML_2" @click="searchList">
					搜索
				</view>
			</view>
			<view class="" v-for="(item,index) in teamUlist" :key="index">
				<view class="flex_rowL PTB_2 BB_1_f2f2f2" @click="checkOrder(item.uid)">
					<view class="flex_rowL PR_1 PL_2 W_45">
						<image class="WH_10vw B_radius_max" :src="item.headImg" mode=""></image>
						<view class="textL flex_grow_1 ML_1">
							<view class="flex_rowL text_overflow_1 PB_1" style="max-width:250rpx">
								<view class="color_ED2251">{{item.level_str}}</view>
								<view class="text_overflow_1" style="width:200rpx">{{item.nickname}}</view>
							</view>
							<view class="flex_rowL fontS_12">
								<!-- <view class="color_ED2251">{{item.level_str}}</view> -->
								<view class="color_999">{{item.mobile}}</view>
							</view>
						</view>
					</view>

					<view class="flex_row_around flex_grow_1">
						<view class="flex_colC">
							<view class="color_999 fontS_10">团队累计/双</view>
							<view class="color_ED2251 fontS_16 font_weight_bold">{{item.team_nums}}</view>
						</view>
						<view class="flex_colC">
							<view class="color_999 fontS_10">个人累计/双</view>
							<view class="color_ED2251 fontS_16 font_weight_bold">{{item.nums}}</view>
						</view>
						<view class="flex_colC">
							<view class="color_999 fontS_10">总佣金/￥</view>
							<view class="color_ED2251 fontS_16 font_weight_bold">{{item.total_price}}</view>
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
			<view v-show="show" class="textC PT_10 color_999">
				没有搜索到您要找的用户
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		myTeamInfo,
		myTeamUlist,
		myTeamOlist
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
			this.getUsermsg();
			this.getUserList();
		},
		onReachBottom() {
			
			this.getUserList('more');
		},
		methods: {
			getUsermsg(){
				let that = this;
				api._post(myTeamInfo,{}).then((res)=>{
					if(res.code == 0){
						that.teamData = res.data.info;
					}
				})
			},
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

				api._post(myTeamUlist,param).then((res)=>{
					if(res.code == 0){
						if (type == 'more') {
							if (res.data.list.length > 0) {
								that.teamUlist = that.teamUlist.concat(res.data.list);
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
