<template>
    <v-app>
        <v-card class="login"
            width="450"
            height="508">

            <!-- 进度条 -->
            <v-progress-linear
                class="progress"
                height="4"
                :indeterminate="true"
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
        </v-card>
    </v-app>
</template>

<script>
import Google from '@/components/logo/Google.vue';

export default {
    name: 'login',
    components: {
        Google
    }
};
</script>

<style scoped lang="less">
@import url("../../static/less/mixins.less");
@import url("../../static/less/params.less");

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
}
</style>
