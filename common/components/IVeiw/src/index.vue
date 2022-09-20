<!--
 * @Autor        : GGos
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-07 09:30:00
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-07 11:55:13
-->
<template>
	<div class="e-viewer">
		<object :data="src" class="e-viewer">
			<embed :src="src" class="e-viewer" />
		</object>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useProp } from './props';
import './index.scss';
const prop = defineProps(useProp);
const isPreview = ref(false);
const rendType = (url: string) => {
	const pop: string = (url && url.split('.').pop()) || '';
	isPreview.value = ['pdf', 'doc', 'docx'].includes(pop);
};
rendType(prop.src);
watch(
	() => prop.src,
	(url: string) => rendType(url),
);
</script>
