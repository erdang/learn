// pages/remind/remind.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon1:'../../images/start.png',
    icon2: '../../images/end.png',
    icon3: '../../images/water.png',
    icon4: '../../images/weishengjin.png',
    icon5: '../../images/pai.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的提醒'
    })
    this.saveFormIds();
    //this.requetTi();
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
    this.requetTi();
    this.saveFormIds();
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    return {
      title: '最简单、好用的贴心小管家',
      path: 'pages/main/main',
      imageUrl: '../../images/share2.png',
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  switch1Change1: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    
    this.requestSetTi('menses_start', e, this.requetTi);
   

  },
  switch1Change2: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    this.requestSetTi('menses_end', e, this.requetTi);
  

  },
  switch1Change3: function (e) {
    console.log('switch3 发生 change 事件，携带值为', e.detail.value)
    this.requestSetTi('drink', e, this.requetTi);
    

  },
  switch1Change4: function (e) {
    console.log('switch4 发生 change 事件，携带值为', e.detail.value)
    this.requestSetTi('tampon', e, this.requetTi);
   

  },
  switch1Change5: function (e) {
    console.log('switch5 发生 change 事件，携带值为', e.detail.value)
    this.requestSetTi('pregnant', e, this.requetTi);
    

  },
 requetTi(){
   var ticket = wx.getStorageSync('ticket');
   var that=this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/myRemind.php',
      data:{
        ticket_ym:ticket
      } ,
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res);
        var json1={
          title: res.data.content.menses_start.title,
          switch1: res.data.content.menses_start.switch,
          title_msg: res.data.content.menses_start.title_msg,
          sub_msg: res.data.content.menses_start.sub_msg,
          d: res.data.content.menses_start.tm_config.d,
          time: res.data.content.menses_start.tm_config.time
        };
         var json2={
           title: res.data.content.menses_end.title,
           switch1: res.data.content.menses_end.switch,
           title_msg: res.data.content.menses_end.title_msg,
           sub_msg: res.data.content.menses_end.sub_msg,
           d: res.data.content.menses_end.tm_config.d,
           time: res.data.content.menses_end.tm_config.time
        };
         
         var json3 = {
           title: res.data.content.drink.title,
           switch1: res.data.content.drink.switch,
           title_msg: res.data.content.drink.title_msg,
           sub_msg: res.data.content.drink.sub_msg,
           d: res.data.content.drink.tm_config
         };
         var json4 = {
           title: res.data.content.tampon.title,
           switch1: res.data.content.tampon.switch,
           title_msg: res.data.content.tampon.title_msg,
           sub_msg: res.data.content.tampon.sub_msg,
           d: res.data.content.tampon.tm_config
         };
         var json5 = {
           title: res.data.content.pregnant.title,
           switch1: res.data.content.pregnant.switch,
           title_msg: res.data.content.pregnant.title_msg,
           sub_msg: res.data.content.pregnant.sub_msg,
           d: res.data.content.pregnant.tm_config.d,
           time: res.data.content.pregnant.tm_config.time
         };

       
       
        that.setData({
          json1,
          json2,
          json3,
          json4,
          json5
        });
       },
      fail: function (res) { },
      complete: function (res) { },
    })
 },
 requestSetTi(type,e,fn){
   var ticket = wx.getStorageSync('ticket');
   wx.request({
     url: 'https://www.mizhi.com/minapp/yima/setRemind.php',
     data: {
       type: type,
       switch: e.detail.value == true ? 1 : 0,
       ticket_ym:ticket
     },
     header: {},
     method: 'GET',
     dataType: 'json',
     success: function (res) {
        console.log(res);
        fn&&fn();
     },
     fail: function (res) { },
     complete: function (res) { },
   })
 },
 tojingStart(){
   var da=this.data.json1.d;
   var db = this.data.json1.time;
   console.log(da);
   wx.navigateTo({
     url: "../mensestart/mensestart?d=" + da+"&time="+db
     
   })
 },
 tojingEnd() {
   var da = this.data.json2.d;
   var db = this.data.json2.time;
   console.log(da);
   wx.navigateTo({
     url: "../mensesend/mensesend?d=" + da + "&time=" + db

   })
 },
 tojingDrink() {
   var da = JSON.stringify(this.data.json3.d);
  
   console.log(da);
   wx.navigateTo({
     url: "../drink/drink?d=" +da

   })
 },
 tojingTampon() {
   var da = JSON.stringify(this.data.json4.d);

   console.log(da);
   wx.navigateTo({
     url: "../tampon/tampon?d=" + da

   })
 },
 tojingPre() {
   var da = this.data.json5.d;
   var db = this.data.json5.time;
   console.log(da);
   wx.navigateTo({
     url: "../pregnant/pregnant?d=" + da + "&time=" + db

   })
 },
 formSubmit: function (e) {
   let formId = e.detail.formId;
   this.dealFormIds(formId); //处理保存推送码
   let type = e.detail.target.dataset.type;
   //根据type的值来执行相应的点击事件
   //...
   console.log(formId);
 },
 dealFormIds: function (formId) {
   let formIds = app.globalData.gloabalFomIds;//获取全局数据中的推送码gloabalFomIds数组
   if (!formIds) formIds = [];
   let data = {
     formId: formId,
     expire: parseInt(new Date().getTime() / 1000) + 604800 //计算7天后的过期时间时间戳
   }
   formIds.push(data);//将data添加到数组的末尾
   app.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
   console.log(app.globalData.gloabalFomIds);
 },
 saveFormIds: function () {
   var formIds = app.globalData.gloabalFomIds; // 获取gloabalFomIds
   var ticket = wx.getStorageSync('ticket');
   console.log(formIds);
   if (formIds.length) {
     formIds = JSON.stringify(formIds);
     app.globalData.gloabalFomIds = '';
     wx.request({//通过网络请求发送openId和formIds到服务器
       url: 'https://www.mizhi.com/minapp/yima/addFormId.php',
       method: 'GET',
       data: {
         ticket_ym: ticket,
         formId: formIds
       },
       success: function (res) {
       }
     });
   }

 }

})