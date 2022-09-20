/*
 * @Autor        : Pat
 * @Description  : config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-29 12:39:06
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-15 14:03:59
 */
import { AnyObject } from 'igu/lib/core/utils';
import { output, eachModules, isType } from '@shared/_utlis';
export type { ErrorContent } from './config/request';
export { requestApi } from './config/request';
const configObject: AnyObject = {};
// Output the specified file in the specified folder
eachModules(import.meta.globEager('./core/*'), (key: any, item: AnyObject) => {
	const fileName: string = key
		.replaceAll('./core', '')
		.split('/')[1]
		.replace(/\.(ts|js)/, '');
	configObject[fileName] = {};
	if (item.default) configObject[fileName] = item.default;
	if (item && typeof item == 'object')
		Object.keys(item).forEach(
			(name: string) => (configObject[fileName][name] = item[name]),
		);
});

export interface DefineRequest {
	msg: string;
	code: number;
	data: AnyObject | any[];
}

export default function (configKey: any, option: Array<string> | string = '') {
	let url = '';
	if (configKey) {
		if (isType(configKey, 'Array')) {
			configKey.map(
				(item: string, index: number) =>
					(url += index == 0 ? item : `.${item}`),
			);
		} else {
			url = configKey;
		}
	}
	return output(url, option, configObject);
}
