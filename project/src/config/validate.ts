/* eslint-disable prettier/prettier */
/*
 * @Autor        : Pat
 * @Description  : validate
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-11-02 16:39:35
 * @LastEditors: yusha yushazh@icloud.com
 * @LastEditTime: 2022-06-22 15:21:55
 */
import { AnyObject } from 'igu/lib/core/utils';
import { outputMessage } from './message';

// 防止xss攻击
export const validatorXSS = {
	validator: async (_rule: AnyObject, value: string) => {
		const en: AnyObject = /[`~!@#$%^&*()_+<>?:"{}./;'[]]/im;
		const cn: AnyObject = /[·！#￥（——）：；“”‘、|《。》？、【】[\]]/im;
		if (!en.test(value) || !cn.test(value)) {
			return Promise.reject('文本内容携带 XSS 嫌疑！请规范输入。');
		} else {
			return Promise.resolve();
		}
	},
	trigger: ['change', 'blur'],
};

// 图层名称修改
export const validatorLength = (min: number, max: number) => {
	return {
		min,
		max,
		message: `长度必须大于等于 ${min} 小于等于 ${max}`,
		trigger: 'input',
	};
};

export const validatorFileSize = (size: number) => {
	return {
		validator: async (_rule: AnyObject, value: File) => {
			if (value.size > size) {
				return Promise.reject(`文件不能大于 ${size} KB`);
			} else {
				return Promise.resolve();
			}
		},
		trigger: ['change', 'blur'],
	};
};

// 不能输入特殊符号
export const notEditSpecialSymbol = [
	{
		validator: async (_rule: AnyObject, value: string) => {
			const txt: AnyObject = /^[\u4e00-\u9fa5a-z0-9_-]+$/gi;
			if (!txt.test(value)) {
				return Promise.reject('不能输入特殊符号，如：！#￥%!');
			} else {
				return Promise.resolve();
			}
		},
		trigger: ['change', 'blur'],
	},
];
// 中文名称输入 不能以数字开头
export const notNumberStartsCN = [
	{
		validator: async (_rule: AnyObject, value: string) => {
			const txt: AnyObject = /^(?![0-9])[\u4e00-\u9fa5a-z0-9_-]+$/gi;
			if (!txt.test(value)) {
				return Promise.reject(
					'不能以数字开头、不能输入特殊符号(如：！#￥%!)',
				);
			} else {
				return Promise.resolve();
			}
		},
		trigger: ['change', 'blur'],
	},
];
// 英文名称输入 不能以数字开头、不能输入中文
export const notNumberStartsEN = [
	{
		validator: async (_rule: AnyObject, value: string) => {
			const txt: AnyObject = /^(?![0-9])[a-z0-9_-]+$/gi;
			if (!txt.test(value)) {
				return Promise.reject(
					'不能以数字开头、不能输入中文及特殊符号(如：！#￥%!)',
				);
			} else {
				return Promise.resolve();
			}
		},
		trigger: ['change', 'blur'],
	},
];
// 用户名验证
export const userName = [
	{ required: true, message: '请输入用户名', trigger: 'blur' },
	{
		validator: async (_rule: AnyObject, value: string) => {
			if (!/^[A-z][A-z0-9_-]/.test(value)) {
				return Promise.reject('只能以英文字母开头');
			} else {
				return Promise.resolve();
			}
		},
		trigger: ['change', 'blur'],
	},
	validatorLength(4, 20),
];
// 路径输入 不能以数字开头、不能输入中文
export const notNumberStartsUrl = [
	{
		validator: async (_rule: AnyObject, value: string) => {
			const txt: AnyObject =
				/^(?![0-9])(?!http)(?!https)(?!\/)[a-z0-9/_-]+(?<!\/)$/gi;
			if (!txt.test(value)) {
				return Promise.reject(
					'不能以数字开头、不能输入中文及特殊符号(如：！#￥%!)',
				);
			} else {
				return Promise.resolve();
			}
		},
		trigger: ['change', 'blur'],
	},
];
// 模板名称
export const modelName = [
	{ required: true, message: '请输入模板名称', trigger: 'blur' },
	...notEditSpecialSymbol,
];
// 用户密码验证
export const password = [
	{
		required: true,
		message: '请输入密码',
		trigger: ['change', 'blur', 'input'],
	},
	validatorLength(4, 20),
];
// 分组名称验证
export const groupEnterName = [
	{
		required: true,
		message: outputMessage('groupEnterName'),
		trigger: 'blur',
	},
	validatorLength(1, 20),
	...notEditSpecialSymbol,
];
// 关键字查询
export const layerKeywordQuery = [
	{
		required: true,
		message: outputMessage('layerKeywordQuery'),
		trigger: 'blur',
	},
];
// 图层名称修改
export const layerEnterName = [
	{
		required: true,
		message: outputMessage('layerEnterName'),
		trigger: 'blur',
	},
];
// 中文名称验证
export const cnName = [
	{
		required: true,
		message: '中文名称不能为空',
		trigger: ['change', 'blur', 'input'],
	},
	...notNumberStartsCN,
	validatorLength(1, 20),
];
// 英文名称验证
export const enName = [
	{
		required: true,
		message: '英文名称不能为空',
		trigger: ['change', 'blur', 'input'],
	},
	...notNumberStartsEN,
	validatorLength(1, 20),
];
// 服务名称验证
export const serviceName = [
	{
		required: true,
		message: '服务名称不能为空',
		trigger: ['change', 'blur', 'input'],
	},
	...notNumberStartsCN,
	validatorLength(1, 20),
];
// 服务类型验证
export const serviceType = [
	{
		required: true,
		message: '服务类型不能为空',
		trigger: ['change'],
	},
];
// 自定义地图验证
export const customizeMap = [
	{
		required: true,
		message: '自定义地图不能为空',
		trigger: ['change'],
	},
];
// 名称验证
export const name = [
	{
		required: true,
		message: '名称不能为空',
		trigger: ['change'],
	},
	...notNumberStartsCN,
	validatorLength(1, 20),
];
// 过期时间验证
export const expiryDate = [
	{
		required: true,
		message: '过期时间不能为空',
		trigger: ['change'],
	},
];
// 系统名称验证
export const system = [
	{
		required: true,
		message: '系统名称不能为空',
		trigger: ['change'],
	},
];
// 模块验证
export const url = [
	{
		required: true,
		message: '模块路径不能为空',
		trigger: ['change'],
	},
	...notNumberStartsUrl,
];
// 昵称
export const nickName = [
	{
		required: true,
		message: '昵称不能为空',
		trigger: ['inout', 'blur'],
	},
	...notNumberStartsCN,
];
