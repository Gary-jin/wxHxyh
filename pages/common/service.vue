<template>
	<view class="">
		<headerTop title="客服" showBack="true"></headerTop>
		<button class="PTB_2 PLR_3 flex_row_between BB_5_f2f2f2" open-type="contact" :session-from="serviceOnline" hover-class="none">
			<view class="flex_rowL">
				<image class="WH_14vw B_radius_max MR_3" :src="user.service_avatar"
				 mode=""></image>
				<view class="">
					<view>在线客服</view>
					<view class="fontS_12 color_999 PT_1">点击咨询在线客服</view>
				</view>
			</view>
			<view class="iconfont">
				&#xe600;
			</view>
		</button>
			
		
		<view class="">
			<view class="P_2 BB_1_f2f2f2">
				热门问题
			</view>
			<view class="PLR_3 PTB_2 BB_1_f2f2f2 flex_row_between" v-for="(item,index) in dataList" @click="$openPage({name:'articleInfo',query:{id:item.id}})"
			 :key="index">
				<view class="">
					·{{item.title}}
				</view>
				<view class="iconfont">
					&#xe600;
				</view>
			</view>
		</view>
	
	
	
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getService,
		serviceArticleList,
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				dataList:[],
				serviceOnline:{},
				is_service:false,
				user:{}
			}
		},
		onLoad() {
			if(this.$parseURL.is_service == 0){
				this.is_service = true;
			}
		},
		created() {
			this.getServiceInfo();
			this.getArticlelist();
		},
		methods: {
			getServiceInfo(){
				api._post(getService,{}).then((res)=>{
					if(res.code == 0){
						let obj = {};
						obj.mnid = res.data.info.ml_service_account;
						obj.wxname = res.data.info.nickname;
						obj.headImgUrl = res.data.info.ml_avatar;
						obj.service_avatar = res.data.service_avatar;
						// console.error(res.data.info.nickname + res.data.info.ml_service_account)
						obj.productName = ''
						this.serviceOnline = JSON.stringify(obj);
						this.user = res.data.info;
					}
				})
			},
			getArticlelist(){
				let that = this;
				let param = {
					'type':'1'
				}
				api._post(serviceArticleList,param).then((res)=>{
					if(res.code == 0){
						that.dataList = res.data.list;
						// console.log(that.dataList)
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
	button::after {
		border: none;
	}
</style>
