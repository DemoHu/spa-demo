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

    VParallax,
    VDivider,
    VSubheader,
    VTooltip
} from 'vuetify';

// css
import 'vuetify/src/stylus/app.styl';
import '../static/less/icon-google.less';
import '../static/less/base.less';
import '../static/less/transition.less';

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

        VParallax,
        VDivider,
        VSubheader,
        VTooltip
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
