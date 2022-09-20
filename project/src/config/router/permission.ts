/*
 * @Autor        : Pat
 * @Description  : Router intercept processing
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-02-30 10:40:45
 * @LastEditors: WF0223 2908977907@qq.com
 * @LastEditTime: 2022-07-06 10:51:49
 */
import { setup } from '@shared/storage';
import { isEqual } from 'igu/lib/core/basic';
import { outputStore, actions } from '@config/store';
import asyncRoutes from './core/asyncRoutes';
import { cloneDeep, AnyObject } from 'igu/lib/core/utils';
import {
	RouteLocationNormalized,
	NavigationGuardNext,
	Router,
} from 'vue-router';
let currentRouters: any;
const _Str: AnyObject = String.prototype,
	_Arr: AnyObject = Array.prototype;
_Str.toSplit = function (str: string) {
	return this.includes(str) && this.split(str);
};
_Arr.firstOf = function () {
	return this.length > 0 && this[0];
};
/**
 * @description: set allow back
 * @param {boolean} allowBack Verify that the browser can fall back
 * @Date: 2021-03-29 11:49:03
 * @author: Pat
 */
const setAllowBack = (allowBack: boolean) =>
	!allowBack &&
	(setup('allowBack', false), history.pushState(null, '', location.href));

const setAsyncRoute = (fullPath: string) => {
	const [currentFullPath, currentRoutes]: any[] = [
		fullPath.replace('/', '').split('/'),
		asyncRoutes,
	];
	const currentRoute: AnyObject | undefined = currentRoutes.find(
		(item: AnyObject) => item.path.includes(fullPath),
	);
	if (currentRoute) return currentRoute;
	const [firstFullPath, ...childrenPath]: string = currentFullPath;
	const currentRoutePath: AnyObject | undefined = currentRoutes.filter(
		(item: AnyObject) =>
			item.path.includes(firstFullPath) ||
			item.path.includes(childrenPath),
	);
	if (!currentRoutePath) return;
	return currentRoutePath;
};
/**
 * @description: set router
 * @param {AnyObject} param router object
 * @Date: 2021-03-30 11:02:42
 * @author: Pat
 */
export default (route: Router) => {
	const { beforeEach, addRoute } = route;
	const home = ((asyncRoutes || []) as any).firstOf();
	home && addRoute(home);
	// This's vue router beforeEcah routers
	beforeEach(
		async (
			to: AnyObject,
			{ path: _fromPath }: RouteLocationNormalized,
			next: NavigationGuardNext,
		) => {
			const pageName = outputStore('sys.base.systemName');
			// const { paths } = outputStore('route');
			// let { code } = getUrlQuery(location.href);
			to.fromPath = _fromPath;
			const {
				path: _toPath,
				meta: { name: _toMetaTitle, allowBack, isAuth },
				name: _toName,
				fullPath,
			} = to as AnyObject;
			// Used as a login page, the browser cannot move forward or backward
			// Exist current to router name
			// Document title is current to router name
			document.title = `${pageName ? `${pageName} - ` : ''}${
				_toMetaTitle || _toName
			}`;
			// Not's allowBack set localStorage item allowBack is allowBack
			// Set current history is current location href
			setAllowBack(allowBack);
			history.replaceState({ ...history.state }, _toPath);
			if (isAuth) {
				next();
			} else {
				let n = setAsyncRoute(_toPath);
				n = Array.isArray(n) ? n : [n];
				// Vue Router saves information on the history.state.
				// If you have any code manually calling history.pushState(),
				// you should likely avoid it or refactor it with a regular router.push() and a history.replaceState()
				// https://next.router.vuejs.org/guide/migration/#removal-of-unnamed-parameters
				// routes.forEach(({ path }: AnyObject) => history.replaceState({ ...history.state }, path));
				if (n) {
					actions.generateRoutes(n);
					// removeRoute(paths[0]);

					if (!isEqual(currentRouters, n[n.length - 1])) {
						currentRouters = cloneDeep(n[n.length - 1]);
						addRoute(currentRouters);
						// This's not exist router
						// This's router next path default path
						next(fullPath);
					} else {
						next();
					}
				} else {
					next();
				}
			}
		},
	);
	return route;
};
