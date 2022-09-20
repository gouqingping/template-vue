/*
 * @Autor        : GGos
 * @Description  : 获取系统页脚
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-15 10:20:23
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-20 09:32:58
 */
import { Random, setupMock, stringCase, createData } from '../_utlis';
export default setupMock(
	'/home-page',
	'get',
	({ method }: any) => {
		if (stringCase(method) == stringCase('get')) {
			return createData({
				header: {
					image: '/home/egis/static_resource/home-page/header/default-logo.png',
					name: '易利GIS公共服务云平台',
				},
				foot: {
					address: '成都武侯区易利数字城市科技有限公司4楼',
					email: '',
					post: '610093',
					contact: '028-84179100',
					copyright:
						'© 2005-2021, 四川易利数字城市科技有限公司 版权所有',
					recordNo: '蜀ICP备15001263号-1',
					describe: '',
				},
			});
		}
		return "Not's method get";
	},
	'获取系统页脚',
);
