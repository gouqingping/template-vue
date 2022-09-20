/*
 * @Autor        : Pat
 * @Description  : Mock utlis
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 17:29:43
 * @LastEditors  : Pat
 * @LastEditTime : 2021-11-01 14:52:57
 */
import Mock from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
export default Mock;

export const Random: any = Mock.Random;

//生成从minNum到maxNum的随机数
export function randomNum(minNum: any, maxNum: any) {
	switch (arguments.length) {
		case 1:
			const m: any = Math.random() * (minNum + 1);
			return parseInt(m, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}
/**
 * @description: Convert English strings to uppercase letters
 * @param {string} str English strings
 * @return {string}
 * @Date: 2021-01-29 14:08:30
 * @author: Pat
 */
export const stringCase = (str: string): string =>
	str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
/**
 * @description: Determine whether the data type is not specified
 * @param {any} obj Metadata
 * @param {string} type Specify data type
 * @return {boolean}
 * @Date: 2021-01-29 14:08:30
 * @author: Pat
 */
export const isType = (obj: any, type: string): boolean =>
	Object.prototype.toString.call(obj) ===
	`[object ${stringCase(type.toLowerCase())}]`;
/**
 * @description: setup current http success data
 * @param {string} url request address
 * @param {string} method request type
 * @param {any} resultSuccess callback data
 * @param {number} timeout request time
 * @return {MockMethod[]}
 * @Date: 2021-01-27 10:08:29
 * @author: Pat
 */
export function setupMock(
	url = '',
	method = 'get',
	resultSuccess: any = {},
	explain = '暂无接口说明！',
	timeout = 100,
): MockMethod[] {
	const mocks = {
		url,
		method,
		timeout,
		response: (response: any) => {
			if (isType(resultSuccess, 'Function')) {
				return resultSuccess(response);
			}
			return resultSuccess;
		},
		explain,
	};
	return [mocks] as MockMethod[];
}

/**
 * @description: create common mock data
 * @param {any} result callback data
 * @param {number} code request callback type parameter
 * @param {string} msg Request callback message description
 * @return {Mock.mock}
 * @Date: 2021-01-27 10:09:27
 * @author: Pat
 */
export function createDataType(data: any, code = 200, msg = 'success'): any {
	return Mock.mock({ code, msg, data });
}
export function createData(data: any): any {
	return Mock.mock(data);
}
