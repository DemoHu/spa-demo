<template>
    <div id="test">
        <h1>test</h1>
        <p>{{ $t("message.hello") }}</p>
    </div>
</template>

<script>
import z from 'commonJS';

export default {
    name: 'test',
    created () {
        console.log( 'z:', z );
    }
};
</script>
