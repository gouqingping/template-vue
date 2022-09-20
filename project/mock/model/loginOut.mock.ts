/*
 * @Autor        : Pat
 * @Description  : basicDirInfos Mock
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 11:26:30
 * @LastEditors  : Pat
 * @LastEditTime : 2021-11-02 10:40:39
 */
import { setupMock, stringCase, createData } from '../_utlis';
export default setupMock(
	'/loginOut',
	'get',
	({ method }: any) => {
		if (stringCase(method) == stringCase('post')) {
			return createData('');
		}
		return "Not's method get";
	},
	'用户登出接口',
);
