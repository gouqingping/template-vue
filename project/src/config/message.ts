/* eslint-disable prettier/prettier */
/*
 * @Autor        : Pat
 * @Description  : Warning Text
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-11-01 18:56:41
 * @LastEditors: yusha yushazh@icloud.com
 * @LastEditTime: 2022-09-20 10:19:47
 */
import { output } from '@shared/_utlis';
import { toLowerCamelCase } from 'igu/lib/core/basic';
import { AnyObject } from 'igu/lib/core/utils';
export const message: AnyObject = {
	userLoginSuccess: '登录成功',
	usernameOrPasswordError: '用户名或者密码错误',
	notLogin: '未登录',
	tokenHasExpiredOrLoginOtherPlaces: 'token已失效或已在其他地方登录',
	tokenExpired: 'token过期,请重新登录',
	tokenIllegal: 'token不合法',
	tokensAreInconsistent: '用户已在别的地方登录',
	imageIsNull: 'banner图片为空',
	IdIsNull: 'id为空',
	moveTypeIsNull: '移动类型为空',
	entityNotFound: 'Entity未找到',
	titleIsNull: '标题为空',
	enNameAlreadyUsed: '标题重复',
	statusIsNul: '状态为空',
	theFirstNotMoveUp: '第一个不能上移',
	theLastNotMoveDown: '最后一个不能下移',
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
