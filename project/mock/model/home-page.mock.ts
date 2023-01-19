/*
 * @Autor        : GGos
 * @Description  : 获取系统页脚
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-09-15 10:20:23
 * @LastEditors  : GGos
 * @LastEditTime : 2022-09-20 09:32:58
 */
import { setupMock, stringCase, createData } from '../_utlis';
export default setupMock(
	'/home-page',
	'get',
	({ method }: any) => {
		if (stringCase(method) == stringCase('get')) {
			return createData({
				header: {
					image: '',
					name: 'WEB PRO',
				},
				foot: {
					address: '四川省成都市天府新区',
					email: '',
					post: '610093',
					contact: '028-XXXXXXXX',
					copyright: '© 2005-2021, GGOS 版权所有',
					recordNo: '蜀ICP备XXXXXXXX号-1',
					describe: '',
				},
			});
		}
		return "Not's method get";
	},
	'获取系统页脚',
);
