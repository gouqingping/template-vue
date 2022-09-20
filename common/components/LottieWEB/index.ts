/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-27 10:12:24
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-09 11:27:30
 */
import type { App } from 'vue';
import LottieWEB from './src/index.vue';
// import { SFCWithInstall } from '../types'
// 安装
LottieWEB.install = (app: App) => {
	app.component('LottieWEB', LottieWEB);
};
export default LottieWEB;
