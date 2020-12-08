
// ajax封装
const http = ({ url = '', param = {},loading, ...other } = {}) => {
  let timeStart = Date.now();
  let token = '';
 // console.log(loading)
 if(loading !== 0) {
 	uni.showLoading({
 	    title: '加载中'
 	});
 }
  try {
      const value = uni.getStorageSync('token');
      if (value) {
		  token = value;
		   // console.log(token);
      }
  } catch (e) {
      // error
  }
  return new Promise((resolve, reject) => {

    uni.request({
      url: getUrl(url),
      data: param,
      header: {
        'Content-Type': 'application/json;charset=utf-8', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
		    'token':token
		    // 'token':'d9893c46130d34054ef2b85faf99293c'
      },
      ...other,
      complete: (res) => {
        uni.hideLoading();
		uni.stopPullDownRefresh();
		// console.log(res);
		if(res.data.code > -99999) {
			if(res.data.code == 403){
				uni.showToast({
					title: '账号未登录',
					icon: 'none',
					duration: 1000
				})
				uni.navigateTo({
				    url: '/pages/common/login?type=delToken'
				});
			} 
		}
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res);
        }
      }
    })
  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}

// get方法
const _get = (url, param = {},loading) => {
  return http({
    url,
    param,
    loading,
    method:'GET'
  })
}

const _post = (url, param = {},loading) => {
  return http({
    url,
    param,
	  loading,
    method: 'POST'
  })
}

module.exports = {
  _get,
  _post
}
