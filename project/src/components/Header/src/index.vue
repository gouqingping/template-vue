<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-08-19 17:40:48
 * @LastEditors  : Pat
 * @LastEditTime : 2022-08-22 15:03:50
-->
<template>
	<header class="egis-portal-header el-flex el-flex-space">
		<h1 class="egis-portal-header--title">{{ name }}</h1>
		<main class="el-flex el-flex-end">
			<ESpace
				direction="horizontal"
				class="egis-portal-header--horizontal"
			>
				<template v-if="navs.length > 0">
					<div v-for="nav in navs" :key="nav.key">{{ nav.name }}</div>
				</template>
			</ESpace>
			<slot></slot>
		</main>
	</header>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import ESpace from '@elgis/ui-component/lib/ESpace';
import './scss/index.scss';
export interface MenuType {
	name: string;
	key: string;
	icon?: string;
}
defineProps({
	name: {
		default: '',
		type: String,
		require: true,
	},
	navs: {
		default: () => [],
		type: Array as PropType<MenuType[]>,
	},
});
</script>

<style lang="scss" scoped></style>
