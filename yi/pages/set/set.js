// pages/set/set.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightnext:'../../images/rightnext.png',
    bgicon: '../../images/bg.png',
    closeicon: '../../images/close.png',
    
    showPi: false,//pickerview 显示
    showPi2: false,//pickerview 显示
    showPi3: false,//pickerview 显示
    picker_val: [0],
    picker_val2: [0],
    picker_val3: [0],
    daynum:0,
    isBindShow:false,
    isBindShowb:true,
    showA:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that=this;
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.saveFormIds();
    this.requsetBind();
    var Dat = new Date();
    var ayy = [];
    var yeaf=[];
    let nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
    for (let i = 0; i <= 44; i++) {
      let gDate = new Date(parseInt(nowd) + i * 24 * 3600 * 1000);
      let gd = add((gDate.getMonth() + 1)) + '月' + add(gDate.getDate()) + '日';
      var yea = gDate.getFullYear();
      yeaf.push(yea);
      ayy.push(gd);
    }
  
    let bnum = [];
    for (let i = 2; i <= 7; i++) {
      bnum.push(i);
    }
    
    function add(n) {
      return n < 10 ? '0' + n : '' + n;
    }

    let anum = [];
    for (let i = 20; i <= 45; i++) {
      anum.push(i);
    }

    wx.getStorage({
      key: 'lista',
      success: function (res) {
        //2017-12-23
        var indexdata = res.data.listb.substring(5, 7) + '月' + res.data.listb.substring(8)+'日';
        console.log(res.data)
        var indexb = ayy.indexOf(indexdata);
        that.setData({
          daynum: res.data.listc - 20,
          picker_val: [res.data.listc - 20],
          daynum3: res.data.listd - 2,
          picker_val3: [res.data.listd - 2],
          daynum2: indexb,
          picker_val2: [indexb]
        });
      },
      fail: function (r) {
        console.log(r)
      }
    })    
    
    app.getUser(function(r){

      that.setData({
        userinfo:r
      });
    });
    
    this.setData({
      array: ayy,
      index: 44,
      arraynum: anum,
      indexnum: 0,
      jarray: bnum,
      jnum: 0,
      yeaf:yeaf
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
    if (res.from === 'button') {
      console.log(this.data.userinfo);
      var that = this;
      var kl = wx.getStorageSync('lista');
      var okey = {
        avatarUrl: this.data.userinfo.avatarUrl,
        nickName: this.data.userinfo.nickName,
        ticket: wx.getStorageSync('ticket'),
        come_day: kl.listb,
        cycle: kl.listc,
        menses: kl.listd,
        go_day: kl.liste

      };



      return {
        title: '亲爱的，想让你知道我的羞羞小秘密',
        path: 'pages/main/main?okey=' + JSON.stringify(okey),
        imageUrl: '../../images/share.png',
        success: function (res) {
          // 转发成功
          that.setData({
            isBindShow: false
          });
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }else{
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
    }
   
  },
  piclikc: function (e) {
    this.setData({
      showPi: true,
      showPi2: false,
      showPi3: false
    });
  },
  piclikc2: function (e) {
    this.setData({
      showPi: false,
      showPi2: true,
      showPi3: false
    });
  },
  piclikc3: function (e) {
    this.setData({
      showPi: false,
      showPi2: false,
      showPi3: true
    });
  },
  piChange: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_val: e.detail.value
    })
  },
  piChange2: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_val2: e.detail.value
    })
  },
  piChange3: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_val3: e.detail.value
    })
  },
  tapPiBtn(e) {
    const type = e.currentTarget.dataset.type;
    
    
    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      var daynum = 0;
      daynum = this.data.picker_val;
    }

    this.setData({
      daynum: daynum,
      showPi: false
    });
  },
  tapPiBtn2(e) {
    const type = e.currentTarget.dataset.type;


    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      var daynum2 = 0;
      daynum2 = this.data.picker_val2;
    }

    this.setData({
      daynum2: daynum2,
      showPi2: false
    });
  },
  tapPiBtn3(e) {
    const type = e.currentTarget.dataset.type;


    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      var daynum3 = 0;
      daynum3 = this.data.picker_val3;
    }

    this.setData({
      daynum3: daynum3,
      showPi3: false
    });
  },
  toYiji(){
    wx.navigateTo({
      url: '../record/record'
    })
  },
  nextto(){
    var that=this;
    let Dat = new Date();
    let year = this.data.yeaf[this.data.daynum2];
    let montth = this.data.array[this.data.daynum2].substring(0, 2);
    let day = this.data.array[this.data.daynum2].substring(3, 5);
    wx.getStorage({
      key: 'lista',
      success: function (res) {
        console.log(res.data)
        wx.setStorage({
          key: "lista",
          data: {
            listb: year + '-' + montth + '-' + day,
            listc: that.data.arraynum[that.data.daynum],
            listd: that.data.jarray[that.data.daynum3],
            liste: res.data.liste
          }
        })
        that.requestD(that.data.arraynum[that.data.daynum], that.data.jarray[that.data.daynum3], year + '-' + montth + '-' + day, res.data.liste);
      }
    })  
    var that = this;
    var kl = wx.getStorageSync('lista');
    var okey = {
      avatarUrl: this.data.userinfo.avatarUrl,
      nickName: this.data.userinfo.nickName,
      ticket: wx.getStorageSync('ticket'),
      come_day: kl.listb,
      cycle: kl.listc,
      menses: kl.listd,
      go_day: kl.liste

    };
    
 
    // wx.reLaunch({
    //   url: '../main/main?okey=' + JSON.stringify(okey)
    // })
    wx.reLaunch({
      url: '../main/main'
    })
  },
  requestD(cycle, menses, come_day, goday){
    var ticket = wx.getStorageSync('ticket');
    var that=this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/setParam.php',
      data: {
        cycle: cycle,
        menses: menses,
        come_day:come_day,
        ticket_ym:ticket,
        go_day:goday
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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

  },
  closeTi(){
    
    this.setData({
      isBindShow:false
    });
  },
  bindN() {

    this.setData({
      isBindShow: true
    });
  },
  requsetBind(){
    var ticket = wx.getStorageSync('ticket');
    var that=this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/isbind.php',
      data:{
        ticket_ym: ticket
      } ,
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if (res.data.content.is_bind==0){
            that.setData({
             
              isBindShowb: true
            });
        }else{
          that.setData({
            binduser: res.data.content.bind_user,
            isBindShowb: false
          });
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  unbindN(){
   

    this.setData({
      showA:true
    })
    
  },
  tapyes() {
    var ticket = wx.getStorageSync('ticket');
    var that = this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/unbind.php',
      data: {
        ticket_ym: ticket
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.flag == '001') {
          that.requsetBind();
          wx.showToast({
            title: res.data.content,
            icon: 'success',
            duration: 2000
          })
          that.setData({
            isBindShow: false,
            isBindShowb: true,
            showA:false
          });
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  

  },
  taperror() {
    this.setData({
      showA: false
    })
  }
  
})