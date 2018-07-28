import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login';

import HelloWorld from '@/components/HelloWorld.vue';
import Home from '@/pages';
import GoogleKeep from '@/pages/GoogleKeep';
import Parallax from '@/pages/Parallax';

Vue.use( Router );

export default new Router( {
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/googleKeep',
            name: 'googleKeep',
            component: GoogleKeep
        },
        {
            path: '/parallax',
            name: 'parallax',
            component: Parallax
        },
        {
            path: '/Hello',
            name: 'hello',
            component: HelloWorld
        },
        {   // 测试页面
            path: '/test',
            name: 'test',
            component ( resolve ) {
                require( [ '@/test' ], resolve );
            }
        }
    ]
} );
