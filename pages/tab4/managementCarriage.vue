<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2 H_100vh">
		<headerTop title="运费设置" showBack="true"></headerTop>
		<view class="flex_rowL P_3 bg_fff MT_2" @click="check(item,index)" v-for="(item,index) in dataList" :key="index">
			<view class="iconfont" :class="{'color_ED2251' : checkIdx === index}">{{checkIdx === index ? '&#xe7e9;' : '&#xe609;'}}</view>
			<view class="PL_3">{{item.str}}</view>
		</view>

		<view class="MT_10 flex_rowC">
			<view class="W_50 textC PTB_2 bg_ED2251 color_fff B_radius_max" @click="checkId()">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';

	import api from '../../static/script/ajax.js';
	import {
		managerPostlist
	} from '../../static/script/const.js';
	export default {
		data() {
			return {
				dataList: [],
				id: '',
				str:'',
				checkIdx: -1
			}
		},
		onLoad() {
			this.id = this.$parseURL().pid;
			this.getPost();
		},
		methods: {
			getPost() {
				let that = this;
				api._post(managerPostlist, {}).then((res) => {
					if (res.code == 0) {
						that.dataList = res.data.info;
						that.dataList.forEach((item,idx)=>{
							if(item.id == that.id){
								console.log(idx);
								that.checkIdx = idx;
							}
						})
					}
				})
			},
			check(item, index) {
				this.checkIdx = index;
				this.id = item.id;
				this.str = item.str;
			},
			checkId() {
				uni.$emit('checkPost',{pId:this.id,pStr:this.str});
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
