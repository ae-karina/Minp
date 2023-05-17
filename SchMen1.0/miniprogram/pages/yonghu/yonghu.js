// pages/yonghu/yonghu.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud
      .database()
      .collection("user")
      .get()
      .then((res) => {
        this.setData({
          list: res.data,
        });
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  // wx.cloud.callFunction({
  //   //调用云函数？
  //   name: "openid", //云函数名
  //   success(res) {
  //     wx.setStorageSync("openid", res.result.openid); //将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容
  //     console.log("唯一标识", res.result.openid);
  //   },
  // });
  // db.collection("user")
  //   .where({
  //     _openid: wx.getStorageSync("openid"),
  //   })
  //   .get()
  //   .then((res) => {
  //     console.log(res.data, "hhhh");
  //     if (res.data.length == 0) {
  //       wx.showLoading({
  //         title: "登录中",
  //       });
  //       db.collection("user")
  //         .add({
  //           data: {
  //             nick: e.detail.value.nick,
  //             avatarUrl: that.data.avatarUrl,
  //           },
  //         })
  //         .then((res) => {
  //           that.setData({
  //             judgedeng: true,
  //           });
  //           this.onLoad();
  //           wx.hideLoading();
  //           wx.showToast({
  //             title: "登录成功",
  //             icon: "none",
  //           });
  //         });
  //     } else {
  //       db.collection("user")
  //         .where({
  //           _openid: wx.getStorageSync("openid"),
  //         })
  //         .update({
  //           data: {
  //             nick: e.detail.value.nick,
  //             avatarUrl: that.data.avatarUrl,
  //           },
  //         })
  //         .then((res) => {
  //           this.onLoad();
  //           that.setData({
  //             judgedeng: true,
  //           });
  //           wx.showToast({
  //             title: "登录成功",
  //             icon: "none",
  //           });
  //         });
  //     }
  //   });
});
