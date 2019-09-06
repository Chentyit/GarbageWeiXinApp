var api = require('../../config/api.js');
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    multiIndex: [0, 0, 0],
    date: '0000-00-00',
    region: ['省', '市', '区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.data.date = e.detail.value;
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.data.region = e.detail.value;
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  textareaAInput(e) {
    this.data.textareaAValue = e.detail.value;
  },
  uploadOpinion(e) {
    var that = this;
    var adlist = this.data.region;
    var address = '';
    for (let i = 0; i < adlist.length; i++) {
      address = address + adlist[i];
      if (i + 1 < adlist.length) {
        address += '-';
      }
    }
    wx.request({
      url: api.OptionAdd,
      method: 'POST',
      data: {
        opDate: this.data.date,
        opAddress: address,
        opContent: this.data.textareaAValue,
      },
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res", res);
        if (res.data === true) {
          that.setData({
            modalName: 'bottomModal',
          })
        }
      }
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onLoad() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    this.setData ({
      date: Y + "-" + M + "-" + D,
    })
  }
})