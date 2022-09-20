/*
 * @Autor        : GGos
 * @Description  : common utils
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-07 13:55:05
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-07 14:24:47
 */

/**
 * @description: : 同一IP/域名地址下、返回本域名 ，http 直接返回路由，/ 同项目直接返回
 * @param {string} path
 * @param {string} requireSrc
 * @return {string}
 * @Date: 2022-09-07 14:24:05
 * @author: GGos
 */
export const replacePath = (
	path: string,
	requireSrc: string = location.origin,
): string => {
	if (!path) return path;
	path = path.replace(/^\s+|\s+$/g, '');
	if (path.indexOf(':/') > -1) {
		const [fastStr, lastStr] = path.split(':');
		if (fastStr.indexOf('http') == -1) {
			path = `:${lastStr}`;
		}
	}
	if (path.charAt(0) == ':') path = path.replace(':', requireSrc);
	if (path.indexOf('http') > -1) return path;
	return path;
};
