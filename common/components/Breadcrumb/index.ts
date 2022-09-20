/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-27 10:12:24
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-07 13:13:07
 */
import type { App } from 'vue';
import Breadcrumb from './src/index.vue';
// import { SFCWithInstall } from '../types'
// 安装
Breadcrumb.install = (app: App) => {
	app.component(Breadcrumb.name, Breadcrumb);
};
export default Breadcrumb;
