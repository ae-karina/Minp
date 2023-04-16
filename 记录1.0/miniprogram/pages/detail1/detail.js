// pages/detail1/detail.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        qid:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        const qid = options.id;
        this.setData({
          qid:qid
        })
        console.log(this.data.qid);
        this.list(this.data.qid);
      
    },


  list(qid){
    const that = this
    db.collection('notes').where({
      _id : qid
    })
    .get()
    .then(res => { 
        console.log(res.data)
   
      that.setData({
      
        list:res.data[0]
      })

     
    })
    .catch(err => {
      console.log(err);
    })

   
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

   //立即发布
   submit(e){

    let that=this
   
    

          wx.showModal({
              title:"提示",
            content:"是否确定修改",
            success(res){
            if(res.confirm==true){
                          db.collection('notes').doc(that.data.qid).update({
                              data:{  
                               
                           
                                note:e.detail.value.daiban,
                                beizhu:e.detail.value.beizhu,              
                             
                               
                                
                               

                      
                              }
                          }).then(res=>{
                          
                              wx.showToast({
                                  title:'修改成功',
                                  icon:'none',
                                  duration:10000,
                                  success:function(){
                                    setTimeout(function(){
                            wx.switchTab({
                              url:'/pages/schedule/schedule',
                               })
                            
                            
                                    },1000);
                                  }
                                  })
                                  
                               
                          })
                      
                      }  
                  }    
              })  
    
            
    
          
  
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

    },


    del() {

        
      let qid=this.data.qid
		wx.showModal({
			title: '提示',
			content: '确定要删除吗？',
			success: function (sm) {
				if (sm.confirm) {
					// 用户点击了确定 可以调用删除方法了
                    db.collection('notes').doc(qid).remove()
                    wx.showToast({
                        title:'删除成功',
                        icon:'none',
                        duration:10000,
                        success:function(){
                          setTimeout(function(){
                            wx.switchTab({
                                url:'/pages/schedule/schedule',
                                 })
                
                
                          },1000);
                        }
                    })

              


				} else if (sm.cancel) {
					console.log('用户点击取消')
				}
			}
		})
    },
    
   wan(){
    let qid=this.data.qid
    wx.showModal({
    title:'提示',
    content:'确认完成',
    confirmText:'确定'
    })
    .then(res=>{
    if(res.confirm==true){
       
    wx.cloud.database().collection('notes').doc(qid).update({
    data:{
    status:1
    }
    })
    .then(result=>{
    this.list(this.data.qid)
    wx.showToast({
    title:'成功完成任务',
    })
    
    })
    }
    })
   } 
})