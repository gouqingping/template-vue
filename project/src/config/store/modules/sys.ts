/*
 * @Autor        : Pat
 * @Description  : User Store
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-15 17:38:58
 */
import { base, api } from '@config/amb';
import { AnyObject } from 'igu/lib/core/utils';

export interface SysState {
	base: AnyObject;
	api: AnyObject;
}

export interface SysActions {
	setBase: (iState: SysState, config: AnyObject) => void;
	setApi: (iState: SysState, api: AnyObject) => void;
	setsys: (iState: AnyObject, config: AnyObject) => void;
}

const state: SysState = {
	base,
	api,
};

const actions: SysActions = {
	setBase: (iState: SysState, config: AnyObject) => {
		iState.base = config;
	},
	setApi: (iState: SysState, api: AnyObject) => {
		iState.api = api;
	},
	setsys: (iState: AnyObject, config: AnyObject) => {
		Object.keys(config).forEach((key: string) => {
			iState[key] = config[key];
		});
	},
};

export default {
	namespaced: true,
	state,
	actions,
};
