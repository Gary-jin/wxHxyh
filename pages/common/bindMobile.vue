<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="绑定手机号" :showBack="false"></headerTop>

		<view class="flex_rowL MT_5 P_3 BB_1_f2f2f2">
			<view class="PR_3">
				手机号：
			</view>
			<input type="number" v-model="mobile" class="PTB_1 flex_grow_1" placeholder="请输入手机号" value="" />
		</view>
		<view class="flex_rowL P_3 BB_1_f2f2f2 relative">
			<view class="PR_3">
				验证码：
			</view>
			<input type="number" v-model="code" class="PTB_1 flex_grow_1" placeholder="请输入短信验证码" value="" />
			<view class="PTB_1 PLR_2 textC bg_ED2251 color_fff B_radius_5 absolute z_index_100" style="right: 5%;" v-show="btnShow" @click="getCode()">
				获取验证码
			</view>
			<view class="PTB_1 PLR_2 textC bg_ED2251 color_fff B_radius_5 absolute" style="right: 5%;" v-show="!btnShow">
				重新获取({{downCount}})
			</view>
		</view>


		<view class="flex_rowC MT_10">
			<view class="W_80 PTB_2 textC bg_ED2251 B_radius_max color_fff" @click="bindMobile">
				绑定
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getMobilecode,
		bindMobile 
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				downCount: 0,
				btnShow: true,
				mobile: '',
				code:''
			}
		},
		methods: {
			bindMobile(){
				let that = this;
				let param = {
					'mobile':that.mobile,
					'code':that.code
				};
				api._get(bindMobile,param).then((res)=>{
					if(res.code == 0){
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1000
						})
						setTimeout(()=>{
							uni.navigateBack({
							    delta: 1
							});
						},1500)
					}
				})
			},
			// 获取验证码
			getCode() {
				let that = this;
				console.log(that.downCount)
				if (that.downCount === 0) {
					api._get(getMobilecode, {
						'mobile': that.mobile
					}).then((res) => {
						if(res.code == 0){
							that.downCount = 60;
							let tempFn = setInterval(() => {
								if (that.downCount > 0) {
									that.btnShow = false;
									that.downCount--;
								} else {
									clearInterval(tempFn);
									that.btnShow = true;
								}
							}, 1000);
						}
					})
				}
			},
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
