import Vue from 'vue';

import Router from 'vue-router';
import URLS from './_important_dev';

Vue.use( Router );

const routes = URLS.split( ' ' ).map( el => ( {
    path: `/${el}`,
    name: el,
    component ( resolve ) {
        require( [ `@/pages/${el}` ], resolve );
    }
} ) );

export default new Router( {
    routes: [
        {
            path: '/',
            redirect: '/home'
        }, {
            path: '/test',
            name: 'test',
            component ( resolve ) {
                require( [ '@/test' ], resolve );
            }
        },

        ...routes
    ]
} );
