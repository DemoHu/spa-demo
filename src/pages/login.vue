<template>
    <v-app>
        <div class="mask" v-show="action"></div>
        <v-card class="login" ref="login"
            width="450"
            :height="508 + !!isSecond * 76"
            @keydown.enter="next">

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

            <!-- 输入用户信息 -->
            <v-text-field class="user-info" ref="email"
                v-show="!isSecond"
                v-model.trim="email"
                :color="color"
                label="电子邮件或者电话号码"
                autofocus
                type="email"
                clearable
                :error="!!errEmail"
                :error-messages="errEmail"
                @input.native="errEmail = ''"
                ></v-text-field>
            <v-text-field class="user-info" ref="password"
                v-if="isSecond"
                v-model.trim="password"
                :color="color"
                label="请输入密码"
                autofocus
                type="password"
                clearable
                :error="!!errPassword"
                :error-messages="errPassword"
                @input.native="errPassword = ''"
                ></v-text-field>

            <!-- 忘记密码 -->
            <section class="rember">
                <v-btn class="rember-txt" flat color="info" ripple dark>忘记了电子邮件地址？</v-btn>
            </section>

            <!-- 登陆验证 -->
            <!-- <transition name="fade">
                <div id='captcha' v-if="isSecond" :style="{ height: !!isSecond * 76 + 'px' }"></div>
            </transition> -->
            <section id='captcha' v-if="isSecond" :style="{ height: !!isSecond * 76 + 'px' }"></section>

            <!-- 帮助 -->
            <section class="help">
                <span class="t">遇到问题?</span>
                <v-btn class="rember-txt" flat color="info" ripple dark small ref="btn">了解详情</v-btn>
            </section>

            <!-- 下一步 -->
            <v-card-actions>
                <div class="half"><v-btn flat color="info" ripple dark>创建账号</v-btn></div>
                <div class="half">
                    <v-btn color="info" class="next" ripple dark @click.native="next">{{ msg }}</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
import $ from 'jquery';
import '@/assets/gt';

// 组件
import Google from '@/components/logo/Google.vue';

import { login } from '@/dictionary/tip';

// 样式
import '../../static/less/login.less';

export default {
    name: 'login',
    components: {
        Google
    },

    data () {
        return {
            isSecond: false,
            captchaFlag: false,
            validate: false,
            action: false,
            captchaMsg: false,

            email: undefined,
            password: undefined,
            captchaObj: undefined,

            label: login.email,
            color: 'info',
            msg: login.next[ 0 ],
            errEmail: '',
            errPassword: ''
        };
    },

    mounted () {
    },

    watch: {
        validate ( val ) {
            if ( val ) {
                this.errPassword = '';
                this.validatePassword();
            }
        },
        isSecond ( val ) {
            if ( val ) {
                this.gt();
                this.msg = login.next[ 1 ];
            }
        }
    },

    methods: {
        captchaReset () {
            this.validate = false;
            this.captchaObj.reset();
        },
        setErrEmail ( num ) {
            this.errEmail = login.error.email[ num ];
        },
        setErrPassword ( num ) {
            this.errPassword = login.error.password[ num ];
        },
        validatePassword () {
            if ( this.password == null || this.password === '' ) {
                this.setErrPassword( 0 );
            } else {
                this.setErrPassword( 1 );
            }
        },

        next () {

            if ( this.action ) {
                return;
            }

            if ( this.isSecond ) {
                this.nextPassword();
            } else {
                this.nextEmail();
            }
        },

        nextEmail () {
            let inp = this.$refs.email.$el.querySelector( 'input' );

            if ( /.+@.+/.test( this.email ) ) {

                this.action = true;

                window.setTimeout( () => {
                    import( '../dictionary/userInfo.js' )
                        .then( ( data ) => {

                            if ( data.default.some( el => el.email === this.email ) ) {   // 成功

                                this.isSecond = true;

                                // this.$router.push( 'home' );
                            } else {                                                      // 账号不存在

                                this.setErrEmail( 2 );
                                inp.focus();
                            }
                            this.action = false;
                        } );
                }, 1000 );
            } else {

                if ( this.email == null || this.email === '' ) {
                    this.setErrEmail( 0 );
                } else {
                    this.setErrEmail( 1 );
                }
                inp.focus();
            }
        },

        nextPassword () {

            let inp = this.$refs.password.$el.querySelector( 'input' );

            if ( ( this.password || '' ).length >= 6 ) {

                if ( this.validate ) {
                    this.action = true;
                    window.setTimeout( () => {
                        import( '../dictionary/userInfo.js' )
                            .then( ( data ) => {

                                if ( data.default.some( el => el.password === this.password ) ) {   // 成功

                                    this.$router.push( 'home' );
                                } else {                                                            // 密码错误

                                    this.setErrPassword( 2 );
                                    inp.focus();
                                    this.captchaReset();
                                }
                            } );
                        this.action = false;
                    }, 1000 );
                } else {
                    this.setErrPassword( 3 );
                }
            } else {

                this.validatePassword();
                inp.focus();
            }
        },

        gt () {
            this.captchaFlag = true;

            if ( process.env.NODE_ENV !== 'production' ) {
                $.get( '/gt/register-click' ).done( data => this._initGeetest( data ) );
            } else {
                import( '../../service/static/click' ).then( click => {
                    click.register( null, ( err, data ) => this._initGeetest( data ) );
                } );
            }
        },

        gtDemo ( captchaObj ) {
            this.captchaObj = captchaObj;
            captchaObj.appendTo( '#captcha' );

            captchaObj.onReady( () => this.captchaMsg = false );

            captchaObj.onSuccess( () => {

                let result = captchaObj.getValidate();

                if ( !result ) {
                    return alert( '请完成验证' );
                }

                if ( process.env.NODE_ENV !== 'production' ) {
                    $.ajax( {
                        url: 'gt/validate-click',
                        type: 'POST',
                        data: {

                            // username: $('#username2').val(),
                            // password: $('#password2').val(),
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode
                        },
                        success: function ( data ) {

                            if ( data.status === 'success' ) {

                                // 验证成功
                                this.validate = true;
                            } else if ( data.status === 'fail' ) {
                                console.log( '登录失败，请完成验证' );
                                this.captchaReset();
                            }
                        }.bind( this )
                    } );
                } else {
                    import( '../../service/static/click' ).then( click => {
                        click.validate( false, {
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode
                        }, ( err ) => {
                            this.validate = false;

                            if ( err ) {
                                console.log( '登录失败，请完成验证' );
                                this.captchaReset();
                            } else {
                                console.log( '登录成功' );
                            }
                        } );
                    } );
                }
            } );
        },

        _initGeetest ( data ) {

            initGeetest( {

                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: data.new_captcha,

                product: 'popup',
                width: '100%'

            }, this.gtDemo );
        }
    }
};
</script>

<style scoped lang="less">
@import url("../../static/less/mixins.less");
@import url("../../static/less/params.less");

#wait {
    text-align: center;
}
#captcha {
    @p : 16px;

    height: 0;
    padding-top: @p;
    padding-bottom: @p;
    padding-left: 16px;
    // transition: height .3s;
}

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
    transition: height .3s;

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
        padding: 20px 16px;
        color: #757575;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 2px;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        height: 36px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        font-size: 14px;
        font-weight: 500;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 6px 8px;
        min-width: 88px;
        outline: 0;
        text-transform: uppercase;
        text-decoration: none;
        -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
        position: relative;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .t {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: inherit;
            color: inherit;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: inherit;
            -webkit-box-flex: 1;
            -ms-flex: 1 0 auto;
            flex: 1 0 auto;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            margin: 0 auto;
            position: relative;
            -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            white-space: nowrap;
        }
    }

    /* 输入用户名 */
    .user-info {
        @p: 16px;

        padding-left: 16px;
        padding-top: @p;
        padding-bottom: @p;
        // margin-top: 16px;
    }

    /* 帮助 */
    .rember {

        padding-bottom: 10px;
        padding-top: 10px;
    }
    .rember-txt {
        height: auto;
        font-size: 15px;
    }

    /* 登陆后台 */
    /* .card__title {
        padding-bottom: 2px;
    } */
}
</style>
