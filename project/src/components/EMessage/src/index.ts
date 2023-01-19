/*
 * @Autor        : Pat
 * @Description  : Refactored ElDropdown
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 10:41:24
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-14 14:23:41
 */
import { createVNode, render as render$1, isVNode, nextTick, App } from 'vue';
import MessageComponent from './index.vue';
import { AnyObject } from '../../../../../../WEB_CODE/EComponentModel/packages/types';
let seed = 1,
	vm,
	time = 0,
	currentTime = 0;
const instances: any = [],
	space = 15;
/**
 * @description: 创建Message实例对象
 * @param {AnyObject} opts 参数条件
 * @Date: 2021-02-05 11:28:06
 * @author: Pat
 */
const Message: any = function (opts: AnyObject | string = {}) {
	if (typeof opts === 'string') opts = { message: opts, type: 'info' };
	opts.duration =
		opts.duration == false ? 0 : opts.duration ? opts.duration : 2000;
	let options = opts;
	const ctime = new Date().getTime(),
		mainLen = document.querySelectorAll('.e-msg-container').length;
	let verticalOffset = opts.offset || 20;
	opts.position = opts.position || 'top';
	opts.animation = opts.animation || 'center';
	const id = 'message_' + seed++,
		callback: (arg: []) => void = options.onClose,
		container = document.createElement('div'),
		message: string = options.message;
	if (opts.animation === opts.position && opts.position != 'top') {
		if (opts.animation == 'right' || opts.animation == 'left') {
			opts.position = 'bottom';
		} else {
			opts.animation = 'right';
		}
	}
	time =
		ctime - currentTime > 1000 && mainLen <= 0
			? opts.duration
			: (mainLen + 1) * 1100 + opts.duration;
	currentTime = ctime;
	opts.time = time;
	instances.forEach(({ vm }: AnyObject) => {
		const vmoffsetHeight = vm?.el?.parentNode?.children?.[0].offsetHeight;
		verticalOffset += (vmoffsetHeight || 0) + space;
	});
	verticalOffset += 35;
	options = Object.assign(Object.assign({}, options), {
		onClose: () => {
			close(id, callback);
		},
		offset: verticalOffset,
		id,
	});
	container.className = `container_${id} e-msg-container`;
	vm = createVNode(
		MessageComponent,
		options,
		isVNode(options.message) ? { default: () => message } : null,
	);
	render$1(vm, container);
	instances.push({ vm, $el: container });
	document.body.appendChild(container);
	return { close: options.onClose };
};
/**
 * @description: Message消息框关闭事件
 * @param {string} id Message消息框ID
 * @param {Function} callback 关闭事件回调函数
 * @Date: 2021-02-05 11:26:31
 * @author: Pat
 */
function close(id = '', callback: ((arg: []) => void) | null = null) {
	const idx = instances.findIndex(({ vm }: any) => {
		const { id: _id } = vm.component.props;
		return id === _id;
	});
	if (idx === -1) return;
	const { vm, $el } = instances[idx];
	if (!vm) return;
	callback === null || callback === void 0 ? void 0 : callback(vm);
	const currentEl = vm?.el?.parentNode?.children?.[0];
	const removedHeight = currentEl?.offsetHeight || 0;
	vm.el.parentNode.classList.add('msg-out');
	setTimeout(() => {
		render$1(null, $el);
		nextTick(() => document.body.removeChild($el));
	}, 500);
	instances.splice(idx, 1);
	const len = instances.length;
	if (len < 1) {
		return;
	}
	for (let i = idx; i < len; i++) {
		const vms = instances[i].vm;
		const props: AnyObject = vms.component.props;
		const stylePos =
			vms.el?.parentNode?.children?.[0].style?.[props.position];
		if (stylePos) {
			const pos = parseInt(stylePos, 10) - removedHeight - space;
			props.offset = pos;
			props.vertOffset = pos;
		}
	}
}
// 定义Message类型
['success', 'warning', 'info', 'error'].forEach((type = 'success') => {
	Message[type] = (options: AnyObject) => {
		if (typeof options === 'string') {
			options = { message: options, type };
		} else {
			options.type = type;
		}
		return Message(options);
	};
});
Message.install = (app: App) => {
	app.component(Message.name, Message);
};
export default function createMessage(
	type: string | AnyObject,
	options?: AnyObject,
) {
	let ops: AnyObject = { type: '' };
	if (typeof type === 'string') {
		ops = { type, ...options };
	} else {
		ops = type;
	}
	return new Message(ops);
}
