<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-08-19 17:40:48
 * @LastEditors  : Pat
 * @LastEditTime : 2022-08-23 14:09:11
-->
<template>
	<aside
		class="web-admin-sider"
		:style="`flex: 0 0 ${width}; max-width: ${width}; min-width: ${width}; width: ${width};`"
	>
		<slot></slot>
	</aside>
</template>
<script setup lang="ts">
import './scss/index.scss';
defineProps({
	width: {
		default: '200px',
		type: String,
	},
});
</script>

<style lang="scss" scoped></style>
