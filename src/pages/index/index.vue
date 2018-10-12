<template>
  <div class="my_store">
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="home" title="首页"></xtab>
      <xtab key="goods" title="产品"></xtab>
      <xtab key="new" title="新品"></xtab>
      <xtab key="workshop" title="作坊"></xtab>
    </xtabs>
    <div class="my_home show_move" v-if="current === 'home'">
      <image src="../../static/images/goods.png" mode="widthFix"></image>
      <image src="../../static/images/goods.png" mode="widthFix"></image>
      <image src="../../static/images/goods.png" mode="widthFix"></image>
      <image src="../../static/images/goods.png" mode="widthFix"></image>
      <image src="../../static/images/goods.png" mode="widthFix"></image>
      <image src="../../static/images/tips01.jpg" mode="widthFix"></image>
      <image src="../../static/images/tips02.jpg" mode="widthFix"></image>
    </div>
    <div class="my_goods show_move" v-if="current === 'goods'">
      <xrow>
        <xcol span="6" 
          v-for="item in goodsFilter" 
          :i-class="filterbar === item.key ? 'on' : '' " 
          :key="item.key"
          @click="filterChange(item.key)">
          {{item.name}}<span :class="item.sort" v-if="item.key === 'sort'"></span>
        </xcol>
      </xrow>
      <div class="goods_list">
        <div class="goods_item" v-for="(item, index) in goods" :key="index">
          <image src="../../static/images/goods.png" mode="widthFix"></image>
          <div class="content">
          <div class="title">无敌风油精爽爽爽</div>
          <div class="detail">￥<span class="price">252</span><span class="num">1555人付款</span><span class="more">. . .</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 'goods',
      userInfo: {},
      priceSort: false,
      filterbar: 'all',
      goodsFilter: [
        {key: 'all', name: '综合'},
        {key: 'sales', name: '销量'},
        {key: 'review', name: '点评率'},
        {key: 'sort', name: '价格', sort: 'sort'} // sort : sort , sort_up, sort_down
      ],
      goods: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    }
  },
  components: {},
  watch: {},
  created() {},
  computed: {
    question: {
      get() {
        return this.$store.state.question.question
      },
      set(value) {
        this.$store.commit('question/updatequestion', value)
      }
    }
  },
  methods: {
    tabsChange(e) {
      this.current = e.target.key
    },
    filterChange(key) {
      this.filterbar = key
      if (key === 'sort') {
        this.priceSort = !this.priceSort
        this.goodsFilter[3].sort = this.priceSort ? 'sort_up' : 'sort_down'
      } else {
        this.goodsFilter[3].sort = 'sort'
        this.priceSort = false
      }
    },
    bindViewTap() {
      const url = '../logs/index'
      wx.navigateTo({ url })
    },
    getUserInfo() {
      // 调用登录接口
      wx.getUserInfo({
        success: (res) => {
          this.userInfo = res.userInfo
        }
      })
    }
  }
}

</script>
<style lang="less">
.my_store {
  .my_home {
    background-color: black;
    image {
      width: 100%;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

  .show_move {
    padding-top: 42px;
    animation: mymove 0.6s ease-out;
    -webkit-animation: mymove 0.56s ease-out;
  }

  .my_goods {
    ._xcol {
      line-height: 36px;
      font-size: 14px;
      color: #80848f;
      text-align: center;
    }
    .on{
      color: #ea9b5a;
    }
    .test{
      width: 200px;
      height: 100px;
      line-height: 100px;
      border: 1px solid #eee;
      text-align: center;
      font-size: 14px;
    }
    .sort, .sort_up, .sort_down{
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    .sort{
      background: url('../../../static/icon/sort.png') no-repeat;
    }
    .sort_up{
      background: url('../../../static/icon/sort_up.png') no-repeat;
    }
    .sort_down{
      background: url('../../../static/icon/sort_down.png') no-repeat;
    }
  }
  .goods_list{
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    .goods_item{
      flex-shrink: 0;
      box-sizing: border-box;
      width: 49%;
      margin-left: 2%;
      margin-bottom: 10px;
      border-radius: 8px;
      background-color: #fff;
      border: 1rpx solid #E8EAF0; 
      image {
        width: 100%;
        border-radius: 8px 8px 0 0;
        vertical-align: middle;
      }
      .content{
        padding: 4px 8px 5px;
      }
      .title{
        font-size: 13px;
      }
      .detail{
        font-size: 10px;
        color: #ea9b5a; 
        .price{
          font-size: 14px;
          margin-right: 5px;
        }
        .num{
          color: #999; 
        }
        .more{
          float: right;
        }
      }
      &:nth-child(2n+1){
        margin-left: 0;
      }
    }
  }
}

@keyframes mymove {
  0% {
    opacity: 0;
    transform: translate(375px, 0);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@-webkit-keyframes mymove {
  0% {
    opacity: 0;
    transform: translate(375px, 0);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

</style>
