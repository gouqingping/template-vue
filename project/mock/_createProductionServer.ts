/*
 * @Autor        : Pat
 * @Description  : createProdMockServer
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 15:19:43
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-13 12:49:38
 */
// import Mock from "mockjs";
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
const modules = import.meta.globEager('./model/*.mock.ts'),
	mockModules: any[] = [];
// Traverse all .mock.ts files in the model folder as mockjs templates
Object.keys(modules).forEach((key) => {
	if (key.includes('/_')) {
		return;
	}
	mockModules.push(...modules[key].default);
});
// Used in a production environment.
// Need to manually import all modules
export function setupProdMockServer() {
	const currentMockURL: {[k:string]:any} = {};
	// console.log("%c启用mock接口%c", "color:red;font-weight:bold", "color:black;")
	Object.keys(mockModules).map((i: any) => {
		const name = mockModules[i].method + 'API';
		!currentMockURL[name] && (currentMockURL[name] = {});
		currentMockURL[name][`${mockModules[i].explain}`] = mockModules[i].url;
		// console.log(`%c${mockModules[i].url}%c`, "color:red;font-weight:bold", "color:black;")
	});
	mockModules.sort((a: any, b: any) => b.url.length - a.url.length);
	console.log(
		`%c当前启用Mock接口%c`,
		'color:red;font-weight:bold',
		'color:black;',
		currentMockURL,
	);
	createProdMockServer(mockModules);
}
