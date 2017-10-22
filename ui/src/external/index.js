import Vue from 'vue';
import {
  appFrame,
  WrapCard
} from './component'
import {
  addConfig,
  getConfig
} from './config'
import {
  parse
}from '../util/assist'

Vue.component('AppFrame', appFrame);
Vue.component('WrapCard', WrapCard);

import store from './store'
import renderVue from './component/render.vue'
import {addRenderFn} from '../helper/code_helper'

function getAppList({appName,token},fn) {
  this.http.post('app/appList',{name:appName}).then(res => {
    if (res.data.code === 10000) {
      this.controls = res.data.data
      if(fn){
        fn.call(this,res.data.data)
      }
    } else {
      this.$Message.error('query failed')
    }
  })
}

// 在这查 appSoul,放到store
function render(appName, token) {
  getAppList.call(Vue,{
    appName,
    token
  },data=>{
    let pageSoul = parse(data.pageSoul)
    for (let key in pageSoul) {
      if(key !=='maxUid'){
        let soul = pageSoul[key];
        addRenderFn(pageSoul[key])
      }
    }
    store.commit('soulModule/setPageSoul', pageSoul)
    store.commit('soulModule/setSoul', pageSoul['/index'])
  })
  return renderVue
}

export default{
  addConfig,
  getConfig,
  render
}   // eslint-disable-line no-undef

