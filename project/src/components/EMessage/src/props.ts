/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-09 16:50:37
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-12 13:18:35
 */
import type { ExtractPropTypes, PropType } from 'vue';
export const useProp = {
	// 消息类型
	type: {
		type: String as PropType<string>,
		default: 'default',
		validator: (value: string) =>
			['default', 'primary', 'success', 'warning', 'info', 'error'].includes(value),
	},
	// 消息内容
	message: {
		// type: (Array || String || Object) as PropType<string | VNode | VNode[] | any>,
		default: '',
	},
	// 是否居中
	center: {
		type: String as PropType<string>,
		validator: (value: string) => ['left', 'center', 'right'].includes(value),
		default: 'left',
	},
	// 显示位置
	position: {
		type: String as PropType<string>,
		validator: (value: string) =>
			[
				'top-right',
				'top-left',
				'bottom-right',
				'bottom-left',
				'top',
				'bottom',
				'right',
			].includes(value),
		default: 'top',
	},
	// 动画位置
	animation: {
		type: String as PropType<string>,
		validator: (value: string) =>
			[
				'top-right',
				'top-left',
				'bottom-right',
				'bottom-left',
				'top',
				'bottom',
				'right',
				'center',
			].includes(value),
		default: 'top',
	},
	time: {
		type: Number as PropType<number>,
		default: 1,
	},
	zIndex: {
		type: Number as PropType<number>,
		default: 99999,
	},
	// 显示时间, 毫秒。设为 0 则不会自动关闭
	showClose: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	// 是否开启快速跳转至某页
	duration: {
		type: Number as PropType<number>,
		default: 3000,
	},
	// 距离窗口顶部的偏移量
	offset: {
		type: (Number as PropType<number>) || (String as PropType<string>),
		default: 20,
	},
	// 距离窗口顶部的偏移量
	onClose: {
		type: Function as PropType<(...agrs: any[]) => void>,
		default: () => '',
	},
	id: {
		type: String as PropType<string>,
		default: '',
	},
};

export type UseProps = ExtractPropTypes<typeof useProp>;
