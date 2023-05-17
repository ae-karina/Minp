// pages/mycount/mycount.js
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
      nick: '', // 名称
      avatarUrl: '', //头像
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      db.collection("user").where({
        _openid:wx.getStorageSync('openid')
      }).get().then((res) => {
          console.log(res.data, "data");
            this.setData({
              nick: res.data[0].nick,
              avatarUrl: res.data[0].avatarUrl
            });
           
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    changepro(){
      var that=this
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'back',
        success(res) {
          console.log(res.tempFiles[0].tempFilePath)
          that.setData({
              avatarUrl: res.tempFiles[0].tempFilePath
            });
        }
      })
    },
     getInputValue(event){
      this.setData({
        nick:event.detail.value 
      })
    },
    phonecall(){
      wx.makePhoneCall({
        phoneNumber: '001-415-578-7342' //仅为示例，并非真实的电话号码
      })
    },

    submit(e) {
    console.log(e, "提交的用户信息");
    // // let that = this;
    // if (e.detail.value.nick == "") {
    //   wx.showToast({
    //     title: "不能为空",
    //     icon: "none",
    //   });
    // } else {
    //   wx.getUserProfile({
    //     desc: "用户完善个人信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中
    //     success: (res) => {
    //       console.log(res);
    //       console.log("个人信息", res.userInfo);
    //       this.getUserOpenId(e);
    //     },
    //   });
    // }
  },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})