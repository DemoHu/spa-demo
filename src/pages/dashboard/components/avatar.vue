<template>
    <div class="avatar-container">
        <v-card>
            <v-card-media class="img"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
                >
            </v-card-media>

            <v-card-actions class="actions">

                <v-avatar class="avatar" size="70" color="white">
                    <!-- class="animated bounce"  -->
                    <img :class="[ 'avator', {
                        animated: hover,
                        bounce: hover
                    } ]"
                        @mouseenter="hover = true"
                        @animationend="hover = false"
                        :src="$store.state.user.avatar"
                        :alt="$store.state.user.name">
                </v-avatar>

                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <div class="progress">
                <div v-for="(item, index) in progressList" :key="index">
                    <v-slide-y-transition>
                        <span class="label" v-show="show">{{ item.title }}</span>
                    </v-slide-y-transition>
                    <v-slide-y-transition>
                        <v-progress-linear v-show="show" v-model="item.value"
                            :color="item.value === 100 ? 'success' : 'info'"></v-progress-linear>
                    </v-slide-y-transition>
                    <div class="check" v-show="show">
                        <v-slide-y-transition><span v-if="item.value !== 100">{{ `${item.value}%` }}</span></v-slide-y-transition>
                        <v-slide-y-transition>
                            <v-icon color="success" v-if="item.value === 100">check_circle</v-icon>
                        </v-slide-y-transition>
                    </div>
                </div>
            </div>

        </v-card>
    </div>
</template>
<script>
export default {
    name: 'avator',
    data () {
        return {
            show: true,
            hover: false,

            progressList: [
                { title: 'CSS', value: 24 },
                { title: 'JavaScript', value: 50 },
                { title: 'Vue', value: 100 }
            ]
        };
    },

    mounted () {
        console.log( 'user:', this.$store.state.user.avatar );
    },

    methods: {
    }
};
</script>

<style lang="less">
@import url("../../../style/mixins.less");

/* 图片缩放 */
.img {
    &:hover .v-card__media__background {
        transform: scale(1.1);
    }

    .v-card__media__background {
        transition: transform 1s;
    }
}

/* 头像设置 */
.actions {
    position: relative;
    padding: 20px;

    .avatar {
        position: absolute;
        top: 0;
        left: 20px;
        transform: translateY(-50%);
        border: 5px solid #fff;
        box-sizing: content-box;
    }
}

.avatar-container {
    padding: 20px;
}

.progress {
    padding: 20px;
    padding-top: 0;

    .v-progress-linear {
        border-radius: 3.5px;
        position: relative;
    }

    > div {
        position: relative;
        padding: 0 50px 0 20px;

        .check {
            .setWH( 24px );
            position: absolute;
            right: 20px;
            bottom: 3.5px;
            transform: translateY(50%) translateX(50%);
        }
    }
}

</style>
