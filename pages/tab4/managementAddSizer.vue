<template>
	<view class="flex_colT flex_items_stretch bg_fff">
		<headerTop title="筛选" showBack="true" ></headerTop>

    <view class="PLR_2 MB_20">
      <view v-for="(item,index) in SizerList" :key="index">
        <view class="PTB_2 fontS_17 font_weight_bold">{{item.trait_cate_name}}</view>
        <view class="D_flex " style="flex-wrap: wrap;"  >
         <view class="D_flex MTB_1" style="flex-wrap: wrap;" v-for="(items,ind) in item.child_list" :key="ind" @click="check(index,ind,items.show)">
					 	<view class="iconfont color_DA3B57">{{items.show == 'true'?'&#xe7e9;':'&#xe609;'}}</view>
						<view class="PL_2 PR_2">{{items.trait_name}}</view>
				 </view>
        </view>
      </view>
    </view>

		<view @click="confirm()" class="fixedBL PTB_2 W_100 bg_ED2251 color_fff textC">完成</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getTraitListApi
	} from '../../static/script/const.js';
	export default {
		components: {
			headerTop
		},
		data() {
			return {
				checked: true,
				SizerList: [],
				trait_ids:[]
			}
		},
		onLoad() {
			let that = this;
			let xx = that.$parseURL().trait_ids;
			let arr =	xx.split(',');
			that.trait_ids = arr
			console.log(that.trait_ids)
			
		},
		created() {
			this.getInit()
		},
		methods: {
      check(num1,num2,show){
				if(show == 'false'){
					this.$set(this.SizerList[num1]['child_list'][num2],'show','true')
				} else{
					this.$set(this.SizerList[num1]['child_list'][num2],'show','false')
				}
			},
			getInit(){
				let that =this;
				api._get(getTraitListApi, {},0).then((res) => {
					if(res.code == 0){
						
						that.SizerList = res.data.list

						this.SizerList.forEach((item,index)=>{
							item['child_list'].forEach((ite,ind)=>{
								this.$set(ite,'show','false')
							})
						})
	
							if(that.trait_ids){
								for(var i=0;i<that.trait_ids.length;i++){
									console.warn(that.trait_ids[i])

									that.SizerList.forEach((item,index)=>{
										item['child_list'].forEach((ite,ind)=>{
													if(that.trait_ids[i] == ite.trait_id){
														that.$set(ite,'show','true')
													}
											})
									})
	
								}
							}

					}
				})
			},
			confirm(){
					let ids = ''
					this.SizerList.forEach((item,index)=>{
						item['child_list'].forEach((ite,ind)=>{
							if(ite.show == 'true'){
								ids = ids + ite.trait_id +','
							}
						})
					})

					let idsId = ids.slice(0,ids.length -1);
					console.log(idsId)

					uni.$emit('addSizer', {
						SizerList: idsId
					})

					uni.showToast({
						title: '保存成功',
						icon: 'none',
						duration: 1000
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					},1000)
			}
		},
	}
</script>

<style>


</style>
