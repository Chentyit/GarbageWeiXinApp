// pages/camera/camera.js
var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garName: "",
    garInfoList: [],
  },

  takePhoto() {
    var that = this;
    let garInfoList = [{}];
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log("path", res.tempImagePath);
        this.setData({
          src: res.tempImagePath
        });
        wx.uploadFile({
          url: api.GarbageImage,
          filePath: res.tempImagePath,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function(res) {
            var json = JSON.parse(res.data);
            console.log(json);
            for (let i = 0; i < json.length; i++) {
              garInfoList[i] = {};
              garInfoList[i].claName = json[i].claName;
              garInfoList[i].garName = json[i].garName;
            }
            that.setData({
              garInfoList: garInfoList,
              modalName: "garInfoView",
            });
          },
          fail: function(err) {
            console.log(err)
          }
        });
      }
    });
  },
  error(e) {
    console.log(e.detail)
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },
})