<!--
 * @Autor        : GGos
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-13 16:21:41
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-15 15:38:35
-->
<template>
	<header class="web-portal-header el-flex el-flex-space">
		<div
			class="el-flex el-flex-align_center el-l-r-pad el-pointer"
			@click="toHome"
		>
			<EImage
				v-if="image"
				:src="image"
				width="36px"
				height="36px"
				class="el-hidden"
			/>
			<h1 class="web-portal-header--title">{{ name }}</h1>
		</div>
		<main class="el-flex el-flex-end">
			<ESpace
				direction="horizontal"
				class="web-portal-header--horizontal"
			>
				<template v-if="navs.length > 0">
					<Dropdown>
						<div v-for="nav in navs" :key="nav.path">
							{{ nav.name }}
						</div>
					</Dropdown>
				</template>
			</ESpace>
			<slot></slot>
		</main>
	</header>
</template>
<script setup lang="ts">
import './scss/index.scss';
import type { PropType } from 'vue';
import ESpace from 'ant-design-vue/lib/space';
import EImage from 'ant-design-vue/lib/image';
import { Dropdown } from 'ant-design-vue';
import { useRouter } from 'vue-router';
export interface MenuType {
	name: string;
	path: string;
	icon?: string;
}
defineProps({
	name: {
		default: '',
		type: String,
		require: true,
	},
	image: {
		default: '',
		type: String,
	},
	navs: {
		default: () => [],
		type: Array as PropType<MenuType[]>,
	},
});
const route = useRouter();
const toHome = () => {
	route.replace({ path: '/' });
};
</script>

<style lang="scss" scoped></style>
