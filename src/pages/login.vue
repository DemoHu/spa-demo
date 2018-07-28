<template>
    <v-app>
        <div class="mask" v-show="action"></div>
        <v-card class="login" ref="login"
            width="450"
            height="508">

            <!-- 进度条 -->
            <v-progress-linear
                v-show="action"
                class="progress"
                height="4"
                :indeterminate="action"
                backgroundColor="grey lighten-3"
                color="orange"></v-progress-linear>

            <!-- google 图标 -->
            <Google></Google>

            <!-- 登陆提示 -->
            <v-card-title>
                <h1 class="tit">登陆后台</h1>
                <div class="txt">
                    在您的任意设备上登录 Google 帐号，即可获取您的书签、历史记录、密码和其他设置
                </div>
            </v-card-title>

            <!-- 用户名 -->
            <v-text-field class="user-info" ref="info"
                v-model.trim="info"
                box
                :color="color"
                :label="label"
                autofocus
                type="email"
            ></v-text-field>

            <!-- 忘记密码 -->
            <section class="rember">
                <v-btn class="rember-txt" flat color="info" ripple dark>忘记了电子邮件地址？</v-btn>
            </section>

            <!-- 帮助 -->
            <section class="help">
                遇到问题?
                <v-btn class="rember-txt" flat color="info" ripple dark small ref="btn">了解详情</v-btn>
            </section>

            <!-- 下一步 -->
            <v-card-actions>
                <div class="half"><v-btn flat color="info" ripple dark>创建账号</v-btn></div>
                <div class="half">
                    <v-btn color="info" class="next" ripple dark @click="next">下一步</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
import Google from '@/components/logo/Google.vue';

import { login } from '@/dictionary/tip';

import '../../static/less/login.less';

export default {
    name: 'login',
    components: {
        Google
    },

    data () {
        return {
            info: undefined,
            label: login.email,
            action: false,
            color: 'info',

            rules: {
                email: v => ( v || '' ).match( /@/ ) || 'Please enter a valid email'
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test( v ) || 'E-mail must be valid'
            ]
        };
    },

    mounted () {
    },

    methods: {
        next () {
            this.action = true;

            window.setTimeout( () => {
                import( '../dictionary/userInfo.js' )
                    .then( data => {
                        let msg = document.querySelector( '.input-group__details' );

                        data = data.default;
                        console.log( 'data:', data, this.info );

                        if ( this.info == null ) {                  // 输入为空
                            this.color = 'error';
                            msg.innerHTML = login.error[ 0 ];
                        } else if ( /.+@.+/.test( this.info ) ) {   // 输入格式正确
                            if ( data.some( el => el.email === this.info ) ) {
                                window.location.href = '/#/home';
                                this.color = 'info';
                            } else {
                                this.color = 'error';
                                msg.innerHTML = login.error[ 2 ];
                            }
                        } else {                                    // 输入格式错误
                            this.color = 'error';
                            msg.innerHTML = login.error[ 1 ];
                        }

                        this.action = false;
                    } );
            }, 1000 );
        }
    }
};
</script>

<style scoped lang="less">
@import url("../../static/less/mixins.less");
@import url("../../static/less/params.less");

.mask {
    .setWH();
    .setPositon();
    background-color: black;
    opacity: .3;
    z-index: 2;
}

.login {
    border-radius: @login-radius;
    padding: @login-padding;
    position: relative;
    overflow: hidden;
    margin: auto;

    .progress {
        .setWH( 100%, 10px );
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        border-radius: 0;
    }

    .tit {
        font-weight: normal;
        font-size: 24px;
    }

    .txt {
        font-size: 16px;
        letter-spacing: .2px;
        line-height: 1.5;
    }

    .half {
        float: left;

        .next {
            float: right;
        }
    }

    .help {
        padding-left: 16px;
        padding: 30px 16px;
        color: #757575;
    }

    /* 输入用户名 */
    .user-info {
        padding-left: 16px;
        background-color: transparent;
    }

    /* 帮助 */
    .rember {
        padding-bottom: 10px;
    }
    .rember-txt {
        height: auto;
        font-size: 15px;
    }

    /* 登陆后台 */
    /* .card__title {
        padding-bottom: 0;
    } */
}
</style>
