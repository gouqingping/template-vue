/*
 * @Autor        : Pat
 * @Description  : Router Config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2022-05-09 16:07:56
 */
import type { App } from 'vue';
import routerBeforeEach from './permission';
import constantRoutes from './core/constantRoutes';
import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouteLocationNormalized,
	RouteLocationRaw,
} from 'vue-router';
const router = createRouter({
	history: createWebHistory(), //createWebHashHistory or createWebHistory,
	routes: [...constantRoutes] as RouteRecordRaw[],
	strict: false,
	async scrollBehavior(to: any, from: any, savedPosition: any) {
		// await scrollWaiter.wait();
		// Use predefined scroll behavior if defined, defaults to no scroll behavior
		const behavior = 'smooth';
		// Returning the `savedPosition` (if available) will result in a native-like
		// behavior when navigating with back/forward buttons
		if (savedPosition) {
			return { ...savedPosition, behavior };
		}
		// Scroll to anchor by returning the selector
		if (to.hash) {
			return { el: decodeURI(to.hash), behavior };
		}
		// Check if any matched route config has meta that discourages scrolling to top
		if (
			to.matched.some(
				(m: RouteLocationNormalized) => m.meta.scrollToTop === false,
			)
		) {
			// Leave scroll as it is
			return false;
		}
		// Always scroll to top
		return { left: 0, top: 0, behavior };
	},
});

const originalPush = router.push;
router.push = function push(location: RouteLocationRaw) {
	return originalPush.call(this, location);
};

routerBeforeEach(router);
export const setRoute = (app: App<Element>) => {
	app.use(router);
	// Mount when the route is ready
	router.isReady().then(() => {
		app.mount('#app', true);
	});
};
export default router;
