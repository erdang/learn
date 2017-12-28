// pages/drink/drink.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: '8杯水提醒'
    })
    this.saveFormIds();
    var jsona = JSON.parse(options.d);
    
    console.log(jsona);
    this.setData({
      jsona
    });
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
    var valswitch = e.detail.value==true?1:0;
    this.requestOne('drink', 0, '8:00', 1, valswitch);

  },
  switch1Change2: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var valswitch = e.detail.value == true ? 1 : 0;
    this.requestOne('drink', 0, '9:00', 2, valswitch);

  },
  switch1Change3: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var valswitch = e.detail.value == true ? 1 : 0;
    this.requestOne('drink', 0, '11:30', 3, valswitch);

  },
  switch1Change4: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var valswitch = e.detail.value == true ? 1 : 0;
    this.requestOne('drink', 0, '13:30', 4, valswitch);

  },
  switch1Change5: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var valswitch = e.detail.value == true ? 1 : 0;
    this.requestOne('drink', 0, '15:30', 5, valswitch);

  },
  switch1Change6: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var valswitch = e.detail.value == true ? 1 : 0;
    this.requestSetTi('drink', 0, '17:30', 6, valswitch);

  },
  switch1Change7: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var valswitch = e.detail.value == true ? 1 : 0;
    this.requestOne('drink', 0, '19:00', 7, valswitch);

  },
  switch1Change8: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var valswitch = e.detail.value == true ? 1 : 0;
    this.requestOne('drink', 0, '20:30', 8, valswitch);

  },
  requestOne(type, d, time, valn, valswitch){
    var ticket = wx.getStorageSync('ticket');
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/updateRemindTm.php',
      data: {
        type: type,
        d:d,
        time:time,
        valn: valn,
        valswitch: valswitch,
        ticket_ym: ticket
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {

      },
      fail: function(res) {},
      complete: function(res) {},
    })
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