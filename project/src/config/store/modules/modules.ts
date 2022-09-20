/*
 * @Author: lyj
 * @Date: 2021-11-04 11:23:24
 * @LastEditTime: 2022-06-08 13:46:04
 * @LastEditors: yusha yushazh@icloud.com
 * @Description:
 */
import { AnyObject } from 'igu/lib/core/utils';
export interface IState {
	modulesData: AnyObject;
}

const state: IState = {
	modulesData: {},
};

const updateModulesData = (iState: IState, modulesData: AnyObject) => {
	iState.modulesData = modulesData;
};

export default {
	state,
	actions: { updateModulesData },
};
