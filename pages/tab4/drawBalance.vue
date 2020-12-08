<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="余额提现" showBack="true"></headerTop>
		<view class="PLR_3">
			<view class="flex_rowL MT_2">
				<view class="fontS_18 MR_2">提现方式</view>
				<view class="flex_rowL PTB_1 PR_2 " :class="type === 'wechat' ? 'B_2_ff5126 B_radius_5' : ''" @click="checkPay('wechat')">
					<image class="WH_8vw B_radius_max MLR_2" src="http://qnyimages.hexieyihao.vip/drawbalance.png" mode=""></image>
					<view class="fontS_16 color_FF0000">微信</view>
				</view>
				<view class="flex_rowL PTB_1 PR_2" :class="type === 'ali' ? 'B_2_ff5126 B_radius_5' : ''" @click="checkPay('ali')">
					<image class="WH_8vw B_radius_max MLR_2" src="../../static/image/alipay.png" mode=""></image>
					<view class="fontS_16 color_0295FD">支付宝</view>
				</view>
			</view>
			<view class="fontS_18 PTB_2">
				提现金额
			</view>
			<view class="flex_row_between">
				<input type="number" v-model="price" class="flex_grow_1 PTB_1 PL_2 B_1_f2f2f2" placeholder="请输入提现金额">
				<view class="ML_2" v-if="scale != ''">
					手续费:{{scale}}%;
				</view>
			</view>
			<view class="">
				<view class="PTB_3">
					注意事项
				</view>
				<view class="fontS_13 color_999">1.提现将在周一至周五工作日24小时内审批到账，周末不审批，请耐心等待</view>
				<view class="fontS_13 flex_rowL color_999">2.提现不到账？请查看<view class="color_FF0000" @click="$openPage({name:'articleInfo',query:{type:1}})">提现说明</view></view>
			</view>
			<view class="flex_rowC MT_10" v-if="type === 'ali' && dataList.has_bind_ali === 0">
				<view class="PTB_2 textC W_70 B_radius_max bg_ED2251 color_fff" @click="$openPage({'name':'bindAliPay'})">
					去绑定支付宝
				</view>
			</view>
			<view class="flex_rowC MT_10" v-else>
				<view class="PTB_2 textC W_70 B_radius_max color_fff" @click="submitDraw" :class="!price ? 'bg_4d4d4d':'bg_ED2251'">
					立即提现
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {withDraw,userInfo} from '../../static/script/const.js';
	export default {
		data() {
			return {
				price:'',
				scale:'',
				type:'ali',
				dataList:{}
			}
		},
		onLoad() {
			this.scale = this.$parseURL().scale;
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				let that = this;
				api._post(userInfo).then((res) => {
					if (res.code == 0) {
						that.dataList = res.data.info;
						// if(that.type === 'ali' && that.dataList.has_bind_ali === 0) {
						// 	this.$openPage({'name':'bindAliPay'});
						// }
					}
				})
			},
			submitDraw(){
				let that = this;
				if(!that.price){
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none',
						duration: 2000
					});
					return
				}
				let param = {
					'price':that.price,
					'type':that.type
				}
				api._post(withDraw,param).then((res)=>{
					console.log(res);
					if(res.code == 0){
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						that.price = '';
					} else if(res.code == 1){
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						// setTimeout(()=>{
						// 	this.$openPage({'name':'bindAliPay'});
						// },200)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			checkPay(type){
				if(type === 'wechat') {
					uni.showToast({
						title: '暂时不能使用微信提现',
						icon: 'none',
						duration: 2000
					});
				} else {
					this.type = type;
				}
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
