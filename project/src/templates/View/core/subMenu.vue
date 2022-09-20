<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-07 15:25:29
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 11:00:02
-->
<template>
	<SubMenu v-if="items.children && !isUnaidedMenu(items)" :key="items.path">
		<template v-if="items?.icon" #icon>
			<RenderVNode :vn="items?.icon"></RenderVNode>
		</template>
		<template #title>{{ items.name }}</template>
		<ItemMenu
			v-for="(subItem, index) in items.children"
			:key="index"
			:items="subItem"
		></ItemMenu>
	</SubMenu>
	<template v-else-if="isMenu(items)">
		<MenuItem :key="items.path" @click="toPath(items)">
			<a class="router-link-active router-link-exact-active">
				{{ items.name }}
			</a>
			<!-- <RouterLink :to="items.path">{{ items.name }}</RouterLink> -->
		</MenuItem>
	</template>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { MenuItem, SubMenu } from 'ant-design-vue';
import { AnyObject } from 'igu/lib/core/utils';
import { useRouter } from 'vue-router';
import { actions } from '@config/store';
import { RenderVNode } from '@elgis/ui-component/lib/_utlis';
import { replacePath } from '_common/utils';
export default defineComponent({
	name: 'ItemMenu',
	components: {
		MenuItem,
		SubMenu,
		RenderVNode,
		ItemMenu: () => import('./subMenu.vue'),
	},
	props: {
		items: {
			type: Object as PropType<
				| {
						path: string;
						name: string;
						children: AnyObject[];
						icon?: string;
						[key: string]: any;
				  }
				| any
			>,
			default: () => ({}),
		},
	},
	setup(props) {
		const router = useRouter();
		const { path, breadcrumb } = props.items as AnyObject;
		const isMenu = (items: AnyObject) => items?.meta?.isMenu;
		const isUnaidedMenu = (items: AnyObject) => items?.meta?.isUnaidedMenu;
		const route = router.currentRoute;
		route.value.path == path && actions.setBreadcrumb(breadcrumb);
		const toPath = ({ breadcrumb, path }: AnyObject) => {
			actions.setBreadcrumb(breadcrumb);
			actions.setViewPath(path);
			if (replacePath(path).indexOf('http') > -1) {
				router.replace({ path: '/view', query: { replace: path } });
			} else {
				router.replace({ path });
			}
		};
		return { isMenu, isUnaidedMenu, toPath };
	},
});
</script>

<style></style>
