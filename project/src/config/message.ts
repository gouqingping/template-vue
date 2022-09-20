/* eslint-disable prettier/prettier */
/*
 * @Autor        : Pat
 * @Description  : Warning Text
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-11-01 18:56:41
 * @LastEditors: yusha yushazh@icloud.com
 * @LastEditTime: 2022-08-04 17:32:31
 */
import { output } from '@shared/_utlis';
import { toLowerCamelCase } from 'igu/lib/core/basic';
import { AnyObject } from 'igu/lib/core/utils';
export const message: AnyObject = {
	userLoginSuccess: '登录成功',
};
/**
 * @description: output Message
 * @param {string} arg
 * @param {string} arg1
 * @return {*}
 * @Date: 2021-11-02 16:04:14
 * @author: Pat
 */
export const outputMessage = (arg: string, arg1?: string): any =>
	output(arg, arg1, message);

export const getMessage = (name: string): string => {
	name =
		name && name.lastIndexOf(':') >= 0
			? name.slice(name.lastIndexOf(':')).replace(':', '')
			: name;
	return (name && message[toLowerCamelCase(name)]) || '';
};
