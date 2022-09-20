/*
 * @Autor        : Pat
 * @Description  : basicDirInfos Mock
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 11:26:30
 * @LastEditors  : Pat
 * @LastEditTime : 2021-11-12 10:39:35
 */
import { Random, setupMock, stringCase, createData } from '../_utlis';
export default setupMock(
	'/user/login',
	'post',
	({ method }: any) => {
		if (stringCase(method) == stringCase('post')) {
			return createData({
				username: Random.cname(),
				id: 1,
				describe: `yportal ${Random.string('lower', 25)}`,
			});
		}
		return "Not's method post";
	},
	'用户登录接口',
);
