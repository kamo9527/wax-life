<template>
  <div :class="['i_cell', {'i_cell_bd_start' : bdStart}, iClass]" @click="onClick">
    <div class="i_cell_hd" v-if="src">
      <img :src="src" class="img_icon" alt="" />
      <p class="img_text" v-if="imgText">{{imgText}}</p>
    </div>
    <div class="i_cell_bd">
      <div class="title">{{title}} <span class="i_mobile">{{mobile}}</span></div>
      <div class="inline_desc" :class="{'fn-hide': !inlineDesc}">{{inlineDesc}}</div>
    </div>
    <div class="i_cell_fr">
      {{fr}}
      <slot name="more"></slot>
    </div>
    <div :class="{'with_arrow': isLink || link}"></div>
  </div>
</template>
<script>
// import utils from '@/utils'
export default {
  props: {
    iClass: String,
    bdStart: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    },
    imgText: {
      type: [String, Number],
      default: ''
    },
    fr: {
      type: [String, Number],
      default: ''
    },
    title: String,
    inlineDesc: {
      type: [String, Number],
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    },
    link: {
      type: [String, Number],
      default: ''
    },
    query: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onClick() {
      if (this.link) {
        let url = {path: this.link, query: this.query}
        this.$router.push(url)
      }
      this.$emit('cellClick')
    },
    onBtn() {
      this.$emit('btnClick', this.index)
    }
  }
}
</script>
<style lang="less">
@import '../assets/components/cell.less';
</style>