/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-27 10:12:24
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-07 11:50:14
 */
import type { App } from 'vue';
import IVeiw from './src/index.vue';
// import { SFCWithInstall } from '../types'
// 安装
IVeiw.install = (app: App) => {
	app.component('IVeiw', IVeiw);
};
export default IVeiw;
