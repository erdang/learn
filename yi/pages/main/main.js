var app = getApp();
let choose_year = null,
  choose_month = null;

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 1, //预设当前项的值
    timeicon:'../../images/time.png',
    seticon: '../../images/set.png',
    previcon:'../../images/prev.png',
    nexticon: '../../images/next.png',
    loveicon: '../../images/love.png',
    loveicon2: '../../images/love2.png',
    cancle:'../../images/X.png',
    cancle2: '../../images/G.png',
    comeicon:'../../images/comeicon.png',
    goicon: '../../images/goicon.png',
    xiu:'../../images/xiu.png',
    infos: [],//圆盘数据
    infob:{},//中间圆环数据
    indexa: 0,//按钮选择日期
    arraya:[],//按钮选择日期
    arrayd:[],
    arraye: [],
    listg:{},//存储的数据
    showPi:false,//pickerview 显示
    showPid: false,
    showBe: false,
    showB: false,//pickerview 显示
    picker_val:[6],
    picker_valb: [6],
    picker_vald: [6],
    picker_vale: [6],
    hasEmptyGrid: false,//日历每月前面的空格
    showPicker: false,
    days:[],//日历显示
    aiai:false,//爱爱
    allday:'',//总周期
    yimaday:'',//姨妈期
    yimamsg:'',
    showMan:false,
    showMan2: false,
    wobj:{}


  },
  onShow(){
    this.saveFormIds();
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e.detail.current);
    if (e.detail.current==0){
      wx.setNavigationBarTitle({
        title: '统计'
      })
    } else if (e.detail.current == 1){
      wx.setNavigationBarTitle({
        title: '姨妈小管家'
      })
    } else if (e.detail.current == 2){
      wx.setNavigationBarTitle({
        title: '日历'
      })
    }
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  requestnew(option,ticket){
    var that=this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/isNew.php',
      data: {
        ticket_ym:ticket
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res);
        if (res.data.content.is_new==0){
          if (option.okey){
            var wobj = JSON.parse(option.okey);
            console.log(wobj);
            wx.setStorage({
              key: "lista",
              data: {
                listb: wobj.come_day,
                listc: wobj.cycle,
                listd: wobj.menses,
                liste: wobj.go_day
              }
            })
            that.setData({
              showMan2: true,
              wobj: JSON.parse(option.okey)
            });
            }else{

              if (res.data.content.bind!= '') {
                that.setData({
                  showMan: true,
                  wobj: {
                    nickName: res.data.content.bind.alias
                  }
                });
              }else{
                that.setData({
                  showMan: false,
                  showMan2: false
                });
                wx.redirectTo({
                  url: '../addinfo/addinfo'
                })
              }
              
            }
        }else{
          if (option.okey) {
            var wobj = JSON.parse(option.okey);
            console.log(wobj);
            wx.setStorage({
              key: "lista",
              data: {
                listb: wobj.come_day,
                listc: wobj.cycle,
                listd: wobj.menses,
                liste: wobj.go_day
              }
            })
            that.setData({
              showMan2: true,
              showMan: true,
              wobj: JSON.parse(option.okey)
            });
          } else{
            if (res.data.content.bind!=''){
              wx.setStorageSync('listmm', res.data.content.bind.alias)
            
              that.setData({
                showMan: true,
                wobj:{
                  nickName: res.data.content.bind.alias
                }
              });
              
            }
          }
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function (option) {
    console.log(option);
    var that = this;
    app.getlogin(function (ticket){
      that.requestnew(option,ticket);
      clearInterval(timer);
      var timer = setInterval(function () {
        var flag1 = app.globalData.flag1;
        if (flag1 == true) {
          that.requsetM(abc);
          clearInterval(timer);
        }
      }, 10);
      console.log(that.data.wobj);
      console.log(wx.getStorageInfoSync('listmm'));
    });
    
    
   

     
  
    
    wx.showLoading({
      title: '加载中',
    })
    
    if (option.showMan){
      this.setData({
        showMan: true
      });
    }
   
    wx.setNavigationBarTitle({
      title: '姨妈小管家'
    })
  
    
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 98;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
      
   function abc(){
     wx.getStorage({
       key: 'lista',
       success: function (res) {
         console.log(res.data)
         that.requestData(res.data.listb, res.data.listc, res.data.listd, res.data.liste);
         that.listg = res.data;

         // let kdate=res.data.listb.substring(5, 7)+'月'+res.data.listb.substring(8, 10)+'日';   
         // console.log(that.data.arraya);
         // console.log(that.data.arraya.indexOf(kdate));
         that.requestRili(res.data.listb, res.data.listc, res.data.listd, '', res.data.liste);

       },
       fail: function (r) {
         console.log(r)
       }
     })
     //日历
     const date = new Date();
     const cur_year = date.getFullYear();
     const cur_month = date.getMonth() + 1;
     const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
     that.calculateEmptyGrids(cur_year, cur_month);
     that.calculateDays(cur_year, cur_month);
     that.setData({
       cur_year,
       cur_month,
       weeks_ch
     });
     //统计

     that.requestTongji();
   }
    
  },
  requsetM(fn){
    var ticket=wx.getStorageSync('ticket');
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/getParam.php',
      data: {
        ticket_ym:ticket
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {

        wx.setStorage({
          key: "lista",
          data: {
            listb: res.data.content.come_day,
            listc: res.data.content.cycle,
            listd: res.data.content.menses,
            liste: res.data.content.go_day
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {
        fn()
      },
    })
  },
  requestData: function (comeday, cycle, menses,goday){
    var that = this;
    console.log(goday);
    //  请求数据
    wx.request({
      url: "https://www.mizhi.com/minapp/yima/index.php",
      data: {
        come_day: comeday,
        cycle: cycle,
        menses: menses,
        go_day:goday
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        //圆盘数据
        wx.hideLoading();
        let info = [];
        let infoa = [];
        let ylength = res.data.content.list.length;
        for (var i = 0; i < ylength; i++) {
          if (res.data.content.list[i].day_tip!=''){
             res.data.content.list[i].day_tip = res.data.content.list[i].day_tip.substring(5, 7) + '月' + res.data.content.list[i].day_tip.substring(8, 10)+'日';
          }
         
          var theta = Math.round(360 / ylength) * i * Math.PI / 180 ;
         var top =  305-Math.cos(theta)*305+'rpx'
          var left =  305+Math.sin(theta)*305+'rpx'
          // var theta = parseInt(360 / ylength * i) ;
          // var top = '';
          // var left = '';
          
          
            console.log(ylength/2);
         if(i==0){
           left = 270 + Math.sin(theta) * 250 + 'rpx'
           top = 290 - Math.cos(theta) * 250 + 'rpx'
         } else if (ylength / 2>i>0){
           left = 220 + Math.sin(theta) * 250 + 'rpx'
           top = 280 - Math.cos(theta) * 250 + 'rpx'
         } else if (i == ylength / 2){

         } else if (ylength / 2 < i < ylength ){
           left = 300 + Math.sin(theta) * 250 + 'rpx'
           top = 280 - Math.cos(theta) * 250 + 'rpx'
         } else if (i==ylength){

         }
          
          
          
          var rot='0 0';
         // console.log(left+'-'+top);
          
          if (res.data.content.list[i].period==1){
              
              if (res.data.content.list[i].day_sign=='-1'){
                  info.push({
                    id: i,
                    reg: 360 / ylength * i,
                    class: 'fo sred',
                    classa: 'red',
                    delay: i / 10,
                    daytip: res.data.content.list[i].day_tip,
                    left:left,
                    top:top,
                    rot: rot
    
                  })
              } else if (res.data.content.list[i].day_sign == '1'){
                  info.push({
                    id: i,
                    reg: 360 / ylength * i,
                    class: 'fo',
                    classa: 'red',
                    delay: i / 10,
                    daytip: res.data.content.list[i].day_tip,
                    left: left,
                    top: top,
                    rot: rot
                  })
              } else if (res.data.content.list[i].day_sign == '0'){
                  info.push({
                    id: i,
                    reg: 360 / ylength * i,
                    setflower:'../../images/redflower.png',
                    class: 'fo',
                    classa: 'red',
                    delay: i / 10,
                    daytip: res.data.content.list[i].day_tip,
                    left: left,
                    top: top,
                    rot: rot
                  })
              }
          } else if (res.data.content.list[i].period == 2){
              if (res.data.content.list[i].day_sign == '-1') {
                info.push({
                  id: i,
                  reg: 360 / ylength * i,
                  class: 'fo sgreen',
                  classa: 'green',
                  delay: i / 10,
                  daytip: res.data.content.list[i].day_tip,
                  left: left,
                  top: top,
                  rot: rot
                })
              } else if (res.data.content.list[i].day_sign == '1') {
                info.push({
                  id: i,
                  reg: 360 / ylength * i,
                  class: 'fo',
                  classa: 'green',
                  delay: i / 10,
                  daytip: res.data.content.list[i].day_tip,
                  left: left,
                  top: top,
                  rot: rot
                })
              } else if (res.data.content.list[i].day_sign == '0') {
                info.push({
                  id: i,
                  reg: 360 / ylength * i,
                  setflower: '../../images/greenflower.png',
                  class: 'fo',
                  classa: 'green',
                  delay: i / 10,
                  daytip: res.data.content.list[i].day_tip,
                  left: left,
                  top: top,
                  rot: rot
                })
              }
          } else if (res.data.content.list[i].period == 3){
              if (res.data.content.list[i].day_sign == '-1') {
                info.push({
                  id: i,
                  reg: 360 / ylength * i,
                  class: 'fo syellow',
                  classa: 'yellow',
                  delay: i / 10,
                  daytip: res.data.content.list[i].day_tip,
                  left: left,
                  top: top,
                  rot: rot
                })
              } else if (res.data.content.list[i].day_sign == '1') {
                info.push({
                  id: i,
                  reg: 360 / ylength * i,
                  class: 'fo',
                  classa: 'yellow',
                  delay: i / 10,
                  daytip: res.data.content.list[i].day_tip,
                  left: left,
                  top: top,
                  rot: rot
                })
              } else if (res.data.content.list[i].day_sign == '0') {
                info.push({
                  id: i,
                  reg: 360 / ylength * i,
                  setflower: '../../images/yellowflower.png',
                  class: 'fo',
                  classa: 'yellow',
                  delay: i / 10,
                  daytip: res.data.content.list[i].day_tip,
                  left: left,
                  top: top,
                  rot: rot
                })
              }
          } else if (res.data.content.list[i].period == 4){ 
            if (res.data.content.list[i].day_sign == '-1') {
              info.push({
                id: i,
                reg: 360 / ylength * i,
                class: 'fo sgreen',
                classa: 'green',
                delay: i / 10,
                daytip: res.data.content.list[i].day_tip,
                left: left,
                top: top,
                rot: rot
              })
            } else if (res.data.content.list[i].day_sign == '1') {
              info.push({
                id: i,
                reg: 360 / ylength * i,
                class: 'fo',
                classa: 'green',
                delay: i / 10,
                daytip: res.data.content.list[i].day_tip,
                left: left,
                top: top,
                rot: rot
              })
            } else if (res.data.content.list[i].day_sign == '0') {
              info.push({
                id: i,
                reg: 360 / ylength * i,
                setflower: '../../images/greenflower.png',
                class: 'fo',
                classa: 'green',
                delay: i / 10,
                daytip: res.data.content.list[i].day_tip,
                left: left,
                top: top,
                rot: rot
              })
            }
          }
          

        }
        let dayb = res.data.content.days;
        var period ='';
        var clas='';
        var isGo='';
        var isGo1 = '';
        var isGo2 = '';
        var isGo3 = '';
       
        //1:经期 2:前安全期 3:排卵期 4:后安全期
        if (res.data.content.now_period==1){
          period ='经期';
          clas ='ls-red';
        } else if(res.data.content.now_period==2){
          period = '前安全期';
          clas = 'ls-green';
        }
        else if (res.data.content.now_period == 3) {
          period = '排卵期';
          clas = 'ls-yellow';
        }
        else if (res.data.content.now_period == 4) {
          period = '后安全期';
          clas = 'ls-green';
        }
        var msga = res.data.content.estimate_msg;
        //
        var Dat = new Date();
        var ayy = [];
        var ayyb = [];
        var nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
        var nowf = Dat.getTime() - (6 * 24 * 3600 * 1000);
       
        if (res.data.content.select_btn==0){//姨妈来了按钮
          isGo=true;
          isGo1 = false;
          isGo2 = false;
          isGo3 = false;
          
        } else if (res.data.content.select_btn == 1) {//姨妈走了按钮
          isGo = false;
          isGo1 = true;
          isGo2 = false;
          isGo3 = false;
          
        } else if (res.data.content.select_btn == 2) {//姨妈走了修改
          isGo = false;
          isGo1 = false;
          isGo2 = true;
          isGo3 = false;
      
        } else if (res.data.content.select_btn == 3) {//姨妈来了修改
          isGo = false;
          isGo1 = false;
          isGo2 = false;
          isGo3 = true;
        }
        
        that.setData({
          infos: info,
          infob:{
            day: dayb,
            colo: period,
            clas: clas,
            isGo: isGo,
            isGo1: isGo1,
            isGo2: isGo2,
            isGo3: isGo3
          },
          indexa: 44,
          arraya: ayy,
          arrayb: ayyb,
          msga: msga
        });
        function add(n) {
          return n < 10 ? '0' + n : '' + n;
        }
        
      },
      fail: function () {
        
      }
    });
  },
  bindPickerChangea: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexa: e.detail.value
    })
    
      
  
  },
  tapPiBtn(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPi: false,
    };
    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      if (this.data.picker_val[0] > this.data.arraya.length-1){
        this.data.picker_val = this.data.arraya.length-1;
      }
      var that = this;
      var Dat = new Date();
      var year = Dat.getFullYear();
      
      var montth = this.data.arraya[this.data.picker_val].substring(0, 2);
      var day = this.data.arraya[this.data.picker_val].substring(3, 5);
    
      wx.removeStorage({
        key: 'lista',
        success: function (res) {
          console.log(res.data)
        }
      })
      wx.setStorage({
        key: "lista",
        data: {
          listb: year + '-' + montth + '-' + day,
          listc: that.listg.listc,
          listd: that.listg.listd,
          liste:''
        }
      })
      wx.getStorage({
        key: 'lista',
        success: function (res) {
          console.log(res.data)


          that.requestData(res.data.listb, res.data.listc, res.data.listd,'');
          that.requestD(res.data.listb, res.data.listc, res.data.listd,'');
          that.requestRili(res.data.listb, res.data.listc, res.data.listd, '', year + '-' + montth + '-' + day);
        }
      })  
      
    }

    this.setData(o);
  },
  tapPiBtnd(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPid: false,
    };
    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      if (this.data.picker_vald[0] > this.data.arrayd.length - 1) {
        this.data.picker_vald = this.data.arrayd.length - 1;
      }
      var that = this;
      var Dat = new Date();
      var year = Dat.getFullYear();

      var montth = this.data.arrayd[this.data.picker_vald].substring(0, 2);
      var day = this.data.arrayd[this.data.picker_vald].substring(3, 5);

      wx.removeStorage({
        key: 'lista',
        success: function (res) {
          console.log(res.data)
        }
      })
      wx.setStorage({
        key: "lista",
        data: {
          listb: year + '-' + montth + '-' + day,
          listc: that.listg.listc,
          listd: that.listg.listd,
          liste: ''
        }
      })
      wx.getStorage({
        key: 'lista',
        success: function (res) {
          console.log(res.data)


          that.requestData(res.data.listb, res.data.listc, res.data.listd, '');
          that.requestD(res.data.listb, res.data.listc, res.data.listd, '');
          that.requestRili(res.data.listb, res.data.listc, res.data.listd, '', year + '-' + montth + '-' + day);
        }
      })

    }

    this.setData(o);
  },
  tapPiBtnb(e) {//姨妈走 了 
    const type = e.currentTarget.dataset.type;
    const o = {
      showB: false,
    };
    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      if (this.data.picker_valb[0] > this.data.arrayb.length - 1) {
        this.data.picker_valb = this.data.arrayb.length - 1;
      }
      var that = this;
      var Dat = new Date();
      var year = Dat.getFullYear();

      var montth = this.data.arrayb[this.data.picker_valb].substring(0, 2);
      var day = this.data.arrayb[this.data.picker_valb].substring(3, 5);

      wx.removeStorage({
        key: 'lista',
        success: function (res) {
          //console.log(res.data)
        }
      })
      wx.setStorage({
        key: "lista",
        data: {
          listb: that.listg.listb,
          listc: that.listg.listc,
          listd: that.listg.listd,
          liste: year + '-' + montth + '-' + day
        }
      })
     
      wx.getStorage({
        key: 'lista',
        success: function (res) {
          console.log(res.data)
          console.log(year + '-' + montth + '-' + day);
          var dayss = year + '/' + montth + '/' + day;
          var ds = res.data.listb.replace(/\-/g,'\/');
          
          console.log(new Date(dayss).getTime());
          if (new Date(dayss).getTime() < new Date(ds).getTime()){
            wx.showModal({
              title: '提示',
              showCancel:false,
              content: '姨妈走了的时间不能比姨妈来的时间早哦！',
              success: function (res) {
                
              }
            })
            return false;
          }
          that.requestData(res.data.listb, res.data.listc, res.data.listd, year + '-' + montth + '-' + day);
          that.requestD(res.data.listb, res.data.listc, res.data.listd, year + '-' + montth + '-' + day);
          that.requestRili(res.data.listb, res.data.listc, res.data.listd, '', year + '-' + montth + '-' + day);
          
        }
      })

    }

    this.setData(o);
  },
  tapPiBtnbe(e) {//姨妈走 了 
    const type = e.currentTarget.dataset.type;
    const o = {
      showBe: false,
    };
    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      if (this.data.picker_vale[0] > this.data.arraye.length - 1) {
        this.data.picker_vale = this.data.arraye.length - 1;
      }
      var that = this;
      var Dat = new Date();
      var year = Dat.getFullYear();

      var montth = this.data.arraye[this.data.picker_vale].substring(0, 2);
      var day = this.data.arraye[this.data.picker_vale].substring(3, 5);

      wx.removeStorage({
        key: 'lista',
        success: function (res) {
          //console.log(res.data)
        }
      })
      wx.setStorage({
        key: "lista",
        data: {
          listb: that.listg.listb,
          listc: that.listg.listc,
          listd: that.listg.listd,
          liste: year + '-' + montth + '-' + day
        }
      })

      wx.getStorage({
        key: 'lista',
        success: function (res) {
          console.log(res.data)
          console.log(year + '-' + montth + '-' + day);
          var dayss = year + '/' + montth + '/' + day;
          var ds = res.data.listb.replace(/\-/g, '\/');

          console.log(new Date(dayss).getTime());
          if (new Date(dayss).getTime() < new Date(ds).getTime()) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '姨妈走了的时间不能比姨妈来的时间早哦！',
              success: function (res) {

              }
            })
            return false;
          }
          that.requestData(res.data.listb, res.data.listc, res.data.listd, year + '-' + montth + '-' + day);
          that.requestD(res.data.listb, res.data.listc, res.data.listd, year + '-' + montth + '-' + day);
          that.requestRili(res.data.listb, res.data.listc, res.data.listd, '', year + '-' + montth + '-' + day);

        }
      })

    }

    this.setData(o);
  },
  piChange:function(e) {
    console.log(e.detail.value);
    
    this.setData({
      picker_val: e.detail.value
    })
  },
  piChanged: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_vald: e.detail.value
    })
  },
  piChangeB: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_valb: e.detail.value
    })
  },
  piChangBe: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_vale: e.detail.value
    })
  },
  piclikc:function(e){
    var Dat = new Date();
    var ayy = [];
    var ayyb = [];
    var nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
    var nowf = Dat.getTime() - (6 * 24 * 3600 * 1000);
    function add(n) {
      return n < 10 ? '0' + n : '' + n;
    }
    for (let i = 0; i <= 44; i++) {
      var gDate = new Date(parseInt(nowd) + i * 24 * 3600 * 1000);
      var gd = add((gDate.getMonth() + 1)) + '月' + add(gDate.getDate()) + '日';

      ayy.push(gd);

    }
    var that=this;
    wx.getStorage({
      key: 'lista',
      success: function (res) {
        console.log(res.data)
        var kid = res.data.listb.substring(5, 7) + '月' + res.data.listb.substring(8)+'日'
        var ls = ayy.indexOf(kid);
        console.log(ls);
        that.setData({
          picker_val:[ls]
        });
        
      }
    })

    this.setData({
      showPi: true,
      arraya: ayy,
    });
  },
  piclikd: function (e) {
    var Dat = new Date();
    var ayy = [];
    var ayyb = [];
    var nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
    var nowf = Dat.getTime() - (6 * 24 * 3600 * 1000);
    function add(n) {
      return n < 10 ? '0' + n : '' + n;
    }
    for (let i = 0; i <= 44; i++) {
      var gDate = new Date(parseInt(nowd) + i * 24 * 3600 * 1000);
      var gd = add((gDate.getMonth() + 1)) + '月' + add(gDate.getDate()) + '日';

      ayy.push(gd);

    }
    var that = this;
    wx.getStorage({
      key: 'lista',
      success: function (res) {
        console.log(res.data)
        var kid = res.data.listb.substring(5, 7) + '月' + res.data.listb.substring(8) + '日'
        var ls = ayy.indexOf(kid);
        console.log(ls);
        that.setData({
          picker_vald: [ls]
        });

      }
    })

    this.setData({
      showPid: true,
      arrayd: ayy,
    });
  },
  piclikb: function (e) {
    var Dat = new Date();
    var ayy = [];
    var ayyb = [];
    var nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
    var nowf = Dat.getTime() - (6 * 24 * 3600 * 1000);
    function add(n) {
      return n < 10 ? '0' + n : '' + n;
    }
    for (let i = 0; i < 7; i++) {
      var gDate = new Date(parseInt(nowf) + i * 24 * 3600 * 1000);
      var gd = add((gDate.getMonth() + 1)) + '月' + add(gDate.getDate()) + '日';
      ayyb.push(gd);

    }
    this.setData({
      showB: true,
      arrayb: ayyb,
    });
  },
  piclike: function (e) {
    var Dat = new Date();
    var ayy = [];
    var ayyb = [];
    var nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
    var nowf = Dat.getTime() - (6 * 24 * 3600 * 1000);
    function add(n) {
      return n < 10 ? '0' + n : '' + n;
    }
    for (let i = 0; i < 7; i++) {
      var gDate = new Date(parseInt(nowf) + i * 24 * 3600 * 1000);
      var gd = add((gDate.getMonth() + 1)) + '月' + add(gDate.getDate()) + '日';
      ayyb.push(gd);

    }
    this.setData({
      showBe: true,
      arraye: ayyb,
    });
  },
  // 计算每月有多少天
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 计算每月第一天是星期几
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  // 计算在每月第一天在当月第一周之前的空余的天数
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  // 渲染日历格子
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);
    
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false
      });
    }

    this.setData({
      days
    });
  },
  // 递增、递减切换月份
  handleCalendar(e) {
    var that=this;
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      wx.getStorage({
        key: 'lista',
        success: function (res) {
          that.requestRili(res.data.listb, res.data.listc, res.data.listd, newYear + '-' + newMonth,'');

        },
        fail: function (r) {
          console.log(r)
        }
      })    

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      wx.getStorage({
        key: 'lista',
        success: function (res) {
          that.requestRili(res.data.listb, res.data.listc, res.data.listd, newYear + '-' + newMonth,'');

        },
        fail: function (r) {
          console.log(r)
        }
      })    

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });
    }
  },
  // 点击日历上某一天
  tapDayItem(e) {
    

    
      const idx = e.currentTarget.dataset.idx;
      const days = this.data.days;
      var classb='';
      var classc = '';
      this.setData({
        idx:idx
      });
      for (var i = 0; i < days.length;i++){
        days[i].choosed=false;
        days[i].heart = 'heart';
        days[i].classa = this.data.daysa[i].classa;
        
        if (days[i].classa==''){
          days[i].day_bottom = 'day_bottom_4';
        }else{
          days[i].day_bottom = 'day_bottom_2';
        }
        
       
      }
      
      
      days[idx].choosed = !days[idx].choosed;
      days[idx].heart = 'heart1';
      days[idx].day_bottom = 'day_bottom_3';
      
      days[idx].classa = '';
      //days[idx].islove = !days[idx].islove;
      //console.log(this.data.cur_year);
      var ischech = days[idx].islove == true?true:false;
     
      
     
      let ticket_ym='';
      let datestr = this.data.cur_year + '-' + this.data.cur_month + '-' + days[idx].day;
      //this.requestAiai(datestr);
      this.setData({
        days,
        ischech
      });
    
  },
  // 点击年月调用picker选择器
  chooseYearAndMonth() {
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let picker_year = [],
      picker_month = [];
    for (let i = 1900; i <= 2100; i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }
    const idx_year = picker_year.indexOf(cur_year);
    const idx_month = picker_month.indexOf(cur_month);
    
    this.setData({
      picker_value: [idx_year, idx_month],
      picker_year,
      picker_month,
      showPicker: true,
    });
  },
  // 当picker选择器值改变时
  pickerChange(e) {
    const val = e.detail.value;
    choose_year = this.data.picker_year[val[0]];
    choose_month = this.data.picker_month[val[1]];
  },
  // 确定picker结果
  tapPickerBtn(e) {
    var that=this;
    const type = e.currentTarget.dataset.type;
    const o = {
      showPicker: false,
    };
    if (type === 'confirm') {
      o.cur_year = choose_year;
      o.cur_month = choose_month;
      this.calculateEmptyGrids(choose_year, choose_month);
      this.calculateDays(choose_year, choose_month);
      wx.getStorage({
        key: 'lista',
        success: function (res) {
          that.requestRili(res.data.listb, res.data.listc, res.data.listd, choose_year + '-' + choose_month,'');

        },
        fail: function (r) {
          console.log(r)
        }
      })   
    }

    this.setData(o);
  },
  requestRili: function (comeday, cycle, menses,ymd,go_day) {
    var that = this;
    var ticket = wx.getStorageSync('ticket');
    //  请求数据
    wx.request({
      url: "https://www.mizhi.com/minapp/yima/calendar.php",
      data: {
        come_day: comeday,
        cycle: cycle,
        menses: menses,
        ymd:ymd,
        ticket_ym:ticket,
        go_day: go_day
      },
      method: "GET",
      success: function (res) {
        console.log(res);
       let dayb=[];
        for (var i = 0; i < res.data.content.list.length;i++){
          if (res.data.content.list[i].period==0){
              if (res.data.content.list[i].is_love==0){
                  dayb.push({
                    day: i+1,
                    choosed: false,
                    classa: '',
                    islove:false,
                    day_bottom: 'day_bottom_4',
                    heart: 'heart'
                  });
              }else{
                  dayb.push({
                    day: i + 1,
                    choosed: false,
                    classa: '',
                    islove: true,
                    day_bottom: 'day_bottom_4',
                    heart: 'heart'
                  });
              }
            
          } else if (res.data.content.list[i].period == 1){
              if (res.data.content.list[i].is_love == 0) {

                  if (res.data.content.list[i].day_sign==-1){
                      dayb.push({
                        day: i + 1,
                        choosed: false,
                        classa: 'dsred',
                        islove: false,
                        bg_active:'',
                        day_bottom:'day_bottom_2',
                        heart:'heart'
                      });

                  } else if (res.data.content.list[i].day_sign == 0){
                      dayb.push({
                        day: i + 1,
                        choosed: true,
                        classa: '',
                        islove: false,
                        bg_active:'bg_active',
                        day_bottom: 'day_bottom_3',
                        heart:'heart1'
                      });

                  } else if (res.data.content.list[i].day_sign == 1){
                      dayb.push({
                        day: i + 1,
                        choosed: false,
                        classa: 'dred',
                        islove: false,
                        bg_active: '',
                        day_bottom: 'day_bottom_2',
                        heart: 'heart'
                      });
                  }
                
              } else {
                if (res.data.content.list[i].day_sign == -1) {
                  dayb.push({
                    day: i + 1,
                    choosed: false,
                    classa: 'dsred',
                    islove: true,
                    bg_active: '',
                    day_bottom: 'day_bottom_2',
                    heart: 'heart'
                  });

                } else if (res.data.content.list[i].day_sign == 0) {
                  dayb.push({
                    day: i + 1,
                    choosed: true,
                    classa: '',
                    islove: true,
                    bg_active: 'bg_active',
                    day_bottom: 'day_bottom_3',
                    heart: 'heart1'
                  });

                } else if (res.data.content.list[i].day_sign == 1) {
                  dayb.push({
                    day: i + 1,
                    choosed: false,
                    classa: 'dred',
                    islove: true,
                    bg_active: '',
                    day_bottom: 'day_bottom_2',
                    heart: 'heart'
                  });
                }
              }

              
          } else if (res.data.content.list[i].period == 2) {
              if (res.data.content.list[i].is_love == 0) {

                if (res.data.content.list[i].day_sign == -1) {
                  dayb.push({
                    day: i + 1,
                    choosed: false,
                    classa: 'dsgreen',
                    islove: false,
                    bg_active: '',
                    day_bottom: 'day_bottom_2',
                    heart: 'heart'
                  });

                } else if (res.data.content.list[i].day_sign == 0) {
                  dayb.push({
                    day: i + 1,
                    choosed: true,
                    classa: '',
                    islove: false,
                    bg_active: 'bg_active',
                    day_bottom: 'day_bottom_3',
                    heart: 'heart1'
                  });

                } else if (res.data.content.list[i].day_sign == 1) {
                  dayb.push({
                    day: i + 1,
                    choosed: false,
                    classa: 'dgreen',
                    islove: false,
                    bg_active: '',
                    day_bottom: 'day_bottom_2',
                    heart: 'heart'
                  });
                }

              } else {
                if (res.data.content.list[i].day_sign == -1) {
                  dayb.push({
                    day: i + 1,
                    choosed: false,
                    classa: 'dsgreen',
                    islove: true,
                    bg_active: '',
                    day_bottom: 'day_bottom_2',
                    heart: 'heart'
                  });

                } else if (res.data.content.list[i].day_sign == 0) {
                  dayb.push({
                    day: i + 1,
                    choosed: true,
                    classa: '',
                    islove: true,
                    bg_active: 'bg_active',
                    day_bottom: 'day_bottom_3',
                    heart: 'heart1'
                  });

                } else if (res.data.content.list[i].day_sign == 1) {
                  dayb.push({
                    day: i + 1,
                    choosed: false,
                    classa: 'dgreen',
                    islove: true,
                    bg_active: '',
                    day_bottom: 'day_bottom_2',
                    heart: 'heart'
                  });
                }
              }

          } else if (res.data.content.list[i].period == 3) {
            if (res.data.content.list[i].is_love == 0) {

              if (res.data.content.list[i].day_sign == -1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dsyellow',
                  islove: false,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });

              } else if (res.data.content.list[i].day_sign == 0) {
                dayb.push({
                  day: i + 1,
                  choosed: true,
                  classa: '',
                  islove: false,
                  bg_active: 'bg_active',
                  day_bottom: 'day_bottom_3',
                  heart: 'heart1'
                });

              } else if (res.data.content.list[i].day_sign == 1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dyellow',
                  islove: false,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });
              }

            } else {
              if (res.data.content.list[i].day_sign == -1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dsyellow',
                  islove: true,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });

              } else if (res.data.content.list[i].day_sign == 0) {
                dayb.push({
                  day: i + 1,
                  choosed: true,
                  classa: '',
                  islove: true,
                  bg_active: 'bg_active',
                  day_bottom: 'day_bottom_3',
                  heart: 'heart1'
                });

              } else if (res.data.content.list[i].day_sign == 1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dyellow',
                  islove: true,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });
              }

            }
          } else if (res.data.content.list[i].period == 4) {
            if (res.data.content.list[i].is_love == 0) {

              if (res.data.content.list[i].day_sign == -1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dsgreen',
                  islove: false,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });

              } else if (res.data.content.list[i].day_sign == 0) {
                dayb.push({
                  day: i + 1,
                  choosed: true,
                  classa: '',
                  islove: false,
                  bg_active: 'bg_active',
                  day_bottom: 'day_bottom_3',
                  heart: 'heart1'
                });

              } else if (res.data.content.list[i].day_sign == 1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dgreen',
                  islove: false,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });
              }

            } else {
              if (res.data.content.list[i].day_sign == -1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dsgreen',
                  islove: true,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });

              } else if (res.data.content.list[i].day_sign == 0) {
                dayb.push({
                  day: i + 1,
                  choosed: true,
                  classa: '',
                  islove: true,
                  bg_active: 'bg_active',
                  day_bottom: 'day_bottom_3',
                  heart: 'heart1'
                });

              } else if (res.data.content.list[i].day_sign == 1) {
                dayb.push({
                  day: i + 1,
                  choosed: false,
                  classa: 'dgreen',
                  islove: true,
                  bg_active: '',
                  day_bottom: 'day_bottom_2',
                  heart: 'heart'
                });
              }
            }
          }
        }
        that.setData({
          days: dayb,
          daysa: dayb
        });

      },
      fail: function () {

      }
    });
  },
  requestAiai: function (datestr) {
    var that = this;
    var ticket = wx.getStorageSync('ticket');
    //  请求数据
    wx.request({
      url: "https://www.mizhi.com/minapp/yima/doLove.php",
      data: {
        datestr: datestr,
        ticket_ym: ticket
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        

      },
      fail: function () {

      }
    });
  },
  switch2Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
 
    var idx = this.data.idx;
    var days = this.data.days;
    var Dat = new Date();
    if(idx==undefined){
      idx = Dat.getDate()-1;
    }
    console.log(Dat.getDate());
    days[idx].islove = !days[idx].islove;
    //console.log(this.data.cur_year);

    let ticket_ym = '';
    let datestr = this.data.cur_year + '-' + this.data.cur_month + '-' + days[idx].day;
    this.requestAiai(datestr);
    this.setData({
      days,
    });
    // this.setData({
    //   aiai: e.detail.value
    // });
    
  },
  requestTongji: function () {
    var that = this;
    var ticket = wx.getStorageSync('ticket');
    //  请求数据
    wx.request({
      url: "https://www.mizhi.com/minapp/yima/chart.php",
      data: {
        ticket_ym: ticket
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        const date = new Date();
        const curmonth = date.getMonth() + 1;
        var allp=[];
        for (var i = 0; i < res.data.content.list.length;i++){
          let cycle = res.data.content.list[i].cycle;
          let menses = res.data.content.list[i].menses;
          var month = '';;
          if (res.data.content.list[i].month.substring(4)==curmonth){
            month='本';
          }else{
            month=res.data.content.list[i].month.substring(4);
          }
          
          let lheight = 360 * cycle/45;
          let mheight = 360 * menses / 45;
          allp.push({
            cycle: cycle,
            menses: menses,
            month: month,
            lheight: lheight,
            mheight: mheight
          });
        }
        that.setData({
          allday: res.data.content.cycleAvg,
          yimaday: res.data.content.memsesAvg,
          yimamsg: res.data.content.msg,
          allp: allp
        });
      },
      fail: function () {

      }
    });
  },
  toSet:function(){
    
    wx.navigateTo({
      url: '../set/set'
    })
  },
  toTixing: function () {
    wx.navigateTo({
      url: '../remind/remind'
    })
  },
  requestD(come_day,cycle, menses,go_day) {
    var ticket = wx.getStorageSync('ticket');
    var that = this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/setParam.php',
      data: {
        cycle: cycle,
        menses: menses,
        come_day: come_day,
        ticket_ym: ticket,
        go_day: go_day
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  showM(){
    this.setData({
      showMan2:true
    });
  },
  tapyes() {
    var that = this;
    app.getUser(function (r) {
      //that.requestnew(option, ticket);
      console.log(that.data.wobj);
      that.bindN(that.data.wobj.ticket, that.data.wobj.nickName, that.data.wobj.avatarUrl, r.nickName, r.avatarUrl);
    });
    
    this.setData({
      showMan: true,
      showMan2: false
    });

  },
  taperror(){
    console.log(111);
    wx.navigateBack({
      delta: 1
    })
  },
  unbindN() {
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
          wx.showToast({
            title: res.data.content,
            icon: 'success',
            duration: 2000
          })
          this.setData({
            isBindShow: false,
            isBindShowb: true
          });
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindN(ticket, alias, spic,nanalias,nanspic) {
    var ticket2 = wx.getStorageSync('ticket');
    var that = this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/bind.php',
      data: {
        open_id: ticket,
        alias: alias,
        spic: spic,
        ticket_ym: ticket2,
        nan_open_id: ticket2,
        nan_alias: nanalias,
        nan_spic: nanspic,
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.flag == '001') {
          wx.redirectTo({
            url: '../main/main'
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
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
  }
  
})