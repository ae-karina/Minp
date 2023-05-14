const db = wx.cloud.database().collection("notes")
//1. 获取数据库引用
//2. 构造查询语句
// collection 方法获取一个集合的引用

Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        dayStyle:[
            {month: 'current', 
            day: new Date().getDate(), 
            color: 'white', 
            background: '#AAD4F5' 
            },//保持当前日期的颜色
            {month: 'current', 
            day: new Date().getDate(), 
            color: 'white', 
            background: '#AAD4F5' 
            },//选中的日期颜色更改
        ],
        hiddenmodalput:true, //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
        note:[],
      
        day:'',
        month:'',
        year:''
    },

    //单击日期变色 添加日程  显示相应日期的日程
    dayClick:function(e){
        var year=e.detail.year
        var month=e.detail.month
        var day=e.detail.day


        var changeday="dayStyle[1].day"
        var changeBg="dayStyle[1].background"
        this.setData({
            [changeday]: day,
            [changeBg]: "#e8989a",//？
            day:day,
            month:month,
            year:year,
        })
       
        var that= this
        wx.cloud.database().collection("notes").orderBy('time','desc').where({
            day:day,
            month:month,//点中哪个日期就显示哪个日期
            year:year,
            _openid: wx.getStorageSync('openid') || []
        }).get({  //获取集合数据，或获取根据查询条件筛选后的集合数据
            success(res){       
                that.setData({ //通过setData，将res中的数据存入到note数组当中
                  note:res.data          
                }),
                console.log(res.data,'99')   ///打印看一下  
              }
        })
    },
 
    //监听点击日历标题选择器
    dateChange: function (event) {
        console.log(event.detail)
    },
    //监听点击上一个月
    prev: function (event) {
        console.log(event.detail)
    },
    //监听点击下一个月
    next: function (event) {
        console.log(event.detail)
    },
    //添加日程
    // addnote:function(e){
    //     this.setData({
    //         hiddenmodalput: false
    //     })
    // },
    // inputNote:function(e){
    //     this.setData({
    //         note:e.detail.value
    //     })
    // },
  
    // cancel:function(){
    //     this.setData({
    //         hiddenmodalput: true
    //     })
    // },

    async onLoad(){
        const db = wx.cloud.database()
        let count =await db.collection("notes").where({
             _openid: wx.getStorageSync('openid')|| [] 
        }).count()
        count = count.total
        // console.log(count)
        // console.log(wx.getStorageSync('openid'))
        let all = []
        for (let i =0;i<count;i+=20){
             let list =await db.collection("notes").where({
                            _openid: wx.getStorageSync('openid')|| [] // 填入当前用户 openid
                        }).orderBy('time','desc').skip(i).get()
                        // console.log(list)
            all =all.concat(list.data)
            this.setData({
                note:all,
            })
        console.log(this.data.note)
        }
    },
    onShow:function(){
        this.onLoad()
        // var that= this
        // wx.cloud.database().collection("notes").orderBy('time','desc').where({
        //     _openid: wx.getStorageSync('openid') || []
        // }).get({
        //     success(res){  
        //         that.setData({ //通过setData，将res中的数据存入到note数组当中
        //           note:res.data,
        //         }),
        //         console.log(res.data,'99')   ///打印看一下  
        //       }
        // })
    },
    add2(){
        wx.navigateTo({
            url: '/pages/add2/add2',
        })
    },
    // 具体数据是来自event，currentTarget
    // 写好跳转页面的跳转方法和url，实现带参数跳转
    goToqcxxy(e) {
        let id=e.currentTarget.dataset.id
        console.log(id,"444")
        wx.navigateTo({
            url:'/pages/detail1/detail?id='+id
        })
    },
    

  
})