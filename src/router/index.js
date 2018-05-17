import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login';

Vue.use( Router );

export default new Router( {
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
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
