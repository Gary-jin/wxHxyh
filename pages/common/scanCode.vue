<template>
	<view class="flex_colT flex_items_stretch H_100vh">
		<headerTop title="申请表单" :showBack="false" :showClose="true"></headerTop>

		<view class="flex_colC PT_5 PLR_10" v-if="status === -1">
			<input type="text" placeholder="从事行业" v-model="work" class="W_100 PTB_1 PL_2 B_radius_5 B_1_999 flex_grow_1">
			<input type="text" placeholder="详细地址" v-model="address" class="W_100 PTB_1 PL_2 B_radius_5 B_1_999 MT_3 flex_grow_1">
			<view class="PTB_2 W_100 textC bg_ED2251 B_radius_5 color_fff MT_5 flex_grow_1" @click="submit">
				提交
			</view>
		</view>
		<view class="fixed WH_100 flex_colC" style="top: 0;" v-if="status === 0">
			<view class="W_100 flex_colC">
				<!-- <image src="http://qnyimages.hexieyihao.vip/scanCode_img1.png" class="WH_20vw B_radius_max MB_5" mode=""></image> -->
				<view class="textC">
					{{msg}}
				</view>
			</view>
		</view>
		<view class="fixed WH_100 flex_colC" style="top: 0;" v-if="status === 1">
			<view class="W_100 flex_colC">
				<!-- <image src="http://qnyimages.hexieyihao.vip/scanCode_img2.png" class="WH_20vw B_radius_max MB_5" mode=""></image> -->
				<view class="textC">
					{{msg}}
				</view>
				<view class="textC PT_1" v-if="reason">
					驳回原因：{{reason}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {managerApply} from '../../static/script/const.js';
    export default {
        data() {
            return {
				pid:'',
				work:'',
				address:'',
				status:-1,
				msg:'',
				reason:''
            }
        },
		onLoad() {
			this.pid = this.$parseURL().pid;
		},
        methods: {
			submit(){
				if(this.work == ''){
					uni.showToast({
						title:'从事行业不能为空',
						icon:'none',
						duration:1500
					});
					return
				}
				if(this.address == ''){
					uni.showToast({
						title:'详细地址不能为空',
						icon:'none',
						duration:1500
					});
					return
				}
				let param = {
					'pid':this.pid,
					'work':this.work,
					'address':this.address,
				}
				api._post(managerApply,param).then((res)=>{
					if(res.code == 0){
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						});
						this.status = res.code;
						this.msg = res.msg;
						if(res.data.reason) {
							this.reason = res.data.reason;
						}
					} else {
						this.status = res.code;
						this.msg = res.msg;
						if(res.data.reason) {
							this.reason = res.data.reason;
						}
					}
				})
			},
        },
        components: {
            headerTop,
        }
    }
</script>

<style>


</style>
