/*
 * @Autor        : GGos
 * @Description  : type
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-09 18:23:41
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-09 18:26:32
 */
export type JumpWay = 'no' | '_blank' | '_self' | '_top';

export interface DataSourceInter {
	image: string;
	index: string | number;
	name: string;
	url: string;
	describe: string;
	jumpWay: JumpWay;
	[k: string]: any;
}
