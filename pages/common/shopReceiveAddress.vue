<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="【和鞋一号】严选商城"></headerTop>
		<view class="PLR_3 flex_row_between color_fff PTB_2 bg_ff5126">
			<view class="iconfont" @click="goBack">&#xe724;</view>
			<view class="fontS_16">{{param.id == '' ? '添加收货地址' : '编辑收货地址'}}</view>
			<view @click="subAddress()">保存</view>
		</view>
		<view class="PLR_3 BB_1_f2f2f2  flex_rowL">
			<view class="PR_2 W_20 textL">
				收货人:
			</view>
			<input type="text" class="PTB_3 flex_grow_1 textL" v-model="param.username" placeholder="请输入收货人姓名">
		</view>
		<view class="PLR_3 BB_1_f2f2f2 flex_rowL">
			<view class="PR_2 W_20 textL">
				联系电话:
			</view>
			<input type="number" v-model="param.mobile" class="PTB_3 flex_grow_1 textL" placeholder="请输入联系电话">
		</view>
		<view class="PLR_3 BB_1_f2f2f2 PTB_3 flex_row_between" @click="show=true">
			<view class="flex_rowL flex_grow_1">
				<view class="PR_2 W_20 textL">
					所在地区:
				</view>
				<view class="flex_grow_1">
					{{param.code != '' ? param.province + '-' + param.city + '-' + param.country : '请选择' }}
				</view>
			</view>
			<view class="iconfont">
				&#xe600;
			</view>
		</view>
		<view class="PLR_3 BB_1_f2f2f2 flex_rowL">
			<view class="PR_2 W_20 textL">
				详细地址:
			</view>
			<input type="text" v-model="param.detail" class="PTB_3 flex_grow_1 textL" placeholder="请输入详细地址">
		</view>
		<view class="PLR_3 BB_1_f2f2f2 PTB_3 flex_row_between">
			<view class="PR_2 textL">
				设置为默认地址:
			</view>
			<view class="iconfont color_FFC41C" v-if="param.is_default == 0" @click="checkDefault(1)">
				&#xe609;
			</view>
			<view class="iconfont color_FFC41C" v-else @click="checkDefault(0)">
				&#xe7e9;
			</view>
		</view>
		<view class="fixed W_100" style="bottom: 0;">
			<van-area v-if="show" :value="code" :area-list="areaList" @confirm="onAddrConfirm" @cancel="disappear" :columns-num="3" />
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import areaList from '../../static/script/area.js';
	import api from '../../static/script/ajax.js';
	import {
		additionAddress,
		editAddress,
		addressDetail
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				show: false,
				areaList: {},
				param: {
					province: '',
					city: '',
					country: '',
					username: '',
					mobile: '',
					detail: '',
					is_default: 0,
					code: '',
					id:''
				}
			}
		},
		onLoad() {
			if (this.$parseURL().data) {
				let address = this.$parseURL().data;
				// console.log(address);
				this.param.id = address.id;

				this.getAddress(address.id);
			}
		},
		created() {
			this.areaList = areaList;
		},
		methods: {
			subAddress() {
				let that = this;
				let param;
				let url;
				if (that.param.id == '') {
					url = additionAddress;
				} else {
					url = editAddress;
				}
				// console.log(that.param)
				api._post(url, that.param).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon:'none',
							duration: 2000
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 500)
					} else {
						uni.showToast({
							title: res.msg,
							icon:'none',
							duration: 2000
						});
						// console.log('shibai')
					}
				})
			},
			getAddress(id) {
				api._post(addressDetail, {
					'id': id
				}).then((res) => {
					if (res.code == 0) {
						this.address = res.data;
						this.param.province = res.data.province;
						this.param.city = res.data.city;
						this.param.country = res.data.country;
						this.param.username = res.data.username;
						this.param.mobile = res.data.mobile;
						this.param.detail = res.data.detail;
						this.param.is_default = res.data.is_default;
						this.param.code = res.data.code;
						this.param.id = res.data.id;
					}
				})
			},
			// 地区选择
			onAddrConfirm: function(e) {
				// 点击确认，获取所选的省市区数据
				// 确定选择,返回的必定是三元素数组

				let that = this;
				that.param.province = e.target.values[0].name;
				that.param.city = e.target.values[1].name;
				that.param.country = e.target.values[2].name;
				that.param.code = e.target.values[2].code;

				this.show = false;
			},
			disappear: function() {
				this.show = false;
			},
			checkDefault(idx) {
				this.param.is_default = idx;
			},
			goBack() {
				uni.navigateBack({
					delta: 1
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
