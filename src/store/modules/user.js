import { apiVerifyUserInfo } from '@/api/login';
import { getToken, setToken } from '../../utils/token';

const user = {
    state: {
        name: '',
        id: '',
        email: '',
        phone: '',
        status: '',
        avatar: '',
        token: getToken()
    },

    mutations: {
        SET_NAME ( state, name ) {
            state.name = name;
        },
        SET_ID ( state, id ) {
            state.id = id;
        },
        SET_EMAIL ( state, email ) {
            state.email = email;
        },
        SET_PHONE ( state, phone ) {
            state.phone = phone;
        },
        SET_STATUS ( state, status ) {
            state.status = status;
        },
        SET_AVATAR ( state, avatar ) {
            state.avatar = avatar;
        },
        SET_TOKEN ( state, token ) {
            setToken( token );
            state.token = token;
        }
    },

    actions: {

        // 用户名登录
        LoginByUser ( { commit }, userInfo ) {
            const userName = userInfo.userName.trim();

            return new Promise( ( resolve, reject ) => {
                apiVerifyUserInfo( userName, userInfo.password )
                    .then( response => {

                        // 使用本地数据 import() 导入, 所以使用的是 default 字段
                        const data = response.default;
                        commit( 'SET_TOKEN', data.token );
                        resolve( data );
                    } )
                    .catch( err => reject( err ) );
            } );
        }
    }
};

export default user;
