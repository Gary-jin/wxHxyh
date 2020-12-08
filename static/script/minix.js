const checkSpecification = (id, lists) => {
	var data = [];
	var arr = lists;
	var obj = {};
	obj.goods_id = id;
	obj.list = [];

	arr.forEach((asset, index) => {
		for (var ret in asset) {
			// console.log(asset[ret])
			if (ret == 'list') {
				var res = asset[ret];
				res.forEach((i, idx) => {
					if (i.selected_nums > 0) {
						obj.list.push({
							'attr_id': i.attr_id,
							'goods_nums': i.selected_nums
						})
					}
				})
			}
		}
	})
	// console.log(obj);
	data.push(obj);
	return data;
}
const unique = (arr) => {
	return Array.from(new Set(arr))
}

const formatDate = (now) => {

	var time = new Date(now);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	return year + '-' + month + '-' + day;
}
const compute = (num) => {
	var Num = parseInt(num * 100) / 100;
	return Num
}
const dealInputVal = (value) => {
	value = value.replace(/^0*(0\.|[1-9])/, "$1");
	value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	value = value.replace(/^\./g, ""); //验证第一个字符是数字而不是字符
	value = value.replace(/\.{1,}/g, "."); //只保留第一个.清除多余的
	value = value
		.replace(".", "$#$")
		.replace(/\./g, "")
		.replace("$#$", ".");
	value = value.replace(/^(\-)*(\d*)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
	value =
		value.indexOf(".") > 0 ? (value.split(".")[0].substring(0, 10) + "." + value.split(".")[1]) : (value.substring(0, 10));
	return value;
}


const imageToBase64 = (file, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.getFileSystemManager().readFile({
		filePath: file, //选择图片返回的相对路径
		encoding: 'base64', //编码格式
		success: res => { //成功的回调
			// console.log('data:image/png;base64,' + res.data)
			return callback('data:image/png;base64,' + res.data, true);
		}
	})
}
const pay = (obj, type) => {
	// console.log(obj);
	uni.requestPayment({
		// appId:obj.appId,
		provider: 'wxpay',
		timeStamp: obj.timeStamp.toString(),
		nonceStr: obj.nonceStr,
		package: obj.package,
		signType: obj.signType,
		paySign: obj.sign,
		success: (e) => {
			console.log('success:' + JSON.stringify(e));
			uni.showToast({
				title: '支付成功',
				icon: 'none',
				duration: 1500
			});
			if (type == 'goods') {
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/tab4/order?idx=5'
					});
				}, 1000)
			} else if (type == 'order') {
				uni.$emit('paySuccess');
			}

		},
		fail: (err) => {
			console.log('fail:' + JSON.stringify(err));
			uni.showToast({
				title: err,
				icon: 'none',
				duration: 1500
			});
			if (type == 'goods') {
				uni.redirectTo({
					url: '/pages/tab4/order?idx=5'
				});
			}
		}
	});
}
const getCurrentPages = () => {
	var pages = getCurrentPages(); //获取加载的页面
	var currentPage = pages[pages.length - 1]; //获取当前页面的对象
	var url = currentPage.route; //当前页面url
	var options = currentPage.options; //获取url中所带的参数
	//拼接url的参数
	currentPage = url + '?';
	for (var key in options) {
		var value = options[key]
		currentPage += key + '=' + value + '&';
	}
	currentPage = currentPage.substring(0, currentPage.length - 1);
	return currentPage;
}

const getQueryString = (url, name) => {
	var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
	var r = url.substr(1).match(reg)
	if (r != null) {
		return r[2]
	}
	return null;
}
const numEration = (arr) => {
	var s = 0;
	for (var i = arr.length - 1; i >= 0; i--) {
		s += arr[i];
	}
	return s;
}

// 图片压缩
const imageCompress = function(res, callback) {
	var originWidth, originHeight;
	originHeight = res.height;
	originWidth = res.width;
	//压缩比例
	// 最大尺寸限制
	var maxWidth = 1000;
	var maxHeight = 1000;
	// 目标尺寸
	var targetWidth = originWidth;
	var targetHeight = originHeight;
	//等比例压缩，如果宽度大于高度，则宽度优先，否则高度优先
	if (originWidth > maxWidth || originHeight > maxHeight) {
		if (originWidth / originHeight > maxWidth / maxHeight) {
			// 要求宽度*(原生图片比例)=新图片尺寸
			targetWidth = maxWidth;
			targetHeight = Math.round(maxWidth * (originHeight / originWidth));
		} else {
			targetHeight = maxHeight;
			targetWidth = Math.round(maxHeight * (originWidth / originHeight));
		}
		return callback(targetWidth, targetHeight, true)
	} else {
		return callback(res.width, res.height, false)
	}
}

const downloadFile = (url, callback) => {
	//收取授权
	uni.authorize({
		scope: 'scope.writePhotosAlbum',
		success() {
			// uni.getLocation()
			saveMediaToAlbum(url);
			console.error(url)
			// uni.hideToast();
			// uni.hideLoading();
			// return callback(true);
		},
		fail: (err) => {
			console.log(err);
			// uni.hideLoading();
			// return callback(false);
		}
	})

	function saveMediaToAlbum(filePath) {
		uni.getImageInfo({
			src: filePath,
			success: (image) => {
				console.log(image);
				// console.log(image.height);
				uni.saveImageToPhotosAlbum({
					filePath:image.path,
					success: function(res) {
						uni.hideToast();
						uni.hideLoading();
						return callback(true);
					},
					fail: (err) => {
						console.log(err);
						uni.hideLoading();
						return callback(false);
					}
				});
			}
		})
	}
	return

	//保存图片到相册
	function saveToAlbum(file) {
		uni.downloadFile({
			url: file,
			success: (res) => {
				console.log(res);
				if (res.statusCode === 200) {
					saveMediaToAlbum(res.tempFilePath);
				}
			},
			fail: (err) => {
				console.log(err);
			}
		});

	};
}

module.exports = {
	checkSpecification,
	unique,
	formatDate,
	compute,
	dealInputVal,
	imageToBase64,
	pay,
	getCurrentPages,
	getQueryString,
	numEration,
	imageCompress,
	downloadFile
}
