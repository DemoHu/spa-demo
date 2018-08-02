import { apiLoginByUser } from '@/api/login';

export default {
    methods: {
        loginByUserInfo () {
            let inp = this.$refs.password.$el.querySelector( 'input' );

            if ( ( this.password || '' ).length >= 6 ) {

                apiLoginByUser( this.email, this.password )
                    .then( response => {
                        if ( 1 === response.code ) {
                            this.validate = 'success';
                            this.errorPasswordNum = undefined;

                            // 设置 Cookies, 有效期半天
                            console.log( response.data );
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
        }
    }
};
