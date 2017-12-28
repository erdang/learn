//app.js
App({
  onLaunch: function (options) {
    console.log(options);
    var that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.setStorageSync('code', res.code);
        wx.request({
          url: 'https://www.mizhi.com/minapp/yima/cooperateLogin.php',
          data: {
            code: res.code
          },
          header: {},
          method: 'GET',
          dataType: 'json',
          success: function(res) {
            console.log(res);
            
            wx.setStorageSync('ticket', res.data.content.ticket);
            that.globalData.flag1 = true;
            if (res.data.content.act =='login'){
              
              
              // wx.setStorage({
              //   key: "lista",
              //   data: {
              //     listb: res.data.content.param.come_day,
              //     listc: res.data.content.param.cycle,
              //     listd: res.data.content.param.menses,
              //     liste: res.data.content.param.go_day
              //   }
              // })
              // wx.redirectTo({
              //   url: '../main/main'
              // })
            }else{
              // wx.redirectTo({
              //   url: '../addinfo/addinfo'
              // })
            }

          },
          fail: function(res) {},
          complete: function(res) {

           

          },
        })
      }
    })
    

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              that.globalData.flag2 = true;
              console.log(res);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    gloabalFomIds:[],
    flag1:false,
    flag2: false,
    okey:''
  },
  getUser(fn){
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo;
       
        fn(res.userInfo);
        
      }
    })
  },
  getlogin(fn){
    var that=this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.setStorageSync('code', res.code);
        wx.request({
          url: 'https://www.mizhi.com/minapp/yima/cooperateLogin.php',
          data: {
            code: res.code
          },
          header: {},
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            console.log(res);
            
            wx.setStorageSync('ticket', res.data.content.ticket);
            fn(res.data.content.ticket);
            that.globalData.flag1 = true;
            if (res.data.content.act == 'login') {


              // wx.setStorage({
              //   key: "lista",
              //   data: {
              //     listb: res.data.content.param.come_day,
              //     listc: res.data.content.param.cycle,
              //     listd: res.data.content.param.menses,
              //     liste: res.data.content.param.go_day
              //   }
              // })
              // wx.redirectTo({
              //   url: '../main/main'
              // })
            } else {
              // wx.redirectTo({
              //   url: '../addinfo/addinfo'
              // })
            }

          },
          fail: function (res) { },
          complete: function (res) {



          },
        })
      }
    })
  }
})