// pages/record/record.js
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
    var that = this;
    
    wx.setNavigationBarTitle({
      title: '姨妈记录'
    })
    this.saveFormIds();
    this.requestDa();
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
  onReachBottom: function (e) {
    console.log(e);
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

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  requestDa(){
    var that=this;
    var ticket = wx.getStorageSync('ticket');
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/record.php',
      data:{
        ticket_ym:ticket
      },
      method:'GET',
      success:function(r){
          console.log(r);
          var dataman=[];
          for (var i = 0; i < r.data.content.list.length;i++){
          
            dataman.push({
              come_day: r.data.content.list[i].come_day,
              cycle: r.data.content.list[i].cycle,
              menses: r.data.content.list[i].menses
            });
          }
          
        that.setData({
          dataman: dataman
        });
      }
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