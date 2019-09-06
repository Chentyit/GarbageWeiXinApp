var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{}],
    load: true,
    swiperList: [{
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
  },

  onLoad() {
    var that = this;
    let list = [{}];
    wx.request({
      url: api.GarbageAllInfoList,
      method: 'POST',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("garAllInfo", res);
        for (let i = 0; i < res.data.length; i++) {
          list[i] = {};
          list[i].claName = res.data[i].claName;
          list[i].id = i;
          list[i].garNameList = res.data[i].garNameList;
        }
        that.setData({
            list: list,
            listCur: list[1]
          },
        )
      }
    });
    console.log("list", list);

  },

  onReady() {
    wx.hideLoading()
  },

  // 点击触发函数
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    });
    console.log(e);
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})