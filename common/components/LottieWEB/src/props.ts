/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-09 16:50:37
 * @LastEditors: yusha yushazh@icloud.com
 * @LastEditTime: 2022-09-08 18:39:33
 */
import type { ExtractPropTypes, PropType } from 'vue';
export const useProp = {
	dataSource: {
		type: [String, Object] as PropType<{ [k: string]: any } | string>,
		required: true,
	},
	loop: { type: [Number, Boolean], default: true },
	autoPlay: { type: Boolean, default: true },
	speed: { type: Number, default: 1 },
};

export type UseProps = ExtractPropTypes<typeof useProp>;
