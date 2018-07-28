// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

// 组件
import {
    Vuetify,
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VProgressLinear,
    VTextField,

    VParallax
} from 'vuetify';

// css
import 'vuetify/src/stylus/app.styl';
import '../static/font/icon-google.css';
import '../static/less/base.less';

Vue.use( Vuetify, {
    components: {
        VApp,
        VNavigationDrawer,
        VFooter,
        VList,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        transitions,
        VCard,
        VProgressLinear,
        VTextField,

        VParallax
    }
} );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue( {
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
} );
