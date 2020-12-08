<template>
	<view class="flex_colT flex_items_stretch" >
		<headerTop title="绑定支付宝" :showBack="true"></headerTop>
		<view class="flex_grow_1 PLR_6 PT_4" v-show="!isBind">
			<view class="PTB_3 BB_1_f2f2f2 flex_rowL">
				<view class="W_30">姓名</view>
				<input type="text" v-model="name" class="flex_grow_1" placeholder="请输入真实姓名">
			</view>
			<view class="PTB_3 BB_1_f2f2f2 flex_rowL">
				<view class="W_30">支付宝账号</view>
				<input type="text" v-model="acccount" class="flex_grow_1" placeholder="支付宝账号">
			</view>
			<view class="PTB_3 BB_1_f2f2f2 flex_rowL">
				<view class="W_30">手机号码</view>
				<input type="number" v-model="mobile" class="flex_grow_1" placeholder="请输入手机号">
			</view>
			<view class="PTB_3 BB_1_f2f2f2 flex_rowL relative">
				<view class="W_30">短信验证</view>
				<input type="number" v-model="code" class="flex_grow_1" placeholder="输入短信验证码">
				<view class="absolute PTB_1 PLR_2 textC B_1_bbb B_radius_5 z_index_100" style="right: 5%;" @click="getCode" v-if="downCount < 1">
					获取验证码
				</view>
				<view class="absolute PTB_1 PLR_2 textC B_1_bbb B_radius_5" style="right: 5%;" v-else>
					重新获取{{downCount}}
				</view>
			</view>
			<view class="MT_20 flex_rowC">
				<view class="PTB_2 W_85 textC bg_FF0000 color_fff B_radius_5" @click="bindAlipay">
					确认绑定
				</view>
			</view>
		</view>
		<view class="flex_grow_1 PLR_6 PT_4" v-show="isBind">
			<view class="PTB_3 BB_1_f2f2f2 flex_rowL">
				<view class="W_30">姓名</view>
				<input type="text" v-model="bind_name" class="flex_grow_1" disabled>
			</view>
			<view class="PTB_3 BB_1_f2f2f2 flex_rowL">
				<view class="W_30">支付宝账号</view>
				<input type="text" v-model="bind_acccount" class="flex_grow_1" disabled>
			</view>
			<view class="MT_20 flex_rowC">
				<view class="PTB_2 W_85 textC bg_FF0000 color_fff B_radius_5" @click="checkShow">
					去修改
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getMobilecode,
		modifyPayAccount
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				mobile:'',
				downCount:0,
				code:'',
				name:'',
				acccount:'',
				sms_code:'',
				ali_no:'',
				isBind:false,
				bind_name:'',
				bind_acccount:''
			}
		},
		onLoad() {
			if(this.$parseURL().data.has_bind_ali) {
				this.isBind = true;
				this.bind_name = this.$parseURL().data.ali_name;
				this.bind_acccount = this.$parseURL().data.ali_no;
			}
		},
		methods: {
			getCode() {
				if(!this.mobile) {
					uni.showToast({
						icon:'none',
						title:'手机号不能为空',
						duration:2000
					});
					return
				}
				if(this.downCount === 0) {
					api._post(getMobilecode,{'mobile':this.mobile}).then((res) => {
						if (res.code == 0) {
							this.downCount = 60;
							let tempFn = setInterval(() => {
								if (this.downCount > 0) {
									this.downCount--;
								} else {
									clearInterval(tempFn);
								}
							}, 1000);
							uni.showToast({
								icon:'none',
								title:'短信验证码发送成功',
								duration:2000
							});
						}
					})
				}
			},
			bindAlipay(){
				let param = {
					'type':'ali',
					'name':this.name,
					'mobile':this.mobile,
					'ali_no':this.acccount,
					'sms_code':this.code,
				}
				if(!this.name) {
					uni.showToast({
						icon:'none',
						title:'真实姓名不能为空',
						duration:2000
					});
					return
				}
				if(!this.mobile) {
					uni.showToast({
						icon:'none',
						title:'手机号不能为空',
						duration:2000
					});
					return
				}
				if(!this.acccount) {
					uni.showToast({
						icon:'none',
						title:'支付宝账号不能为空',
						duration:2000
					});
					return
				}
				if(!this.code) {
					uni.showToast({
						icon:'none',
						title:'短信验证码不能为空',
						duration:2000
					});
					return
				}
				api._post(modifyPayAccount,param).then((res) => {
					if(res.code == 0) {
						uni.showToast({
							icon:'none',
							title:res.msg,
							duration:2000
						});
						uni.$emit('bindAlipay');
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						},200)
					} else {
						uni.showToast({
							icon:'none',
							title:res.msg,
							duration:2000
						});
					}
				})
			},
			checkShow(){
				this.isBind = false;
				console.log(this.isBind)
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
