// pages/biji/biji.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lines:[],
        show:false,
        tishi:"旅游",
    },

    onNewItem:function(e){
        wx.navigateTo({
            url: '../create/create'
          })
    },
    onEditItem:function(e){
        // console.log(e.currentTarget.dataset.nid)
        wx.navigateTo({
            url: '../edit/edit?edkey=' + e.currentTarget.dataset.nid
          })
    },



     //选择
choooType(e){
    let tishi=e.currentTarget.dataset.type
    wx.navigateTo({
        url: '../biji2/biji2?tishi=' + tishi
      })
      this.setData({
        tishi:tishi
      })
  
  },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
 var that = this;
        const db = wx.cloud.database()
        db.collection("createnote").get({
            success:function(res) {
            console.log('获取成功！',res.data)
            that.setData({
                lines: res.data,
            })
            
        }
        })    
    },

    show(){
        if(this.data.show==false){
            this.setData({
                show:true
            })
        }else{
            this.setData({
                show:false
            })
        }

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var that = this;
        const db = wx.cloud.database()
        db.collection('createnote').get({
         success:function(res){
        console.log(res.data)
        that.setData({
            lines: res.data
        })
      }
    })

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
