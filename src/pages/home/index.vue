<template>
    <div>
        <v-navigation-drawer
            v-model='drawer'
            fixed
            clipped
            class='grey lighten-4'
            app>

            <v-list
                dense
                class='grey lighten-4'>

                <template v-for='(item, i) in items'>

                    <v-layout
                        v-if='item.heading'
                        :key='i'
                        row
                        align-center>

                        <v-flex xs6>
                            <v-subheader v-if='item.heading'>
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class='text-xs-right'>
                            <v-btn small flat>edit</v-btn>
                        </v-flex>
                    </v-layout>

                    <v-divider
                        v-else-if='item.divider'
                        :key='i'
                        dark
                        class='my-3'
                    ></v-divider>

                    <v-list-tile
                        v-else
                        :key='i'
                        @click='ngs( item, i )'>

                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class='grey--text'>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar color='amber' app absolute clipped-left>
            <v-toolbar-side-icon @click.native='drawer = !drawer'></v-toolbar-side-icon>
            <span class='title ml-3 mr-5'>Google&nbsp;<span class='text'>Keep</span></span>
            <v-text-field
                solo-inverted
                flat
                hide-details
                label='Search'
                prepend-inner-icon='search'
            ></v-text-field>
            <v-spacer></v-spacer>

            <div class="avatar">
                <v-menu offset-y>
                    <v-btn fab flat small round
                        slot="activator"
                        color="primary"
                    >
                        <v-avatar size="38" color="white">
                            <img :src="$store.state.user.avatar"
                                :alt="$store.state.user.name">
                        </v-avatar>
                    </v-btn>
                    <v-list>
                        <v-list-tile
                            v-for="item in 2"
                            :key="item"
                            >
                        <v-list-tile-title>{{ item }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-icon class="arrow" size="16">play_arrow</v-icon>
            </div>

        </v-toolbar>

        <v-content class="wh">
            <v-container fluid fill-height class='grey lighten-4'>
                <router-view class="wh"></router-view>
                <!-- <v-layout justify-center align-center> -->
                <!-- <v-layout align-center> -->

                    <!-- <v-flex shrink> -->
                    <!-- <v-flex> -->

                        <!-- <router-view></router-view> -->

                        <!-- <v-tooltip right>
                            <v-btn
                                slot='activator'
                                :href='source'
                                icon
                                large
                                target='_blank'>

                                <v-icon large>code</v-icon>
                            </v-btn>
                        <span>Source</span>
                        </v-tooltip>
                        <v-tooltip right>
                            <v-btn slot='activator'
                                icon
                                large
                                href='https://codepen.io/johnjleider/pen/jZQNbd'
                                target='_blank'>

                                <v-icon large>mdi-codepen</v-icon>
                            </v-btn>
                            <span>Codepen</span>
                        </v-tooltip> -->
                    <!-- </v-flex> -->
                <!-- </v-layout> -->
            </v-container>`
        </v-content>
    </div>
</template>

<script>
import mixins from '@/utils/mixins';

export default {
    name: 'home',
    mixins: [ mixins ],
    data: () => ( {

        drawer: null,
        items: [
            { icon: 'dashboard', text: 'dashboard' },

            // { icon: 'touch_app', text: 'Reminders' },
            { divider: true },
            { heading: 'Labels' },
            { icon: 'add', text: 'Create new label' },
            { divider: true },
            { icon: 'archive', text: 'Archive' },
            { icon: 'delete', text: 'Trash' },
            { divider: true },
            { icon: 'settings', text: 'Settings' },
            { icon: 'chat_bubble', text: 'Trash' },
            { icon: 'help', text: 'Help' },
            { icon: 'phonelink', text: 'App downloads' },
            { icon: 'keyboard', text: 'Keyboard shortcuts' }
        ]
    } ),

    created () {

        this.isLogin();
    },

    methods: {
        ngs ( item, index ) {
            console.log( 'ngs:', item, index );
            this.$router.push( { name: 'dashboard' } );
        }
    }
};
</script>

<style scoped lang='less'>
@import url("../../style/mixins.less");

#keep main .container {
    height: 660px;
}
.v-navigation-drawer__border {
    display: none;
}
.text {
    font-weight: 400;
}

.avatar {
    position: relative;
}

.arrow {
    // margin-left: 10px;
    transform: rotate(90deg);
    position: absolute;
    bottom: 5px;
    right: -8px;
}

</style>
