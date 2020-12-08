<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop title="商品规格" showBack="true"></headerTop>
		<view class="H_100 flex_grow_1">
			<view class="W_100 P_4 BB_15_f2f2f2">
				<view>
					<view class="PB_1 flex_rowL">
						<input type="text" class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="属性" v-model="kinds[0]" />
						<!-- <view class="color_red">如：颜色</view> -->
					</view>
					<view class="PT_1 textC flex_rows_start">
						<input type="text" class="W_20vw textC bg_f2f2f2 PTB_1 MR_2 MT_2" v-for="(one,index) in attrObj.oneArr" :key="index"
						 v-model="attrObj.oneArr[index]" @blur="inputState('oneArr',index,attrObj.oneArr[index])">
						<view class="PT_2 flex_rowL">
							<input type="text" class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="自定义" v-model="tempObj.oneTempStr"
							 @blur="pushArr('oneArr','oneTempStr')" />
							<view class="color_red">如：黑色</view>
						</view>
					</view>
				</view>
				<view class="MT_3">
					<view class="PB_1 flex_rowL">
						<input type="text" class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="属性" v-model="kinds[1]" />
						<!-- <view class="color_red">如：尺码</view> -->
					</view>
					<view class="PT_1 textC flex_rows_start">
						<input type="text" class="W_20vw textC bg_f2f2f2 PTB_1 MR_2 MT_2" v-for="(two,index) in attrObj.twoArr" :key="index"
						 v-model="attrObj.twoArr[index]" @blur="inputState('twoArr',index,attrObj.twoArr[index])">
						<view class="PT_2 flex_rowL">
							<input type="text" class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="自定义" v-model="tempObj.twoTempStr"
							 @blur="pushArr('twoArr','twoTempStr')" />
							<view class="color_red">如：XL</view>
						</view>
					</view>
				</view>
			</view>
			<view class="PTB_3">
				<view class="flex_rowL BB_1_f2f2f2 PTB_2">
					<view class="PLR_4">价格/库存</view>
				</view>
			</view>
			<view v-show="tempObj.obj.isShow">
				<view class="PB_2 BB_10_f2f2f2">
					<view class="PLR_4 PB_2 flex_row_between">
						<view class=" ">批量设定</view>
						<view class="flex_rowR">
							<view @click="batchSetting(0)" class="color_fff bg_ED2251 PTB_1 PLR_3 B_radius_5 textC MR_2">批量输入</view>
							<button @click.once="batchSetting(1)" class="color_fff fontS_14 lineH_2 bg_ED2251 PTB_1 PLR_3 B_radius_5 textC" :disabled="disabled">保存</button>
						</view>
					</view>
					<view class="PLR_4 flex_row_between relative">
						<view class="">
							<view class="flex_rowL">
								<input class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="出厂价" v-model="tempObj.obj.original_price" type="number" />
								<input class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="输入价格" v-model="tempObj.obj.price" type="number" />
								<input class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="输入库存" v-model="tempObj.obj.count" type="number" />
							</view>
							<view class="MT_2" @click="getIdx(index)">
								<view class="WH_26vw flex_colC bg_f2f2f2" v-show="!tempObj.obj.img" @click="afterRead('all',-1)">
									<view class="fontS_18 color_ED2251">
										+
									</view>
								</view>
								<view class="WH_26vw relative" v-show="tempObj.obj.img">
									<image class="WH_100" :src="tempObj.obj.img" mode=""></image>
									<view class="iconfont fontS_16 absolute color_999" @click="delImage('all',-1)" style="top: 5%;right: 5%;">
										&#xe628;
									</view>
								</view>
							</view>
						</view>
						<view class="fontS_12 color_ED2251 bg_f2f2f2 P_1 textC" v-show="hintShow">
							提示：批量设定可为商品添加统一的规格图片、库存、价格，也可以单独为某一商品规格添加图片、库存、价格。
						</view>
						<view class="iconfont fontS_20 absolute" @click="hintShow = !hintShow" style="top: 2%;right: 5%;">
							&#xe64e;
						</view>
					</view>
				</view>

				<view class="">
					<view class="PLR_4 PTB_1 flex_row_between">
						<view class="">
							单一设定
						</view>
						<button class="color_fff fontS_14 lineH_2 bg_ED2251 PTB_1 PLR_3 B_radius_5 textC" :disabled="disabled" @click.once="open">
							保存
						</button>
					</view>
					<view class="PLR_4 BT_5_f2f2f2" v-for="(item,index) in fnAllArr" :key="index">
						<view class="flex_rowL PB_2">
							<view class="flex_col_between">
								<view class="PB_5">
									{{item[0]}} / {{item[1]}}
								</view>
								<view class="flex_rowL MT_2">
									<input type="number" class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="出厂价" v-model="allArr[index][2]"
									 @blur="inputState2(index,2,allArr[index][2])">
									<input type="number" class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="输入价格" v-model="allArr[index][3]"
									 @blur="inputState2(index,3,allArr[index][3])">
									<input type="number" class="W_20vw PTB_1 textC bg_f2f2f2 MR_2" placeholder="输入库存" v-model="allArr[index][4]"
									 @blur="inputState2(index,4,allArr[index][4])">
								</view>
							</view>
						</view>
						<view class="MB_2" @click="getIdx(index)">
							<view class="WH_26vw flex_colC bg_f2f2f2 " v-show="!allArr[index][4]" @click="afterRead('once',index)">
								<view class="fontS_18 color_ED2251">
									+
								</view>
						
							</view>
							<view class="WH_26vw relative" v-show="allArr[index][5]">
								<image class="WH_100" :src="allArr[index][5]" mode=""></image>
								<view class="iconfont fontS_16 absolute color_999" @click="delImage('once',index)" style="top: 5%;right: 5%;">
									&#xe628;
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		getQNYtoken
	} from '../../static/script/const.js';
	import {
		init,
		upload
	} from '../../static/script/qiniuUploader.js';
	export default {
		name: "",
		data() {
			return {
				topBarTextColor: "dark",
				isEditor: true, //是否可编辑
				lock: false,
				attrTempStr: '',
				loadArr: [],
				loadArr2: [],
				kinds: ['颜色', '尺码'],
				attrObj: {
					oneArr: [],
					twoArr: []
				},
				tempObj: {
					oneTempStr: '',
					twoTempStr: '',
					obj: {
						price: '',
						count: '',
						original_price:'',
						img: '',
						isShow: true
					}
				},
				allArr: [{
					attr: [],
					original_price:'',
					price: '',
					count: '',
					img: []
				}],
				specification: [],
				imgIdx: -1,
				hintShow: false,
				type:'',
				disabled:false
			}
		},
		onLoad() {
			let that = this;
			that.type = that.$parseURL().type;
			console.log(that.type);
			if(that.type == 'add'){
				that.tempObj.obj.count = 9999;
			}
			if (that.$parseURL().obj) {
				let arr = [];
				arr = that.$parseURL().obj;
				if(arr.length > 0){
					arr.forEach((item) => {
						that.attrObj.oneArr = that.listunique(that.attrObj.oneArr.concat(item.attr[0]));
						that.attrObj.twoArr = that.listunique(that.attrObj.twoArr.concat(item.attr[1]));
					});
					if(arr[0].price || arr[0].count || arr[0].img || arr[0].ex_price){
						that.tempObj.obj.price = arr[0].price;
						that.tempObj.obj.count = arr[0].count;
						that.tempObj.obj.img = arr[0].img;
						that.tempObj.obj.original_price = arr[0].ex_price;
					}
				}
			}
		},
		methods: {

			//如果有传过来的数据加载数据
			loadData: function() {
				let that = this;
				if (this.$parseURL().field.length) {
					// console.log('$api.jsonToStr(that.allArr)=====================================');
					that.allArr = this.$parseURL().field;
					that.kinds = that.getAttrKey(that.allArr)[0]; //截取属性key值 颜色 大小
					that.attrObj = that.concatArr(that.allArr); //过滤重复属性val值 红色 XL
				}
				// that.isEditor = api.pageParam.isEditor; //是否可编辑
			},
			// 获取属性key值
			getAttrKey: function(arr) {
				return arr.splice(arr.length - 1, 1);
			},
			//过滤重复属性val值
			concatArr: function(arr) {
				let oneArr = [];
				let twoArr = [];
				for (let i = 0; i < arr.length; i++) {
					if (oneArr.indexOf(arr[i][0]) == -1) {
						oneArr.push(arr[i][0]);
					}
					if (twoArr.indexOf(arr[i][1]) == -1) {
						twoArr.push(arr[i][1]);
					}
				}
				return {
					oneArr: oneArr,
					twoArr: twoArr
				}
			},
			//点击确定时将数据保存传出
			open() {
				if (!this.kinds[0] || !this.kinds[1]) {
					uni.showToast({
						title: '属性不能为空',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				let that = this;
				that.disabled = true;
				for (let i = 0; i < that.allArr.length; i++) {
					let obj = {};
					obj.attr = [];
					console.log(that.allArr[i]);
					obj.attr[0] = that.allArr[i][0];
					obj.attr[1] = that.allArr[i][1];
					obj.ex_price = that.allArr[i][2]
					obj.price = that.allArr[i][3];
					if(that.type == 'add'){
						if(!that.allArr[i][4]){
							obj.count = 9999;
						} else {
							obj.count = that.allArr[i][4];
						}
					} else {
							obj.count = that.allArr[i][4];
					}
					console.log(that.allArr[i][4])
					obj.img = that.allArr[i][5];
					
					that.specification.push(obj);
					
				}
				console.log(that.specification)
				uni.$emit('specification', {
					content: that.specification,
					title: that.kinds
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
					that.disabled = false;
				},1000)
			},
			checkShow() {
				this.tempObj.obj.isShow = !this.tempObj.obj.isShow;
			},
			//批量设定
			batchSetting: function(item) {
				this.tempObj.obj.isShow = false;
				this.tempObj.obj.isShow = true;
				for (let i = 0; i < this.allArr.length; i++) {
					this.allArr[i][2] = this.tempObj.obj.original_price;
					this.allArr[i][3] = this.tempObj.obj.price;
					this.allArr[i][4] = this.tempObj.obj.count;
					this.allArr[i][5] = this.tempObj.obj.img;
				}
				if(item == 1){
					this.open()
				}
			},		
			//价格,库存,红包输入框失去焦点
			inputState2: function(idx, idx2, val) {
				this.allArr[idx][idx2] = val ? val : '0';
				// console.log(this.allArr);
			},
			//属性输入框失去焦点
			inputState: function(arr, idx, val) {
				this.attrObj[arr].splice(idx, 1, val)
				console.log(this.attrObj[arr][idx])
				if (this.attrObj[arr][idx] == '') {
					console.log('down')
					this.attrObj[arr].splice(idx, 1);
				}
				console.log(this.attrObj[arr]);
			},
			//失去焦点时push数组
			pushArr: function(arr, str) {
				if (!this.tempObj[str]) {
					uni.showToast({
						title: '不能为空',
						icon: 'none',
						duration: 1500
					});
					return;
				}

				// let index = this.attrObj[arr].findIndex(item=> item == this.tempObj[str]);
				if (this.attrObj[arr].indexOf(this.tempObj[str]) == -1) {
					this.attrObj[arr].push(this.tempObj[str]);
				} else {
					uni.showToast({
						title: '命名重复',
						icon: 'none',
						duration: 1500
					});
				}
				this.tempObj[str] = '';
			},
			grep: function(elems, callback, invert) {
				var callbackInverse,
					matches = [],
					i = 0,
					length = elems.length,
					callbackExpect = !invert;

				// Go through the array, only saving the items
				// that pass the validator function
				for (; i < length; i++) {
					callbackInverse = !callback(elems[i], i);
					if (callbackInverse !== callbackExpect) {
						matches.push(elems[i]);
					}
				}

				return matches;
			},
			listunique(arr) {
				for (var i = 0; i < arr.length; i++) {
					for (var j = i + 1; j < arr.length; j++) {
						if (arr[i] == arr[j]) { //第一个等同于第二个，splice方法删除第二个
							arr.splice(j, 1);
							j--;
						}
					}
				}
				return arr;
			},
			initQniu(data) {
				console.log(data)
				init({
					region: 'ECN', // 华南
					// ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
					uptoken: data.token,
					domain: data.host, // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
					shouldUseQiniuFileName: false
				});
			},
			afterRead(type, index) {
				// console.log(e)
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						let file = res.tempFilePaths[0]
						api._post(getQNYtoken, {}).then((res) => {
							if (res.code == 0) {
								this.initQniu(res.data);
								upload(file, (ret) => {
									console.log(res.data.host + '/' + ret.key);
									let img = res.data.host + '/' + ret.key;
									if (type === 'once') {
										this.allArr[index][4] = res.data.host + '/' + ret.key
										console.log(this.allArr[index]);
									} else {
										this.tempObj.obj.img = res.data.host + '/' + ret.key;
									}
								})
							}
						})
					}
				});

				// console.log(file);
			},
			delImage(type, index) {
				if (type === 'once') {
					this.allArr[index][4] = ''
					console.log(this.allArr[index]);
				} else {
					this.tempObj.obj.img = '';
				}
			},
			getIdx(index) {
				// console.log(index);
				this.imgIdx = index;
			},
			beforeDelete(file) {
				var that = this;
				// console.log(JSON.stringify(file.content));
				// console.log('111')
				var book_name = that.fileList;
				var i = book_name.indexOf(file.url);
				book_name.splice(i, 1);
				that.fileList = book_name;
				that.file = [];
				for (let i in book_name) {
					console.log(book_name[i].url);
					that.file = that.file.concat(book_name[i].url)
				}
				console.log(that.file);
			},

		},
		computed: {
			//遍历一对多
			fnAllArr: function() {
				let that = this;
				let objj = JSON.parse(JSON.stringify(that.attrObj)) //用来操作的数据
				let objj2 = JSON.parse(JSON.stringify(objj)) //保存一份原始数据
				//剔除没有的val组合
				that.allArr = that.grep(that.allArr, function(item) {
					return !(objj.oneArr.indexOf(item[0]) == -1 || objj.twoArr.indexOf(item[1]) == -1);
				});
				// console.log($api.jsonToStr(this.allArr));
				//挑选出新加入的属性val
				for (let k = 0; k < that.allArr.length; k++) {
					let tempArr = that.allArr[k];
					objj.oneArr = that.grep(objj.oneArr, function(item) {
						return !(tempArr.indexOf(item) != -1);
					});
					objj.twoArr = that.grep(objj.twoArr, function(item) {
						return !(tempArr.indexOf(item) != -1);
					});
				}
				//进行遍历 oneArr
				for (let b = 0; b < objj.oneArr.length; b++) {
					for (let j = 0; j < objj2.twoArr.length; j++) {
						that.allArr.push([
							objj.oneArr[b],
							objj2.twoArr[j]
						]);
					}
				}
				//进行遍历 twoArr
				for (let c = 0; c < objj2.oneArr.length; c++) {
					for (let d = 0; d < objj.twoArr.length; d++) {
						that.allArr.push([
							objj2.oneArr[c],
							objj.twoArr[d]
						]);
					}
				}

				function dedup(arr) { //复杂数组去重的方法
					let hashTable = {};
					return arr.filter(function(el) {
						let key = JSON.stringify(el);
						let match = Boolean(hashTable[key]);
						return (match ? false : hashTable[key] = true);
					})
				}
				that.allArr = dedup(that.allArr);
				console.log(JSON.stringify(that.allArr));
				return that.allArr;
			}
		},
		components: {
			headerTop,
		}
	}
</script>

<style>


</style>
