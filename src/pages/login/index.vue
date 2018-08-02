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
                <h1 class="tit">{{ $t( 'login.signInTit' ) }}</h1>
                <div class="txt">
                    {{ $t( 'login.signInTxt' ) }}
                </div>
            </v-card-title>

            <!-- 输入用户信息 -->
            <v-form v-model="valid" ref="form">
                <v-text-field class="user-info" ref="email"
                    v-show="!isSecond"
                    v-model.trim="email"
                    :color="color"
                    :label="$t( 'login.emailOrPhone' )"
                    autofocus
                    type="email"
                    clearable
                    :error="!!errEmail"
                    :error-messages="errEmail"
                    @input.native="errorEmailNum = undefined"
                    ></v-text-field>
                <v-text-field class="user-info" ref="password"
                    v-if="isSecond"
                    v-model.trim="password"
                    :color="color"
                    :label="$t( 'login.password' )"
                    autofocus
                    type="password"
                    clearable
                    :error="!!errPassword"
                    :error-messages="errPassword"
                    @input.native="errorPasswordNum = undefined"
                    ></v-text-field>
            </v-form>

            <!-- 忘记密码 -->
            <section class="rember">
                <v-btn class="rember-txt" flat color="info" ripple dark>{{ $t( 'login.forgetEmail' ) }}</v-btn>
            </section>

            <!-- 登陆验证 -->
            <!-- <transition name="fade">
                <div id='captcha' v-if="isSecond" :style="{ height: !!isSecond * 76 + 'px' }"></div>
            </transition> -->
            <section id='captcha' v-if="isSecond" :style="{ height: !!isSecond * 76 + 'px' }"></section>

            <!-- 帮助 -->
            <section class="help">
                <span class="t">{{ $t( 'login.problem' ) }}</span>
                <v-btn class="rember-txt" flat color="info" ripple dark small ref="btn">{{ $t( 'login.details' ) }}</v-btn>
            </section>

            <!-- 下一步 -->
            <v-card-actions>
                <div class="half">
                    <v-btn flat color="info" ripple dark
                        @click="signUp"
                        >{{ $t( 'login.signUp' ) }}</v-btn>
                </div>
                <div class="half">
                    <v-btn color="info" class="next" ripple dark @click.native="next">{{ msg }}</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
import '@/assets/gt';
import geetest from './mixins/geetest';
import login from './mixins/login';

// 组件
import Google from '@/components/logo/Google.vue';

// 样式
import '@/style/login.less';

export default {
    name: 'login',
    mixins: [ geetest, login ],
    components: {
        Google
    },

    data () {
        return {
            isSecond: false,
            validate: false,
            action: false,
            captchaMsg: false,

            email: undefined,
            password: undefined,
            captchaObj: undefined,
            valid: undefined,

            color: 'info',
            errorEmailNum: undefined,
            errorPasswordNum: undefined
        };
    },

    created () {
        this.validate = false;
        this.captchaObj = null;
    },

    mounted () {
        this.$nextTick( () => {
            this.$refs.form.$el.onsubmit = () => false;
        } );
    },

    computed: {

        // 国际化
        msg () {
            if ( this.isSecond ) {
                return this.$t( 'login.next[ 1 ]' );
            }
            return this.$t( 'login.next[ 0 ]' );
        },
        errEmail () {
            if ( typeof this.errorEmailNum === 'number' ) {
                return this.$t( `login.error.email[ ${this.errorEmailNum} ]` );
            }
            return '';
        },
        errPassword () {
            if ( typeof this.errorPasswordNum === 'number' ) {
                return this.$t( `login.error.password[ ${this.errorPasswordNum} ]` );
            }
            return '';
        }
    },

    watch: {
        validate ( val ) {
            if ( true === val ) {

                // 用户信息验证
                this.verifyUserInfo();
            }
        },
        isSecond ( val ) {
            if ( val ) {
                this.gt();
            }
        }
    },

    methods: {
        captchaReset () {
            this.validate = false;
            this.captchaObj.reset();
        },
        setErrEmail ( num ) {
            this.errorEmailNum = num;
        },
        setErrPassword ( num ) {
            this.errorPasswordNum = num;
            this.captchaReset();
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
                    this.verifyUserEmail( inp );
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

            // 先验证
            if ( 'success' !== this.validate ) {
                return this.setErrPassword( 3 );
            }

            // 登录成功
            // 应该需要调用接口登录, 这里省略
            this.action = true;
            window.setTimeout( () => {

                // 设置 Cookies, 有效期半天
                // this.$store.commit( 'SET_TOKEN', this.$store.state.user.name, .5 );

                // 成功跳转
                this.$router.push( 'home' );
            }, 1000 );
        },

        /**
         * 创建账号
         */
        signUp () {
            this.$i18n.locale = ( this.$i18n.locale === 'zh' ? 'en' : 'zh' );
        }
    }
};
</script>

<style scoped lang="less">
@import url("../../style/mixins.less");
@import url("../../style/params.less");

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
    // transition: height .1s;

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
        width: 100%;
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
        padding: 20px 0 20px 8px;
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
}
</style>
