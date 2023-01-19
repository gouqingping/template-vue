<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-07 13:24:17
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 16:35:24
-->
<template>
	<section class="web-admin-has-sider">
		<Header :name="state.sys.base.systemName">
			<div class="web-use-login-btn" @click="quit">退出登录</div>
		</Header>
		<section class="web-admin-has-sider">
			<Sider :width="'200px'">
				<EMeun :meuns="meuns"></EMeun>
			</Sider>
			<Content>
				<div class="el-layout-content">
					<div v-if="!isHome" class="el-breadcrumb">
						<Breadcrumb
							:currentBreadcrumb="state.route.currentBreadcrumb"
							:setBreadcrumb="actions.setBreadcrumb"
						/>
					</div>
					<div
						:class="!isHome ? 'el-content' : ''"
						:style="isHome ? 'width:100%;height:100%' : ''"
					>
						<RouterView></RouterView>
					</div>
				</div>
			</Content>
		</section>
	</section>
</template>

<script setup lang="ts">
import './index.scss';
import { RouterView, useRouter } from 'vue-router';
import Header from '@components/Header';
import Content from '@components/Content';
import Sider from '@components/Sider';
import { state, actions } from '@config/store';
import Breadcrumb from '_common/components/Breadcrumb';
import { getMenus } from './api';
import { AnyObject, cloneDeep } from 'igu/lib/core/utils';
import { ref, Ref, watchEffect } from 'vue';
import EMeun from './core/menu.vue';
import { isArray } from 'igu/lib/core/basic';

const route = useRouter();
const isHome: Ref<boolean> = ref(false);
watchEffect(() => {
	isHome.value = route.currentRoute.value.path == '/';
});

const meuns: Ref<AnyObject[]> = ref([
	{
		id: 5,
		name: '首页',
		url: '/',
		sort: 1,
		childModules: [],
	},
	{
		id: 291,
		name: '地图测试',
		url: '/',
		sort: 7,
		childModules: [
			{
				id: 292,
				parentId: 291,
				name: '高德地图',
				url: 'https://amap.com/',
				sort: 1,
				childModules: [],
			},
		],
	},
	{
		parentId: 293,
		name: '配置管理',
		url: '/Configure',
		sort: 2,
		childModules: [
			{
				id: 294,
				parentId: 293,
				name: '站点信息',
				url: 'Configure/siteInformation',
				sort: 1,
			},
			{
				id: 295,
				parentId: 293,
				name: '页面配置',
				url: 'Configure/pageConfigure',
				sort: 3,
			},
		],
	},
]);

const setMenusBreadcrumb = (menus: AnyObject[], parent?: AnyObject[]) => {
	if (!isArray(menus)) return menus;
	const arr = menus.map((item: AnyObject) => {
		const _item: AnyObject = {
			// ...item,
			name: item.name,
			path: item.url.indexOf('http') > -1 ? item.url : '/' + item.url,
			meta: {
				sort: item.sort,
				isMenu: true,
			},
			children: item.childModules,
			breadcrumb: [],
		};
		const { name, meta, path } = _item;
		const currentBreadcrumbObj = { name, meta, path };
		const updateCurrentBread = parent
			? [...parent, currentBreadcrumbObj]
			: [currentBreadcrumbObj];
		const childs = _item?.children;
		childs?.length > 0 &&
			updateCurrentBread.push({
				name: childs[0].name,
				meta: {
					sort: childs[0].sort,
					isMenu: true,
				},
				path: childs[0].path,
			});
		const currentBreadcrumb = {
			name,
			meta,
			path,
			breadcrumb: updateCurrentBread,
		};
		const breadcrumb = parent
			? [...parent, currentBreadcrumb]
			: [currentBreadcrumb];
		if (childs?.length > 0) {
			_item.children = cloneDeep(
				setMenusBreadcrumb(_item?.children, breadcrumb),
			);
		} else {
			_item.children = undefined;
		}
		_item.breadcrumb = breadcrumb;
		return _item;
	}) as unknown as AnyObject[];
	return arr;
};

// 退出系统
const quit: () => void = () => {
	// const userId = outputStore('use.user.id');
	// console.log(userId);
};
meuns.value = setMenusBreadcrumb(meuns.value);
getMenus().then((res: AnyObject[]) => {
	if (!isArray(res)) return;
	meuns.value = setMenusBreadcrumb(res);
	actions.updateMenu(meuns.value);
});
</script>
