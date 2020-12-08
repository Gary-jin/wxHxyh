const baseUrl = 'https://hexieyihao.vmall99.com/api/';    // 测试服

// const baseUrl = "http://192.168.0.125/index.php/api/"

// const baseUrl = 'https://www.hexieyihao.vip/api/';			// 正式服

// 登录
let getUserinfo = baseUrl + 'Public/wechat_login'; 		// 获取用户信息
let getMobilecode = baseUrl + 'Public/sendMsg'; 		// 获取短信验证码	
let bindMobile = baseUrl + 'Public/bind_mobile';		// 绑定手机号

// 首页
let getBannerlist = baseUrl + 'Home/get_lb_img';					// 获取首页轮播图
let getPortiondata = baseUrl + 'Home/app_info';						// 首页部分数据
let getRecommendlist = baseUrl + 'Home/extendGoodsCateList';		// 首页推荐分类列表
let getIndexGoodlist = baseUrl + 'Goods/tj_goods_list';				// 获取首页商品列表
let getGoodsCateList = baseUrl + 'Cate/getGoodsCateList';			// 获取父子分类列表
let getGoodsGradecate = baseUrl + 'Cate/getBrotherCateList';		// 获取同级分类列表
let getParentBrotherCateList = baseUrl + 'cate/getParentBrotherCateList';		// 获取分类列表返回
let SearchbyImageGoodslist = baseUrl + 'Goods/goods_list_by_img';		// 以图搜图商品列表

// 商品
// let getGoodList = baseUrl + 'Goods/goods_list';							// 筛选/搜索的商品列表
let getGoodList = baseUrl + 'Goods_trait/goods_list';							// 筛选/搜索的商品列表   new
let getSearchhistorylist = baseUrl + 'Goods/search_history_list';		// 商品搜索历史
let delSearchhistorylist = baseUrl + 'Goods/del_history_list';			// 删除商品搜索记录
let goodInfo = baseUrl + 'Goods/getGoodsInfo';							// 商品详情
let getGoodsCommentsList = baseUrl + 'Goods/getGoodsCommentsList';		// 商品评论列表
let getGoodsShareimage = baseUrl + 'Goods/get_share_goods_img';			// 获取商品分享图片
let getGoodCommentNum = baseUrl + 'Goods/getGoodCommentNum';			// 获取折叠评论数量
let getGoodsSystemCom = baseUrl +'Goods/getGoodsSystemCom';				// 获取折叠评论列表

// 下单
let checkBindMobile = baseUrl + 'order/check_bind_mobile';				// 下单检测是否绑定手机号
let checkOrder = baseUrl + 'Order/checkOrder';							// 检测订单
let createOrder = baseUrl + 'Order/createOrder';						// 创建订单
let getPaySign = baseUrl + 'Pay/get_pay_sign_str';						// 获取支付签名

// 订单
let orderList = baseUrl + 'Order/orderList';							// 订单列表
let orderInfo = baseUrl + 'Order/orderInfo';							// 订单详情
let updateOrderaddress = baseUrl + 'order/update_order_address';		// 修改订单收货地址
let cancelOrder = baseUrl + 'Order/delOrder';							// 取消订单
let affirmOrder = baseUrl + 'Order/confirmOrder';						// 确认订单
let refundOrder = baseUrl + 'Order/returnGoodsOfOrder';					// 订单退款
let returnGoodsInfoOfOrder = baseUrl + 'Order/returnGoodsInfoOfOrder';	// 退货退款商品详情
let submitComments = baseUrl + 'Goods/submitComments';					// 发布商品评价
let delOrder = baseUrl + 'order/delete_order';							// 删除已完成订单
let returnOrderAddress = baseUrl + 'order/sub_return_post_info';		// 退款订单添加物流信息
let changeGoods = baseUrl + 'Order/changeGoods';						// 订单换货
let logisticsAddress = baseUrl + 'Order/add_change_post_info';			// 填写换货物流信息


// 收货地址
let getDefaultAddress = baseUrl + 'Address/get_default_address';		// 获取默认收货地址
let getAddressList = baseUrl + 'Address/address_list';					// 获取收货地址列表
let additionAddress = baseUrl + 'Address/add_address';					// 添加收货地址
let editAddress = baseUrl + 'Address/edit_address';						// 编辑收货地址
let delAddress = baseUrl + 'Address/del_address';						// 删除收货地址
let addressDetail = baseUrl + 'Address/address_obj';					// 获取单个收货地区详情

// 购物车
let getShoppingCartlist = baseUrl + 'Car/goodsListOfCar';				// 购物车商品列表
let addShoppingCartlist = baseUrl + 'Car/addCar';						// 添加购物车
let editShoppingCart = baseUrl + 'Car/editCar';							// 编辑购物车信息
let delGoodsOfCar = baseUrl + 'Car/delGoodsOfCar';						// 删除购物车正常商品
let delCoosedGoodsOfCar = baseUrl + 'Car/delCoosedGoodsOfCar';			// 删除购物车失效商品
let cartGoodsDetail = baseUrl + 'Car/editCarInfo';						// 购物车单个商品详情

// 个人中心
let userInfo = baseUrl + 'User/info';									// 用户信息
let withDraw = baseUrl + 'User/withdraw';								// 提现
let withDrawlist = baseUrl + 'User/withdraw_list';						// 提现记录
let earningsList = baseUrl + 'User/award_list';							// 收益记录
let getMycode = baseUrl + 'User/shareInfo';								// 我的分享二维码

let getMycodePt = baseUrl + 'User/shareOrdinaryInfo';					// 邀请成为消费者二维码

let managerApply = baseUrl + 'User/apply_zjl';							// 总经理申请
let myTeamInfo = baseUrl + 'User/teamInfo';								// 我的团队首页
let myTeamUlist = baseUrl + 'User/teamUserList';						// 我的团队成员列表
let myTeamOlist = baseUrl + 'User/teamUserOrderList';					// 我的团队用户订单列表
let teamOrderList = baseUrl + 'User/teamOrderList';						// 团队订单排行
let todayOrderList = baseUrl + 'User/todayOrderList';					// 团队今日订单数

let getService  = baseUrl + 'User/my_ml_service';						// 客服
let serviceArticleList = baseUrl + 'Articles/article_list';				// 客服文章列表
let serviceArticleInfo = baseUrl + 'Articles/article_info';				// 客服文章详情
let getWxFocusLink = baseUrl + 'User/getWxFocusLink';					// 获取微信公众号链接
let saveArea = baseUrl + 'user/saveArea';								// 提交用户地理位置
let orderCount = baseUrl + 'order/orderListCount';						// 获取订单数量
let modifyPayAccount = baseUrl + 'user/modifyPayAccount';				// 绑定或修改支付账号


// 商品浏览记录
let getBrowsegoodList = baseUrl + 'View/view_goods_list';				// 商品浏览记录
let delBrowsegoodList = baseUrl + 'View/del_view_goods_list';			// 删除商品浏览记录

// 商品管理
let getManager = baseUrl + 'Manager/first_page_info';					// 商品管理首页
let managerGoodslist = baseUrl + 'Manager/goods_list';					// 商品管理商品列表

let managerGoodsinfo = baseUrl + 'Manager/goods_info';					// 商品详情
let refreshGoods = baseUrl + 'Manager/refreshGoods';					// 刷新商品
let delGoods = baseUrl + 'Manager/delGoods';							// 删除商品
let upAndDownGoods = baseUrl + 'Manager/upAndDownGoods';				// 下架商品
let managerAddEditgoods = baseUrl + 'Manager/addOrEditGoods';			// 添加、编辑商品
let managerPostlist = baseUrl + 'Post/post_list';						// 运费列表
let defaultPost = baseUrl + 'post/get_default_template';				// 默认运费配置

// 七牛云
let getQNYtoken = baseUrl + 'Qny/get_token';							// 获取七牛云token和host


let getArticles = baseUrl + 'Articles/get_articles';					// 返回各种协议


// 详情添加
let getGoodsImg = baseUrl +'Home/get_goods_img';                      //商城活动
let hotGoodsList = baseUrl +'Goods/hot_goods_list';                      //详情推荐商品list

// 指定董事长商品管理
let ChairmanGoodsList = baseUrl + 'Chairman/goods_list';					// 商品列表
let ChairmanFirstPageInfo = baseUrl + 'Chairman/first_page_info';		    // 商品管理首页
let ChairmanAddGoodsMoney = baseUrl + 'Chairman/addGoodsMoney';		        // 加价
let ChairmanReduceGoodsMoney = baseUrl + 'Chairman/reduceGoodsMoney';		// 降价
let ChairmanOnSelfGoods = baseUrl + 'Chairman/onSelfGoods';		            // 不加价上架
let ChairmanOffSelfGoods = baseUrl + 'Chairman/offSelfGoods';		        // 下架
let addMoneyOnSelfGoods = baseUrl + 'Chairman/addMoneyOnSelfGoods';		    // 加价上架

// 商品管理 添加
let ManSetAddPrice = baseUrl + 'Manager/setAddPrice';		        // 加价 降价
let ManSetAddSales = baseUrl + 'Manager/setAddSales';		        // 增加销量

let validateToken = baseUrl + 'public/validateToken';		        // 新增判断普通二维码扫描结果

// 签到 
let userSignIn = baseUrl + 'User/signIn';                           //签到
// 积分
let getScoreList = baseUrl + 'User/getScoreList';                   //积分记录
let scoreGoodsList = baseUrl + 'Goods/scoreGoodsList';              //积分list
let getScoreGoodsInfo = baseUrl + 'Goods/getScoreGoodsInfo';        //积分详情
let scoreCheckOrder = baseUrl + 'Order/scoreCheckOrder';        	//订单详情
let payScoreOrder = baseUrl + 'Order/payScoreOrder';        		//提交订单

// 时间分类
let getDateCateList = baseUrl + 'Cate/getDateCateList';
let moreDateCateList = baseUrl + 'Cate/moreDateCateList';  // 弃用


// 筛选
let GoodsTrait = baseUrl + 'Goods_trait/get_trait_list';
let getTraitListApi = baseUrl + 'Goods_trait/get_trait_list_api'; // 发布商品 添加筛选

module.exports = {
	getUserinfo,
	getMobilecode,
	bindMobile,
	getBannerlist,
	getPortiondata,
	getRecommendlist,
	getIndexGoodlist,
	getGoodsCateList,
	getGoodsGradecate,
	getSearchhistorylist,
	delSearchhistorylist,
	getGoodList,
	goodInfo,
	getGoodsShareimage,
	userInfo,
	getGoodsCommentsList,
	getBrowsegoodList,
	checkOrder,
	delBrowsegoodList,
	getDefaultAddress,
	getAddressList,
	additionAddress,
	createOrder,
	getPaySign,
	getShoppingCartlist,
	addShoppingCartlist,
	delGoodsOfCar,
	cartGoodsDetail,
	delCoosedGoodsOfCar,
	editShoppingCart,
	withDraw,
	withDrawlist,
	earningsList,
	getMycode,
	getMycodePt,
	myTeamInfo,
	myTeamUlist,
	myTeamOlist,
	getService,
	serviceArticleList,
	serviceArticleInfo,
	orderList,
	orderInfo,
	cancelOrder,
	affirmOrder,
	refundOrder,
	getManager,
	managerGoodslist,
	refreshGoods,
	delGoods,
	upAndDownGoods,
	managerGoodsinfo,
	managerAddEditgoods,
	managerPostlist,
	getQNYtoken,
	SearchbyImageGoodslist,
	returnGoodsInfoOfOrder,
	submitComments,
	managerApply,
	getArticles,
	delAddress,
	getWxFocusLink,
	saveArea,
	orderCount,
	delOrder,
	returnOrderAddress,
	checkBindMobile,
	editAddress,
	getParentBrotherCateList,
	defaultPost,
	addressDetail,
	updateOrderaddress,
	modifyPayAccount,
	getGoodCommentNum,
	getGoodsSystemCom,
	changeGoods,
	logisticsAddress,
	teamOrderList,
	todayOrderList,
	getGoodsImg,
	hotGoodsList,
	ChairmanGoodsList,
	ChairmanFirstPageInfo,
	ChairmanAddGoodsMoney,
	ChairmanReduceGoodsMoney,
	ChairmanOnSelfGoods,
	ChairmanOffSelfGoods,
	ManSetAddPrice,
	ManSetAddSales,
	validateToken,
	addMoneyOnSelfGoods,
	userSignIn,
	getScoreList,
	scoreGoodsList,
	getScoreGoodsInfo,
	scoreCheckOrder,
	payScoreOrder,
	getDateCateList,
	moreDateCateList,
	GoodsTrait,
	getTraitListApi
}
