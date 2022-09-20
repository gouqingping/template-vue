<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-07 14:12:27
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-08 10:21:28
-->
<template>
	<Menu
		v-model:selectedKeys="state.selectedKeys"
		v-model:openKeys="openKeys"
		class="el-custom-menu"
		mode="inline"
		@select="selectMenu"
		@click="evntClick"
	>
		<CustomSubMenu
			v-for="item in routeMenus"
			:key="item.path"
			:items="item"
			@evntClick="evntClick"
		></CustomSubMenu>
	</Menu>
</template>
<script lang="ts" setup>
import { Menu } from 'ant-design-vue';
import CustomSubMenu from './subMenu.vue';
import { AnyObject } from 'igu/lib/core/utils';
import { PropType, reactive, ref, Ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const porps = defineProps({
	meuns: {
		type: Array as PropType<AnyObject[]>,
		// eslint-disable-next-line vue/require-valid-default-prop
		default: [],
	},
});

const routeMenus: Ref<AnyObject[]> = ref(porps.meuns);
const route = useRoute();
const openKeys: Ref<(string | undefined)[]> = ref([porps.meuns[0]?.path]);

watchEffect(() => {
	routeMenus.value = porps.meuns;
});

const updatePath = (): (string | undefined)[] => {
	const paths = route.path.split('/');
	let definePath = '';
	return paths
		.map((item: string) => {
			if (item) {
				definePath += `/${item}`;
				return definePath;
			}
			return;
		})
		.filter((path) => !!path);
};

const evntClick = ({ keyPath }: AnyObject) => {
	openKeys.value = keyPath;
};

const state = reactive({
	selectedKeys: updatePath(),
});

watchEffect(() => {
	state.selectedKeys = updatePath();
	openKeys.value = updatePath();
});

function selectMenu() {
	state.selectedKeys = updatePath();
	openKeys.value = updatePath();
}
</script>
