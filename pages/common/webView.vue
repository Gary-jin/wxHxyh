<template>
	<view class="flex_colT flex_items_stretch">
		 <web-view  :src="url"></web-view>
	</view>
</template>

<script>
    
    export default {
        data() {
            return {
				url:''
            }
        },
		onLoad() {
			this.url = this.$parseURL().url;
		},
        methods: {

        },
        components: {
           
        }
    }
</script>

<style>


</style>
