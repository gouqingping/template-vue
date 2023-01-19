/*
 * @Author: WF0223 2908977907@qq.com
 * @Date: 2022-06-13 09:04:40
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 09:37:36
 * @FilePath: \web-web\web-admin-manage\src\templates\View\api\index.ts
 * @Description:
 */
import { get } from 'axios-https';
import { src } from '@api/config/request';

/**
 * @description: 获取菜单
 * @return {Promise<AnyObject>}
 * @Date: 2020-07-31 14:54:01
 * @author: Pat
 */
export const getMenus = (): // id: number | string,
Promise<Array<{ [key: string]: any }>> =>
	get(`${src.value.BASE_URL_AUTHORIZE}/modules/control`, {
		system: 'PORTAL',
		// id,
	});
// get(`/menu.config.json`, {});
