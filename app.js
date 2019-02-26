import tool from 'utils/tool';
App({
  globalData: {
    userInfo: null,
    tool
  },

  onLaunch: function () {
    let that = this;
    // 登录
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.tool.http('/api_wx/login/login.php?code=' + res.code, 'GET', {}, function (data) {
          if (data.code === 1 || data.code === 2) {
            wx.setStorageSync('token', data.token);
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    lang :"zh_CN",
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      that.globalData.userInfo = res.userInfo;


                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (that.userInfoReadyCallback) {
                        that.userInfoReadyCallback(res)
                      }

                      //api.updateUserInfo(res.userInfo)
                    }
                  })
                }
              }
            })
          } else {
            wx.reLaunch({
              url: '/pages/douyin/subject',
            })
          }
        });
      }
    })


  }

})