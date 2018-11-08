<template>
  <div class="contact_us">
    <div class="banner">
      <img src="/static/images/goods.png" alt="" >
    </div>
    <div class="title">留下电话号码,客服马上联系你</div>
    <div class="client_info">
      <div class="dsflex input">
        <span>姓&nbsp;&nbsp;&nbsp;名</span>
        <input type="text" placeholder="请填写您的真实姓名" v-model="formData.name" >
      </div>
      <div class="dsflex input">
        <span>手机号</span>
        <input type="number" placeholder="请填写您的手机号" v-model="formData.phone">
      </div>
      <div class="dsflex input">
        <span>行&nbsp;&nbsp;&nbsp;业</span>
        <input type="text" placeholder="请填写您当前从事的行业" v-model="formData.industry">
      </div>
    </div>
    <div class="client_info dsflex">
      <button @click="submitCheck">提&nbsp;&nbsp;交</button>
    </div>
    <div class="process">
      <div>入驻流程：</div>
      <div class="process_item dsflex">
        <span v-for="(item, index) in processData" :key="index" :class="item == '>' ? '' : 'border_span'">{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
  },
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        industry: ''
      },
      processData: [
        '填写资料',
        '>',
        '客服回电确认',
        '>',
        '小程序上线',
        '>',
        '上传商品'
      ]
    }
  },
  onShow() {
  },
  computed: {
  },
  methods: {
    submitCheck() {
      console.log('提交用户信息')
      const name = this.formData.name.trim()
      const phone = this.formData.phone.trim()
      if (name === '') {
        wx.showToast({
          title: '请输入您的姓名',
          icon: 'none'
        })
        return
      }
      if (phone === '') {
        wx.showToast({
          title: '请输入您的手机号',
          icon: 'none'
        })
        return
      }
      const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
      if (!reg.test(phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }
      this.submitDone()
    },

    submitDone() {
      wx.showLoading()
      const data = {
        act: 'insertInfo',
        data: this.formData
      }
      wx.cloud.callFunction({
        name: 'client',
        data,
        complete: res => {
          console.log('callFunction', res)
          if (res.result.code === 0) {
            wx.showToast({
              title: '信息提交成功, 客户很快就会联系您',
              icon: 'none',
              complete: () => {
                this.formData = {
                  name: '',
                  phone: '',
                  industry: ''
                }
              }
            })
          } else {
            wx.showToast({
              title: '信息提交失败，请稍后再试',
              icon: 'none'
            })
          }
        }
      })
    }

  }
}
</script>

<style lang="less">
  page {
    height: 100%;
    background: #fffaf7;
  }
</style>

<style scoped lang="less">
  .contact_us {
    .dsflex {
      display: flex;
      align-items: center;
    } 
    .banner {
      img {
        width: 100%;
      }
    }
    .title {
      height: 60px;
      line-height: 70px;
      text-align: center;
      font-size: 18px;
      color: #8d7d6e;
      font-weight: 600;
    }
    .input {
      padding: 0 35px;
      margin: 10px 0;
      span {
        width: 50px;
        padding: 5px 10px;
        font-weight: 600;
      }
      input {
        width: 300px;
        flex-grow: 1;
        border: 1px solid #e6e2e1;
        height: 40px;
        padding: 5px 10px;
        box-sizing: border-box;
        background: #fff;
      }
    }
    .client_info {
      margin: 20px 0;
      button {
        width: 130px;
        height: 40px;
        background: #ff7900;
        color: #fff;
        font-size: 16px;
        justify-content: center;
      }
    }
    .process {
      color: #9d8877;
      padding: 0 10px 15px;
      .process_item {
        margin-top: 10px; 
        justify-content: space-between;
        span {
          padding: 0 4px;
        }
        .border_span {
          border: 1px solid #9d8877;
          border-radius: 4px;
        }
      }
    }
  }
</style>