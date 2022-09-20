/*
 * @Author: 王菲 2908977907@qq.com
 * @Date: 2022-09-17 10:29:35
 * @LastEditors: 王菲 2908977907@qq.com
 * @LastEditTime: 2022-09-17 16:38:40
 * @FilePath: \egis-web\egis-portal-manage\src\config\store\modules\menu.ts
 * @Description:
 */
import { AnyObject } from 'igu/lib/core/utils';
// import { constantRoutes } from '@/router';
// const modules = import.meta.glob('./../../view/**/*.vue');
export interface IState {
	data: AnyObject[];
}

const state: IState = {
	data: [],
};

const updateMenu = (iState: IState, data: AnyObject[]) => {
	iState.data = data;
};

export default {
	state,
	actions: { updateMenu },
};
