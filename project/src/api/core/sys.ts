/*
 * @Autor        : GGos
 * @Description  : sys
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-15 09:49:32
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 16:17:34
 */
import { src } from '../config/request';
import { get } from 'axios-https';
export interface SysHeaderInterface {
	image: string;
	name: string;
}

export interface SysFooterInterface {
	address: string;
	email: string;
	post: string;
	contact: string;
	copyright: string;
	recordNo: string;
	describe: string;
}

export interface SysPage {
	header: SysHeaderInterface;
	foot: SysFooterInterface;
}
/**
 * @description: 获取系统页脚
 * @return {SysFooter}
 * @Date: 2022-09-13 11:44:18
 * @author: GGos
 */
export const getSysPage = (): Promise<SysPage> =>
	get<any, SysPage>(`${src.value.BASE_URL}/home-page`);
/**
 * @description: 获取菜单
 * @return {Promise<AnyObject>}
 * @Date: 2020-07-31 14:54:01
 * @author: Pat
 */
export const getMenus = (): // id: number | string,
Promise<Array<{ [key: string]: any }>> =>
	get(`${src.value.BASE_URL_AUTHORIZE}/modules/control`, {
		system: 'PORTAL_HOME',
		// id,
	});
