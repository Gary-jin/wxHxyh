<template>
	<view class="flex_colT flex_items_stretch">
		<headerTop :title="article.title" showBack="true"></headerTop>
		<view class="" v-html="article.content" selectable="true">
			
		</view>
	</view>
</template>

<script>
    import headerTop from '../../components/headerTop/headerTop.vue';
	import api from '../../static/script/ajax.js';
	import {
		serviceArticleInfo,
		getArticles
	} from '../../static/script/const.js';
    export default {
        data() {
            return {
				aId:'',
				type:'',
				article:{}
            }
        },
		onLoad() {
			this.aId = this.$parseURL().id;
			this.type = this.$parseURL().type;
			this.getArticle();
		},
        methods: {
			getArticle(){
				if(this.aId){
					let param = {
						'article_id':this.aId
					}
					api._post(serviceArticleInfo,param).then((res)=>{
						if(res.code == 0){
							this.article = res.data;
						}
					})
				} else {
					let param = {
						'type':this.type
					}
					api._post(getArticles,param).then((res)=>{
						if(res.code == 0){
							this.article = res.data;
						}
					})
				}

			}
        },
        components: {
            headerTop,
        }
    }
</script>

<style>


</style>
