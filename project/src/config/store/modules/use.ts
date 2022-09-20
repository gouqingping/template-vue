/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-10-15 15:35:30
 * @LastEditors: lyj
 * @LastEditTime: 2022-03-04 16:33:13
 */
// import { createStore, IStore } from "../core";

import { AnyObject } from 'igu/lib/core/utils';
export interface IState {
	code: string;
	token: string;
	user: AnyObject;
	testData: AnyObject;
}

const state: IState = {
	code: '',
	token: '',
	user: {},
	testData: {},
};

const updateToken = (iState: IState, token: string) => {
	iState.token = token;
};

const updateUser = (iState: IState, user: AnyObject) => {
	iState.user = user;
};
const updateTestData = (iState: IState, data: AnyObject) => {
	iState.testData = data;
};

export default {
	state,
	actions: { updateToken, updateUser, updateTestData },
	test: '123123123',
};
