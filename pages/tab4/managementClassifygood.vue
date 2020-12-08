<template>
	<view class="flex_colT flex_items_stretch bg_f2f2f2">
		<headerTop title="产品分类" showBack="true"></headerTop>
		<view class="PTB_3 PLR_2">
			<view class="bg_fff PLR_2 PTB_1 MB_2" v-for="(item,index) in dataList" :key="index">
				<view class="flex_row_between">
					<view class="flex_rowL">
						<!-- @click="checkId(item)" -->
						<view class="iconfont fontS_20  " :class="item.is_selected ? 'color_ED2251' : 'color_999'" @click="checkClassify(item)">
							{{item.is_selected ? '&#xe7e9;' : '&#xe609;'}}
						</view>
						<image class="WH_10vw" :src="item.thumbnailImg" mode=""></image>
						<view class="PL_2">
							{{item.cateName}}
						</view>
					</view>
					<view class="W_30 PTB_1 flex_rowR" @click="checkSelected(item,index,2)">
						<view class="iconfont">&#xe600;</view>
					</view>
				</view>
				<view class="PLR_3 bg_fff " v-show="index == idx1" v-for="(asset,idx) in dataLists" :key="idx">
					<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
						<view class="iconfont fontS_20  " :class="asset.is_selected ? 'color_ED2251' : 'color_999'" @click="checkClassify(asset)">
							{{asset.is_selected ? '&#xe7e9;' : '&#xe609;'}}
						</view>
						<view>{{asset.cateName}}</view>
						<view class="W_30 PTB_1 flex_rowR" @click="checkSelected(asset,idx,3)">
							<view class="iconfont">&#xe600;</view>
						</view>
					</view>
					<view class="PLR_3 bg_f2f2f2" v-show="idx == idx2" v-for="(i,x) in list" :key="x">
						<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
							<view class="iconfont fontS_20  " :class="i.is_selected ? 'color_ED2251' : 'color_999'" @click="checkClassify(i)">
								{{i.is_selected ? '&#xe7e9;' : '&#xe609;'}}
							</view>
							<view>{{i.cateName}}</view>
							<view class="W_30 PTB_1 flex_rowR" @click="checkSelected(i,x,4)">
								<view class="iconfont">&#xe600;</view>
							</view>
						</view>
						<view class="PLR_3 bg_f2f2f2" v-show="x == idx3" v-for="(j,k) in list1" :key="k">
							<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
								<view class="iconfont fontS_20  " :class="j.is_selected ? 'color_ED2251' : 'color_999'" @click="checkClassify(j)">
									{{j.is_selected ? '&#xe7e9;' : '&#xe609;'}}
								</view>
								<view>{{j.cateName}}</view>
								<view class="W_30 PTB_1 flex_rowR" @click="checkSelected(j,k,5)">
									<view class="iconfont">&#xe600;</view>
								</view>
							</view>
							<view class="PLR_3 bg_f2f2f2" v-show="k == idx3" v-for="(m,n) in list2" :key="n">
								<view class="BB_1_f2f2f2 PTB_2 flex_row_between">
									<view class="iconfont fontS_20  " :class="m.is_selected ? 'color_ED2251' : 'color_999'" @click="checkClassify(m)">
										{{m.is_selected ? '&#xe7e9;' : '&#xe609;'}}
									</view>
									<view @click="checkId(n)">{{m.cateName}}</view>
									<view class="W_30 PTB_1 flex_rowR" @click="checkSelected(m,n,6)">
										<view class="iconfont">&#xe600;</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="H_8vw">

		</view>
		<view class="fixed W_100 PTB_2 textC fontS_16 bg_ED2251 color_fff z_index_100" style="bottom: 0;" @click="checkId">
			保存
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getGoodsCateList
	} from '../../static/script/const.js';
	import {
		unique
	} from '../../static/script/minix.js'
	export default {
		data() {
			return {
				parentId: '0',
				dataList: [],
				dataLists: [],
				list: [],
				list1: [],
				list2: [],
				idx1: -1,
				idx2: -1,
				idx3: -1,
				idx4: -1,
				idx5: -1,
				idx6: -1,
				cateList: [],
				catelists: [],
				listNum:-1
			}
		},
		onShow() {
			this.classIfy(1);
		},
		onLoad() {
			if(this.$parseURL().cate.length > 0){
				this.catelists = this.$parseURL().cate;
				this.cateList = (this.$parseURL().cate).map(Number);
				this.listNum = this.$parseURL().cate.length
			}
		},
		methods: {
			classIfy(type) {
				let that = this;
				console.log(type);
				if (type == 2) {
					that.dataLists = [];
				} else if (type == 3) {
					that.list = [];
					that.list1 = [];
					that.list2 = [];
				} else if(type == 4) {
					that.list1 = [];
					that.list2 = [];
				} else if(type == 5) {
					that.list2 = [];
				}
				let param = {
					'parentId': that.parentId
				}
				// console.log(type)
				api._post(getGoodsCateList, param).then((res) => {
					if (res.code == 0) {
						if (res.data.list.length < 1) {
							uni.showToast({
								title: '没有下级分类了',
								icon: 'none',
								duration: 2000
							});
						}
						if (type === 1) {
							that.forList(res.data.list, that.cateList, (ret) => {
								that.dataList = ret;
								console.log(that.dataList)
							})
						} else if (type === 2) {
							that.forList(res.data.list, that.cateList, (ret) => {
								that.dataLists = ret;
							})
						} else if (type === 3) {
							that.forList(res.data.list, that.cateList, (ret) => {
								that.list = ret;
							})
						} else if (type === 4) {
							that.forList(res.data.list, that.cateList, (ret) => {
								that.list1 = ret;
							})
						} else if (type === 5) {
							that.forList(res.data.list, that.cateList, (ret) => {
								that.list2 = ret;
							})
						} else if (type === 6) {
							// that.list = res.data.list;
						}
					} else {
						uni.showToast({
							title: '没有下级分类了',
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			forList(list1, list2, callback) {
				let that = this;
				if (list1.length > 0 || list2.length > 0) {
					list1.forEach((item, index) => {
						list2.forEach((i, idx) => {
							if (item.cateId == i) {
								list1[index].is_selected = true;
								that.cateList = unique(that.cateList.concat(list1[index].cateId));
							}
						})
					});
					callback(list1);
				} else {
					callback(list1);
				}

			},
			checkSelected(item, index, type) {
				console.log(index, type)
				if (type === 1) {
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 2) {
					this.idx1 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 3) {
					this.idx2 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 4) {
					this.idx3 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 5) {
					this.idx4 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				} else if (type === 6) {
					this.idx5 = index;
					this.parentId = item.cateId;
					this.classIfy(type);
				}
			},
			checkId() {
				uni.$emit('checkCid', {
					cate_list: this.cateList
				})
				uni.navigateBack({
					delta: 1
				});
			},
			checkClassify(item) {
				item.is_selected = !item.is_selected;
				if (item.is_selected) {
					this.cateList = unique(this.cateList.concat(item.cateId));
				} else {
					this.cateList.forEach((i, idx) => {
						if (item.cateId == this.cateList[idx]) {
							this.cateList.splice(idx, 1);
						}
					})
				}
				// console.log(this.cateList)
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
