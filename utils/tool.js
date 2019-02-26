let serverPath = 'https://wx.haiyingku.com/wp-api';
export default {
  http(url, method, data, success) {
    let token = wx.getStorageSync("token");
    wx.showNavigationBarLoading();
    wx.request({
      method: method,
      header: {
        token: token || ''
      },
      url: serverPath + url,
      data: data,
      success: function (res) {
        if (res.statusCode === 200) {
          success(res.data);
        } else {
          wx.showModal({
            title: '微信异常',
            content: res.statusCode,
            showCancel: false
          })
        }
      },
      fail: function () {
        wx.showModal({
          content: '远程连接失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.hideLoading()
      }
    });
  },

}