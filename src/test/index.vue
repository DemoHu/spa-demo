<template>
    <div id="test">
        <h1>test</h1>
        <p>{{ $t("message.hello") }}</p>
    </div>
</template>

<script>
import z from 'commonJS';
import { setToken } from './js-cookies';

export default {
    name: 'test',
    created () {
        console.log( 'z:', z );

        // 单位是 天
        setToken( 'admin', .5 );

        console.log( 'this:', this.$store );
    }
};
</script>
