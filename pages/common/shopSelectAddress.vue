<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="【和鞋一号】严选商城"></headerTop>
		<view class="PLR_3 flex_row_between color_fff PTB_2 bg_ff5126">
			<view class="iconfont" @click="goBack">&#xe724;</view>
			<view class="fontS_16">我的收货地址</view>
			<view @click="$openPage({name:'shopReceiveAddress'})">添加地址</view>
		</view>
		<view class="">
			<view class="P_3 flex_rowL relative BB_1_f2f2f2" v-for="(item,index) in dataList" :key="index">
				<van-radio-group :value="checkIdx" @change="onChange">
				  <van-radio :name="index" checked-color="#b8b8b8"></van-radio>
				</van-radio-group>
				<view class="PL_3 flex_grow_1">
					<view class="flex_rowL">
						<view class="font_weight_bold fontS_16">{{item.username}}</view>
						<view class="PLR_1">{{item.mobile}}</view>
						<view class="color_ED2251 font_weight_bold" v-show="item.is_default === 1">【默认地址】</view>
					</view>
					<view class="text_overflow_2 PT_2 W_85">
						{{item.address}}
					</view>
				</view>
				<view class="iconfont absolute fontS_20" style="right: 5%;top: 15%;" @click="$openPage({name:'shopReceiveAddress',query:{data:item}})">
					&#xe6c5;
				</view>
				<view class="iconfont absolute fontS_20" style="right: 5%;top: 55%;" @click="delAddress(item.id)">
					&#xe628;
				</view>
			</view>
		</view>
		<view class="fixed W_100 bg_ED2251 color_fff textC PTB_2" style="bottom: 0;" @click="checkAddress()">
			确定
		</view>
	</view>
</template>

<script>
    import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {getAddressList,delAddress} from '../../static/script/const.js';
    export default {
        data() {
            return {
				dataList:[],
				checkIdx:0,
				order_id:'',
				type:''
            }
        },
		onLoad() {
			this.aId = this.$parseURL().aid;
			// console.log(this.aId)
			if(this.$parseURL().type){
				this.type = this.$parseURL().type;
			}
		},
		onShow() {
			this.getAddress();
		},
        methods: {
			getAddress(){
				let that = this;
				api._post(getAddressList,{}).then((res)=>{
					if(res.code == 0){
						that.dataList = res.data;
						that.dataList.forEach((item,index)=>{
							if(item.id == that.aId){
								that.checkIdx = index;
							}
						})
					}
				})
			},
			delAddress(id){
				let param = {
					'id':id
				}
				api._post(delAddress,param).then((res)=>{
					if(res.code == 0){
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						});
						this.getAddress();
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						});
					}
				})
			},
			onChange(e){
				// console.log(e.detail);
				this.checkIdx = e.detail;
				// console.log(this.dataList[this.checkIdx].id);
			},
			goBack(){
				let aid;
				this.dataList.forEach((item)=>{
					if(item.is_default == 1){
						aid = item;
					} else {
						// console.log(111);
						aid = this.dataList[0]
					}
				})
				uni.$emit('checkSite', {
					site: aid
				});
				uni.navigateBack({
					 delta: 1
				})
			},
			checkAddress(){
				let that = this;
				if(that.type == 'orderInfo'){
					uni.$emit('update_order', {
						site: that.dataList[this.checkIdx]
					});
				} else {
					uni.$emit('checkSite', {
						site: that.dataList[this.checkIdx]
					});
				}

				uni.navigateBack({
					 delta: 1
				});
			}
        },
        components: {
            headerTop,
        }
    }
</script>

<style>


</style>
