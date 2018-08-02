import { apiVerifyUserInfo, apiVerifyUserEmail } from '@/api/login';

export default {
    methods: {

        // 用户信息验证
        verifyUserInfo () {
            let inp = this.$refs.password.$el.querySelector( 'input' );

            if ( ( this.password || '' ).length >= 6 ) {

                apiVerifyUserInfo( this.email, this.password )
                    .then( response => {
                        console.log( 'data:', response );
                        if ( 1 === response.code ) {
                            this.validate = 'success';
                            this.errorPasswordNum = undefined;

                            // 设置 cookies
                            this.$store.commit( 'SET_TOKEN', response.data.name, .5 );
                        }
                    } ).catch( err => {
                        console.log( '用户名不存在!', err.code );
                        this.setErrPassword( 2 );
                        inp.focus();
                    } );
            } else {

                this.validatePassword();
                inp.focus();
            }
        },

        // 查找 email
        verifyUserEmail ( inp ) {
            apiVerifyUserEmail( this.email ).then( response => {
                console.log( '成功登录: ', response );
                this.isSecond = true;
                this.action = false;
            } ).catch( response => {
                console.log( '账号不存在: ', response );
                this.setErrEmail( 2 );
                inp.focus();
                this.action = false;
            } );
        }
    }
};
