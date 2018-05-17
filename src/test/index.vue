<template>
    <div id="test">
        <h1>test</h1>
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
