(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/common/shopGoodInfo"],{

/***/ 100:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/和鞋一号/pages/common/shopGoodInfo.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;














































































































































































































































































































































































































































































































var _ajax = _interopRequireDefault(__webpack_require__(/*! ../../static/script/ajax.js */ 19));
var _const = __webpack_require__(/*! ../../static/script/const.js */ 20);













var _minix = __webpack_require__(/*! ../../static/script/minix.js */ 22);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var headerTop = function headerTop() {__webpack_require__.e(/*! require.ensure | components/headerTop/headerTop */ "components/headerTop/headerTop").then((function () {return resolve(__webpack_require__(/*! ../../components/headerTop/headerTop.vue */ 369));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =





{
  data: function data() {
    return {
      containerStyle: 'background-image: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0)) !important',
      headerStyle: 'background-image: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0)) !important',
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      circular: true,
      show: false,
      buy_show: false,
      cart_show: false,
      shareImgshow: false,
      shareList: [{
        'title': '二维码海报',
        'img': 'http://qnyimages.hexieyihao.vip/share_icon3.png' }],

      checkIdx: -1,
      good_id: '',
      dataList: {},
      specificationImg: '',
      attr2: [],
      attr2List: [],
      selectNums: [],
      goodsNum: 0,
      checkNum: [],
      shoppingCartshow: false,
      shoppingCartlist: [],
      checkCartlist: [],
      user_id: '',
      mode: 'aspectFill',
      shareImg: '',
      allCheck: false,
      orderPriceList: [],
      orderPrice: 0,
      orderNumList: [],
      orderNum: 0,
      videoContext: {},
      lists: [],
      goodsDetail: {},
      cId: '',
      gId: '',
      disabled: true,
      spe_price: '',
      user: {},
      selected_nums: 0,
      pages: '',
      getGoodsInfo: false,
      backIdx: true,
      canvasWidth: 0,
      canvasHeight: 0,
      toastShow: false,
      recommendlist: [],
      goodList: [], //推荐商品列表
      page: 1,
      goodsShow: false,
      goTopShow: false,
      is_sign: '',
      signShow: false,
      save_price: '' // 省后价格
    };
  },
  onReachBottom: function onReachBottom() {
    this.getGoodlist('more');
  },
  onLoad: function onLoad(options) {
    // this.getGoodlist();
    this.getRecommend();
    console.warn('goins');
    console.log(JSON.stringify(options));
    console.warn('goins');
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'ShareTimeline'] });

    if (options.type) {
      this.backIdx = false;
      this.good_id = options.goodsId;
      uni.setStorage({
        key: 'pid',
        data: options.pid,
        success: function success() {

        } });

      // if (!uni.getStorageSync('token') && options.is_worker == 1) {
      // 	// console.log('跳转登录')
      // 	uni.navigateTo({
      // 		url: '/pages/common/login?type=' + options.type +'&pid=' + options.pid + '&goodsId=' + options.goodsId
      // 	});
      // }
      // return
    } else if (options.id) {
      this.backIdx = false;
      this.good_id = options.id;
      uni.setStorage({
        key: 'pid',
        data: options.pid,
        success: function success() {

        } });

      // if (!uni.getStorageSync('token') && options.is_worker == 1) {
      // 	// console.log('跳转登录')
      // 	uni.navigateTo({
      // 		url: '/pages/common/login?type=delToken'
      // 	});
      // }
      // return
    } else if (options.good_id) {
      this.backIdx = false;
      this.good_id = options.good_id;
      // return
    } else if (this.$parseURL().good_id) {
      this.pages = this.$parseURL().pages;
      this.good_id = this.$parseURL().good_id;
    } else {
      this.backIdx = false;
    }
    this.user_id = uni.getStorageSync('userId');
    uni.setStorageSync('goodId', this.good_id);
    console.warn('jinquan', uni.getStorageSync('goodId'));
    this.videoContext = uni.createVideoContext('myVideo', this);
    this.user = uni.getStorageSync('userInfo');
    // identity_str
    // console.log(this.user.identity_str)
    this.getUserInfo();
  },
  // 分享 好友
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: this.dataList.goods_name,
      path: '/pages/common/shopGoodInfo?id=' + uni.getStorageSync('goodId') + '&pid=' + uni.getStorageSync('userId') +
      '&is_worker=' + this.user.is_worker,
      imageUrl: this.dataList.share_img };

  },
  // 朋友圈
  onShareTimeline: function onShareTimeline(res) {
    console.log(res);
    var that = this;
    if (res.from === 'menu') {// 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: that.dataList.goods_name,
      query: 'id=' + uni.getStorageSync('goodId') + '&pid=' + uni.getStorageSync('userId') +
      '&is_worker=' + that.user.is_worker,
      imageUrl: that.dataList.img };

  },
  onShow: function onShow() {
    this.checkIdx = -1;
    this.disabled = true;
    this.getGoodmsg();
    this.getshoppingCartlist();
    this.show = false;
  },
  watch: {
    toastShow: function toastShow(val) {var _this = this;
      console.log(val);
      if (this.toastShow) {
        setTimeout(function () {
          _this.toastShow = false;
        }, 2000);
      }
    } },

  mounted: function mounted() {

  },
  methods: {
    goTop: function goTop() {
      this.pageScrollTop(function (ret) {});
      this.goTopShow = false;
    },
    pageScrollTop: function pageScrollTop(callback) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
        success: function success(res) {
          callback(res);
        } });

    },
    // 推荐 商品列表
    getGoodlist: function getGoodlist(type) {var _this2 = this;
      var param;
      if (type == 'more') {
        param = {
          'page': ++this.page,
          'goods_id': this.good_id };

      } else {
        param = {
          'page': 1,
          'goods_id': this.good_id };

      }
      console.log(param);
      _ajax.default._get(_const.hotGoodsList, param).then(function (res) {
        if (res.code == 0) {
          if (type == 'more') {
            _this2.goTopShow = true;
            if (res.data.list && res.data.list.length > 0) {
              _this2.goodList = _this2.goodList.concat(res.data.list);
              _this2.goodsShow = false;
            } else {
              _this2.goodsShow = true;
            }
          } else {
            _this2.goodList = res.data.list;
          }
        }
      });
    },
    // 商城活动 列表
    getRecommend: function getRecommend() {var _this3 = this;
      _ajax.default._get(_const.getGoodsImg, {
        'page': '1' }).
      then(function (res) {
        if (res.code == 0) {
          _this3.recommendlist = res.data.list;
          console.log(JSON.stringify(_this3.recommendlist));
        }
      });
    },
    // 商城活动 跳转
    getCate: function getCate(item) {
      if (item.about_type == 1) {
        uni.$emit('goodsDetallUpdate', { goodsDetall: item });
      } else if (item.about_type == 3) {
        this.$openPage({ 'name': 'integralShop' });
      } else {
        uni.switchTab({
          url: '../tab1' });

        setTimeout(function () {
          uni.$emit('backAll', { item: item });
        }, 700);
      }
    },
    getGoodmsg: function getGoodmsg() {var _this4 = this;
      var that = this;
      var param = {
        'goods_id': that.good_id };

      _ajax.default._post(_const.goodInfo, param).then(function (res) {
        if (res.code == 0) {

          if (res.data.info.video_url != '') {
            res.data.info.banner_imgs.unshift(res.data.info.video_url.replace(/"/g, ''));

          }
          that.dataList = res.data.info;
          console.warn('zms_fxz', JSON.stringify(_this4.dataList.zms_fxz));
          that.goods_id = res.data.info.goods_id;
          that.getGoodlist();
          console.log(that.dataList.img);
          that.getGoodsInfo = true;
          // console.log(that.dataList.banner_imgs.length)
          that.lists.push(res.data.info);
        } else if (res.code == 1) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500 });

          setTimeout(function () {
            uni.switchTab({
              url: "../tab1" });

          }, 1000);
        }
      });
    },
    checkidx: function checkidx(type, item, index) {
      var that = this;
      that.checkIdx = index;
      if (index != -1) {
        that.disabled = false;
      }
      if (type == 'cart') {
        var arr = that.goodsDetail.goods_attr[1];
        arr.forEach(function (i) {
          if (i.color === item) {
            that.attr2 = i.list;
          }
        });
      } else {
        var _arr = that.dataList.list2;
        _arr.forEach(function (i) {
          if (i.color === item) {
            that.attr2 = i.list;
          }
        });
      }

    },
    inputIdx: function inputIdx(type, item) {
      var that = this;
      item.selected_nums = that.selected_nums;
      if (type == 'cart') {
        that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);

        that.checkNum = (0, _minix.checkSpecification)(that.good_id, that.goodsDetail.goods_attr[1]);
      } else {
        that.backGoodsAttrStr(that.dataList.list2);
        that.checkNum = (0, _minix.checkSpecification)(that.good_id, that.dataList.list2);
      }
      that.selected_nums = 0;
    },
    onChange: function onChange(e) {
      this.selected_nums = e.detail;
    },
    addItem: function addItem(type, item) {
      var that = this;
      // console.log(item);
      that.spe_price = item.spe_price;
      that.save_price = Number(item.spe_price) - (Number(that.dataList.spe_price) - Number(that.dataList.save_price));
      if (that.checkIdx == -1) {
        that.toastShow = true;
        return;
      } else {
        ++item.selected_nums;
        if (type == 'cart') {
          that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);

          that.checkNum = (0, _minix.checkSpecification)(that.good_id, that.goodsDetail.goods_attr[1]);
        } else {
          that.backGoodsAttrStr(that.dataList.list2);
          that.checkNum = (0, _minix.checkSpecification)(that.good_id, that.dataList.list2);
        }
      }

    },
    minusItem: function minusItem(type, item) {
      var that = this;
      --item.selected_nums;
      if (type == 'cart') {
        that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);

        that.checkNum = (0, _minix.checkSpecification)(that.good_id, that.goodsDetail.goods_attr[1]);
      } else {
        that.backGoodsAttrStr(that.dataList.list2);
        that.checkNum = (0, _minix.checkSpecification)(that.good_id, that.dataList.list2);
      }
    },
    getShareimage: function getShareimage() {
      var that = this;
      console.error('ShareId', that.good_id);
      var param = {
        'goods_id': that.good_id };

      _ajax.default._get(_const.getGoodsShareimage, param).then(function (res) {
        if (res.code == 0) {
          that.shareImg = res.data.imgUrl;
          // that.canvasImg(res.data.imgUrl,res.data.xcx_code_img);
        }
      });
    },
    canvasImg: function canvasImg(img1, img2) {var _this5 = this;
      var GetImageInfo = uni.getImageInfo;
      uni.showLoading({
        title: '加载中' });

      var that = this;
      Promise.all([
      GetImageInfo({
        src: img1 }),

      GetImageInfo({
        src: img2 })]).

      then(function (res) {
        var arr1 = res[0];
        var arr2 = res[1];
        var ctx = uni.createCanvasContext('shareCanvas');

        // 底图
        ctx.drawImage(arr1[1].path, 0, 0, 255, 455);

        // 小程序码
        var qrImgSize = 75;
        ctx.drawImage(arr2[1].path, 175, 375, qrImgSize, qrImgSize);

        ctx.stroke();
        ctx.draw();
        var wxCanvasToTempFilePath = uni.canvasToTempFilePath;

        wxCanvasToTempFilePath({
          canvasId: 'shareCanvas' },
        _this5).then(function (res) {
          that.shareImg = res[1].tempFilePath;
          setTimeout(function () {
            uni.hideLoading();
          }, 500);
        });
      });
    },
    checkGood: function checkGood(type) {
      var that = this;
      var param;
      if (type == 'cart') {
        if (that.checkCartlist < 1) {
          that.toastShow = true;
          // uni.showToast({
          // 	title: '您还未选择商品',
          // 	icon: 'none',
          // 	duration: 2000
          // });
          return;
        }
        param = {
          'json_str': '',
          'car_ids': that.checkCartlist.toString() };

      } else {
        if (that.checkNum.length < 1) {
          // uni.showToast({
          // 	title: '您还未选择商品',
          // 	icon: 'none',
          // 	duration: 2000
          // });
          that.toastShow = true;
          return;
        }
        param = {
          'json_str': encodeURIComponent(JSON.stringify(that.checkNum)),
          'car_ids': '' };

      }
      if (type == 'cart') {
        that.buy_show = false;
        that.$openPage({
          name: 'confirmOrder',
          query: {
            order_type: type,
            car_ids: that.checkCartlist.toString() } });


      } else {
        that.buy_show = false;
        that.$openPage({
          name: 'confirmOrder',
          query: {
            order_type: type,
            json_str: encodeURIComponent(JSON.stringify(that.checkNum)) } });


      }
    },
    buy: function buy() {

      var that = this;
      var value = uni.getStorageSync('token');
      if (!value) {
        that.buy_show = false;
        uni.navigateTo({
          url: '/pages/common/login?type=delToken' });

      } else {
        that.getshoppingCartlist();
        that.buy_show = true;
        that.attr2 = that.dataList.list2[0].list;
      }
    },
    share: function share() {
      this.show = true;
      this.getShareimage();
    },
    getshoppingCartlist: function getshoppingCartlist() {
      var that = this;
      _ajax.default._post(_const.getShoppingCartlist, {}).then(function (res) {
        if (res.code == 0) {
          that.shoppingCartlist = res.data;
          that.checkCartlist = [];
          that.orderPriceList = [];
          that.orderNumList = [];
          that.orderPrice = 0;
          that.orderNum = 0;
        }
      });
    },

    addShoppingCart: function addShoppingCart() {var _this6 = this;
      var that = this;
      var attr = that.checkNum[0].list;
      // return
      var param = {
        'json_str': encodeURIComponent(JSON.stringify(attr)),
        'goods_id': that.good_id };

      _ajax.default._post(_const.addShoppingCartlist, param).then(function (res) {
        if (res.code == 0) {
          that.checkIdx = 0;
          _this6.shoppingCartshow = true;
          _this6.buy_show = false;
          that.getshoppingCartlist();
        }
      });
    },
    checkCart: function checkCart(index) {var _this7 = this;
      this.shoppingCartlist.list1[index].is_selected = !this.shoppingCartlist.list1[index].is_selected;

      if (this.shoppingCartlist.list1[index].is_selected) {
        this.checkCartlist = (0, _minix.unique)(this.checkCartlist.concat(this.shoppingCartlist.list1[index].id));
        this.orderPriceList = (0, _minix.unique)(this.orderPriceList.concat(this.shoppingCartlist.list1[index].total_price));
        this.orderPrice = (0, _minix.numEration)(this.orderPriceList);
        this.orderNumList = (0, _minix.unique)(this.orderNumList.concat(this.shoppingCartlist.list1[index].total_goods_nums));
        this.orderNum = (0, _minix.numEration)(this.orderNumList);
      } else {
        this.allCheck = false;
        this.orderNum = this.orderNum - this.shoppingCartlist.list1[index].total_goods_nums;
        this.orderPrice = this.orderPrice - this.shoppingCartlist.list1[index].total_price;
        this.checkCartlist.forEach(function (i, idx) {
          if (i == _this7.shoppingCartlist.list1[index].id) {
            _this7.checkCartlist.splice(idx, 1);
          }
        });
      }
      for (var i = this.shoppingCartlist.list1.length - 1; i >= 0; i--) {
        if (!this.shoppingCartlist.list1[i].is_selected) {
          this.allCheck = false;
          break;
        } else {
          this.allCheck = true;
        }
      }

      if (this.checkCartlist.length < 1) {
        this.orderPrice = 0;
        this.orderNum = 0;
      }
    },
    checkCarts: function checkCarts() {var _this8 = this;
      this.allCheck = !this.allCheck;
      this.shoppingCartlist.list1.forEach(function (item) {
        if (_this8.allCheck) {
          _this8.checkCartlist.push(item.id);
          item.is_selected = true;
          _this8.orderPriceList = (0, _minix.unique)(_this8.orderPriceList.concat(item.total_price));
          _this8.orderPrice = (0, _minix.numEration)(_this8.orderPriceList);
          _this8.orderNumList = (0, _minix.unique)(_this8.orderNumList.concat(item.total_goods_nums));
          _this8.orderNum = (0, _minix.numEration)(_this8.orderNumList);
        } else {
          _this8.orderNum = _this8.orderNum - _this8.total_goods_nums;
          _this8.orderPrice = _this8.orderPrice - _this8.total_price;
          _this8.checkCartlist = [];
          item.is_selected = false;
          _this8.orderPriceList = [];
          _this8.orderNumList = [];
          _this8.orderPrice = 0;
          _this8.orderNum = 0;
        }
      });
    },
    addCart: function addCart(type) {
      if (type === 1) {
        if (this.checkNum.length < 1) {
          // uni.showToast({
          // 	title: '请选择商品',
          // 	icon: 'none',
          // 	duration: 2000
          // });
          this.toastShow = true;
          return;
        }
        this.addShoppingCart();
      } else {
        this.shoppingCartshow = true;
        this.buy_show = false;
        this.getshoppingCartlist();
      }

    },
    backHome: function backHome() {
      uni.$emit('backHome');
      uni.switchTab({
        url: '../tab1' });

    },
    backGoodsAttrStr: function backGoodsAttrStr(list) {
      var data1 = [];
      var num = 0;
      for (var item in list) {
        var demo_obj = list[item];
        // console.log(demo_obj)
        if (this.getTotalSelectedNums(demo_obj.list) > 0) {
          var str = demo_obj.color + ": ";
          // console.log(demo_obj);
          var arr = demo_obj.list;

          for (var it in demo_obj.list) {
            var demo_item = demo_obj.list[it];
            num += Number(demo_item.selected_nums);
            this.goodsNum = num;
            if (demo_item.selected_nums > 0) {
              str += demo_item.attr + "/" + demo_item.selected_nums + "件，";
            }
          }
          // console.log(str);
          data1.push(str);
        }

      }
      return this.selectNums = data1;
    },
    getTotalSelectedNums: function getTotalSelectedNums(demo_list) {
      var total_nums = 0;
      for (var it in demo_list) {
        var demo_item = demo_list[it];
        total_nums += demo_item.selected_nums;
      }
      return total_nums;
    },
    shareCode: function shareCode(index) {var _this9 = this;
      this.show = false;
      this.getShareimage();
      setTimeout(function () {
        _this9.shareImgshow = true;
      }, 100);
    },
    editCart: function editCart() {
      var that = this;
      if (that.checkNum.length > 0) {
        var attr = [];

        attr = that.checkNum[0].list;
        var param = {
          'car_id': that.cId,
          'goods_id': that.gId,
          'json_str': encodeURIComponent(JSON.stringify(attr)) };

        _ajax.default._post(_const.editShoppingCart, param).then(function (res) {
          if (res.code == 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000 });

            that.checkIdx = 0;
            that.cart_show = false;
            that.getshoppingCartlist();
            that.shoppingCartshow = true;
          }
        });
      } else {
        that.cart_show = false;
      }
    },
    getcartGoodsDetail: function getcartGoodsDetail(item) {
      var that = this;
      that.attr2 = [];
      that.cId = item.id;
      that.gId = item.goods_id;
      var param = {
        'car_id': item.id,
        'goods_id': item.goods_id };

      _ajax.default._post(_const.cartGoodsDetail, param).then(function (res) {
        if (res.code == 0) {
          that.shoppingCartshow = false;
          that.cart_show = true;
          that.goodsDetail = res.data.info;
          that.attr2 = that.goodsDetail.goods_attr[1][0].list;
          that.backGoodsAttrStr(that.goodsDetail.goods_attr[1]);
          // console.log(that.goodsDetail)
        }
      });
    },
    saveImage: function saveImage() {
      var that = this;
      uni.showLoading({
        title: '加载中' });

      (0, _minix.downloadFile)(that.shareImg, function (res) {

        if (res) {
          uni.hideLoading();
          that.shareImgshow = false;
          uni.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000 });

        } else {
          uni.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 2000 });

        }
      });
    },
    dialog: function dialog() {var _this10 = this;
      if (this.checkCartlist.length < 1) {
        // uni.showToast({
        // 	title: '请选择商品',
        // 	icon: 'none',
        // 	duration: 2000
        // });
        this.toastShow = true;
        return;
      }
      _ajax.default._post(_const.delGoodsOfCar, {
        'ids': this.checkCartlist.toString() }).
      then(function (res) {
        if (res.code == 0) {
          // orderPriceList
          _this10.checkCartlist = [];
          _this10.getshoppingCartlist();
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000 });

          _this10.orderNum = 0;
          _this10.orderPrice = 0;
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000 });

        }
      });
    },
    backOut: function backOut() {
      if (this.backIdx) {
        uni.$emit('goodsInfoBack', {
          pages: this.pages });

        uni.navigateBack({
          delta: 1 });

      } else {
        uni.$emit('backHome');
        uni.switchTab({
          url: '../tab1' });

      }

    },
    deficiency: function deficiency() {
      if (this.checkIdx == -1) {
        this.toastShow = true;
      } else {
        uni.showToast({
          title: '库存不足',
          icon: 'none',
          duration: 2000 });

      }
    },
    videoPlay: function videoPlay(e) {
      // console.log(e);
      if (e.type == 'play') {
        this.autoplay = false;
      }
    },
    videoPause: function videoPause(e) {
      // console.log(e.type);
      if (e.type == 'pause') {
        this.autoplay = true;
      }
    },
    swiperChange: function swiperChange(e) {
      // console.log(e);
      if (e.type == 'change') {
        if (this.dataList.video_url) {
          // this.videoContext.pause()
        }
      }
    },
    skuImageShow: function skuImageShow(img) {
      var imgs = [];
      imgs.push(img);
      uni.previewImage({
        current: 1,
        urls: imgs,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function success(data) {
            // console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function fail(err) {
            console.log(err.errMsg);
          } } });


    },
    showImage: function showImage(item, index) {
      // 预览图片
      uni.previewImage({
        current: index,
        urls: this.dataList.imgs,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function success(data) {
            // console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function fail(err) {
            console.log(err.errMsg);
          } } });


    },
    onClose: function onClose() {
      this.shoppingCartshow = false;
    },
    overlayShow: function overlayShow(e) {
      this.cart_show = false;
      this.shoppingCartshow = false;
      this.buy_show = false;
    },
    handleTouchMove: function handleTouchMove(e) {
      // console.log(e);
      e.stopPropagation();
    },
    clearNum: function clearNum(num) {
      return Number(num).toFixed(0);
    },
    signIn: function signIn() {var _this11 = this;
      _ajax.default._post(_const.userSignIn).then(function (res) {
        if (res.code == 0) {
          _this11.signShow = true;
          _this11.getUserInfo();
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 4000 });

        }
      });
    },
    getUserInfo: function getUserInfo() {
      var that = this;
      _ajax.default._post(_const.userInfo).then(function (res) {
        if (res.code == 0) {;
          that.is_sign = res.data.info.is_sign;
        }
      });
    } },

  components: {
    headerTop: headerTop } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 101:
/*!******************************************************************************!*\
  !*** E:/和鞋一号/pages/common/shopGoodInfo.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./shopGoodInfo.vue?vue&type=style&index=0&lang=css& */ 102);
/* harmony import */ var _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 102:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/和鞋一号/pages/common/shopGoodInfo.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 95:
/*!****************************************************************!*\
  !*** E:/和鞋一号/main.js?{"page":"pages%2Fcommon%2FshopGoodInfo"} ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _shopGoodInfo = _interopRequireDefault(__webpack_require__(/*! ./pages/common/shopGoodInfo.vue */ 96));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shopGoodInfo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 96:
/*!*********************************************!*\
  !*** E:/和鞋一号/pages/common/shopGoodInfo.vue ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shopGoodInfo.vue?vue&type=template&id=7d95ff48& */ 97);
/* harmony import */ var _shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shopGoodInfo.vue?vue&type=script&lang=js& */ 99);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _shopGoodInfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shopGoodInfo.vue?vue&type=style&index=0&lang=css& */ 101);
/* harmony import */ var _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/common/shopGoodInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 97:
/*!****************************************************************************!*\
  !*** E:/和鞋一号/pages/common/shopGoodInfo.vue?vue&type=template&id=7d95ff48& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./shopGoodInfo.vue?vue&type=template&id=7d95ff48& */ 98);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_template_id_7d95ff48___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 98:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/和鞋一号/pages/common/shopGoodInfo.vue?vue&type=template&id=7d95ff48& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = _vm.getGoodsInfo ? _vm.clearNum(_vm.dataList.spe_price) : null
  var l0 = _vm.getGoodsInfo
    ? _vm.__map(_vm.goodList, function(item, index) {
        var $orig = _vm.__get_orig(item)

        var m1 = _vm.clearNum(item.spe_price)
        return {
          $orig: $orig,
          m1: m1
        }
      })
    : null

  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.show = false
    }

    _vm.e1 = function($event) {
      _vm.buy_show = false
    }

    _vm.e2 = function($event) {
      _vm.cart_show = false
    }

    _vm.e3 = function($event) {
      _vm.shoppingCartshow = false
    }

    _vm.e4 = function($event) {
      _vm.shareImgshow = false
    }

    _vm.e5 = function($event) {
      _vm.signShow = false
    }
  }

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 99:
/*!**********************************************************************!*\
  !*** E:/和鞋一号/pages/common/shopGoodInfo.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./shopGoodInfo.vue?vue&type=script&lang=js& */ 100);
/* harmony import */ var _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_9_3_20201014_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shopGoodInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

},[[95,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/common/shopGoodInfo.js.map