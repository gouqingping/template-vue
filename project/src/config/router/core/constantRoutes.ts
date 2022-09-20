/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:08:20
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 15:59:20
 */

import type { RouteRecordRaw } from 'vue-router';
export default [
	{
		path: '/',
		name: '',
		meta: {
			isMenu: false,
		},
		component: () => import('@templates/View/index.vue'),
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
				name: '',
				meta: {
					isAuth: true,
					noLogin: true,
				},
				component: () => import('@templates/View/core/view.vue'),
			},
		],
	},
] as RouteRecordRaw[];
