// pages/home/home.js
var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    searchlist: [],
    garInfoList: [],
    elements: [{
        title: '湿垃圾',
        name: 'Wet garbage',
        color: 'cyan',
        inGarName: '',
        describe: '湿垃圾又称为厨余垃圾、有机垃圾，即易腐垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。湿垃圾是居民日常生活及食品加工、饮食服务、单位供餐等活动中产生的垃圾，包括丢弃不用的菜叶、剩菜、剩饭、果皮、蛋壳、茶渣、骨头、动物内脏、鱼鳞、树叶、杂草等，其主要来源为家庭厨房、餐厅、饭店、食堂、市场及其他与食品加工有关的行业',
      picurl: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edZh34.png'
      },
      {
        title: '干垃圾',
        name: 'Dry garbage',
        color: 'blue',
        describe: '干垃圾即其它垃圾，指除可回收物、有害垃圾、厨余垃圾（湿垃圾）以外的其它生活废弃物。干垃圾是对垃圾按照可回收垃圾、厨余垃圾、有害垃圾分类后剩余下来的一种垃圾。',
        picurl: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edZR4U.png'
      },
      {
        title: '可回收垃圾',
        name: 'Recyclable waste',
        color: 'purple',
        describe: '可回收物就是可以再生循环的垃圾。本身或材质可再利用的纸类、硬纸板、玻璃、塑料、金属、塑料包装，与这些材质有关的如：报纸、杂志、广告单及其它干净的纸类等皆可回收',
        picurl: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edZfCF.png'
      },
      {
        title: '有害垃圾 ',
        name: 'Hazardous waste',
        color: 'mauve',
        describe: '有害垃圾指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。常见包括废电池、废荧光灯管、废灯泡、废水银温度计、废油漆桶、过期药品等。有害有毒垃圾需特殊正确的方法安全处理',
        picurl: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edZ4gJ.png'
      }
    ],
    swiperListUp: [{
      id: 0,
      type: 'image',
      url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edcofx.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edc5kR.jpg'
    }, {
      id: 2,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edcIt1.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/edch79.jpg'
    }],
    swiperListDowm: [{
      id: 0,
      type: 'image',
      url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/ed6jJ0.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/ed6Xiq.jpg'
    }, {
      id: 2,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/ed6bZj.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/ed6Lon.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/ed6qds.jpg'
    }, {
      id: 5,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/ed6vWV.jpg'
    }, {
      id: 6,
      type: 'image',
        url: 'https://garbage-1259206583.cos.ap-chengdu.myqcloud.com/garbage/ed6xzT.jpg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.towerSwiper('swiperListDowm');
    // 初始化towerSwiper 传已有的数组名即可
  },

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperListDowm: list
    })
  },

  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },

  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperListDowm;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperListDowm: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperListDowm: list
      })
    }
  },

  // 弹出窗口
  showModal(e) {
    console.log(e);
    this.setData({
      modalName: "Modal",
      title: e.currentTarget.dataset.target.title,
      content: e.currentTarget.dataset.target.describe,
      picsrc: e.currentTarget.dataset.target.picurl
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },

  // 输入垃圾名称
  inputGarrName(e) {
    console.log(e);
    this.data.inGarName = e.detail.value;
  },

  // 向后台发送请求查询垃圾
  searchGar(e) {
    var that = this;
    let garInfoList = [{}];
    var garName = this.data.inGarName;
    console.log("searchName", e);
    wx.request({
      url: api.GarbageSearch,
      method: 'POST',
      data: {
        garName: garName,
      },
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) {
          garInfoList[i] = {};
          garInfoList[i] = res.data[i];
        }
        that.setData({
          garInfoList: garInfoList,
          modalName: "garInfoView",
          modelTitle: garName
        });
      }
    })
  },

  // 全局抽屜
  showDrawer(e) {
    var that = this;
    let searchlist = [{}];
    that.setData({
      modalName: e.currentTarget.dataset.target
    });
    wx.request({
      url: api.GarbageList,
      method: 'POST',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) {
          searchlist[i] = {};
          searchlist[i].garbageName = res.data[i].garbageName;
          searchlist[i].searchNum = res.data[i].searchNum;
        }
        that.setData({
          searchlist: searchlist,
        }, )
      }
    });
  },
  hideDrawer(e) {
    this.setData({
      modalName: null
    });
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  // 搜索垃圾信息弹窗
  garInfo(e) {
    var that = this;
    let garInfoList = [{}];
    var garName = e.currentTarget.dataset.target;
    wx.request({
      // url: 'http://120.79.208.205:8080/Garbage/garbage/search',
      url: api.GarbageSearch,
      method: 'POST',
      data: {
        garName: garName,
      },
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        for (let i = 0; i < res.data.length; i++) {
          garInfoList[i] = {};
          garInfoList[i].claName = res.data[i].claName;
          garInfoList[i].garName = res.data[i].garName;
        }
        that.setData({
          garInfoList: garInfoList,
          modalName: "garInfoView",
          modelTitle: garName
        });
      }
    });
    console.log(garInfoList);
  }
})