/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:08:20
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-13 10:29:36
 */

import type { RouteRecordRaw } from 'vue-router';
export default [
	{
		path: '/',
		name: '',
		meta: {
			isMenu: false,
		},
		component: () => import('@view/View/IRoute.vue'),
		children: [
			{
				path: '/:pathMatch(.*)*',
				name: 'not-found',
				component: () => import('@view/Error'),
			},
			{
				path: '',
				name: '首页',
				component: () => import('@view/Home.vue'),
			},
			{
				path: 'view',
				name: 'View',
				component: () => import('@view/View/IView.vue'),
			},
		],
	},
] as RouteRecordRaw[];
