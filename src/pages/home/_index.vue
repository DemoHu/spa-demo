<template>
    <div>
        <v-navigation-drawer
            persistent
            :style="{ background: '#eee' }"
            :mini-variant='miniVariant'
            :clipped='clipped'
            v-model='drawer'
            enable-resize-watcher
            fixed
            app>

            <v-list>
                <v-list-tile
                    value='true'
                    v-for='(item, i) in items'
                    :key='i'>

                    <v-list-tile-action>
                        <v-icon v-html='item.icon'></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text='item.title'></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
            app
            :clipped-left='clipped'>

            <v-toolbar-side-icon @click.stop='drawer = !drawer'></v-toolbar-side-icon>
            <v-btn icon @click.stop='miniVariant = !miniVariant'>
                <v-icon v-html='miniVariant ? "chevron_right" : "chevron_left"'></v-icon>
            </v-btn>
            <v-btn icon @click.stop='clipped = !clipped'>
                <v-icon>web</v-icon>
            </v-btn>
            <v-btn icon @click.stop='fixed = !fixed'>
                <v-icon>remove</v-icon>
            </v-btn>
            <v-toolbar-title v-text='title'></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop='rightDrawer = !rightDrawer'>
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>

        <v-footer :fixed='fixed' app>
            <span>&copy; 2017</span>
        </v-footer>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [ {
                icon: 'bubble_chart',
                title: 'Inspire'
            } ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        };
    }
};
</script>
