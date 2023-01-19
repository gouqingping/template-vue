<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-26 17:26:37
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-08 12:10:46
-->
<template>
	<div class="e-breadcrumb">
		<e-space wrap>
			<div class="e-breadcrumb--title">当前位置：</div>
			<!-- <div class="e-breadcrumb-item">
				<router-link to="/home" class="e-breadcrumb--text">首页</router-link>
				<span class="e-breadcrumb--separator">></span>
			</div>-->
			<div
				v-for="(item, index) in currentRoutes"
				:key="item.path + index"
				class="e-breadcrumb-item"
			>
				<template v-if="item?.name">
					<template v-if="index !== currentRoutes.length - 1">
						<router-link
							:to="item.path"
							class="e-breadcrumb--text"
							@click="linkClick(item)"
						>
							{{ item.name }}
						</router-link>
						<span class="e-breadcrumb--separator">></span>
					</template>
					<span v-else>{{ item.name }}</span>
				</template>
			</div>
		</e-space>
	</div>
</template>
<script lang="ts">
import { defineComponent, createVNode, ref, watch } from 'vue';
import ESpace from 'ant-design-vue/lib/space';
import './index.scss';
import { AnyObject } from 'igu/lib/core/utils';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'Breadcrumb',
	components: { ESpace },
	props: {
		currentBreadcrumb: {
			type: String,
			default: '',
		},
		setBreadcrumb: {
			type: Function,
			default: () => ({}),
		},
	},
	setup(props: AnyObject) {
		const currentRoutes = ref(props.currentBreadcrumb);
		const spacer = ref(createVNode('div', {}, '>'));
		const router = useRouter();
		currentRoutes.value = currentRoutes.value.filter(
			(item: { [K: string]: any }) => item.name != '',
		);
		watch(
			() => props.currentBreadcrumb,
			(currentBreadcrumb: string) => {
				currentRoutes.value = currentBreadcrumb;
			},
		);
		watch(
			() => router.currentRoute.value,
			({ name, path }: AnyObject) => {
				const currentPath =
					currentRoutes.value[currentRoutes.value.length - 1].path;
				if (currentPath != path) {
					let len = 0;
					currentRoutes.value.map(
						(item: AnyObject, index: number) => {
							if (item.name === name) {
								len = index + 1;
							}
						},
					);
					if (len > 0) {
						currentRoutes.value = currentRoutes.value.splice(
							0,
							len,
						);
					} else {
						currentRoutes.value.push({ name, path });
					}
					currentRoutes.value = currentRoutes.value.filter(
						(item: { [K: string]: any }) => item.name != '',
					);
				}
			},
			{ immediate: true },
		);
		const linkClick = (item: AnyObject) => {
			props.setBreadcrumb(item.breadcrumb);
		};
		return { spacer, currentRoutes, linkClick };
	},
});
</script>
