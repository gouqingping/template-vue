/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-09-18 13:45:36
 * @LastEditors: yusha yushazh@icloud.com
 * @LastEditTime: 2022-07-07 16:38:36
 */
import Route from '@config/router';
import { base } from '@config/amb';
import { getsub } from '@shared/storage';
import { AnyObject } from 'igu/lib/core/utils';
import { getMessage } from '@config/message';
import { actions, state } from '@config/store';
import request, {
	get,
	useRequest,
	useResponse,
	useConfig,
} from '@elgis/request';
import { nextTick, ref } from 'vue';
import createMessage from '@elgis/ui-component/lib/EMessage';
import { clearState } from '@config/store';
import { removeSub } from '@shared/storage';

export interface ErrorContent {
	code: number;
	errorCode: string;
	message: string;
	status?: number;
}

export const router = Route;

useConfig({
	// Set response time
	timeout: 5 * 10000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
});

useRequest(({ url, method, ...requestConfig }: AnyObject) => {
	if (!base?.mock) {
		const tk = getsub('token');
		if (tk) {
			requestConfig.headers['authorization'] = tk;
		} else {
			// Route.push('/user/login');
		}
	}
	return { url, method, ...requestConfig };
});

useResponse(
	(res: AnyObject) => {
		const resMsg: string =
			getMessage(res.data?.message || res.data?.errorCode) ||
			res.data?.message ||
			'请求失败！';
		if ([302, 401].includes(res?.status)) {
			createMessage('error', {
				message: resMsg,
			});
			nextTick(() => {
				// Route.push('/user/login');
			});
			return;
		}
		if ([204].includes(res.status)) {
			createMessage('success', {
				message: '删除成功！',
			});
			return 'OK';
		}
		if (res?.data || res?.status == '200') {
			return res.data || res.statusText;
		} else {
			res.response.data.status = res?.response?.status || 404;
			return Promise.reject(res?.response?.data);
		}
	},
	(error: any) => {
		return Promise.reject(error);
	},
);
export const src = ref(state.sys.api);

export const requestApi = (
	callback: (api: AnyObject) => AnyObject = (api: AnyObject) => api,
) => {
	try {
		if (base?.BASE_API_CONFIG) {
			get(base?.BASE_API_CONFIG || '/ambiences.config.json')
				.then((config: AnyObject) => {
					actions.setsys(config);
					src.value = config?.api;
					callback(config?.api);
				})
				.catch(() => callback(src.value));
		} else {
			callback(src.value);
		}
	} catch (error) {
		callback(src.value);
	}
};

export const errorCatch = ({ response }: AnyObject) => {
	const { data, status } = response;
	const msg: string = data?.message;
	const message: string = msg ? getMessage(data?.message) : msg;
	if (status == 401) {
		// 分支修改
		message &&
			createMessage('error', {
				message,
			});
		nextTick(() => {
			removeSub('token');
			clearState();
			// Route.push('/user/login');
		});
	}
	if (message) {
		createMessage('error', {
			message,
		});
	} else if (status === 500) {
		createMessage('error', {
			message: msg || '服务器错误！',
		});
	} else if (data?.errorCode || msg) {
		createMessage('error', {
			message: msg || data?.errorCode,
		});
	}
};
export default request;
