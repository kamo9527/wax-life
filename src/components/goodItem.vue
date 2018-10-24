<template>
  <div class="good_item">
    <div class="lable">购物清单</div>
    <div class="content" v-for="(item, index) in goodList" :key="index">
      <div class="good_detail">
        <img :src="item.src" alt="">
        <span>{{item.title}}</span>
      </div>
      <div class="good_price">
        {{item.num + '*' + item.price + '元'}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iClass: String,
    color: String,
    disabled: Boolean,
    item: Object,
    goodList: Array
  },
  data() {
    return {
    }
  },
  methods: {
    radioChange(e) {
      this.item.select = e.target.current
      // this.$emit('onChange', this.item)
    },
    add() {
      this.item.num++
      // this.$emit('onChange', this.item)
    },
    minus() {
      this.item.num--
      // this.$emit('onChange', this.item)
    }
  }
}
</script>
<style lang="less">
  .good_item {
    .lable {
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      // font-weight: 600;
    }
    .content {
      padding: 0 15px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top:  1px solid #f0f0f0;
      .good_detail {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px; 
        }
        span {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
      }
      
    }
  }

</style>