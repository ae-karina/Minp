let db=wx.cloud.database()
Page({
  data: {
   
    images:[],
    inputbiaoqian:'投诉',
    
    index: 0,
    array: ['投诉','表扬','咨询','建议'],
   
   
  },
  

  bindPickerChange: function(e) {
    
    console.log(e.detail)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value==0) {
      this.setData({
        index: e.detail.value,
        inputbiaoqian:this.data.array[0]

      })
    }else{
      this.setData({
        index: e.detail.value,
        inputbiaoqian:this.data.array[e.detail.value]
      })
    }
      
      console.log(this.data.inputbiaoqian)
  },
 
  
 // lei

  
  
  //上传到云存储
  upimages(){
  let that=this
  wx.showActionSheet({
  itemList:['上传图片'],
  success(res){
   


  console.log(res.tapIndex)
  if(res.tapIndex==0){
  wx.chooseImage({
  count:9,
  sizeType:['original'],
  sourceType:['album','camera'],
  success(res){
    wx.showLoading({
      title:'上传中',
      })
  console.log(res.tempFilePaths)
  let time=Date.now()
  for(var i=0;i<res.tempFilePaths.length;i++){
  wx.cloud.uploadFile({
  cloudPath:"friends.images/"+time+i,//文件名字
  filePath:res.tempFilePaths[i] //文件
  
  })
  .then(res=>{
  that.setData({
  images:that.data.images.concat(res.fileID)
  })
  wx.hideLoading()
wx.showToast({
title:'成功添加',
icon:'none'
})
  })
  }
  }
  })
  }
  
  }
})
  },

  //删除图片
  deleteimage(e){
    console.log(e)
    let that=this
    let dele=e.currentTarget.dataset.src
    let images=that.data.images
    for(var i=0;i<images.length;i++){
    if(images[i]==dele){
    images.splice(i,1)
    that.setData({
    images:images
    })
    }
    }
    },




 
//时间
getNowFormatDate: function () {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
   strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
   " " + date.getHours() + seperator2 + date.getMinutes() +
   seperator2 + date.getSeconds();
  return currentdate;
 },





 
//发布
submit(e){
   
 
  let that=this
  
  

    wx.showModal({
      title:"提示",
      content:"确认信息填写完成",
  success(res){
  if(res.confirm==true){
   
db.collection("fankui").add({
  data:{
  image:that.data.images,

  time: Date.now(),
  time:that.getNowFormatDate(),
  content:e.detail.value.contents,
  leix:that.data.inputbiaoqian,
 


  
  
  
  }
  })
  .then(res=>{

    wx.showToast({
      title:'提交成功',
      icon:'none',
      duration:10000,
      success:function(){
        setTimeout(function(){
wx.switchTab({
  url:'/pages/index/index',
   })


        },1000);
      }
   
  
  })

  
})

    
 



 

  }
}
    })
  
     
  

  
  
  },

})