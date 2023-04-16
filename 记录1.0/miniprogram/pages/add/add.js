let db=wx.cloud.database()
Page({
  data: {
   
    
    images:[],
  
   
     inputbiaoqian:'',
    index: 0,
  
    array: ['点击选择','生活','学习', '购物','其他'],
  },
  

  bindPickerChange: function(e) {
    
    console.log(e.detail)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value==0) {
      this.setData({
        index: e.detail.value
      })
    }else{
      this.setData({
        index: e.detail.value,
        inputbiaoqian:this.data.array[e.detail.value]
      })
    }
      
      console.log(this.data.inputbiaoqian)
  },
 
  


  
  
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
  else{
    wx.chooseVideo({
    sourceType:["album","camera"],
    maxDuration:60,
    camera:"back",

    success(res){
      wx.showLoading({
        title:'上传中',
        })
      console.log(res.tempFilePath)
     
    let time=Date.now()
    wx.cloud.uploadFile({
      cloudPath:'shipin/'+time,
      filePath:res.tempFilePath,
    })

    .then(res=>{
      that.setData({
      upvideo:true,
    video:res.fileID
  
      })
      wx.hideLoading()
      wx.showToast({
      title:'成功添加',
      icon:'none'
      })

    
    })
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
submitform(e){
   
  let nick=wx.getStorageSync('message')
  let that=this
  
    if(!wx.getStorageSync('message')){//判断是否已登录
    wx.showModal({
     title:"失败",
  content:"未登录",
    success(res){
  if(res.confirm==true){
    wx.switchTab({
    url:'/pages/my/my',
   })
  }
  }
  })
  }
     else{
       
  if(e.detail.value.contain==""){
  wx.showToast({
  title:'输入内容',
  icon:'none'
  
  })
  }
     else{
    wx.showModal({
    title:"提示",
  content:"发布",
  success(res){
  if(res.confirm==true){
  
db.collection("friends").add({
  data:{
  contentsrc:that.data.images,
  bosstoursc:nick.avatarUrl,
  nick:nick.nick,
  content:e.detail.value.contain,

  con:that.data.inputbiaoqian,
  tishi:"社区",
  speaklist:[],

  skan:0,
  time: Date.now(),
 
  
  
  
  }
  })
  .then(res=>{

    wx.showToast({
      title:'发布成功',
      icon:'none',
      duration:10000,
      success:function(){
        setTimeout(function(){
wx.navigateTo({

  url:'/pages/shequ/shequ',
   })


        },1000);
      }
   
  
  })

  
})

    
  



 

  }
}
    })
  
     }
  

  }
  
  },

})