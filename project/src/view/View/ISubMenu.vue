<!--
 * @Autor        : GGos
 * @Description  : ISubMenu
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-07 14:36:39
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-09 15:57:17
-->
<template>
	<SubMenu :key="keys" :title="name">
		<template v-for="item in dataSource" :key="item.path">
			<ISubMenu
				v-if="item?.children && item?.children.length > 0"
				:key="item.path"
				:dataSource="item?.children"
				:name="item.name"
				@toPath="toPath"
			></ISubMenu>
			<MenuItem v-else @click="toPath(item)">
				<span class="el-pointer">
					{{ item.name }}
				</span>
			</MenuItem>
		</template>
	</SubMenu>
</template>
<script lang="ts">
import { SubMenu, MenuItem } from 'ant-design-vue';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
	name: 'ISubMenu',
	components: {
		SubMenu,
		MenuItem,
		ISubMenu: () => import('./ISubMenu.vue'),
	},
	props: {
		dataSource: {
			type: Array as PropType<{ [k: string]: any }[]>,
			default: () => [],
			required: true,
		},
		keys: {
			type: String,
			default: '',
			required: true,
		},
		name: {
			type: String,
			default: '',
			required: true,
		},
	},
	emits: ['toPath'],
	setup(props, { emit }) {
		const toPath = (item: { [k: string]: any }) => {
			emit('toPath', item);
		};
		return { toPath };
	},
});
</script>
