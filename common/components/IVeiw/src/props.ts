/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-09 16:50:37
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-07 11:37:41
 */
import type { ExtractPropTypes, PropType } from 'vue';
export const useProp = {
	src: {
		default: '',
		require: true,
		type: String as PropType<string>,
	},
};

export type UseProps = ExtractPropTypes<typeof useProp>;
